# Verification — v0.10.0-alpha.2 research preview

Actual Chromium 154 / SwiftShader testing covered desktop and touch-emulated mobile layouts.

- 51 direct mesh click/tap regression checks passed across all three modes and both knot choices, including hidden surfaces and gesture guards.
- 16 desktop and two isolated mobile selection/source checks passed. All twelve component highlights visibly changed rendered model pixels and restored original materials without pixel differences.
- Six focused real mouse/touch checks passed. The final alpha.2 regression passed fourteen checks across both knots, all modes, compound components and reset.
- Gallery-to-model-and-back navigation passed on desktop and mobile. Orbit, zoom, rapid mode switches, interrupted transitions and isolated normal-motion reset were exercised.
- No JavaScript or console errors occurred in the successful final runs. Earlier concurrent software-rendering runs timed out; suites were isolated and the animation timing was corrected before successful retesting.

Rendered screenshots are in `evidence/alpha2/`. Raw browser-test reports and logs remain local and are excluded from the public site. Test scripts can generate new local evidence; run them sequentially with Playwright and Chromium while serving the collection root.

## Limits

Mobile testing uses emulation, not physical devices. Safari, Firefox, assistive-technology and qualified sofer review are not complete. Source URLs and safe link attributes were checked; not every test opened external source sites. Both knots have schematic hidden crossings and are not tying instructions. Teal is a temporary selection highlight, not the leather color. Dimensions, shin calligraphy and fine craft details remain illustrative.
