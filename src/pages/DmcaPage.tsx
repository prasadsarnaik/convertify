import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DmcaPage = () => (
  <>
    <SEO
      title="DMCA Policy"
      description="Convertify respects intellectual property rights. Read our DMCA policy and learn how to submit a takedown notice."
      path="/dmca"
    />
    <Navbar />
    <main className="pt-28 pb-20">
      <article className="container max-w-3xl mx-auto px-6 prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">DMCA Policy</h1>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Convertify ("we", "us", "our") respects the intellectual property rights of others and expects users of our site to do the same. In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), the text of which can be found on the U.S. Copyright Office website, we will respond promptly to claims of copyright infringement that are reported to the designated agent identified below.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">No file storage</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Convertify processes user files entirely in the user's browser. We do not host, store or transmit user-uploaded content on our servers. Because of this, the most common kind of DMCA complaint — hosted infringing material — does not apply to us. We have no copy of any user file to remove.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Reporting infringement on our website</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          If you believe that material appearing on the Convertify website itself (text, images, logos or design elements published by us) infringes your copyright, please send a written notice that includes:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-muted-foreground mb-5">
          <li>An electronic or physical signature of the copyright owner or a person authorised to act on their behalf.</li>
          <li>A description of the copyrighted work that you claim has been infringed.</li>
          <li>The URL on Convertify where the allegedly infringing material is located.</li>
          <li>Your name, address, telephone number and email address.</li>
          <li>A statement, made in good faith, that the disputed use is not authorised by the copyright owner, its agent or the law.</li>
          <li>A statement, made under penalty of perjury, that the information in the notice is accurate and that you are the copyright owner or are authorised to act on the owner's behalf.</li>
        </ol>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Designated agent</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          Send notices to: <a href="mailto:dmca@convertify.app" className="underline">dmca@convertify.app</a>. We aim to acknowledge complete notices within 5 business days and act on them where appropriate.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Counter-notice</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          If you believe material was removed in error, you may submit a counter-notice including your contact details, a description of the material and its previous location, and a statement under penalty of perjury that you have a good faith belief the material was removed by mistake.
        </p>

        <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Repeat infringers</h2>
        <p className="text-muted-foreground leading-relaxed mb-5">
          We reserve the right to terminate access for any user found to be a repeat infringer of intellectual property rights.
        </p>
      </article>
    </main>
    <Footer />
  </>
);

export default DmcaPage;
