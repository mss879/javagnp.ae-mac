-- ═══════════════════════════════════════════════════
-- MIGRATION 003: ADMIN NOTES — personal notes for admins
-- Run this in your Supabase SQL Editor
-- ═══════════════════════════════════════════════════

-- admin_notes: personal notes for admin users
CREATE TABLE admin_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled',
  content TEXT DEFAULT '',
  color TEXT DEFAULT '#1C2530',   -- note card background color
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_admin_notes_user_id ON admin_notes(user_id);
CREATE INDEX idx_admin_notes_pinned ON admin_notes(is_pinned DESC, updated_at DESC);

-- Row Level Security
ALTER TABLE admin_notes ENABLE ROW LEVEL SECURITY;

-- Users can only CRUD their own notes
CREATE POLICY "Users can manage their own notes"
  ON admin_notes FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
