import { motion } from "framer-motion";
import { Heart, Zap, Shield, Sparkles, User } from "lucide-react";
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
          About PDFly
        </motion.h1>
        <motion.p
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          PDFly is a modern file tools platform designed to make working with PDFs and images simple, fast and beautiful. Our goal is to provide powerful file tools with a clean user experience inspired by Apple's design philosophy.
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

      {/* Why PDFly */}
      <section className="container max-w-4xl mx-auto px-6 mb-20">
        <motion.h2
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12"
        >
          Why PDFly?
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
          variants={fade}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -4 }}
          className="text-center p-8 rounded-2xl border border-border bg-card shadow-card"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-purple to-accent-pink flex items-center justify-center mx-auto mb-5">
            <User className="w-9 h-9 text-primary-foreground" />
          </div>
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
