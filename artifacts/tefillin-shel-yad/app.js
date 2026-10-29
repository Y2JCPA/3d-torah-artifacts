import * as THREE from 'three';
import {OrbitControls} from '../tefillin-shel-rosh/vendor/OrbitControls.js';
import {RoundedBoxGeometry} from '../tefillin-shel-rosh/vendor/RoundedBoxGeometry.js';
import {RoomEnvironment} from '../tefillin-shel-rosh/vendor/RoomEnvironment.js';
import {renderLessons, mountOverview} from '../../shared/lessons.js';
import {createSelection} from '../../shared/selection.js';
const selection = createSelection();
mountOverview(document.querySelector('#law-overview'));


const $=s=>document.querySelector(s), reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const RAM='https://www.mechon-mamre.org/i/en/2303.htm', SA='https://www.sefaria.org/Shulchan_Arukh,_Orach_Chayim.';
const content={
 housing:{short:'Housing',title:'One chamber, four passages',he:'בית אחד',text:'The arm tefillin has a single undivided leather chamber. It has no side shin and no three-groove division. The square footprint is shared with the head tefillin; the one rolled parchment is held inside this chamber.',source:'Rambam · Tefillin 3:4, 6',url:RAM},
 base:{short:'Base',title:'The square titura',he:'תיתורא',text:'The broad leather base closes the housing from below. The opened schematic lifts the housing so its one chamber can be studied. It does not depict a removable display stand.',source:'Shulchan Arukh · OC 32:44',url:SA+'32.44'},
 stitch:{short:'Stitching',title:'Sinew around the base',he:'גידים',text:'Twelve stitch positions follow a square outline. Sinew closes the base; it is a different material from the hair binding the parchment.',source:'Shulchan Arukh · OC 32:49, 51',url:SA+'32.49'},
 scroll:{short:'Parchment',title:'One parchment, four sections',he:'פרשיות של יד',text:'Ordinarily the four passages are written in four sections on one long parchment, rolled together into a single assembly. All four passage buttons identify sections of this same roll. The closed roll is blank and illustrative; it does not reproduce sacred writing.',source:'Shulchan Arukh · OC 32:47',url:SA+'32.47'},
 wrap:{short:'Wrapping',title:'Around the single roll',he:'כריכה',text:'The single parchment assembly is wrapped before insertion. The displayed parchment wrapper and hair layers are a schematic based on the source-specific wrapping practices described below.',source:'Shulchan Arukh & Rema · OC 32:44, 47',url:SA+'32.47'},
 hair:{short:'Binding hair',title:'Fine hair around the wrapping',he:'שיער',text:'Fine permitted-species animal hair binds the assembly. This is separate from the sinew stitching. The model enlarges the strand visibility for study and does not prescribe an exact winding pattern.',source:'Shulchan Arukh · OC 32:44, 47',url:SA+'32.44'},
 passage:{short:'Strap passage',title:'The ma’abarta tunnel',he:'מעברתא',text:'A flat leather strap runs across the real hollow passage behind the housing. The opening is visible from either side. The structure belongs to both arm and head tefillin.',source:'Rambam · Tefillin 3:4',url:RAM},
 knot:{short:'Yud knot',title:'The yud beside the housing',he:'קשר של יד',text:'A compact folded leather collar and short return identify the arm-tefillin knot. The visible form is based on the Shluchim / Pinson illustrated guide. It stays beside the housing; the enlarged inspection view explains its location. Concealed crossings are schematic, not a tying sequence or a claim about every community’s knot.',source:'Shulchan Arukh · OC 27:2; 32:52',url:SA+'27.2',extra:'https://www.shluchim.org/content/img/tefillinguide.pdf'},
 strap:{short:'Strap',title:'The arm-tefillin strap',he:'רצועה',text:'One continuous leather length runs through the ma’abarta, forms a loosened oval binding loop, returns beside the yud knot, and continues as the long strap. The loop is laid out for inspection, not fitted to an arm. Its hidden knot crossings and exact dimensions are schematic; this is not an arm-wrapping or knot-tying sequence.',source:'Shulchan Arukh · OC 33:3; 27:8',url:SA+'33.3'}
};

