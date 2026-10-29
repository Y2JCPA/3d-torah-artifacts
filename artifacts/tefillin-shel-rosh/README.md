# Tefillin Shel Rosh

**v0.9.0-alpha.1 — review candidate.** A standalone, interactive 3D study of head tefillin. The collection has no separate product name.

## Run locally

Extract the ZIP, open a terminal in the extracted project folder, and run:

```sh
python3 -m http.server 4173
```

On Windows, use `py -m http.server 4173` if `python3` is unavailable. Open **http://localhost:4173** in a browser with WebGL2 support. Stop the server with Ctrl+C.

The complete rendering library is included in `vendor/`. No build, npm installation, CDN, or internet connection is required to run the model. External source links require internet access. Opening `index.html` directly through `file://` is not supported because browsers restrict JavaScript modules.

## Explore

- Drag the model to orbit. Use the wheel, pinch, or +/− buttons to zoom.
- Use Front, Rear, Top, and ¾ for repeatable viewpoints.
- Select Assembled, Exploded, or Cutaway. Reset restores the initial model, camera, Rashi arrangement, single-dalet study, and stopped rotation.
- Click visible model geometry or use the twelve component buttons. Small features remain accessible through these buttons on mobile.
- In internal views, numbered callouts correspond to the four passage buttons.
- Rashi/Rabbeinu Tam switches the identification of the passages in the fixed chamber positions. The chart always describes the front-facing viewer’s left-to-right order; camera orbit does not redefine the order.
- Selecting the rear knot or passage moves to a dedicated close-up. The single-dalet outer folds use a privately inspected photograph; hidden interlacing remains unverified. The square/double-dalet option follows the visible four-panel weave in the supplied comparison diagram. Outer face, Reverse and Underside buttons let you inspect either study. This is not a knot-tying guide.

## What is and is not modeled

The housing has a square footprint, four elongated hollow chambers, three grooves, raised three/four-headed shins on the wearer’s right/left, a square layered base, twelve illustrative stitches, a rear strap tunnel, upright rolled passages, parchment wrappers and hair bindings, a head loop, and two descending lengths laid out for study.

Exploded mode lifts the **joined housing** above the passages and base. It does not break it into four detached boxes. Cutaway mode removes a front section of leather to make the interior visible. Both are explanatory diagrams, not real opening mechanisms or manufacturing steps.

This is an educational reconstruction, **not kosher certification or construction guidance**. Dimensions, shin calligraphy, parchment details, knot routing, and leather aging are illustrative. The single-dalet outer silhouette is photo-informed, but its hidden crossings are schematic; the square/double-dalet visible weave is diagram-informed, while its reverse remains schematic. No sacred writing is reproduced. Further review by an experienced sofer is needed before stronger accuracy claims. Other order variants have not been invented or included.

See `SOURCES.md`, `MODEL_NOTES.md`, `CHANGELOG.md`, and `QA.md` for evidence and limitations.

## Development and verification

The application is plain JavaScript using Three.js 0.186.1. `app.js` owns the model, interaction, and source-backed explanations; `style.css` owns layout; `index.html` supplies the document.

To run the included Chromium interaction tests, install Playwright in a separate development environment, start the local server, then run:

```sh
node qa.test.cjs
node qa-extra.cjs
node qa-mesh-clicks.cjs
```

For slow software rendering, `TEFILLIN_TEST_DPR=0.5 node qa-mesh-clicks.cjs` reduces drawing resolution while retaining CSS coordinates and actual mesh events. Screenshots should be captured at the default ratio.

Set `CHROMIUM_PATH` if Chromium is not at `/usr/bin/chromium`, and `TEFILLIN_URL` if the server uses another URL. The test uses headless Chromium with software WebGL. The screenshot script is `qa-views.cjs`. Scripts write evidence to the project’s `evidence/` directory. They are optional and are not needed to use the model.

Three.js and its included add-ons retain their MIT license in `vendor/THREE-LICENSE.txt`. All model geometry and surface textures are procedural. No third-party manufacturing photographs are shipped.

The illustrative shin outlines derive from Noto Serif Hebrew under the SIL Open Font License; see `vendor/NOTO-LICENSE.txt`. They are not a sofer-reviewed manufacturing template. The private knot references and transfer chunks are deliberately excluded.
