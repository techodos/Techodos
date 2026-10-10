import { useRef, type ReactNode, type PointerEvent } from "react";

/**
 * Gives a screenshot a slight 3D depth that follows the pointer.
 * Only on fine pointers (mouse/trackpad) and when the visitor allows motion.
 */
export function Tilt({ children, max = 6, className, rest = "rotateX(4deg) rotateY(-6deg)" }: { children: ReactNode; max?: number; className?: string; rest?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const allowed = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !allowed()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = rest;
  };

  return (
    <div style={{ perspective: 1400 }} className={className}>
      <div ref={ref} className="tilt" style={{ transform: rest }} onPointerMove={onMove} onPointerLeave={onLeave}>
        {children}
      </div>
    </div>
  );
}