const passageNames={kadesh:['Kadesh','Exodus 13:1–10','https://www.sefaria.org/Exodus.13.1-10'],vehaya:['Vehaya ki yeviakha','Exodus 13:11–16','https://www.sefaria.org/Exodus.13.11-16'],shema:['Shema','Deuteronomy 6:4–9','https://www.sefaria.org/Deuteronomy.6.4-9'],im:['Vehaya im shamoa','Deuteronomy 11:13–21','https://www.sefaria.org/Deuteronomy.11.13-21']};
const orders={rashi:['kadesh','vehaya','shema','im']};
const state={mode:'assembled',order:'rashi',knot:'pinson-study',selected:'housing',selectionActive:false,scrollIndex:null,passageIndex:null,explosion:0,cut:0};
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:$('#model'),antialias:true,alpha:true});}catch(e){$('#loading').textContent='This device could not start WebGL. Open this model in a browser with WebGL2 enabled.';throw e;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);renderer.shadowMap.enabled=true;renderer.shadowMap.autoUpdate=false;renderer.shadowMap.needsUpdate=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.1;renderer.localClippingEnabled=true;
const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(34,1,.1,100);
const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=.08;controls.minDistance=5.8;controls.maxDistance=45;controls.maxPolarAngle=Math.PI*.92;controls.autoRotateSpeed=.65;controls.enablePan=false;
const studio=new RoomEnvironment(),pmrem=new THREE.PMREMGenerator(renderer);scene.environment=pmrem.fromScene(studio,.04).texture;scene.environmentIntensity=.5;studio.dispose();pmrem.dispose();
scene.add(new THREE.HemisphereLight(0xd5e0df,0x373029,.65));
function light(color,intensity,x,y,z,size){const l=new THREE.DirectionalLight(color,intensity);l.position.set(x,y,z);scene.add(l);if(size){l.castShadow=true;l.shadow.mapSize.set(2048,2048);l.shadow.camera.left=-10;l.shadow.camera.right=10;l.shadow.camera.top=10;l.shadow.camera.bottom=-10;l.shadow.normalBias=.035;l.shadow.bias=-.0001;}return l;}
light(0xfff3e3,1.8,-5,7,6,true);light(0xbfd5eb,.7,5,4,-4);light(0xffffff,.6,-6,3,-5);light(0xcbd3cf,2.7,-2,3,-8);
const floor=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.ShadowMaterial({opacity:.16}));floor.rotation.x=-Math.PI/2;floor.position.y=-.45;floor.receiveShadow=true;scene.add(floor);
// Seeded microtexture: small leather pores rather than photographic decoration.
function grain(){const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d'),d=ctx.createImageData(512,512);function hash(x,y){let h=Math.imul(x+7,374761393)^Math.imul(y+13,668265263);h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967295;}function noise(x,y,scale){const u=x/scale,v=y/scale,xi=Math.floor(u),yi=Math.floor(v),fx=u-xi,fy=v-yi,a=fx*fx*(3-2*fx),b=fy*fy*(3-2*fy);return THREE.MathUtils.lerp(THREE.MathUtils.lerp(hash(xi,yi),hash(xi+1,yi),a),THREE.MathUtils.lerp(hash(xi,yi+1),hash(xi+1,yi+1),a),b);}for(let i=0;i<d.data.length;i+=4){const x=i/4%512,y=Math.floor(i/4/512),n=155+noise(x,y,4)*27+noise(x,y,13)*16+noise(x,y,58)*12+hash(x*3,y*3)*7;d.data[i]=d.data[i+1]=d.data[i+2]=n;d.data[i+3]=255;}ctx.putImageData(d,0,0);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(2,2);return t;}

function parchmentTexture(){const c=document.createElement('canvas');c.width=c.height=512;const ctx=c.getContext('2d');ctx.fillStyle='#e5d7b6';ctx.fillRect(0,0,512,512);let seed=731;function rnd(){seed=(1664525*seed+1013904223)>>>0;return seed/4294967296;}for(let i=0;i<21000;i++){const v=100+rnd()*80;ctx.strokeStyle=`rgba(${v},${v*.88},${v*.64},${.03+rnd()*.09})`;const x=rnd()*512,y=rnd()*512;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+(rnd()-.5)*2,y+2+rnd()*10);ctx.stroke();}const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t;}
const texture=grain(),colorTexture=grain();colorTexture.colorSpace=THREE.SRGBColorSpace;const clipPlane=new THREE.Plane(new THREE.Vector3(0,0,-1),.08);
const leather=new THREE.MeshPhysicalMaterial({color:0x242724,map:colorTexture,roughness:.64,metalness:0,bumpMap:texture,bumpScale:.014,clearcoat:0,clearcoatRoughness:.65,specularIntensity:.4});
const relief=leather.clone();relief.color.setHex(0x20221f);relief.roughness=.59;
const edge=leather.clone();edge.color.setHex(0x26231d);edge.roughness=.8;
const paper=new THREE.MeshStandardMaterial({color:0xffffff,map:parchmentTexture(),roughness:.88,bumpMap:texture,bumpScale:.012});
const wrapper=new THREE.MeshStandardMaterial({color:0xf5edda,map:parchmentTexture(),roughness:.93,bumpMap:texture,bumpScale:.008});
const hairMat=new THREE.MeshStandardMaterial({color:0x59452b,roughness:.63});
const sinew=new THREE.MeshStandardMaterial({color:0x746953,roughness:.67});
const ink=new THREE.MeshStandardMaterial({color:0x6b5b3e,roughness:1});
const model=new THREE.Group();scene.add(model);const housing=new THREE.Group(),base=new THREE.Group(),scrollGroup=new THREE.Group(),straps=new THREE.Group();model.add(housing,base,scrollGroup,straps);
const section=new THREE.Group();housing.add(section);section.visible=false;const sectionMat=new THREE.MeshStandardMaterial({color:0x65594a,roughness:1});
const pickables=[],objects={},chambers=[],scrolls=[],clipped=[];const positions=[0];
function register(mesh,id){mesh.userData.part=id;pickables.push(mesh);(objects[id]??=[]).push(mesh);mesh.castShadow=true;mesh.receiveShadow=true;return mesh;}
function box(parent,w,h,d,x,y,z,mat,id,r=.025){const m=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/3,h/3,d/3)),mat);m.position.set(x,y,z);parent.add(m);if(id)register(m,id);return m;}
function tube(parent,pts,r,mat,id,segments=32){const curve=new THREE.CatmullRomCurve3(pts.map(p=>new THREE.Vector3(...p)));const m=new THREE.Mesh(new THREE.TubeGeometry(curve,segments,r,7,false),mat);parent.add(m);if(id)register(m,id);return m;}
function cutMat(mat){const m=mat.clone();m.clippingPlanes=[];m.clipShadows=true;clipped.push(m);return m;}
const shell= cutMat(leather),shellRelief=cutMat(relief),shellEdge=cutMat(edge);
// One undivided hollow housing. The openings and the cut face are architectural teaching sections.
const chamber=new THREE.Group();chamber.userData.chamber=0;housing.add(chamber);chambers.push(chamber);
box(chamber,3,.105,3,0,3.045,0,shell,'housing');
box(chamber,3,2.64,.09,0,1.69,1.455,shell,'housing');box(chamber,3,2.64,.09,0,1.69,-1.455,shell,'housing');
box(chamber,.09,2.64,2.83,-1.455,1.69,0,shell,'housing');box(chamber,.09,2.64,2.83,1.455,1.69,0,shell,'housing');
box(housing,3.14,.13,3.14,0,.37,0,shell,'housing');
[-1.455,1.455].forEach(x=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(.09,2.64),sectionMat);m.position.set(x,1.69,.081);section.add(m);register(m,'housing');});
box(base,3.85,.17,3.85,0,.12,0,leather,'base',.045);box(base,3.79,.11,3.79,0,.265,0,leather,'base',.035);box(base,3.84,.022,3.84,0,.205,0,edge,'base',.009);
// Twelve stitches, each wrapping the base edge and returning through the top.
for(let side=0;side<4;side++){for(let j=-1;j<=1;j++){const g=new THREE.Group();g.rotation.y=side*Math.PI/2;base.add(g);const x=j*1.05;box(g,.17,.018,.09,x,.328,1.68,edge,'stitch',.008);tube(g,[[x-.075,.34,1.68],[x-.075,.34,1.86],[x-.04,.27,1.94],[x+.04,.08,1.94],[x+.075,.07,1.7]],.025,sinew,'stitch',24);}}
// Rear tunnel: an open-ended arched leather cover, with the strap running through x.
const tunnel=new THREE.Group();base.add(tunnel);box(tunnel,2.45,.11,.57,0,.57,-2.05,leather,'passage');box(tunnel,2.45,.09,.57,0,.31,-2.05,leather,'passage');box(tunnel,2.45,.25,.08,0,.44,-2.31,leather,'passage');box(tunnel,2.45,.25,.08,0,.44,-1.79,leather,'passage');
function ring(parent,r,y,mat,id,offset=0){const pts=[];for(let i=0;i<=90;i++){const a=i/90*Math.PI*2;pts.push([r*Math.cos(a),y+.007*Math.sin(a*3+offset),r*Math.sin(a)]);}return tube(parent,pts,.009,mat,id,90);}
function rolledSheet(parent,index){const steps=440,rows=12,turns=11.2,positions=[],uv=[],indices=[];const stride=(rows+1)*2;for(let u=0;u<=steps;u++){const t=u/steps,a=t*Math.PI*2*turns,r=.07+.64*t,edge=.007*Math.sin(a*1.7)+.004*Math.sin(a*4.1);for(let v=0;v<=rows;v++)for(let face=0;face<2;face++){const y=v/rows*(1.97+edge),rr=r+(face?-.003:.003)+.0015*Math.sin(a*3+y*2);positions.push(Math.cos(a)*rr,y,Math.sin(a)*rr);uv.push(t*8,v/rows);}}
 for(let u=0;u<steps;u++){const k=u*stride;for(let v=0;v<rows;v++)for(let f=0;f<2;f++){const q=k+v*2+f;if(f===0)indices.push(q,q+stride,q+2,q+2,q+stride,q+stride+2);else indices.push(q,q+2,q+stride,q+2,q+stride+2,q+stride);}for(const v of [0,rows]){const q=k+v*2;indices.push(q,q+1,q+stride,q+1,q+stride+1,q+stride);}}
 const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();const m=new THREE.Mesh(geo,paper);parent.add(m);register(m,'scroll');m.userData.scrollIndex=index;return m;}
