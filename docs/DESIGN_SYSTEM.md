# CryptoVista X Enterprise - Design System Specification

**Version:** 4.0  
**Design Philosophy:** Groww-inspired clarity, institutional fintech precision, zero superfluous decoration.

---

## 1. Brand Tokens & Color Palette

| Token Name | Hex Value | Semantic Role |
|---|---|---|
| `--cv-brand-green` | `#00B386` | Primary action CTA, active nav indicator, positive emphasis |
| `--cv-brand-green-hover` | `#008F6B` | Hover & focus state for primary interactive elements |
| `--cv-soft-green` | `#E8F7F1` | Selected row surface, subtle badge background |
| `--cv-white` | `#FFFFFF` | Primary card and workspace background |
| `--cv-page-grey` | `#F7F8FA` | Secondary page surface, alternating section background |
| `--cv-border` | `#E6E8EB` | Dividers, table borders, input outlines |
| `--cv-border-subtle` | `#F0F2F5` | Internal table row borders |
| `--cv-text-primary` | `#171A21` | Headings, primary body labels |
| `--cv-text-secondary` | `#6B7280` | Supporting descriptions, captions, metadata |
| `--cv-text-muted` | `#9097A2` | Timestamps, microcopy, footnotes |
| `--cv-positive` | `#16A36A` | 24h gain, upward trend, healthy SLA status |
| `--cv-negative` | `#D94B4B` | 24h loss, downward trend, SLA risk |
| `--cv-warning` | `#D99A16` | Simulated mode indicator, review pending |
| `--cv-info` | `#3677D5` | Informational disclosure notices |

---

## 2. Geometry & Shape System

- **Buttons & Inputs:** Strictly rectangular with `2px` to `4px` radius (`--cv-radius-btn: 3px`).
- **Cards & Panels:** `4px` radius with `1px solid #E6E8EB` border.
- **Strict Prohibitions:**
  - No circular pill/capsule buttons (`border-radius: 9999px` is strictly banned).
  - No purple gradient background meshes.
  - No neon glowing borders or shadows.
  - No glassmorphic transparency effects.
  - No emojis in professional fintech UI.

---

## 3. Typographic Hierarchy

- **Font Family:** `Inter`, with `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto` system sans-serif fallback.
- **Hero Headline:** 46px - 48px Desktop (Bold 800, line-height 1.18).
- **Main Section Heading:** 32px - 34px (Bold 700, line-height 1.25).
- **Sub-headings (H2/H3):** 20px - 26px (Semi-bold 600).
- **Body Marketing Text:** 16px - 17px (Regular 400, line-height 1.55).
- **Data Table Text:** 13px - 13.5px with `font-variant-numeric: tabular-nums`.
- **Metadata & Labels:** 11px - 12px.

---

## 4. Spacing Scale

Based on an 8-point geometric grid with 4px half-steps:
- `4px` (`--cv-space-1`): Micro gaps, badge padding.
- `8px` (`--cv-space-2`): Input-label spacing, button gaps.
- `12px` (`--cv-space-3`): Tight card padding, table cell vertical padding.
- `16px` (`--cv-space-4`): Standard component gutters.
- `24px` (`--cv-space-6`): Card internal padding, desktop gutters.
- `32px` (`--cv-space-8`): Section subhead spacing.
- `48px` (`--cv-space-12`): Compact section vertical padding.
- `64px` (`--cv-space-16`): Major section vertical padding.

---

## 5. Logo Suite Specifications

Original geometric brand mark composed of an emerald horizon prism (`#00B386`) and deep charcoal base (`#171A21`). Available variants in `web/assets/`:
- `logo.svg`: Horizontal full wordmark with "ENTERPRISE" badge.
- `logo-compact.svg`: Compact horizontal version for responsive headers.
- `logo-mark.svg`: Standalone 36x36 vector glyph.
- `logo-monochrome.svg`: Single-color charcoal for print and compliance.
- `logo-light.svg`: High-contrast light variant for dark theme surfaces.
- `favicon.svg`: 32x32 vector icon.

