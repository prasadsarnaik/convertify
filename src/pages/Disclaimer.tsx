import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { AlertTriangle, ExternalLink, Info, FileWarning, Scale, Mail } from "lucide-react";

const Disclaimer = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SEO
        title="Disclaimer | ConvertifyAll"
        description="Important disclaimers and limitations for using ConvertifyAll's file conversion services."
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Disclaimer
              </h1>
              <p className="text-muted-foreground">
                Last Updated: <span className="font-medium">{lastUpdated}</span>
              </p>
            </div>

            {/* Important Notice Banner */}
            <div className="mb-8 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Please Read Carefully</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    By using ConvertifyAll, you acknowledge and agree to the following disclaimers. If you do not agree with any part of this disclaimer, please do not use our services.
                  </p>
                </div>
              </div>
            </div>

            {/* Content Card */}
            <div className="rounded-2xl border border-border bg-card shadow-sm p-6 sm:p-10 space-y-8">
              {/* General Disclaimer */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileWarning className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. General Disclaimer</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The information, tools, and services provided by <strong>ConvertifyAll</strong> (https://convertifyall.com) are for general informational and utility purposes only. While we strive to provide accurate, reliable, and high-quality file conversion services, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of our services for any particular purpose.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Any reliance you place on our services is strictly at your own risk. In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of ConvertifyAll.
                </p>
              </section>

              {/* No File Storage Guarantee */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. File Processing & Privacy</h2>
                <p className="text-foreground leading-relaxed">
                  ConvertifyAll processes files on a temporary basis. While we implement security measures to protect your data during processing:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>We do not guarantee absolute security of files during transmission or processing</li>
                  <li>Technical issues may occasionally result in file processing failures</li>
                  <li>Users should maintain backups of original files before uploading</li>
                  <li>We do not guarantee that all file formats will convert perfectly</li>
                  <li>Complex or corrupted files may not convert accurately</li>
                </ul>
                <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                  <p className="text-foreground text-sm">
                    <strong>Best Practice:</strong> Always verify converted files before deleting originals, especially for important documents. We recommend keeping backup copies of all original files.
                  </p>
                </div>
              </section>

              {/* Accuracy of Conversions */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Conversion Accuracy & Quality</h2>
                <p className="text-foreground leading-relaxed">
                  While we use industry-standard conversion technologies, file conversion is a complex process that may result in:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Formatting changes or layout differences</li>
                  <li>Font substitution or text rendering variations</li>
                  <li>Image quality differences or compression artifacts</li>
                  <li>Loss of advanced features (animations, embedded media, etc.)</li>
                  <li>Metadata loss or modification</li>
                  <li>Minor content discrepancies in complex documents</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  ConvertifyAll does not guarantee that converted files will be identical to the originals in appearance, formatting, or functionality. Users should review all converted files before using them for critical purposes.
                </p>
              </section>

              {/* Third-Party Services */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">4. Third-Party Services & Links</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Our website may contain links to third-party websites or advertisements served by third-party networks (such as Google AdSense) that are not owned or controlled by ConvertifyAll.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>We have no control over the content of third-party websites</li>
                  <li>Third-party links do not imply endorsement or approval of the linked content</li>
                  <li>We are not responsible for the privacy practices or content of external sites</li>
                  <li>Advertisements displayed are served by third-party ad networks</li>
                  <li>We are not responsible for the accuracy of information in advertisements</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them. Visiting external websites linked from ConvertifyAll is at your own risk.
                </p>
              </section>

              {/* No Legal or Professional Advice */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Scale className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-xl font-semibold text-foreground">5. No Legal or Professional Advice</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  The content and services provided by ConvertifyAll do not constitute legal, financial, professional, or technical advice. The tools we provide are utility services for file manipulation only.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  You should consult with appropriate professionals (legal, technical, or otherwise) before making decisions based on converted documents or relying on our services for critical business or legal purposes.
                </p>
              </section>

              {/* User Content Responsibility */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. User Content Responsibility</h2>
                <p className="text-foreground leading-relaxed">
                  You are solely responsible for:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>The content of all files you upload, convert, or download</li>
                  <li>Ensuring you have the legal right to process any files you upload</li>
                  <li>Complying with all applicable copyright laws and regulations</li>
                  <li>Verifying the accuracy and integrity of converted files</li>
                  <li>Protecting confidential or sensitive information</li>
                  <li>Any consequences resulting from the use of converted files</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  ConvertifyAll assumes no responsibility or liability for the content of files uploaded by users or for any claims, damages, or losses arising from such content.
                </p>
              </section>

              {/* Service Availability */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Service Availability</h2>
                <p className="text-foreground leading-relaxed">
                  We do not guarantee that our services will be available at all times. We may experience:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Scheduled maintenance periods</li>
                  <li>Unexpected technical issues or downtime</li>
                  <li>Service limitations during high traffic periods</li>
                  <li>Features or services that may be modified or discontinued</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  We reserve the right to suspend or terminate services at any time without prior notice. We are not liable for any inconvenience, loss, or damage resulting from service unavailability.
                </p>
              </section>

              {/* Virus & Security */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Virus & Security Disclaimer</h2>
                <p className="text-foreground leading-relaxed">
                  While we take reasonable precautions to ensure our website and services are secure, we cannot guarantee that our website is free from viruses, malware, or other harmful components.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Users are responsible for implementing sufficient procedures and checkpoints to satisfy their particular requirements for:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Virus protection and anti-malware measures</li>
                  <li>Data accuracy and input/output validation</li>
                  <li>Maintaining means for data reconstruction</li>
                  <li>Security of their own devices and networks</li>
                </ul>
              </section>

              {/* Affiliate & Advertising */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Affiliate & Advertising Disclosure</h2>
                <p className="text-foreground leading-relaxed">
                  ConvertifyAll participates in affiliate advertising programs and displays third-party advertisements through Google AdSense and other networks. We may receive compensation when you click on links or interact with advertisements.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  However, this does not influence our editorial content, reviews, or recommendations. We strive to provide honest and unbiased information about the tools and services we discuss.
                </p>
              </section>

              {/* Copyright Materials */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Copyright & Trademark Notice</h2>
                <p className="text-foreground leading-relaxed">
                  All trademarks, service marks, trade names, product names, and logos appearing on ConvertifyAll are the property of their respective owners. Our display of any third-party trademarks does not imply any endorsement, sponsorship, or affiliation with such third parties.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  PDF, Microsoft Word, DOCX, and other format names may be trademarks of their respective owners. We use these terms for descriptive purposes only.
                </p>
              </section>

              {/* Changes to Disclaimer */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">11. Changes to This Disclaimer</h2>
                <p className="text-foreground leading-relaxed">
                  We may update this Disclaimer from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date. Your continued use of ConvertifyAll after any changes indicates your acceptance of the revised Disclaimer.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  We encourage you to review this Disclaimer periodically to stay informed about our limitations of liability and other important information.
                </p>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-semibold text-foreground">12. Contact Us</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  If you have any questions about this Disclaimer, please contact us:
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
                  By using ConvertifyAll, you hereby consent to this Disclaimer and agree to its terms. If you do not agree with this Disclaimer, please discontinue use of our website and services immediately.
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

export default Disclaimer;
