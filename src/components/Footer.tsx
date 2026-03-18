import { Link } from "react-router-dom";

const columns = [
  {
    title: "Tools",
    links: [
      { label: "Merge PDF", href: "/tool/merge-pdf" },
      { label: "Split PDF", href: "/tool/split-pdf" },
      { label: "Compress PDF", href: "/tool/compress-pdf" },
      { label: "PDF to JPG", href: "/tool/pdf-to-jpg" },
      { label: "JPG to PDF", href: "/tool/jpg-to-pdf" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/contact" },
      { label: "FAQ", href: "/how-it-works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-card py-14">
    <div className="container max-w-6xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
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
        © 2026 Convertify. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
