"use client";

import { useState } from "react";
import type { StaticImageData } from "next/image";

import { imageWithFallbackKey } from "@/shared/lib/static-import-url";
import { DragScrollCarousel } from "@/shared/ui/drag-scroll-carousel";
import { ImageWithFallback } from "@/shared/ui/image-with-fallback";
import { PortfolioBackdropModal } from "@/shared/ui/portfolio-backdrop-modal";

type ProjectDetailGalleryProps = {
  title: string;
  images: readonly StaticImageData[];
};

const LIGHTBOX_PANEL_CLASS =
  "pointer-events-auto relative z-10 flex max-h-[min(92vh,900px)] w-[min(960px,calc(100vw-2rem))] max-w-[min(960px,100%)] flex-col overflow-hidden rounded-[15px] bg-modal-bg p-3 shadow-lg sm:p-4";

export function ProjectDetailGallery({ title, images }: ProjectDetailGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;
  const activeIndex = lightboxIndex ?? 0;
  const activeSrc = images[activeIndex];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <>
      <div className="-mx-4 mb-12 md:-mx-6">
        <DragScrollCarousel>
          {images.map((src, i) => (
            <div
              key={`${String(src)}-${i}`}
              className="relative aspect-video w-[min(100vw-2rem,28rem)] shrink-0 overflow-hidden rounded-[15px] border border-border/60 bg-muted/20 sm:w-104"
            >
              <ImageWithFallback
                key={imageWithFallbackKey(src)}
                src={src}
                alt=""
                className="h-full w-full object-cover"
                sizes="(max-width: 640px) 85vw, 400px"
                quality={75}
              />
              <button
                type="button"
                className="absolute inset-0 z-10 cursor-zoom-in bg-transparent p-0"
                aria-label={`${title} 이미지 ${i + 1} 크게 보기`}
                onClick={() => openLightbox(i)}
              />
            </div>
          ))}
        </DragScrollCarousel>
      </div>

      <PortfolioBackdropModal
        open={open}
        onClose={closeLightbox}
        panelClassName={LIGHTBOX_PANEL_CLASS}
        ariaLabelledBy="project-lightbox-title"
      >
        <span id="project-lightbox-title" className="sr-only">
          {title} 스크린샷 {activeIndex + 1}
        </span>
        <div className="relative h-[min(75vh,640px)] w-full overflow-hidden rounded-lg border border-border/40 bg-muted/20 sm:h-[min(80vh,720px)]">
          {activeSrc ? (
            <ImageWithFallback
              key={imageWithFallbackKey(activeSrc)}
              src={activeSrc}
              alt={`${title} — ${activeIndex + 1}`}
              className="object-contain"
              sizes="(max-width: 960px) 100vw, 960px"
              quality={90}
            />
          ) : null}
        </div>
        <button
          type="button"
          className="mt-3 w-full border border-primary bg-modal-bg px-4 py-3 text-sm font-medium uppercase tracking-wider text-primary transition-colors hover:bg-[#58C4FF]/10"
          onClick={closeLightbox}
        >
          닫기
        </button>
      </PortfolioBackdropModal>
    </>
  );
}
