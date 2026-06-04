import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import type { ToolMeta } from "@/lib/toolContent";
import { getToolMeta } from "@/lib/toolContent";
import { getToolLongForm } from "@/lib/toolContentLong";
import AdSlot from "./AdSlot";

const fade = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const ToolContent = ({ meta }: { meta: ToolMeta }) => {
  const long = getToolLongForm(meta);
  const related = meta.related
    .map((slug) => getToolMeta(slug))
    .filter((t): t is ToolMeta => Boolean(t));
  const allFaqs = [...meta.faqs, ...long.extraFaqs];

  return (
    <section className="container max-w-3xl mx-auto px-6 py-16">
      <motion.div variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl font-bold text-foreground mb-4">What is {meta.name}?</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">{meta.intro}</p>
        <p className="text-muted-foreground leading-relaxed mb-5">{long.body[0]}</p>
        <p className="text-muted-foreground leading-relaxed mb-10">{long.body[1]}</p>

        <h2 className="text-2xl font-bold text-foreground mb-4">How to use {meta.name}</h2>
        <ol className="space-y-3 mb-10">
          {meta.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-muted-foreground leading-relaxed">{step}</span>
            </li>
          ))}
        </ol>

        <h2 className="text-2xl font-bold text-foreground mb-4">Key features</h2>
        <ul className="grid sm:grid-cols-2 gap-3 mb-10">
          {long.features.map((f) => (
            <li key={f} className="flex gap-2.5 text-muted-foreground text-sm">
              <Sparkles className="w-4 h-4 text-accent-blue shrink-0 mt-1" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-foreground mb-4">Who uses {meta.name}?</h2>
        <ul className="space-y-2.5 mb-10">
          {long.useCases.map((u) => (
            <li key={u} className="flex gap-2.5 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{u}</span>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-bold text-foreground mb-4">Why use Convertify for {meta.name}</h2>
        <ul className="space-y-2.5 mb-10">
          {meta.benefits.map((b, i) => (
            <li key={i} className="flex gap-2.5 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <AdSlot slot="0000000000" label="Sponsored" />

        <h2 className="text-2xl font-bold text-foreground mb-4">Privacy &amp; security</h2>
        <p className="text-muted-foreground leading-relaxed mb-4">
          Privacy is the default with {meta.name}. Because the work happens inside your browser, no copy of your file is ever transmitted to Convertify or to a third party.
        </p>
        <ul className="space-y-2.5 mb-10">
          {long.privacy.map((p) => (
            <li key={p} className="flex gap-2.5 text-muted-foreground">
              <ShieldCheck className="w-5 h-5 text-accent-blue shrink-0 mt-0.5" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Lock, title: "Private", text: "Files never leave your browser." },
            { icon: Zap, title: "Instant", text: "Processing happens on your device." },
            { icon: ShieldCheck, title: "Secure", text: "HTTPS-only, no tracking of file content." },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="p-5 rounded-2xl border border-border bg-card">
              <Icon className="w-5 h-5 text-foreground mb-2" />
              <p className="font-semibold text-sm text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground mt-1">{text}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-foreground mb-4">Frequently asked questions</h2>
        <div className="space-y-4 mb-12">
          {allFaqs.map((f) => (
            <details key={f.q} className="group p-5 rounded-2xl border border-border bg-card">
              <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between items-center">
                {f.q}
                <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>

        {related.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/${r.slug}`}
                  className="p-4 rounded-2xl border border-border bg-card hover:shadow-card-hover transition-shadow"
                >
                  <p className="font-semibold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{r.tagline}</p>
                </Link>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
};

export default ToolContent;
