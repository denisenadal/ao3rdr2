create table if not exists public.fics (
  id uuid primary key default gen_random_uuid(),  -- auto row id; do not set manually
  user_id uuid not null,
  ao3id bigint not null,                          -- AO3 work id, not the row id

  title text not null,
  author text[] not null default '{}',
  fandom text[] not null default '{}',
  category text,
  relationship text[] not null default '{}',
  summary text,
  word_count integer,

  chapters_published integer not null default 1,
  chapters_total integer,          -- null when unknown ("?" / "works"); complete must be false when null
  complete boolean not null default false,

  rating smallint not null default 0,  -- -1 dislike, 0 unset, 1/3/5 stars
  read boolean not null default false,
  visit timestamptz not null,
  crawled_at timestamptz,
  ao3_updated_at timestamptz,

  deleted boolean not null default false,
  hasupdate boolean not null default false,
  recrawl boolean not null default false,  -- true when author, fandom, or relationship is empty
  chapter_id text,                     -- last-read AO3 chapter id (7 rows today)
  notes text,
  personal_tags text[] not null default '{}',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint fics_user_id_ao3id_key unique (user_id, ao3id)  -- prevents duplicate bookmarks, not the PK
);

create index if not exists fics_user_visit_idx on public.fics (user_id, visit desc);
create index if not exists fics_user_rating_idx on public.fics (user_id, rating);
create index if not exists fics_user_recrawl_idx on public.fics (user_id) where recrawl = true;
create index if not exists fics_fandom_gin on public.fics using gin (fandom);
create index if not exists fics_personal_tags_gin on public.fics using gin (personal_tags);

alter table public.fics enable row level security;

drop policy if exists "users read own fics" on public.fics;
create policy "users read own fics"
  on public.fics for select
  using (auth.uid() = user_id);

drop policy if exists "users insert own fics" on public.fics;
create policy "users insert own fics"
  on public.fics for insert
  with check (auth.uid() = user_id);

drop policy if exists "users update own fics" on public.fics;
create policy "users update own fics"
  on public.fics for update
  using (auth.uid() = user_id);

drop policy if exists "users delete own fics" on public.fics;
create policy "users delete own fics"
  on public.fics for delete
  using (auth.uid() = user_id);
