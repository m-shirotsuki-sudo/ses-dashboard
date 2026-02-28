import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";

export const metadata: Metadata = {
  title: "SES Dashboard",
  description: "SES営業ダッシュボード - 売上・要員管理",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-background text-foreground antialiased">
        <Sidebar />
        <main className="ml-64 min-h-screen px-8 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
