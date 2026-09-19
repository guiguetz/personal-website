-- Execute in Supabase SQL Editor.
-- This version removes possible policy/role mismatch and explicitly grants access.

grant usage on schema public to anon;
grant insert on public.contact_messages to anon;

drop policy if exists "public can send contact messages" on public.contact_messages;
drop policy if exists "Allow anonymous contact inserts" on public.contact_messages;

create policy "Allow anonymous contact inserts"
on public.contact_messages
as permissive
for insert
to public
with check (true);

-- Diagnostic: this should show the policy after execution.
select policyname, roles, cmd, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'contact_messages';
