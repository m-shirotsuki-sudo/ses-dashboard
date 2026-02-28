import type { Contract, MonthlyRevenue, ProjectRevenue } from "./data/types";

/**
 * 指定月にアクティブな契約を判定
 */
function isActiveInMonth(contract: Contract, yearMonth: string): boolean {
  const [year, month] = yearMonth.split("-").map(Number);
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0); // 月末日

  const contractStart = new Date(contract.startDate);
  const contractEnd = contract.endDate ? new Date(contract.endDate) : new Date(2099, 11, 31);

  return contractStart <= monthEnd && contractEnd >= monthStart;
}

/**
 * 月次売上を計算（過去12ヶ月分）
 */
export function calculateMonthlyRevenue(
  contracts: Contract[],
  months: number = 12
): MonthlyRevenue[] {
  const result: MonthlyRevenue[] = [];
  const now = new Date();

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const yearMonth = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    const activeContracts = contracts.filter((c) => isActiveInMonth(c, yearMonth));
    const revenue = activeContracts.reduce((sum, c) => sum + c.rate, 0);

    result.push({
      month: yearMonth,
      revenue,
      contractCount: activeContracts.length,
    });
  }

  return result;
}

/**
 * 案件別の月次売上を計算（当月）
 */
export function calculateProjectRevenue(
  contracts: Contract[],
  projects: { id: string; name: string; client: string }[]
): ProjectRevenue[] {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const projectMap = new Map(projects.map((p) => [p.id, p]));
  const revenueMap = new Map<string, { revenue: number; engineerCount: number }>();

  for (const contract of contracts) {
    if (!isActiveInMonth(contract, currentMonth)) continue;

    const existing = revenueMap.get(contract.projectId) || { revenue: 0, engineerCount: 0 };
    existing.revenue += contract.rate;
    existing.engineerCount += 1;
    revenueMap.set(contract.projectId, existing);
  }

  return Array.from(revenueMap.entries())
    .map(([projectId, data]) => {
      const project = projectMap.get(projectId);
      return {
        projectId,
        projectName: project?.name ?? "不明",
        client: project?.client ?? "不明",
        revenue: data.revenue,
        engineerCount: data.engineerCount,
      };
    })
    .sort((a, b) => b.revenue - a.revenue);
}

/**
 * 当月の合計売上
 */
export function getCurrentMonthRevenue(contracts: Contract[]): number {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  return contracts
    .filter((c) => isActiveInMonth(c, currentMonth))
    .reduce((sum, c) => sum + c.rate, 0);
}
