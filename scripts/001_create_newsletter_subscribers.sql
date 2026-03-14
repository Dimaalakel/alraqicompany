-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe)
CREATE POLICY "anyone_can_subscribe" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read (for admin export - will be protected by app logic)
CREATE POLICY "anyone_can_read_subscribers" ON public.newsletter_subscribers
  FOR SELECT USING (true);
