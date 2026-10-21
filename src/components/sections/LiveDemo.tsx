import { Bell, Check, ChefHat, Clock, Minus, Plus, RotateCcw, ShoppingBag, Smartphone, Star } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { demoDishes, demoOrderNumber, demoRestaurant, demoSteps, demoToday, formatRs, type DemoStatus } from "../../content/demo-order";

type Order = { number: string; lines: { id: string; name: string; qty: number }[]; total: number; placedAt: number };
type View = "guest" | "kitchen";

const LANES: { key: string; label: string; statuses: DemoStatus[] }[] = [
  { key: "new", label: "New", statuses: ["pending", "confirmed"] },
  { key: "preparing", label: "Preparing", statuses: ["preparing"] },
  { key: "ready", label: "Ready", statuses: ["ready"] },
];

function useElapsed(since: number | null): string {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (since === null) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [since]);
  if (since === null) return "0:00";
  const seconds = Math.max(0, Math.floor((now - since) / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

/**
 * "Place a demo order": the visitor orders on a Blue Hour phone screen, then plays the kitchen and moves the ticket
 * through the same steps the platform uses, watching the guest's tracking page follow along. Browser-only sample data.
 */
export function LiveDemo() {
  const reduce = useReducedMotion();
  const [cart, setCart] = useState<Record<string, number>>({ "spanish-latte": 1, "cinnamon-roll": 1 });
  const [order, setOrder] = useState<Order | null>(null);
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [view, setView] = useState<View>("guest");
  const [served, setServed] = useState(0);
  const elapsed = useElapsed(order && step < 4 ? order.placedAt : null);

  const lines = useMemo(() => demoDishes.filter((d) => cart[d.id]).map((d) => ({ ...d, qty: cart[d.id] })), [cart]);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.qty * l.price, 0);
  const tax = subtotal * demoRestaurant.taxRate;
  const status = order ? demoSteps[step].status : null;
  const current = demoSteps[step];

  const change = (id: string, delta: number) =>
    setCart((c) => {
      const qty = Math.max(0, Math.min(9, (c[id] ?? 0) + delta));
      const next = { ...c, [id]: qty };
      if (!qty) delete next[id];
      return next;
    });

  const place = () => {
    if (!count) return;
    setOrder({ number: demoOrderNumber(), lines: lines.map((l) => ({ id: l.id, name: l.name, qty: l.qty })), total: subtotal + tax, placedAt: Date.now() });
    setStep(0);
    setRating(0);
  };

  const advance = () => {
    if (!order || step >= demoSteps.length - 1) return;
    const next = step + 1;
    setStep(next);
    if (demoSteps[next].status === "completed") setServed((n) => n + 1);
  };

  // phones show one screen at a time; on wide screens both are visible, so this just moves focus to the next step
  const toKitchen = () => {
    setView("kitchen");
    window.requestAnimationFrame(() => document.querySelector<HTMLButtonElement>(".lbtn--kitchen")?.focus());
  };

  const reset = () => {
    setOrder(null);
    setStep(0);
    setRating(0);
    setView("guest");
  };

  const announce = !order
    ? ""
    : status === "completed"
      ? `Order ${order.number} collected.`
      : `Order ${order.number}: ${current.guest}.`;

  const kitchenTurn = order && status !== "completed";
  const todayOrders = demoToday.orders + served;
  const todaySales = demoToday.sales + (status === "completed" && order ? order.total : 0);
  const layout = reduce ? undefined : true;

  return (
    <div className="livedemo" data-view={view}>
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>

      <div className="livedemo__switch" role="tablist" aria-label="Which screen to show">
        <button type="button" role="tab" aria-selected={view === "guest"} onClick={() => setView("guest")}>
          <Smartphone aria-hidden="true" /> Guest phone
        </button>
        <button type="button" role="tab" aria-selected={view === "kitchen"} onClick={() => setView("kitchen")}>
          <ChefHat aria-hidden="true" /> Kitchen screen
          {kitchenTurn && view === "guest" ? <span className="livedemo__dot" aria-label="needs action" /> : null}
        </button>
      </div>

      {/* ---------------- guest ---------------- */}
      <section className="livedemo__guest" aria-label="Guest's phone">
        <div className="lphone">
          <header className="lphone__bar">
            <span className="lphone__brand">
              <span className="lphone__moon" aria-hidden="true" />
              Blue Hour
            </span>
            <span className="lphone__where">
              {demoRestaurant.orderType} · {demoRestaurant.branch}
            </span>
          </header>

          {!order ? (
            <div className="lphone__body">
              <p className="lphone__title">Order ahead</p>
              <ul className="lmenu">
                {demoDishes.map((dish) => {
                  const qty = cart[dish.id] ?? 0;
                  return (
                    <li key={dish.id} className={qty ? "is-in" : undefined}>
                      <img src={dish.image} alt="" width={56} height={56} loading="lazy" decoding="async" />
                      <span className="lmenu__text">
                        <strong>{dish.name}</strong>
                        <span>{dish.note}</span>
                        <em>{formatRs(dish.price)}</em>
                      </span>
                      {qty ? (
                        <span className="lstep" role="group" aria-label={`${dish.name} quantity`}>
                          <button type="button" onClick={() => change(dish.id, -1)} aria-label={`One less ${dish.name}`}>
                            <Minus aria-hidden="true" />
                          </button>
                          <output aria-live="off">{qty}</output>
                          <button type="button" onClick={() => change(dish.id, 1)} aria-label={`One more ${dish.name}`}>
                            <Plus aria-hidden="true" />
                          </button>
                        </span>
                      ) : (
                        <button type="button" className="ladd" onClick={() => change(dish.id, 1)} aria-label={`Add ${dish.name}`}>
                          <Plus aria-hidden="true" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
              <div className="lphone__cart">
                <span>
                  <strong>
                    {count} {count === 1 ? "item" : "items"}
                  </strong>
                  <span>
                    {formatRs(subtotal + tax)} incl. {Math.round(demoRestaurant.taxRate * 100)}% tax
                  </span>
                </span>
                <button type="button" className="lbtn" onClick={place} disabled={!count}>
                  <ShoppingBag aria-hidden="true" /> Place order
                </button>
              </div>
            </div>
          ) : (
            <div className="lphone__body">
              <p className="lphone__eyebrow">Order {order.number}</p>
              <p className="lphone__title">{current.guest}</p>
              <p className="lphone__sub">{current.detail}</p>
              <ol className="ltrack">
                {demoSteps.map((s, i) => (
                  <li key={s.status} className={i < step ? "is-done" : i === step ? "is-now" : undefined}>
                    <span className="ltrack__dot" aria-hidden="true">
                      {i < step || (s.status === "completed" && i === step) ? <Check /> : null}
                    </span>
                    <span>{s.guest}</span>
                  </li>
                ))}
              </ol>
              {status === "completed" ? (
                <div className="lrate">
                  <p>How was it?</p>
                  <div className="lrate__stars" role="radiogroup" aria-label="Rate your order">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => setRating(n)}>
                        <Star aria-hidden="true" className={n <= rating ? "is-on" : undefined} />
                      </button>
                    ))}
                  </div>
                  {rating ? <p className="lrate__thanks">Thanks — this review goes to the café's moderation queue.</p> : null}
                  <button type="button" className="lbtn lbtn--ghost" onClick={reset}>
                    <RotateCcw aria-hidden="true" /> Order again
                  </button>
                </div>
              ) : (
                <div className="lphone__total">
                  <span>{order.lines.reduce((s, l) => s + l.qty, 0)} items · pickup</span>
                  <strong>{formatRs(order.total)}</strong>
                </div>
              )}
            </div>
          )}
        </div>
        {kitchenTurn ? (
          <button type="button" className="livedemo__nudge" onClick={toKitchen}>
            Now be the kitchen: tap <strong>{current.kitchenAction}</strong> →
          </button>
        ) : null}
      </section>

      {/* ---------------- kitchen ---------------- */}
      <section className="livedemo__kitchen" aria-label="Kitchen screen">
        <div className="lkitchen">
          <header className="lkitchen__bar">
            <span>
              <ChefHat aria-hidden="true" /> Kitchen · {demoRestaurant.branch}
            </span>
            <span className="lkitchen__live">
              <span className="live-dot" /> Live
            </span>
          </header>
          <dl className="lkitchen__stats">
            <div>
              <dt>Orders today</dt>
              <dd>{todayOrders}</dd>
            </div>
            <div>
              <dt>Sales today</dt>
              <dd>{formatRs(todaySales)}</dd>
            </div>
            <div>
              <dt>Average order</dt>
              <dd>{formatRs(todaySales / todayOrders)}</dd>
            </div>
          </dl>

          <LayoutGroup>
            <div className="lanes">
              {LANES.map((lane) => {
                const here = order && status && lane.statuses.includes(status);
                return (
                  <div key={lane.key} className="lane">
                    <p className="lane__head">
                      {lane.label} <span>{here ? 1 : 0}</span>
                    </p>
                    {here && order ? (
                      <motion.article layout={layout} layoutId={reduce ? undefined : "demo-ticket"} className={`lticket lticket--${status}`} transition={{ type: "spring", stiffness: 380, damping: 34 }}>
                        <header>
                          <strong>{order.number}</strong>
                          <span className="lticket__time">
                            <Clock aria-hidden="true" /> {elapsed}
                          </span>
                        </header>
                        <p className="lticket__meta">
                          {demoRestaurant.orderType} · {status === "pending" ? "New order" : status === "confirmed" ? "Confirmed" : status === "preparing" ? "On the line" : "Waiting at the counter"}
                        </p>
                        <ul>
                          {order.lines.map((l) => (
                            <li key={l.id}>
                              <span className="lticket__qty">{l.qty}</span> {l.name}
                            </li>
                          ))}
                        </ul>
                        {current.kitchenAction ? (
                          <button type="button" className="lbtn lbtn--kitchen" onClick={advance}>
                            {current.kitchenAction}
                          </button>
                        ) : null}
                      </motion.article>
                    ) : (
                      <p className="lane__empty">Nothing here</p>
                    )}
                  </div>
                );
              })}
            </div>
          </LayoutGroup>

          <AnimatePresence initial={false}>
            {!order ? (
              <motion.p key="wait" className="lkitchen__note" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Bell aria-hidden="true" /> Waiting for the next order — place one on the guest's phone.
              </motion.p>
            ) : status === "completed" ? (
              <motion.p key="done" className="lkitchen__note lkitchen__note--done" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Check aria-hidden="true" /> Order handed over · today's sales updated.
              </motion.p>
            ) : status === "pending" ? (
              <motion.p key="new" className="lkitchen__note lkitchen__note--alert" initial={reduce ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <Bell aria-hidden="true" /> New order {order.number} — with a sound alert on the real screen.
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
        {order ? (
          <button type="button" className="livedemo__nudge" onClick={() => setView("guest")}>
            See what the guest sees →
          </button>
        ) : null}
      </section>
    </div>
  );
}
