import { HelpCircle, ListChecks, Shield } from "lucide-react";

import { toolSeoMap } from "@/lib/site";

const ToolContentSections = ({ toolSlug }: { toolSlug: string }) => {
  const seoContent = toolSeoMap[toolSlug];

  if (!seoContent) {
    return null;
  }

  return (
    <div className="border-t border-border bg-muted/30">
      <div className="container max-w-4xl mx-auto px-6 py-16 space-y-16">
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            About {seoContent.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {seoContent.summary}
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Convertify focuses on practical browser-based workflows, so this tool
            is intended for quick file tasks without a long setup process.
          </p>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <ListChecks className="w-6 h-6 text-accent-blue" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How to use {seoContent.name}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {seoContent.howTo.map((step, index) => (
              <div
                key={step}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Step {index + 1}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-accent-green" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Why use this tool
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {seoContent.benefits.map((benefit) => (
              <div
                key={benefit}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-accent-purple" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {seoContent.faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <h3 className="font-semibold text-foreground">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ToolContentSections;
