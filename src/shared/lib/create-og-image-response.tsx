import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const OG_SIZE = { width: 1200, height: 630 } as const;

export async function createOgImageResponse() {
  const buf = await readFile(join(process.cwd(), "public/og.png"));
  const src = `data:image/png;base64,${buf.toString("base64")}`;

  return new ImageResponse(
    (
      <div tw="relative flex h-full w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori OG */}
        <img
          alt=""
          src={src}
          height={OG_SIZE.height}
          width={OG_SIZE.width}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  );
}

export const ogImageSize = OG_SIZE;
