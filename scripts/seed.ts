/**
 * シードスクリプト
 * 使い方: npx tsx scripts/seed.ts
 *
 * 環境変数 NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY が必要
 * .env.local を自動で読み込みます
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// .env.local を手動パース
const envPath = resolve(__dirname, "../.env.local");
const envContent = readFileSync(envPath, "utf-8");
const env: Record<string, string> = {};
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const [key, ...rest] = trimmed.split("=");
  env[key] = rest.join("=");
}

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY を .env.local に設定してください");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// --- UUID マッピング ---
import { randomUUID } from "crypto";

const projectIds: Record<string, string> = {};
const engineerIds: Record<string, string> = {};

for (let i = 1; i <= 9; i++) projectIds[`p${i}`] = randomUUID();
for (let i = 1; i <= 18; i++) engineerIds[`e${i}`] = randomUUID();

// --- Projects ---
const projects = [
  { id: projectIds.p1, name: "大手銀行 勘定系リプレース", client: "メガバンクA", required_skills: ["Java", "Spring Boot"], rate_min: 55, rate_max: 70, status: "契約中", start_date: "2025-04-01", end_date: "2026-03-31" },
  { id: projectIds.p2, name: "ECサイト刷新プロジェクト", client: "小売B社", required_skills: ["React", "TypeScript", "Go"], rate_min: 65, rate_max: 80, status: "契約中", start_date: "2025-07-01", end_date: "2026-06-30" },
  { id: projectIds.p3, name: "AI-OCR導入支援", client: "保険C社", required_skills: ["Python", "AWS"], rate_min: 58, rate_max: 75, status: "契約中", start_date: "2025-10-01", end_date: "2026-09-30" },
  { id: projectIds.p4, name: "社内業務システム開発", client: "製造D社", required_skills: ["C#", ".NET", "Ruby"], rate_min: 50, rate_max: 65, status: "契約中", start_date: "2025-06-01", end_date: "2026-05-31" },
  { id: projectIds.p5, name: "データ分析基盤構築", client: "通信E社", required_skills: ["Python", "GCP", "FastAPI"], rate_min: 70, rate_max: 85, status: "契約中", start_date: "2025-09-01", end_date: "2026-08-31" },
  { id: projectIds.p6, name: "販売管理Webアプリ開発", client: "商社F社", required_skills: ["Java", "Vue.js"], rate_min: 55, rate_max: 68, status: "契約中", start_date: "2025-11-01", end_date: "2026-04-30" },
  { id: projectIds.p7, name: "スマホアプリ新規開発", client: "スタートアップG社", required_skills: ["Swift", "React"], rate_min: 65, rate_max: 78, status: "契約中", start_date: "2025-08-01", end_date: "2026-07-31" },
  { id: projectIds.p8, name: "クラウド移行支援", client: "官公庁H", required_skills: ["AWS", "Terraform"], rate_min: 60, rate_max: 80, status: "商談中", start_date: "2026-04-01", end_date: null },
  { id: projectIds.p9, name: "基幹システム保守運用", client: "物流I社", required_skills: ["Java", "Oracle"], rate_min: 45, rate_max: 58, status: "終了", start_date: "2024-04-01", end_date: "2025-03-31" },
];

// --- Engineers ---
const engineers = [
  { id: engineerIds.e1, name: "田中 太郎", skills: ["Java", "Spring Boot", "AWS"], status: "稼働中", current_rate: 65, current_project_id: projectIds.p1 },
  { id: engineerIds.e2, name: "鈴木 花子", skills: ["React", "TypeScript", "Next.js"], status: "稼働中", current_rate: 70, current_project_id: projectIds.p2 },
  { id: engineerIds.e3, name: "佐藤 健一", skills: ["Python", "Django", "AWS"], status: "稼働中", current_rate: 60, current_project_id: projectIds.p3 },
  { id: engineerIds.e4, name: "山田 美咲", skills: ["React", "Vue.js", "TypeScript"], status: "待機中", current_rate: 0, current_project_id: null },
  { id: engineerIds.e5, name: "高橋 誠", skills: ["Java", "Oracle", "Linux"], status: "稼働中", current_rate: 55, current_project_id: projectIds.p1 },
  { id: engineerIds.e6, name: "伊藤 由美", skills: ["C#", ".NET", "Azure"], status: "稼働中", current_rate: 63, current_project_id: projectIds.p4 },
  { id: engineerIds.e7, name: "渡辺 翔太", skills: ["PHP", "Laravel", "MySQL"], status: "待機中", current_rate: 0, current_project_id: null },
  { id: engineerIds.e8, name: "中村 綾", skills: ["Python", "機械学習", "GCP"], status: "稼働中", current_rate: 80, current_project_id: projectIds.p5 },
  { id: engineerIds.e9, name: "小林 大輔", skills: ["Go", "Kubernetes", "AWS"], status: "稼働中", current_rate: 75, current_project_id: projectIds.p2 },
  { id: engineerIds.e10, name: "加藤 真理", skills: ["React", "Node.js", "TypeScript"], status: "稼働中", current_rate: 68, current_project_id: projectIds.p3 },
  { id: engineerIds.e11, name: "吉田 拓也", skills: ["Java", "Spring Boot", "PostgreSQL"], status: "稼働中", current_rate: 62, current_project_id: projectIds.p6 },
  { id: engineerIds.e12, name: "松本 さくら", skills: ["Swift", "iOS", "Kotlin"], status: "稼働中", current_rate: 72, current_project_id: projectIds.p7 },
  { id: engineerIds.e13, name: "井上 隆", skills: ["AWS", "Terraform", "Docker"], status: "待機中", current_rate: 0, current_project_id: null },
  { id: engineerIds.e14, name: "木村 恵", skills: ["Ruby", "Rails", "PostgreSQL"], status: "稼働中", current_rate: 58, current_project_id: projectIds.p4 },
  { id: engineerIds.e15, name: "林 健太", skills: ["Vue.js", "Nuxt.js", "TypeScript"], status: "稼働中", current_rate: 64, current_project_id: projectIds.p6 },
  { id: engineerIds.e16, name: "清水 麻衣", skills: ["Java", "AWS", "Microservices"], status: "退職", current_rate: 0, current_project_id: null },
  { id: engineerIds.e17, name: "森 浩二", skills: ["Python", "FastAPI", "Docker"], status: "稼働中", current_rate: 67, current_project_id: projectIds.p5 },
  { id: engineerIds.e18, name: "池田 沙織", skills: ["React", "GraphQL", "TypeScript"], status: "稼働中", current_rate: 71, current_project_id: projectIds.p7 },
];

// --- Contracts ---
const contracts = [
  { name: "田中-メガバンクA", engineer_id: engineerIds.e1, project_id: projectIds.p1, rate: 65, start_date: "2025-04-01", end_date: "2026-03-31", status: "契約中" },
  { name: "高橋-メガバンクA", engineer_id: engineerIds.e5, project_id: projectIds.p1, rate: 55, start_date: "2025-04-01", end_date: "2026-03-31", status: "契約中" },
  { name: "鈴木-小売B社", engineer_id: engineerIds.e2, project_id: projectIds.p2, rate: 70, start_date: "2025-07-01", end_date: "2026-06-30", status: "契約中" },
  { name: "小林-小売B社", engineer_id: engineerIds.e9, project_id: projectIds.p2, rate: 75, start_date: "2025-07-01", end_date: "2026-06-30", status: "契約中" },
  { name: "佐藤-保険C社", engineer_id: engineerIds.e3, project_id: projectIds.p3, rate: 60, start_date: "2025-10-01", end_date: "2026-09-30", status: "契約中" },
  { name: "加藤-保険C社", engineer_id: engineerIds.e10, project_id: projectIds.p3, rate: 68, start_date: "2025-10-01", end_date: "2026-09-30", status: "契約中" },
  { name: "伊藤-製造D社", engineer_id: engineerIds.e6, project_id: projectIds.p4, rate: 63, start_date: "2025-06-01", end_date: "2026-05-31", status: "契約中" },
  { name: "木村-製造D社", engineer_id: engineerIds.e14, project_id: projectIds.p4, rate: 58, start_date: "2025-06-01", end_date: "2026-05-31", status: "契約中" },
  { name: "中村-通信E社", engineer_id: engineerIds.e8, project_id: projectIds.p5, rate: 80, start_date: "2025-09-01", end_date: "2026-08-31", status: "契約中" },
  { name: "森-通信E社", engineer_id: engineerIds.e17, project_id: projectIds.p5, rate: 67, start_date: "2025-09-01", end_date: "2026-08-31", status: "契約中" },
  { name: "吉田-商社F社", engineer_id: engineerIds.e11, project_id: projectIds.p6, rate: 62, start_date: "2025-11-01", end_date: "2026-04-30", status: "契約中" },
  { name: "林-商社F社", engineer_id: engineerIds.e15, project_id: projectIds.p6, rate: 64, start_date: "2025-11-01", end_date: "2026-04-30", status: "契約中" },
  { name: "松本-スタートアップG社", engineer_id: engineerIds.e12, project_id: projectIds.p7, rate: 72, start_date: "2025-08-01", end_date: "2026-07-31", status: "契約中" },
  { name: "池田-スタートアップG社", engineer_id: engineerIds.e18, project_id: projectIds.p7, rate: 71, start_date: "2025-08-01", end_date: "2026-07-31", status: "契約中" },
  { name: "清水-物流I社", engineer_id: engineerIds.e16, project_id: projectIds.p9, rate: 50, start_date: "2024-04-01", end_date: "2025-03-31", status: "終了" },
];

// --- Deals ---
const deals = [
  { name: "クラウド移行支援案件", client: "官公庁H", stage: "面談調整", expected_rate: 70, sales_person: "営業A", created_at: "2026-01-15T00:00:00Z" },
  { name: "次期CRM導入", client: "不動産J社", stage: "提案中", expected_rate: 65, sales_person: "営業B", created_at: "2026-02-01T00:00:00Z" },
  { name: "セキュリティ診断支援", client: "金融K社", stage: "新規", expected_rate: 75, sales_person: "営業A", created_at: "2026-02-20T00:00:00Z" },
  { name: "DX推進支援", client: "食品L社", stage: "面談済", expected_rate: 60, sales_person: "営業C", created_at: "2025-12-10T00:00:00Z" },
  { name: "IoTプラットフォーム開発", client: "自動車M社", stage: "内定", expected_rate: 80, sales_person: "営業A", created_at: "2025-11-05T00:00:00Z" },
  { name: "人事システム刷新", client: "小売N社", stage: "提案中", expected_rate: 55, sales_person: "営業B", created_at: "2026-02-10T00:00:00Z" },
  { name: "物流最適化AI開発", client: "物流O社", stage: "面談調整", expected_rate: 78, sales_person: "営業C", created_at: "2026-01-25T00:00:00Z" },
  { name: "保険Webポータル開発", client: "保険P社", stage: "成約", expected_rate: 68, sales_person: "営業A", created_at: "2025-10-01T00:00:00Z" },
  { name: "マーケ分析ツール開発", client: "広告Q社", stage: "失注", expected_rate: 62, sales_person: "営業B", created_at: "2025-09-15T00:00:00Z" },
  { name: "基幹系API化", client: "製造R社", stage: "成約", expected_rate: 70, sales_person: "営業C", created_at: "2025-08-20T00:00:00Z" },
  { name: "ECモール連携開発", client: "小売S社", stage: "新規", expected_rate: 58, sales_person: "営業A", created_at: "2026-02-25T00:00:00Z" },
  { name: "在庫管理SaaS導入支援", client: "卸売T社", stage: "失注", expected_rate: 52, sales_person: "営業C", created_at: "2025-11-20T00:00:00Z" },
];

async function seed() {
  console.log("Seeding database...\n");

  // 既存データを削除（依存順の逆）
  console.log("Clearing existing data...");
  await supabase.from("contracts").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("deals").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("engineers").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("projects").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // Projects
  console.log("Inserting projects...");
  const { error: pErr } = await supabase.from("projects").insert(projects);
  if (pErr) { console.error("projects error:", pErr); return; }
  console.log(`  ✓ ${projects.length} projects`);

  // Engineers
  console.log("Inserting engineers...");
  const { error: eErr } = await supabase.from("engineers").insert(engineers);
  if (eErr) { console.error("engineers error:", eErr); return; }
  console.log(`  ✓ ${engineers.length} engineers`);

  // Contracts
  console.log("Inserting contracts...");
  const { error: cErr } = await supabase.from("contracts").insert(contracts);
  if (cErr) { console.error("contracts error:", cErr); return; }
  console.log(`  ✓ ${contracts.length} contracts`);

  // Deals
  console.log("Inserting deals...");
  const { error: dErr } = await supabase.from("deals").insert(deals);
  if (dErr) { console.error("deals error:", dErr); return; }
  console.log(`  ✓ ${deals.length} deals`);

  console.log("\nSeed completed!");
}

seed().catch(console.error);
