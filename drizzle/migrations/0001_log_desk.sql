create extension if not exists pgcrypto with schema extensions;

create table if not exists public.log_reviews (
  slug text primary key check (public.is_essay_slug(slug)),
  rating integer check (rating between 1 and 10),
  note text not null default '' check (char_length(note) <= 2000),
  updated_at timestamptz not null default now()
);

create table if not exists public.log_desk_key (
  id boolean primary key default true check (id),
  key_sha256 text not null,
  set_at timestamptz not null default now()
);

alter table public.log_reviews enable row level security;
alter table public.log_desk_key enable row level security;
revoke all on public.log_reviews from anon, authenticated;
revoke all on public.log_desk_key from anon, authenticated;

create or replace function public.log_desk_set_key(p_key text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_key is null or char_length(p_key) < 8 then
    raise exception 'passphrase must be at least 8 characters';
  end if;
  insert into public.log_desk_key (id, key_sha256)
  values (true, encode(extensions.digest(p_key, 'sha256'), 'hex'))
  on conflict (id) do update
    set key_sha256 = excluded.key_sha256, set_at = now();
end;
$$;
revoke all on function public.log_desk_set_key(text) from public, anon, authenticated;

create or replace function public.log_desk_ok(p_key text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.log_desk_key k
     where k.key_sha256 = encode(extensions.digest(coalesce(p_key, ''), 'sha256'), 'hex')
  )
$$;
revoke all on function public.log_desk_ok(text) from public, anon, authenticated;

create or replace function public.log_desk_load(p_key text)
returns table (slug text, rating integer, note text, updated_at timestamptz)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
  if not public.log_desk_ok(p_key) then
    raise exception 'wrong passphrase';
  end if;
  return query
    select r.slug, r.rating, r.note, r.updated_at
      from public.log_reviews r
     order by r.updated_at desc;
end;
$$;

create or replace function public.log_desk_save(
  p_key text, p_slug text, p_rating integer, p_note text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_note text := btrim(coalesce(p_note, ''));
begin
  if not public.log_desk_ok(p_key) then
    raise exception 'wrong passphrase';
  end if;
  if not public.is_essay_slug(p_slug) then
    raise exception 'invalid slug';
  end if;
  if p_rating is not null and p_rating not between 1 and 10 then
    raise exception 'rating must be 1 to 10';
  end if;
  if char_length(v_note) > 2000 then
    raise exception 'line is too long';
  end if;
  insert into public.log_reviews as r (slug, rating, note)
  values (p_slug, p_rating, v_note)
  on conflict (slug) do update
    set rating = excluded.rating, note = excluded.note, updated_at = now();
end;
$$;

revoke all on function public.log_desk_load(text) from public;
revoke all on function public.log_desk_save(text, text, integer, text) from public;
grant execute on function public.log_desk_load(text) to anon, authenticated;
grant execute on function public.log_desk_save(text, text, integer, text) to anon, authenticated;

select public.log_desk_set_key('desk-lantern-3197');