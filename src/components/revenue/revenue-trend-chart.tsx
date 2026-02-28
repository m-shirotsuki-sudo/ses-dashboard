"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthlyRevenue } from "@/lib/data/types";

interface RevenueTrendChartProps {
  data: MonthlyRevenue[];
}

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  const chartData = data.map((d) => ({
    month: d.month,
    売上: d.revenue,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>月次売上推移</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
            <YAxis fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}万`} tick={{ fill: "#94a3b8" }} />
            <Tooltip
              formatter={(value, name) => [
                name === "売上" ? `${value}万円` : `${value}件`,
                name,
              ]}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="売上"
              stroke="#3b82f6"
              fill="url(#trendGrad)"
              strokeWidth={2.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
