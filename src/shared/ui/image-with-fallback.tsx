"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export { imageWithFallbackKey } from "@/shared/lib/static-import-url";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/**
 * 부모에 `relative`와 높이·폭(또는 aspect 등)이 있어야 합니다 — `fill` 사용.
 * `src`가 바뀔 때 에러 UI를 리셋하려면 `key={imageWithFallbackKey(src)}` 권장.
 */
export type ImageWithFallbackProps = Omit<
  ImageProps,
  "onError" | "fill" | "width" | "height"
> & {
  sizes?: string;
};

export function ImageWithFallback({
  src,
  alt = "",
  className,
  style,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  draggable = false,
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState<boolean>(false);

  if (src == null || src === "") {
    return null;
  }
  
  if (didError) {
    return (
      <div
        className={`relative inline-flex h-full w-full items-center justify-center bg-muted/30 ${className ?? ""}`}
        style={style}
      >
        <Image
          src={ERROR_IMG_SRC}
          alt=""
          aria-hidden
          fill
          draggable={draggable}
          className="object-cover object-center opacity-50"
          unoptimized
          sizes={sizes}
          data-original-url={
            typeof src === "string" ? src : "src" in src ? src.src : undefined
          }
        />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      draggable={draggable}
      className={`${className?.trim() ?? ""} object-center`.trim()}
      style={style}
      sizes={sizes}
      onError={() => setDidError(true)}
      {...rest}
    />
  );
}
