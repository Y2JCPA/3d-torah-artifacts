# Verification — v0.9.0-alpha.1

Actual Chromium 154.0.8037.57 was run with SwiftShader WebGL. Results describe real browser interaction, not syntax-only checks.

## Results

- **51/51 direct mesh checks passed:** rendered geometry selected with real mouse clicks or touchscreen taps, including all major components in assembled/exploded/cutaway views, both knot choices after repeated mode/order changes, square-knot clicks in all three modes, mobile square-knot tapping, hidden-interior exclusion, drag-out-and-back, rear marker occlusion and stationary-finger pinch guards.
- **20/20 control, geometry and touch checks passed:** all twelve topic buttons and sources, passage identifiers/order, 45 rapid mode switches, reset, camera presets, orbit, wheel/zoom, actual numbered callout clicks, 320/390/844px layouts, normal-motion interruptions, mobile drag/pinch, four distinct chambers and upright scroll axes.
- **6/6 knot inspection checks passed:** both knot choices were clicked on actual geometry from Outer face, Reverse and Underside camera positions. Screenshots were captured and visually inspected.
- **Collection navigation smoke passed:** the existing gallery opened the integrated v0.9 model; square selection worked; “All artifacts” returned to the gallery.
- **Offline browser check passed:** eight local resources, no external requests, no browser errors.

The direct mesh suite used devicePixelRatio 0.5 to reduce software-rendering cost while retaining CSS coordinates and real input events. Controls, inspection views and final screenshots used ratio 1. No JavaScript/console errors were reported in these runs.

Machine-readable reports and actual screenshots are in `evidence/`. Exploration screenshots were replaced by the final capture. The included scripts reproduce the checks with a locally installed Playwright and Chromium.

## Visual review and corrections

The user’s 290×162 comparison diagram was decoded from the parent’s transport copy, checksum-verified, fully loaded and visually inspected. Its left-hand figure informed the compact four-panel square study. Its historical captions are not adopted as historical claims.

Browser review caught bulky initial returns, inappropriate branch placement, a housing-obstructed reverse camera, and excessively tight reverse framing. These were corrected before final regression. The retained single-dalet geometry was also inspected from all three new angles. Desktop assembled/exploded and mobile assembled/square views were reviewed for visibility and controls overlap.

## Remaining limits

The supplied references show visible forms, not a complete tying sequence. The reverse and underside routing of both studies remain schematic; continuous geometry is not proof of an authentic knot. No qualified sofer review or global collision-free topology certification has been performed. The studies are not knot-tying instructions or kosher certification.

Craft dimensions, shin calligraphy, surface aging and fine folds remain illustrative. Mobile tests use Chromium emulation, not physical iOS/Android hardware; Safari, Firefox and assistive-technology testing remain unperformed. Source link URLs and safe attributes were checked, but external source sites were not opened by every interaction test. Private references are not distributed.
