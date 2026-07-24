-- Create table for Youth Gym Reloaded Software
CREATE TABLE IF NOT EXISTS public.youthgym_leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    registration_id VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    mobile VARCHAR(50) NOT NULL,
    email VARCHAR(255),
    age_group VARCHAR(50),
    gender VARCHAR(50),
    fitness_goal VARCHAR(100),
    preferred_time VARCHAR(100),
    membership_plan VARCHAR(100),
    agree_to_terms BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.youthgym_leads ENABLE ROW LEVEL SECURITY;

-- Allow public insert access for lead registrations
CREATE POLICY "Allow public insert to youthgym_leads"
ON public.youthgym_leads FOR INSERT
WITH CHECK (true);

-- Allow public read access
CREATE POLICY "Allow public read from youthgym_leads"
ON public.youthgym_leads FOR SELECT
USING (true);
