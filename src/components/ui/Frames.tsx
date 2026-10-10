import type { Screen } from "../../content/product";

type FrameProps = { screen: Screen; url?: string; priority?: boolean; className?: string };

export function BrowserFrame({ screen, url = "yourrestaurant.com", priority, className }: FrameProps) {
  return (
    <figure className={`browser ${className ?? ""}`} style={{ margin: 0 }}>
      <div className="browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="browser__url">{url}</span>
      </div>
      <img
        src={screen.src}
        alt={screen.alt}
        width={screen.w}
        height={screen.h}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    </figure>
  );
}

export function PhoneFrame({ screen, priority, className }: Omit<FrameProps, "url">) {
  return (
    <figure className={`phone ${className ?? ""}`} style={{ margin: 0 }}>
      <img src={screen.src} alt={screen.alt} width={screen.w} height={screen.h} loading={priority ? "eager" : "lazy"} decoding="async" />
    </figure>
  );
}
