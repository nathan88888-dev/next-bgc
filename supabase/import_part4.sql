-- SQL Script to import backfilled groups (Part 4/4)

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'sf-backgammon-club',
  'SF Backgammon Club',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  321,
  'Weekly',
  'Welcome to SF Backgammon Club! We are a local board game group based in San Francisco, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Social, Games, Board Games, Game Night, Outdoors, Fun Times, Gaming, Conversation. Join us at our next meetup!',
  'Public',
  '{"city":"San Francisco","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Social', 'Games', 'Board Games', 'Game Night', 'Outdoors', 'Fun Times', 'Gaming', 'Conversation']::text[],
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
  'https://www.meetup.com/backgammon-and-brews/',
  'sf-backgammon-club',
  '2026-04-25T01:17:36.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('sf-backgammon-club', 'meetup', 'https://www.meetup.com/backgammon-and-brews/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'northwest-side-chicago-board-game-friends',
  'Northwest Side Chicago Board Game Friends',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  3904,
  'Weekly',
  'Welcome to Northwest Side Chicago Board Game Friends! We are a local board game group based in Chicago, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Cooperative Board Games, Tabletop Board Games, Strategy Board Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, European Board Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Chicago","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Cooperative Board Games', 'Tabletop Board Games', 'Strategy Board Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'European Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/northwest-side-chicago-board-game-friends/',
  'northwest-side-chicago-board-game-friends',
  '2026-04-25T01:17:43.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('northwest-side-chicago-board-game-friends', 'meetup', 'https://www.meetup.com/northwest-side-chicago-board-game-friends/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'nynja-word-puzzles-and-word-games',
  'NYNJA Word Puzzles and Word Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  410,
  'Weekly',
  'Welcome to NYNJA Word Puzzles and Word Games! We are a local board game group based in New York, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Scrabble, Card Games, Word Gaming, Puzzle Hunts, Logic Puzzles, Games, Board Games, Puzzles, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"New York","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Scrabble', 'Card Games', 'Word Gaming', 'Puzzle Hunts', 'Logic Puzzles', 'Games', 'Board Games', 'Puzzles', 'Game Night']::text[],
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
  'https://www.meetup.com/nynja-word-puzzles-and-word-games/',
  'nynja-word-puzzles-and-word-games',
  '2026-04-25T01:17:48.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('nynja-word-puzzles-and-word-games', 'meetup', 'https://www.meetup.com/nynja-word-puzzles-and-word-games/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'teg-plan-tctico-y-estratgico-de-la-guerra',
  'TEG Plan Táctico y Estratégico de la Guerra',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  39,
  'Weekly',
  'Welcome to TEG Plan Táctico y Estratégico de la Guerra! We are a local board game group based in Buenos Aires, AR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Tabletop Role Playing and Board Games, Board Games, Tabletop Board Games, MicroStrategy, Cooperative Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Buenos Aires","state":"","country":"AR","zipCode":""}'::jsonb,
  '',
  ARRAY['Tabletop Role Playing and Board Games', 'Board Games', 'Tabletop Board Games', 'MicroStrategy', 'Cooperative Board Games', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/teg-plan-tactico-y-estrategico-de-la-guerra/',
  'teg-plan-tctico-y-estratgico-de-la-guerra',
  '2026-04-25T01:17:53.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('teg-plan-tctico-y-estratgico-de-la-guerra', 'meetup', 'https://www.meetup.com/teg-plan-tactico-y-estrategico-de-la-guerra/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'ladies-game-night-at-cedar-grove',
  'Ladies game night at Cedar Grove',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  17,
  'Weekly',
  'Welcome to Ladies game night at Cedar Grove! We are a local board game group based in Vicksburg, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Mahjong, Card Games, Strategy Games, Board Games, Games, Game Night, American Mahjong. Join us at our next meetup!',
  'Public',
  '{"city":"Vicksburg","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Mahjong', 'Card Games', 'Strategy Games', 'Board Games', 'Games', 'Game Night', 'American Mahjong']::text[],
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
  'https://www.meetup.com/ladies-game-night-at-cedar-grove/',
  'ladies-game-night-at-cedar-grove',
  '2026-04-25T01:18:00.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('ladies-game-night-at-cedar-grove', 'meetup', 'https://www.meetup.com/ladies-game-night-at-cedar-grove/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'prague-quiz-nights',
  'Prague Quiz Nights',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  30,
  'Weekly',
  'Welcome to Prague Quiz Nights! We are a local board game group based in Prague, CZ focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Quiz Nights, Pub Trivia Quiz, Strategy Games, Games, Game Night, Gaming, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Prague","state":"","country":"CZ","zipCode":""}'::jsonb,
  '',
  ARRAY['Quiz Nights', 'Pub Trivia Quiz', 'Strategy Games', 'Games', 'Game Night', 'Gaming', 'Board Games']::text[],
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
  'https://www.meetup.com/prague-quiz-nights/',
  'prague-quiz-nights',
  '2026-04-25T01:18:05.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('prague-quiz-nights', 'meetup', 'https://www.meetup.com/prague-quiz-nights/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'denpasar-chess-meetup',
  'Denpasar Chess Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  43,
  'Weekly',
  'Welcome to Denpasar Chess Meetup! We are a local board game group based in Denpasar, ID focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Chess, Games, Strategy Games, Board Games, Game Night, Social Chess Club, Chess Enthusiasts. Join us at our next meetup!',
  'Public',
  '{"city":"Denpasar","state":"","country":"ID","zipCode":""}'::jsonb,
  '',
  ARRAY['Chess', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Social Chess Club', 'Chess Enthusiasts']::text[],
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
  'https://www.meetup.com/denpasar-chess-meetup/',
  'denpasar-chess-meetup',
  '2026-04-25T01:18:12.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('denpasar-chess-meetup', 'meetup', 'https://www.meetup.com/denpasar-chess-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'peachtree-city-board-games-meetup--zombicide',
  'Peachtree City Board Games Meetup- Zombicide',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  28,
  'Weekly',
  'Welcome to Peachtree City Board Games Meetup- Zombicide! We are a local board game group based in Peachtree City, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Sci-Fi/Fantasy, Game Night, Geek Culture, Games, Strategy Games, Gaming, Science Fiction, Board Games, Geeks & Nerds. Join us at our next meetup!',
  'Public',
  '{"city":"Peachtree City","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Sci-Fi/Fantasy', 'Game Night', 'Geek Culture', 'Games', 'Strategy Games', 'Gaming', 'Science Fiction', 'Board Games', 'Geeks & Nerds']::text[],
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
  'https://www.meetup.com/peachtree-city-board-games-meetup-zombicide/',
  'peachtree-city-board-games-meetup--zombicide',
  '2026-04-25T01:18:17.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('peachtree-city-board-games-meetup--zombicide', 'meetup', 'https://www.meetup.com/peachtree-city-board-games-meetup-zombicide/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'dnd-and-boardgames-maassluis',
  'Dnd and boardgames maassluis',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  21,
  'Weekly',
  'Welcome to Dnd and boardgames maassluis! We are a local board game group based in Maassluis, NL focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Games, Board Games, Game Night, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Maassluis","state":"","country":"NL","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Games', 'Board Games', 'Game Night', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games']::text[],
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
  'https://www.meetup.com/dnd-and-boardgames-maassluis/',
  'dnd-and-boardgames-maassluis',
  '2026-04-25T01:18:23.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('dnd-and-boardgames-maassluis', 'meetup', 'https://www.meetup.com/dnd-and-boardgames-maassluis/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'apa-pool-league',
  'Apa Pool League',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  237,
  'Weekly',
  'Welcome to Apa Pool League! We are a local board game group based in Santa Rosa, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Pool, Games, Roleplaying Games (RPGs), Strategy Games, Gaming, Billiards, Board Games, Pool Leagues, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Santa Rosa","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Pool', 'Games', 'Roleplaying Games (RPGs)', 'Strategy Games', 'Gaming', 'Billiards', 'Board Games', 'Pool Leagues', 'Game Night']::text[],
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
  'https://www.meetup.com/apa-pool-league/',
  'apa-pool-league',
  '2026-04-25T01:18:29.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('apa-pool-league', 'meetup', 'https://www.meetup.com/apa-pool-league/')
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
  '2026-04-25T01:18:35.000Z'::timestamptz
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
  '2026-04-25T01:18:40.000Z'::timestamptz
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
  '2026-04-25T01:18:44.000Z'::timestamptz
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
  '2026-04-25T01:18:50.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('armoury-bar-gaming-community', 'meetup', 'https://www.meetup.com/armoury-bar-gaming-community/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'sf-backgammon-club',
  'SF Backgammon Club',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  321,
  'Weekly',
  'Welcome to SF Backgammon Club! We are a local board game group based in San Francisco, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Card Games, Social, Games, Board Games, Game Night, Outdoors, Fun Times, Gaming, Conversation. Join us at our next meetup!',
  'Public',
  '{"city":"San Francisco","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Card Games', 'Social', 'Games', 'Board Games', 'Game Night', 'Outdoors', 'Fun Times', 'Gaming', 'Conversation']::text[],
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
  'https://www.meetup.com/backgammon-and-brews/',
  'sf-backgammon-club',
  '2026-04-25T01:18:55.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('sf-backgammon-club', 'meetup', 'https://www.meetup.com/backgammon-and-brews/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'northwest-side-chicago-board-game-friends',
  'Northwest Side Chicago Board Game Friends',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  3904,
  'Weekly',
  'Welcome to Northwest Side Chicago Board Game Friends! We are a local board game group based in Chicago, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Cooperative Board Games, Tabletop Board Games, Strategy Board Games, Games, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games, European Board Games, Strategy Games, Gaming, Board Games, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"Chicago","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Cooperative Board Games', 'Tabletop Board Games', 'Strategy Board Games', 'Games', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games', 'European Board Games', 'Strategy Games', 'Gaming', 'Board Games', 'Game Night']::text[],
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
  'https://www.meetup.com/northwest-side-chicago-board-game-friends/',
  'northwest-side-chicago-board-game-friends',
  '2026-04-25T01:18:59.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('northwest-side-chicago-board-game-friends', 'meetup', 'https://www.meetup.com/northwest-side-chicago-board-game-friends/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'nynja-word-puzzles-and-word-games',
  'NYNJA Word Puzzles and Word Games',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  410,
  'Weekly',
  'Welcome to NYNJA Word Puzzles and Word Games! We are a local board game group based in New York, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Scrabble, Card Games, Word Gaming, Puzzle Hunts, Logic Puzzles, Games, Board Games, Puzzles, Game Night. Join us at our next meetup!',
  'Public',
  '{"city":"New York","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Scrabble', 'Card Games', 'Word Gaming', 'Puzzle Hunts', 'Logic Puzzles', 'Games', 'Board Games', 'Puzzles', 'Game Night']::text[],
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
  'https://www.meetup.com/nynja-word-puzzles-and-word-games/',
  'nynja-word-puzzles-and-word-games',
  '2026-04-25T01:19:03.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('nynja-word-puzzles-and-word-games', 'meetup', 'https://www.meetup.com/nynja-word-puzzles-and-word-games/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'teg-plan-tctico-y-estratgico-de-la-guerra',
  'TEG Plan Táctico y Estratégico de la Guerra',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  39,
  'Weekly',
  'Welcome to TEG Plan Táctico y Estratégico de la Guerra! We are a local board game group based in Buenos Aires, AR focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Tabletop Role Playing and Board Games, Board Games, Tabletop Board Games, MicroStrategy, Cooperative Board Games, Strategy Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Buenos Aires","state":"","country":"AR","zipCode":""}'::jsonb,
  '',
  ARRAY['Tabletop Role Playing and Board Games', 'Board Games', 'Tabletop Board Games', 'MicroStrategy', 'Cooperative Board Games', 'Strategy Board Games']::text[],
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
  'https://www.meetup.com/teg-plan-tactico-y-estrategico-de-la-guerra/',
  'teg-plan-tctico-y-estratgico-de-la-guerra',
  '2026-04-25T01:19:08.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('teg-plan-tctico-y-estratgico-de-la-guerra', 'meetup', 'https://www.meetup.com/teg-plan-tactico-y-estrategico-de-la-guerra/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'ladies-game-night-at-cedar-grove',
  'Ladies game night at Cedar Grove',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  17,
  'Weekly',
  'Welcome to Ladies game night at Cedar Grove! We are a local board game group based in Vicksburg, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Mahjong, Card Games, Strategy Games, Board Games, Games, Game Night, American Mahjong. Join us at our next meetup!',
  'Public',
  '{"city":"Vicksburg","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Mahjong', 'Card Games', 'Strategy Games', 'Board Games', 'Games', 'Game Night', 'American Mahjong']::text[],
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
  'https://www.meetup.com/ladies-game-night-at-cedar-grove/',
  'ladies-game-night-at-cedar-grove',
  '2026-04-25T01:19:12.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('ladies-game-night-at-cedar-grove', 'meetup', 'https://www.meetup.com/ladies-game-night-at-cedar-grove/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'prague-quiz-nights',
  'Prague Quiz Nights',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  30,
  'Weekly',
  'Welcome to Prague Quiz Nights! We are a local board game group based in Prague, CZ focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Quiz Nights, Pub Trivia Quiz, Strategy Games, Games, Game Night, Gaming, Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Prague","state":"","country":"CZ","zipCode":""}'::jsonb,
  '',
  ARRAY['Quiz Nights', 'Pub Trivia Quiz', 'Strategy Games', 'Games', 'Game Night', 'Gaming', 'Board Games']::text[],
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
  'https://www.meetup.com/prague-quiz-nights/',
  'prague-quiz-nights',
  '2026-04-25T01:19:18.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('prague-quiz-nights', 'meetup', 'https://www.meetup.com/prague-quiz-nights/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'denpasar-chess-meetup',
  'Denpasar Chess Meetup',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  43,
  'Weekly',
  'Welcome to Denpasar Chess Meetup! We are a local board game group based in Denpasar, ID focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Chess, Games, Strategy Games, Board Games, Game Night, Social Chess Club, Chess Enthusiasts. Join us at our next meetup!',
  'Public',
  '{"city":"Denpasar","state":"","country":"ID","zipCode":""}'::jsonb,
  '',
  ARRAY['Chess', 'Games', 'Strategy Games', 'Board Games', 'Game Night', 'Social Chess Club', 'Chess Enthusiasts']::text[],
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
  'https://www.meetup.com/denpasar-chess-meetup/',
  'denpasar-chess-meetup',
  '2026-04-25T01:19:23.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('denpasar-chess-meetup', 'meetup', 'https://www.meetup.com/denpasar-chess-meetup/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'peachtree-city-board-games-meetup--zombicide',
  'Peachtree City Board Games Meetup- Zombicide',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  28,
  'Weekly',
  'Welcome to Peachtree City Board Games Meetup- Zombicide! We are a local board game group based in Peachtree City, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Sci-Fi/Fantasy, Game Night, Geek Culture, Games, Strategy Games, Gaming, Science Fiction, Board Games, Geeks & Nerds. Join us at our next meetup!',
  'Public',
  '{"city":"Peachtree City","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Sci-Fi/Fantasy', 'Game Night', 'Geek Culture', 'Games', 'Strategy Games', 'Gaming', 'Science Fiction', 'Board Games', 'Geeks & Nerds']::text[],
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
  'https://www.meetup.com/peachtree-city-board-games-meetup-zombicide/',
  'peachtree-city-board-games-meetup--zombicide',
  '2026-04-25T01:19:27.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('peachtree-city-board-games-meetup--zombicide', 'meetup', 'https://www.meetup.com/peachtree-city-board-games-meetup-zombicide/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'dnd-and-boardgames-maassluis',
  'Dnd and boardgames maassluis',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  21,
  'Weekly',
  'Welcome to Dnd and boardgames maassluis! We are a local board game group based in Maassluis, NL focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Dungeons & Dragons, Games, Board Games, Game Night, Roleplaying Games (RPGs), Tabletop Role Playing and Board Games. Join us at our next meetup!',
  'Public',
  '{"city":"Maassluis","state":"","country":"NL","zipCode":""}'::jsonb,
  '',
  ARRAY['Dungeons & Dragons', 'Games', 'Board Games', 'Game Night', 'Roleplaying Games (RPGs)', 'Tabletop Role Playing and Board Games']::text[],
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
  'https://www.meetup.com/dnd-and-boardgames-maassluis/',
  'dnd-and-boardgames-maassluis',
  '2026-04-25T01:19:33.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('dnd-and-boardgames-maassluis', 'meetup', 'https://www.meetup.com/dnd-and-boardgames-maassluis/')
