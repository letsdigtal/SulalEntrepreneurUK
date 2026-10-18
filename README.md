# Sulal Entrepreneur UK — GitHub Pages website (v2.3 Black & Gold)

This repository package contains the 16-page HTML/CSS/JavaScript website with the supplied gold logo, black backgrounds, gold accents, and AI-edited About portrait. It contains no WordPress PHP, databases, private credentials, or access tokens.

## Publish using the included GitHub Actions workflow

1. Sign in to your own GitHub account. Create a **public** repository named `sulal-entrepreneur-uk`.
2. Extract `sulal-github-pages.zip`. Upload the **contents**, including `.github/workflows/pages.yml`, so `index.html` is at repository root, not inside another folder. If your uploader skips the hidden directory, create `.github/workflows/pages.yml` with GitHub's file editor and paste the supplied workflow.
3. Commit to `main`. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**.
4. Open **Actions → Publish Sulal website to GitHub Pages → Run workflow**. A push can also start the workflow. If the initial run started before Pages was enabled, rerun it after step 3.
5. Wait for a successful deployment. GitHub displays the actual published URL in Settings → Pages and in the workflow's deployment environment. Do not assume it is live before success.

The workflow uses GitHub's built-in `GITHUB_TOKEN`. It requires no personal access token. No token is included in the package.

## Alternative: branch deployment without a workflow

If you prefer the simplest browser-only setup, upload `index.html`, all other `.html` files, `assets/`, and `.nojekyll`, but **omit `.github/`**. Then open **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, and save. If you already uploaded the workflow, disable it in Actions or remove it before using branch deployment. Do not run both methods simultaneously.

Upload extracted files, not the ZIP archive itself. GitHub Pages cannot serve your website from inside a ZIP.

## Configure WhatsApp

Edit `assets/site-config.js` and set `whatsappNumber` to your genuine business number, international digits only. No number has been supplied yet, so the floating control displays a truthful setup notice instead of opening a fabricated chat.

This file is public. **Never put a GitHub token, password, private key, or other secret in it.**

## Features and limits

- Hero service-name typing animation, with a static alternative for reduced-motion users.
- Locally synthesized button/link click sounds and an always-available sound on/off control. Browser audio policies may suppress sounds; no page-load audio is attempted.
- WhatsApp control, scroll-reveal/lift effects, mobile navigation, and light/dark mode.
- Click-sound and theme preferences are saved locally where browser storage permits.
- The contact form is a demonstration: it does not send or store enquiries. GitHub Pages cannot run the WordPress/PHP email handler. Configure a suitable real form backend separately if needed.
- Photography is illustrative. Verify legal information and supply real contact details before public launch.

If a token was posted in chat or committed to a repository, revoke it. Do not try to protect secrets by putting them into frontend JavaScript or deleting them in a later commit.
