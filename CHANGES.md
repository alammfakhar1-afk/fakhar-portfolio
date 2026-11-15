# Fakhar Alam portfolio — performance + bug-fix build

Folder is ready for Netlify Drop (no build step). Upload the **whole folder**.
Layout, colours (#FFFFFF / #111111 / #EF8665), fonts, text and section order are unchanged.

## File map
- `index.html` — now only markup + meta tags (CSS/JS moved out so the browser can cache them)
- `css/site.css` — all styles (rewritten for performance)
- `js/app.js` — all site logic
- `js/lenis.min.js` — Lenis 1.1.13 self-hosted (no CDN dependency)
- `content/site.json` — content (field `drive` renamed to `videoUrl`)
- `admin/config.yml` — Decap CMS: new **Video link (videoUrl)** field with Drive hint
- `images/*.webp`, `images/og-image.jpg`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` — new assets

## 1. Performance / scroll
**1a backdrop-filter: 61 → 1 (desktop), 0 (mobile).**
- Only `.nav-pill` keeps a real blur: `blur(12px) saturate(1.6)`; on ≤760px it is a solid `rgba(255,255,255,.9)`.
- `.lb-back` blurs only while `.lb.open` (desktop); mobile uses a darker solid backdrop.
- Section `.wrap` panels, `.vcard`, chips, tags, play buttons, filter buttons, badges, contact cards, tools, buttons, `.stats`, `.about-photo`: static translucent fills + 1px white edge + inset highlight + one soft shadow. Specular highlight is baked into the `background` (multi-layer gradient), no blend modes.
- SVG `#lg` / `#lg-soft` displacement filters, the `refract` class and the pointer-tracking `--mx/--my` highlight (which did `getBoundingClientRect` on every pointer move) are removed.

**1b blobs: 12 blurred elements → 3 gradient blobs, zero `filter: blur`.**
- `.bg-blobs` is one fixed layer with 3 `<i>` using pre-blurred `radial-gradient`s, `will-change: transform`, `drift` animates `translate3d` only (no scale).
- Per-section `.blobs` (7, some 0×0) deleted from the markup and CSS.
- Paused when the tab is hidden (`html.paused`) and under `prefers-reduced-motion`; static (no animation) on ≤760px.

**1c Ken Burns:** `.frame img` has `will-change: transform` on its own layer; an IntersectionObserver toggles `.offscreen` → `animation-play-state: paused` when the hero leaves the viewport.

**1d Lenis:** one `requestAnimationFrame` loop; not initialised on `(pointer: coarse)` (native mobile scroll); `syncTouch: false`; `lenis.stop()/start()` around the lightbox; self-hosted + `defer`. The old `window.scroll` listener and `lenis.on('scroll')` are gone — the nav "scrolled" state comes from an IntersectionObserver on a 10px sentinel. All `.rv` reveals use IntersectionObserver and `unobserve` after revealing.

**1e Shadows & misc:** one outer shadow per panel; no `transition: all` anywhere (the toast was the last one); transitions limited to transform/opacity/background-color; `content-visibility: auto; contain-intrinsic-size: auto 900px` on `#about` and `#contact` (left off `#work` so the filter FLIP animation and `#work/...` deep links have stable layout).

**1f Images:** `fakhar-600.webp` / `fakhar-800.webp` with `srcset`/`sizes` (the source is only 800px wide, so 1200px would be an upscale); hero copy `fetchpriority="high"`, no lazy; About copy `loading="lazy"`. All posters → WebP via `<picture>` with `width`/`height` + `decoding="async"` + `loading="lazy"`. `shortcut-cubes` gets a real 9:16 crop (centred on the character) for the card and the original 16:9 for the lightbox.

## 2. Functional bugs
**2a Videos.** Root cause: every `drive` field in `site.json` is `""`, so nothing could ever embed. Fixed the pipeline end-to-end:
- Data model per item: `title, client, desc, duration, poster, wide, videoUrl` (the old `drive` key is still read as a fallback).
- `embedFor()` accepts any Drive format (`/file/d/ID/view`, `open?id=`, `uc?id=`, `…/d/ID`) → `https://drive.google.com/file/d/ID/preview`; YouTube (watch/shorts/youtu.be/embed/live) → `youtube-nocookie` embed; Vimeo; direct `.mp4/.webm/.mov` → `<video controls autoplay playsinline>`; any other https URL is treated as an embed URL.
- The iframe is created only on open and removed (src → `about:blank`, node removed) on close / next / prev, so audio stops and memory is freed. `allow="autoplay; fullscreen; picture-in-picture; encrypted-media"`, `allowfullscreen`, 9:16 container (16:9 when `wide`).
- Spinner over the poster until the iframe `load` (or video `loadeddata`) fires, 8s fallback.
- "Video coming soon" only when `videoUrl` is empty; those cards get `.soon` → play icon hidden, small **Soon** tag.
- Decap: field **Video link** (`videoUrl`) with the hint "Paste Google Drive link (file must be shared: Anyone with the link)…".
- **You still need to paste the Drive links** — see README section 4.

**2b Posts.** Hero chips now render only for categories that have content (or a Drive folder link), so "Posts" disappears until you add items. Chips are `<button>`s: click → activates that filter and scrolls to `#work`.

**2c Lightbox.** Next/prev loop within the current filter only; ← → keys; focus trap on Tab/Shift+Tab; `role="dialog" aria-modal="true" aria-labelledby="lbTitle"`; swipe left/right on touch; on close: `visibility: hidden`, backdrop-filter removed (only applied on `.lb.open`), player removed from the DOM, focus returns to the card.

**2d Filters.** FLIP animation: leaving cards fade/scale out, staying cards slide to their new position with `transform`, entering cards fade in — transform/opacity only. Active filter is kept in the hash (`#work/ai-videos`, `#work/vox-style`, …); loading such a URL pre-selects the filter and scrolls to Work; `hashchange` is handled too.

## 3. Mobile (≤760px)
- Tap targets ≥44px: nav links, logo, "Back to top", filter buttons, chips 38px tall with 8px gap (full row is ≥44px).
- No backdrop-filter and no animated blobs on mobile.
- Hero: headline `overflow-wrap: anywhere` + smaller clamp floor (46px under 400px), photo stacks under text at full width, chips wrap.
- Lightbox: full-width 9:16 video, info below, close button fixed top-right, body scroll locked (`overflow: hidden` + `data-lenis-prevent`), only the sheet scrolls.
- Verified in headless Chrome at 360 / 390 / 414 / 768: `scrollWidth === innerWidth` (no horizontal scroll), 0 console errors.

## 4. Polish / SEO / a11y
- `<meta name="description">`, Open Graph + Twitter cards, `og:image` = `images/og-image.jpg` (1200×630), canonical, theme-color.
- `favicon.svg` + `favicon-32.png` + `apple-touch-icon.png`.
- Poster alt text: "Thumbnail: {title}, {category}"; hero/about photo alt "Fakhar Alam, video editor".
- Caption overlay: dark gradient band behind the text + stronger text-shadow on the coral word.
- Footer year auto-updates (`© 2026 …` → current year via regex, text otherwise untouched).
- "Powered by Netlify" badge: it is injected by Netlify's HUD on unclaimed Drop sites. Log in to Netlify and **Claim** the site (or deploy from GitHub as in the README) — nothing to change in code.
- Console: 0 errors/warnings on load, filter, lightbox open/next/close (only the Google Fonts request failed in the offline test sandbox).

## Before / after (expected)
| | Before | After |
|---|---|---|
| Live backdrop-filters while scrolling | 61 (incl. SVG displacement on fixed nav) | 1 on desktop (nav), 0 on mobile |
| `filter: blur()` elements | 12, 5 of them 1036px fixed + scaling | 0 |
| Scroll listeners reading layout | 2 + pointermove `getBoundingClientRect` | 0 (IntersectionObservers only) |
| Frame budget | ~25 fps, frames up to 150 ms | compositor-only scroll; should hold 60 fps (4× CPU throttle: no long paint/composite blocks expected) |

Measure in DevTools → Performance with a full-page scroll; the "Paint"/"Composite Layers" blocks that previously fired every frame should be gone, leaving only Lenis' transform updates.

## Adding a video (admin + Google Drive)
1. Upload the video to Google Drive → right-click → Share → General access: **Anyone with the link** → Viewer → Copy link.
2. Open `https://YOUR-SITE.netlify.app/admin` → Login with GitHub.
3. Website content → Work → Categories → open the category (e.g. "AI videos") → Videos → **Add Videos**.
4. Fill Title, Description, Duration (e.g. `0:45`).
5. Paste the Drive link into **Video link**.
6. Upload a 9:16 cover image (406×720 or 1080×1920). Turn on **Horizontal video** only for 16:9 videos.
7. **Publish → Publish now.** The site updates in 1–2 minutes.
