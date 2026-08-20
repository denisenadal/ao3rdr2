-- Run this if you created fics with a composite primary key on (user_id, ao3id).
-- Each row gets its own auto-generated id; user_id + ao3id stay as normal columns.

alter table public.fics add column if not exists id uuid default gen_random_uuid();

update public.fics
set id = gen_random_uuid()
where id is null;

alter table public.fics alter column id set not null;
alter table public.fics alter column id set default gen_random_uuid();

-- Drop a composite PK if the dashboard created one on (user_id, ao3id).
alter table public.fics drop constraint if exists fics_pkey;

alter table public.fics add primary key (id);

-- Optional but recommended: one bookmark per AO3 work per user (not the row id).
alter table public.fics drop constraint if exists fics_user_id_ao3id_key;
alter table public.fics add constraint fics_user_id_ao3id_key unique (user_id, ao3id);
