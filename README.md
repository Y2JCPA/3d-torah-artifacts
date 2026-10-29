# 3D Torah Artifacts

A growing collection of interactive educational models of Torah artifacts.

## Select an artifact

- [Tefillin Shel Rosh](artifacts/tefillin-shel-rosh/) — v0.8.0-alpha.1; twelve selectable components, assembled/exploded/cutaway modes, passage-order comparison and primary-source links.

## Run the collection

From this repository, run `python3 -m http.server 4173` (Windows: `py -m http.server 4173`) and visit http://localhost:4173. Select a card to open its model. Use “All artifacts” to return. No build or npm installation is needed. A WebGL2-capable browser is required for the model.

## Add an artifact

Place a self-contained study in `artifacts/<slug>/`, keeping relative asset links and third-party notices. Add a card to the root `index.html` with a preview image and link, and add an entry here. Include version, source notes and limitations with each study.

## Imported model

The first study was supplied by Yaacov as `tefillin_shel_rosh_v0.8.0-alpha.1.zip`. Its geometry, interactions, documentation, vendor libraries and supplied QA evidence are preserved. The only viewer change is its header link back to the collection. Supplied evidence describes the upstream package, not a fresh full validation of this repository. Its original MANIFEST.sha256 describes the unmodified package, so the adjusted index.html intentionally differs.

These are educational research models, not kosher certification or construction guidance. See each model’s notes. Three.js MIT and Noto SIL OFL notices are preserved under the model’s vendor directory. No new blanket license is assigned to the supplied original content.
