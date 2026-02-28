import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Deal } from "@/lib/data/types";

interface SalesPerformanceProps {
  deals: Deal[];
}

export function SalesPerformance({ deals }: SalesPerformanceProps) {
  const salesPersons = [...new Set(deals.map((d) => d.salesPerson))];

  const stats = salesPersons.map((person) => {
    const personDeals = deals.filter((d) => d.salesPerson === person);
    const won = personDeals.filter((d) => d.stage === "成約").length;
    const lost = personDeals.filter((d) => d.stage === "失注").length;
    const closed = won + lost;
    const active = personDeals.filter(
      (d) => !["成約", "失注"].includes(d.stage)
    ).length;

    return {
      person,
      total: personDeals.length,
      won,
      lost,
      active,
      winRate: closed > 0 ? Math.round((won / closed) * 100) : 0,
      expectedRevenue: personDeals
        .filter((d) => !["成約", "失注"].includes(d.stage))
        .reduce((sum, d) => sum + d.expectedRate, 0),
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>営業担当別実績</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>営業担当</TableHead>
              <TableHead className="text-right">商談数</TableHead>
              <TableHead className="text-right">成約</TableHead>
              <TableHead className="text-right">失注</TableHead>
              <TableHead className="text-right">進行中</TableHead>
              <TableHead className="text-right">成約率</TableHead>
              <TableHead className="text-right">見込み売上</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stats.map((s) => (
              <TableRow key={s.person}>
                <TableCell className="font-medium">{s.person}</TableCell>
                <TableCell className="text-right">{s.total}</TableCell>
                <TableCell className="text-right text-green-600">{s.won}</TableCell>
                <TableCell className="text-right text-red-600">{s.lost}</TableCell>
                <TableCell className="text-right">{s.active}</TableCell>
                <TableCell className="text-right font-medium">{s.winRate}%</TableCell>
                <TableCell className="text-right">{s.expectedRevenue}万円</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
