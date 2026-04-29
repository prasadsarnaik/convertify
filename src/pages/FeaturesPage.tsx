import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Zap, Shield, Layers, Smartphone } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Convertify keeps common file tasks quick with focused browser-based workflows.", color: "from-accent-orange to-accent-pink" },
  { icon: Shield, title: "Secure Processing", desc: "Many tools run locally in the browser, which keeps file handling simple and private.", color: "from-accent-green to-accent-blue" },
  { icon: Layers, title: "Batch Conversion", desc: "Convert multiple files at once.", color: "from-accent-purple to-accent-pink" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Works beautifully on mobile, tablet, and desktop.", color: "from-accent-blue to-accent-purple" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const FeaturesPage = () => (
  <>
    <SEO
      title="Features"
      description="Explore Convertify features including browser-based processing, batch workflows, and mobile-friendly file tools."
      path="/features"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Features</h1>
          <p className="text-lg text-muted-foreground">Built for speed, security, and simplicity.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-card border border-border shadow-card"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5`}>
                <f.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-xl text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default FeaturesPage;
