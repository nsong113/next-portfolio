"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useSplashGate } from "@/app/splash-gate-context";

import star from "@/shared/assets/ico/star.svg";
import darkStar from "@/shared/assets/ico/darkStar.svg";
import { NAV_ITEMS } from "@/entities/navigation/model/nav-items";

function sectionLinkHref(href: string) {
  if (!href.startsWith("#")) return href;
  return `/${href}`;
}

const ThemeToggle = dynamic(
  () => import("@/features/theme-toggle").then((m) => m.ThemeToggle),
  { ssr: false },
);

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { dismissSplash } = useSplashGate();

  function handleLogoClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      dismissSplash();
      return;
    }
    e.preventDefault();
    if (pathname === "/" || pathname === "") {
      dismissSplash();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    dismissSplash();
    router.push("/");
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-primary/20 backdrop-blur-md">
      <div className="mx-auto my-2 flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-2 md:px-6">
        <Link
          href="/"
          prefetch
          onClick={handleLogoClick}
          className="[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] text-xl font-bold text-logo-color flex items-center gap-2 transition-opacity hover:opacity-90 dark:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]"
        >
          &gt;
          <Image
            src={star}
            alt=""
            className="pointer-events-none h-6 w-6 hidden dark:inline-block"
            priority
          />
          <Image
            src={darkStar}
            alt=""
            className="pointer-events-none h-6 w-6 inline-block dark:hidden"
            priority
          />
          <span>FRONTEND_PORTFOLIO</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden space-x-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={sectionLinkHref(item.href)}
                prefetch={false}
                className="text-foreground transition-all duration-300 hover:text-opposite-color hover:[text-shadow:0_0_3px_rgba(80,5,255,0.035),0_0_8px_rgba(80,5,255,0.01)] dark:text-white dark:hover:text-primary dark:hover:[text-shadow:0_0_10px_rgba(88,187,246,0.36),0_0_24px_rgba(88,187,246,0.12)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
