import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Heart, Zap, Shield, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const whyItems = [
  { icon: Zap, label: "Fast browser-based workflows" },
  { icon: Shield, label: "Practical privacy-first approach" },
  { icon: Sparkles, label: "Clear, low-friction interfaces" },
  { icon: Heart, label: "Useful tools in one place" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const AboutPage = () => (
  <>
    <SEO
      title="About"
      description="Learn about Convertify, a browser-based file tools site focused on practical PDF, image, and document workflows."
      path="/about"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <section className="container max-w-3xl mx-auto px-6 text-center mb-20">
        <motion.h1
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          About {siteConfig.name}
        </motion.h1>
        <motion.p
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          Convertify is a browser-based file tools platform built to make routine PDF, image, and document tasks simpler. The focus is practical workflows, straightforward interfaces, and tools that are quick to open and use.
        </motion.p>
      </section>

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
            Our mission is to make common file tasks easier to complete without pushing users into heavy software for simple jobs.
          </p>
        </motion.div>
      </section>

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

      <section className="container max-w-md mx-auto px-6">
        <motion.div
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="text-center p-8 rounded-2xl border border-border bg-card shadow-card"
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center mx-auto mb-5 text-3xl font-bold text-primary-foreground"
            animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            PS
          </motion.div>
          <p className="text-sm text-muted-foreground mb-1">Built and designed by</p>
          <h3 className="text-xl font-bold text-foreground">Prasad Shivaji Sarnaik</h3>
          <p className="text-sm text-muted-foreground mt-1">UI/UX Designer</p>
        </motion.div>
      </section>
    </main>
    <Footer />
  </>
);

export default AboutPage;
