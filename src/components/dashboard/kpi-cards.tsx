import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Users, Briefcase, Handshake } from "lucide-react";

interface KpiCardsProps {
  totalRevenue: number;
  activeEngineers: number;
  waitingEngineers: number;
  activeProjects: number;
  activeDeals: number;
}

export function KpiCards({
  totalRevenue,
  activeEngineers,
  waitingEngineers,
  activeProjects,
  activeDeals,
}: KpiCardsProps) {
  const cards = [
    {
      title: "当月売上",
      value: `${totalRevenue}万円`,
      icon: TrendingUp,
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      shadow: "shadow-blue-100",
    },
    {
      title: "稼働中エンジニア",
      value: `${activeEngineers}名`,
      sub: `待機 ${waitingEngineers}名`,
      icon: Users,
      iconBg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-100",
    },
    {
      title: "進行中案件",
      value: `${activeProjects}件`,
      icon: Briefcase,
      iconBg: "bg-gradient-to-br from-violet-500 to-violet-600",
      shadow: "shadow-violet-100",
    },
    {
      title: "進行中商談",
      value: `${activeDeals}件`,
      icon: Handshake,
      iconBg: "bg-gradient-to-br from-amber-500 to-amber-600",
      shadow: "shadow-amber-100",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[12px] font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {card.value}
                </p>
                {card.sub && (
                  <p className="mt-1 text-[12px] text-muted-foreground">{card.sub}</p>
                )}
              </div>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.iconBg} shadow-md ${card.shadow}`}>
                <card.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
