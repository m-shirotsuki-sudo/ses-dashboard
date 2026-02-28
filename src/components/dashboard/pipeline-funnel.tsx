"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DEAL_STAGE_ORDER } from "@/lib/constants";
import type { Deal } from "@/lib/data/types";

interface PipelineFunnelProps {
  deals: Deal[];
}

const FUNNEL_COLORS = [
  "#94a3b8",
  "#60a5fa",
  "#818cf8",
  "#a78bfa",
  "#34d399",
  "#10b981",
];

export function PipelineFunnel({ deals }: PipelineFunnelProps) {
  const data = DEAL_STAGE_ORDER.map((stage) => ({
    stage,
    件数: deals.filter((d) => d.stage === stage).length,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>商談パイプライン</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" fontSize={11} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
            <YAxis
              type="category"
              dataKey="stage"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
              tick={{ fill: "#64748b" }}
            />
            <Tooltip
              formatter={(value) => [`${value}件`]}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Bar dataKey="件数" radius={[0, 6, 6, 0]} barSize={24}>
              {data.map((_, index) => (
                <Cell key={index} fill={FUNNEL_COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
