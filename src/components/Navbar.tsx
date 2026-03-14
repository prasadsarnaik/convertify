import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    if (!isHome) return;
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl"
    >
      <div className="flex items-center justify-between px-5 py-3 rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-nav">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg text-foreground">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-foreground" />
          </div>
          PDFly
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <button onClick={() => scrollTo("tools")} className="hover:text-foreground transition-colors">Tools</button>
          <button onClick={() => scrollTo("features")} className="hover:text-foreground transition-colors">Features</button>
          <button onClick={() => scrollTo("how-it-works")} className="hover:text-foreground transition-colors">How it works</button>
        </div>

        <button
          onClick={() => scrollTo("tools")}
          className="px-4 py-2 rounded-full bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Start Free
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
