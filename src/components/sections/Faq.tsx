import { Plus } from "lucide-react";

export type QA = { q: string; a: string };

export function Faq({ items }: { items: QA[] }) {
  return (
    <div className="faq">
      {items.map((item) => (
        <details key={item.q}>
          <summary>
            {item.q}
            <Plus aria-hidden="true" />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items: QA[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
});

export const platformFaq: QA[] = [
  {
    q: "Do my guests need to download an app?",
    a: "No. Your restaurant gets its own website that works in any modern browser and is designed for phones first. Guests can order as a guest or create an account for faster checkout and order history.",
  },
  {
    q: "Can the website match our brand?",
    a: "Yes. Colours, fonts, photography, page content and your menu all come from your own settings, so the site looks like your restaurant — not a marketplace listing.",
  },
  {
    q: "Which order types and payment methods are supported?",
    a: "Delivery, pickup and dine-in. Payment methods include cash on delivery, cash or card at the restaurant, bank transfer, online card payments through Stripe and the JazzCash mobile wallet. You choose which ones to offer, and only the ones that make sense for each order type are shown.",
  },
  {
    q: "Does it work for buffets and multi-branch restaurants?",
    a: "Yes. You can sell per-head buffet packages (dine-in only), switch off the à la carte menu if you only run a buffet, and manage several branches with their own delivery zones and fees.",
  },
  {
    q: "How is pricing worked out?",
    a: "We quote per restaurant after a free demo. The price depends on the plan, the number of branches and how much setup help you want, such as importing your menu.",
  },
  {
    q: "What happens after I request a demo?",
    a: "Your request opens in your email app, ready to send. Once we receive it, we reply by email to agree a time that suits you. Nothing is booked automatically.",
  },
];
