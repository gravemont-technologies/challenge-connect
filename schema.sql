-- ============================================
-- TAHQEEQ - Complete PostgreSQL Schema for Supabase
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('business', 'student', 'admin');
CREATE TYPE challenge_status AS ENUM ('draft', 'active', 'completed', 'archived');
CREATE TYPE match_status AS ENUM ('pending', 'accepted', 'rejected');
CREATE TYPE internship_status AS ENUM ('offered', 'accepted', 'declined', 'completed');

-- ============================================
-- TABLES
-- ============================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    profile_json JSONB DEFAULT '{}'::jsonb,
    last_sign_in TIMESTAMPTZ
);

-- Challenges table
CREATE TABLE challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    kpis_json JSONB DEFAULT '[]'::jsonb,
    status challenge_status DEFAULT 'draft',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    anonymized BOOLEAN DEFAULT FALSE
);

-- Matches table
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    fit_score NUMERIC(4,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status match_status DEFAULT 'pending',
    UNIQUE(challenge_id, student_id)
);

-- Submissions table
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE NOT NULL,
    content_text TEXT,
    score NUMERIC(5,2),
    feedback_text TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internships table
CREATE TABLE internships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status internship_status DEFAULT 'offered',
    offered_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(challenge_id, student_id)
);

-- Gamification table
CREATE TABLE gamification (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    badges_json JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT,
    email TEXT NOT NULL,
    company TEXT,
    role TEXT,
    queries_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_created_at ON users(created_at DESC);

-- Challenges indexes
CREATE INDEX idx_challenges_business_id ON challenges(business_id);
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_challenges_created_at ON challenges(created_at DESC);

-- Matches indexes
CREATE INDEX idx_matches_challenge_id ON matches(challenge_id);
CREATE INDEX idx_matches_student_id ON matches(student_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_matches_created_at ON matches(created_at DESC);
CREATE INDEX idx_matches_fit_score ON matches(fit_score DESC);

-- Submissions indexes
CREATE INDEX idx_submissions_match_id ON submissions(match_id);
CREATE INDEX idx_submissions_submitted_at ON submissions(submitted_at DESC);
CREATE INDEX idx_submissions_score ON submissions(score DESC);

-- Internships indexes
CREATE INDEX idx_internships_challenge_id ON internships(challenge_id);
CREATE INDEX idx_internships_student_id ON internships(student_id);
CREATE INDEX idx_internships_status ON internships(status);
CREATE INDEX idx_internships_offered_at ON internships(offered_at DESC);

-- Gamification indexes
CREATE INDEX idx_gamification_student_id ON gamification(student_id);
CREATE INDEX idx_gamification_points ON gamification(points DESC);
CREATE INDEX idx_gamification_level ON gamification(level DESC);

-- Leads indexes
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);

-- ============================================
-- TRIGGERS & FUNCTIONS
-- ============================================

-- Anonymization trigger for challenges
CREATE OR REPLACE FUNCTION anonymize_challenge_description()
RETURNS TRIGGER AS $$
BEGIN
    -- Replace company names and abbreviations with ***
    NEW.description := regexp_replace(
        NEW.description, 
        '\b(QNB|Ooredoo|Snoonu|Fatora|[A-Z]{3,})\b', 
        '***', 
        'g'
    );
    NEW.anonymized := TRUE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_anonymize_challenge
BEFORE INSERT OR UPDATE OF description ON challenges
FOR EACH ROW EXECUTE FUNCTION anonymize_challenge_description();

-- Auto-update gamification updated_at
CREATE OR REPLACE FUNCTION update_gamification_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at := NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_gamification_updated
BEFORE UPDATE ON gamification
FOR EACH ROW EXECUTE FUNCTION update_gamification_timestamp();

-- Auto-create gamification record for new students
CREATE OR REPLACE FUNCTION create_student_gamification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role = 'student' THEN
        INSERT INTO gamification (student_id)
        VALUES (NEW.id)
        ON CONFLICT (student_id) DO NOTHING;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_gamification
AFTER INSERT ON users
FOR EACH ROW EXECUTE FUNCTION create_student_gamification();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE internships ENABLE ROW LEVEL SECURITY;
ALTER TABLE gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ============================================
-- SECURITY DEFINER FUNCTIONS (prevent RLS recursion)
-- ============================================

CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT role FROM users WHERE id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM users WHERE id = _user_id AND role = 'admin'
    );
$$;

CREATE OR REPLACE FUNCTION public.is_business(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM users WHERE id = _user_id AND role = 'business'
    );
$$;

CREATE OR REPLACE FUNCTION public.is_student(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM users WHERE id = _user_id AND role = 'student'
    );
$$;

-- ============================================
-- RLS POLICIES - USERS
-- ============================================

-- Users can read their own row
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can update their own profile_json
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "Admins can read all users"
ON users FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- ============================================
-- RLS POLICIES - CHALLENGES
-- ============================================

