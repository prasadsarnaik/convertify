import { motion } from "framer-motion";
import { Upload, Settings, Download } from "lucide-react";

const steps = [
  { icon: Upload, title: "Upload File", desc: "Drag and drop or click to upload your files.", color: "from-accent-blue to-accent-purple" },
  { icon: Settings, title: "Choose Tool", desc: "Select the conversion or optimization you need.", color: "from-accent-purple to-accent-pink" },
  { icon: Download, title: "Download Result", desc: "Get your processed file instantly.", color: "from-accent-green to-accent-blue" },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-20 md:py-28">
    <div className="container max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">How it works</h2>
        <p className="mt-4 text-muted-foreground text-lg">Three simple steps to get results.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="text-center"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-5`}>
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <div className="text-xs font-semibold text-muted-foreground mb-2">Step {i + 1}</div>
            <h3 className="font-bold text-lg text-foreground mb-1">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
