import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Upload, Settings, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const steps = [
  { icon: Upload, title: "Upload Your File", desc: "Drag and drop or click to upload your files from any device.", color: "from-accent-blue to-accent-purple" },
  { icon: Settings, title: "Choose a Tool", desc: "Select the conversion or optimization you need from our tool library.", color: "from-accent-purple to-accent-pink" },
  { icon: Download, title: "Download the Result", desc: "Get your processed file instantly — fast and secure.", color: "from-accent-green to-accent-blue" },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const HowItWorksPage = () => (
  <>
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-4xl mx-auto px-6">
        <motion.div variants={fade} initial="hidden" animate="visible" transition={{ duration: 0.5 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">How It Works</h1>
          <p className="text-lg text-muted-foreground">Three simple steps to get results.</p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              className="flex flex-col md:flex-row items-center gap-6 p-8 rounded-2xl border border-border bg-card shadow-card"
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shrink-0`}>
                <s.icon className="w-9 h-9 text-primary-foreground" />
              </div>
              <div className="text-center md:text-left">
                <span className="text-xs font-semibold text-muted-foreground">Step {i + 1}</span>
                <h3 className="font-bold text-xl text-foreground mt-1 mb-1">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default HowItWorksPage;
