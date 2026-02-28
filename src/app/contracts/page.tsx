import { Header } from "@/components/layout/header";
import { ContractTable } from "@/components/contracts/contract-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContracts } from "@/lib/data/contracts";
import { getEngineers } from "@/lib/data/engineers";
import { getProjects } from "@/lib/data/projects";

export const revalidate = 300;

export default async function ContractsPage() {
  const [contracts, engineers, projects] = await Promise.all([
    getContracts(),
    getEngineers(),
    getProjects(),
  ]);

  const activeContracts = contracts.filter((c) => c.status === "契約中");
  const totalMonthlyRevenue = activeContracts.reduce((sum, c) => sum + c.rate, 0);
  const avgRate = activeContracts.length > 0
    ? Math.round(totalMonthlyRevenue / activeContracts.length)
    : 0;

  return (
    <>
      <Header title="契約管理" description="契約の一覧と登録・編集・削除" />

      <div className="grid gap-5 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">契約中</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{activeContracts.length}件</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">月間売上合計</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{totalMonthlyRevenue}万円</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">平均単価</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{avgRate}万円</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>契約一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <ContractTable contracts={contracts} engineers={engineers} projects={projects} />
        </CardContent>
      </Card>
    </>
  );
}
