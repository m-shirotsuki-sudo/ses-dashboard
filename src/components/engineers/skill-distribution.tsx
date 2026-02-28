"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Engineer } from "@/lib/data/types";

interface SkillDistributionProps {
  engineers: Engineer[];
}

export function SkillDistribution({ engineers }: SkillDistributionProps) {
  const skillCount = new Map<string, number>();
  for (const eng of engineers) {
    if (eng.status === "退職") continue;
    for (const skill of eng.skills) {
      skillCount.set(skill, (skillCount.get(skill) || 0) + 1);
    }
  }

  const data = Array.from(skillCount.entries())
    .map(([skill, count]) => ({ skill, 人数: count }))
    .sort((a, b) => b.人数 - a.人数);

  return (
    <Card>
      <CardHeader>
        <CardTitle>スキル分布</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="skill" fontSize={11} tickLine={false} axisLine={false} angle={-30} textAnchor="end" height={60} tick={{ fill: "#64748b" }} />
            <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{ fill: "#94a3b8" }} />
            <Tooltip
              formatter={(value) => [`${value}名`]}
              contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
            />
            <Bar dataKey="人数" fill="url(#skillGrad)" radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
