import SEO from "@/components/SEO";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle, FileText, UserCheck, ShieldAlert, Award, AlertTriangle, Scale, ExternalLink, XCircle, RefreshCw, Mail } from "lucide-react";

const sections = [
  {
    icon: CheckCircle,
    title: "1. Acceptance of Terms",
    content: `By accessing or using Convertify ("the Website"), you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.\n\nThese terms apply to all visitors, users, and others who access or use the Website.`,
  },
  {
    icon: FileText,
    title: "2. Description of Services",
    content: `Convertify provides free online tools for file conversion, compression, and editing, including but not limited to:\n\n• PDF tools (merge, split, compress, convert)\n• Image tools (format conversion, compression, resizing)\n• Video downloading tools\n• Document converters\n\nAll tools are provided free of charge and are intended for personal and lawful use. We reserve the right to modify, suspend, or discontinue any tool at any time without prior notice.`,
  },
  {
    icon: UserCheck,
    title: "3. User Responsibilities",
    content: `When using Convertify, you agree to:\n\n• Use the tools only for lawful purposes.\n• Not upload any files that contain malware, viruses, or malicious code.\n• Not attempt to overload, disrupt, or interfere with our servers or services.\n• Not use automated systems (bots, scrapers) to access our services without permission.\n• Ensure you have the right to process any files you upload.\n\nYou are solely responsible for the content of the files you upload and process.`,
  },
  {
    icon: ShieldAlert,
    title: "4. Prohibited Activities",
    content: `The following activities are strictly prohibited:\n\n• Using Convertify for any illegal or unauthorized purpose.\n• Uploading copyrighted content without proper authorization.\n• Attempting to hack, reverse-engineer, or exploit any part of the Website.\n• Using our tools to process content that is harmful, abusive, or violates any laws.\n• Reselling or commercially exploiting our free services without permission.\n• Distributing malware or engaging in phishing activities through our platform.\n\nViolation of these terms may result in immediate termination of access.`,
  },
  {
    icon: Award,
    title: "5. Intellectual Property",
    content: `All content on Convertify, including but not limited to the logo, design, text, graphics, and software, is the property of Convertify and is protected by intellectual property laws.\n\n• You may not copy, modify, distribute, or reproduce any part of the Website without prior written consent.\n• The tools and their underlying technology remain our exclusive property.\n• User-uploaded files remain the property of their respective owners.`,
  },
  {
    icon: AlertTriangle,
    title: "6. Disclaimer of Warranties",
    content: `Convertify is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, either express or implied.\n\n• We do not guarantee that the services will be uninterrupted, error-free, or completely secure.\n• We do not warrant the accuracy, completeness, or reliability of any output produced by our tools.\n• File conversion results may vary depending on the input file format and complexity.\n\nYou use Convertify at your own risk.`,
  },
  {
    icon: Scale,
    title: "7. Limitation of Liability",
    content: `To the fullest extent permitted by law, Convertify and its owner shall not be liable for:\n\n• Any indirect, incidental, special, or consequential damages.\n• Loss of data, revenue, or profits arising from your use of our services.\n• Any damages resulting from unauthorized access to your files or data.\n• Any errors, bugs, or inaccuracies in our tools or their output.\n\nOur total liability shall not exceed the amount you paid to use our services (which is zero, as our tools are free).`,
  },
  {
    icon: ExternalLink,
    title: "8. Third-Party Links & Disclaimers",
    content: `Convertify may contain links to third-party websites or services that are not owned or controlled by us.\n\n• We are not responsible for the content, privacy policies, or practices of any third-party websites.\n• Video downloading tools are provided for downloading content you have the right to download. We do not encourage or support the downloading of copyrighted content without authorization.\n• Users are solely responsible for ensuring they comply with the terms of service of platforms like YouTube, Instagram, and others.\n• Convertify does not host, store, or distribute any third-party content.`,
  },
  {
    icon: XCircle,
    title: "9. Termination of Access",
    content: `We reserve the right to terminate or suspend access to our services immediately, without prior notice, for any reason, including but not limited to:\n\n• Violation of these Terms & Conditions.\n• Abuse of our tools or services.\n• Engaging in prohibited activities.\n• Any conduct that we determine is harmful to other users or our services.\n\nUpon termination, your right to use the Website will cease immediately.`,
  },
  {
    icon: RefreshCw,
    title: "10. Changes to Terms",
    content: `We reserve the right to modify or replace these Terms & Conditions at any time. When we make changes, we will update the "Last Updated" date at the top of this page.\n\nYour continued use of Convertify after any changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.`,
  },
  {
    icon: Scale,
    title: "11. Governing Law",
    content: `These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in India.\n\nIf any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.`,
  },
  {
    icon: Mail,
    title: "12. Contact Information",
    content: `If you have any questions about these Terms & Conditions, please contact us:\n\n• **Owner:** Prasad Shivaji Sarnaik\n• **Website:** Convertify\n• **Contact Page:** [Contact Us](/contact)\n\nWe will respond to your inquiry as soon as possible.`,
  },
];

const TermsPage = () => {
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
    <>
      <SEO title="Terms & Conditions" description="Read Convertify's terms and conditions for using our free online file conversion and editing tools." path="/terms" />
      <div className="min-h-screen bg-background">
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent-purple to-accent-pink z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container max-w-3xl mx-auto px-6">
          <p className="text-sm text-muted-foreground mb-2">Last Updated: March 18, 2026</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            Please read these terms carefully before using Convertify.
          </p>

          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.title} className="group">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 group-hover:border-accent-purple/30 transition-colors">
                    <section.icon className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">{section.title}</h2>
                    <div className="text-[15px] text-muted-foreground leading-relaxed whitespace-pre-line [&_strong]:text-foreground [&_strong]:font-semibold">
                      {section.content.split(/(\*\*.*?\*\*)/g).map((part, i) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return <strong key={i}>{part.slice(2, -2)}</strong>;
                        }
                        if (part.includes("[Contact Us](/contact)")) {
                          const parts = part.split("[Contact Us](/contact)");
                          return (
                            <span key={i}>
                              {parts[0]}
                              <a href="/contact" className="text-accent-purple hover:underline">Contact Us</a>
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
    </>
  );
};

export default TermsPage;
