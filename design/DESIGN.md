# Design System: ShortenIt (Velocity Logic)

Source of truth: matches the Stitch-generated screens in `stitch_ad_powered_link_shortening_platform/`. All future pages (Stitch or hand-coded) should follow this exactly for consistency.

## 1. Visual Theme & Atmosphere
Corporate / Modern with a touch of minimalism — bridges a high-utility developer tool with a sophisticated financial dashboard. Evokes "instantaneous action" and "transparent earnings." High-density data views (My Links, Analytics) stay legible through generous white space rather than clutter.

## 2. Color Palette & Roles
- **Background** (#F8F9FF) — main canvas, light mode
- **Surface Container Lowest** (#FFFFFF) — cards, inputs, table surfaces
- **Surface Container Low** (#EFF4FF) / **Container** (#E5EEFF) / **Container High** (#DCE9FF) — tonal layering for nested sections, badges, hover states
- **On Surface** (#0B1C30) — primary text
- **On Surface Variant** (#434655) — secondary text, helper copy, metadata
- **Outline Variant** (#C3C6D7) — 1px borders, dividers
- **Primary Blue** (#004AC6, container #2563EB) — core actions, brand, active nav state, links
- **Secondary Emerald** (#006C49, container #6CF8BB) — reserved for conversion/earnings metrics, "Link Created," positive stat badges
- **Tertiary Indigo** (#3E3FCC) — used sparingly for supplementary highlights (e.g. secondary chart series)
- **Error** (#BA1A1A, container #FFDAD6) — destructive actions, expired/broken link states
- Dark mode: background/surfaces invert via the same token set (`inverse-surface` #213145, `inverse-on-surface` #EAF1FF) — Primary Blue stays consistent across modes.

## 3. Typography
- **Display/Headlines:** `Plus Jakarta Sans`, weight 600–800, tight letter-spacing (-0.01 to -0.02em). `display-lg` (48px/56px, 32px/40px mobile) for marketing H1s. `headline-md` (30px) and `headline-sm` (24px) for section/dashboard titles — dashboards cap at `headline-sm` to preserve vertical space.
- **Body/Functional text:** `Inter`, 400 weight. `body-lg` 18px, `body-md` 16px, `body-sm` 14px.
- **Labels:** `Inter` 600, `label-bold` (14px, +0.05em tracking) for buttons/tags; `label-mono` (13px/500) for slugs, click counts, dollar amounts — use `tabular-nums` so data columns stay aligned.

## 4. Shape & Elevation
- Corner radius: 8–12px on standard elements, 16px (`rounded-xl`) on primary containers/cards, full-pill on tags/badges/status chips.
- **Level 0** (background): flat, no border.
- **Level 1** (secondary cards): white fill + 1px `#E2E8F0` border, no shadow.
- **Level 2** (primary dashboard widgets, e.g. stat cards, chart card): white fill + soft diffused shadow `0px 4px 12px rgba(0,0,0,0.05)`.
- **Level 3** (modals, slide-over panels, link-creation overlays): `0px 12px 32px rgba(0,0,0,0.1)`.
- Transition between levels via surface/border-color shifts, not bigger shadows.

## 5. Components
- **Buttons:** Primary = solid Primary Blue, white text, 16px vertical padding. Secondary = transparent + Primary Blue border/text. Success actions (Withdraw Funds, Save) = solid Emerald.
- **Inputs:** 12px radius, 1px `#CBD5E1` border; on focus, border → Primary Blue + 3px soft outer glow at 20% opacity.
- **Cards:** 16px radius, header separated from body by a bottom border (`#F1F5F9`). Stat cards get a small pill "Stat Badge" top-right showing % change (green up / red down).
- **Tables/Link rows:** subtle hover state (`#F1F5F9`), persistent copy-icon button on each row, status/ad-mode shown as pill badges (Monetized = emerald pill, Direct = neutral pill).
- **Progress bars:** used for ad-loading/interstitial countdown and goal tracking — teal/emerald fill.
- **Feature sections:** 3-equal-card grids are fine in this system (already established on the homepage) — keep icon + title + description + short accent underline per card.

## 6. Layout
- Marketing pages: 12-column fluid grid, centered hero is acceptable (matches generated homepage), max-width 1280px container.
- Dashboard: fixed 280px sidebar + fluid content area, max-width 1280px inner container, 24px gutter between cards.
- 8px base spacing scale; dashboard card padding = 24px.

## 7. Responsive Rules
- Sidebar collapses to bottom nav or hamburger at 768px breakpoint.
- Margins reduce to 16px on mobile, 32px on desktop.
- Tables collapse to stacked rows on small screens; no horizontal-scroll tables.

## 8. Reference Screens
Generated and approved in Stitch (`stitch_ad_powered_link_shortening_platform/`):
1. Home (marketing/landing)
2. Dashboard (overview, stats, chart, recent activity, upgrade card)
3. Please Wait (interstitial ad/redirect page)
4. My Links (link management table)
5. Pricing (tier comparison + FAQ)

Any new screens (Analytics detail, QR Codes, Domains, API Keys, Settings, Auth, Blog, etc.) should extend this same token set and component language for visual consistency.
