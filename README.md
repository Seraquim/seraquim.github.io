# SERAQUIM

Personal site for SERAQUIM, a multidisciplinary designer. A hand-authored
static site: every page is a finished HTML file served as-is by GitHub Pages.
Every page loads one bundled stylesheet and one bundled script, concatenated
and minified from the sources by `npm run build`:

```
css/  tokens · fonts · base · layout · header · slug · index-dialog · footer · page
      hero · work · work-index · project · disciplines · process · archive · about
      notes · contact · pages · motion
js/   core · fit · slug · index-dialog · hero · reveal · disciplines · filter
      lightbox · contact
```

```
npm install              # clean-css-cli + terser
npm run serve            # serve the site on :8899
npm run build            # rebuild style.min.css and script.min.js
npm run placeholders     # regenerate the SVG placeholder imagery
```

After changing anything in `css/` or `js/`, run `npm run build` and bump the
`?v=` query on the `style.min.css` / `script.min.js` tags in every page. The
bundles are committed, because Pages serves the repo directly.

## Layout

```
index.html                 home
work/index.html            all projects (filterable) + text index
work/<project>/index.html  six case studies, each with its own layout:
                           low-tide-editions (full-bleed), signal-and-noise (split),
                           ferro (type-led), halflight (vertical),
                           common-ground (collage), orbit-studies (gallery)
disciplines/index.html     the eight territories
archive/index.html         24 specimens, filterable, with a lightbox
about/index.html           biography, approach, facts
notes/index.html           the journal; notes/<slug>/index.html per entry
contact/index.html         brief form (opens the visitor's mail app) + details
404.html                   "Misprint" page (served by GitHub Pages for unknown URLs)
css/  js/                  sources for the two bundles
style.min.css  script.min.js
assets/fonts/              self-hosted Anybody, Schibsted Grotesk, IBM Plex Mono (OFL)
assets/specimens/          generated placeholder images
assets/og.png              social preview image
favicon.svg  favicon.ico  apple-touch-icon.png  site.webmanifest
sitemap.xml  robots.txt  .nojekyll
tools/placeholders.mjs     placeholder generator
```

New pages: copy the closest existing page, keep the shared header, Slug,
Index dialog and footer, update the `<head>` (title, description,
canonical, og:url, JSON-LD), add `aria-current="page"` to its nav item, and
add the URL to `sitemap.xml`.

The header, Slug, Index dialog and footer are repeated in every page. When
one changes, change it everywhere.

## Replacing placeholders

- The site URL is `https://seraquim.github.io` (canonical links, social tags,
  sitemap, robots, JSON-LD and `assets/og.png`). The email address and social
  links (`*.example`) are still stand-ins.
- Images in `assets/specimens/` are generated. Put real images in
  `assets/work/` and update the `<img>` tags; add `srcset`/`sizes` for photos.
- About-page facts (location, experience, tools) are placeholders, marked
  with a comment in `about/index.html`.
- The contact form uses `mailto:` — no backend. Swap the form `action` for a
  form service if submissions should arrive without a mail client.

## Design rules

- Minimal by default: one light palette, generous space, hairline rules, no
  textures or decoration. If an element doesn't help someone read or move
  around, it doesn't go on the page.
- Palette: ink `#141413`, paper `#F4F2ED`, stone `#6B6862` for secondary
  text. Proof Vermilion `#D9481F` appears in only a few places (the Q, the
  Slug dot, the contact question mark).
- Anybody is used only for the SERAQUIM mast; everything else is set in
  Schibsted Grotesk, with IBM Plex Mono for small labels.
- The Slug is a small corner label naming the current section (sections
  declare `data-section="…"`; the hero sets `data-slug-rest` to hide it),
  plus a hairline progress bar. Clicking it opens the Index.
- All motion is gated on `prefers-reduced-motion: no-preference` and the
  `js` class; the no-JS, reduced-motion page is the finished design.
