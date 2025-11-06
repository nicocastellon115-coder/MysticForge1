const $=id=>document.getElementById(id), qs=(s,e=document)=>e.querySelector(s);

// piedras con imagen; metal/cadena/fondo vector/procedural
const PIEDRAS={

const IMAGENES = {
  amatista: "assets/Améthyste brute naturelle - Celinni.webp",
  aventurina: "assets/aventurina.jpg",
  citrino: "assets/cuarzo-citrino.jpg",
  cuarzo: "assets/cuarzo-citrino.jpg",
  cuarzo_rosa: "assets/cuarzo-rosa-mineral.jpg",
  jade: "assets/coupe_jade.jpg",
  lapislazuli: "assets/Lapislazuli.webp",
  obsidiana: "assets/obsidiana-500x500.jpg",
  ojo_tigre: "assets/ojo-de-tigre-mineral.jpg",
  onix: "assets/onix.jpg"
};

const MAT_GRADS = {
  jade: ["#0f9d58","#34d399"], citrino:["#f59e0b","#facc15"], cuarzo_rosa:["#f9a8d4","#f472b6"],
  amatista:["#8b5cf6","#a78bfa"], obsidiana:["#111827","#374151"], aventurina:["#22c55e","#16a34a"],
  lapislazuli:["#2563eb","#60a5fa"], ojo_tigre:["#b45309","#f59e0b"], cuarzo:["#e5e7eb","#cbd5e1"], onix:["#0f172a","#1f2937"]
};
function materialFill(id){
  const ruta = IMAGENES && IMAGENES[id];
  if (ruta) {
    return {
      defs: `<pattern id="pat-${id}" width="200" height="200" patternUnits="userSpaceOnUse">
               <image href="${ruta}" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice"/>
             </pattern>`,
      fill: `url(#pat-${id})`
    };
  }
  const g = MAT_GRADS[id] || ["#cbd5e1","#94a3b8"];
  return {
    defs: `<linearGradient id="grad-${id}" x1="0" y1="0" x2="1" y2="1">
             <stop offset="0%" stop-color="${g[0]}"/><stop offset="100%" stop-color="${g[1]}"/>
           </linearGradient>`,
    fill: `url(#grad-${id})`
  };
}

  amatista:"Améthyste brute naturelle – Celinni.webp",
  aventurina:"aventurina.jpg",
  citrino:"cuarzo-citrino.jpg",
  cuarzo_rosa:"cuarzo-rosa-mineral.jpg",
  obsidiana:"obsidiana-500x500.jpg",
  ojo_tigre:"ojo-de-tigre-mineral.jpg",
  onix:"onix.jpg",
  cuarzo:"punta-cuarzo-cristal-de-roca.jpg",
  jade:"coupe_jade.jpg",
  lapislazuli:"Lapislazuli.webp"
};
const METALES={oro:["#e7b416","#7b5c00"], oro_rosa:["#e7a1a6","#b06a6e"], plata:["#c7d3e0","#6b7280"], cobre:["#b87b5a","#7a4f32"]};
const CADENAS={cuero_negro:"cuero", hilo_rojo:"hilo", cadena_plata:"eslabones_plata", cadena_oro:"eslabones_oro", lino:"lino"};
const FORMS={
  redondo:"M100,30 A70,70 0 1 1 99.9,30 Z",
  lagrima:"M100,26 C145,70 172,104 172,122 C172,156 141,182 100,182 C59,182 28,156 28,122 C28,104 55,70 100,26 Z",
  ovalo:"M100,30 C140,30 170,70 170,110 C170,150 140,180 100,180 C60,180 30,150 30,110 C30,70 60,30 100,30 Z",
  hexagono:"M100,22 162,58 162,122 100,158 38,122 38,58 Z",
  rectangulo:"M50,38 H150 V162 H50 Z Q50,38 50,38"
};

function opts(el, obj){ el.innerHTML = Object.keys(obj).map(k=>`<option value="${k}">${k.replace(/_/g,' ')}</option>`).join(""); }
function init(){ opts($("piedra"),PIEDRAS); opts($("metal"),METALES); opts($("cadena"),CADENAS);
  $("piedra").value="amatista"; $("metal").value="plata"; $("cadena").value="cuero_negro"; $("forma").value="redondo"; $("fondo").value="studio"; render(); }

