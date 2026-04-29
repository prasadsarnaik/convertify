import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Scale, CheckCircle, AlertTriangle, Copyright, ExternalLink, Ban, Gavel, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site";

const TermsConditions = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Read the terms and conditions for using Convertify file tools and website content."
        path="/terms-and-conditions"
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Scale className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Terms & Conditions
              </h1>
              <p className="text-muted-foreground">
                Last Updated: <span className="font-medium">{siteConfig.lastUpdated}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-10 space-y-8">
              <section>
                <p className="text-foreground leading-relaxed">
                  Welcome to <strong>Convertify</strong>. These Terms and Conditions govern your use of <a href={siteConfig.siteUrl} className="text-blue-600 hover:underline">{siteConfig.siteUrl}</a> and the related file conversion, optimization, and editing tools available through the website.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  By using the website, you agree to these Terms and to our Privacy Policy.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-foreground">2. Eligibility</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  You must be at least 13 years old and legally permitted to use the services in your jurisdiction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Services</h2>
                <p className="text-foreground leading-relaxed">
                  Convertify offers browser-based PDF, image, and document tools. Features may change over time, and some tools may be limited by browser or device capabilities.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-foreground">4. Your Responsibilities</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>You are responsible for the files and content you upload or process.</li>
                  <li>You must have the right to use, upload, and convert those files.</li>
                  <li>You should keep original backups of important files.</li>
                  <li>You must not use the services for unlawful, harmful, or abusive purposes.</li>
                </ul>
                <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <p className="text-foreground font-medium mb-2">Prohibited Uses</p>
                  <p className="text-foreground text-sm">
                    Do not use Convertify to process illegal content, malware, confidential information you are not authorized to share, or copyrighted material you do not have permission to handle.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Copyright className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The website design, code, and related materials belong to Convertify or its licensors. You retain ownership of the files you upload.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Ban className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">6. Warranty Disclaimer</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The services are provided on an as-is and as-available basis. We do not guarantee uninterrupted availability, perfect conversions, or suitability for every use case.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-foreground">7. Limitation of Liability</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  To the fullest extent permitted by law, Convertify is not liable for indirect, incidental, or consequential damages related to your use of the services.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-cyan-600" />
                  <h2 className="text-xl font-semibold text-foreground">8. Third-Party Services</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The website may include third-party services such as analytics, hosting, or advertising providers. Their own terms and policies apply to their services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to Terms</h2>
                <p className="text-foreground leading-relaxed">
                  We may update these Terms from time to time. Continued use of the website after changes means you accept the updated Terms.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
                </div>
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

export default TermsConditions;
