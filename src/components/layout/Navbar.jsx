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

const NAVBAR_HEIGHT = 64;

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
  closed: {
    opacity: 0,
    x: -16,
  },

  open: {
    opacity: 1,
    x: 0,
  },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const solid = scrolled || location.pathname !== "/";

  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = links
        .map((link) => link.to.replace("#", ""))
        .map((id) => document.getElementById(id))
        .filter(Boolean);

      if (window.scrollY < 80) {
        setActiveSection("");
        return;
      }

      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 10;

      if (isAtBottom) {
        setActiveSection("#visit");
        return;
      }

      let closestSection = "";
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        const distance = Math.abs(rect.top - NAVBAR_HEIGHT);

        if (rect.top <= NAVBAR_HEIGHT + 120 && distance < closestDistance) {
          closestDistance = distance;
          closestSection = `#${section.id}`;
        }
      });

      if (closestSection) {
        setActiveSection(closestSection);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;

    const targetPosition = Math.max(elementTop - NAVBAR_HEIGHT, 0);

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e, targetHash) => {
    e.preventDefault();

    const sectionId = targetHash.replace("#", "");

    setActiveSection(targetHash);

    if (location.pathname !== "/") {
      setOpen(false);
      navigate(`/${targetHash}`);
      return;
    }

    if (open) {
      setOpen(false);

      setTimeout(() => {
        scrollToSection(sectionId);

        window.history.replaceState(null, "", `/${targetHash}`);
      }, 350);

      return;
    }

    scrollToSection(sectionId);

    window.history.replaceState(null, "", `/${targetHash}`);
  };

  useEffect(() => {
    if (location.pathname !== "/") return;

    const hash = location.hash;

    if (!hash) return;

    const sectionId = hash.replace("#", "");

    const timer = setTimeout(() => {
      scrollToSection(sectionId);
      setActiveSection(hash);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const handleLogoClick = (e) => {
    setOpen(false);
    setActiveSection("");

    if (location.pathname === "/") {
      e.preventDefault();

      window.history.replaceState(null, "", "/");

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });

      return;
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-ivory/90 backdrop-blur-md border-b border-plum-800/[0.06] shadow-sm"
          : "bg-ivory"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between relative z-10">
        {/* Logo */}
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
          {links.map((link) => {
            const isActive =
              activeSection === link.to && location.pathname === "/";

            return (
              <a
                key={link.to}
                href={link.to}
                onClick={(e) => handleNavClick(e, link.to)}
                className={`relative py-1 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-plum-900 font-medium"
                    : "text-plum-800/70 hover:text-plum-900"
                }`}
              >
                {link.label}

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

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden text-plum-900 p-2 rounded-lg active:bg-plum-800/5 transition-colors"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle Menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
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
              {links.map((link) => {
                const isActive =
                  activeSection === link.to && location.pathname === "/";

                return (
                  <motion.div key={link.to} variants={mobileItemVariants}>
                    <a
                      href={link.to}
                      onClick={(e) => handleNavClick(e, link.to)}
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
                          {link.label}
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
