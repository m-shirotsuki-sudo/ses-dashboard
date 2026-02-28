import { Header } from "@/components/layout/header";
import { RevenueTrendChart } from "@/components/revenue/revenue-trend-chart";
import { ProjectRevenueBreakdown } from "@/components/revenue/project-revenue-breakdown";
import { MonthlyRevenueTable } from "@/components/revenue/monthly-revenue-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContracts } from "@/lib/data/contracts";
import { getProjects } from "@/lib/data/projects";
import {
  calculateMonthlyRevenue,
  calculateProjectRevenue,
  getCurrentMonthRevenue,
} from "@/lib/revenue";

export const dynamic = "force-dynamic";

export default async function RevenuePage() {
  const [contracts, projects] = await Promise.all([
    getContracts(),
    getProjects(),
  ]);

  const monthlyRevenue = calculateMonthlyRevenue(contracts);
  const projectRevenue = calculateProjectRevenue(contracts, projects);
  const currentRevenue = getCurrentMonthRevenue(contracts);

  const prevMonth = monthlyRevenue[monthlyRevenue.length - 2];
  const diff = prevMonth ? currentRevenue - prevMonth.revenue : 0;

  return (
    <>
      <Header title="売上管理" description="月次売上推移と案件別内訳" />

      <div className="grid gap-5 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">当月売上</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{currentRevenue}万円</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">前月比</p>
            <p className={`mt-2 text-2xl font-bold tracking-tight ${diff >= 0 ? "text-emerald-600" : "text-red-500"}`}>
              {diff >= 0 ? "+" : ""}{diff}万円
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">稼働案件数</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{projectRevenue.length}件</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        <RevenueTrendChart data={monthlyRevenue} />
        <ProjectRevenueBreakdown data={projectRevenue} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>月次売上一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <MonthlyRevenueTable data={monthlyRevenue} />
        </CardContent>
      </Card>
    </>
  );
}
