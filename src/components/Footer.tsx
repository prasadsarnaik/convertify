const columns = [
  { title: "Tools", links: ["Merge PDF", "Split PDF", "Compress PDF", "PDF to JPG", "JPG to PDF"] },
  { title: "Company", links: ["About", "Blog", "Careers"] },
  { title: "Support", links: ["Help Center", "Contact", "Status"] },
  { title: "Legal", links: ["Privacy", "Terms", "Cookies"] },
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
                <li key={link}>
                  <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">{link}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 text-center text-sm text-muted-foreground">
        Built by Prasad Shivaji Sarnaik
      </div>
    </div>
  </footer>
);

export default Footer;
