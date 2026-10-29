# Verification — v0.2.0-alpha.2 research preview

Actual Chromium 154 / SwiftShader testing covered desktop 1440×1040 and touch-emulated mobile 390×844 layouts.

- 23 interaction checks passed: direct mouse/touch selection of all nine anatomy topics, yud selection in assembled/exploded/cutaway views, zoom, orbit gesture guards, repeated modes and reset.
- Sixteen final checks passed after correcting the yud highlight boundary. They covered three knot inspection views, mobile knot taps in every mode, source-linked lessons, four passage identifiers selecting one physical roll, hidden-scroll exclusion, pinch guards, gallery navigation and normal-motion reset.
- No JavaScript or console errors occurred in successful final runs. Rendered assembled, exploded, cutaway, knot front/reverse/underside and mobile screenshots were visually inspected.
- Review corrected a pinched collar, isolated pointed flap and foreground strap highlight assignment. Earlier harness timing problems were corrected and affected checks rerun.

Screenshots are in `evidence/`. Raw generated browser-test reports and logs remain local and are excluded from the public site. Serve the collection root; with Playwright and Chromium installed, run `qa-interactions.cjs` and `qa-final.cjs` sequentially to generate local results.

## Limits

The public guide illustrations establish a simplified visible yud silhouette and binding loop, not a complete tying sequence. Concealed crossings, craft dimensions and community variants remain unverified. The loose loop is laid out for study, not fitted to an arm. One chamber contains one scroll with four passage sections; no side shin or protective-casing hole is modeled. No physical-device, Safari/Firefox, assistive-technology, collision certification or sofer review is claimed. Reference images are not bundled.