ON CONFLICT ("groupId", platform) DO NOTHING;

INSERT INTO public.groups (
  id, name, "coverImage", "memberCount", "meetingFrequency", 
  description, privacy, location, "primaryVenue", tags, 
  "groupType", "groupSize", "experienceLevel", "isClaimed", "isVerified", 
  "isActive", organizer, "contactMethods", "meetupDetails", status, 
  source, external_url, slug, last_scraped_at
)
VALUES (
  'monroe-warhammer-40k-meetup-group',
  'Monroe Warhammer 40K Meetup Group',
  'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=800&h=400&fit=crop',
  20,
  'Weekly',
  'Welcome to Monroe Warhammer 40K Meetup Group! We are a local board game group based in Monroe, US focused on bringing people together to play tabletop games, socialize, and have fun. Topics we cover include: Games, Tabletop Role Playing and Board Games, Painting, Strategy Games, Board Games, Warhammer 40K, Card Games, Warhammer. Join us at our next meetup!',
  'Public',
  '{"city":"Monroe","state":"","country":"US","zipCode":""}'::jsonb,
  '',
  ARRAY['Games', 'Tabletop Role Playing and Board Games', 'Painting', 'Strategy Games', 'Board Games', 'Warhammer 40K', 'Card Games', 'Warhammer']::text[],
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
  'https://www.meetup.com/monroe-warhammer-40k-meetup-group/',
  'monroe-warhammer-40k-meetup-group',
  '2026-04-25T01:19:40.000Z'::timestamptz
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.group_social_links ("groupId", platform, url)
VALUES ('monroe-warhammer-40k-meetup-group', 'meetup', 'https://www.meetup.com/monroe-warhammer-40k-meetup-group/')
ON CONFLICT ("groupId", platform) DO NOTHING;

