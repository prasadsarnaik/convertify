import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CookiePolicyPage = () => (
  <>
    <SEO
      title="Cookie Policy"
      description="How Convertify uses cookies and similar technologies, and how you can control them."
      path="/cookie-policy"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <article className="container max-w-3xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Cookie Policy</h1>
        <p className="text-muted-foreground leading-relaxed mb-5">
          This Cookie Policy explains what cookies are, how Convertify uses them, the types of cookies we use and how you can control your preferences. It applies to the Convertify website at convertifyall.com.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">What are cookies?</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Cookies are small text files placed on your device by websites you visit. They are widely used to make sites work, or to work more efficiently, as well as to provide reporting information and to support advertising.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">How Convertify uses cookies</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Convertify is a client-side application — your files never leave your browser. We use a small number of cookies and similar technologies (such as <code>localStorage</code>) for the following purposes:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-5">
          <li><strong>Strictly necessary:</strong> remembering your theme preference (light or dark mode) so the site does not flash on every page load.</li>
          <li><strong>Analytics (optional):</strong> aggregated, anonymous usage statistics that help us understand which tools are most used. These do not identify individual users.</li>
          <li><strong>Advertising (optional):</strong> Google AdSense may set cookies to serve ads, including personalised ads where allowed by law and your preferences.</li>
        </ul>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Third-party cookies</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          When advertising is enabled, Google AdSense and its partners may use cookies to measure ad performance and frequency. You can review and adjust Google's use of advertising cookies at <a className="underline" href="https://adssettings.google.com" target="_blank" rel="noreferrer">adssettings.google.com</a>.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Managing cookies</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Most browsers let you refuse or delete cookies through their settings. Doing so will not break Convertify — the file-processing tools work without any cookies. You can also opt out of personalised advertising via your browser's "Do Not Track" setting or your operating system's advertising controls.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Changes to this policy</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          We may update this policy from time to time. The latest version will always be available on this page with the most recent revision date. Continued use of Convertify after changes constitutes acceptance of the new policy.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Questions about this policy? Email <a className="underline" href="mailto:hello@convertifyall.com">hello@convertifyall.com</a>.
        </p>
      </article>
    </main>
    <Footer />
  </>
);

export default CookiePolicyPage;
