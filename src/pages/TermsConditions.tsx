import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, Scale, CheckCircle, AlertTriangle, Copyright, ExternalLink, Ban, Gavel, Mail } from "lucide-react";

const TermsConditions = () => {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <SEO
        title="Terms & Conditions | ConvertifyAll"
        description="Read the Terms and Conditions for using ConvertifyAll's file conversion tools and services."
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
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Scale className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                Terms & Conditions
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
                  Welcome to <strong>ConvertifyAll</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of our website located at <a href="https://convertifyall.com" className="text-blue-600 hover:underline">https://convertifyall.com</a> (the &quot;Website&quot;) and the file conversion, manipulation, and related services offered through the Website (collectively, the &quot;Services&quot;).
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  By accessing or using our Website and Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
                </p>
              </section>

              {/* Acceptance of Terms */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  By accessing, browsing, or using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. These Terms apply to all visitors, users, and others who access or use the Services.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website. Your continued use of the Services after any changes indicates your acceptance of the revised Terms.
                </p>
              </section>

              {/* Eligibility */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-foreground">2. Eligibility</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  You must be at least 13 years of age to use our Services. By using ConvertifyAll, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>You are at least 13 years old</li>
                  <li>You have the legal capacity to enter into these Terms</li>
                  <li>You will comply with these Terms and all applicable local, state, national, and international laws, rules, and regulations</li>
                  <li>You have not been previously suspended or removed from the Services</li>
                </ul>
              </section>

              {/* Services Description */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Description of Services</h2>
                <p className="text-foreground leading-relaxed">
                  ConvertifyAll provides online tools for file conversion and manipulation, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>PDF tools (merge, split, compress, protect, unlock, convert)</li>
                  <li>Image tools (resize, convert, compress, rotate)</li>
                  <li>Document conversion (Word to PDF, PDF to Word, etc.)</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  We reserve the right to modify, suspend, or discontinue any part of the Services at any time without prior notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation.
                </p>
              </section>

              {/* User Accounts */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. User Accounts</h2>
                <p className="text-foreground leading-relaxed">
                  While many of our Services are available without registration, certain features may require you to create an account. When you create an account, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and promptly update your account information</li>
                  <li>Maintain the security of your account and password</li>
                  <li>Accept all risks of unauthorized access to your account</li>
                  <li>Notify us immediately of any security breach or unauthorized use</li>
                </ul>
              </section>

              {/* User Responsibilities */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h2 className="text-xl font-semibold text-foreground">5. User Responsibilities & Acceptable Use</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  You are solely responsible for all files, documents, and content that you upload, convert, or process using our Services. By using ConvertifyAll, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>You own or have the necessary rights, licenses, consents, and permissions to upload and process the files</li>
                  <li>Your files do not infringe upon any third party&apos;s intellectual property rights, privacy rights, or other legal rights</li>
                  <li>Your files do not contain viruses, malware, or other harmful code</li>
                  <li>You will not use the Services for any illegal, harmful, or unauthorized purposes</li>
                </ul>

                <div className="mt-4 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                  <p className="text-foreground font-medium mb-2">🚫 Prohibited Uses</p>
                  <p className="text-foreground text-sm">
                    You may NOT use ConvertifyAll to process files containing illegal content, malware, confidential information you are not authorized to share, or copyrighted material for which you do not have permission to convert or distribute.
                  </p>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Copyright className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-foreground">6. Intellectual Property Rights</h2>
                </div>
                <h3 className="font-medium text-lg text-foreground mb-2">6.1 Our Intellectual Property</h3>
                <p className="text-foreground leading-relaxed">
                  The Website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, audio, design, selection, and arrangement thereof) are owned by ConvertifyAll, its licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Website, except as necessary for your personal, non-commercial use of the Services.
                </p>

                <h3 className="font-medium text-lg text-foreground mt-6 mb-2">6.2 Your Content</h3>
                <p className="text-foreground leading-relaxed">
                  You retain all ownership rights to the files you upload. By uploading files, you grant us a limited, non-exclusive, royalty-free license to process and convert your files solely for the purpose of providing the Services to you. As stated in our Privacy Policy, we do not store your files permanently.
                </p>
              </section>

              {/* Disclaimer of Warranties */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Ban className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-semibold text-foreground">7. Disclaimer of Warranties</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  ConvertifyAll does not warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>The Services will be uninterrupted, timely, secure, or error-free</li>
                  <li>The results obtained from using the Services will be accurate or reliable</li>
                  <li>Any errors in the Services will be corrected</li>
                  <li>The quality of any converted files will meet your expectations</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  You understand that we cannot guarantee the technical processing of every file format and that certain complex documents may not convert perfectly. We recommend verifying important conversions before relying on them.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="w-5 h-5 text-amber-600" />
                  <h2 className="text-xl font-semibold text-foreground">8. Limitation of Liability</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL CONVERTIFYALL, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Your access to or use of, or inability to access or use, the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use, or alteration of your transmissions or content</li>
                  <li>Errors, mistakes, or inaccuracies in conversions</li>
                  <li>Loss or corruption of files during processing</li>
                </ul>
                <p className="text-foreground leading-relaxed mt-4">
                  IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT YOU PAID TO US (IF ANY) FOR ACCESSING OR USING THE SERVICES, OR $100 USD, WHICHEVER IS GREATER.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Because some jurisdictions do not allow the exclusion or limitation of liability for consequential or incidental damages, the above limitation may not apply to you. In such jurisdictions, our liability shall be limited to the fullest extent permitted by applicable law.
                </p>
              </section>

              {/* Indemnification */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Indemnification</h2>
                <p className="text-foreground leading-relaxed">
                  You agree to defend, indemnify, and hold harmless ConvertifyAll, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-2 text-foreground">
                  <li>Your violation of these Terms</li>
                  <li>Your use of the Services, including your content and any use of the Services&apos; content, services, and products other than as expressly authorized in these Terms</li>
                  <li>Your violation of any third-party rights, including intellectual property rights</li>
                </ul>
              </section>

              {/* Third Party Links */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="w-5 h-5 text-cyan-600" />
                  <h2 className="text-xl font-semibold text-foreground">10. Third-Party Links & Services</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  Our Website may contain links to third-party websites or services that are not owned or controlled by ConvertifyAll. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  We use third-party services including Google AdSense for advertising, Google Analytics for analytics, and various cloud service providers for hosting. Your use of these third-party services is subject to their respective terms and policies.
                </p>
              </section>

              {/* Termination */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">11. Termination</h2>
                <p className="text-foreground leading-relaxed">
                  We may terminate or suspend your access to the Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Upon termination, your right to use the Services will immediately cease. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              {/* Governing Law */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">12. Governing Law & Dispute Resolution</h2>
                <p className="text-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any legal suit, action, or proceeding arising out of, or related to, these Terms or the Services shall be instituted exclusively in the federal or state courts located in [Your Jurisdiction].
                </p>
              </section>

              {/* Severability */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">13. Severability</h2>
                <p className="text-foreground leading-relaxed">
                  If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.
                </p>
              </section>

              {/* Entire Agreement */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">14. Entire Agreement</h2>
                <p className="text-foreground leading-relaxed">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and ConvertifyAll regarding the Services and supersede all prior agreements and understandings, whether written or oral.
                </p>
              </section>

              {/* Waiver */}
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">15. Waiver</h2>
                <p className="text-foreground leading-relaxed">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If we waive any right or provision in a particular instance, it does not mean we will waive it in any other instance.
                </p>
              </section>

              {/* Contact */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <h2 className="text-xl font-semibold text-foreground">16. Contact Information</h2>
                </div>
                <p className="text-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us:
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

              {/* Acknowledgment */}
              <section className="pt-6 border-t border-border">
                <h2 className="text-xl font-semibold text-foreground mb-4">Acknowledgment</h2>
                <p className="text-foreground leading-relaxed">
                  BY USING CONVERTIFYALL, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE, UNDERSTAND THEM, AND AGREE TO BE BOUND BY THEM. IF YOU DO NOT AGREE TO THESE TERMS, PLEASE DO NOT USE OUR SERVICES.
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

export default TermsConditions;
