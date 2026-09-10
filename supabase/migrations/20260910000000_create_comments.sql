create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  nickname text not null check (char_length(nickname) between 1 and 20),
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy "Anyone can read comments"
  on public.comments for select
  to anon, authenticated
  using (true);

create policy "Anyone can add a comment"
  on public.comments for insert
  to anon, authenticated
  with check (true);
