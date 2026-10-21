import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";
import { screens, type Screen } from "../../content/product";
import { BrowserFrame, PhoneFrame } from "../ui/Frames";

type Shot = { id: string; label: string; side: "Guest" | "Team"; caption: string; screen: Screen; phone?: Screen; url: string };

const shots: Shot[] = [
  { id: "home", label: "Website", side: "Guest", caption: "Their own branded site — order ahead or book a table from the first screen.", screen: screens.storefrontHome, phone: screens.mobileHome, url: "your-restaurant.com" },
  { id: "menu", label: "Menu", side: "Guest", caption: "Search, categories, dietary tags and prep times; the nearest branch is picked for the guest.", screen: screens.storefrontMenu, phone: screens.mobileMenu, url: "your-restaurant.com/menu" },
  { id: "dish", label: "Dish", side: "Guest", caption: "Sizes, add-ons and a note for the kitchen, with the price updating as they choose.", screen: screens.storefrontItem, phone: screens.mobileItem, url: "your-restaurant.com/menu/espresso" },
  { id: "checkout", label: "Checkout", side: "Guest", caption: "Delivery, pickup or dine-in, with tax and delivery fees calculated on the server.", screen: screens.storefrontCheckout, url: "your-restaurant.com/checkout" },
  { id: "dashboard", label: "Dashboard", side: "Team", caption: "The whole pass at a glance: what's pending, preparing, ready and out for delivery.", screen: screens.adminDashboard, url: "your-restaurant.com/admin" },
  { id: "kitchen", label: "Kitchen", side: "Team", caption: "Tickets with items, options and a timer; one tap moves the order on and tells the guest.", screen: screens.adminKitchen, url: "your-restaurant.com/admin/kitchen" },
  { id: "orders", label: "Orders", side: "Team", caption: "Find any order — even months old — by number, name, phone or email, and filter by type, payment and date.", screen: screens.adminOrders, url: "your-restaurant.com/admin/orders" },
  { id: "photo", label: "Menu editor", side: "Team", caption: "Change a price or upload a dish photo from your phone; the website updates straight away.", screen: screens.adminItem, url: "your-restaurant.com/admin/menu" },
  { id: "reports", label: "Reports", side: "Team", caption: "Sales, orders, average order value and payment mix — export to CSV, Excel or PDF.", screen: screens.adminReports, url: "your-restaurant.com/admin/reports" },
];

/** Blue Hour Coffee, the featured demo restaurant: real screens of the guest website and the staff admin. */
export function FeaturedBuild() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const shot = shots[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + shots.length) % shots.length;
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div className="featured">
      <div className="featured__tabs">
        {(["Guest", "Team"] as const).map((side) => (
          <div key={side} className="featured__group">
            <span className="featured__side" id={`${uid}-${side}`}>
              {side === "Guest" ? "What guests see" : "What your team uses"}
            </span>
            <div className="featured__row" role="tablist" aria-labelledby={`${uid}-${side}`}>
              {shots.map((s, i) =>
                s.side === side ? (
                  <button
                    key={s.id}
                    id={`${uid}-tab-${i}`}
                    role="tab"
                    type="button"
                    className="tab"
                    aria-selected={i === active}
                    aria-controls={`${uid}-panel`}
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={onKey}
                  >
                    {s.label}
                  </button>
                ) : null,
              )}
            </div>
          </div>
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className={`featured__stage ${shot.phone ? "has-phone" : ""}`}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={shot.id}
            className="featured__frames"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <BrowserFrame screen={shot.screen} url={shot.url} />
            {shot.phone ? <PhoneFrame screen={shot.phone} className="featured__phone" /> : null}
          </motion.div>
        </AnimatePresence>
        <p className="featured__caption">
          <span className="featured__chip">{shot.side === "Guest" ? "Guest" : "Your team"}</span>
          {shot.caption}
        </p>
      </div>
    </div>
  );
}
