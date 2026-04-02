"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

/** 부모에 `relative`와 높이·폭(또는 aspect 등)이 있어야 합니다 — `fill` 사용 */
export type ImageWithFallbackProps = Omit<
  ImageProps,
  "onError" | "fill" | "width" | "height"
> & {
  /**
   * 뷰포트에 맞게 요청 폭을 줄이려면 반드시 지정하세요.
   * 카드/그리드는 `(max-width:768px) 100vw, 45vw` 등으로 좁히는 것이 좋습니다.
   */
  sizes?: string;
};

export function ImageWithFallback({
  src,
  alt = "",
  className,
  style,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px",
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

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
          fill
          className="object-cover opacity-50"
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
      className={className}
      style={style}
      sizes={sizes}
      onError={() => setDidError(true)}
      {...rest}
    />
  );
}
