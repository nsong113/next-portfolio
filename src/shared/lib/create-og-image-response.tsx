import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const OG_SIZE = { width: 1200, height: 630 } as const;

const OG_BG =
  "linear-gradient(135deg, #0f172a 0%, #1e293b 42%, #0c1222 100%)";

export async function createOgImageResponse() {
  const fontData = await readFile(
    join(
      process.cwd(),
      "node_modules/pretendard/dist/public/static/alternative/Pretendard-SemiBold.ttf",
    ),
  );

  return new ImageResponse(
    (
      <div
        style={{ background: OG_BG }}
        tw="flex h-full w-full flex-col justify-center px-[72px]"
      >
        <div
          style={{ fontFamily: "Pretendard" }}
          tw="text-[68px] font-semibold leading-[1.12] tracking-tight text-slate-50"
        >
          송지우
        </div>
        <div
          style={{ fontFamily: "Pretendard" }}
          tw="mt-3.5 text-[30px] text-slate-400"
        >
          Frontend Developer · Portfolio
        </div>
        <div
          style={{ fontFamily: "Pretendard" }}
          tw="mt-9 max-w-[900px] text-[22px] leading-[1.45] text-slate-500"
        >
          TypeScript, Next.js 기반 프론트엔드 포트폴리오
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        {
          name: "Pretendard",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}

export const ogImageSize = OG_SIZE;
