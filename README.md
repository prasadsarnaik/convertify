# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## SEO Verification Checklist

Use this checklist before and after launching Convertify to confirm the site is discoverable, indexable, and AdSense-ready.

### 1. Ownership & Verification
- [ ] Replace `REPLACE_WITH_YOUR_CODE` in `index.html` (`<meta name="google-site-verification">`) with the code from Google Search Console.
- [ ] Verify the property in [Google Search Console](https://search.google.com/search-console) (HTML tag method).
- [ ] Add and verify the property in [Bing Webmaster Tools](https://www.bing.com/webmasters) (optional but recommended).
- [ ] Confirm the canonical domain (`https://convertifyall.com`) matches the deployed domain — update `src/config/site.ts` if it changes.
- [ ] Ensure HTTPS is active and `http://` redirects to `https://`.

### 2. Indexing & Crawlability
- [ ] Submit `https://convertifyall.com/sitemap.xml` under **Search Console → Sitemaps**.
- [ ] Confirm `public/robots.txt` allows crawling (`Allow: /`) and references the sitemap.
- [ ] Use Search Console **URL Inspection** on the homepage and 2–3 tool pages → click **Request Indexing**.
- [ ] After 3–7 days, check **Coverage / Pages** report for indexed vs. excluded URLs.
- [ ] Verify no important pages carry `noindex` (check `<SEO noindex>` usage).
- [ ] Confirm canonical tags resolve to the short URLs (e.g. `/merge-pdf`, not `/tool/merge-pdf`).

### 3. Structured Data Validation
- [ ] Test the homepage with [Rich Results Test](https://search.google.com/test/rich-results) — expect `Organization` and `WebSite` schemas.
- [ ] Test a tool page (e.g. `/merge-pdf`) — expect `BreadcrumbList`, `SoftwareApplication`, and `FAQPage`.
- [ ] Validate with the [Schema.org Validator](https://validator.schema.org/) for any warnings.
- [ ] Monitor **Search Console → Enhancements** for FAQ, Breadcrumb, and Sitelinks searchbox reports.
- [ ] Confirm Open Graph and Twitter cards render via [opengraph.xyz](https://www.opengraph.xyz/) (uses `/og-image.png`).

### 4. Performance & Core Web Vitals
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) on homepage and one tool page — target LCP < 2.5s, CLS < 0.1, INP < 200ms.
- [ ] Confirm `AdSlot` placeholders reserve space to prevent CLS once ads load.
- [ ] Verify images use lazy loading and appropriate formats.
- [ ] Check mobile usability in Search Console (no tap-target or viewport errors).

### 5. AdSense Readiness
- [ ] AdSense script is present in `index.html` (`ca-pub-2792270543219767`) — confirm publisher ID matches your account.
- [ ] All required policy pages are live and linked in the footer: **Privacy Policy**, **Terms**, **Disclaimer**, **Contact**, **About**.
- [ ] Privacy Policy mentions cookies, third-party ads, and Google AdSense usage.
- [ ] Each tool page has substantive original content (intro, how-to, FAQs) — verify via `src/lib/toolContent.ts`.
- [ ] No prohibited content (adult, copyrighted, misleading) — review tool descriptions and FAQs.
- [ ] Site navigation is clear, with working internal links and no broken routes (validate via `/tool-status`).
- [ ] Submit the site for AdSense review at [adsense.google.com](https://www.google.com/adsense). Approval typically takes 1–14 days.
- [ ] After approval, replace `AdSlot` placeholders with live `<ins class="adsbygoogle">` units and re-test CLS.

### 6. Ongoing Monitoring
- [ ] Weekly: check Search Console for new coverage errors or manual actions.
- [ ] Monthly: refresh `lastmod` dates in `public/sitemap.xml` when content changes.
- [ ] Monitor AdSense **Policy center** for any violations after going live.
