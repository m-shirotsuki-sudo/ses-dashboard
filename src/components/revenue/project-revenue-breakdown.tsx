"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS } from "@/lib/constants";
import type { ProjectRevenue } from "@/lib/data/types";

interface ProjectRevenueBreakdownProps {
  data: ProjectRevenue[];
}

export function ProjectRevenueBreakdown({ data }: ProjectRevenueBreakdownProps) {
  const chartData = data.map((d) => ({
    name: d.projectName.length > 12 ? d.projectName.slice(0, 12) + "…" : d.projectName,
    売上: d.revenue,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>案件別売上内訳（当月）</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}万`} tick={{ fill: "#94a3b8" }} />
            <YAxis type="category" dataKey="name" fontSize={11} tickLine={false} axisLine={false} width={130} tick={{ fill: "#64748b" }} />
            <Tooltip
              formatter={(value, name) => [
                name === "売上" ? `${value}万円` : `${value}名`,
                name,
              ]}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Bar dataKey="売上" radius={[0, 6, 6, 0]} barSize={20}>
              {chartData.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
