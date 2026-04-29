import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, Info, FileWarning, Scale, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

const Disclaimer = () => {
  return (
    <>
      <SEO
        title="Disclaimer"
        description="Read the Convertify disclaimer, file processing limitations, and content responsibility notes."
        path="/disclaimer"
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Disclaimer
              </h1>
              <p className="text-muted-foreground">
                Last Updated: <span className="font-medium">{siteConfig.lastUpdated}</span>
              </p>
            </div>

            <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Please Read Carefully</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    By using Convertify, you acknowledge the limitations and responsibilities outlined below.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-10 space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileWarning className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. General Disclaimer</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The information, tools, and services provided by <strong>Convertify</strong> ({siteConfig.siteUrl}) are offered for general utility purposes. We do not guarantee that every tool, result, or workflow will be suitable for every document, image, or business process.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. File Processing & Output Quality</h2>
                <p className="text-foreground leading-relaxed">
                  File conversion and editing can produce different results depending on the original file structure, fonts, metadata, browser support, and device performance.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Always keep original backups before processing files.</li>
                  <li>Review converted, compressed, signed, or edited output before relying on it.</li>
                  <li>Complex files may not reproduce perfectly.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">3. Third-Party Services & Links</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Convertify may include third-party links, analytics, advertising, or embedded services. We are not responsible for the content, privacy practices, or reliability of those third parties.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-foreground">4. No Professional Advice</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Convertify does not provide legal, financial, technical, or professional advice. The tools are utilities only.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. User Responsibility</h2>
                <p className="text-foreground leading-relaxed">
                  You are responsible for the files you upload, the rights you have to those files, and the consequences of using the output.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Service Availability</h2>
                <p className="text-foreground leading-relaxed">
                  We may change, pause, or remove tools at any time. We do not guarantee uninterrupted service availability.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Contact</h2>
                <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-foreground">
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${siteConfig.supportEmail}`} className="text-blue-600 hover:underline">
                      {siteConfig.supportEmail}
                    </a>
                  </p>
                  <p className="text-foreground mt-1">
                    <strong>Website:</strong>{" "}
                    <a href={siteConfig.siteUrl} className="text-blue-600 hover:underline">
                      {siteConfig.siteUrl}
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Disclaimer;
