# Sulal Entrepreneur UK

A responsive, multi-page static website for Sulal Entrepreneur UK. It is prepared for GitHub Pages and has no build step: `index.html` and the supporting pages, styles, scripts, and images are served directly from the repository root.

## Publish with GitHub Pages

This repository uses GitHub Pages' built-in **Deploy from a branch** option; it does not include a GitHub Actions workflow.

1. Merge the website files into the repository's default branch, `main`.
2. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select **main** and **/(root)**, then save.
4. Wait for GitHub Pages to publish the site. Use the URL shown in **Settings → Pages**.

This is a project site. Its URL is normally `https://letsdigtal.github.io/SulalEntrepreneurUK/`; confirm the actual URL in GitHub after publishing. No personal access token or secret is needed for this static site.

## Before launch

- The contact form is a demonstration only: it does not send or store enquiries. GitHub Pages cannot run the WordPress/PHP email handler. Connect a real form backend before relying on it for customer messages.
- WhatsApp is not configured yet. To enable it, set `whatsappNumber` in `assets/site-config.js` to the business number in international digits only. Leave it blank until the correct number is confirmed.
- Review business details and legal information before launch. The site states that it is Pakistan-based and that “UK” is part of the brand name, not a claim of UK registration or regulatory authorization.
- Images of properties, vehicles, and projects are illustrative; they are not current listings, inventory, or completed projects.

## Included

- Sixteen static HTML pages, including home, company, services, FAQs, contact, privacy, and terms pages.
- Responsive styling, local fonts, theme switcher, mobile navigation, and accessible reduced-motion behavior.
- A `.nojekyll` marker for direct static hosting.
