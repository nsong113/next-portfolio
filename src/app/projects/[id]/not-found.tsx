"use client";

import Image from "next/image";
import { RefreshCw, Sparkles } from "lucide-react";

import notFoundIllustration from "@/shared/assets/images/404.png";

export default function ProjectNotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-4 py-16 text-center">
      <Sparkles
        aria-hidden
        className="pointer-events-none absolute left-[12%] top-[18%] size-6 text-neutral-200/80"
        strokeWidth={1.25}
      />
      <Sparkles
        aria-hidden
        className="pointer-events-none absolute right-[14%] top-[22%] size-5 rotate-12 text-neutral-200/70"
        strokeWidth={1.25}
      />
      <Sparkles
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] left-[18%] size-4 text-neutral-200/60"
        strokeWidth={1.25}
      />
      <Sparkles
        aria-hidden
        className="pointer-events-none absolute bottom-[24%] right-[12%] size-7 -rotate-6 text-neutral-200/75"
        strokeWidth={1.25}
      />

      <div className="relative z-10 flex max-w-xl flex-col items-center">
        <Image
          src={notFoundIllustration}
          width={571}
          height={418.88}
          alt="404 — project not found"
          className="h-auto w-full max-w-[571px]"
          priority
        />

        <p className="mt-10 max-w-md font-sans text-base leading-relaxed text-neutral-500">
          We seem to have run into a bit of a problem with this project,{" "}
          <span className="font-semibold text-primary">kindly reload.</span>
        </p>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-10 inline-flex items-center gap-2 rounded-[10px] bg-primary px-[30px] py-[15px] text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#d45565] active:bg-[#c94e5d]"
        >
          Reload
          <RefreshCw className="size-5 shrink-0" aria-hidden />
        </button>
      </div>
    </main>
  );
}
