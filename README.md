# 3D Torah Artifacts

A growing collection of interactive educational models of Torah artifacts.

## Select an artifact

- [Tefillin Shel Rosh](artifacts/tefillin-shel-rosh/) — v0.10.0-alpha.2 research preview; twelve visibly highlighted components, assembled/exploded/cutaway modes, passage-order comparison and primary-source links.

- [Tefillin Shel Yad](artifacts/tefillin-shel-yad/) — v0.2.0-alpha.2 research preview; one chamber and one parchment, nine highlighted components, a reference-informed yud silhouette and loose binding loop. Hidden crossings remain schematic.

## View online

The collection uses this repository’s existing GitHub Pages deployment: [open the artifact gallery](https://y2jcpa.github.io/3d-torah-artifacts/). This revision includes Shel Rosh v0.10.0-alpha.2 and Shel Yad v0.2.0-alpha.2.

Publishing follows the existing Pages build-and-deployment workflow on `main`; `.nojekyll` keeps the vendored static modules intact. No paid hosting, build service or custom domain is required.

## Run the collection

From this repository, run `python3 -m http.server 4173` (Windows: `py -m http.server 4173`) and visit http://localhost:4173. Select a card to open its model. Use “All artifacts” to return. No build or npm installation is needed. A WebGL2-capable browser is required for the model.

## Add an artifact

Place a study in `artifacts/<slug>/`, keeping relative asset links and third-party notices. Shared selection and lesson modules live under `shared/`; serve the collection root so these resolve. Add a card to the root `index.html` with a preview image and link, and add an entry here. Include version, source notes and limitations with each study.

## Current studies

Both studies include reversible geometry highlighting and source-classified halacha leMoshe miSinai lessons.

The current model adds the reference-informed square/double-dalet option and knot inspection views. Hidden routing remains schematic. The gallery and its return navigation are preserved. The square-knot study remains a research preview, not verified tying instructions.

## Imported model

The self-contained studies retain their source notes, rendered screenshots and third-party notices. Model manifests record the integrated files and collection navigation.

These are educational research models, not kosher certification or construction guidance. See each model’s notes. Three.js MIT and Noto SIL OFL notices are preserved under the model’s vendor directory. No new blanket license is assigned to the supplied original content.

Raw generated browser-test reports and logs are kept locally, outside the public site. QA.md summarizes checks and remaining limits.
