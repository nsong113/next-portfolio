import { ThemeToggle } from "@/features/theme-toggle";
import { FadeIn } from "@/shared/ui/fade-in";

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <span className="text-sm font-medium tracking-tight">Portfolio</span>
        <ThemeToggle />
      </header>
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-16">
        <FadeIn>
          <p className="text-sm text-muted-foreground">FSD · Next.js App Router</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            개인 포트폴리오
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            widgets · features · entities · shared 레이어로 화면과 도메인을 나누고,
            라우트는 src/app 에만 둡니다.
          </p>
        </FadeIn>
      </main>
    </div>
  );
}
