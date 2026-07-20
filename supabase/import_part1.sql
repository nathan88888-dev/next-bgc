-- SQL Script to import backfilled groups (Part 1/4)

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'comfort-curators',
  'Comfort Curators',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  4,
  'Weekly',
  'Welcome to Comfort Curators! We are a local board game group based in Gurgaon, IN focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Business Strategy, Salsa. Join us at our next meetup!',
  'Public',
  '{"city":"Gurgaon","state":"","country":"IN","zipCode":""}'::jsonb,
  '',
  ARRAY['Business Strategy', 'Salsa']::text[],
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
  'https://www.meetup.com/gurgaon-networking-und-business-strategie-meetup-group/',
  'comfort-curators',
  '2026-04-25T01:10:41.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('comfort-curators', 'meetup', 'https://www.meetup.com/gurgaon-networking-und-business-strategie-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'backgammon-la',
  'Backgammon LA',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  100,
  'Weekly',
  'Welcome to Backgammon LA! We are a local board game group based in Los Angeles, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Game Night, Board Games, Backgammon, Backgammon Tournaments. Join us at our next meetup!',
  'Public',
  '{"city":"Los Angeles","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Game Night', 'Board Games', 'Backgammon', 'Backgammon Tournaments']::text[],
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
  'https://www.meetup.com/backgammon-la/',
  'backgammon-la',
  '2026-04-25T01:10:46.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('backgammon-la', 'meetup', 'https://www.meetup.com/backgammon-la/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'saint-timothy-game-night',
  'Saint Timothy Game Night',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  331,
  'Weekly',
  'Welcome to Saint Timothy Game Night! We are a local board game group based in Lombard, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Lombard","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/saint-timothy-game-night/',
  'saint-timothy-game-night',
  '2026-04-25T01:10:53.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('saint-timothy-game-night', 'meetup', 'https://www.meetup.com/saint-timothy-game-night/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'desoto-county-ms-strategy-board-game--poker-meetup-group',
  'Desoto County MS Strategy Board Game / Poker Meetup Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  71,
  'Weekly',
  'Welcome to Desoto County MS Strategy Board Game / Poker Meetup Group! We are a local board game group based in Hernando, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Poker, Settlers of Catan, Poker Games, No Limit Texas Hold ''em, Card Games, Games, European Board Games, Strategy Games, Gaming, Board Games, Poker Tournaments, Game Night, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Hernando","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Poker', 'Settlers of Catan', 'Poker Games', 'No Limit Texas Hold ''em', 'Card Games', 'Games', 'European Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Poker Tournaments', 'Game Night', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/desoto-county-ms-strategy-board-game-poker-meetup-group/',
  'desoto-county-ms-strategy-board-game--poker-meetup-group',
  '2026-04-25T01:10:59.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('desoto-county-ms-strategy-board-game--poker-meetup-group', 'meetup', 'https://www.meetup.com/desoto-county-ms-strategy-board-game-poker-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'lesbians-in-ventura-county',
  'Lesbians In Ventura County',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  415,
  'Weekly',
  'Welcome to Lesbians In Ventura County! We are a local board game group based in Ventura, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Bicycling, Hiking, Watching Movies, Live Music, Women''s Social, Outdoors, Movie Nights, LGBT Social, Concerts, Board Games, Lesbian Friends, Lesbian Social Networking, Eating & Drinking, Potluck, Staying Active. Join us at our next meetup!',
  'Public',
  '{"city":"Ventura","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Bicycling', 'Hiking', 'Watching Movies', 'Live Music', 'Women''s Social', 'Outdoors', 'Movie Nights', 'LGBT Social', 'Concerts', 'Board Games', 'Lesbian Friends', 'Lesbian Social Networking', 'Eating & Drinking', 'Potluck', 'Staying Active']::text[],
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
  'https://www.meetup.com/lesbians-in-ventura-county/',
  'lesbians-in-ventura-county',
  '2026-04-25T01:11:04.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('lesbians-in-ventura-county', 'meetup', 'https://www.meetup.com/lesbians-in-ventura-county/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'active-geeks-',
  'Active Geeks ~',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  839,
  'Weekly',
  'Welcome to Active Geeks ~! We are a local board game group based in Greenville, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Sci-Fi/Fantasy, Geek Culture, Games, Board Games, Star Wars, Geeks & Nerds, Anime, Chess. Join us at our next meetup!',
  'Public',
  '{"city":"Greenville","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Sci-Fi/Fantasy', 'Geek Culture', 'Games', 'Board Games', 'Star Wars', 'Geeks & Nerds', 'Anime', 'Chess']::text[],
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
  'https://www.meetup.com/everything-geek/',
  'active-geeks-',
  '2026-04-25T01:11:09.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('active-geeks-', 'meetup', 'https://www.meetup.com/everything-geek/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'are-you-game',
  'Are you Game?',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  411,
  'Weekly',
  'Welcome to Are you Game?! We are a local board game group based in Columbia, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Video Games, Card Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Geeks & Nerds, Game Night, Geek Culture. Join us at our next meetup!',
  'Public',
  '{"city":"Columbia","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Video Games', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Geeks & Nerds', 'Game Night', 'Geek Culture']::text[],
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
  'https://www.meetup.com/are-you-game/',
  'are-you-game',
  '2026-04-25T01:11:16.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('are-you-game', 'meetup', 'https://www.meetup.com/are-you-game/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'eifel-board-games-meetup-group',
  'Eifel Board Games Meetup Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  44,
  'Weekly',
  'Welcome to Eifel Board Games Meetup Group! We are a local board game group based in Bad Münstereifel, DE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Tabletop Board Games, Tabletop Role Playing and Board Games, Games, Strategy Games, Board Games, Game Night, Family Games. Join us at our next meetup!',
  'Public',
  '{"city":"Bad Münstereifel","state":"","country":"DE","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Tabletop Board Games', 'Tabletop Role Playing and Board Games', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Family Games']::text[],
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
  'https://www.meetup.com/euskirchen-board-games-meetup-group/',
  'eifel-board-games-meetup-group',
  '2026-04-25T01:11:23.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('eifel-board-games-meetup-group', 'meetup', 'https://www.meetup.com/euskirchen-board-games-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'glastonbury-chess-meetup-group',
  'Glastonbury Chess Meetup Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  212,
  'Weekly',
  'Welcome to Glastonbury Chess Meetup Group! We are a local board game group based in Glastonbury, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Chess, Games, Strategy Games, Board Games, Social Chess Club, Speed Chess, Chess Enthusiasts, Chess Education. Join us at our next meetup!',
  'Public',
  '{"city":"Glastonbury","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Chess', 'Games', 'Strategy Games', 'Board Games', 'Social Chess Club', 'Speed Chess', 'Chess Enthusiasts', 'Chess Education']::text[],
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
  'https://www.meetup.com/glastonbury-chess-meetup-group/',
  'glastonbury-chess-meetup-group',
  '2026-04-25T01:11:28.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('glastonbury-chess-meetup-group', 'meetup', 'https://www.meetup.com/glastonbury-chess-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'tabletop--brews',
  'Tabletop & brews',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  740,
  'Weekly',
  'Welcome to Tabletop & brews! We are a local board game group based in Saint Charles, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Brewery Events, Game Night, Beer. Join us at our next meetup!',
  'Public',
  '{"city":"Saint Charles","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Brewery Events', 'Game Night', 'Beer']::text[],
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
  'https://www.meetup.com/tabletop-brews/',
  'tabletop--brews',
  '2026-04-25T01:11:34.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('tabletop--brews', 'meetup', 'https://www.meetup.com/tabletop-brews/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'new-hampshire-choo-choo-crew-board-games',
  'New Hampshire Choo Choo Crew Board Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  23,
  'Weekly',
  'Welcome to New Hampshire Choo Choo Crew Board Games! We are a local board game group based in Raymond, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Cooperative Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Raymond","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Cooperative Board Games', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/new-hampshire-choo-choo-crew-board-games/',
  'new-hampshire-choo-choo-crew-board-games',
  '2026-04-25T01:11:39.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('new-hampshire-choo-choo-crew-board-games', 'meetup', 'https://www.meetup.com/new-hampshire-choo-choo-crew-board-games/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  '20s-and-30s-night-at-elk-grove-village-public-library',
  '20s and 30s Night at Elk Grove Village Public Library',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  205,
  'Weekly',
  'Welcome to 20s and 30s Night at Elk Grove Village Public Library! We are a local board game group based in Elk Grove Village, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Book Club, Card Making, Crafts, Handmade Crafts, Free Events, Board Games, 20''s-30''s, Game Night, Public Library Programs. Join us at our next meetup!',
  'Public',
  '{"city":"Elk Grove Village","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Book Club', 'Card Making', 'Crafts', 'Handmade Crafts', 'Free Events', 'Board Games', '20''s-30''s', 'Game Night', 'Public Library Programs']::text[],
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
  'https://www.meetup.com/20s-and-30s-night-at-elk-grove-village-public-library/',
  '20s-and-30s-night-at-elk-grove-village-public-library',
  '2026-04-25T01:11:46.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('20s-and-30s-night-at-elk-grove-village-public-library', 'meetup', 'https://www.meetup.com/20s-and-30s-night-at-elk-grove-village-public-library/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'turku-board-games',
  'Turku Board Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  629,
  'Weekly',
  'Welcome to Turku Board Games! We are a local board game group based in Turku, FI focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: LARP Live Action Role Playing, Card Games, Games, Roleplaying Games (RPGs), Strategy Board Games, Social, Fun Times, Tabletop Role Playing and Board Games, Board Games, Game Night, Activities. Join us at our next meetup!',
  'Public',
  '{"city":"Turku","state":"","country":"FI","zipCode":""}'::jsonb,
  '',
  ARRAY['LARP Live Action Role Playing', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Strategy Board Games', 'Social', 'Fun Times', 'Tabletop Role Playing and Board Games', 'Board Games', 'Game Night', 'Activities']::text[],
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
  'https://www.meetup.com/turkuboardgames/',
  'turku-board-games',
  '2026-04-25T01:11:52.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('turku-board-games', 'meetup', 'https://www.meetup.com/turkuboardgames/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'munich-boardgame-meetup',
  'Munich Boardgame Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  8854,
  'Weekly',
  'Welcome to Munich Boardgame Meetup! We are a local board game group based in München, DE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Tabletop Role Playing and Board Games, Tabletop Board Games, Strategy Board Games, Games, European Board Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"München","state":"","country":"DE","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Tabletop Role Playing and Board Games', 'Tabletop Board Games', 'Strategy Board Games', 'Games', 'European Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/munich-boardgame-meetup/',
  'munich-boardgame-meetup',
  '2026-04-25T01:11:57.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('munich-boardgame-meetup', 'meetup', 'https://www.meetup.com/munich-boardgame-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'leeds-pool-squad',
  'Leeds Pool Squad',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  880,
  'Weekly',
  'Welcome to Leeds Pool Squad! We are a local board game group based in Leeds, GB focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Pool, Games, Strategy Games, Gaming, Board Games, Pool Tournaments, Game Night, Strategy Board Games, Pool Snooker or Billiards, Social, Socializing, Billiards. Join us at our next meetup!',
  'Public',
  '{"city":"Leeds","state":"","country":"GB","zipCode":""}'::jsonb,
  '',
  ARRAY['Pool', 'Games', 'Strategy Games', 'Gaming', 'Board Games', 'Pool Tournaments', 'Game Night', 'Strategy Board Games', 'Pool Snooker or Billiards', 'Social', 'Socializing', 'Billiards']::text[],
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
  'https://www.meetup.com/leeds-pool-squad/',
  'leeds-pool-squad',
  '2026-04-25T01:12:03.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('leeds-pool-squad', 'meetup', 'https://www.meetup.com/leeds-pool-squad/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'mahjong-twickenham',
  'Mahjong Twickenham',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  547,
  'Weekly',
  'Welcome to Mahjong Twickenham! We are a local board game group based in Twickenham, GB focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Mahjong, Games, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Twickenham","state":"","country":"GB","zipCode":""}'::jsonb,
  '',
  ARRAY['Mahjong', 'Games', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/mahjong-twickenham/',
  'mahjong-twickenham',
  '2026-04-25T01:12:09.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('mahjong-twickenham', 'meetup', 'https://www.meetup.com/mahjong-twickenham/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'd6-tabletop-cafe',
  'D6 Tabletop Cafe',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  457,
  'Weekly',
  'Welcome to D6 Tabletop Cafe! We are a local board game group based in Calgary, CA focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Game Night, Strategy Board Games, Tabletop Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Calgary","state":"","country":"CA","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night', 'Strategy Board Games', 'Tabletop Board Games']::text[],
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
  'https://www.meetup.com/d6-tabletop-cafe/',
  'd6-tabletop-cafe',
  '2026-04-25T01:12:15.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('d6-tabletop-cafe', 'meetup', 'https://www.meetup.com/d6-tabletop-cafe/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'brooklyn-strategist-evening-events-meetup',
  'Brooklyn Strategist Evening Events Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  2362,
  'Weekly',
  'Welcome to Brooklyn Strategist Evening Events Meetup! We are a local board game group based in Brooklyn, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Gaming, Games, Tabletop Role Playing and Board Games, European Board Games, Strategy Games, Board Games, Cribbage, Trading Card Games, Game Night, Collectible Card Game, Card Games, Paired Card Games (Canasta and Cribbage), Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Brooklyn","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Gaming', 'Games', 'Tabletop Role Playing and Board Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Cribbage', 'Trading Card Games', 'Game Night', 'Collectible Card Game', 'Card Games', 'Paired Card Games (Canasta and Cribbage)', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/brooklyn-strategist-evening-events-games-meetup/',
  'brooklyn-strategist-evening-events-meetup',
  '2026-04-25T01:12:20.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('brooklyn-strategist-evening-events-meetup', 'meetup', 'https://www.meetup.com/brooklyn-strategist-evening-events-games-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'monterey-county-chess-club',
  'Monterey County Chess Club',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  115,
  'Weekly',
  'Welcome to Monterey County Chess Club! We are a local board game group based in Monterey, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Chess, Card Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Monterey","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Chess', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/monterey-county-chess-club/',
  'monterey-county-chess-club',
  '2026-04-25T01:12:26.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('monterey-county-chess-club', 'meetup', 'https://www.meetup.com/monterey-county-chess-club/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'cambridge-gaming-collective',
  'Cambridge Gaming Collective',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  3586,
  'Weekly',
  'Welcome to Cambridge Gaming Collective! We are a local board game group based in Cambridge, GB focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Geeks & Nerds, Science Fiction, Games, Geek Culture, Video Games, Comic Books, Nerd Culture, Roleplaying Games (RPGs), Gaming, Sci-Fi/Fantasy, Board Games, Tabletop Board Games, Watching Movies. Join us at our next meetup!',
  'Public',
  '{"city":"Cambridge","state":"","country":"GB","zipCode":""}'::jsonb,
  '',
  ARRAY['Geeks & Nerds', 'Science Fiction', 'Games', 'Geek Culture', 'Video Games', 'Comic Books', 'Nerd Culture', 'Roleplaying Games (RPGs)', 'Gaming', 'Sci-Fi/Fantasy', 'Board Games', 'Tabletop Board Games', 'Watching Movies']::text[],
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
  'https://www.meetup.com/cambridgegamescollective/',
  'cambridge-gaming-collective',
  '2026-04-25T01:12:32.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('cambridge-gaming-collective', 'meetup', 'https://www.meetup.com/cambridgegamescollective/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'twin-cities-backgammon-club',
  'Twin Cities Backgammon Club',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  750,
  'Weekly',
  'Welcome to Twin Cities Backgammon Club! We are a local board game group based in Minneapolis, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Backgammon, Games, Strategy Games, Board Games, Game Night, Backgammon Tournaments. Join us at our next meetup!',
  'Public',
  '{"city":"Minneapolis","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Backgammon', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Backgammon Tournaments']::text[],
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
  'https://www.meetup.com/twin-cities-backgammon-club/',
  'twin-cities-backgammon-club',
  '2026-04-25T01:12:40.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('twin-cities-backgammon-club', 'meetup', 'https://www.meetup.com/twin-cities-backgammon-club/')
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
  '2026-04-25T01:12:45.000Z'::timestamptz
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
  'benalmdena-boardcard-game-group',
  'Benalmádena Board/Card Game Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  228,
  'Weekly',
  'Welcome to Benalmádena Board/Card Game Group! We are a local board game group based in Benalmádena, ES focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Benalmádena","state":"","country":"ES","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/benalmadena-board-card-game-group/',
  'benalmdena-boardcard-game-group',
  '2026-04-25T01:12:50.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('benalmdena-boardcard-game-group', 'meetup', 'https://www.meetup.com/benalmadena-board-card-game-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'boardgames-yaaay',
  'boardgames yaaay',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  58,
  'Weekly',
  'Welcome to boardgames yaaay! We are a local board game group based in Elgin, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Social, Games, Tabletop Role Playing and Board Games, Strategy Games, Board Games, Game Night, Fun Times, Gaming. Join us at our next meetup!',
  'Public',
  '{"city":"Elgin","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Social', 'Games', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Board Games', 'Game Night', 'Fun Times', 'Gaming']::text[],
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
  'https://www.meetup.com/boardgames-yaaay/',
  'boardgames-yaaay',
  '2026-04-25T01:12:55.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('boardgames-yaaay', 'meetup', 'https://www.meetup.com/boardgames-yaaay/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'cape-coral-mah-jong',
  'Cape Coral Mah Jong',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  72,
  'Weekly',
  'Welcome to Cape Coral Mah Jong! We are a local board game group based in Cape Coral, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Social, Games, Roleplaying Games (RPGs), Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Cape Coral","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Social', 'Games', 'Roleplaying Games (RPGs)', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/meetup-group-jpyfmoyq/',
  'cape-coral-mah-jong',
  '2026-04-25T01:13:02.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('cape-coral-mah-jong', 'meetup', 'https://www.meetup.com/meetup-group-jpyfmoyq/')
ON CONFLICT ("groupId", platform) DO NOTHING;

