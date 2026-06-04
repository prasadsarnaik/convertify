import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import convertifyLogo from "@/assets/convertify-logo.png";

const columns = [
  {
    title: "Tools",
    links: [
      { label: "Merge PDF", href: "/merge-pdf" },
      { label: "Split PDF", href: "/split-pdf" },
      { label: "Compress PDF", href: "/compress-pdf" },
      { label: "PDF to Word", href: "/pdf-to-word" },
      { label: "Word to PDF", href: "/word-to-pdf" },
      { label: "PDF to JPG", href: "/pdf-to-jpg" },
      { label: "JPG to PDF", href: "/jpg-to-pdf" },
      { label: "All tools", href: "/tools" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "FAQ", href: "/how-it-works" },
      { label: "Features", href: "/features" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Cookie Policy", href: "/cookie-policy" },
      { label: "DMCA", href: "/dmca" },
      { label: "Disclaimer", href: "/disclaimer" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card py-14">
    <div className="container max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-[1.4fr_repeat(4,1fr)] gap-10 mb-12">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img src={convertifyLogo} alt="Convertify logo" className="h-9 object-contain" />
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xs">
            Free online PDF and image tools that run entirely in your browser. No sign-up, no watermark, no upload.
          </p>
          <a
            href="mailto:hello@convertify.app"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="w-4 h-4" /> hello@convertify.app
          </a>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-semibold text-sm text-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
        © 2026 Convertify. Created and owned by{" "}
        <span className="font-medium text-foreground">Prasad Shivaji Sarnaik</span>.
      </div>
    </div>
  </footer>
);

export default Footer;
