import * as THREE from 'three';

// A material swap, not an asset edit: preserve textures, clipping and surface detail.
// Keep selection separate from picking so hidden surfaces never intercept clicks.
export function createSelection() {
  const originals = new Map();
  const highlighted = new Map();
  let active = new Set();
  function restore() {
    for (const mesh of active) mesh.material = originals.get(mesh);
    active.clear();
  }
  return {
    select(meshes) {
      restore();
      for (const mesh of meshes) {
        if (!originals.has(mesh)) originals.set(mesh, mesh.material);
        const original = originals.get(mesh);
        if (!highlighted.has(mesh)) {
          const material = original.clone();
          material.emissive = new THREE.Color(0x31d6bd);
          material.emissiveIntensity = ['hair','stitch','grooves'].includes(mesh.userData.part) ? 0.9 : 0.5;
          material.color.lerp(new THREE.Color(0x2d9988), 0.30);
          highlighted.set(mesh, material);
        }
        const material = highlighted.get(mesh);
        material.clippingPlanes = original.clippingPlanes;
        material.clipShadows = original.clipShadows;
        mesh.material = material;
        active.add(mesh);
      }
    },
    forget(mesh) {
      if (active.delete(mesh)) mesh.material = originals.get(mesh);
      highlighted.get(mesh)?.dispose();
      highlighted.delete(mesh);
      originals.delete(mesh);
    },
    snapshot() {
      return {
        count: active.size,
        parts: [...new Set([...active].map(mesh => mesh.userData.part))],
        meshes: [...active].map(mesh => ({id:mesh.id, part:mesh.userData.part,
          emissiveIntensity:mesh.material.emissiveIntensity,
          originalPreserved:mesh.material !== originals.get(mesh),
          clippingMatches:mesh.material.clippingPlanes === originals.get(mesh).clippingPlanes})),
        inactiveRestored: [...originals].every(([mesh,material]) => active.has(mesh) || mesh.material === material)
      };
    }
  };
}
