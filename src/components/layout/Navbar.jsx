import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../ui/Button";

const links = [
  { to: "#services", label: "Rituals" },
  { to: "#about", label: "About" },
  { to: "#testimonials", label: "Words" },
  { to: "#visit", label: "Visit" },
];

const mobileMenuVariants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98],
      when: "afterChildren",
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98],
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const mobileItemVariants = {
  closed: { opacity: 0, x: -16 },
  open: { opacity: 1, x: 0 },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);

      if (location.pathname === "/") {
        if (window.scrollY < 80) {
          setActiveSection("");
        }

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50;
        if (isAtBottom) {
          setActiveSection("#visit");
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sectionIds = links.map((l) => l.to.replace("#", ""));
    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -40% 0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 50;

        if (entry.isIntersecting && !isAtBottom) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const handleLogoClick = (e) => {
    setOpen(false);

    if (location.pathname === "/") {
      e.preventDefault();
      setActiveSection("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.history.pushState("", document.title, window.location.pathname);
    } else {
      navigate("/");
    }
  };

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();
    setOpen(false);
    setActiveSection(targetHash);

    const targetId = targetHash.replace("#", "");

    if (location.pathname === "/") {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState("", document.title, targetHash);
      }
    } else {
      navigate(`/${targetHash}`);
    }
  };

  const solid = scrolled || location.pathname !== "/";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-ivory/90 backdrop-blur-md border-b border-plum-800/[0.06] shadow-sm"
          : "bg-ivory"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between relative z-10">
        {/* Logo Click Handler */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group cursor-pointer"
          onClick={handleLogoClick}
        >
          <span className="w-8 h-8 rounded-full bg-plum-800 text-ivory flex items-center justify-center font-display italic text-sm group-hover:bg-plum-900 transition-colors">
            Z
          </span>
          <span className="font-display text-lg text-plum-900">
            Hammam Zahra
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const isActive =
              activeSection === l.to && location.pathname === "/";
            return (
              <a
                key={l.to}
                href={l.to}
                onClick={(e) => handleNavClick(e, l.to)}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-plum-900 font-medium"
                    : "text-plum-800/70 hover:text-plum-900"
                }`}
              >
                {l.label}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500 rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link to="/book">
            <Button size="sm">Book a ritual</Button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          type="button"
          className="md:hidden text-plum-900 p-2 rounded-lg active:bg-plum-800/5 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Glass Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-ivory/95 backdrop-blur-xl border-b border-plum-800/[0.08] shadow-2xl overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-3">
              {links.map((l) => {
                const isActive =
                  activeSection === l.to && location.pathname === "/";
                return (
                  <motion.div key={l.to} variants={mobileItemVariants}>
                    <a
                      href={l.to}
                      onClick={(e) => handleNavClick(e, l.to)}
                      className={`relative flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 ${
                        isActive
                          ? "bg-rose-500/10 text-rose-700 font-medium shadow-inner"
                          : "text-plum-900/80 hover:bg-plum-800/5 hover:text-plum-900"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isActive
                              ? "bg-rose-500 scale-100"
                              : "bg-transparent scale-0"
                          }`}
                        />
                        <span className="text-base font-display tracking-wide">
                          {l.label}
                        </span>
                      </div>

                      {isActive && (
                        <ArrowRight size={16} className="text-rose-500" />
                      )}
                    </a>
                  </motion.div>
                );
              })}

              <motion.div
                variants={mobileItemVariants}
                className="pt-4 mt-2 border-t border-plum-800/[0.06]"
              >
                <Link to="/book" onClick={() => setOpen(false)}>
                  <Button size="lg" className="w-full justify-center shadow-md">
                    Book a ritual
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
