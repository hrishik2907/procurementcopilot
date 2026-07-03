import { useCallback, useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";

export type LightboxImage = { src: string; alt?: string };

export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const dragging = useRef<{ x: number; y: number } | null>(null);

  const reset = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
  }, []);

  const prev = useCallback(() => {
    onIndexChange((index - 1 + images.length) % images.length);
    reset();
  }, [index, images.length, onIndexChange, reset]);

  const next = useCallback(() => {
    onIndexChange((index + 1) % images.length);
    reset();
  }, [index, images.length, onIndexChange, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "+" || e.key === "=") setScale((s) => Math.min(6, s + 0.25));
      if (e.key === "-") setScale((s) => Math.max(1, s - 0.25));
      if (e.key === "0") reset();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next, reset]);

  const img = images[index];

  return (
    <div
      className="fixed inset-0 z-[1000] flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onWheel={(e) => {
        e.preventDefault();
        setScale((s) => Math.min(6, Math.max(1, s + (e.deltaY < 0 ? 0.15 : -0.15))));
      }}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2 px-4 py-3 text-white/90">
        <div className="text-xs font-medium tracking-wide">
          {index + 1} / {images.length}
          {img?.alt ? <span className="ml-3 text-white/60">{img.alt}</span> : null}
        </div>
        <div className="flex items-center gap-1">
          <IconBtn label="Zoom out" onClick={() => setScale((s) => Math.max(1, s - 0.25))}>
            <ZoomOut className="h-4 w-4" />
          </IconBtn>
          <span className="min-w-[3.5rem] text-center text-xs tabular-nums">{Math.round(scale * 100)}%</span>
          <IconBtn label="Zoom in" onClick={() => setScale((s) => Math.min(6, s + 0.25))}>
            <ZoomIn className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Reset" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
          </IconBtn>
          <IconBtn label="Close" onClick={onClose}>
            <X className="h-4 w-4" />
          </IconBtn>
        </div>
      </div>

      {/* Image stage */}
      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden select-none"
        onMouseDown={(e) => {
          if (scale <= 1) return;
          dragging.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        }}
        onMouseMove={(e) => {
          if (!dragging.current) return;
          setPos({ x: e.clientX - dragging.current.x, y: e.clientY - dragging.current.y });
        }}
        onMouseUp={() => (dragging.current = null)}
        onMouseLeave={() => (dragging.current = null)}
        onDoubleClick={() => (scale === 1 ? setScale(2) : reset())}
        style={{ cursor: scale > 1 ? (dragging.current ? "grabbing" : "grab") : "zoom-in" }}
      >
        {images.length > 1 && (
          <button
            onClick={prev}
            aria-label="Previous"
            className="absolute left-3 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        <img
          src={img?.src}
          alt={img?.alt ?? ""}
          draggable={false}
          className="max-h-full max-w-full object-contain transition-transform duration-100 will-change-transform"
          style={{ transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})` }}
        />
        {images.length > 1 && (
          <button
            onClick={next}
            aria-label="Next"
            className="absolute right-3 z-10 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>

      <div className="px-4 py-2 text-center text-[11px] text-white/50">
        Scroll or +/− to zoom · Drag to pan · Double-click to toggle · ESC to close
      </div>
    </div>
  );
}

function IconBtn({ children, onClick, label }: { children: React.ReactNode; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
