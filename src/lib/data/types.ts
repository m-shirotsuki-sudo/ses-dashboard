// エンジニア
export type EngineerStatus = "稼働中" | "待機中" | "退職";

export interface Engineer {
  id: string;
  name: string;
  skills: string[];
  status: EngineerStatus;
  currentRate: number; // 万円/月
  currentProjectId: string | null;
}

// 案件
export type ProjectStatus = "商談中" | "契約中" | "終了";

export interface Project {
  id: string;
  name: string;
  client: string;
  requiredSkills: string[];
  rateMin: number; // 万円
  rateMax: number; // 万円
  status: ProjectStatus;
  startDate: string; // YYYY-MM-DD
  endDate: string | null;
}

// 契約
export type ContractStatus = "契約中" | "終了" | "予定";

export interface Contract {
  id: string;
  name: string;
  engineerId: string;
  projectId: string;
  rate: number; // 万円/月
  startDate: string;
  endDate: string | null;
  status: ContractStatus;
}

// 商談
export type DealStage = "新規" | "提案中" | "面談調整" | "面談済" | "内定" | "成約" | "失注";

export interface Deal {
  id: string;
  name: string;
  client: string;
  stage: DealStage;
  expectedRate: number; // 万円
  salesPerson: string;
  createdAt: string;
}

// 売上集計
export interface MonthlyRevenue {
  month: string; // YYYY-MM
  revenue: number; // 万円
  contractCount: number;
}

// 案件別売上
export interface ProjectRevenue {
  projectId: string;
  projectName: string;
  client: string;
  revenue: number;
  engineerCount: number;
}
