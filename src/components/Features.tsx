import { motion } from "framer-motion";
import { Zap, Shield, Layers, Smartphone } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Process files in seconds with optimized engines.", color: "from-accent-orange to-accent-pink" },
  { icon: Shield, title: "Secure Processing", desc: "Files are processed locally and never stored.", color: "from-accent-green to-accent-blue" },
  { icon: Layers, title: "Batch Conversion", desc: "Upload multiple files and convert them all at once.", color: "from-accent-purple to-accent-pink" },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Fully responsive design, works on any device.", color: "from-accent-blue to-accent-purple" },
];

const Features = () => (
  <section id="features" className="py-20 md:py-28 bg-card">
    <div className="container max-w-5xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">Why Convertify?</h2>
        <p className="mt-4 text-muted-foreground text-lg">Built for speed, security and simplicity.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-background border border-border"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4`}>
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