-- Business owners can CRUD their own challenges
CREATE POLICY "Business can create challenges"
ON challenges FOR INSERT
TO authenticated
WITH CHECK (
    business_id = auth.uid() AND public.is_business(auth.uid())
);

CREATE POLICY "Business can read own challenges"
ON challenges FOR SELECT
TO authenticated
USING (business_id = auth.uid());

CREATE POLICY "Business can update own challenges"
ON challenges FOR UPDATE
TO authenticated
USING (business_id = auth.uid())
WITH CHECK (business_id = auth.uid());

CREATE POLICY "Business can delete own challenges"
ON challenges FOR DELETE
TO authenticated
USING (business_id = auth.uid());

-- Students can read active challenges
CREATE POLICY "Students can read active challenges"
ON challenges FOR SELECT
TO authenticated
USING (
    status = 'active' AND public.is_student(auth.uid())
);

-- Admins can read all challenges
CREATE POLICY "Admins can read all challenges"
ON challenges FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- ============================================
-- RLS POLICIES - MATCHES
-- ============================================

-- Students can view their own matches
CREATE POLICY "Students can read own matches"
ON matches FOR SELECT
TO authenticated
USING (student_id = auth.uid());

-- Business owners can view matches for their challenges
CREATE POLICY "Business can read matches for own challenges"
ON matches FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM challenges 
        WHERE challenges.id = matches.challenge_id 
        AND challenges.business_id = auth.uid()
    )
);

-- Business owners can create matches for their challenges
CREATE POLICY "Business can create matches"
ON matches FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM challenges 
        WHERE challenges.id = challenge_id 
        AND challenges.business_id = auth.uid()
    )
);

-- Students can update their own match status
CREATE POLICY "Students can update own match status"
ON matches FOR UPDATE
TO authenticated
USING (student_id = auth.uid())
WITH CHECK (student_id = auth.uid());

-- ============================================
-- RLS POLICIES - SUBMISSIONS
-- ============================================

-- Students can create submissions for their matches
CREATE POLICY "Students can create submissions"
ON submissions FOR INSERT
TO authenticated
WITH CHECK (
    EXISTS (
        SELECT 1 FROM matches 
        WHERE matches.id = match_id 
        AND matches.student_id = auth.uid()
    )
);

-- Students can read their own submissions
CREATE POLICY "Students can read own submissions"
ON submissions FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM matches 
        WHERE matches.id = match_id 
        AND matches.student_id = auth.uid()
    )
);

-- Business owners can read submissions for their challenges
CREATE POLICY "Business can read submissions for own challenges"
ON submissions FOR SELECT
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM matches 
        JOIN challenges ON challenges.id = matches.challenge_id
        WHERE matches.id = submissions.match_id 
        AND challenges.business_id = auth.uid()
    )
);

-- Business owners can update submissions (add score/feedback)
CREATE POLICY "Business can update submissions"
ON submissions FOR UPDATE
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM matches 
        JOIN challenges ON challenges.id = matches.challenge_id
        WHERE matches.id = submissions.match_id 
        AND challenges.business_id = auth.uid()
    )
);

-- ============================================
-- RLS POLICIES - INTERNSHIPS
-- ============================================

-- Students can read their own internships
CREATE POLICY "Students can read own internships"
ON internships FOR SELECT
TO authenticated
USING (student_id = auth.uid());

-- Business owners can CRUD internships for their challenges
CREATE POLICY "Business can manage internships"
ON internships FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM challenges 
        WHERE challenges.id = internships.challenge_id 
        AND challenges.business_id = auth.uid()
    )
);

-- Students can update internship status (accept/decline)
CREATE POLICY "Students can respond to internship offers"
ON internships FOR UPDATE
TO authenticated
USING (student_id = auth.uid())
WITH CHECK (student_id = auth.uid());

-- ============================================
-- RLS POLICIES - GAMIFICATION
-- ============================================

-- Students can read their own gamification
CREATE POLICY "Students can read own gamification"
ON gamification FOR SELECT
TO authenticated
USING (student_id = auth.uid());

-- Public leaderboard (top scores visible to all authenticated)
CREATE POLICY "Authenticated users can view leaderboard"
ON gamification FOR SELECT
TO authenticated
USING (true);

-- Only system can update gamification (via service role)
-- Students cannot directly modify their points

-- ============================================
-- RLS POLICIES - LEADS
-- ============================================

-- Anyone can insert leads (public form)
CREATE POLICY "Public can submit leads"
ON leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only admins can read leads
CREATE POLICY "Admins can read leads"
ON leads FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- ============================================
-- GRANTS
-- ============================================

-- Grant usage on schema
GRANT USAGE ON SCHEMA public TO anon, authenticated;

-- Grant access to tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT INSERT ON leads TO anon;

-- Grant access to sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