positions.forEach((x,i)=>{const g=new THREE.Group();g.position.set(x,.52,.10);scrollGroup.add(g);scrolls.push(g);rolledSheet(g,i);
 const geo=new THREE.CylinderGeometry(.73,.73,1.41,72,1,true,.06,Math.PI*2+.09),wrapMesh=new THREE.Mesh(geo,wrapper);wrapMesh.position.y=.88;g.add(wrapMesh);[.48,1.19].forEach(y=>ring(g,.724,y,hairMat,'hair'));register(wrapMesh,'wrap');wrapMesh.userData.scrollIndex=i;
 [.48,1.19].forEach((y,k)=>{ring(g,.742,y,hairMat,'hair',k);ring(g,.743,y+.018,hairMat,'hair',k+1);});tube(g,[[.74,1.21,0],[.75,1.12,.025],[.74,.96,.04]],.005,hairMat,'hair',12);
});
// One continuous thick ribbon. Its visual knot sections share exact boundary vertices
// with the loop and tail. Continuity does not verify the concealed tying topology.
const strapPoints=[
 [-1.59,.43,-1.51],[-1.59,.62,-1.51],[-1.59,.78,-1.52],
 [-1.59,.91,-1.60],[-1.59,.94,-1.82],[-1.59,.87,-1.97],
 [-1.59,.66,-2.06],[-1.50,.46,-2.25],[-1.23,.43,-2.20],
 [-.75,.43,-2.05],[.3,.43,-2.05],[1.15,.43,-2.05],
 [1.65,.43,-2.07],[2.3,.27,-2.55],[2.85,.07,-3.65],
 [2.9,-.08,-5.10],[2.05,-.12,-6.30],[.55,-.03,-6.55],
 [-.85,.1,-5.82],[-1.75,.2,-4.30],[-1.82,.29,-2.88],
 [-1.83,.19,-2.12],[-1.85,.18,-1.69],[-2.08,.15,-1.25],
 [-2.55,.11,-.7],[-3.05,.02,.6],[-3.25,.02,2.1],
 [-2.8,.03,3.5],[-1.75,.04,4.3],[-.65,.05,4.35]
];
const strapCurve=new THREE.CatmullRomCurve3(strapPoints.map(p=>new THREE.Vector3(...p)),false,'centripetal');
const steps=900,columns=6,stride=(columns+1)*2,verts=[],uv=[],indices={strap:[],knot:[]};
let lateral=new THREE.Vector3(1,0,0);
for(let i=0;i<=steps;i++){
 const u=i/steps,t=strapCurve.getUtoTmapping(u),p=strapCurve.getPointAt(u),tan=strapCurve.getTangentAt(u).normalize();
 lateral.addScaledVector(tan,-lateral.dot(tan)).normalize();
 const twist=THREE.MathUtils.smoothstep(t,23/(strapPoints.length-1),.96)*Math.PI/2,drawLateral=lateral.clone().applyAxisAngle(tan,twist);
 const normal=new THREE.Vector3().crossVectors(tan,drawLateral).normalize();
 const n=strapPoints.length-1,collar=THREE.MathUtils.smoothstep(t,.8/n,2.5/n)*(1-THREE.MathUtils.smoothstep(t,5/n,6.8/n)),width=.26+.08*THREE.MathUtils.smoothstep(t,0,1.6/n)+.26*collar;
 for(let j=0;j<=columns;j++){const v=j/columns;for(let f=0;f<2;f++){
  const q=p.clone().addScaledVector(drawLateral,(v-.5)*width).addScaledVector(normal,.006*Math.sin(v*Math.PI)+(f?-.018:.018));
  verts.push(q.x,q.y,q.z);uv.push(u*strapCurve.getLength()/2,v);
 }}
 if(i<steps){const id=t<8/(strapPoints.length-1)?'knot':'strap',a=indices[id],n=i*stride;
  for(let j=0;j<columns;j++)for(let f=0;f<2;f++){const q=n+j*2+f;if(f===0)a.push(q,q+stride,q+2,q+2,q+stride,q+stride+2);else a.push(q,q+2,q+stride,q+2,q+stride+2,q+stride);}
  for(const j of [0,columns]){const q=n+j*2;a.push(q,q+1,q+stride,q+1,q+stride+1,q+stride);}
 }
}
for(const [n,id]of [[0,'knot'],[steps*stride,'strap']])for(let j=0;j<columns;j++){const q=n+j*2;indices[id].push(q,q+2,q+1,q+1,q+2,q+3);}
const full=new THREE.BufferGeometry();full.setAttribute('position',new THREE.Float32BufferAttribute(verts,3));full.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));full.setIndex([...indices.knot,...indices.strap]);full.computeVertexNormals();
for(const id of ['knot','strap']){const g=full.clone();g.setIndex(indices[id]);const mesh=new THREE.Mesh(g,leather);straps.add(mesh);register(mesh,id);}full.dispose();
const routeAudit={freeEnds:2,continuous:true,knotRoutingVerified:false};
// Highlight every mesh in a component, or only the identified parchment assembly.
function highlight(id,index=null){
 const meshes=(objects[id]||[]).filter(m=>index===null||scrolls[index]?.getObjectById(m.id));
 selection.select(state.selectionActive?meshes:[]);
 $('#selection-label').textContent=state.selectionActive?content[id].short+(id==='scroll'?' · one roll':''):'Choose a part to highlight';
 $('#clear-highlight').hidden=!state.selectionActive;
}
Object.entries(content).forEach(([key,p])=>{const b=document.createElement('button');b.textContent=p.short;b.dataset.part=key;b.setAttribute('aria-pressed',key==='housing');b.onclick=()=>selectPart(key,true);$('#parts').append(b);});
function selectPart(id,focus=false,index=null,illuminate=true){state.selectionActive=illuminate;state.selected=id;state.scrollIndex=index;const p=content[id];$('#detail').innerHTML=`<span class="index">${String(Object.keys(content).indexOf(id)+1).padStart(2,'0')} / ANATOMY</span><h2>${p.title}</h2><div class="hebrew" lang="he">${p.he}</div><p>${p.text}</p><a class="source-link" href="${p.url}" target="_blank" rel="noopener">${p.source}</a>${p.extra?`<a class="source-link" href="${p.extra}" target="_blank" rel="noopener">Visible folds · illustrated guide</a>`:''}`;
 if(id==='scroll'&&state.passageIndex!==null){const n=passageNames[orders.rashi[state.passageIndex]];$('#detail').innerHTML+=`<p><strong>Section ${state.passageIndex+1}: ${n[0]}</strong><br>${n[1]} · one continuous parchment</p><a class="source-link" href="${n[2]}" target="_blank" rel="noopener">Read this passage</a>`;}
 $('#detail').insertAdjacentHTML('beforeend',`<button class="inspect-selection">View highlighted part ↑</button>`+renderLessons(id,'yad'));
 $('#detail .inspect-selection').onclick=()=>{state.selectionActive=true;highlight(id,index);document.querySelector('.viewer').scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});};
 document.querySelectorAll('[data-part]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.part===id));highlight(id,index);
 if(focus){if(['scroll','wrap','hair'].includes(id)){setMode('exploded');setCamera('hero');}if(id==='passage')setCamera('passage');if(id==='knot')setCamera('knot');}
}
function updateOrder(){const a=orders.rashi;$('#passages').innerHTML='';a.forEach((key,i)=>{const li=document.createElement('li'),b=document.createElement('button');b.innerHTML=`<b>${i+1}</b>${passageNames[key][0]}`;b.title=`Section ${i+1} on the same parchment`;b.onclick=()=>{state.passageIndex=i;selectPart('scroll',true,0);};li.append(b);$('#passages').append(li);});}
let cameraGoal=null,targetGoal=null;
const cameraViews={hero:[-10.4,8.8,-12.4],section:[-7.4,6.3,10.8],front:[0,4.7,13.6],rear:[-8,5.8,-11.5],top:[0,20,-1.65],right:[-12,5.3,1.9],left:[12,5.3,1.9],passage:[-5.3,2.4,-5.2],knot:[-4.6,2.5,-4.8],knotReverse:[.1,1.8,-4.6],knotUnder:[-3.3,-1.6,-3.8]};
function setCamera(name,instant=false){controls.autoRotate=false;const damping=controls.enableDamping;controls.enableDamping=false;controls.update();controls.enableDamping=damping;controls.minDistance=name.startsWith('knot')?1.4:5.8;const v=innerWidth<721&&name==='hero'?[-9.8,9.3,-14.2]:cameraViews[name],explode=state.mode==='exploded';cameraGoal=new THREE.Vector3(...v);targetGoal=new THREE.Vector3(0,explode?2.5:.9,name==='top'?-1:-.85);if(name.startsWith('knot'))targetGoal.set(-1.59,.66,-1.90);else if(name==='passage')targetGoal.set(0,.44,-2.05);else if(explode){cameraGoal.y+=2.8;cameraGoal.multiplyScalar(1.13);}cameraGoal.sub(targetGoal).multiplyScalar(Math.max(1,1.1/camera.aspect)).add(targetGoal);if(instant||reduced){camera.position.copy(cameraGoal);controls.target.copy(targetGoal);controls.update();camera.updateMatrixWorld();cameraGoal=null;targetGoal=null;}$('#view-note').textContent=name.startsWith('knot')?'Yud fold study · concealed crossings schematic':name==='passage'?'Rear passage · flat strap through the tunnel':name==='front'?'Front view · one undivided housing':name==='rear'?'Rear view · strap through the ma’abarta':name==='top'?'Top view · square housing without grooves or shins':'Drag to orbit · Scroll or pinch to zoom · Click to explore';controls.autoRotate=false;$('#rotate').setAttribute('aria-pressed','false');}
function setMode(mode){state.mode=mode;renderer.shadowMap.needsUpdate=true;section.visible=mode==='cutaway';document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.mode===mode));$('#mode-caption').textContent=mode==='exploded'?'Educational separation · housing lifted from one rolled parchment and base':mode==='cutaway'?'Educational section · front leather removed to reveal one chamber':'';clipped.forEach(m=>m.clippingPlanes=mode==='cutaway'?[clipPlane]:[]);highlight(state.selected,state.scrollIndex);if(reduced){state.explosion=mode==='exploded'?1:0;}setCamera(mode==='cutaway'?'section':'hero');}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));document.querySelectorAll('[data-camera]').forEach(b=>b.onclick=()=>setCamera(b.dataset.camera));document.querySelectorAll('[data-zoom]').forEach(b=>b.onclick=()=>{cameraGoal=null;targetGoal=null;const v=camera.position.clone().sub(controls.target),d=THREE.MathUtils.clamp(v.length()*(b.dataset.zoom==='in'?.82:1.22),controls.minDistance,controls.maxDistance);camera.position.copy(controls.target).add(v.setLength(d));controls.update();});$('#rotate').onclick=()=>{controls.autoRotate=!controls.autoRotate;$('#rotate').setAttribute('aria-pressed',controls.autoRotate);};$('#reset').onclick=()=>{state.order='rashi';state.passageIndex=null;setMode('assembled');selectPart('housing',false,null,false);updateOrder();setCamera('hero');};controls.addEventListener('start',()=>{cameraGoal=null;targetGoal=null;});
const markers=positions.map((x,i)=>{const b=document.createElement('button');b.className='scroll-marker';b.textContent='1 roll';b.setAttribute('aria-label','Explore one parchment containing four passages');b.onclick=()=>{state.passageIndex=null;selectPart('scroll',false,0);};$('#stage').append(b);return b;});
const ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),activePointers=new Map();let tapStart=null,gestureMoved=false,multiTouch=false;
function effectivelyVisible(mesh){for(let p=mesh;p;p=p.parent)if(!p.visible)return false;return mesh.material.visible!==false;}
function visibleIntersection(h){if(!effectivelyVisible(h.object))return false;return !(h.object.material.clippingPlanes||[]).some(plane=>plane.distanceToPoint(h.point)<-.00001);}
function hit(e){const r=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.intersectObjects(pickables.filter(effectivelyVisible),false).find(visibleIntersection);}
renderer.domElement.addEventListener('pointerdown',e=>{activePointers.set(e.pointerId,[e.clientX,e.clientY]);if(activePointers.size===1){tapStart={id:e.pointerId,x:e.clientX,y:e.clientY};gestureMoved=false;multiTouch=false;}else multiTouch=true;});
renderer.domElement.addEventListener('pointermove',e=>{const start=activePointers.get(e.pointerId);if(start&&Math.hypot(e.clientX-start[0],e.clientY-start[1])>5)gestureMoved=true;});
renderer.domElement.addEventListener('pointerup',e=>{const select=activePointers.size===1&&tapStart?.id===e.pointerId&&!gestureMoved&&!multiTouch&&Math.hypot(e.clientX-tapStart.x,e.clientY-tapStart.y)<=5;activePointers.delete(e.pointerId);if(select){const h=hit(e);if(h)selectPart(h.object.userData.part,false,h.object.userData.scrollIndex??null);}if(!activePointers.size)tapStart=null;});
renderer.domElement.addEventListener('pointercancel',e=>{activePointers.delete(e.pointerId);gestureMoved=true;tapStart=null;});
renderer.domElement.addEventListener('pointermove',e=>{if(e.buttons){$('#tooltip').style.display='none';return;}const h=hit(e),el=$('#tooltip');renderer.domElement.style.cursor=h?'pointer':'grab';if(h){const r=$('.viewer').getBoundingClientRect();el.textContent=content[h.object.userData.part].short;el.style.display='block';el.style.left=Math.min(e.clientX-r.left+12,r.width-150)+'px';el.style.top=(e.clientY-r.top+14)+'px';}else el.style.display='none';});renderer.domElement.addEventListener('pointerleave',()=>$('#tooltip').style.display='none');
function resize(){const r=$('#stage').getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();}new ResizeObserver(resize).observe($('#stage'));
let last=performance.now();function frame(now){const dt=Math.min((now-last)/1000,.25);last=now;const goal=state.mode==='exploded'?1:0;if(Math.abs(state.explosion-goal)>.0001)renderer.shadowMap.needsUpdate=true;state.explosion=THREE.MathUtils.damp(state.explosion,goal,6,dt);if(Math.abs(state.explosion-goal)<.0001)state.explosion=goal;housing.position.y=4.2*state.explosion;scrollGroup.position.y=.25*state.explosion;base.position.y=-.1*state.explosion;straps.position.y=base.position.y;
 if(cameraGoal){const ease=1-Math.exp(-6*dt),current=new THREE.Spherical().setFromVector3(camera.position.clone().sub(controls.target)),desired=new THREE.Spherical().setFromVector3(cameraGoal.clone().sub(targetGoal));let angle=desired.theta-current.theta;angle=Math.atan2(Math.sin(angle),Math.cos(angle));current.theta+=angle*ease;current.phi=THREE.MathUtils.lerp(current.phi,desired.phi,ease);current.radius=THREE.MathUtils.lerp(current.radius,desired.radius,ease);controls.target.lerp(targetGoal,ease);camera.position.copy(controls.target).add(new THREE.Vector3().setFromSpherical(current));if(camera.position.distanceTo(cameraGoal)<.02){camera.position.copy(cameraGoal);controls.target.copy(targetGoal);cameraGoal=null;targetGoal=null;}}

 controls.update();renderer.render(scene,camera);markers.forEach((m,i)=>{m.hidden=state.mode==='assembled'||camera.position.z<=.8;if(!m.hidden){const p=new THREE.Vector3(positions[i],.44+scrollGroup.position.y,.96),direction=p.clone().sub(camera.position),distance=direction.length();const visibilityRay=new THREE.Raycaster(camera.position,direction.normalize(),.01,distance-.03);const occluder=visibilityRay.intersectObjects(pickables.filter(effectivelyVisible),false).find(visibleIntersection);if(occluder){m.hidden=true;return;}p.project(camera);if(Math.abs(p.x)>1||Math.abs(p.y)>1){m.hidden=true;return;}m.style.left=Math.round((p.x+1)/2*renderer.domElement.clientWidth)+'px';m.style.top=Math.round((1-p.y)/2*renderer.domElement.clientHeight)+'px';}});requestAnimationFrame(frame);}
