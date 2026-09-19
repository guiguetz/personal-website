-- Fix for: 42501 new row violates row-level security policy
-- Execute this in Supabase SQL Editor.

grant insert on table public.contact_messages to anon;

drop policy if exists "public can send contact messages" on public.contact_messages;

create policy "public can send contact messages"
on public.contact_messages
for insert
to anon
with check (true);
