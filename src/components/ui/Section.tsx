import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHead({ eyebrow, title, intro, center, id }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; center?: boolean; id?: string }) {
  return (
    <Reveal className={`section-head ${center ? "section-head--center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {intro && <p>{intro}</p>}
    </Reveal>
  );
}

export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro: ReactNode; children?: ReactNode }) {
  return (
    <header className="page-hero">
      <div className="hero__grid" aria-hidden="true" />
      <div className="container">
        <div className="page-hero__inner fade-up">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
          {children && <div className="page-hero__actions">{children}</div>}
        </div>
      </div>
    </header>
  );
}
