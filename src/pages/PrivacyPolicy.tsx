import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Cookie, Eye, Database, Trash2, Users, Baby, Mail, RefreshCw } from "lucide-react";

const PrivacyPolicy = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SEO
        title="Privacy Policy | ConvertifyAll"
        description="Learn how ConvertifyAll protects your privacy and handles your data. We don't store your files permanently."
      />
      <Navbar />
      <main className="min-h-screen pt-28 pb-20 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Privacy Policy
              </h1>
              <p className="text-muted-foreground">
                Last Updated: <span className="font-medium">{lastUpdated}</span>
              </p>
            </div>

            {/* Content Card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-10 space-y-8">
              {/* Introduction */}
              <section>
                <p className="text-foreground leading-relaxed">
                  At <strong>ConvertifyAll</strong> (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://convertifyall.com" className="text-blue-600 hover:underline">https://convertifyall.com</a> and use our online file conversion and manipulation tools.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  By accessing or using ConvertifyAll, you agree to the terms of this Privacy Policy. If you do not agree with our policies and practices, please do not use our services.
                </p>
              </section>

              {/* Information We Collect */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. Information We Collect</h2>
                </div>
                <div className="space-y-4 text-foreground">
                  <h3 className="font-medium text-lg">1.1 Personal Information</h3>
                  <p className="leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contact us via email or support channels</li>
                    <li>Subscribe to newsletters or updates</li>
                    <li>Provide feedback or report issues</li>
                  </ul>
                  <p className="leading-relaxed mt-4">
                    This information may include your name, email address, and any other details you choose to provide.
                  </p>

                  <h3 className="font-medium text-lg mt-6">1.2 Automatically Collected Information</h3>
                  <p className="leading-relaxed">
                    When you visit our website, we automatically collect certain information about your device and usage, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>IP Address:</strong> Used for analytics, security, and diagnostic purposes</li>
                    <li><strong>Browser Type & Version:</strong> To optimize our service for your device</li>
                    <li><strong>Operating System:</strong> To ensure compatibility</li>
                    <li><strong>Device Information:</strong> Screen resolution, device type</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent, conversion actions (without file content)</li>
                    <li><strong>Referral Source:</strong> How you found our website</li>
                  </ul>
                </div>
              </section>

              {/* File Handling */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Trash2 className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-foreground">2. File Uploads & Data Processing</h2>
                </div>
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                  <p className="text-foreground font-medium mb-2">
                    🔒 Privacy-First Promise
                  </p>
                  <p className="text-foreground leading-relaxed">
                    <strong>We do NOT store your uploaded files permanently.</strong> All files uploaded to ConvertifyAll for processing are automatically and permanently deleted from our servers within 1 hour after conversion is complete. We cannot access, view, or retrieve your file contents at any time.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-foreground">
                  <li>Files are processed in secure, isolated environments</li>
                  <li>No file content is ever stored in databases or logs</li>
                  <li>We do not analyze, scan, or extract text from your documents</li>
                  <li>Processed files are immediately purged after download</li>
                </ul>
              </section>

              {/* Cookies & Advertising */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Cookie className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-foreground">3. Cookies & Tracking Technologies</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content and advertisements.
                </p>
                <h3 className="font-medium text-lg mt-4 mb-2">3.1 Types of Cookies We Use</h3>
                <ul className="list-disc pl-6 space-y-2 text-foreground">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality (e.g., session management, security)</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website (Google Analytics)</li>
                  <li><strong>Advertising Cookies:</strong> Used by Google AdSense and third-party advertisers to deliver relevant ads</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>

                <h3 className="font-medium text-lg mt-6 mb-2">3.2 Google AdSense & Third-Party Advertising</h3>
                <p className="text-foreground leading-relaxed">
                  We partner with Google AdSense to display advertisements on our website. Google and its partners may use cookies or similar technologies to serve ads based on your prior visits to our website and other websites on the Internet.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the Internet</li>
                  <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                  <li>Alternatively, you can opt out of a third-party vendor&apos;s use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.aboutads.info</a></li>
                </ul>
              </section>

              {/* How We Use Information */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">4. How We Use Your Information</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Provide, operate, and maintain our file conversion services</li>
                  <li>Improve, personalize, and expand our website functionality</li>
                  <li>Understand and analyze how you use our website</li>
                  <li>Develop new products, services, features, and functionality</li>
                  <li>Communicate with you for customer service, updates, and marketing</li>
                  <li>Process your transactions and send related information</li>
                  <li>Find and prevent fraud, spam, and abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              {/* Data Sharing */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-semibold text-foreground">5. Information Sharing & Disclosure</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li><strong>Service Providers:</strong> We may share information with trusted third-party vendors who assist us in operating our website (e.g., hosting, analytics, advertising)</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information when required by law, regulation, or legal process</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                </ul>
              </section>

              {/* Children's Privacy */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Baby className="w-5 h-5 text-pink-600" />
                  <h2 className="text-xl font-semibold text-foreground">6. Children&apos;s Privacy (COPPA Compliance)</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  ConvertifyAll is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If we discover that a child under 13 has provided us with personal information, we will promptly delete such information from our records.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  If you are a parent or guardian and believe that your child under 13 has provided us with personal information, please contact us immediately at <a href="mailto:support@convertifyall.com" className="text-blue-600 hover:underline">support@convertifyall.com</a>.
                </p>
              </section>

              {/* Your Rights */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Your Privacy Rights</h2>
                <p className="text-foreground leading-relaxed">
                  Depending on your location, you may have certain rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request that we correct inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request that we delete your personal information</li>
                  <li><strong>Opt-Out:</strong> Opt out of marketing communications and certain data collection</li>
                  <li><strong>Cookies:</strong> Manage cookie preferences through your browser settings</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us at <a href="mailto:support@convertifyall.com" className="text-blue-600 hover:underline">support@convertifyall.com</a>.
                </p>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Data Security</h2>
                <p className="text-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              {/* External Links */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. External Links</h2>
                <p className="text-foreground leading-relaxed">
                  Our website may contain links to external websites that are not operated by us. We have no control over the content and privacy practices of these sites and cannot be responsible for their protection and privacy. We encourage you to review the privacy policy of every site you visit.
                </p>
              </section>

              {/* Changes to Policy */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <RefreshCw className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-foreground">10. Changes to This Privacy Policy</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or for other operational reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
                </p>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">11. Contact Us</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border">
                  <p className="text-foreground">
                    <strong>Email:</strong>{" "}
                    <a href="mailto:support@convertifyall.com" className="text-blue-600 hover:underline">
                      support@convertifyall.com
                    </a>
                  </p>
                  <p className="text-foreground mt-1">
                    <strong>Website:</strong>{" "}
                    <a href="https://convertifyall.com" className="text-blue-600 hover:underline">
                      https://convertifyall.com
                    </a>
                  </p>
                </div>
              </section>

              {/* Consent */}
              <section className="pt-6 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Your Consent</h2>
                <p className="text-foreground leading-relaxed">
                  By using ConvertifyAll, you consent to our Privacy Policy and agree to its terms. If you do not agree with this policy, please do not use our website or services.
                </p>
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
