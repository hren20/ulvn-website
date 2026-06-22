# Research Project Site

Astro + Nerfies-style project page + Pages CMS configuration for GitHub Pages.

## Local development

Install Node.js 24 or newer, then run:

```bash
npm install
npm run dev
```

The editable content lives in `content/project.yml`. Static media lives in `public/images`, `public/videos`, and `public/files`.

## Pages CMS

This repository is configured with `.pages.yml`. Use the hosted Pages CMS editor at:

```text
https://app.pagescms.org/
```

The deployed `/admin/` route is a static entry page that redirects to the hosted editor. Pages CMS itself is not a purely static admin app; it connects to GitHub through the hosted service or a self-hosted Pages CMS deployment.

## GitHub Pages

Push to `main`, then set:

```text
Settings -> Pages -> Source -> GitHub Actions
```

For a normal project repository, `astro.config.mjs` automatically uses the repository name as the GitHub Pages base path during GitHub Actions builds.
