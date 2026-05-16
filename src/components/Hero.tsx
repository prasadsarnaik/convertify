import { motion } from "framer-motion";
import { FileText, Image, FileCheck, ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Ambient animated gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 mx-auto h-[420px] max-w-3xl opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, hsl(var(--accent-purple) / 0.35), hsl(var(--accent-blue) / 0.25) 45%, transparent 75%)",
          animation: "hero-glow 9s ease-in-out infinite",
        }}
      />

      <div className="container relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="motion-safe:[animation:hero-float_7s_ease-in-out_infinite]"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-border bg-card text-sm text-muted-foreground font-medium">
            <span className="status-dot" />
            Free &amp; Fast — No sign-up required
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] text-balance">
            Convert Files{" "}
            <span className="bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink bg-clip-text text-transparent">
              Instantly Online
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Free online PDF, Word, JPG, PNG, and file conversion tools. Fast, secure, and easy to use.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button
              onClick={() => scrollTo("tools")}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover hover:opacity-95"
            >
              Start Converting
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo("tools")}
              className="px-7 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-card hover:border-foreground/20"
            >
              Explore Tools
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          {[
            { icon: FileText, color: "from-accent-blue to-accent-purple", delay: 0 },
            { icon: Image, color: "from-accent-pink to-accent-orange", delay: 0.5 },
            { icon: FileCheck, color: "from-accent-green to-accent-blue", delay: 1 },
          ].map((item, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-card`}
            >
              <item.icon className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
