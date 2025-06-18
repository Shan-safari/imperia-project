
-- Enable the vector extension for embedding support
CREATE EXTENSION IF NOT EXISTS vector;

-- Add engagement_logs table for tracking user engagement
CREATE TABLE public.engagement_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('sent_message', 'accepted_match', 'replied', 'scheduled_msg', 'payment', 'skipped_match', 'ignored_match')),
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Add new columns to profiles table for the matching engine
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS embedding_vector VECTOR(384);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS badges TEXT[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS match_quota INTEGER DEFAULT 3;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS industry TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS skills TEXT[];
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS vision TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS experience TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'English';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS availability TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS engagement_score DECIMAL DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS fast_message_count INTEGER DEFAULT 0;

-- Update matches table to support the new matching system
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS first_message_sent_at TIMESTAMP WITH TIME ZONE;

-- Enable Row Level Security on engagement_logs
ALTER TABLE public.engagement_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for engagement_logs
CREATE POLICY "Users can view their own engagement logs" ON public.engagement_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own engagement logs" ON public.engagement_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to calculate engagement score
CREATE OR REPLACE FUNCTION calculate_engagement_score(user_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
  score DECIMAL := 0;
  log_record RECORD;
  time_weight DECIMAL;
  hours_ago DECIMAL;
BEGIN
  -- Calculate engagement score based on recent activities
  FOR log_record IN 
    SELECT type, timestamp 
    FROM engagement_logs 
    WHERE user_id = user_uuid 
    AND timestamp > NOW() - INTERVAL '7 days'
  LOOP
    -- Calculate time decay (48h gets full weight, then exponential decay)
    hours_ago := EXTRACT(EPOCH FROM (NOW() - log_record.timestamp)) / 3600;
    
    IF hours_ago <= 48 THEN
      time_weight := 1.0;
    ELSE
      time_weight := EXP(-0.1 * (hours_ago - 48));
    END IF;
    
    -- Add points based on action type with time decay
    CASE log_record.type
      WHEN 'sent_message' THEN score := score + (10 * time_weight);
      WHEN 'replied' THEN score := score + (8 * time_weight);
      WHEN 'scheduled_msg' THEN score := score + (6 * time_weight);
      WHEN 'payment' THEN score := score + (20 * time_weight);
      WHEN 'skipped_match' THEN score := score - (3 * time_weight);
      WHEN 'ignored_match' THEN score := score - (5 * time_weight);
      WHEN 'accepted_match' THEN score := score + (5 * time_weight);
    END CASE;
  END LOOP;
  
  RETURN GREATEST(score, 0); -- Ensure score doesn't go negative
END;
$$ LANGUAGE plpgsql;

-- Function to update user engagement scores
CREATE OR REPLACE FUNCTION update_engagement_scores()
RETURNS void AS $$
BEGIN
  UPDATE profiles 
  SET engagement_score = calculate_engagement_score(id);
END;
$$ LANGUAGE plpgsql;

-- Function to expire old matches
CREATE OR REPLACE FUNCTION expire_old_matches()
RETURNS void AS $$
BEGIN
  -- Expire matches that are older than 20 minutes without first message
  UPDATE matches 
  SET status = 'expired'
  WHERE status = 'active' 
  AND first_message_sent_at IS NULL
  AND created_at < NOW() - INTERVAL '20 minutes';
  
  -- Expire matches older than 24 hours
  UPDATE matches 
  SET status = 'expired'
  WHERE status = 'active' 
  AND created_at < NOW() - INTERVAL '24 hours';
END;
$$ LANGUAGE plpgsql;

-- Function to award fast responder badge
CREATE OR REPLACE FUNCTION award_fast_responder_badge(user_uuid UUID, match_uuid UUID)
RETURNS void AS $$
DECLARE
  match_created_at TIMESTAMP WITH TIME ZONE;
  current_badges TEXT[];
BEGIN
  -- Get match creation time
  SELECT created_at INTO match_created_at FROM matches WHERE id = match_uuid;
  
  -- Check if message was sent within 5 minutes
  IF NOW() - match_created_at <= INTERVAL '5 minutes' THEN
    -- Get current badges
    SELECT badges INTO current_badges FROM profiles WHERE id = user_uuid;
    
    -- Add fast_responder badge if not already present
    IF NOT 'fast_responder' = ANY(current_badges) THEN
      UPDATE profiles 
      SET badges = array_append(badges, 'fast_responder'),
          fast_message_count = fast_message_count + 1
      WHERE id = user_uuid;
    ELSE
      -- Just increment the counter
      UPDATE profiles 
      SET fast_message_count = fast_message_count + 1
      WHERE id = user_uuid;
    END IF;
    
    -- Update match with first message timestamp
    UPDATE matches 
    SET first_message_sent_at = NOW()
    WHERE id = match_uuid;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_engagement_logs_user_timestamp ON engagement_logs(user_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_matches_status_created ON matches(status, created_at);
CREATE INDEX IF NOT EXISTS idx_profiles_embedding ON profiles USING ivfflat (embedding_vector vector_cosine_ops);
