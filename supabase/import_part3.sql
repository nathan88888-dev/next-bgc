-- SQL Script to import backfilled groups (Part 3/4)

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'fun-day-with-friends---jcnyc',
  'Fun Day with Friends - JC/NYC',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  80,
  'Weekly',
  'Welcome to Fun Day with Friends - JC/NYC! We are a local board game group based in Jersey City, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Couples, Games, Board Games, Gaming, Fun Times, Social Networking, Game Night, Strategy Games. Join us at our next meetup!',
  'Public',
  '{"city":"Jersey City","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Couples', 'Games', 'Board Games', 'Gaming', 'Fun Times', 'Social Networking', 'Game Night', 'Strategy Games']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/fun-activity-with-new-friends/',
  'fun-day-with-friends---jcnyc',
  '2026-04-25T01:15:17.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('fun-day-with-friends---jcnyc', 'meetup', 'https://www.meetup.com/fun-activity-with-new-friends/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'en-lo-de-nando',
  'En Lo De Nando',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  9,
  'Weekly',
  'Welcome to En Lo De Nando! We are a local board game group based in Buenos Aires, AR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Games, Strategy Games, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Buenos Aires","state":"","country":"AR","zipCode":""}'::jsonb,
  '',
  ARRAY['Games', 'Strategy Games', 'Board Games', 'Game Night']::text[],
  'Board Game Group',
  'Small',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/en-lo-de-nando/',
  'en-lo-de-nando',
  '2026-04-25T01:15:25.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('en-lo-de-nando', 'meetup', 'https://www.meetup.com/en-lo-de-nando/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'berner-sidi-barrani-jassgruppe',
  'Berner Sidi Barrani Jassgruppe',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  12,
  'Weekly',
  'Welcome to Berner Sidi Barrani Jassgruppe! We are a local board game group based in Bern, CH focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Bern","state":"","country":"CH","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
  'Board Game Group',
  'Small',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/berner-sidi-barrani-jassgruppe/',
  'berner-sidi-barrani-jassgruppe',
  '2026-04-25T01:15:32.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('berner-sidi-barrani-jassgruppe', 'meetup', 'https://www.meetup.com/berner-sidi-barrani-jassgruppe/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'kolkata-catan-enthusiasts',
  'Kolkata Catan Enthusiasts',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  77,
  'Weekly',
  'Welcome to Kolkata Catan Enthusiasts! We are a local board game group based in Kolkata, IN focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Coffee, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Coffee Talk, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Kolkata","state":"","country":"IN","zipCode":""}'::jsonb,
  '',
  ARRAY['Coffee', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Coffee Talk', 'Game Night']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/kolkata-catan-enthusiasts/',
  'kolkata-catan-enthusiasts',
  '2026-04-25T01:15:36.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('kolkata-catan-enthusiasts', 'meetup', 'https://www.meetup.com/kolkata-catan-enthusiasts/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'happy-gaming',
  'Happy Gaming',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  2367,
  'Weekly',
  'Welcome to Happy Gaming! We are a local board game group based in Hong Kong, HK focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Strategy Board Games, Strategy Games, European Board Games, Game Night, Board Games, Games. Join us at our next meetup!',
  'Public',
  '{"city":"Hong Kong","state":"","country":"HK","zipCode":""}'::jsonb,
  '',
  ARRAY['Strategy Board Games', 'Strategy Games', 'European Board Games', 'Game Night', 'Board Games', 'Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/happy-gaming/',
  'happy-gaming',
  '2026-04-25T01:15:44.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('happy-gaming', 'meetup', 'https://www.meetup.com/happy-gaming/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'frisco-board-gamers-meetup',
  'Frisco Board Gamers Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  43,
  'Weekly',
  'Welcome to Frisco Board Gamers Meetup! We are a local board game group based in Frisco, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Game Night, Magic: The Gathering, Card Games, Strategy Games, Board Games, Trading Card Games. Join us at our next meetup!',
  'Public',
  '{"city":"Frisco","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Game Night', 'Magic: The Gathering', 'Card Games', 'Strategy Games', 'Board Games', 'Trading Card Games']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/frisco-board-gamers-meetup/',
  'frisco-board-gamers-meetup',
  '2026-04-25T01:15:50.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('frisco-board-gamers-meetup', 'meetup', 'https://www.meetup.com/frisco-board-gamers-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'mid-peninsula-tabletop-gaming-league',
  'Mid-Peninsula Tabletop-Gaming League',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  452,
  'Weekly',
  'Welcome to Mid-Peninsula Tabletop-Gaming League! We are a local board game group based in San Carlos, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Game Night, Gaming, Card Games, Games, European Board Games, Strategy Games, Board Games, Tabletop Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"San Carlos","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Game Night', 'Gaming', 'Card Games', 'Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Tabletop Board Games', 'Strategy Board Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/mid-peninsula-tabletop-gaming-league/',
  'mid-peninsula-tabletop-gaming-league',
  '2026-04-25T01:15:56.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('mid-peninsula-tabletop-gaming-league', 'meetup', 'https://www.meetup.com/mid-peninsula-tabletop-gaming-league/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'oasis-boardgames',
  'Oasis Boardgames',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  181,
  'Weekly',
  'Welcome to Oasis Boardgames! We are a local board game group based in Berlin, DE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Social, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Make New Friends, Trading Card Games, Card Games. Join us at our next meetup!',
  'Public',
  '{"city":"Berlin","state":"","country":"DE","zipCode":""}'::jsonb,
  '',
  ARRAY['Social', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Make New Friends', 'Trading Card Games', 'Card Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/oasis-boardgames/',
  'oasis-boardgames',
  '2026-04-25T01:16:02.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('oasis-boardgames', 'meetup', 'https://www.meetup.com/oasis-boardgames/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'boardgamers-rs',
  'Boardgamers RS',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  30,
  'Weekly',
  'Welcome to Boardgamers RS! We are a local board game group based in Porto Alegre, BR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Cooperative Board Games, Card Games, Strategy Board Games, Tabletop Role Playing and Board Games, European Board Games, Strategy Games, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Porto Alegre","state":"","country":"BR","zipCode":""}'::jsonb,
  '',
  ARRAY['Cooperative Board Games', 'Card Games', 'Strategy Board Games', 'Tabletop Role Playing and Board Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Game Night']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/boardgamesrs/',
  'boardgamers-rs',
  '2026-04-25T01:16:07.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('boardgamers-rs', 'meetup', 'https://www.meetup.com/boardgamesrs/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'niagara-escapement-dungeons--dragons',
  'Niagara Escapement Dungeons & Dragons',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  176,
  'Weekly',
  'Welcome to Niagara Escapement Dungeons & Dragons! We are a local board game group based in Niagara Falls, CA focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Roleplaying Games (RPGs), Strategy Games, Gaming, Board Games, Geeks & Nerds, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Niagara Falls","state":"","country":"CA","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Strategy Games', 'Gaming', 'Board Games', 'Geeks & Nerds', 'Game Night']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/niagara-falls-board-games-meetup-group/',
  'niagara-escapement-dungeons--dragons',
  '2026-04-25T01:16:14.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('niagara-escapement-dungeons--dragons', 'meetup', 'https://www.meetup.com/niagara-falls-board-games-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'winnipeg-tabletop-games',
  'Winnipeg TableTop Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  275,
  'Weekly',
  'Welcome to Winnipeg TableTop Games! We are a local board game group based in Winnipeg, CA focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Gaming, Roleplaying Games (RPGs), Game Night, Games, Board Games, Strategy Games, Tabletop Role Playing and Board Games, Video Games, Card Games, Community Building, Geeks & Nerds. Join us at our next meetup!',
  'Public',
  '{"city":"Winnipeg","state":"","country":"CA","zipCode":""}'::jsonb,
  '',
  ARRAY['Gaming', 'Roleplaying Games (RPGs)', 'Game Night', 'Games', 'Board Games', 'Strategy Games', 'Tabletop Role Playing and Board Games', 'Video Games', 'Card Games', 'Community Building', 'Geeks & Nerds']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/winnipeg-tabletop-games/',
  'winnipeg-tabletop-games',
  '2026-04-25T01:16:18.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('winnipeg-tabletop-games', 'meetup', 'https://www.meetup.com/winnipeg-tabletop-games/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'hendo-hometown-game-geeks',
  'Hendo Hometown Game Geeks',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  463,
  'Weekly',
  'Welcome to Hendo Hometown Game Geeks! We are a local board game group based in Flat Rock, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Tabletop Role Playing and Board Games, Gaming, Games, European Board Games, Strategy Games, Board Games, Game Night, Tabletop Board Games, Cooperative Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Flat Rock","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Tabletop Role Playing and Board Games', 'Gaming', 'Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Game Night', 'Tabletop Board Games', 'Cooperative Board Games', 'Strategy Board Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/hendohometowngamegeeks/',
  'hendo-hometown-game-geeks',
  '2026-04-25T01:16:24.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('hendo-hometown-game-geeks', 'meetup', 'https://www.meetup.com/hendohometowngamegeeks/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'the-somewhat-social-nerds',
  'The Somewhat Social Nerds',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  619,
  'Weekly',
  'Welcome to The Somewhat Social Nerds! We are a local board game group based in Los Angeles, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Video Games, Bars & Pubs, Board Games, Game Night, Fun Times, Dining Out, New In Town, Social Networking, Conversation, Drinking, Games, Tabletop Role Playing and Board Games, Gaming, Eating & Drinking, Theater. Join us at our next meetup!',
  'Public',
  '{"city":"Los Angeles","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Video Games', 'Bars & Pubs', 'Board Games', 'Game Night', 'Fun Times', 'Dining Out', 'New In Town', 'Social Networking', 'Conversation', 'Drinking', 'Games', 'Tabletop Role Playing and Board Games', 'Gaming', 'Eating & Drinking', 'Theater']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/the-somewhat-social-nerds/',
  'the-somewhat-social-nerds',
  '2026-04-25T01:16:28.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('the-somewhat-social-nerds', 'meetup', 'https://www.meetup.com/the-somewhat-social-nerds/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'star-wars-shatterpoint-friday-night',
  'Star Wars Shatterpoint Friday Night',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  5,
  'Weekly',
  'Welcome to Star Wars Shatterpoint Friday Night! We are a local board game group based in Vancouver, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Sci-Fi/Fantasy, Video Games, Card Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Geeks & Nerds, Game Night, Star Wars Miniatures, Star Wars. Join us at our next meetup!',
  'Public',
  '{"city":"Vancouver","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Sci-Fi/Fantasy', 'Video Games', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Geeks & Nerds', 'Game Night', 'Star Wars Miniatures', 'Star Wars']::text[],
  'Board Game Group',
  'Small',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/star-wars-shatterpoint-friday-night/',
  'star-wars-shatterpoint-friday-night',
  '2026-04-25T01:16:34.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('star-wars-shatterpoint-friday-night', 'meetup', 'https://www.meetup.com/star-wars-shatterpoint-friday-night/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'achievus-community--',
  'Achievus Community 〜 アチーバス・異文化交流会',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  213,
  'Weekly',
  'Welcome to Achievus Community 〜 アチーバス・異文化交流会! We are a local board game group based in Tokyo, JP focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: English, Language & Culture, Communication Skills, Games, Board Games, Strategy Games, Game Night, Self Exploration, Culture Exchange. Join us at our next meetup!',
  'Public',
  '{"city":"Tokyo","state":"","country":"JP","zipCode":""}'::jsonb,
  '',
  ARRAY['English', 'Language & Culture', 'Communication Skills', 'Games', 'Board Games', 'Strategy Games', 'Game Night', 'Self Exploration', 'Culture Exchange']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/achieves-community-%e3%82%a2%e3%83%81%e3%83%bc%e3%83%90%e3%82%b9-%e7%95%b0%e6%96%87%e5%8c%96%e4%ba%a4%e6%b5%81%e4%bc%9a/',
  'achievus-community--',
  '2026-04-25T01:16:38.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('achievus-community--', 'meetup', 'https://www.meetup.com/achieves-community-%e3%82%a2%e3%83%81%e3%83%bc%e3%83%90%e3%82%b9-%e7%95%b0%e6%96%87%e5%8c%96%e4%ba%a4%e6%b5%81%e4%bc%9a/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'somerville-board-games-and-beer-meetup',
  'Somerville Board Games and Beer Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  1980,
  'Weekly',
  'Welcome to Somerville Board Games and Beer Meetup! We are a local board game group based in Somerville, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Settlers of Catan, Card Games, Games, European Board Games, Strategy Games, Board Games, Game Night, Cooperative Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Somerville","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Settlers of Catan', 'Card Games', 'Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Game Night', 'Cooperative Board Games', 'Strategy Board Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/somerville-board-games-and-beer/',
  'somerville-board-games-and-beer-meetup',
  '2026-04-25T01:16:44.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('somerville-board-games-and-beer-meetup', 'meetup', 'https://www.meetup.com/somerville-board-games-and-beer/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'juegos-de-mesa---board-games',
  'Juegos de mesa - Board Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  380,
  'Weekly',
  'Welcome to Juegos de mesa - Board Games! We are a local board game group based in A Coruña, ES focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Gaming, Game Night, Fun Times, Tabletop Role Playing and Board Games, Strategy Games, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"A Coruña","state":"","country":"ES","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Gaming', 'Game Night', 'Fun Times', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Board Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/juegos-de-mesa-board-games/',
  'juegos-de-mesa---board-games',
  '2026-04-25T01:16:49.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('juegos-de-mesa---board-games', 'meetup', 'https://www.meetup.com/juegos-de-mesa-board-games/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'rockingham-county-tabletop-gaming',
  'Rockingham County Tabletop Gaming',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  40,
  'Weekly',
  'Welcome to Rockingham County Tabletop Gaming! We are a local board game group based in Eden, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, LARP Live Action Role Playing, Card Games, D20 Gaming, Games, Strategy Games, Gaming, Board Games, D&D 3.5, Pathfinder Roleplaying Game, Game Night, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Eden","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'LARP Live Action Role Playing', 'Card Games', 'D20 Gaming', 'Games', 'Strategy Games', 'Gaming', 'Board Games', 'D&D 3.5', 'Pathfinder Roleplaying Game', 'Game Night', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/rockingham-county-tabletop-gaming/',
  'rockingham-county-tabletop-gaming',
  '2026-04-25T01:16:54.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('rockingham-county-tabletop-gaming', 'meetup', 'https://www.meetup.com/rockingham-county-tabletop-gaming/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'jaipur-gaming-meetup',
  'jaipur gaming meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  1142,
  'Weekly',
  'Welcome to jaipur gaming meetup! We are a local board game group based in Jaipur, IN focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Game Programming, Dungeons & Dragons, Video Games, Card Games, Fun Times, Games, Tabletop Role Playing and Board Games, Strategy Games, Gaming, Game Design, Board Games, Console Gaming, Game Night, Roleplaying Games (RPGs). Join us at our next meetup!',
  'Public',
  '{"city":"Jaipur","state":"","country":"IN","zipCode":""}'::jsonb,
  '',
  ARRAY['Game Programming', 'Dungeons & Dragons', 'Video Games', 'Card Games', 'Fun Times', 'Games', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Game Design', 'Board Games', 'Console Gaming', 'Game Night', 'Roleplaying Games (RPGs)']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/jaipur-gaming-meetup/',
  'jaipur-gaming-meetup',
  '2026-04-25T01:17:00.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('jaipur-gaming-meetup', 'meetup', 'https://www.meetup.com/jaipur-gaming-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'jogos-de-mesa---feira-de-santana',
  'Jogos de Mesa - Feira de Santana',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  53,
  'Weekly',
  'Welcome to Jogos de Mesa - Feira de Santana! We are a local board game group based in Feira de Santana, BR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Games, Gaming, Game Night, Roleplaying Games (RPGs), Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Feira de Santana","state":"","country":"BR","zipCode":""}'::jsonb,
  '',
  ARRAY['Games', 'Gaming', 'Game Night', 'Roleplaying Games (RPGs)', 'Board Games']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/jogos-de-mesa-feira-de-santana/',
  'jogos-de-mesa---feira-de-santana',
  '2026-04-25T01:17:05.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('jogos-de-mesa---feira-de-santana', 'meetup', 'https://www.meetup.com/jogos-de-mesa-feira-de-santana/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'sartrouville-loup-garou',
  'Sartrouville Loup Garou',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  19,
  'Weekly',
  'Welcome to Sartrouville Loup Garou! We are a local board game group based in Sartrouville, FR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Game-Swap, Tabletop Role Playing and Board Games, Card Games, Roleplaying Games (RPGs), Gaming, Board Games, Dungeons & Dragons, Strategy Games. Join us at our next meetup!',
  'Public',
  '{"city":"Sartrouville","state":"","country":"FR","zipCode":""}'::jsonb,
  '',
  ARRAY['Game-Swap', 'Tabletop Role Playing and Board Games', 'Card Games', 'Roleplaying Games (RPGs)', 'Gaming', 'Board Games', 'Dungeons & Dragons', 'Strategy Games']::text[],
  'Board Game Group',
  'Small',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/sartrouville-loup-garou/',
  'sartrouville-loup-garou',
  '2026-04-25T01:17:10.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('sartrouville-loup-garou', 'meetup', 'https://www.meetup.com/sartrouville-loup-garou/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'leeds-nerds',
  'Leeds Nerds',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  4993,
  'Weekly',
  'Welcome to Leeds Nerds! We are a local board game group based in Leeds, GB focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Tabletop Role Playing and Board Games, Board Games, Geeks & Nerds, Game Night, Nerd Culture, Tabletop Card Games, Games, Gaming, Card Games, Geek Culture. Join us at our next meetup!',
  'Public',
  '{"city":"Leeds","state":"","country":"GB","zipCode":""}'::jsonb,
  '',
  ARRAY['Tabletop Role Playing and Board Games', 'Board Games', 'Geeks & Nerds', 'Game Night', 'Nerd Culture', 'Tabletop Card Games', 'Games', 'Gaming', 'Card Games', 'Geek Culture']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/leeds-nerds/',
  'leeds-nerds',
  '2026-04-25T01:17:14.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('leeds-nerds', 'meetup', 'https://www.meetup.com/leeds-nerds/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'red-knight-chess-club--cafe',
  'Red Knight Chess Club & Cafe',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  511,
  'Weekly',
  'Welcome to Red Knight Chess Club & Cafe! We are a local board game group based in Bangkok, TH focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Coffee, Chess, Social Networking, Games, Strategy Games, Board Games, Social, Cafe Lovers, Acoustic Music, Relaxation, Scholastics Chess, Coffeehouse Chess, Social Chess Club. Join us at our next meetup!',
  'Public',
  '{"city":"Bangkok","state":"","country":"TH","zipCode":""}'::jsonb,
  '',
  ARRAY['Coffee', 'Chess', 'Social Networking', 'Games', 'Strategy Games', 'Board Games', 'Social', 'Cafe Lovers', 'Acoustic Music', 'Relaxation', 'Scholastics Chess', 'Coffeehouse Chess', 'Social Chess Club']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/red-knight-chess-club-cafe/',
  'red-knight-chess-club--cafe',
  '2026-04-25T01:17:19.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('red-knight-chess-club--cafe', 'meetup', 'https://www.meetup.com/red-knight-chess-club-cafe/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'quincy-board-game-group',
  'Quincy Board Game Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  43,
  'Weekly',
  'Welcome to Quincy Board Game Group! We are a local board game group based in Quincy, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Video Games, Card Games, Games, Strategy Games, Board Games, Game Night, Gaming, Tabletop Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Quincy","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Video Games', 'Card Games', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Gaming', 'Tabletop Board Games']::text[],
  'Board Game Group',
  'Medium',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/quincy-board-game-group/',
  'quincy-board-game-group',
  '2026-04-25T01:17:24.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('quincy-board-game-group', 'meetup', 'https://www.meetup.com/quincy-board-game-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'armoury-bar-gaming-community',
  'Armoury Bar Gaming Community',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  3760,
  'Weekly',
  'Welcome to Armoury Bar Gaming Community! We are a local board game group based in Amsterdam, NL focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Roleplaying Games (RPGs), Computer Gaming, Video Games, Strategy Games, Board Games, Card Games, Gaming, Game Night, Games, Tabletop Role Playing and Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Amsterdam","state":"","country":"NL","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Roleplaying Games (RPGs)', 'Computer Gaming', 'Video Games', 'Strategy Games', 'Board Games', 'Card Games', 'Gaming', 'Game Night', 'Games', 'Tabletop Role Playing and Board Games']::text[],
  'Board Game Group',
  'Large',
  'All Levels',
  false,
  false,
  true,
  NULL,
  ARRAY['meetup']::text[],
  '{"privacy":"Public"}'::jsonb,
  'approved',
  'meetup',
  'https://www.meetup.com/armoury-bar-gaming-community/',
  'armoury-bar-gaming-community',
  '2026-04-25T01:17:31.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('armoury-bar-gaming-community', 'meetup', 'https://www.meetup.com/armoury-bar-gaming-community/')
ON CONFLICT ("groupId", platform) DO NOTHING;

