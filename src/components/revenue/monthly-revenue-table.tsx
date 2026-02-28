import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { MonthlyRevenue } from "@/lib/data/types";

interface MonthlyRevenueTableProps {
  data: MonthlyRevenue[];
}

export function MonthlyRevenueTable({ data }: MonthlyRevenueTableProps) {
  const reversed = [...data].reverse();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>月</TableHead>
          <TableHead className="text-right">売上（万円）</TableHead>
          <TableHead className="text-right">契約数</TableHead>
          <TableHead className="text-right">平均単価（万円）</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reversed.map((row) => (
          <TableRow key={row.month}>
            <TableCell className="font-medium">{row.month}</TableCell>
            <TableCell className="text-right">{row.revenue.toLocaleString()}</TableCell>
            <TableCell className="text-right">{row.contractCount}</TableCell>
            <TableCell className="text-right">
              {row.contractCount > 0
                ? Math.round(row.revenue / row.contractCount).toLocaleString()
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
