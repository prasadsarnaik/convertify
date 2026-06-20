import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdSlot from "@/components/AdSlot";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { SITE_URL } from "@/config/site";

const BlogIndexPage = () => {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: BLOG_POSTS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${p.slug}`,
      name: p.title,
    })),
  };

  return (
    <>
      <SEO
        title="Blog — Free PDF & File Conversion Guides"
        description="Tutorials, comparisons and how-to guides for PDF, Word and image conversion. Free, in-depth and written by the Convertify team."
        path="/blog"
        jsonLd={itemListLd}
      />
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container max-w-3xl mx-auto px-6 text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-5"
          >
            The Convertify Blog
          </motion.h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Practical guides to working with PDFs, Word documents and images. Written for real people, not search engines.
          </p>
        </section>

        <AdSlot placement="header" variant="compact" label="Sponsored" style={{ minHeight: "90px" }} />

        <section className="container max-w-3xl mx-auto px-6 grid gap-6">
          {BLOG_POSTS.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="block p-6 rounded-2xl border border-border bg-card hover:shadow-card-hover transition-shadow"
            >
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                {new Date(p.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {p.readingTime}
              </p>
              <h2 className="text-xl font-semibold text-foreground mb-2">{p.title}</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.excerpt}</p>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogIndexPage;
