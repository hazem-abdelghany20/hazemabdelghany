-- Reads, reactions and most-highlighted lines for the essays.
--
-- Counters only — no personal data, no accounts. Everyone can read the
-- counts; nobody can write to the tables directly. Every write goes through
-- one of the security-definer functions below, which check their input.
-- Anonymous counters can be inflated; the site keeps them honest enough with
-- display floors and once-per-device limits in the browser.
--
-- Idempotent on purpose: safe to run again if it gets applied twice.

-- An essay slug as the site builds it (src/lib/essays.ts essaySlug): lowercase
-- words joined by single hyphens. Both languages share the English slug.
create or replace function public.is_essay_slug(p_slug text)
returns boolean
language sql
immutable
set search_path = ''
as $$
  select p_slug is not null
     and char_length(p_slug) <= 120
     and p_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
$$;

-- ---------------------------------------------------------------- reads
create table if not exists public.essay_stats (
  slug text primary key check (public.is_essay_slug(slug)),
  reads integer not null default 0 check (reads >= 0),
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------ reactions
create table if not exists public.essay_reactions (
  slug text not null check (public.is_essay_slug(slug)),
  kind text not null check (kind in ('landed', 'think', 'saving')),
  count integer not null default 0 check (count >= 0),
  primary key (slug, kind)
);

-- ----------------------------------------------------------- highlights
-- Raw rows are never readable through the API; only the aggregate
-- (most_highlighted) is.
create table if not exists public.highlights (
  id bigint generated always as identity primary key,
  slug text not null check (public.is_essay_slug(slug)),
  lang text not null check (lang in ('en', 'ar')),
  text text not null check (char_length(text) between 10 and 280),
  created_at timestamptz not null default now()
);
create index if not exists highlights_slug_lang_text on public.highlights (slug, lang, text);

-- ------------------------------------------------------------ access
alter table public.essay_stats enable row level security;
alter table public.essay_reactions enable row level security;
alter table public.highlights enable row level security;

drop policy if exists "Counts are public" on public.essay_stats;
create policy "Counts are public" on public.essay_stats for select using (true);
drop policy if exists "Counts are public" on public.essay_reactions;
create policy "Counts are public" on public.essay_reactions for select using (true);
-- highlights: no policy at all, so no direct access.

revoke insert, update, delete, truncate on public.essay_stats from anon, authenticated;
revoke insert, update, delete, truncate on public.essay_reactions from anon, authenticated;
revoke all on public.highlights from anon, authenticated;
grant select on public.essay_stats to anon, authenticated;
grant select on public.essay_reactions to anon, authenticated;

-- ---------------------------------------------------------- functions

-- One read of an essay (the browser sends at most one per essay per device
-- per day). Returns the new total.
create or replace function public.record_read(p_slug text)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_reads integer;
begin
  if not public.is_essay_slug(p_slug) then
    raise exception 'invalid slug';
  end if;
  insert into public.essay_stats as s (slug, reads)
  values (p_slug, 1)
  on conflict (slug) do update set reads = s.reads + 1, updated_at = now()
  returning s.reads into v_reads;
  return v_reads;
end;
$$;

-- Add (p_on = true) or take back (p_on = false) one reaction. Returns the
-- essay's reaction counts as {"landed": n, "think": n, "saving": n}.
create or replace function public.react(p_slug text, p_kind text, p_on boolean default true)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_counts jsonb;
begin
  if not public.is_essay_slug(p_slug) then
    raise exception 'invalid slug';
  end if;
  if p_kind is null or p_kind not in ('landed', 'think', 'saving') then
    raise exception 'invalid reaction';
  end if;
  insert into public.essay_reactions as r (slug, kind, count)
  values (p_slug, p_kind, case when p_on then 1 else 0 end)
  on conflict (slug, kind) do update
    set count = greatest(0, r.count + case when p_on then 1 else -1 end);
  select coalesce(jsonb_object_agg(r.kind, r.count), '{}'::jsonb)
    into v_counts
    from public.essay_reactions r
   where r.slug = p_slug;
  return v_counts;
end;
$$;

-- Store one highlighted passage: 10–280 characters, whitespace collapsed.
create or replace function public.add_highlight(p_slug text, p_lang text, p_text text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_text text := btrim(regexp_replace(coalesce(p_text, ''), '\s+', ' ', 'g'));
begin
  if not public.is_essay_slug(p_slug) then
    raise exception 'invalid slug';
  end if;
  if p_lang is null or p_lang not in ('en', 'ar') then
    raise exception 'invalid language';
  end if;
  if char_length(v_text) not between 10 and 280 then
    raise exception 'highlight must be 10 to 280 characters';
  end if;
  insert into public.highlights (slug, lang, text) values (p_slug, p_lang, v_text);
end;
$$;

-- The most-highlighted passages of one edition of an essay (at least 3
-- readers each), most first. The site only marks a passage it finds, word
-- for word, in the essay — text that isn't in the essay never shows.
create or replace function public.most_highlighted(p_slug text, p_lang text)
returns table (passage text, readers integer)
language sql
stable
security definer
set search_path = ''
as $$
  select h.text, count(*)::integer
    from public.highlights h
   where h.slug = p_slug and h.lang = p_lang
   group by h.text
  having count(*) >= 3
   order by count(*) desc, min(h.created_at)
   limit 5
$$;

revoke all on function public.record_read(text) from public;
revoke all on function public.react(text, text, boolean) from public;
revoke all on function public.add_highlight(text, text, text) from public;
revoke all on function public.most_highlighted(text, text) from public;
grant execute on function public.record_read(text) to anon, authenticated;
grant execute on function public.react(text, text, boolean) to anon, authenticated;
grant execute on function public.add_highlight(text, text, text) to anon, authenticated;
grant execute on function public.most_highlighted(text, text) to anon, authenticated;