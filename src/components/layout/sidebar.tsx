"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Briefcase,
  FileText,
  Handshake,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "ダッシュボード", icon: LayoutDashboard },
  { href: "/revenue", label: "売上管理", icon: TrendingUp },
  { href: "/engineers", label: "要員管理", icon: Users },
  { href: "/projects", label: "案件管理", icon: Briefcase },
  { href: "/contracts", label: "契約管理", icon: FileText },
  { href: "/pipeline", label: "商談管理", icon: Handshake },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-white border-r border-border/60">
      <div className="flex h-16 items-center gap-3 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-md shadow-blue-200">
          <Briefcase className="h-4.5 w-4.5 text-white" />
        </div>
        <div>
          <span className="text-base font-bold tracking-tight text-foreground">SES Dashboard</span>
        </div>
      </div>

      <div className="px-4 pt-2 pb-2">
        <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
          メニュー
        </p>
      </div>

      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              )}
            >
              <item.icon className={cn("h-[18px] w-[18px]", isActive ? "text-blue-600" : "text-slate-400")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <p className="text-[11px] font-medium text-muted-foreground">
            Supabase 接続中
          </p>
        </div>
      </div>
    </aside>
  );
}
