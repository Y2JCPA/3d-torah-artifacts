# 3D Torah Artifacts

A growing collection of interactive educational models of Torah artifacts.

## Select an artifact

- [Tefillin Shel Rosh](artifacts/tefillin-shel-rosh/) — v0.9.0-alpha.1 review candidate; twelve selectable components, assembled/exploded/cutaway modes, passage-order comparison and primary-source links.

## View online

The collection uses this repository’s existing GitHub Pages deployment: [open the artifact gallery](https://y2jcpa.github.io/3d-torah-artifacts/). Choose Tefillin Shel Rosh to enter the model, then use “All artifacts” to return.

Publishing follows the existing Pages build-and-deployment workflow on `main`; `.nojekyll` keeps the vendored static modules intact. No paid hosting, build service or custom domain is required.

## Run the collection

From this repository, run `python3 -m http.server 4173` (Windows: `py -m http.server 4173`) and visit http://localhost:4173. Select a card to open its model. Use “All artifacts” to return. No build or npm installation is needed. A WebGL2-capable browser is required for the model.

## Add an artifact

Place a self-contained study in `artifacts/<slug>/`, keeping relative asset links and third-party notices. Add a card to the root `index.html` with a preview image and link, and add an entry here. Include version, source notes and limitations with each study.

## Current model

The current model adds the reference-informed square/double-dalet option and knot inspection views. Hidden routing remains schematic. The gallery and its return navigation are preserved. The square-knot study remains a research preview, not verified tying instructions.

## Imported model

The initial study was supplied as `tefillin_shel_rosh_v0.8.0-alpha.1.zip`. The current release updates it to v0.9.0-alpha.1. Its QA evidence covers the standalone model and an additional gallery → model → gallery browser smoke test. The model manifest records the integrated files, including its collection return link. Third-party assets and notices are retained.

These are educational research models, not kosher certification or construction guidance. See each model’s notes. Three.js MIT and Noto SIL OFL notices are preserved under the model’s vendor directory. No new blanket license is assigned to the supplied original content.
