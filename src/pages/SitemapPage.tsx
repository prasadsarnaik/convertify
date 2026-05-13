import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { siteRoutes, toolSeoContent } from "@/lib/site";

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const mainRoutes = siteRoutes.filter((route) =>
  !["/privacy-policy", "/terms-and-conditions", "/disclaimer", "/sitemap"].includes(route.path)
);

const legalRoutes = siteRoutes.filter((route) =>
  ["/privacy-policy", "/terms-and-conditions", "/disclaimer"].includes(route.path)
);

const SitemapPage = () => (
  <>
    <SEO
      title="HTML Sitemap"
      description="Browse the main pages, legal pages, and file tool pages available on Convertify."
      path="/sitemap"
      noindex
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-5xl mx-auto px-6">
        <motion.div
          variants={fade}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">HTML Sitemap</h1>
          <p className="text-lg text-muted-foreground">
            Browse the main sections of Convertify and jump directly to any tool page.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Main Pages</h2>
            <ul className="space-y-3">
              {mainRoutes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path} className="text-foreground font-medium hover:underline">
                    {route.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">{route.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Legal Pages</h2>
            <ul className="space-y-3">
              {legalRoutes.map((route) => (
                <li key={route.path}>
                  <Link to={route.path} className="text-foreground font-medium hover:underline">
                    {route.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">{route.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Tool Pages</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {toolSeoContent.map((tool) => (
              <div key={tool.slug} className="rounded-xl border border-border bg-background p-4">
                <Link to={`/tool/${tool.slug}`} className="text-foreground font-medium hover:underline">
                  {tool.name}
                </Link>
                <p className="text-sm text-muted-foreground mt-1">{tool.metaDescription}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
    <Footer />
  </>
);

export default SitemapPage;
