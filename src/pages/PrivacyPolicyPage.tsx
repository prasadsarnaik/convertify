import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Database, Cookie, Lock, UserCheck, RefreshCw, Mail, FileText, Server, Eye } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "1. Introduction",
    content: `Welcome to Convertify. Your privacy matters to us. This Privacy Policy explains how we collect, use, and protect your information when you use our free online tools, including PDF tools, image converters, video downloaders, and more.\n\nBy using Convertify, you agree to the practices described in this policy. We are committed to transparency and keeping things simple.`,
  },
  {
    icon: Database,
    title: "2. Information We Collect",
    content: `We may collect the following types of information:\n\n• **Usage Data** — Pages visited, tools used, time spent, browser type, device information, and referring URLs.\n• **Uploaded Files** — Files you upload for processing through our tools (see Section 4 for details on how these are handled).\n• **Cookies & Local Storage** — Small data files stored on your device to improve your experience.\n• **IP Address** — Collected automatically for analytics and security purposes.\n\nWe do **not** collect personal information such as your name, email, or phone number unless you voluntarily provide it (e.g., via the Contact page).`,
  },
  {
    icon: Server,
    title: "3. How We Use Information",
    content: `We use the information we collect to:\n\n• Provide and improve our free online tools.\n• Understand how users interact with our website.\n• Monitor and prevent abuse or unauthorized use.\n• Ensure the security and performance of our services.\n• Display relevant content and improve user experience.\n\nWe do **not** sell your personal data to third parties.`,
  },
  {
    icon: FileText,
    title: "4. File Handling",
    content: `Your files are important to us, and we handle them with care:\n\n• **Files are NOT stored permanently.** All uploaded files are processed in real-time and are **automatically deleted** from our servers immediately after processing is complete.\n• We do **not** access, view, or share the content of your files.\n• No backups or copies of your files are retained.\n• File processing happens securely, and data is transmitted over encrypted connections (HTTPS).\n\nYou can use Convertify with confidence knowing your files remain private.`,
  },
  {
    icon: Cookie,
    title: "5. Cookies Policy",
    content: `We use cookies and similar technologies to:\n\n• Remember your preferences and settings.\n• Analyze website traffic and usage patterns.\n• Improve website performance and load times.\n\nYou can manage or disable cookies through your browser settings. Please note that disabling cookies may affect some features of our website.\n\n**Types of cookies we use:**\n• **Essential Cookies** — Required for the website to function properly.\n• **Analytics Cookies** — Help us understand how visitors use our site.\n• **Preference Cookies** — Remember your settings and choices.`,
  },
  {
    icon: Shield,
    title: "6. Third-Party Services",
    content: `We may use the following third-party services:\n\n• **Google Analytics** — To analyze website traffic and user behavior. Google's privacy policy applies to data collected by their services.\n• **Content Delivery Networks (CDNs)** — To serve assets quickly and reliably.\n• **Advertising Partners** — If applicable, we may display ads through third-party networks. These partners may use cookies to serve relevant ads.\n\nWe encourage you to review the privacy policies of these third-party services.`,
  },
  {
    icon: Lock,
    title: "7. Data Security",
    content: `We take reasonable measures to protect your information, including:\n\n• Encrypted data transmission using HTTPS/SSL.\n• Regular security audits and updates.\n• Access controls to prevent unauthorized access.\n• Automatic deletion of uploaded files after processing.\n\nWhile we strive to protect your data, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.`,
  },
  {
    icon: UserCheck,
    title: "8. Your Rights",
    content: `You have the right to:\n\n• **Access** — Request information about the data we collect.\n• **Deletion** — Request deletion of any personal data we may hold.\n• **Opt-out** — Disable cookies or opt out of analytics tracking.\n• **Correction** — Request correction of any inaccurate information.\n\nTo exercise any of these rights, please contact us using the information provided below.`,
  },
  {
    icon: RefreshCw,
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. When we make changes, we will update the "Last Updated" date at the top of this page.\n\nWe encourage you to review this policy periodically to stay informed about how we protect your information.`,
  },
  {
    icon: Mail,
    title: "10. Contact Information",
    content: `If you have any questions or concerns about this Privacy Policy, please contact us:\n\n• **Owner:** Prasad Shivaji Sarnaik\n• **Website:** Convertify\n• **Contact Page:** [Contact Us](/contact)\n\nWe will respond to your inquiry as soon as possible.`,
  },
];

const PrivacyPolicyPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent-blue to-accent-purple z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-sm text-muted-foreground mb-2">Last Updated: March 18, 2026</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            We believe in transparency. Here's how Convertify handles your data.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:border-accent-blue/30 transition-colors">
                    <section.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                    <div className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line prose prose-sm max-w-none [&_strong]:text-foreground [&_strong]:font-semibold">
                      {section.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        if (part.includes("[Contact Us](/contact)")) {
                          const parts = part.split("[Contact Us](/contact)");
                          return (
                            <span key={i}>
                              {parts[0]}
                              <a href="/contact" className="text-accent-blue hover:underline">Contact Us</a>
                              {parts[1]}
                            </span>
                          );
                        }
                        return <span key={i}>{part}</span>;
                      })}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
