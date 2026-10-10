import { ArrowRight, CalendarCheck, Check, FileSpreadsheet, Radio } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { screens } from "../../content/product";
import { HeroBackdrop } from "../three/HeroBackdrop";
import { DemoButton } from "../ui/Cta";
import { BrowserFrame, PhoneFrame } from "../ui/Frames";

/** Product screenshots and feature cards, layered at different depths and moved by the pointer. */
function HeroStage() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  const rotY = useTransform(sx, (v) => -8 + v * 6);
  const rotX = useTransform(sy, (v) => 5 - v * 5);
  // Nearer layers move further with the pointer.
  const cardA = { x: useTransform(sx, (v) => v * 22), y: useTransform(sy, (v) => v * 22) };
  const cardB = { x: useTransform(sx, (v) => v * 30), y: useTransform(sy, (v) => v * 30) };
  const cardC = { x: useTransform(sx, (v) => v * 16), y: useTransform(sy, (v) => v * 16) };
  const phone = { x: useTransform(sx, (v) => v * 26), y: useTransform(sy, (v) => v * 26) };

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div className="stage fade-up fade-up--late">
      <motion.div className="stage__main" style={{ rotateY: rotY, rotateX: rotX }}>
        <BrowserFrame screen={screens.storefrontHome} url="your-restaurant.com" priority />
      </motion.div>

      <motion.div className="stage__phone" style={phone}>
        <PhoneFrame screen={screens.mobileMenu} priority />
      </motion.div>

      <motion.div className="float-wrap float-card--a" style={cardA} aria-hidden="true">
        <div className="float-card float-y">
        <span className="float-card__icon float-card__icon--teal">
          <Radio />
        </span>
        <span>
          <strong>
            <span className="live-dot" />
            Order is being prepared
          </strong>
          <span>Live tracking · updates instantly</span>
        </span>
        </div>
      </motion.div>

      <motion.div className="float-wrap float-card--b" style={cardB} aria-hidden="true">
        <div className="float-card float-y float-y--slow">
        <span className="float-card__icon">
          <CalendarCheck />
        </span>
        <span>
          <strong>Table for 4 · 19:30</strong>
          <span>Reservation confirmed by email</span>
        </span>
        </div>
      </motion.div>

      <motion.div className="float-wrap float-card--c" style={cardC} aria-hidden="true">
        <div className="float-card float-y float-y--alt">
        <span className="float-card__icon">
          <FileSpreadsheet />
        </span>
        <span>
          <strong>Sales report</strong>
          <span>Export to CSV, Excel or PDF</span>
        </span>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackdrop />
      <div className="container hero__layout">
        <div className="hero__copy">
          <Link to="/products/restaurant-platform" className="pill fade-up">
            <span className="pill__tag">Product</span>
            TechOdos Restaurant Platform
            <ArrowRight aria-hidden="true" />
          </Link>
          <h1 id="hero-title" className="fade-up">
            Software that runs <span className="serif grad-text">real</span> businesses.
          </h1>
          <p className="lead fade-up">
            TechOdos designs and builds SaaS products and custom web software. Our Restaurant Platform gives restaurants their own ordering
            website, table reservations, live order tracking and a complete admin dashboard — in one system.
          </p>
          <div className="hero__actions fade-up">
            <DemoButton />
            <Link to="/products/restaurant-platform" className="btn btn--ghost">
              Explore the platform
            </Link>
          </div>
          <ul className="hero__trust fade-up" aria-label="Demo details">
            <li>
              <Check aria-hidden="true" /> Free, no-obligation demo
            </li>
            <li>
              <Check aria-hidden="true" /> Delivery, pickup &amp; dine-in
            </li>
            <li>
              <Check aria-hidden="true" /> Built phone-first
            </li>
          </ul>
        </div>
        <HeroStage />
      </div>
    </section>
  );
}
