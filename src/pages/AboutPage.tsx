import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Heart, Zap, Shield, Sparkles, Code2, Palette } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const whyItems = [
  { icon: Zap, label: "Fast cloud processing" },
  { icon: Shield, label: "Secure file handling" },
  { icon: Sparkles, label: "Clean user experience" },
  { icon: Heart, label: "Powerful tools in one platform" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => (
  <>
    <SEO title="About" description="Learn about Convertify — a modern file tools platform designed to make working with PDFs and images simple, fast and beautiful." path="/about" />
    <Navbar />
    <main className="pt-28 pb-20">
      {/* Hero */}
      <section className="container max-w-3xl mx-auto px-6 text-center mb-20">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          About Convertify
        </motion.h1>
        <motion.p
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          Convertify is a modern file tools platform designed to make working with PDFs and images simple, fast and beautiful. Our goal is to provide powerful file tools with a clean user experience inspired by Apple's design philosophy.
        </motion.p>
      </section>

      {/* Mission */}
      <section className="container max-w-3xl mx-auto px-6 mb-20">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="p-8 md:p-12 rounded-2xl bg-card border border-border text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our mission is to simplify file management by providing powerful tools in one minimal workspace.
          </p>
        </motion.div>
      </section>

      {/* Why Convertify */}
      <section className="container max-w-4xl mx-auto px-6 mb-20">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
        >
          Why Convertify?
        </motion.h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {whyItems.map((item, i) => (
            <motion.div
              key={item.label}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex items-center gap-4 p-6 rounded-2xl border border-border bg-background shadow-card"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shrink-0">
                <item.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Creator */}
      <section className="container max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.35 }}
          whileHover={{ y: -6 }}
          className="relative text-center p-8 rounded-3xl border border-border bg-card shadow-card overflow-hidden group"
        >
          {/* Animated gradient border glow */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "conic-gradient(from 0deg, hsl(var(--accent-blue)), hsl(var(--accent-purple)), hsl(var(--accent-pink)), hsl(var(--accent-blue)))",
              filter: "blur(18px)",
              zIndex: 0,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />

          {/* Faint dot pattern background */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(currentColor 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Floating sparkle icons in corners */}
          <motion.div
            aria-hidden
            className="absolute top-4 left-4 text-accent-purple/60"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4], rotate: [0, 15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute top-6 right-5 text-accent-pink/60"
            animate={{ y: [0, -8, 0], opacity: [0.3, 0.9, 0.3], rotate: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
          >
            <Code2 className="w-4 h-4" />
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute bottom-6 left-6 text-accent-blue/60"
            animate={{ y: [0, -5, 0], opacity: [0.3, 0.8, 0.3], rotate: [0, 10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <Palette className="w-4 h-4" />
          </motion.div>

          <div className="relative z-10">
            {/* Avatar with aura + orbit */}
            <div className="relative w-28 h-28 mx-auto mb-5">
              {/* Pulsing gradient aura */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(var(--accent-purple)), hsl(var(--accent-pink)), hsl(var(--accent-blue)), hsl(var(--accent-purple)))",
                }}
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              {/* Orbiting dots */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent-blue shadow-[0_0_8px_hsl(var(--accent-blue))]" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-pink shadow-[0_0_8px_hsl(var(--accent-pink))]" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent-purple shadow-[0_0_8px_hsl(var(--accent-purple))]" />
              </motion.div>

              {/* Avatar emoji with gradient ring */}
              <motion.div
                className="absolute inset-2 rounded-full p-[2px] bg-gradient-to-br from-accent-purple via-accent-pink to-accent-blue"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl">
                  <motion.span
                    animate={{ rotate: [0, 8, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    👨‍💻
                  </motion.span>
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-muted-foreground mb-1 tracking-wide uppercase"
            >
              Founder, Creator & Owner
            </motion.p>

            {/* Animated gradient name */}
            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(var(--accent-purple)),hsl(var(--accent-pink)),hsl(var(--accent-blue)),hsl(var(--accent-purple)))] bg-[length:200%_auto]"
              style={{ animation: "gradientShift 5s linear infinite" }}
            >
              Prasad Shivaji Sarnaik
            </motion.h3>

            {/* Role badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {["UI/UX Designer", "Independent Developer"].map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, type: "spring", bounce: 0.4 }}
                  whileHover={{ y: -2 }}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-background/60 backdrop-blur text-foreground/80"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="text-sm text-muted-foreground mt-5 leading-relaxed"
            >
              Convertify is independently created, designed, owned and maintained by
              Prasad Shivaji Sarnaik. Every tool is built and operated by a single founder
              with a focus on privacy, speed and clean design.
            </motion.p>
          </div>
        </motion.div>
      </section>
    </main>
    <Footer />
  </>
);

export default AboutPage;
