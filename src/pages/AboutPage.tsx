import SEO, { SITE } from "@/components/SEO";
import { motion } from "framer-motion";
import { Heart, Zap, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const whyItems = [
  { icon: Zap, label: "Fast cloud processing" },
  { icon: Shield, label: "Secure file handling" },
  { icon: Sparkles, label: "Clean user experience" },
  { icon: Heart, label: "Powerful tools in one platform" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "About", item: `${SITE}/about` },
    ],
  };

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Convertify",
    url: SITE,
    logo: `${SITE}/favicon.png`,
    description: "Convertify is a free, privacy-first online file converter for PDF, Word, JPG, PNG and more. All processing happens entirely in your browser.",
    founder: {
      "@type": "Person",
      name: "Prasad Shivaji Sarnaik",
      jobTitle: "Founder & UI/UX Designer",
      url: `${SITE}/about`,
    },
  };

  return (
  <>
    <SEO title="About" description="Learn about Convertify — a modern file tools platform designed to make working with PDFs and images simple, fast and beautiful." path="/about" jsonLd={[breadcrumbLd, organizationLd]} />
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="relative text-center p-8 rounded-3xl border border-border bg-card shadow-card overflow-hidden group"
        >
          <div className="relative z-10">
            {/* Avatar with aura + orbit */}
            <div className="relative w-28 h-28 mx-auto mb-5">
              {/* Soft gradient aura */}
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-full blur-2xl opacity-60"
                style={{
                  background:
                    "conic-gradient(from 0deg, hsl(var(--accent-purple)), hsl(var(--accent-pink)), hsl(var(--accent-blue)), hsl(var(--accent-purple)))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Orbiting dots */}
              <motion.div
                aria-hidden
                className="absolute -inset-3"
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-blue/80" />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent-pink/70" />
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent-purple/70" />
              </motion.div>

              {/* Avatar emoji */}
              <motion.div
                className="absolute inset-2 rounded-full p-[2px] bg-gradient-to-br from-accent-purple/80 via-accent-pink/60 to-accent-blue/80"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center text-4xl">
                  👨‍💻
                </div>
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="text-sm text-muted-foreground mb-1 tracking-wide uppercase"
            >
              Founder, Creator & Owner
            </motion.p>

            {/* Animated gradient name */}
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,hsl(var(--accent-purple)),hsl(var(--accent-pink)),hsl(var(--accent-blue)),hsl(var(--accent-purple)))] bg-[length:200%_auto]"
              style={{ animation: "gradientShift 6s linear infinite" }}
            >
              Prasad Shivaji Sarnaik
            </motion.h3>

            {/* Role badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              {["UI/UX Designer", "Independent Developer"].map((role, i) => (
                <motion.span
                  key={role}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.1, duration: 0.4, ease: "easeOut" }}
                  className="px-3 py-1 text-xs font-medium rounded-full border border-border bg-muted text-muted-foreground"
                >
                  {role}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
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
};

export default AboutPage;
