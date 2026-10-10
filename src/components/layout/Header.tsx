import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { DemoButton, EmailLink } from "../ui/Cta";
import { Logo } from "./Logo";
import { mainNav } from "./nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, lock page scroll while it is open, close on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const navClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

  return (
    <header className={`header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="container header__inner">
        <Logo />
        <nav className="nav" aria-label="Main">
          {mainNav.map((item) => (
            <NavLink key={item.to} to={item.to} end className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <DemoButton size="sm" className="header__cta" />
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div id="mobile-nav" className="mobile-nav" aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ul>
            <li>
              <NavLink to="/" end className={navClass}>
                Home
              </NavLink>
            </li>
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end className={navClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <DemoButton className="btn--block" />
        <p className="mobile-nav__mail">
          Or email <EmailLink className="" />
        </p>
      </div>
    </header>
  );
}
