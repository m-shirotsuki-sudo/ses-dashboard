"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { STATUS_PIE_COLORS } from "@/lib/constants";
import type { EngineerStatus } from "@/lib/data/types";

interface StaffStatusChartProps {
  statusCounts: Record<EngineerStatus, number>;
}

export function StaffStatusChart({ statusCounts }: StaffStatusChartProps) {
  const data = (Object.entries(statusCounts) as [EngineerStatus, number][])
    .filter(([, count]) => count > 0)
    .map(([status, count]) => ({
      name: status,
      value: count,
    }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>要員稼働状況</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              dataKey="value"
              strokeWidth={2}
              stroke="#fff"
              label={({ name, value }) => `${name}: ${value}名`}
              labelLine={false}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={STATUS_PIE_COLORS[entry.name as EngineerStatus]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}名`]}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Legend
              wrapperStyle={{ fontSize: 12 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