function fondoDefs(type){
  if(type==="studio") return `<linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#0b0d14"/></linearGradient>`;
  if(type==="madera_oscura") return `<filter id="wood"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="5"/><feColorMatrix type="matrix" values="0.6 0 0 0 0.2  0 0.45 0 0 0.1  0 0 0.35 0 0.05  0 0 0 1 0"/></filter>`;
  if(type==="madera_clara") return `<filter id="wood2"><feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="3" seed="4"/><feColorMatrix type="matrix" values="0.7 0 0 0 0.35  0 0.65 0 0 0.25  0 0 0.4 0 0.15  0 0 0 1 0"/></filter>`;
  if(type==="pizarra") return `<filter id="slate"><feTurbulence type="turbulence" baseFrequency="0.6" numOctaves="2" seed="2"/><feColorMatrix type="saturate" values="0.1"/></filter>`;
  if(type==="terciopelo") return `<radialGradient id="velvet" cx="0.5" cy="0.4" r="0.9"><stop offset="0%" stop-color="#0f1e45"/><stop offset="100%" stop-color="#060c1e"/></radialGradient>`;
  if(type==="blanco") return `<linearGradient id="white" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fcfdff"/><stop offset="100%" stop-color="#eef2f8"/></linearGradient>`;
  return ``;
}
function fondoRect(type){
  if(type==="studio") return `<rect width="100%" height="100%" fill="url(#bg)"/>`;
  if(type==="madera_oscura") return `<rect width="100%" height="100%" fill="#2b1d0d" filter="url(#wood)"/>`;
  if(type==="madera_clara") return `<rect width="100%" height="100%" fill="#705833" filter="url(#wood2)"/>`;
  if(type==="pizarra") return `<rect width="100%" height="100%" fill="#0f1320" filter="url(#slate)" opacity=".6"/>`;
  if(type==="terciopelo") return `<rect width="100%" height="100%" fill="url(#velvet)"/>`;
  if(type==="blanco") return `<rect width="100%" height="100%" fill="url(#white)"/>`;
  return ``;
}

function chainPath(kind){
  const stroke = kind==="eslabones_plata"?"#a9b6c6":(kind==="eslabones_oro"?"#d1b36a":kind==="hilo"?"#b91c1c":kind==="lino"?"#c2b08a":"#111827");
  const width = kind==="hilo"?2:(kind==="lino"?3:3);
  const dash = (kind==="eslabones_plata"||kind==="eslabones_oro")?'stroke-dasharray="2,6"':'';
  // Colocamos la cadena bien dentro del viewBox
  return `<path d="M40,30 Q100,18 160,30" fill="none" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" ${dash}/>`;
}

function metalDefs(metal, modoPro, angulo){
  const [ring, stroke]=METALES[metal];
  return `<radialGradient id="metal" cx="0.3" cy="0.25" r="0.9">
    <stop offset="0%" stop-color="#fff" stop-opacity="${modoPro?'.65':'.5'}"/>
    <stop offset="15%" stop-color="${ring}"/>
    <stop offset="80%" stop-color="${stroke}"/>
    <stop offset="100%" stop-color="#000" stop-opacity=".25"/>
  </radialGradient>
  <linearGradient id="metalGloss" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
    <stop offset="40%" stop-color="rgba(255,255,255,${modoPro?'.33':'.22'})"/>
    <stop offset="60%" stop-color="rgba(255,255,255,0)"/>
  </linearGradient>
  <pattern id="micro" width="6" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(${angulo})">
    <rect width="6" height="3" fill="transparent"/><rect x="0" y="1" width="6" height="1" fill="rgba(255,255,255,${modoPro?'.12':'.08'})"/>
  </pattern>`;
}

