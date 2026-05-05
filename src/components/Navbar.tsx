import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/lib/site";

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
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // 🔥 Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
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
    <header
      ref={navRef}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl"
    >
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* 🔥 NAV CONTAINER */}
        <div
          className={`flex items-center justify-between px-6 py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300
          ${
            scrolled
              ? "bg-background/95 shadow-lg border-border"
              : "bg-background/70 border-transparent"
          }`}
        >

          {/* 🔥 LOGO */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Convertify Logo"
              className="w-10 h-10 object-contain transition-transform group-hover:scale-105"
            />
            <div className="leading-tight">
              <h1 className="text-sm font-semibold text-foreground">
                {siteConfig.name}
              </h1>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                PDF & Image Tools
              </p>
            </div>
          </Link>

          {/* 🔥 DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className="relative text-muted-foreground hover:text-foreground transition"
                >
                  {link.label}

                  {/* 🔥 ACTIVE UNDERLINE */}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-foreground transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* 🔥 RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4 ml-6">
            <ThemeToggle />

            {/* 🔥 PREMIUM CTA */}
            <Link
              to="/tools"
              className="px-6 py-2 rounded-full bg-foreground text-background text-sm font-semibold hover:scale-105 hover:shadow-md transition-all duration-200 whitespace-nowrap"
            >
              Start Free
            </Link>
          </div>

          {/* 🔥 MOBILE */}
          <div className="flex lg:hidden items-center gap-3">
            <ThemeToggle />

            <button
              onClick={toggleMenu}
              className="p-2 rounded-xl hover:bg-muted transition"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* 🔥 MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-2 rounded-2xl border border-border bg-background shadow-xl lg:hidden overflow-hidden"
            >
              <div className="p-5 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition ${
                      location.pathname === link.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/tools"
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 px-4 py-3 rounded-full bg-primary text-primary-foreground text-center font-semibold hover:scale-[1.02] transition"
                >
                  Start Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navbar;
// import { motion, AnimatePresence } from "framer-motion";
// import { FileText, Menu, X } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import { useState, useEffect, useRef, useCallback } from "react";
// import ThemeToggle from "./ThemeToggle";
// import { siteConfig } from "@/lib/site";

// const navLinks = [
//   { label: "Tools", href: "/tools" },
//   { label: "Features", href: "/features" },
//   { label: "How it works", href: "/how-it-works" },
//   { label: "About", href: "/about" },
//   { label: "Contact", href: "/contact" },
// ];

// const Navbar = () => {
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const navRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setMenuOpen(false);
//   }, [location.pathname]);

//   useEffect(() => {
//     if (!menuOpen) return;
//     const handler = (e: MouseEvent) => {
//       if (navRef.current && !navRef.current.contains(e.target as Node)) {
//         setMenuOpen(false);
//       }
//     };
//     const timer = setTimeout(() => {
//       document.addEventListener("click", handler);
//     }, 10);
//     return () => {
//       clearTimeout(timer);
//       document.removeEventListener("click", handler);
//     };
//   }, [menuOpen]);

//   const toggleMenu = useCallback(() => {
//     setMenuOpen((prev) => !prev);
//   }, []);

//   return (
//     <div ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
//       <motion.nav
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
//       >
//         <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-nav">
//           <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
//             <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-blue via-accent-purple to-accent-pink shadow-card">
//               <FileText className="w-5 h-5 text-primary-foreground" />
//             </div>
//             <div className="leading-none">
//               <div className="text-sm font-bold tracking-tight text-foreground">{siteConfig.name}</div>
//               <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">PDF & Image Tools</div>
//             </div>
//           </Link>

//           <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-muted-foreground">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 to={link.href}
//                 className={`hover:text-foreground transition-colors ${location.pathname === link.href ? "text-foreground" : ""}`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           <div className="hidden lg:flex items-center gap-3">
//             <ThemeToggle />
//             <Link
//               to="/tools"
//               className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
//             >
//               Start Free
//             </Link>
//           </div>

//           <div className="flex lg:hidden items-center gap-2">
//             <ThemeToggle />
//             <button
//               onClick={toggleMenu}
//               className="p-2 rounded-xl hover:bg-muted transition-colors shrink-0"
//               aria-label="Toggle menu"
//             >
//               {menuOpen ? (
//                 <X className="w-5 h-5 text-foreground" />
//               ) : (
//                 <Menu className="w-5 h-5 text-foreground" />
//               )}
//             </button>
//           </div>
//         </div>

//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
//               className="overflow-hidden mt-2 rounded-2xl border border-border bg-background shadow-card-hover lg:hidden"
//             >
//               <div className="p-5 flex flex-col gap-1">
//                 {navLinks.map((link, i) => (
//                   <motion.div
//                     key={link.href}
//                     initial={{ opacity: 0, x: -12 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.25, delay: i * 0.05 }}
//                   >
//                     <Link
//                       to={link.href}
//                       onClick={() => setMenuOpen(false)}
//                       className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
//                         location.pathname === link.href
//                           ? "bg-muted text-foreground"
//                           : "text-muted-foreground active:bg-muted hover:text-foreground"
//                       }`}
//                     >
//                       {link.label}
//                     </Link>
//                   </motion.div>
//                 ))}
//                 <motion.div
//                   initial={{ opacity: 0, x: -12 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ duration: 0.25, delay: navLinks.length * 0.05 }}
//                 >
//                   <Link
//                     to="/tools"
//                     onClick={() => setMenuOpen(false)}
//                     className="block mt-3 px-4 py-3 rounded-full bg-primary text-primary-foreground text-base font-medium text-center hover:opacity-90 transition-opacity"
//                   >
//                     Start Free
//                   </Link>
//                 </motion.div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>
//     </div>
//   );
// };

// export default Navbar;
