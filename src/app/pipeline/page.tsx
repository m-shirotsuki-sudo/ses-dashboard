import { Header } from "@/components/layout/header";
import { PipelineTable } from "@/components/pipeline/pipeline-table";
import { ConversionMetrics } from "@/components/pipeline/conversion-metrics";
import { SalesPerformance } from "@/components/pipeline/sales-performance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDeals } from "@/lib/data/pipeline";

export const revalidate = 300;

export default async function PipelinePage() {
  const deals = await getDeals();

  return (
    <>
      <Header title="商談管理" description="商談パイプラインと成約率の管理" />

      <div className="mb-6">
        <ConversionMetrics deals={deals} />
      </div>

      <div className="mb-6">
        <SalesPerformance deals={deals} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>商談一覧</CardTitle>
        </CardHeader>
        <CardContent>
          <PipelineTable deals={deals} />
        </CardContent>
      </Card>
    </>
  );
}
