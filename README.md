# Financial Starter: Multilingual Website Template

![Financial Template Preview](https://a.storyblok.com/f/286134095425736/1920x1080/8a2b82127e/template-image.png)

A high-performance website starter template built for financial teams to launch new brands, products, or campaigns quickly and efficiently.

This template is powered by a modern, headless stack: Astro, Storyblok, Netlify, and PostHog. Together, they provide a flexible, scalable solution with intuitive content management and powerful marketing features like A/B testing.

## Demo
- ✨ [Live Demo](https://astro-storyblok-finance-starter.netlify.app/)
- 💨 [PageSpeed Insights Report](https://pagespeed.web.dev/analysis/https-astro-storyblok-template-netlify-app/04ge88qxbi?form_factor=desktop)
- 🍿 [Watch Demo on YouTube](https://www.youtube.com/watch?v=2hPhwubis7Q)
- 🆎 [A/B testing with PostHog](https://posthog-finance-starter.netlify.app/)
  - [Check out its branch](https://github.com/bejamas/astro-storyblok-finance-starter/tree/with-posthog-ab-testing)

## Tech Stack
- Astro v7 🚀
- Storyblok
- Netlify
- PostHog
- Tailwind v4
- [bejamas/ui](https://ui.bejamas.com) components with [@data-slot](https://data-slot.com) primitives

## Features
- ✅ Modular Content Model – Hero, features, stats, testimonials, and more
- ✅ Financial Reports – Built-in report content type + report list page
- ✅ Multilingual by Default – Easy language switching with optional AI translation
- ✅ Visual Editing – Storyblok’s live preview & block-based approach
- ✅ SEO Ready – Metadata fields on every page
- ✅ Optimized Performance – Static output, responsive images, Core Web Vitals ready
- ✅ A/B Testing – Integrated with PostHog for experiments


## Quick Start
1. Create a Storyblok account and a new Space
2. Clone Storyblok Space (using the button below)
3. Fork this repo
4. Create your project on Netlify
5. Set up environment variables (see below)
6. Deploy!

[![Clone Storyblok Space](https://a.storyblok.com/f/286134095425736/208x35/7a54d39bad/clone-button.svg)](https://storyblok-space-cloner.netlify.app/)

## Local Setup

### Prerequisites
- Node.js 22.23.4 or newer
- Bun

### Getting Started
```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
```

### Environment Variables
```bash
STORYBLOK_TOKEN=        # Storyblok API token (Project Settings > Access token)
STORYBLOK_IS_PREVIEW=   # "yes" for preview mode
STORYBLOK_ENVIRONMENT=  # set to development on your local machine
STORYBLOK_DEFAULT_LANG= # Default site language code, like en or es
PUBLIC_POSTHOG_TOKEN=   # PostHog API key (Project Settings > Project ID)
```

## Available Scripts
```bash
# Run development server
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## UI Components
The UI is built on [bejamas/ui](https://ui.bejamas.com): Astro components copied into `src/components/ui`, with interactive behavior (mobile navigation, language menu) provided by [@data-slot](https://data-slot.com) primitives.

```bash
# Add another component
bunx bejamas@latest add accordion
```

- Design tokens (`--primary`, `--background`, …) live in `src/styles/global.css`.
- `bejamas add` re-inserts a global `* { border-border outline-ring/50 }` rule into `global.css`. This template scopes that rule to `[data-slot]`, so remove the re-inserted copy after adding a component.
- Blocks reset the component defaults they don't use through the shared classes in `src/lib/ui.ts`.

## Contributing
Contributions are welcome!

## 📸 Screenshots
![Financial Template Preview](https://a.storyblok.com/f/286134095425736/3840x2160/0da3abc8e2/2.png)
![Financial Template Preview](https://a.storyblok.com/f/286134095425736/3840x2160/70e9404911/4.png)
![Financial Template Preview](https://a.storyblok.com/f/286134095425736/3840x2160/9913515548/5.png)
![Financial Template Preview](https://a.storyblok.com/f/286134095425736/3840x2160/10957f2691/3.png)
