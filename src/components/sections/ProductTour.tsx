import { Check } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useId, useState, type KeyboardEvent } from "react";
import { screens, type Screen } from "../../content/product";
import { BrowserFrame } from "../ui/Frames";
import { Tilt } from "../ui/Tilt";

type Stop = { id: string; label: string; title: string; text: string; points: string[]; screen: Screen; url: string };

const stops: Stop[] = [
  {
    id: "website",
    label: "Website",
    title: "A restaurant website guests actually enjoy using",
    text: "Your brand, your photography and clear calls to action — order online or book a table from the first screen.",
    points: ["Branded home, menu, about and contact pages", "Opening hours and branch information", "Designed for phones first"],
    screen: screens.storefrontHome,
    url: "your-restaurant.com",
  },
  {
    id: "menu",
    label: "Online menu",
    title: "A menu built for ordering, not just reading",
    text: "Guests search dishes, switch between delivery, pickup and dine-in, and customise items before adding them to the tray.",
    points: ["Search and category navigation", "Variants, add-ons, dietary tags and prep time", "Sold-out items handled automatically"],
    screen: screens.storefrontMenu,
    url: "your-restaurant.com/menu",
  },
  {
    id: "reservations",
    label: "Reservations",
    title: "Bookings without the phone calls",
    text: "Guests pick a branch, date, party size and an available slot. They receive a confirmation code and an email when you confirm.",
    points: ["Slot availability per branch", "Party-size limits you control", "Pending and confirmed emails"],
    screen: screens.storefrontReservations,
    url: "your-restaurant.com/reservation",
  },
  {
    id: "kitchen",
    label: "Kitchen view",
    title: "Clear tickets for a busy kitchen",
    text: "Active orders appear as tickets with items, options and order type. One tap moves an order on — and tells the guest.",
    points: ["Self-refreshing ticket board", "Elapsed time on every ticket", "Status changes trigger guest notifications"],
    screen: screens.adminKitchen,
    url: "your-restaurant.com/admin/kitchen",
  },
  {
    id: "menu-admin",
    label: "Menu admin",
    title: "Change your menu in minutes",
    text: "Add categories and dishes, set prices, variants and add-on groups. Updates show on your website straight away.",
    points: ["Categories, items, variants and add-ons", "Buffet packages priced per head", "Availability and dietary information"],
    screen: screens.adminMenu,
    url: "your-restaurant.com/admin/menu",
  },
  {
    id: "reports",
    label: "Reports",
    title: "Know how the business is doing",
    text: "Pick a date range and see sales, orders, cancellations, average order value, the daily trend and payment mix.",
    points: ["Preset and custom date ranges", "Trend and orders-per-day charts", "CSV, Excel and PDF export"],
    screen: screens.adminReports,
    url: "your-restaurant.com/admin/reports",
  },
  {
    id: "settings",
    label: "Settings",
    title: "Your rules, without a developer",
    text: "Switch features on or off and set tax, service fees per order type, payment methods, delivery and reservation rules.",
    points: ["Feature switches per restaurant", "Tax and per-order-type service fees", "Payment methods and online provider"],
    screen: screens.adminSettings,
    url: "your-restaurant.com/admin/settings",
  },
];

export function ProductTour() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const uid = useId();
  const stop = stops[active];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + stops.length) % stops.length;
    setActive(next);
    document.getElementById(`${uid}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div className="tabs" role="tablist" aria-label="Product screens">
        {stops.map((s, i) => (
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
        ))}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active}`} className="tour">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={stop.id + "-copy"}
            className="tour__copy"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3>{stop.title}</h3>
            <p>{stop.text}</p>
            <ul className="checklist">
              {stop.points.map((p) => (
                <li key={p}>
                  <Check aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <Tilt rest="rotateX(2deg) rotateY(-4deg)">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stop.id}
              initial={reduce ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <BrowserFrame screen={stop.screen} url={stop.url} />
            </motion.div>
          </AnimatePresence>
        </Tilt>
      </div>
      <p className="screen-caption">Real product screens, shown with one of our demo restaurants and sample data.</p>
    </div>
  );
}
