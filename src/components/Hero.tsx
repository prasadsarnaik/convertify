import { motion } from "framer-motion";
import { FileText, Image, FileCheck, ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      <div className="container max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-border bg-card text-sm text-muted-foreground font-medium">
            <span className="status-dot" />
            Free and fast browser tools for PDFs, images, and documents
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.08] text-balance">
            PDF, Image &amp;
            <br />
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              Document Tools
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Convert, merge, compress, sign, resize, and optimize files online with practical tools that work directly in your browser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <button
              onClick={() => scrollTo("tools")}
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Start Converting <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo("tools")}
              className="px-7 py-3.5 rounded-full border border-border text-foreground font-semibold text-sm hover:bg-card transition-colors"
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
