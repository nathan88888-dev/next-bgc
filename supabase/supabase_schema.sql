-- Migration to create tables matching mock data structures

-- 1. Profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user',
  status TEXT DEFAULT 'active',
  "joinedDate" TEXT,
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role, status, "joinedDate", email, name)
  VALUES (
    new.id, 
    'user', 
    'active', 
    to_char(now(), 'YYYY-MM-DD'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', new.email)
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Groups table
CREATE TABLE IF NOT EXISTS public.groups (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  "coverImage" TEXT,
  "memberCount" INTEGER DEFAULT 0,
  "meetingFrequency" TEXT,
  description TEXT,
  privacy TEXT,
  location JSONB, -- Stores { city, state, zipCode, coordinates: { lat, lng } }
  "primaryVenue" TEXT,
  tags TEXT[],
  "groupType" TEXT,
  "groupSize" TEXT,
  "experienceLevel" TEXT,
  "isClaimed" BOOLEAN DEFAULT FALSE,
  "isVerified" BOOLEAN DEFAULT FALSE,
  "isActive" BOOLEAN DEFAULT TRUE,
  organizer UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  "contactMethods" TEXT[],
  "meetupDetails" JSONB, -- Stores { privacy }
  catchline TEXT,
  status TEXT DEFAULT 'approved',
  "pendingOwnerId" UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  "rejectionReason" TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: We use a partial unique index on name, city, and state to ensure global uniqueness while excluding soft-deleted items
CREATE UNIQUE INDEX IF NOT EXISTS groups_name_city_state_idx 
ON public.groups (name, (location->>'city'), (location->>'state')) 
WHERE status != 'deleted';

-- 3. Group Reports table
CREATE TABLE IF NOT EXISTS public.group_reports (
  id TEXT PRIMARY KEY, -- Using TEXT to match mock IDs '1', '2'
  "groupId" TEXT REFERENCES public.groups(id),
  "groupName" TEXT,
  "reporterName" TEXT,
  "reporterEmail" TEXT,
  reason TEXT,
  description TEXT,
  status TEXT DEFAULT 'pending',
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  date TEXT, -- For compatibility with some mock data fields
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Meetup Events table
CREATE TABLE IF NOT EXISTS public.meetup_events (
  id TEXT PRIMARY KEY,
  "groupId" TEXT REFERENCES public.groups(id),
  title TEXT,
  date TEXT,
  time TEXT,
  location TEXT,
  attendees INTEGER,
  spots INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Social Posts table
CREATE TABLE IF NOT EXISTS public.social_posts (
  id TEXT PRIMARY KEY,
  "groupId" TEXT REFERENCES public.groups(id),
  platform TEXT,
  author TEXT,
  content TEXT,
  timestamp TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Discord Info table
CREATE TABLE IF NOT EXISTS public.discord_info (
  id TEXT PRIMARY KEY, -- typically 'default' or a groupId
  "groupId" TEXT REFERENCES public.groups(id),
  "serverName" TEXT,
  "memberCount" INTEGER,
  "onlineCount" INTEGER,
  channels JSONB, -- Stores array of { name, category }
  "recentMessages" JSONB, -- Stores array of { author, message, timestamp }
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- Enable RLS (Row Level Security) - Optional but recommended
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetup_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discord_info ENABLE ROW LEVEL SECURITY;


-- Simple policies for public read access (for a board game directory)
CREATE POLICY "Public read groups" ON public.groups FOR SELECT USING (true);
CREATE POLICY "Public read users" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read reports" ON public.group_reports FOR SELECT USING (true);
CREATE POLICY "Public read events" ON public.meetup_events FOR SELECT USING (true);
CREATE POLICY "Public read posts" ON public.social_posts FOR SELECT USING (true);
CREATE POLICY "Public read discord" ON public.discord_info FOR SELECT USING (true);

CREATE POLICY "Authenticated users can submit reports" ON public.group_reports FOR INSERT WITH CHECK (true);

-- 7. Group Social Links table
CREATE TABLE IF NOT EXISTS public.group_social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "groupId" TEXT REFERENCES public.groups(id),
  platform TEXT NOT NULL,
  url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE("groupId", platform)
);

ALTER TABLE public.group_social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read social links" ON public.group_social_links FOR SELECT USING (true);
CREATE POLICY "Public write social links" ON public.group_social_links FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update social links" ON public.group_social_links FOR UPDATE USING (true);
  
-- 8. Followed Groups table (Join table for user-to-group follows)
CREATE TABLE IF NOT EXISTS public.followed_groups (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  group_id TEXT REFERENCES public.groups(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, group_id)
);

ALTER TABLE public.followed_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own follows" ON public.followed_groups FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can follow groups" ON public.followed_groups FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unfollow groups" ON public.followed_groups FOR DELETE USING (auth.uid() = user_id);

-- 9. Group Claims table
CREATE TABLE IF NOT EXISTS public.group_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id TEXT REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  relationship_other TEXT,
  contact_email TEXT NOT NULL,
  phone TEXT,
  additional_details TEXT,
  documentation TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  rejection_reason TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS group_claims_group_id_pending_approved_idx 
ON public.group_claims (group_id) 
WHERE status IN ('pending', 'approved');

ALTER TABLE public.group_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can see their own claims" ON public.group_claims FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can see all claims" ON public.group_claims FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Users can submit claims" ON public.group_claims FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 10. Group Edit Suggestions table
CREATE TABLE IF NOT EXISTS public.group_edit_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id TEXT REFERENCES public.groups(id) ON DELETE CASCADE,
  suggested_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  suggested_data JSONB NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rejection_reason TEXT
);

ALTER TABLE public.group_edit_suggestions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can submit suggestions" ON public.group_edit_suggestions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins and Moderators can see all suggestions" ON public.group_edit_suggestions FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'moderator')
  )
);
CREATE POLICY "Users can see their own suggestions" ON public.group_edit_suggestions FOR SELECT USING (auth.uid() = suggested_by);
