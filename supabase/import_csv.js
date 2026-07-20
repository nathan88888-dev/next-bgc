const fs = require('fs');
const path = require('path');

// File paths
const csvPath = path.join(__dirname, 'results.csv');
const sqlOutputPath = path.join(__dirname, 'import_results.sql');

console.log('Reading CSV from:', csvPath);

if (!fs.existsSync(csvPath)) {
  console.error('results.csv not found at:', csvPath);
  process.exit(1);
}

const csvContent = fs.readFileSync(csvPath, 'utf8');
const lines = csvContent.split(/\r?\n/);

console.log(`Found ${lines.length} lines in results.csv`);

function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Helper to escape SQL string values
function escapeSql(val) {
  if (val === null || val === undefined) return 'NULL';
  return `'${String(val).replace(/'/g, "''")}'`;
}

const groups = [];
const socialLinks = [];

// Skip header (line index 0)
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;

  const fields = parseCsvLine(line);
  if (fields.length < 7) {
    console.warn(`Line ${i} has fewer than 7 fields, skipping:`, line);
    continue;
  }

  const name = fields[0].replace(/^"|"$/g, '');
  const url = fields[1].replace(/^"|"$/g, '');
  const members = parseInt(fields[2], 10) || 0;
  const city = fields[3].replace(/^"|"$/g, '');
  const country = fields[4].replace(/^"|"$/g, '').toUpperCase();
  const organizer = fields[5].replace(/^"|"$/g, '');
  const topicsStr = fields[6].replace(/^"|"$/g, '');
  
  // Combine date parts if split by comma
  let scrapeTime = '';
  if (fields.length >= 9) {
    scrapeTime = fields[7] + ', ' + fields[8];
  } else if (fields.length === 8) {
    scrapeTime = fields[7];
  }

  // Generate a clean unique slug
  let slug = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
  
  // Handle empty slug edge cases
  if (!slug) {
    slug = 'group-' + Math.random().toString(36).substring(2, 6);
  }

  // Parse topics into tags
  const tags = topicsStr
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0);

  // Group size
  let groupSize = 'Small';
  if (members >= 100) {
    groupSize = 'Large';
  } else if (members >= 20) {
    groupSize = 'Medium';
  }

  // Convert scrapeTime (e.g. "4/24/2026, 9:10:41 PM") to valid ISO string if possible
  let scrapedAtStr = new Date().toISOString();
  if (scrapeTime) {
    try {
      const parsedDate = new Date(scrapeTime);
      if (!isNaN(parsedDate.getTime())) {
        scrapedAtStr = parsedDate.toISOString();
      }
    } catch (e) {
      console.warn(`Could not parse date "${scrapeTime}", using current time.`);
    }
  }

  // Generate location JSONB
  const location = {
    city: city,
    state: '',
    country: country,
    zipCode: ''
  };

  // Build the group object
  const group = {
    id: slug, // using slug as ID to keep it human-readable and clean
    name,
    coverImage: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
    memberCount: members,
    meetingFrequency: 'Weekly',
    description: `Welcome to ${name}! We are a local board game group based in ${city}, ${country} focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: ${topicsStr || 'Board Games'}. Join us at our next meetup!`,
    privacy: 'Public',
    location: JSON.stringify(location),
    primaryVenue: '',
    tags: tags,
    groupType: 'Board Game Group',
    groupSize,
    experienceLevel: 'All Levels',
    isClaimed: false,
    isVerified: false,
    isActive: true,
    organizer: null, // UUID must be null for unclaimed
    contactMethods: ['meetup'],
    meetupDetails: JSON.stringify({ privacy: 'Public' }),
    status: 'approved',
    source: 'meetup',
    external_url: url,
    slug,
    last_scraped_at: scrapedAtStr
  };

  groups.push(group);

  // Build the social link object
  const socialLink = {
    groupId: slug,
    platform: 'meetup',
    url: url
  };
  socialLinks.push(socialLink);
}

console.log(`Parsed ${groups.length} groups successfully.`);

// Generate SQL script
let sqlContent = `-- SQL Script to import backfilled groups from results.csv\n\n`;

// Groups inserts
sqlContent += `INSERT INTO public.groups (\n`;
sqlContent += `  id, name, "coverImage", "memberCount", "meetingFrequency", \n`;
sqlContent += `  description, privacy, location, "primaryVenue", tags, \n`;
sqlContent += `  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", \n`;
sqlContent += `  "isActive", organizer, "contactMethods", "meetupDetails", status, \n`;
sqlContent += `  source, external_url, slug, last_scraped_at\n`;
sqlContent += `)\nVALUES\n`;

const groupRows = groups.map(g => {
  const tagsArray = `ARRAY[${g.tags.map(t => escapeSql(t)).join(', ')}]::text[]`;
  const contactMethodsArray = `ARRAY['meetup']::text[]`;
  
  return `  (\n` +
         `    ${escapeSql(g.id)},\n` +
         `    ${escapeSql(g.name)},\n` +
         `    ${escapeSql(g.coverImage)},\n` +
         `    ${g.memberCount},\n` +
         `    ${escapeSql(g.meetingFrequency)},\n` +
         `    ${escapeSql(g.description)},\n` +
         `    ${escapeSql(g.privacy)},\n` +
         `    ${escapeSql(g.location)}::jsonb,\n` +
         `    ${escapeSql(g.primaryVenue)},\n` +
         `    ${tagsArray},\n` +
         `    ${escapeSql(g.groupType)},\n` +
         `    ${escapeSql(g.groupSize)},\n` +
         `    ${escapeSql(g.experienceLevel)},\n` +
         `    ${g.isClaimed},\n` +
         `    ${g.isVerified},\n` +
         `    ${g.isActive},\n` +
         `    NULL,\n` + // organizer UUID
         `    ${contactMethodsArray},\n` +
         `    ${escapeSql(g.meetupDetails)}::jsonb,\n` +
         `    ${escapeSql(g.status)},\n` +
         `    ${escapeSql(g.source)},\n` +
         `    ${escapeSql(g.external_url)},\n` +
         `    ${escapeSql(g.slug)},\n` +
         `    ${escapeSql(g.last_scraped_at)}::timestamptz\n` +
         `  )`;
});

sqlContent += groupRows.join(',\n') + `\nON CONFLICT (id) DO NOTHING;\n\n`;

// Social links inserts
sqlContent += `INSERT INTO public.group_social_links ("groupId", platform, url)\nVALUES\n`;
const socialRows = socialLinks.map(s => {
  return `  (${escapeSql(s.groupId)}, ${escapeSql(s.platform)}, ${escapeSql(s.url)})`;
});
sqlContent += socialRows.join(',\n') + `\nON CONFLICT ("groupId", platform) DO NOTHING;\n`;

fs.writeFileSync(sqlOutputPath, sqlContent, 'utf8');
console.log('SQL output written to:', sqlOutputPath);
