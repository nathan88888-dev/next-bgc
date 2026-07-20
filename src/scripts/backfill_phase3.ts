import { backfillService } from '../services/backfillService';
import { BGCGroup } from '../services/types';

/**
 * PHASE 3 — DATA BACKFILL DEMONSTRATION SCRIPT
 * This script demonstrates the automated population of the directory 
 * using the deduping, retry, and logging infrastructure.
 */

const SAMPLE_EXTERNAL_DATA = [
  {
    name: "Golden Gate Gamers",
    slug: "golden-gate-gamers",
    coverImage: "https://images.unsplash.com/photo-1511512578047-dfb367046420",
    memberCount: 156,
    meetingFrequency: "Weekly",
    description: "A friendly board game group based in San Francisco. We meet every Wednesday at various venues around the city.",
    privacy: "Public",
    location: {
      city: "San Francisco",
      state: "CA",
      zipCode: "94103",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    tags: ["Board Games", "Social", "San Francisco"],
    groupType: "Social Group",
    groupSize: "Medium",
    experienceLevel: "All Levels",
    platform: "meetup",
    externalUrl: "https://www.meetup.com/golden-gate-gamers",
    externalId: "mu-12345"
  },
  {
    name: "Seattle Strategy Stars",
    slug: "seattle-strategy-stars",
    coverImage: "https://images.unsplash.com/photo-1610890733596-f68288599602",
    memberCount: 89,
    meetingFrequency: "Bi-weekly",
    description: "Deep strategy and heavy euros. If it has a rulebook over 20 pages, we're probably playing it.",
    privacy: "Public",
    location: {
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    tags: ["Strategy Games", "Heavy Euros", "Competitive"],
    groupType: "Board Game Group",
    groupSize: "Small",
    experienceLevel: "Advanced",
    platform: "meetup",
    externalUrl: "https://www.meetup.com/seattle-strategy-stars",
    externalId: "mu-67890"
  }
];

async function runBackfill() {
  console.log('🚀 Starting Phase 3 Backfill Demonstration...');
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const item of SAMPLE_EXTERNAL_DATA) {
    console.log(`\n📦 Importing: ${item.name}...`);
    
    // Construct the group object per BGCGroup interface
    const group: Partial<BGCGroup> = {
      name: item.name,
      slug: item.slug,
      coverImage: item.coverImage,
      memberCount: item.memberCount,
      meetingFrequency: item.meetingFrequency as any,
      description: item.description,
      privacy: item.privacy as any,
      location: item.location,
      tags: item.tags,
      groupType: item.groupType as any,
      groupSize: item.groupSize as any,
      experienceLevel: item.experienceLevel as any,
    };

    const result = await backfillService.importGroup(
      group,
      item.platform,
      item.externalUrl,
      item.externalId
    );

    if (result.status === 'success') {
      console.log(`✅ Success: Imported group with ID ${result.id}`);
      successCount++;
    } else if (result.status === 'skipped') {
      console.log(`⏭️ Skipped: ${result.reason} (ID: ${result.id})`);
      skipCount++;
    } else {
      console.error(`❌ Error: ${result.reason}`);
      errorCount++;
    }
  }

  console.log('\n--- 📊 IMPORT SUMMARY ---');
  console.log(`Total Attempted: ${SAMPLE_EXTERNAL_DATA.length}`);
  console.log(`Successes:       ${successCount}`);
  console.log(`Skips:           ${skipCount}`);
  console.log(`Errors:          ${errorCount}`);

  // Run a quick quality check (Phase 3.2.2)
  console.log('\n--- 🔍 QUALITY REPORT ---');
  const quality = await backfillService.checkDataQuality();
  console.log(JSON.stringify(quality, null, 2));
}

runBackfill().catch(err => {
  console.error('Fatal Error during backfill:', err);
  process.exit(1);
});
