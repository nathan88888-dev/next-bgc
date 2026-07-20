-- SQL Script to import backfilled groups (Part 2/4)

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'bangkok-scrabble-and-chess-meetup',
  'Bangkok Scrabble and Chess Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  145,
  'Weekly',
  'Welcome to Bangkok Scrabble and Chess Meetup! We are a local board game group based in Bangkok, TH focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Scrabble, Game Night, Chess, Card Games, Word Gaming, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Bangkok","state":"","country":"TH","zipCode":""}'::jsonb,
  '',
  ARRAY['Scrabble', 'Game Night', 'Chess', 'Card Games', 'Word Gaming', 'Board Games']::text[],
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
  'https://www.meetup.com/bangkok-scrabble-and-chess-meetup/',
  'bangkok-scrabble-and-chess-meetup',
  '2026-04-25T01:13:08.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('bangkok-scrabble-and-chess-meetup', 'meetup', 'https://www.meetup.com/bangkok-scrabble-and-chess-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'backgammon-and-coffee',
  'Backgammon And Coffee',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  76,
  'Weekly',
  'Welcome to Backgammon And Coffee! We are a local board game group based in Salt Lake City, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Coffee, Make New Friends, Backgammon, Board Games, Game Night, Gaming. Join us at our next meetup!',
  'Public',
  '{"city":"Salt Lake City","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Coffee', 'Make New Friends', 'Backgammon', 'Board Games', 'Game Night', 'Gaming']::text[],
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
  'https://www.meetup.com/meetup-group-qhqgrzqo/',
  'backgammon-and-coffee',
  '2026-04-25T01:13:13.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('backgammon-and-coffee', 'meetup', 'https://www.meetup.com/meetup-group-qhqgrzqo/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'toronto-go-players-meetup',
  'Toronto Go Players Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  228,
  'Weekly',
  'Welcome to Toronto Go Players Meetup! We are a local board game group based in Toronto, CA focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Strategy Games, Card Games, Weiqi, Baduk, Golang, Games, Board Games, Game of Go or Igo, Japanese Culture, Chinese Culture, Korean Culture, Expat Japanese, Mandarin. Join us at our next meetup!',
  'Public',
  '{"city":"Toronto","state":"","country":"CA","zipCode":""}'::jsonb,
  '',
  ARRAY['Strategy Games', 'Card Games', 'Weiqi', 'Baduk', 'Golang', 'Games', 'Board Games', 'Game of Go or Igo', 'Japanese Culture', 'Chinese Culture', 'Korean Culture', 'Expat Japanese', 'Mandarin']::text[],
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
  'https://www.meetup.com/torontogoplayers/',
  'toronto-go-players-meetup',
  '2026-04-25T01:13:18.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('toronto-go-players-meetup', 'meetup', 'https://www.meetup.com/torontogoplayers/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'boardgamers-at-cheng-san-inactive',
  'Boardgamers at Cheng San (inactive)',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  1383,
  'Weekly',
  'Welcome to Boardgamers at Cheng San (inactive)! We are a local board game group based in Singapore, SG focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Tabletop Role Playing and Board Games, Gaming, Game Night, Strategy Games, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Singapore","state":"","country":"SG","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Tabletop Role Playing and Board Games', 'Gaming', 'Game Night', 'Strategy Games', 'Board Games']::text[],
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
  'https://www.meetup.com/boardgamers-at-cheng-san/',
  'boardgamers-at-cheng-san-inactive',
  '2026-04-25T01:13:24.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('boardgamers-at-cheng-san-inactive', 'meetup', 'https://www.meetup.com/boardgamers-at-cheng-san/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'hothead-collective',
  'Hothead Collective',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  4,
  'Weekly',
  'Welcome to Hothead Collective! We are a local board game group based in Brooklyn, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Video Games, Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Roleplaying Games (RPGs). Join us at our next meetup!',
  'Public',
  '{"city":"Brooklyn","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Video Games', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Roleplaying Games (RPGs)']::text[],
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
  'https://www.meetup.com/hothead-collective/',
  'hothead-collective',
  '2026-04-25T01:13:29.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('hothead-collective', 'meetup', 'https://www.meetup.com/hothead-collective/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'entertainment-bingo-with-bria',
  'Entertainment Bingo With Bria',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  19,
  'Weekly',
  'Welcome to Entertainment Bingo With Bria! We are a local board game group based in Matthews, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Gaming, Board Games, Game Night, Entertainment, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Matthews","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Gaming', 'Board Games', 'Game Night', 'Entertainment', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/entertainment-bingo-with-bria/',
  'entertainment-bingo-with-bria',
  '2026-04-25T01:13:35.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('entertainment-bingo-with-bria', 'meetup', 'https://www.meetup.com/entertainment-bingo-with-bria/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'dublin-online-game-nights',
  'Dublin ONLINE Game Nights!',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  86,
  'Weekly',
  'Welcome to Dublin ONLINE Game Nights!! We are a local board game group based in Dublin, IE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Online Gaming, Games, Board Games, Game Night, Roleplaying Games (RPGs), Gaming, Console Gaming. Join us at our next meetup!',
  'Public',
  '{"city":"Dublin","state":"","country":"IE","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Online Gaming', 'Games', 'Board Games', 'Game Night', 'Roleplaying Games (RPGs)', 'Gaming', 'Console Gaming']::text[],
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
  'https://www.meetup.com/dublin-online-game-nights/',
  'dublin-online-game-nights',
  '2026-04-25T01:13:39.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('dublin-online-game-nights', 'meetup', 'https://www.meetup.com/dublin-online-game-nights/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'adventures-in-board-gaming',
  'Adventures in Board Gaming',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  72,
  'Weekly',
  'Welcome to Adventures in Board Gaming! We are a local board game group based in Mountain View, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Disc Golf, Tabletop Role Playing and Board Games, Board Games, Strategy Games, Hiking, Outdoor Adventures, Adventure. Join us at our next meetup!',
  'Public',
  '{"city":"Mountain View","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Disc Golf', 'Tabletop Role Playing and Board Games', 'Board Games', 'Strategy Games', 'Hiking', 'Outdoor Adventures', 'Adventure']::text[],
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
  'https://www.meetup.com/adventuresbg/',
  'adventures-in-board-gaming',
  '2026-04-25T01:13:44.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('adventures-in-board-gaming', 'meetup', 'https://www.meetup.com/adventuresbg/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'blr-crowned-people',
  'BLR crowned people',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  65,
  'Weekly',
  'Welcome to BLR crowned people! We are a local board game group based in Bangalore, IN focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Scrabble, Chess, Games, Board Games, Strategy Games, Puzzles. Join us at our next meetup!',
  'Public',
  '{"city":"Bangalore","state":"","country":"IN","zipCode":""}'::jsonb,
  '',
  ARRAY['Scrabble', 'Chess', 'Games', 'Board Games', 'Strategy Games', 'Puzzles']::text[],
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
  'https://www.meetup.com/blr-crowned-people/',
  'blr-crowned-people',
  '2026-04-25T01:13:48.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('blr-crowned-people', 'meetup', 'https://www.meetup.com/blr-crowned-people/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'brno-social-club',
  'Brno Social Club',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  718,
  'Weekly',
  'Welcome to Brno Social Club! We are a local board game group based in Brno, CZ focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Outdoors, Nature Walks, Activities, Culture, Sports and Recreation, Eating & Drinking, Watching Movies, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Brno","state":"","country":"CZ","zipCode":""}'::jsonb,
  '',
  ARRAY['Outdoors', 'Nature Walks', 'Activities', 'Culture', 'Sports and Recreation', 'Eating & Drinking', 'Watching Movies', 'Board Games']::text[],
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
  'https://www.meetup.com/brno-social-club/',
  'brno-social-club',
  '2026-04-25T01:13:53.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('brno-social-club', 'meetup', 'https://www.meetup.com/brno-social-club/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'nairobi-anime-meetup',
  'Nairobi Anime Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  387,
  'Weekly',
  'Welcome to Nairobi Anime Meetup! We are a local board game group based in Nairobi, KE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Anime, Cosplay, Manga, Adventure, Games, Gaming, Board Games, Japanese Culture, Geeks & Nerds. Join us at our next meetup!',
  'Public',
  '{"city":"Nairobi","state":"","country":"KE","zipCode":""}'::jsonb,
  '',
  ARRAY['Anime', 'Cosplay', 'Manga', 'Adventure', 'Games', 'Gaming', 'Board Games', 'Japanese Culture', 'Geeks & Nerds']::text[],
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
  'https://www.meetup.com/nairobi-anime-meetup/',
  'nairobi-anime-meetup',
  '2026-04-25T01:13:59.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('nairobi-anime-meetup', 'meetup', 'https://www.meetup.com/nairobi-anime-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'dublin-games-night-meetup',
  'Dublin Games Night Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  2364,
  'Weekly',
  'Welcome to Dublin Games Night Meetup! We are a local board game group based in Dublin, IE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Xbox, Settlers of Catan, Video Games, Card Games, Online Gaming, Games, Strategy Games, Gaming, Board Games, Dice Games, PC Gaming, Console Gaming, Computer Gaming, Game Night, Video Game Tournaments. Join us at our next meetup!',
  'Public',
  '{"city":"Dublin","state":"","country":"IE","zipCode":""}'::jsonb,
  '',
  ARRAY['Xbox', 'Settlers of Catan', 'Video Games', 'Card Games', 'Online Gaming', 'Games', 'Strategy Games', 'Gaming', 'Board Games', 'Dice Games', 'PC Gaming', 'Console Gaming', 'Computer Gaming', 'Game Night', 'Video Game Tournaments']::text[],
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
  'https://www.meetup.com/dublin-games-night-meetup/',
  'dublin-games-night-meetup',
  '2026-04-25T01:14:05.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('dublin-games-night-meetup', 'meetup', 'https://www.meetup.com/dublin-games-night-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'tarde-de-juegos-de-mesa-al-sur-del-df',
  'Tarde de Juegos de Mesa al sur del DF',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  428,
  'Weekly',
  'Welcome to Tarde de Juegos de Mesa al sur del DF! We are a local board game group based in México City, MX focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Settlers of Catan, Card Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, European Board Games, Strategy Games, Board Games, Game Night, German Style Games, Deck Building Games. Join us at our next meetup!',
  'Public',
  '{"city":"México City","state":"","country":"MX","zipCode":""}'::jsonb,
  '',
  ARRAY['Settlers of Catan', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'European Board Games', 'Strategy Games', 'Board Games', 'Game Night', 'German Style Games', 'Deck Building Games']::text[],
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
  'https://www.meetup.com/tarde-de-juegos-de-mesa-al-sur-del-df/',
  'tarde-de-juegos-de-mesa-al-sur-del-df',
  '2026-04-25T01:14:10.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('tarde-de-juegos-de-mesa-al-sur-del-df', 'meetup', 'https://www.meetup.com/tarde-de-juegos-de-mesa-al-sur-del-df/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'santa-marta-backgammon-meetup',
  'Santa Marta Backgammon Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  28,
  'Weekly',
  'Welcome to Santa Marta Backgammon Meetup! We are a local board game group based in Santa Marta, CO focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Backgammon, Games, Strategy Games, Board Games, Game Night, Backgammon Tournaments. Join us at our next meetup!',
  'Public',
  '{"city":"Santa Marta","state":"","country":"CO","zipCode":""}'::jsonb,
  '',
  ARRAY['Backgammon', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Backgammon Tournaments']::text[],
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
  'https://www.meetup.com/santa-marta-backgammon-meetup/',
  'santa-marta-backgammon-meetup',
  '2026-04-25T01:14:15.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('santa-marta-backgammon-meetup', 'meetup', 'https://www.meetup.com/santa-marta-backgammon-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'planszwki-w-osiu',
  'Planszówki w Łosiu',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  49,
  'Weekly',
  'Welcome to Planszówki w Łosiu! We are a local board game group based in Piaseczno, PL focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Community, Tabletop Role Playing and Board Games, Strategy Games, Board Games, Cooperative Board Games, Social Networking. Join us at our next meetup!',
  'Public',
  '{"city":"Piaseczno","state":"","country":"PL","zipCode":""}'::jsonb,
  '',
  ARRAY['Community', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Board Games', 'Cooperative Board Games', 'Social Networking']::text[],
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
  'https://www.meetup.com/planszowki-w-%c5%82osiu/',
  'planszwki-w-osiu',
  '2026-04-25T01:14:20.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('planszwki-w-osiu', 'meetup', 'https://www.meetup.com/planszowki-w-%c5%82osiu/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'sueos-y-otros-bocadillos-rol',
  'Sueños y Otros Bocadillos (Rol)',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  25,
  'Weekly',
  'Welcome to Sueños y Otros Bocadillos (Rol)! We are a local board game group based in León, MX focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Sci-Fi/Fantasy, Dungeons & Dragons, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"León","state":"","country":"MX","zipCode":""}'::jsonb,
  '',
  ARRAY['Sci-Fi/Fantasy', 'Dungeons & Dragons', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/suenos-y-otros-bocadillos-rol/',
  'sueos-y-otros-bocadillos-rol',
  '2026-04-25T01:14:25.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('sueos-y-otros-bocadillos-rol', 'meetup', 'https://www.meetup.com/suenos-y-otros-bocadillos-rol/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'top-english-board-games-marseille',
  'Top English Board Games Marseille',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  89,
  'Weekly',
  'Welcome to Top English Board Games Marseille! We are a local board game group based in Marseille, FR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Games, Tabletop Role Playing and Board Games, Gaming, Board Games, Game Night, Card Games, English, Social Networking. Join us at our next meetup!',
  'Public',
  '{"city":"Marseille","state":"","country":"FR","zipCode":""}'::jsonb,
  '',
  ARRAY['Games', 'Tabletop Role Playing and Board Games', 'Gaming', 'Board Games', 'Game Night', 'Card Games', 'English', 'Social Networking']::text[],
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
  'https://www.meetup.com/top-english-meetup-group-marseille/',
  'top-english-board-games-marseille',
  '2026-04-25T01:14:31.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('top-english-board-games-marseille', 'meetup', 'https://www.meetup.com/top-english-meetup-group-marseille/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'westside-cincy-friends-game-night',
  'WestSide Cincy Friends Game Night!',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  91,
  'Weekly',
  'Welcome to WestSide Cincy Friends Game Night!! We are a local board game group based in Harrison, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Games, Gaming, Board Games, Social Networking, Game Night, Eating & Drinking, Local Activities, Card Games, Anxiety. Join us at our next meetup!',
  'Public',
  '{"city":"Harrison","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Games', 'Gaming', 'Board Games', 'Social Networking', 'Game Night', 'Eating & Drinking', 'Local Activities', 'Card Games', 'Anxiety']::text[],
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
  'https://www.meetup.com/westside-cincy-friends-game-night/',
  'westside-cincy-friends-game-night',
  '2026-04-25T01:14:36.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('westside-cincy-friends-game-night', 'meetup', 'https://www.meetup.com/westside-cincy-friends-game-night/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'norwescon-tabletop-games-meetup',
  'Norwescon Tabletop Games Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  4,
  'Weekly',
  'Welcome to Norwescon Tabletop Games Meetup! We are a local board game group based in Seattle, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Tabletop Role Playing and Board Games, Board Games, Game Night, Strategy Games, Gaming, Geeks & Nerds. Join us at our next meetup!',
  'Public',
  '{"city":"Seattle","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Tabletop Role Playing and Board Games', 'Board Games', 'Game Night', 'Strategy Games', 'Gaming', 'Geeks & Nerds']::text[],
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
  'https://www.meetup.com/norwescon-tabletop-games-meetup/',
  'norwescon-tabletop-games-meetup',
  '2026-04-25T01:14:40.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('norwescon-tabletop-games-meetup', 'meetup', 'https://www.meetup.com/norwescon-tabletop-games-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'albemarle-board-game-night',
  'Albemarle Board Game Night',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  54,
  'Weekly',
  'Welcome to Albemarle Board Game Night! We are a local board game group based in Albemarle, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, Game Night, Card Games, Strategy Board Games, Tabletop Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Albemarle","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night', 'Card Games', 'Strategy Board Games', 'Tabletop Board Games']::text[],
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
  'https://www.meetup.com/albemarle-hiking-and-walking/',
  'albemarle-board-game-night',
  '2026-04-25T01:14:45.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('albemarle-board-game-night', 'meetup', 'https://www.meetup.com/albemarle-hiking-and-walking/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'stocki-boardgames',
  'Stocki Boardgames',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  14,
  'Weekly',
  'Welcome to Stocki Boardgames! We are a local board game group based in Regensdorf, CH focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Video Games, Darts, Games, Gaming, Board Games, Game Night, Roleplaying Games (RPGs), Console Gaming. Join us at our next meetup!',
  'Public',
  '{"city":"Regensdorf","state":"","country":"CH","zipCode":""}'::jsonb,
  '',
  ARRAY['Video Games', 'Darts', 'Games', 'Gaming', 'Board Games', 'Game Night', 'Roleplaying Games (RPGs)', 'Console Gaming']::text[],
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
  'https://www.meetup.com/regensdorf-science-fiction-boardgames-meetup-group/',
  'stocki-boardgames',
  '2026-04-25T01:14:50.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('stocki-boardgames', 'meetup', 'https://www.meetup.com/regensdorf-science-fiction-boardgames-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'tri-state-board-games',
  'Tri-State Board Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  1609,
  'Weekly',
  'Welcome to Tri-State Board Games! We are a local board game group based in Florence, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Game Night, Tabletop Role Playing and Board Games, Strategy Games, Board Games, Dominion Board Game, Tabletop Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Florence","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Game Night', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Board Games', 'Dominion Board Game', 'Tabletop Board Games', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/tri-stateboardgames/',
  'tri-state-board-games',
  '2026-04-25T01:14:55.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('tri-state-board-games', 'meetup', 'https://www.meetup.com/tri-stateboardgames/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'piquet-card-game-group',
  'Piquet Card Game Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  45,
  'Weekly',
  'Welcome to Piquet Card Game Group! We are a local board game group based in Brisbane, AU focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Games, Tabletop Role Playing and Board Games, Fun Times, Gaming, Board Games, Social Networking, Game Night, Strategy Games. Join us at our next meetup!',
  'Public',
  '{"city":"Brisbane","state":"","country":"AU","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Games', 'Tabletop Role Playing and Board Games', 'Fun Times', 'Gaming', 'Board Games', 'Social Networking', 'Game Night', 'Strategy Games']::text[],
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
  'https://www.meetup.com/piquet-card-game-group/',
  'piquet-card-game-group',
  '2026-04-25T01:15:00.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('piquet-card-game-group', 'meetup', 'https://www.meetup.com/piquet-card-game-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'awesome-peeps-from-nanyuki',
  'Awesome Peeps from Nanyuki',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  48,
  'Weekly',
  'Welcome to Awesome Peeps from Nanyuki! We are a local board game group based in Nanyuki, KE focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Poker, Card Games, Games, Roleplaying Games (RPGs), Board Games, Game Night, Scrabble, Texas Hold ''em, Strategy Games, Gaming. Join us at our next meetup!',
  'Public',
  '{"city":"Nanyuki","state":"","country":"KE","zipCode":""}'::jsonb,
  '',
  ARRAY['Poker', 'Card Games', 'Games', 'Roleplaying Games (RPGs)', 'Board Games', 'Game Night', 'Scrabble', 'Texas Hold ''em', 'Strategy Games', 'Gaming']::text[],
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
  'https://www.meetup.com/awesome-peeps-from-nanyuki/',
  'awesome-peeps-from-nanyuki',
  '2026-04-25T01:15:06.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('awesome-peeps-from-nanyuki', 'meetup', 'https://www.meetup.com/awesome-peeps-from-nanyuki/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'calgary-association-of-gamers',
  'Calgary Association of Gamers',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  49,
  'Weekly',
  'Welcome to Calgary Association of Gamers! We are a local board game group based in Calgary, CA focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Card Games, D20 Gaming, Games, Tabletop Role Playing and Board Games, Strategy Games, Gaming, Board Games, D&D 4.0, Pathfinder Roleplaying Game, Game Night, Roleplaying Games (RPGs), Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Calgary","state":"","country":"CA","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Card Games', 'D20 Gaming', 'Games', 'Tabletop Role Playing and Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'D&D 4.0', 'Pathfinder Roleplaying Game', 'Game Night', 'Roleplaying Games (RPGs)', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/calgary-association-of-gamers/',
  'calgary-association-of-gamers',
  '2026-04-25T01:15:11.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('calgary-association-of-gamers', 'meetup', 'https://www.meetup.com/calgary-association-of-gamers/')
ON CONFLICT ("groupId", platform) DO NOTHING;

