---
name: Velocity Logic
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434655'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#3e3fcc'
  on-tertiary: '#ffffff'
  tertiary-container: '#585be6'
  on-tertiary-container: '#f1eeff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The brand identity focuses on precision, speed, and financial growth. It is designed to bridge the gap between a high-utility developer tool and a sophisticated financial dashboard. The visual language evokes a sense of "instantaneous action" and "transparent earnings."

The design style follows a **Corporate / Modern** aesthetic with elements of **Minimalism**. It prioritizes high-density information architecture without sacrificing white space, ensuring that users can manage thousands of links without cognitive overload. The interface uses subtle depth and a refined color palette to establish authority and reliability in the ad-tech space.

## Colors

This design system utilizes a high-trust palette anchored by a vibrant Indigo-Blue (Primary) to signify technology and stability. 

- **Primary Blue:** Used for core actions, branding, and active states. It suggests a professional-grade tool.
- **Success Emerald:** Specifically reserved for conversion metrics, "Link Created" states, and financial growth indicators.
- **Neutral Slates:** A range of cool grays provides structural depth. The background is a soft `#F8FAFC` to reduce eye strain during long dashboard sessions, while the cards remain pure white for maximum contrast.
- **Status Colors:** High-saturation tokens for immediate recognition of system alerts and link health.

## Typography

The typography strategy balances marketing-focused impact with data-heavy utility.

- **Plus Jakarta Sans** is used for headlines to provide a friendly yet geometric and modern appearance. The tight letter spacing in `display` roles creates a cohesive, professional "tech" look.
- **Inter** is used for all functional text. It is chosen for its exceptional legibility in small sizes and its neutral character. 
- **Tabular Figures:** For link click counts and dollar amounts, ensure the use of `tabular-nums` CSS property to keep data columns aligned.
- **Hierarchy:** Marketing pages should utilize `display-lg` for SEO-heavy H1s. Dashboards should cap titles at `headline-sm` to preserve vertical space.

## Layout & Spacing

The design system employs a **12-column Fluid Grid** for marketing pages and a **Fixed Sidebar + Fluid Content** model for the dashboard.

- **Grid:** Use a 24px gutter to maintain clear separation between data cards.
- **Dashboard Layout:** The navigation sidebar is fixed at 280px. Content occupies the remaining space, with a maximum inner container width of 1280px for optimal readability.
- **Spacing Rhythm:** Based on an 8px scale. Padding within dashboard cards should be a consistent 24px (`stack-md`) to ensure data doesn't feel cramped.
- **Mobile Adaptation:** At the 768px breakpoint, the sidebar collapses into a bottom navigation bar or a hamburger menu. Margins reduce to 16px to maximize horizontal real estate for data tables.

## Elevation & Depth

To maintain a professional feel, the design system avoids heavy shadows, instead using **Ambient Shadows** and **Tonal Layers**.

- **Level 0 (Background):** `#F8FAFC`. Used for the main canvas.
- **Level 1 (Cards/Surface):** Pure white with a 1px border of `#E2E8F0`. No shadow. Used for secondary content.
- **Level 2 (Active Cards):** Pure white with a soft, diffused shadow: `0px 4px 12px rgba(0, 0, 0, 0.05)`. Used for primary dashboard widgets.
- **Level 3 (Modals/Popovers):** `0px 12px 32px rgba(0, 0, 0, 0.1)`. Used for link creation overlays and settings modals.

Transitions between levels should be handled by surface color changes or subtle border-color shifts rather than dramatic shadow increases.

## Shapes

The shape language is "Soft-Modern." A consistent corner radius of **12px (0.75rem)** is applied to main cards and input fields, while buttons use a slightly more pronounced **rounded-lg (1rem)** to distinguish them as interactive elements.

- **Standard Elements:** 8px to 12px.
- **Primary Containers:** 16px (`rounded-xl`).
- **Input Fields:** 12px to match cards.
- **Small Components:** Tags and chips use 6px or full pill shapes to indicate "object" status.

## Components

### Buttons
- **Primary:** Solid Primary Blue background with white text. 16px vertical padding. High contrast is mandatory.
- **Secondary:** Transparent background with Primary Blue border and text.
- **Success:** Solid Emerald for "Withdraw Funds" or "Save Link" to signify positive completion.

### Inputs
- Use a 12px radius with a 1px border (`#CBD5E1`). On focus, the border transitions to Primary Blue with a 3px soft outer glow in the same color (20% opacity).

### Cards (Dashboard)
- Cards should have a 16px corner radius.
- Headers within cards should use a bottom border (`#F1F5F9`) to separate title from content.
- Include a "Stat Badge" component: a small, pill-shaped indicator in the top right of cards to show 24-hour percentage changes (Green for up, Red for down).

### Links & Lists
- Link rows in the dashboard should have a subtle hover state (`#F1F5F9`).
- Use a "Copy" button as a persistent icon on link list items for high utility.

### Progress Bars
- Used for ad-loading indicators or goal tracking. Use a secondary teal color for the fill to represent progress.