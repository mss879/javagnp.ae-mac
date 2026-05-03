-- ═══════════════════════════════════════════════════
-- MIGRATION 002: INQUIRIES — contact form submissions
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- inquiries: stores contact form submissions
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  inquiry_type TEXT NOT NULL,    -- 'enterprise', 'cloud', 'consulting', 'other'
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',     -- 'new', 'read', 'replied', 'archived'
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at DESC);
CREATE INDEX idx_inquiries_status ON inquiries(status);

-- Row Level Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (via API route with service role)
CREATE POLICY "Allow insert inquiries"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- Only authenticated admin users can read
CREATE POLICY "Authenticated users can read inquiries"
  ON inquiries FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only authenticated admin users can update (status, notes)
CREATE POLICY "Authenticated users can update inquiries"
  ON inquiries FOR UPDATE
  USING (auth.role() = 'authenticated');
