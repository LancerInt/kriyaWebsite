# Image Notes

The site now ships with dedicated placeholder assets so you can swap in the real photography/packshots without touching the HTML. All dummy files live under `assets/img/content/` (section & card artwork) and `assets/img/heroes/` (responsive hero art). Replace each file with production-ready artwork using the same file name to preserve the layout.

> **Tip:** The placeholders are lightweight SVG gradients. You can overwrite them with new SVGs or export your photography to SVG wrappers from your design tool. If you prefer raster formats (JPG/PNG/WebP), keep the same file name and update the extension inside the markup.

## Hero Library
Each interior page hero consumes a 3-image set so the `<picture>` element can load the best asset per breakpoint.

| Page / Section | Desktop (`1600×900`) | Tablet (`1200×900`) | Mobile (`900×1200`) |
| --- | --- | --- | --- |
| Home | `assets/img/heroes/index-desktop.svg` | `assets/img/heroes/index-tablet.svg` | `assets/img/heroes/index-mobile.svg` |
| About | `assets/img/heroes/about-desktop.svg` | `assets/img/heroes/about-tablet.svg` | `assets/img/heroes/about-mobile.svg` |
| Contact | `assets/img/heroes/contact-desktop.svg` | `assets/img/heroes/contact-tablet.svg` | `assets/img/heroes/contact-mobile.svg` |
| Contract Manufacturing | `assets/img/heroes/contract-manufacturing-desktop.svg` | `...-tablet.svg` | `...-mobile.svg` |
| Privacy / Responsible Use | `assets/img/heroes/privacy-*.svg`, `assets/img/heroes/responsible-use-*.svg` |
| Product categories | `assets/img/heroes/biocontrol-*.svg`, `assets/img/heroes/biostimulants-*.svg`, `assets/img/heroes/substrates-*.svg`, `assets/img/heroes/home-garden-*.svg` |
| Technology | `assets/img/heroes/karyo-*.svg`, `assets/img/heroes/wynn-*.svg` |
| Product detail pages | `assets/img/heroes/{slug}-*.svg` for every SKU (Ecoza, Spindura, Admira, etc.) |

## Homepage assets
- **Category tiles** (`index-biocontrol.svg`, `index-biostimulants.svg`, `index-substrates.svg`, `index-home-amp-garden.svg`): 1600×1000 (3:2) hero photography.
- **Featured products** (`index-ecoza.svg`, `index-mycova.svg`, `index-igreen.svg`, `index-spindura.svg`): 1000×1000 square packshots.
- **Certifications** (`index-omri.svg`, `index-ecocert.svg`, `index-iso.svg`, `index-chemexcil.svg`): 600×600 monochrome marks.

## Product category grids
Every product card inside `products/*.html` expects a 1:1 image at roughly 1000×1000.
- Biocontrol cards: `assets/img/content/products-biocontrol-*.svg` (Ecoza, K-Guard, Margoshine, etc.).
- Biostimulant cards: `assets/img/content/products-biostimulants-*.svg` (IGreen, Zenita, ...).
- Substrate cards: `assets/img/content/products-substrates-*.svg` (Maxineem, K-Mix, Mystica, Engrow).

## Ecoza program artwork
- Variant packshots (`products-biocontrol-ecoza-ecoza-*.svg`): 1400×700 (2:1) landscape renders.
- Mode-of-action illustration (`products-biocontrol-ecoza-mode-of-action.svg`): 1600×900 canvas for diagrams.

## Home & Garden consumer tiles
All 20 consumer SKUs use 900×900 imagery within `assets/img/content/products-home-garden-*.svg`. Include a tight crop of the bottle/tablet pack plus RTU/Tablet badges if needed.

## Miscellaneous guidance
- All placeholders include built-in padding to mimic the current layout spacing. Keep the same safe areas when exporting replacements.
- Favor lossless or high-quality exports—large hero images are lazy-loaded via `<picture>` so you can supply WebP/JPG without penalties.
- For any new products, follow the naming pattern `assets/img/content/{page-slug}-{asset-name}.svg` and update this document with the intended dimensions.
