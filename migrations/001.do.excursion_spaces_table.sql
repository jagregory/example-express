create table excursion_spaces(
  id serial primary key,
  body jsonb not null,
  search tsvector,
  created_at timestamptz default now()
);
create index idx_excursion_spaces on excursion_spaces using GIN(body jsonb_path_ops);
create index idx_excursion_spaces_search on excursion_spaces using GIN(search);
