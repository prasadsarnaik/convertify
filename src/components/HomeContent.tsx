import { motion } from "framer-motion";
import { ShieldCheck, Lock, Server, Eye, FileText, Image as ImageIcon, FileCheck2, Layers, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const formats = [
  { icon: FileText, label: "PDF", note: "Merge, split, compress, edit, sign, protect" },
  { icon: FileText, label: "Word (DOCX)", note: "Convert to and from PDF" },
  { icon: ImageIcon, label: "JPG / PNG", note: "Convert, resize, compress, rotate" },
  { icon: ImageIcon, label: "WebP / AVIF / HEIC", note: "Convert to JPG instantly" },
  { icon: FileCheck2, label: "Image → PDF", note: "Bundle photos into one PDF" },
  { icon: Layers, label: "PDF → JPG", note: "Export pages as images" },
];

const benefits = [
  "Save money — every Convertify tool is free, with no premium upgrade",
  "Save time — open the page and start working in under five seconds",
  "Stay private — your files never leave your browser, ever",
  "Stay flexible — works on Windows, macOS, Linux, iOS and Android",
  "Stay safe — no plugins, no installers, no executable downloads",
  "Stay focused — clean interface with no pop-ups or upsells",
];

const faqs = [
  {
    q: "Is Convertify completely free?",
    a: "Yes. Every tool on Convertify is 100% free with no daily limits, no watermarks and no subscription. You do not need an account, an email address or a credit card.",
  },
  {
    q: "Are my files uploaded anywhere?",
    a: "No. Convertify processes everything inside your browser using JavaScript and the Web Crypto, Canvas and PDF APIs. Your file is never sent to a server, never logged and never stored.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Convertify is a regular website. Open it in Chrome, Safari, Firefox or Edge — desktop or mobile — and the tools work immediately.",
  },
  {
    q: "Will my PDF look the same after conversion?",
    a: "We use industry-standard libraries (pdf-lib, pdfjs-dist, mammoth, jsPDF) so output keeps fonts, images and layout. For very complex documents, results depend on how the original was created.",
  },
  {
    q: "Can I use Convertify for confidential documents?",
    a: "Yes. Because the conversion happens locally, Convertify is suitable for contracts, invoices, IDs and other sensitive paperwork. Your IT team can audit network traffic to confirm nothing is uploaded.",
  },
  {
    q: "Why is Convertify free if it doesn't sell my data?",
    a: "The site is supported by unobtrusive display advertising on content pages — never on file uploads. We do not sell, share or use your file content.",
  },
];

const HomeContent = () => (
  <>
    {/* Why Choose */}
    <section className="container max-w-4xl mx-auto px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Why choose Convertify</h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          Convertify is built for people who want to get a file fixed and move on with their day. No sign-up walls, no e-mail capture, no waiting in a queue and no watermark on the result.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          {benefits.map((b) => (
            <div key={b} className="p-5 rounded-2xl border border-border bg-card text-muted-foreground">
              {b}
            </div>
          ))}
        </div>
      </motion.div>
    </section>

    {/* Supported formats */}
    <section className="container max-w-4xl mx-auto px-6 py-20 border-t border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-4">Supported file formats</h2>
      <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
        Convertify covers the formats people actually use day-to-day — PDFs, Word documents and the most common image formats from phones, cameras and the web.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {formats.map(({ icon: Icon, label, note }) => (
          <div key={label} className="p-5 rounded-2xl border border-border bg-card">
            <Icon className="w-5 h-5 text-foreground mb-2" />
            <p className="font-semibold text-foreground">{label}</p>
            <p className="text-sm text-muted-foreground mt-1">{note}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Privacy */}
    <section className="container max-w-3xl mx-auto px-6 py-20 border-t border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Your files are safe</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Most online converters work by uploading your file to a remote server, processing it there and emailing or streaming the result back. That is convenient, but it means a copy of your document sits on someone else's computer. Convertify takes the opposite approach.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-8">
        Every tool on this site is a piece of JavaScript that runs locally inside your browser. When you drop a PDF, Word document or image onto the page, the file is read into your device's memory, processed by the browser and saved straight to your downloads folder. Nothing is ever transmitted to a Convertify server, and there is no temporary storage to clean up.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {[
          { icon: Lock, t: "No uploads", d: "Files stay on your device from start to finish." },
          { icon: Server, t: "No storage", d: "We have no server-side copy to leak or breach." },
          { icon: Eye, t: "No tracking", d: "We do not analyse the content of your files." },
          { icon: ShieldCheck, t: "HTTPS only", d: "The site itself is served over an encrypted connection." },
        ].map(({ icon: Icon, t, d }) => (
          <div key={t} className="p-5 rounded-2xl border border-border bg-card">
            <Icon className="w-5 h-5 text-accent-blue mb-2" />
            <p className="font-semibold text-foreground">{t}</p>
            <p className="text-sm text-muted-foreground mt-1">{d}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Benefits of online PDF tools */}
    <section className="container max-w-3xl mx-auto px-6 py-20 border-t border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-6">Benefits of online PDF tools</h2>
      <p className="text-muted-foreground leading-relaxed mb-4">
        Online PDF tools have replaced bulky desktop suites for most people. There is no licence to manage, no update prompt to dismiss, no installation that fails because of an antivirus. You open a tab, do the job and close the tab.
      </p>
      <p className="text-muted-foreground leading-relaxed mb-4">
        For students, that means turning a stack of scanned notes into a single revision PDF the night before an exam. For freelancers, it means compressing a 40 MB portfolio so it fits inside a client's mailbox limit. For small businesses, it means merging signed contract pages, splitting an invoice book or protecting a quote with a password — all without buying yet another subscription.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Convertify focuses on this practical use case. The tools are deliberately small, single-purpose and explained on the page. If you only need to merge two PDFs once a month, you should not have to sit through a 200 MB installer to do it.
      </p>
    </section>

    {/* FAQ */}
    <section className="container max-w-3xl mx-auto px-6 py-20 border-t border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-10">Frequently asked questions</h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 rounded-2xl border border-border bg-card">
            <summary className="cursor-pointer font-semibold text-foreground list-none flex justify-between items-center">
              {f.q}
              <span className="text-muted-foreground group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>

    {/* Final CTA */}
    <section className="container max-w-3xl mx-auto px-6 py-20 text-center border-t border-border">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to convert your file?</h2>
      <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
        Pick a tool, drop your file in and download the result. Free forever, no sign-up, no installation.
      </p>
      <Link to="/tools" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 transition-opacity">
        Browse all tools <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  </>
);

export const homeFaqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default HomeContent;
