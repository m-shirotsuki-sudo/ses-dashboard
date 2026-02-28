import type { EngineerStatus, ProjectStatus, ContractStatus, DealStage } from "./data/types";

// エンジニアステータスの色
export const ENGINEER_STATUS_COLOR: Record<EngineerStatus, string> = {
  "稼働中": "bg-green-100 text-green-800",
  "待機中": "bg-yellow-100 text-yellow-800",
  "退職": "bg-gray-100 text-gray-500",
};

// 案件ステータスの色
export const PROJECT_STATUS_COLOR: Record<ProjectStatus, string> = {
  "商談中": "bg-blue-100 text-blue-800",
  "契約中": "bg-green-100 text-green-800",
  "終了": "bg-gray-100 text-gray-500",
};

// 契約ステータスの色
export const CONTRACT_STATUS_COLOR: Record<ContractStatus, string> = {
  "契約中": "bg-green-100 text-green-800",
  "終了": "bg-gray-100 text-gray-500",
  "予定": "bg-blue-100 text-blue-800",
};

// 商談ステージの色
export const DEAL_STAGE_COLOR: Record<DealStage, string> = {
  "新規": "bg-slate-100 text-slate-800",
  "提案中": "bg-blue-100 text-blue-800",
  "面談調整": "bg-indigo-100 text-indigo-800",
  "面談済": "bg-purple-100 text-purple-800",
  "内定": "bg-emerald-100 text-emerald-800",
  "成約": "bg-green-100 text-green-800",
  "失注": "bg-red-100 text-red-800",
};

// 商談ステージの順序（ファネル用）
export const DEAL_STAGE_ORDER: DealStage[] = [
  "新規",
  "提案中",
  "面談調整",
  "面談済",
  "内定",
  "成約",
];

// チャートカラーパレット
export const CHART_COLORS = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

// 稼働状況パイチャートの色
export const STATUS_PIE_COLORS: Record<EngineerStatus, string> = {
  "稼働中": "#10b981",
  "待機中": "#f59e0b",
  "退職": "#9ca3af",
};
