import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import convertifyLogo from "@/assets/convertify-logo.png";
import { useState, useEffect, useRef, useCallback } from "react";

const navLinks = [
  { label: "Tools", href: "/tools" },
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu on outside click (use click, not mousedown, to avoid race)
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    // Delay attaching to avoid catching the same click that opened
    const timer = setTimeout(() => {
      document.addEventListener("click", handler);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handler);
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, []);

  return (
    <div ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-nav">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src={convertifyLogo} alt="Convertify logo" className="h-9 object-contain shrink-0" />
          </Link>

          {/* Desktop links — hidden below lg (1024px) */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`hover:text-foreground transition-colors ${location.pathname === link.href ? "text-foreground" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            to="/tools"
            className="hidden lg:block px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Free
          </Link>

          {/* Mobile hamburger — shown below lg */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-xl hover:bg-muted transition-colors shrink-0"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden mt-2 rounded-2xl border border-border bg-background shadow-card-hover lg:hidden"
            >
              <div className="p-5 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        location.pathname === link.href
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground active:bg-muted hover:text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: navLinks.length * 0.05 }}
                >
                  <Link
                    to="/tools"
                    onClick={() => setMenuOpen(false)}
                    className="block mt-3 px-4 py-3 rounded-full bg-primary text-primary-foreground text-base font-medium text-center hover:opacity-90 transition-opacity"
                  >
                    Start Free
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
