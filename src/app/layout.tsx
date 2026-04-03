import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppChrome } from "@/app/app-chrome";
import { AppProviders } from "@/app/providers";

import "@/shared/styles/index.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/** OG·Twitter 등에서 상대 이미지 URL을 절대 URL로 풀기 위해 필수 */
const siteUrl = "https://next-portfolio-phi-topaz.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "송지우 | Frontend Portfolio",
  description: "프론트엔드 포트폴리오",
  keywords: ["Frontend", "React", "TypeScript", "Next.js", "Portfolio"],
  openGraph: {
    title: "송지우 | Frontend Developer",
    description: "TypeScript, Next.js 기반 프론트엔드 포트폴리오",
    url: siteUrl,
    siteName: "Frontend Portfolio",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 614,
        height: 614,
        alt: "Jiu's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "송지우 | Frontend Developer",
    description: "TypeScript, Next.js 기반 프론트엔드 포트폴리오",
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AppProviders>
          <AppChrome>{children}</AppChrome>
        </AppProviders>
      </body>
    </html>
  );
}
