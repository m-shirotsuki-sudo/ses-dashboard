-- ============================================
-- SES Dashboard DDL
-- Supabase SQL Editor で実行してください
-- ============================================

-- 1. updated_at 自動更新トリガー関数
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ============================================
-- 2. テーブル作成（FK 依存順）
-- ============================================

-- projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client text not null,
  required_skills text[] not null default '{}',
  rate_min numeric not null default 0,
  rate_max numeric not null default 0,
  status text not null default '商談中'
    check (status in ('商談中', '契約中', '終了')),
  start_date date not null,
  end_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger projects_updated_at
  before update on projects
  for each row execute function update_updated_at();

-- engineers
create table engineers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  skills text[] not null default '{}',
  status text not null default '待機中'
    check (status in ('稼働中', '待機中', '退職')),
  current_rate numeric not null default 0,
  current_project_id uuid references projects(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger engineers_updated_at
  before update on engineers
  for each row execute function update_updated_at();

-- contracts
create table contracts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  engineer_id uuid not null references engineers(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  rate numeric not null default 0,
  start_date date not null,
  end_date date,
  status text not null default '予定'
    check (status in ('契約中', '終了', '予定')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger contracts_updated_at
  before update on contracts
  for each row execute function update_updated_at();

-- deals
create table deals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client text not null,
  stage text not null default '新規'
    check (stage in ('新規', '提案中', '面談調整', '面談済', '内定', '成約', '失注')),
  expected_rate numeric not null default 0,
  sales_person text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger deals_updated_at
  before update on deals
  for each row execute function update_updated_at();

-- ============================================
-- 3. インデックス
-- ============================================
create index idx_engineers_status on engineers(status);
create index idx_projects_status on projects(status);
create index idx_contracts_status on contracts(status);
create index idx_contracts_engineer on contracts(engineer_id);
create index idx_contracts_project on contracts(project_id);
create index idx_deals_stage on deals(stage);

-- ============================================
-- 4. RLS（内部ダッシュボード用：全許可）
-- ============================================
alter table projects enable row level security;
alter table engineers enable row level security;
alter table contracts enable row level security;
alter table deals enable row level security;

create policy "Allow all on projects" on projects for all using (true) with check (true);
create policy "Allow all on engineers" on engineers for all using (true) with check (true);
create policy "Allow all on contracts" on contracts for all using (true) with check (true);
create policy "Allow all on deals" on deals for all using (true) with check (true);
