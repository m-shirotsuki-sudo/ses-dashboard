import { Header } from "@/components/layout/header";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { StaffStatusChart } from "@/components/dashboard/staff-status-chart";
import { PipelineFunnel } from "@/components/dashboard/pipeline-funnel";
import { getEngineers } from "@/lib/data/engineers";
import { getContracts } from "@/lib/data/contracts";
import { getProjects } from "@/lib/data/projects";
import { getDeals } from "@/lib/data/pipeline";
import { calculateMonthlyRevenue, getCurrentMonthRevenue } from "@/lib/revenue";
import type { EngineerStatus } from "@/lib/data/types";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [engineers, contracts, projects, deals] = await Promise.all([
    getEngineers(),
    getContracts(),
    getProjects(),
    getDeals(),
  ]);

  const totalRevenue = getCurrentMonthRevenue(contracts);
  const monthlyRevenue = calculateMonthlyRevenue(contracts);

  const statusCounts: Record<EngineerStatus, number> = {
    "稼働中": engineers.filter((e) => e.status === "稼働中").length,
    "待機中": engineers.filter((e) => e.status === "待機中").length,
    "退職": engineers.filter((e) => e.status === "退職").length,
  };

  const activeProjects = projects.filter((p) => p.status === "契約中").length;
  const activeDeals = deals.filter(
    (d) => !["成約", "失注"].includes(d.stage)
  ).length;

  return (
    <>
      <Header title="ダッシュボード" description="SES事業の主要KPIを一覧で確認" />

      <KpiCards
        totalRevenue={totalRevenue}
        activeEngineers={statusCounts["稼働中"]}
        waitingEngineers={statusCounts["待機中"]}
        activeProjects={activeProjects}
        activeDeals={activeDeals}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <RevenueChart data={monthlyRevenue} />
        <StaffStatusChart statusCounts={statusCounts} />
      </div>

      <div className="mt-6">
        <PipelineFunnel deals={deals} />
      </div>
    </>
  );
}
