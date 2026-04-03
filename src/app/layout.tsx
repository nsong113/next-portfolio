import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { AppChrome } from "@/app/app-chrome";
import { AppProviders } from "@/app/providers";

import "@/shared/styles/index.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "송지우 | Frontend Portfolio",
  description: "프론트엔드 포트폴리오",
  keywords: ["Frontend", "React", "TypeScript", "Next.js", "Portfolio"],
  openGraph: {
    title: "송지우 | Frontend Developer",
    description: "TypeScript, Next.js 기반 프론트엔드 포트폴리오",
    url: "https://next-portfolio-phi-topaz.vercel.app/",
    siteName: "Frontend Portfolio",
    locale: "ko_KR",
    type: "website",
     images: [
      {
        url: "/app/icon.png",
        width: 630,
        height: 630,
        alt: "Jiu's Portfolio",
      },
    ],
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
