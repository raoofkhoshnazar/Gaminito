create extension if not exists pgcrypto;

create type public.app_role as enum ('parent', 'child', 'mentor', 'admin');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'parent',
  display_name text not null check (char_length(display_name) between 2 and 80),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, role, display_name)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'parent'),
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'کاربر جدید')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user();

create function public.app_health()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object('status', 'ok', 'timestamp', now());
$$;

grant execute on function public.app_health() to anon, authenticated;
