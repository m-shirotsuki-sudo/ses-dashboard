import { Header } from "@/components/layout/header";
import { EngineerTable } from "@/components/engineers/engineer-table";
import { SkillDistribution } from "@/components/engineers/skill-distribution";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEngineers } from "@/lib/data/engineers";
import { getProjects } from "@/lib/data/projects";

export const dynamic = "force-dynamic";

export default async function EngineersPage() {
  const [engineers, projects] = await Promise.all([
    getEngineers(),
    getProjects(),
  ]);

  const active = engineers.filter((e) => e.status !== "退職");
  const avgRate = active.filter((e) => e.currentRate > 0).reduce((sum, e) => sum + e.currentRate, 0) /
    active.filter((e) => e.currentRate > 0).length || 0;

  return (
    <>
      <Header title="要員管理" description="エンジニアの稼働状況とスキル分布" />

      <div className="grid gap-5 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">在籍数</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{active.length}名</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">稼働率</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">
              {active.length > 0
                ? Math.round((active.filter((e) => e.status === "稼働中").length / active.length) * 100)
                : 0}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-[12px] font-medium text-muted-foreground">平均単価</p>
            <p className="mt-2 text-2xl font-bold tracking-tight">{Math.round(avgRate)}万円</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <SkillDistribution engineers={engineers} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>エンジニア一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <EngineerTable engineers={engineers} projects={projects} />
        </CardContent>
      </Card>
    </>
  );
}