function buildSVG(cfg){
  const stoneImg = `assets/${PIEDRAS[cfg.piedra]}`;
  const shape = FORMS[cfg.forma];

  // Usamos un viewBox con padding interno (20u por lado) para evitar recortes al rotar
  const VB = {w:240,h:240,p:20}; // contenido real 200x200 dentro del 240
  const center = {x:VB.w/2, y:VB.h/2};
  const glossOpacity = cfg.modoPro ? 0.35 : 0.22;

  const defs = `
    ${fondoDefs(cfg.fondo)}
    ${metalDefs(cfg.metal, cfg.modoPro, cfg.angulo)}
    <pattern id="stone" width="200" height="200" patternUnits="userSpaceOnUse">
      <image href="${stoneImg}" x="0" y="0" width="200" height="200" preserveAspectRatio="xMidYMid slice"/>
    </pattern>
    <clipPath id="shape"><path d="${shape}"/></clipPath>
    <filter id="spec"><feSpecularLighting surfaceScale="4" specularConstant="${cfg.modoPro?0.9:0.75}" specularExponent="${Math.max(12, Math.min(40, cfg.luz/3))}" lighting-color="#fff" result="s"><fePointLight x="60" y="40" z="${cfg.modoPro?160:130}"/></feSpecularLighting><feComposite in="s" in2="SourceAlpha" operator="in"/></filter>
  `;

  const chain = chainPath(cfg.cadena);

  return 
const mf = materialFill(piedra);
`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB.w} ${VB.h}" role="img" aria-label="Amuleto">
  <defs>${mf.defs}${defs}</defs>
  ${fondoRect(cfg.fondo)}
  ${cfg.fondo!=="transparente" ? `<ellipse cx="${center.x}" cy="${VB.h-28}" rx="66" ry="12" fill="rgba(0,0,0,.38)"/>` : ``}
  ${cfg.fondo!=="transparente" ? `<ellipse cx="${center.x}" cy="${VB.h-44}" rx="40" ry="6" fill="rgba(255,255,255,.12)"/>` : ``}

  <!-- cadena, reubicada con padding -->
  <g transform="translate(${VB.p/2},${VB.p/2})">${chain}</g>
  <!-- anilla -->
  <ellipse cx="${center.x}" cy="${VB.p/2+21}" rx="7" ry="4.2" fill="url(#metal)"/>

  <!-- grupo del colgante escalado al 86% y centrado; NUNCA se corta -->
  <g transform="translate(${VB.p/2},${VB.p/2}) rotate(${cfg.angulo} 100 100)">
    <path d="${shape}" fill="url(#metal)"/>
    <path d="${shape}" fill="url(#micro)" opacity="${cfg.modoPro?'.18':'.12'}"/>
    <path d="${shape}" fill="url(#metalGloss)" opacity="${glossOpacity}"/>
    <g clip-path="url(#shape)">
      <path d="${shape}" transform="translate(0,0) scale(0.86) translate(14,14)" fill="url(#stone)"/>
      <ellipse cx="82" cy="76" rx="46" ry="20" fill="#fff" opacity="${(cfg.luz/140)*0.16}" transform="rotate(-18 82 76)"/>
    </g>
    ${cfg.grabado ? `<defs>${mf.defs}<path id="engr" d="M38,152 Q100,185 162,152"/></defs>
    <text font-size="10" fill="#c7d3e0" font-family="serif" letter-spacing="2">
      <textPath href="#engr" startOffset="50%" text-anchor="middle">${cfg.grabado.toUpperCase()}</textPath>
    </text>` : ``}
    <g filter="url(#spec)"><path d="${shape}" fill="none"/></g>
  </g>
</svg>`;
}

function readCfg(){ return {
  piedra:$("piedra").value, metal:$("metal").value, cadena:$("cadena").value,
  forma:$("forma").value, grabado:$("grabado").value, fondo:$("fondo").value,
  luz:parseInt($("luz").value,10), angulo:parseInt($("angulo").value,10), modoPro:$("modoPro").checked
};}

function render(){ $("preview").innerHTML = buildSVG(readCfg()); }

["piedra","metal","cadena","forma","fondo","grabado","luz","angulo","modoPro"].forEach(id=>{
  $(id).addEventListener("change", render); $(id).addEventListener("input", render);
});
$("aplicar").addEventListener("click", e=>{e.preventDefault(); render();});
$("aleatorio").addEventListener("click", e=>{e.preventDefault();
  const s=Object.keys(PIEDRAS), m=Object.keys(METALES), c=Object.keys(CADENAS);
  $("piedra").value=s[Math.floor(Math.random()*s.length)];
  $("metal").value=m[Math.floor(Math.random()*m.length)];
  $("cadena").value=c[Math.floor(Math.random()*c.length)];
  render();
});

// Export
$("btn-svg").addEventListener("click", e=>{
  e.preventDefault();
  const svg = qs("#preview svg"); if(!svg) return alert("Genera primero la vista.");
  const data = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([data], {type:"image/svg+xml;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href=url; a.download="amulet_realista.svg";
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});
$("btn-png").addEventListener("click", e=>{
  e.preventDefault();
  const svg = qs("#preview svg"); if(!svg) return alert("Genera primero la vista.");
  const s = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  const url = URL.createObjectURL(new Blob([s],{type:"image/svg+xml;charset=utf-8"}));
  img.onload=function(){
    const c = document.createElement("canvas"); c.width=1080; c.height=1080; const ctx=c.getContext("2d");
    ctx.drawImage(img,0,0,1080,1080);
    const a=document.createElement("a"); a.href=c.toDataURL("image/png"); a.download="amulet_realista.png";
    document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  };
  img.src=url;
});

init();
