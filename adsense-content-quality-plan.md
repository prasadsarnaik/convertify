# AdSense Content Quality Remediation Plan

## Purpose
This document captures the remediation strategy for Google AdSense policy violations related to "Google-served ads on screens without publisher-content" and "low value content."

## Context
Convertify is a browser-based PDF, image, and document tools website. The site currently contains tool pages such as `/tool/word-to-pdf` that primarily display an interactive file conversion interface with limited editorial content.

Google policy requires that pages serving ads deliver meaningful publisher-created content and not act as utility-only screens used for navigation, alerts, or file uploads.

## Diagnosis
The app's tool pages are the highest-risk content path because they:
- render a standalone tool workspace with upload and conversion controls
- do not provide enough explanation, use cases, or supporting text
- can be classified as low-value or "thin" pages by the AdSense crawler

## Goal
Add substantive publisher content to each tool-specific page so that every `/tool/:slug` route includes:
- a clear description of what the tool does
- real user scenarios and benefits
- step-by-step guidance
- frequently asked questions

## Implementation Plan
### 1. Add a tool details section to `src/pages/ToolPage.tsx`
- render the existing `toolSeoMap` metadata fields
- include summary, how-to steps, benefits, and FAQ content
- keep the change site-wide for every tool page

### 2. Keep the tool workspace UI intact
- preserve the current interactive conversion workflow
- augment it with publisher-created content, not remove it

### 3. Use existing structured metadata
- the `src/lib/site.ts` file already contains fields such as `summary`, `howTo`, `benefits`, and `faqs`
- reuse those values rather than creating duplicate hard-coded text

### 4. Create a verification checklist
- confirm that `/tool/:slug` pages render the new content section
- inspect at least one tool page in the browser
- run the site build locally with `npm run build`
- optionally use a site crawler or preview to ensure the page is not thin

## Expected Outcome
Each tool page will now have a richer content section below the conversion workspace. That should address the policy concern by making the page a content-based destination rather than a utility-only screen.

## Notes
- This plan focuses on site content quality, not on ad placement configuration.
- Further improvements can be made later by adding higher-value pages such as a blog, how-to guides, and more detailed feature pages.
