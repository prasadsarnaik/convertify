import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container max-w-xl mx-auto px-6">
          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-muted-foreground">
              Have a question, feedback or suggestion? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-2xl border border-border bg-card shadow-card"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle className="w-14 h-14 text-accent-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <Input placeholder="Your name" required className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                    <Input type="email" placeholder="you@example.com" required className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                    <Textarea placeholder="Your message…" required rows={5} className="rounded-xl" />
                  </div>
                  <Button type="submit" className="w-full rounded-full gap-2">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    This is a demo form. Messages are not delivered yet.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@convertify.app</span>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