$('#clear-highlight').onclick=()=>{state.selectionActive=false;highlight(state.selected,state.scrollIndex);};

updateOrder();selectPart('housing',false,null,false);resize();setCamera('hero',true);$('#loading').remove();requestAnimationFrame(frame);
// Read-only testing interface: invariants and camera projection without mutating the scene.
window.tefillin={getState:()=>({...state,selection:selection.snapshot(),artifact:'yad',knotModeled:true,knotReference:'Shluchim / Pinson illustrated guide',shins:0,passagesOnParchment:4,chambers:chambers.length,chamberXs:positions.slice(),scrollAxes:scrolls.map(g=>new THREE.Vector3(0,1,0).applyQuaternion(g.quaternion).toArray()),visibleChambers:chambers.filter(x=>x.visible&&x.children.every(m=>m.visible)).length,scrolls:scrolls.length,opaqueShell:clipped.every(m=>!m.transparent&&m.opacity===1),camera:camera.position.toArray(),target:controls.target.toArray(),strapFreeEnds:routeAudit.freeEnds,strapContinuous:routeAudit.continuous,knotRoutingVerified:false,renderCalls:renderer.info.render.calls,cameraSettled:cameraGoal===null}),projectPart:id=>{const obj=(objects[id]||[])[0];if(!obj)return null;obj.geometry.computeBoundingBox();const p=obj.geometry.boundingBox.getCenter(new THREE.Vector3());obj.localToWorld(p);p.project(camera);const r=renderer.domElement.getBoundingClientRect();return {x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};}};

window.tefillin.projectPartSamples=id=>{const r=renderer.domElement.getBoundingClientRect(),result=[],seen=new Set();model.updateMatrixWorld(true);for(const mesh of objects[id]||[]){const a=mesh.geometry.attributes.position;const index=mesh.geometry.index,triangles=index?index.count/3:a.count/3,step=Math.max(1,Math.floor(triangles/65));for(let t=0;t<triangles;t+=step){const p=new THREE.Vector3();for(let k=0;k<3;k++)p.add(new THREE.Vector3().fromBufferAttribute(a,index?index.getX(t*3+k):t*3+k));p.multiplyScalar(1/3);mesh.localToWorld(p);p.project(camera);if(Math.abs(p.x)>.98||Math.abs(p.y)>.98||p.z>1)continue;const x=r.left+(p.x+1)*r.width/2,y=r.top+(1-p.y)*r.height/2,key=Math.round(x)+','+Math.round(y);if(!seen.has(key)){seen.add(key);result.push({x,y,z:p.z});}}}return result.sort((a,b)=>a.z-b.z);};