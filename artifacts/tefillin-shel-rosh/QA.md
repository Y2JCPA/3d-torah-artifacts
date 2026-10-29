# Verification — v0.8.0-alpha.1

Actual Chromium 154.0.8037.57 was run with WebGL through SwiftShader. These are browser interaction results, not syntax-only claims.

## Results

- **47/47 direct mesh checks passed.** Real pointer movement located rendered geometry; actual mouse clicks or touchscreen taps selected it and checked the resulting explanation/source. Coverage: nine assembled exterior topics, all twelve topics in exploded and cutaway views, eight mobile mesh topics, single-knot rebuilding after repeated mode/order changes and the disabled unsupported choice, hidden interiors, drag-out-and-back, rear marker occlusion, stationary-finger pinch guard, and console errors.
- **20/20 control, geometry and touch checks passed.** Includes all twelve topic buttons and passage identifiers, 45 rapid mode switches, reset, Rashi/Rabbeinu Tam order, camera presets, wheel/zoom buttons, real orbit drag, clickable numbered callouts, 320/390/844px layouts, interrupted normal-motion transitions, mobile drag/pinch, four distinct chambers and upright scrolls.
- No JavaScript/console errors were reported by these runs.

The final mesh regression includes the photo-informed geometry, camera-momentum fix, revised mobile layout and disabled unsupported knot choice. The control suite verifies the previously failing callout click and camera reset.

The full direct-mesh regression used devicePixelRatio 0.5 to keep software rendering responsive while retaining CSS geometry and real input events. A preceding 47-check candidate run also passed at ratio 1. The broader control suite and final screenshot capture use ratio 1. This is not physical mobile-device testing.

## Defects found and corrected

- Picking now respects hidden ancestors and clipped-away surfaces.
- Dragging away and back to the original pixel cannot accidentally select a part.
- A two-contact pinch cannot select with its stationary finger.
- Numbered scroll markers hide behind geometry and from the rear.
- Camera presets clear accumulated orbit momentum; rounded label positions remain stable for real clicks. Fixed-time waits were replaced with state/visibility waits.
- Knot and passage selections have dedicated close-up views.
- Render review corrected the outer-view overlap direction and excessive strap glare.

Machine-readable results are in `evidence/mesh-click-results.json` and `evidence/qa-results.json`. Interrupted exploratory runs are not presented as final pass evidence.

## Accuracy and limits

The private user photograph was checksum-verified, decoded and visually inspected. It supports only the single-dalet outer folds, not the reverse route. No personal photograph is included. The square/double-dalet option is disabled pending a verified reference. Hidden fold crossings have not been verified with a complete tying reference, nor certified collision-free. The visible model remains an educational study, not tying instructions.

No physical iPhone/Android, Safari, Firefox, assistive-technology or hardware-GPU certification was performed. Source link targets and safe link attributes were checked; external sites were not navigated by every browser test. Craft proportions, shin calligraphy and concealed knot routing still require an experienced sofer's review. The preview is not kosher certification.


Twelve rendered screenshots accompany the source, including the single-dalet outer view, actual maabarta aperture, assembled/front/rear/top views, both shin sides, exploded/cutaway views, parchment close-up, and mobile exploded selection. Images were visually inspected; the private reference image and the rejected square-knot study are not included.
