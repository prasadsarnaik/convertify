import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Cookie, Eye, Database, Trash2, Users, Baby, Mail, RefreshCw } from "lucide-react";
import { siteConfig } from "@/lib/site";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how Convertify handles privacy, browser-based processing, and support contact details."
        path="/privacy-policy"
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last Updated: <span className="font-medium">{siteConfig.lastUpdated}</span>
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-10 space-y-8">
              <section>
                <p className="text-foreground leading-relaxed">
                  At <strong>Convertify</strong>, we aim to keep common file workflows simple. This Privacy Policy explains how we handle information when you visit <a href={siteConfig.siteUrl} className="text-blue-600 hover:underline">{siteConfig.siteUrl}</a> and use our PDF, image, and document tools.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  By accessing or using Convertify, you agree to this Privacy Policy. If you do not agree with it, please do not use the website.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
                </div>
                <div className="space-y-4 text-foreground">
                  <p className="leading-relaxed">
                    We may collect limited information that you choose to provide, such as when you contact us for support or send feedback.
                  </p>
                  <p className="leading-relaxed">
                    We may also collect basic technical usage data such as browser type, device details, pages visited, and referral source to understand how the website is used and to improve reliability.
                  </p>
                </div>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-foreground">2. File Processing</h2>
                </div>
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-foreground font-medium mb-2">
                    Privacy-First Approach
                  </p>
                  <p className="text-foreground leading-relaxed">
                    Many Convertify tools process files directly in your browser. That reduces the need for long-term server-side file handling for those workflows.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-foreground">
                  <li>Keep original copies of important files before processing them.</li>
                  <li>Review converted or edited output before relying on it.</li>
                  <li>Processing behavior can vary by tool, file type, browser, and device.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-foreground">3. Cookies & Tracking</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We may use cookies and similar technologies for essential functionality, analytics, preferences, and advertising.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Advertising or analytics partners may apply their own cookies subject to their own policies.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">4. How We Use Information</h2>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li>Operate and improve the website and its tools.</li>
                  <li>Understand traffic, usage patterns, and product issues.</li>
                  <li>Respond to support requests and feedback.</li>
                  <li>Maintain security and prevent abuse.</li>
                </ul>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-semibold text-foreground">5. Sharing & Disclosure</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We do not sell your personal information. We may share limited information with service providers, analytics providers, advertising partners, or when required by law.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Baby className="w-5 h-5 text-pink-600" />
                  <h2 className="text-xl font-semibold text-foreground">6. Children&apos;s Privacy</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Convertify is not intended for children under 13, and we do not knowingly collect personal information from them.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-foreground leading-relaxed">
                  Depending on your location, you may have rights to access, correct, or delete personal information and to manage cookie preferences.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-foreground">8. Changes to This Policy</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Material changes will appear on this page with a revised last-updated date.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
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

export default PrivacyPolicy;
