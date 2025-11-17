# Image Placeholder Notes

This repo now ships purpose-made placeholder assets so real imagery can be dropped in without touching code. Replace each file with the final artwork using the same filename to keep layouts intact.

## Global placeholder set
| File | Dimensions (px) | Aspect Ratio | Intended Use |
| --- | --- | --- | --- |
| assets/img/placeholders/content-4x3.svg | 1600 × 1200 | 4:3 | Standard content blocks, story sections.
| assets/img/placeholders/content-3x4.svg | 1200 × 1600 | 3:4 | Tall hero visuals (e.g., Home & Garden hero) and portrait imagery.
| assets/img/placeholders/content-2x1.svg | 1600 × 800 | 2:1 | Wide landscape shots (maps, facility panoramas).
| assets/img/placeholders/content-1x1.svg | 1200 × 1200 | 1:1 | Square thumbnails or icon-led visuals.
| assets/img/placeholders/home-garden-hero.svg | 1500 × 1200 | 5:4 | Home & Garden hero illustration/photo.

## Page-specific placeholders
| File | Dimensions (px) | Aspect Ratio | Page/Section |
| --- | --- | --- | --- |
| assets/img/placeholders/about-rd.svg | 1600 × 1200 | 4:3 | About – R&D imagery.
| assets/img/placeholders/about-facility.svg | 1600 × 1200 | 4:3 | About – Facilities section.
| assets/img/placeholders/contract-facility.svg | 1600 × 1200 | 4:3 | Contract Manufacturing – Facility hero visual.
| assets/img/placeholders/contact-map.svg | 1600 × 800 | 2:1 | Contact – Global distributor map visual.
| assets/img/placeholders/tech-karyo.svg | 1600 × 1200 | 4:3 | Technology – Karyo page image.
| assets/img/placeholders/tech-wynn.svg | 1600 × 1200 | 4:3 | Technology – Wynn page image.

## Home & Garden packshot placeholders
All packshot placeholders share a 900 × 1200 size (3:4 portrait) to match retail artwork proportions. Swap each with the corresponding pack/label photo using the same filename.

| File | Product |
| --- | --- |
| assets/img/placeholders/hg-ecoza-rix.svg | Ecoza Rix |
| assets/img/placeholders/hg-k-rix.svg | K-Rix |
| assets/img/placeholders/hg-margorix.svg | MargoRix |
| assets/img/placeholders/hg-spindura-rix.svg | Spindura Rix |
| assets/img/placeholders/hg-mycova.svg | Mycova |
| assets/img/placeholders/hg-rexora.svg | Rexora |
| assets/img/placeholders/hg-biota.svg | Biota |
| assets/img/placeholders/hg-seira.svg | Seira |
| assets/img/placeholders/hg-encilo.svg | EnCilo |
| assets/img/placeholders/hg-neuvita.svg | Neuvita |
| assets/img/placeholders/hg-zenita.svg | Zenita |
| assets/img/placeholders/hg-cropsia.svg | Cropsia |
| assets/img/placeholders/hg-envicta.svg | Envicta |
| assets/img/placeholders/hg-igreen-npk.svg | IGreen NPK |
| assets/img/placeholders/hg-igreen-soil-plus.svg | IGreen Soil+ |
| assets/img/placeholders/hg-igreen-tres.svg | IGreen Tres |
| assets/img/placeholders/hg-igreen-shield.svg | IGreen Shield |
| assets/img/placeholders/hg-admira-adrlc.svg | Admira Adrlc |
| assets/img/placeholders/hg-admira-admon.svg | Admira Admon |
| assets/img/placeholders/hg-admira-adyme.svg | Admira Adyme |

## Usage reminders
- All placeholders load with `object-fit: cover` and will crop lightly on extreme aspect-ratio swaps—keep final imagery close to the listed ratios to avoid clipping.
- Replace SVGs with optimized PNG/JPG/SVG assets of similar dimensions for best clarity on high-density screens.
- Mobile and tablet layouts inherit the same ratios; keeping within these sizes prevents layout shifts across breakpoints.
