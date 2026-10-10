import { Check } from "lucide-react";
import { services } from "../../content/services";
import { Reveal } from "../ui/Reveal";

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="grid grid--3">
      {services.map((s, i) => (
        <Reveal as="article" key={s.title} delay={(i % 3) * 0.06} className="card">
          <div className="icon-badge">
            <s.icon aria-hidden="true" />
          </div>
          <h3>{s.title}</h3>
          <p>{s.summary}</p>
          {detailed && (
            <ul className="checklist">
              {s.points.map((p) => (
                <li key={p}>
                  <Check aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      ))}
    </div>
  );
}
