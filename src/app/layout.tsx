import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/content/site";

const segoeFallback = Inter({
  variable: "--font-segoe",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} · ${siteConfig.role}`,
  description:
    "张鹏飞 · 产品设计工程师（PDE）作品集——以产品洞察、设计巧思与 AI 辅助端到端交付能力，面向 AI 驱动的产品组织。",
  keywords: [
    "PDE",
    "产品设计工程师",
    "作品集",
    "Product Design Engineer",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${segoeFallback.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
