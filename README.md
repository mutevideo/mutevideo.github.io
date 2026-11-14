# MuteVideo

**100% Client-Side Online Video Audio Remover — Strip Audio from MP4, MOV & WebM Clips in 1 Second in Browser RAM with Zero Cloud Uploads & No Watermark.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mutevideo.github.io-555555?style=for-the-badge&logo=googlechrome&logoColor=FBF7F0)](https://mutevideo.github.io/)
[![Astro](https://img.shields.io/badge/Astro-7.4%2B-555555?style=for-the-badge&logo=astro&logoColor=D9E4DD)](https://astro.build/)
[![FFmpeg.wasm](https://img.shields.io/badge/FFmpeg.wasm-0.12%2B-555555?style=for-the-badge&logo=ffmpeg&logoColor=D9E4DD)](https://github.com/ffmpegwasm/ffmpeg.wasm)
[![MIT License](https://img.shields.io/badge/License-MIT-D9E4DD?style=for-the-badge&labelColor=555555)](./LICENSE)
[![Support the Developer](https://img.shields.io/badge/Support%20the%20Developer-Buy%20Me%20a%20Coffee-555555?style=for-the-badge&logo=buymeacoffee&logoColor=D9E4DD)](https://kisharadilshan.gumroad.com/coffee)

---

## Key Features

- **1-Second Lossless Audio Removal (`-c copy -an`)**: Strips the audio stream from MP4, iPhone MOV, WebM, MKV, and AVI videos instantaneously without re-encoding video frames, preserving 100% original video quality.
- **Selective Time-Range Muting**: Silence only a custom segment using start/end sliders (`-af "volume=enable='between(t,start,end)':volume=0" -c:v copy`) or preserve a silent AAC audio container track for strict social media uploaders.
- **Zero Cloud Uploads (100% Local RAM)**: All demuxing and audio filtering run strictly inside your browser tab via WebAssembly (`@ffmpeg/ffmpeg`) — files never leave your device and never carry watermarks.
- **8-Language i18n**: Pre-rendered static localized routes for English (`/`), Spanish (`/es/`), Portuguese (`/pt/`), German (`/de/`), French (`/fr/`), Japanese (`/ja/`), Chinese (`/zh/`), and Russian (`/ru/`) with complete `hreflang` and canonical SEO metadata.
- **Light & Dark Theme**: Calm Warm Cream & Soft Sage Mist light palette by default (`#FBF7F0` / `#D9E4DD`) paired with a Deep Charcoal dark mode (`#1E201F` / `#2A2D2B`).
- **Offline-Ready PWA**: Installable Progressive Web App (`public/manifest.webmanifest` + `public/sw.js`) that caches localized app shell pages, icons, and FFmpeg WebAssembly core binaries (`/ffmpeg/ffmpeg-core.js`, `/ffmpeg/ffmpeg-core.wasm`) so installed users can mute videos completely offline.

---

## Tech Stack

| Layer | Technology | Role in MuteVideo |
| --- | --- | --- |
| **Framework & SSG** | **Astro (`^7.4.11`, Islands Architecture)** | Static-output pre-rendering (`output: 'static'`) for fast zero-JS guide/FAQ content across 8 locales |
| **Interactive Workspace** | **Preact (`^11.2.0`)** | Hydrated `MuteVideoWorkspace` island (`client:load`) managing 4-step drag/drop, preview, and FFmpeg state |
| **Styling** | **Tailwind CSS v4 (`@tailwindcss/vite`)** | Minimal token-driven layout, responsive `< 768px` icon-only navbar (`48x48px` touch targets), light/dark themes |
| **Video Engine** | **`@ffmpeg/ffmpeg`, `@ffmpeg/util`, `@ffmpeg/core`** | In-browser WebAssembly execution for instant `-c copy -an` stripping and `-af volume` time-range muting |
| **PWA & Offline Cache** | **Service Worker (`public/sw.js`) & Manifest** | Offline-first caching for HTML routes, CSS/JS assets, maskable PNG/SVG icons, and `/ffmpeg/*` WASM binaries |
| **SEO & Analytics** | **Sitemap XML + JSON-LD + GTM/GA4** | Dual sitemap discovery (`sitemap.xml` & `sitemap-index.xml`), strict zero-fake-rating schema, GTM (`GTM-T2S2F4H6`) & GA4 (`G-XZLLGR477Y`) |

---

## Color Palette Specification

### Light Mode (Default) & Core Brand Tokens

| Token | Hex | Role |
| --- | --- | --- |
| **Soft Sage Mist** | `#D9E4DD` | Interactive workspace box background & secondary surface accent |
| **Warm Cream Alabaster** | `#FBF7F0` | Primary page canvas background & button contrast text |
| **Warm Greige Stone** | `#CDC9C3` | Dropzone dashed borders, card outlines & subtle dividers |
| **Charcoal Slate** | `#555555` | Primary action buttons, brand icon fill & high-contrast typography |

### Dark Mode Extensions

| Token | Hex | Role |
| --- | --- | --- |
| **Deep Charcoal Dark** | `#1E201F` | Dark canvas background & button contrast text |
| **Elevated Slate Dark** | `#2A2D2B` | Elevated card & guide container background |

---

## Quick Start & Deployment

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/mutevideo/mutevideo.github.io.git
cd mutevideo.github.io

# 2. Install dependencies (automatically syncs FFmpeg core assets to public/ffmpeg/)
npm install

# 3. Start the Astro development server
npm run dev
```

### Type Checking & Production Build

```bash
# Run Astro & TypeScript diagnostics
npm run check

# Build static production output to dist/
npm run build

# Regenerate maskable 192x192 & 512x512 PNG icons (optional)
node scripts/generate-icons.mjs
```

### Automated GitHub Pages CI/CD

Push commits to `main` (or trigger manually via **Actions -> Workflow dispatch**). [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) runs on Node 22 using `withastro/action@v3`, ensures `public/.nojekyll` is present, builds `dist/`, and publishes via `actions/deploy-pages@v4` to **GitHub Pages** (`https://mutevideo.github.io/`).

---

## Support the Developer

MuteVideo is 100% free, ad-free, watermark-free, and open source. If it saved you time, consider supporting ongoing development:

**[Support the Developer on Gumroad (Buy Me a Coffee)](https://kisharadilshan.gumroad.com/coffee)**

---

## License

Licensed under the **MIT License** — see the [`LICENSE`](./LICENSE) file for full terms.
