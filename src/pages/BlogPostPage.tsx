import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import SEO, { SITE } from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFound from "./NotFound";
import { getPost, BLOG_POSTS } from "@/lib/blogPosts";
import { getToolMeta } from "@/lib/toolContent";

const renderBody = (body: string) =>
  body.split(/\n\n+/).map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="text-2xl font-bold text-foreground mt-10 mb-4">
          {block.replace(/^##\s+/, "")}
        </h2>
      );
    }
    if (/^\d+\.\s/.test(block) || block.startsWith("- ")) {
      const items = block.split("\n").filter(Boolean);
      const Tag: "ol" | "ul" = items[0].startsWith("- ") ? "ul" : "ol";
      return (
        <Tag key={i} className={`mb-5 space-y-2 text-muted-foreground ${Tag === "ul" ? "list-disc" : "list-decimal"} pl-6`}>
          {items.map((it, j) => (
            <li key={j}>{it.replace(/^(\d+\.\s|-\s)/, "")}</li>
          ))}
        </Tag>
      );
    }
    return (
      <p key={i} className="text-muted-foreground leading-relaxed mb-5">
        {block}
      </p>
    );
  });

const BlogPostPage = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPost(slug);
  if (!post) return <NotFound />;

  const path = `/blog/${post.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "Convertify" },
    publisher: { "@type": "Organization", name: "Convertify", logo: { "@type": "ImageObject", url: `${SITE}/favicon.png` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}${path}` },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}${path}` },
    ],
  };
  const faqLd = post.faqs.length && {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const relatedTools = post.related.map((s) => getToolMeta(s)).filter(Boolean);
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <SEO title={post.title} description={post.description} path={path} type="article" jsonLd={[articleLd, breadcrumbLd, ...(faqLd ? [faqLd] : [])]} />
      <Navbar />
      <main className="pt-28 pb-20">
        <article className="container max-w-3xl mx-auto px-6">
          <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
              {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {post.readingTime}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-5 leading-tight">{post.title}</h1>
            <p className="text-lg text-muted-foreground mb-10">{post.description}</p>
          </motion.header>

          <div>{renderBody(post.body)}</div>

          {post.faqs.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5">FAQ</h2>
              <div className="space-y-4">
                {post.faqs.map((f) => (
                  <details key={f.q} className="group p-5 rounded-2xl border border-border bg-card">
                    <summary className="cursor-pointer font-semibold text-foreground list-none">{f.q}</summary>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {relatedTools.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-foreground mt-12 mb-5">Related tools</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedTools.map((t) => (
                  <Link key={t!.slug} to={`/${t!.slug}`} className="p-4 rounded-2xl border border-border bg-card hover:shadow-card-hover transition-shadow">
                    <p className="font-semibold text-sm text-foreground">{t!.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t!.tagline}</p>
                  </Link>
                ))}
              </div>
            </>
          )}

          <h2 className="text-2xl font-bold text-foreground mt-12 mb-5">More from the blog</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {otherPosts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="p-4 rounded-2xl border border-border bg-card hover:shadow-card-hover transition-shadow">
                <p className="font-semibold text-sm text-foreground line-clamp-2">{p.title}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
};

export default BlogPostPage;
