-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (public contact form)
CREATE POLICY "Anyone can insert messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read messages (for admin dashboard - will add auth later if needed)
CREATE POLICY "Anyone can read messages" ON contact_messages
  FOR SELECT USING (true);

-- Allow anyone to update messages (for marking as read)
CREATE POLICY "Anyone can update messages" ON contact_messages
  FOR UPDATE USING (true);

-- Allow anyone to delete messages
CREATE POLICY "Anyone can delete messages" ON contact_messages
  FOR DELETE USING (true);
