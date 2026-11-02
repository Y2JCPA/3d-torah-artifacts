import * as THREE from 'three';

// A teaching sequence for gassot construction, not a repair or unsewing guide.
// The front fold and released thread positions are deliberately schematic.
export function createClosure({housing,base,scrollGroup,floor,leather,edge,sinew,register,rosh}) {
  housing.add(base); // broad upper titura stays integral with the housing
  const holes=[];
  for(let side=0;side<4;side++)for(let j=-1;j<=1;j++){
    const a=side*Math.PI/2,x=j*1.05,z=1.70;
    holes.push({x:x*Math.cos(a)+z*Math.sin(a),z:z*Math.cos(a)-x*Math.sin(a),a});
  }
  function square(path,half){path.moveTo(-half,-half);path.lineTo(half,-half);path.lineTo(half,half);path.lineTo(-half,half);path.closePath();}
  function plate(opening,depth){
    const s=new THREE.Shape();square(s,1.925);
    if(opening){const h=new THREE.Path();square(h,1.41);s.holes.push(h);}
    holes.forEach(p=>{const h=new THREE.Path();h.absarc(p.x,-p.z,.045,0,Math.PI*2,true);s.holes.push(h);});
    const g=new THREE.ExtrudeGeometry(s,{depth,bevelEnabled:false,curveSegments:12});g.rotateX(-Math.PI/2);return g;
  }
  const upper=new THREE.Mesh(plate(true,.19),leather);upper.position.y=.24;base.add(upper);register(upper,'base');
  // The opening is real geometry, not a hidden solid plate or transparency trick.
  const flapPivot=new THREE.Group();flapPivot.position.set(0,.205,1.925);base.add(flapPivot);
  const lower=new THREE.Mesh(plate(false,.17),leather);lower.position.set(0,-.17,-1.925);flapPivot.add(lower);register(lower,'base');
  const foldGeom=new THREE.BufferGeometry(),foldVerts=new Float32Array(33*2*3),foldIndices=[];
  for(let i=0;i<32;i++){const q=i*2;foldIndices.push(q,q+1,q+2,q+1,q+3,q+2);}
  foldGeom.setAttribute('position',new THREE.BufferAttribute(foldVerts,3));foldGeom.setIndex(foldIndices);
  const foldMat=edge.clone();foldMat.side=THREE.DoubleSide;
  const fold=new THREE.Mesh(foldGeom,foldMat);base.add(fold);register(fold,'base');
  // Twelve schematic sewing stations. Each enters the upper and lower layers.
  // Release uses rigid translations: no elastic threads bridging an opened flap.
  const stitches=[];
  for(const p of holes){
    const g=new THREE.Group();g.rotation.y=p.a;base.add(g);
    const x=p.x*Math.cos(p.a)-p.z*Math.sin(p.a);
    const curve=new THREE.CatmullRomCurve3([
      [x,.16,1.70],[x,.46,1.70],[x,.45,1.88],[x,.35,1.97],
      [x,.06,1.97],[x,.015,1.86],[x,.015,1.70],[x,.10,1.70]
    ].map(v=>new THREE.Vector3(...v)));
    const m=new THREE.Mesh(new THREE.TubeGeometry(curve,40,.023,8,false),sinew);g.add(m);register(m,'stitch');stitches.push({g,a:p.a});
  }
  // Continue internal dividers to the underside without closing the chamber mouths.
  if(rosh)for(const x of [-.75,0,.75]){
    const m=new THREE.Mesh(new THREE.BoxGeometry(.065,.14,2.82),leather);m.position.set(x,.305,0);base.add(m);register(m,'housing');
  }
  const smooth=(a,b,v)=>{const t=THREE.MathUtils.clamp((v-a)/(b-a),0,1);return t*t*(3-2*t);};
  let snapshot={};
  function update(value){
    const release=smooth(0,.23,value),opening=smooth(.28,.69,value),extraction=smooth(.74,1,value);
    const angle=-Math.PI*.89*opening;
    flapPivot.rotation.x=angle;
    stitches.forEach(({g,a})=>g.position.set(Math.sin(a)*.55*release,.22*release,Math.cos(a)*.55*release));
    scrollGroup.position.y=-3.0*extraction;
    // Continuous display fold bridges the fixed upper lip and rotating lower flap.
    // Its flexible bend is illustrative; it never becomes a detached lid.
    const start=new THREE.Vector3(0,.24,1.925),end=new THREE.Vector3(0,-.085,.0).applyAxisAngle(new THREE.Vector3(1,0,0),angle).add(flapPivot.position);
    const c1=start.clone().add(new THREE.Vector3(0,0,.10+.08*opening));
    const c2=end.clone().add(new THREE.Vector3(0,0,.10+.08*opening));
    const curve=new THREE.CubicBezierCurve3(start,c1,c2,end);
    for(let i=0;i<=32;i++){const p=curve.getPoint(i/32);for(let j=0;j<2;j++){const k=(i*2+j)*3;foldVerts[k]=j?1.925:-1.925;foldVerts[k+1]=p.y;foldVerts[k+2]=p.z;}}
    foldGeom.attributes.position.needsUpdate=true;foldGeom.computeVertexNormals();foldGeom.computeBoundingSphere();
    floor.visible=value<.001;
    snapshot={release,opening,extraction,flapAngle:angle,upperAttached:base.parent===housing,upperY:upper.getWorldPosition(new THREE.Vector3()).y,housingY:housing.position.y,lowerPivot:flapPivot.position.toArray(),openingWidth:2.82,stitchCount:stitches.length,foldConnected:true};
  }
  update(0);
  function diagnostics(){
    housing.updateMatrixWorld(true);const centers=rosh?[-1.125,-.375,.375,1.125]:[0];
    const underside=centers.map(x=>{
      const ray=new THREE.Raycaster(new THREE.Vector3(x,.22,.1),new THREE.Vector3(0,1,0));
      const hits=ray.intersectObject(housing,true).filter(h=>h.object!==fold&&h.object.userData.part==='housing');
      const ringHit=ray.intersectObject(upper,false);
      const down=new THREE.Raycaster(new THREE.Vector3(x,.22,.1),new THREE.Vector3(0,-1,0));
      return {x,upperOpeningClear:ringHit.length===0,nextHousingAbove:hits[0]?.distance??null,lowerCloses:down.intersectObject(lower,false).length>0};
    });
    lower.geometry.computeBoundingBox();const box=lower.geometry.boundingBox;const flapCorners=[];for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z])flapCorners.push(lower.localToWorld(new THREE.Vector3(x,y,z)).toArray());
    return {...snapshot,underside,flapCorners,lowerStillAttached:flapPivot.parent===base,stitchesSeparateFromFlap:stitches.every(({g})=>g.parent===base)};
  }
  return {update,snapshot:diagnostics,upper,lower,flapPivot};
}
