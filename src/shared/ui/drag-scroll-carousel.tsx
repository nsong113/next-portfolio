"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
} from "react";

type DragScrollCarouselProps = {
  children: ReactNode;
  className?: string;
};

const EDGE_EPS = 2;

export function DragScrollCarousel({
  children,
  className,
}: DragScrollCarouselProps): ReactElement {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollEdges = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = Math.max(0, scrollWidth - clientWidth);
    setCanScrollLeft(scrollLeft > EDGE_EPS);
    setCanScrollRight(scrollLeft < maxScroll - EDGE_EPS);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const inner = el.firstElementChild as HTMLElement | null;

    updateScrollEdges();
    el.addEventListener("scroll", updateScrollEdges, { passive: true });
    window.addEventListener("resize", updateScrollEdges);

    const ro = new ResizeObserver(() => {
      updateScrollEdges();
    });
    ro.observe(el);
    if (inner) ro.observe(inner);

    const id = window.requestAnimationFrame(updateScrollEdges);

    return () => {
      window.cancelAnimationFrame(id);
      el.removeEventListener("scroll", updateScrollEdges);
      window.removeEventListener("resize", updateScrollEdges);
      ro.disconnect();
    };
  }, [updateScrollEdges]);

  const scrollByViewport = (direction: -1 | 1) => {
    const el = viewportRef.current;
    if (!el) return;
    const delta = Math.min(el.clientWidth * 0.85, 520) * direction;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el) return;
    const t = e.target as HTMLElement;
    if (t.closest('button,input,textarea,select,a,label,[data-no-drag="true"]'))
      return;
    el.setPointerCapture(e.pointerId);
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: el.scrollLeft };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = viewportRef.current;
    if (!el || !isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    el.scrollLeft = dragStart.current.scrollLeft - dx;
  };

  const endDrag = () => setIsDragging(false);

  useEffect(() => {
    const up = () => {
      if (isDragging) endDrag();
    };
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, [isDragging]);

  return (
    <div
      className={`relative ${canScrollLeft || canScrollRight ? "px-3 sm:px-5" : ""} ${className ?? ""}`}
    >
      {canScrollLeft ? (
        <button
          type="button"
          aria-label="이전"
          className="absolute -left-6 top-1/2 z-10 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-primary/35 bg-background/90 text-primary shadow-md backdrop-blur-sm transition-colors hover:border-primary/55 hover:bg-primary/10 sm:-left-10 md:-left-12"
          onClick={() => scrollByViewport(-1)}
        >
          <ChevronLeft className="size-8 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}
      {canScrollRight ? (
        <button
          type="button"
          aria-label="다음"
          className="absolute -right-6 top-1/2 z-10 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-primary/35 bg-background/90 text-primary shadow-md backdrop-blur-sm transition-colors hover:border-primary/55 hover:bg-primary/10 sm:-right-10 md:-right-12"
          onClick={() => scrollByViewport(1)}
        >
          <ChevronRight className="size-8 shrink-0" strokeWidth={2.25} aria-hidden />
        </button>
      ) : null}

      <div
        ref={viewportRef}
        className="w-full overflow-x-auto overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden [&_img]:pointer-events-none"
        onDragStart={(e) => e.preventDefault()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          className={`flex gap-4 pb-1 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
