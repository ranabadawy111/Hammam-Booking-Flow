import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const links = [
  { to: "/#services", label: "Rituals" },
  { to: "/#about", label: "About" },
  { to: "/#testimonials", label: "Words" },
  { to: "/#visit", label: "Visit" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || location.pathname !== "/";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        solid ? "bg-ivory/90 backdrop-blur-md border-b border-plum-800/[0.06]" : "bg-ivory"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full bg-plum-800 text-ivory flex items-center justify-center font-display italic text-sm">
            Z
          </span>
          <span className="font-display text-lg text-plum-900">Hammam Zahra</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-sm text-plum-800/70 hover:text-plum-900 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/book">
            <Button size="sm">Book a ritual</Button>
          </Link>
        </div>

        <button className="md:hidden text-plum-800" onClick={() => setOpen((o) => !o)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-ivory border-t border-plum-800/[0.06] px-5 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              onClick={() => setOpen(false)}
              className="block text-sm text-plum-800/80"
            >
              {l.label}
            </a>
          ))}
          <Link to="/book" onClick={() => setOpen(false)}>
            <Button size="sm" className="w-full">
              Book a ritual
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}
