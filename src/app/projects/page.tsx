import { Header } from "@/components/layout/header";
import { ProjectTable } from "@/components/projects/project-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/data/projects";
import { getContracts } from "@/lib/data/contracts";

export const revalidate = 300;

export default async function ProjectsPage() {
  const [projects, contracts] = await Promise.all([
    getProjects(),
    getContracts(),
  ]);

  const activeContracts = contracts.filter((c) => c.status === "契約中");
  const totalMonthlyFromProjects = activeContracts.reduce((sum, c) => sum + c.rate, 0);

  return (
    <>
      <Header title="案件管理" description="案件の一覧とステータス管理" />

      <div className="grid gap-5 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">契約中案件</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {projects.filter((p) => p.status === "契約中").length}件
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">商談中案件</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {projects.filter((p) => p.status === "商談中").length}件
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">月間売上合計</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{totalMonthlyFromProjects}万円</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>案件一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectTable projects={projects} contracts={contracts} />
        </CardContent>
      </Card>
    </>
  );
}
