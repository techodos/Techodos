import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";

const HeroScene = lazy(() => import("./HeroScene"));

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

/** If the 3D scene throws (lost context, driver bug), keep the CSS backdrop instead of breaking the page. */
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

/**
 * The CSS glow and grid always render (and are the full fallback without WebGL).
 * The three.js scene is loaded after first paint, only when WebGL exists, and pauses off-screen.
 */
export function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<{ ready: boolean; reduced: boolean; compact: boolean }>({ ready: false, reduced: false, compact: false });
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!hasWebGL()) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches || (navigator.hardwareConcurrency ?? 8) <= 4;
    const start = () => setState({ ready: true, reduced, compact });
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (idle) idle(start, { timeout: 1200 });
    else setTimeout(start, 400);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    const t = setTimeout(() => setShown(true), 60);
    return () => clearTimeout(t);
  }, [state.ready]);

  return (
    <>
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div ref={ref} className="hero__bg" aria-hidden="true" style={{ opacity: shown ? 1 : 0, transition: "opacity 1.2s ease" }}>
        {state.ready && (
          <SceneBoundary>
            <Suspense fallback={null}>
              <HeroScene active={visible} reduced={state.reduced} compact={state.compact} />
            </Suspense>
          </SceneBoundary>
        )}
      </div>
      <div className="hero__fade" aria-hidden="true" />
    </>
  );
}
