-- ═══════════════════════════════════════════════════
-- MIGRATION 001: ANALYTICS — page_views table
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- page_views: stores every page view with geo and device data
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  device_type TEXT,       -- 'desktop', 'mobile', 'tablet'
  browser TEXT,
  os TEXT,
  session_id TEXT,        -- fingerprint-based session grouping
  visitor_id TEXT,        -- persistent visitor identifier (cookie-based)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for fast analytics queries
CREATE INDEX idx_page_views_created_at ON page_views(created_at DESC);
CREATE INDEX idx_page_views_visitor_id ON page_views(visitor_id);
CREATE INDEX idx_page_views_country ON page_views(country);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);

-- Row Level Security
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (the API route uses service role, but we keep this open)
CREATE POLICY "Allow insert page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin users can read analytics
CREATE POLICY "Authenticated users can read page views"
  ON page_views FOR SELECT
  USING (auth.role() = 'authenticated');
