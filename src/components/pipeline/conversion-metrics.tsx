import { Card, CardContent } from "@/components/ui/card";
import type { Deal } from "@/lib/data/types";

interface ConversionMetricsProps {
  deals: Deal[];
}

export function ConversionMetrics({ deals }: ConversionMetricsProps) {
  const total = deals.length;
  const won = deals.filter((d) => d.stage === "成約").length;
  const lost = deals.filter((d) => d.stage === "失注").length;
  const closed = won + lost;
  const winRate = closed > 0 ? Math.round((won / closed) * 100) : 0;

  const active = deals.filter(
    (d) => !["成約", "失注"].includes(d.stage)
  );
  const expectedRevenue = active.reduce((sum, d) => sum + d.expectedRate, 0);

  return (
    <div className="grid gap-5 md:grid-cols-4">
      <Card>
        <CardContent className="p-5">
          <p className="text-[12px] font-medium text-muted-foreground">全商談数</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{total}件</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-[12px] font-medium text-muted-foreground">成約率</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-emerald-600">{winRate}%</p>
          <p className="text-[11px] text-muted-foreground mt-1">
            成約 {won}件 / 完了 {closed}件
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-[12px] font-medium text-muted-foreground">進行中商談</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{active.length}件</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-5">
          <p className="text-[12px] font-medium text-muted-foreground">見込み売上合計</p>
          <p className="mt-2 text-2xl font-bold tracking-tight">{expectedRevenue}万円</p>
        </CardContent>
      </Card>
    </div>
  );
}
