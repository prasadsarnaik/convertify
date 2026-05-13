import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Clock3, Mail, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = `Convertify support request from ${name || "Website visitor"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Contact Convertify for support questions, feedback, or product suggestions."
        path="/contact"
      />
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
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Contact</h1>
            <p className="text-lg text-muted-foreground">
              Have a question, feedback, or suggestion? Use the form below or email the support address.
            </p>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-8 rounded-2xl border border-border bg-card shadow-card"
          >
            <motion.form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us which tool you used, what happened, and what you expected."
                  required
                  rows={5}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-full gap-2">
                <Send className="w-4 h-4" /> Open Email Draft
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                Submitting opens your default email app with the details prefilled.
              </p>
            </motion.form>
          </motion.div>

          <motion.div
            variants={fade}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            <div className="rounded-2xl border border-border bg-background p-5 text-center">
              <Mail className="w-5 h-5 text-accent-blue mx-auto mb-3" />
              <h2 className="font-semibold text-foreground">Direct support</h2>
              <p className="text-sm text-muted-foreground mt-2 break-all">
                {siteConfig.supportEmail}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5 text-center">
              <Clock3 className="w-5 h-5 text-accent-green mx-auto mb-3" />
              <h2 className="font-semibold text-foreground">What to include</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Share the tool name, file type, device, browser, and the exact issue.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-5 text-center">
              <ShieldCheck className="w-5 h-5 text-accent-purple mx-auto mb-3" />
              <h2 className="font-semibold text-foreground">Privacy note</h2>
              <p className="text-sm text-muted-foreground mt-2">
                Avoid sending confidential files by email unless you are comfortable sharing them.
              </p>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
