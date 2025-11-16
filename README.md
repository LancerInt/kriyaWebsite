# Kriya Website (static refresh)

This repository contains a lightweight, static version of the Kriya website that follows the latest request:

- Shared navigation/footer styles live in `assets/css/style.css` so updates cascade across every page.
- Each page owns its bespoke layout rules via an inline `<style>` block, preventing cross-page image sizing conflicts.
- All imagery is represented with replaceable inline `<img>` tags pointing to simple SVG placeholders so that swapping in real assets is a copy/paste update.
- Download CTAs link to placeholder PDFs inside `docs/` so reviewers can verify file paths without hosting sensitive collateral.

## Structure

```
assets/
  css/style.css        # global reset + nav/footer tokens
  js/main.js           # nav toggle, dropdown + back-to-top helpers
  img/placeholders/    # square and wide SVG stand-ins
products/
  biocontrol/ecoza.html
  home-garden.html
technology/
  karyo.html
  wynn.html
```

You can open any HTML file directly in a browser—no build step is required.
