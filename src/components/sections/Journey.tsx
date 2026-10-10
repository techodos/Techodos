import { orderJourney } from "../../content/product";
import { Reveal } from "../ui/Reveal";

export function Journey() {
  return (
    <ol className="journey" style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {orderJourney.map((s, i) => (
        <Reveal as="li" key={s.step} delay={i * 0.06}>
          <strong>{s.step}</strong>
          <p>{s.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
