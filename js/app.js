/* Fakhar Alam portfolio — app.js (performance build) */
(function(){
"use strict";

/* Pre-exported images (made from the originals in /images). Anything not listed falls back to the plain file. */
var IMG={
 "/images/fakhar.jpg":{w:800,h:1000,srcset:"/images/fakhar-600.webp 600w, /images/fakhar-800.webp 800w"},
 "/images/posters/ai-tools-that-feel-illegal.jpg":{webp:"/images/posters/ai-tools-that-feel-illegal.webp",w:406,h:720},
 "/images/posters/craft-your-purpose.jpg":{webp:"/images/posters/craft-your-purpose.webp",w:406,h:720},
 "/images/posters/food-review-reel.jpg":{webp:"/images/posters/food-review-reel.webp",w:406,h:720},
 "/images/posters/how-to-think-logically.jpg":{webp:"/images/posters/how-to-think-logically.webp",w:406,h:720},
 "/images/posters/humty-dumty-waffle-reel.jpg":{webp:"/images/posters/humty-dumty-waffle-reel.webp",w:406,h:720},
 "/images/posters/i-just-found-an-ai.jpg":{webp:"/images/posters/i-just-found-an-ai.webp",w:406,h:720},
 "/images/posters/shawarma-square-grand-opening.jpg":{webp:"/images/posters/shawarma-square-grand-opening.webp",w:406,h:720},
 "/images/posters/shortcut-cubes.jpg":{webp:"/images/posters/shortcut-cubes.webp",w:406,h:720,wide:"/images/posters/shortcut-cubes-wide.webp"},
 "/images/posters/what-one-ai-can-build.jpg":{webp:"/images/posters/what-one-ai-can-build.webp",w:406,h:720}
};

var data={};
var root=document.getElementById("root");
var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var coarse=window.matchMedia("(pointer: coarse)").matches;
var filter="all", booted=false, lenis=null, capTimer=null, recTimer=null, io=null, heroIO=null, navIO=null;

function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
function safeUrl(u){u=String(u||"").trim();if(!u)return "";if(/^(https?:|mailto:|tel:)/i.test(u))return u;if(/^[\w.-]+\.[a-z]{2,}/i.test(u))return "https://"+u;return ""}
function slug(s){return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}
function toast(msg,ms){var t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");clearTimeout(t._h);t._h=setTimeout(function(){t.classList.remove("show")},ms||3200)}

var I={
 play:'<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
 email:'<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></svg>',
 phone:'<svg viewBox="0 0 24 24"><path d="M5 4h3.5l1.8 4.5-2.3 1.4a11 11 0 0 0 6.1 6.1l1.4-2.3L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4z"/></svg>',
 whatsapp:'<svg viewBox="0 0 24 24"><path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z"/><path d="M9 9.5c.5 2.5 2.5 4.5 5 5l1.2-1.2 1.8.8-.4 1.6c-3.8.3-7.6-3.5-7.3-7.3l1.6-.4.8 1.8z"/></svg>',
 instagram:'<svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor"/></svg>',
 linkedin:'<svg viewBox="0 0 24 24"><path d="M6 10v8M6 6.5v.01M10 18v-8M10 13.5c0-2 1.3-3.5 3.2-3.5S16 11.3 16 13.5V18"/></svg>',
 youtube:'<svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="12" rx="3.5"/><path d="m10.5 9.5 4 2.5-4 2.5z" fill="currentColor"/></svg>',
 link:'<svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/></svg>',
 arrow:'<svg viewBox="0 0 24 24"><path d="M4 12h15M14 7l5 5-5 5"/></svg>'
};

function words(text){return String(text||"").split(/\s+/).filter(Boolean)}
function wordSpans(text,start){var i=start||0;return words(text).map(function(w){var d=(i++*0.07).toFixed(2);return '<span class="w"><span style="transition-delay:'+d+'s">'+esc(w)+'</span></span>'}).join(" ")}
function markIn(text,phrase){var t=esc(text),p=esc(phrase||"");if(!p||t.indexOf(p)<0)return t;return t.replace(p,'<span class="mark">'+p+'</span>')}
function linkFor(c){
 var v=String(c.value||"").trim(),u=safeUrl(c.url);
 if(u)return u;
 if(c.type==="email"&&v)return coarse?"mailto:"+v:"https://mail.google.com/mail/?view=cm&fs=1&to="+encodeURIComponent(v); // desktop: Gmail compose (mailto does nothing without a mail app)
 if((c.type==="phone"||c.type==="whatsapp")&&v)return "https://wa.me/"+v.replace(/\D/g,"");
 if(c.type==="instagram"&&v)return "https://instagram.com/"+v.replace(/^@/,"");
 return "";
}
function isLight(hex){var m=/^#?([0-9a-f]{6})$/i.exec(hex||"");if(!m)return true;var n=parseInt(m[1],16),r=n>>16,g=n>>8&255,b=n&255;return (r*299+g*587+b*114)/1000>150}

/* ---------- images ---------- */
function posterTag(src,alt,opts){
 opts=opts||{};src=String(src||"");if(!src)return "";
 var m=IMG[src],attrs=' alt="'+esc(alt||"")+'" decoding="async"'+(opts.eager?' fetchpriority="high"':' loading="lazy"');
 if(!m)return '<img src="'+esc(src)+'"'+attrs+' referrerpolicy="no-referrer">';
 attrs+=' width="'+m.w+'" height="'+m.h+'"';
 if(m.srcset)return '<picture><source type="image/webp" srcset="'+m.srcset+'" sizes="'+(opts.sizes||"(max-width:900px) min(calc(100vw - 60px),380px), 420px")+'"><img src="'+esc(src)+'"'+attrs+'></picture>';
 var w=opts.wide&&m.wide?m.wide:m.webp;
 return '<picture><source type="image/webp" srcset="'+w+'"><img src="'+esc(src)+'"'+attrs+'></picture>';
}

/* ---------- video URL → embeddable ---------- */
function videoUrlOf(v){return String((v&&(v.videoUrl||v.drive))||"").trim()}
function embedFor(u){
 u=String(u||"").trim();if(!u)return null;
 var m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=|.*?\/d\/)([\w-]{10,})/)||u.match(/drive\.google\.com\/[^#]*[?&]id=([\w-]{10,})/);
 if(m)return {type:"iframe",src:"https://drive.google.com/file/d/"+m[1]+"/preview"};
 var y=u.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/);
 if(y)return {type:"iframe",src:"https://www.youtube-nocookie.com/embed/"+y[1]+"?autoplay=1&rel=0&playsinline=1"};
 var vm=u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
 if(vm)return {type:"iframe",src:"https://player.vimeo.com/video/"+vm[1]+"?autoplay=1"};
 if(/\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(u)&&/^(https?:\/\/|\/)/i.test(u))return {type:"video",src:u}; // direct file: plays in the site's own minimal player
 if(/^https?:\/\//i.test(u))return {type:"iframe",src:u}; // already an embed URL
 return null;
}

/* cover image from a pasted link: Google Drive share link -> direct image URL, or any https image URL */
function imageFromLink(u){
 u=String(u||"").trim();if(!u)return "";
 var m=u.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=|thumbnail\?(?:[^#]*&)?id=|.*?\/d\/)([\w-]{10,})/)||u.match(/drive\.google\.com\/[^#]*[?&]id=([\w-]{10,})/)||u.match(/googleusercontent\.com\/d\/([\w-]{10,})/);
 if(m)return "https://drive.google.com/thumbnail?id="+m[1]+"&sz=w1000";
 return /^https?:\/\//i.test(u)?u:"";
}

/* ---------- data helpers ---------- */
function cats(){return ((data.work||{}).categories||[])}
function allVideos(){var out=[];cats().forEach(function(k,ci){(k.videos||[]).forEach(function(v,vi){if(v&&(videoUrlOf(v)||v.poster))out.push(Object.assign({ci:ci,vi:vi},v))})});return out}
function catSlug(i){var k=cats()[i];return k?slug(k.chip||k.title||("cat-"+i)):""}
function catIndexBySlug(s){var ks=cats();for(var i=0;i<ks.length;i++){if(catSlug(i)===s)return String(i)}return null}
function hasContent(k){return (k.videos||[]).some(function(v){return v&&(videoUrlOf(v)||v.poster)})||!!safeUrl(k.link)}

/* ---------- render ---------- */
function render(){
 var d=data, h=d.hero||{}, w=d.work||{}, a=d.about||{}, s=d.stats||{}, c=d.contact||{}, b=d.brand||{};
 document.documentElement.style.setProperty("--accent",b.accent||"#EF8665");
 document.documentElement.style.setProperty("--on-accent",isLight(b.accent||"#EF8665")?"#000000":"#FFFFFF");
 if(d.meta&&d.meta.pageTitle)document.title=d.meta.pageTitle;
 var ks=cats(), hw=words(h.headline).length, html="";

 html+='<span id="scroll-sentinel" aria-hidden="true"></span>';
 html+='<header class="nav" id="nav"><div class="nav-pill"><a class="logo" href="#top" data-go="top"><i></i>'+esc(b.name)+'</a><nav aria-label="Main"><ul>'+
  '<li class="hide-sm"><a class="nl" href="#work" data-go="work">Work</a></li>'+
  '<li class="hide-sm"><a class="nl" href="#about" data-go="about">About</a></li>'+
  '<li><a class="nl cta" href="#contact" data-go="contact">'+esc(c.navLabel||"Contact")+'</a></li></ul></nav></div></header>';

 // hero (chips: only categories that actually have content; clicking one filters the Work grid)
 html+='<main><section class="hero" id="top"><div class="wrap"><div class="hero-text">'+
  '<p class="hello rv"><span class="dot"></span>'+esc(h.hello)+'</p>'+
  '<h1 class="display">'+wordSpans(h.headline,0)+(h.highlight?' <span class="mark" id="heroMark">'+wordSpans(h.highlight,hw)+'</span>':'')+'</h1>'+
  '<p class="sub rv">'+esc(b.title)+'</p>'+
  '<ul class="chips" id="heroChips">'+ks.map(function(k,i){if(!hasContent(k))return "";return '<li><button type="button" class="chip" data-chip="'+i+'" style="transition-delay:'+(0.9+i*0.08).toFixed(2)+'s" aria-label="Show '+esc(k.title)+'"><span class="ic">'+I.play+'</span>'+esc(k.chip||k.title)+'</button></li>'}).join("")+'</ul>'+
  '<div class="ctas rv"><a class="btn btn-ink" href="#work" data-go="work">'+esc(h.primaryCta||"See my work")+'</a><a class="btn btn-line" href="#contact" data-go="contact">'+esc(h.secondaryCta||"Contact me")+'</a></div>'+
  '</div><figure class="hero-media"><div class="frame" id="heroFrame">'+
  (d.photo?posterTag(d.photo,(b.name||"")+", video editor",{eager:true}):'<div class="ph">Add your photo in the admin</div>')+
  '<div class="rec glass-dark"><i></i><span id="rec">REC 00:00:00</span></div>'+
  (h.badge?'<div class="badge"><span class="ic">'+I.play+'</span>'+esc(h.badge)+'</div>':'')+
  '<div class="cap" id="cap"></div></div></figure></div></section>';

 // work
 var vids=allVideos();
 var showCats=ks.map(function(k,i){return {k:k,i:i,n:(k.videos||[]).filter(function(v){return v&&(videoUrlOf(v)||v.poster)}).length}}).filter(function(x){return x.n||safeUrl(x.k.link)});
 if(filter!=="all"&&!showCats.some(function(x){return String(x.i)===filter}))filter="all";
 html+='<section class="sec" id="work"><div class="wrap"><div class="sec-head"><h2 class="h2 rv">'+esc(w.heading)+'</h2>'+(w.intro?'<p class="lead rv">'+esc(w.intro)+'</p>':'')+'</div>'+
  '<div class="filters rv" role="tablist" aria-label="Filter videos"><button type="button" role="tab" data-filter="all" aria-selected="'+(filter==="all")+'">'+esc(w.allLabel||"All")+'<em>'+vids.length+'</em></button>'+
  showCats.map(function(x){return '<button type="button" role="tab" data-filter="'+x.i+'" aria-selected="'+(filter===String(x.i))+'">'+esc(x.k.title)+'<em>'+x.n+'</em></button>'}).join("")+'</div>'+
  '<p class="cat-desc" id="catDesc">'+esc(filter==="all"?(w.allDesc||""):((ks[filter]||{}).desc||""))+'</p>'+
  (vids.length?'<div class="vgrid" id="vgrid">'+vids.map(function(v,n){
   var k=ks[v.ci]||{};var hide=filter!=="all"&&String(v.ci)!==filter;var soon=!videoUrlOf(v);
   var alt="Thumbnail: "+(v.title||"")+(k.title?", "+k.title:"");
   return '<button type="button" class="vcard rv'+(hide?' gone':'')+(soon?' soon':'')+'" data-vi="'+n+'" data-cat="'+v.ci+'" style="transition-delay:'+((n%4)*0.06).toFixed(2)+'s" aria-label="'+(soon?'Details: ':'Play ')+esc(v.title)+'">'+
    '<span class="vthumb">'+(v.poster?posterTag(v.poster,alt):'')+
    '<span class="vtag glass-dark">'+esc(k.chip||k.title)+'</span>'+(soon?'<span class="vsoon">Soon</span>':'')+'<span class="vplay" aria-hidden="true">'+I.play+'</span>'+(v.duration?'<span class="vdur">'+esc(v.duration)+'</span>':'')+'</span>'+
    '<span class="vmeta"><h3>'+esc(v.title)+'</h3>'+(v.client?'<small>'+esc(v.client)+'</small>':'')+(v.desc?'<p>'+esc(v.desc)+'</p>':'')+'</span></button>'}).join("")+'</div>'
   :'<div class="empty-work">'+esc(w.emptyLabel||"Coming soon")+'</div>')+
  '<div class="drive-links">'+ks.map(function(k,i){var u=safeUrl(k.link);if(!u)return "";return '<a href="'+esc(u)+'" target="_blank" rel="noopener" data-cat="'+i+'" class="'+(filter!=="all"&&String(i)!==filter?'gone':'')+'">'+esc((w.linkLabel||"More on Google Drive")+": "+k.title)+'</a>'}).join("")+'</div>'+
  '</div></section>';

 // stats
 if(s.show&&(s.items||[]).length){
  html+='<section class="sec stats-sec"><div class="wrap"><div class="stats rv">'+s.items.map(function(x){return '<div class="stat"><b><span data-count="'+(Number(x.value)||0)+'">'+(booted?(Number(x.value)||0):0)+'</span><em>'+esc(x.suffix)+'</em></b><span>'+esc(x.label)+'</span></div>'}).join("")+'</div></div></section>';
 }

 // about
 var aPh=a.showPhoto?(d.aboutPhoto||d.photo):"";
 html+='<section class="sec about" id="about"><div class="wrap'+(aPh?'':' solo')+'">'+
  (aPh?'<figure class="about-photo rv"><div class="ph-in">'+posterTag(aPh,(b.name||"")+", video editor",{sizes:"(max-width:900px) 100vw, 40vw"})+'</div>'+(a.photoTag?'<span class="about-tag"><i></i>'+esc(a.photoTag)+'</span>':'')+'</figure>':'')+
  '<div class="about-copy"><h2 class="h2 rv">'+esc(a.heading)+'</h2><p class="about-text rv" id="aboutText">'+markIn(a.text,a.highlight)+'</p>'+
  ((a.tools||[]).length?'<div class="tools rv"><h3>'+esc(a.toolsHeading||"Tools I use")+'</h3><ul>'+a.tools.map(function(t){return '<li>'+esc(t)+'</li>'}).join("")+'</ul></div>':'')+
  '</div></div></section>';

 // contact
 html+='<section class="sec contact" id="contact"><div class="wrap"><div><h2 class="h2 rv">'+esc(c.heading)+'</h2>'+(c.text?'<p class="lead rv" style="margin-top:24px">'+esc(c.text)+'</p>':'')+'</div>'+
  '<div class="ccards">'+(c.items||[]).map(function(x,i){var u=linkFor(x);var ext=/^https?:/i.test(u);
   return '<a class="ccard rv"'+(x.type==="email"&&x.value?' data-copy="'+esc(String(x.value).trim())+'"':'')+' style="transition-delay:'+(i*0.06).toFixed(2)+'s" href="'+esc(u||"#")+'"'+(ext?' target="_blank" rel="noopener"':'')+'><span class="ci">'+(I[x.type]||I.link)+'</span><span class="ct"><small>'+esc(x.label)+'</small><strong>'+esc(x.value)+'</strong></span><span class="ca">'+I.arrow+'</span></a>'}).join("")+
  '</div></div></section></main>';

 // footer (year auto-updates)
 var year=String(new Date().getFullYear());
 var foot=d.footer?String(d.footer).replace(/\b(19|20)\d{2}\b/,year):("© "+year+" "+(b.name||""));
 html+='<footer><div class="wrap"><span>'+esc(foot)+'</span><a href="#top" data-go="top">Back to top</a></div></footer>';
 root.innerHTML=html;
 afterRender();
}

function afterRender(){
 if(booted)root.classList.add("booted");
 startCaptions();
 startRec();
 if(io)io.disconnect();if(heroIO)heroIO.disconnect();if(navIO)navIO.disconnect();

 // nav "scrolled" state from a sentinel — no scroll listener needed
 var sent=document.getElementById("scroll-sentinel"),nav=document.getElementById("nav");
 if(sent&&nav){navIO=new IntersectionObserver(function(es){nav.classList.toggle("scrolled",!es[0].isIntersecting)},{threshold:0});navIO.observe(sent)}

 // Ken Burns only while the hero is on screen
 var fr=document.getElementById("heroFrame");
 if(fr&&!reduce){heroIO=new IntersectionObserver(function(es){fr.classList.toggle("offscreen",!es[0].isIntersecting)},{threshold:0});heroIO.observe(fr)}

 if(booted||reduce){
  root.querySelectorAll(".rv,.frame,.chips,.mark").forEach(function(el){el.classList.add(el.classList.contains("mark")?"on":"in")});
  root.querySelectorAll("[data-count]").forEach(function(el){el.textContent=el.getAttribute("data-count")});
  root.querySelectorAll(".vcard").forEach(function(el){el.style.transitionDelay="0s"});
  if(!reduce&&fr)fr.classList.add("kb");
  return;
 }
 io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
  if(el.classList.contains("mark")){setTimeout(function(){el.classList.add("on")},el.id==="heroMark"?700:250)}
  else if(el.classList.contains("hero-media")){var f=el.querySelector(".frame");if(f){f.classList.add("in");setTimeout(function(){f.classList.add("kb")},2400)}}
  else el.classList.add("in");
  if(el.classList.contains("vcard"))setTimeout(function(){el.style.transitionDelay="0s"},1400);
  if(el.querySelectorAll)el.querySelectorAll("[data-count]").forEach(countUp);
 })},{threshold:.18,rootMargin:"0px 0px -6% 0px"});
 root.querySelectorAll(".rv,.hero-media,.chips,.mark,.display").forEach(function(el){io.observe(el)});
}
function countUp(el){var to=Number(el.getAttribute("data-count"))||0,t0=performance.now(),dur=1600;
 (function tick(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,4);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(tick)})(t0)}

function startCaptions(){
 clearInterval(capTimer);
 var cap=document.getElementById("cap");if(!cap)return;
 var list=((data.hero||{}).captions||[]).filter(Boolean),i=0;
 if(!list.length)return;
 function show(){var txt=list[i%list.length];i++;var ws=words(txt),last=ws.pop()||"";
  cap.innerHTML='<span>'+esc(ws.join(" "))+(ws.length?" ":"")+'<em>'+esc(last)+'</em></span>'}
 show();if(!reduce&&list.length>1)capTimer=setInterval(show,1700);
}
function startRec(){
 clearInterval(recTimer);var el=document.getElementById("rec");if(!el)return;var s=0;
 function f(n){return String(n).padStart(2,"0")}
 function tick(){el.textContent="REC 00:"+f(Math.floor(s/60)%60)+":"+f(s%60);s++}
 tick();if(!reduce)recTimer=setInterval(tick,1000);
}

/* ---------- smooth scroll (Lenis: desktop only, one rAF loop) ---------- */
if(!reduce&&!coarse&&typeof window.Lenis==="function"){
 try{
  lenis=new window.Lenis({duration:1.25,easing:function(t){return 1-Math.pow(1-t,4)},smoothWheel:true,syncTouch:false});
  (function raf(t){lenis.raf(t);requestAnimationFrame(raf)})(performance.now());
 }catch(e){lenis=null}
}
function go(id,instant){var el=id==="top"?null:document.getElementById(id);if(id!=="top"&&!el)return;
 if(instant){window.scrollTo(0,el?el.getBoundingClientRect().top+window.scrollY-70:0);if(lenis)lenis.resize();return}
 if(lenis)lenis.scrollTo(el||0,{offset:el?-70:0,duration:1.4});
 else if(el)el.scrollIntoView({behavior:reduce?"auto":"smooth",block:"start"});
 else window.scrollTo({top:0,behavior:reduce?"auto":"smooth"})}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("[data-go]");if(!a)return;e.preventDefault();var id=a.getAttribute("data-go");go(id);
 setHash(id==="top"?"":(id==="work"&&filter!=="all"?"work/"+catSlug(Number(filter)):id))});
function setHash(h){try{history.replaceState(null,"",h?"#"+h:location.pathname+location.search)}catch(e){}}
document.addEventListener("visibilitychange",function(){document.documentElement.classList.toggle("paused",document.hidden)});

/* ---------- filters (FLIP animation + shareable hash) ---------- */
function applyFilter(f,opts){
 opts=opts||{};var w=data.work||{},ks=cats();filter=f;
 root.querySelectorAll(".filters [data-filter]").forEach(function(b){b.setAttribute("aria-selected",String(b.getAttribute("data-filter")===f))});
 var cd=document.getElementById("catDesc");if(cd)cd.textContent=f==="all"?(w.allDesc||""):((ks[f]||{}).desc||"");
 root.querySelectorAll(".drive-links [data-cat]").forEach(function(a){a.classList.toggle("gone",f!=="all"&&a.getAttribute("data-cat")!==f)});
 if(!opts.silent)setHash(f==="all"?"work":"work/"+catSlug(Number(f)));
 var grid=document.getElementById("vgrid");if(!grid)return;
 var cards=[].slice.call(grid.querySelectorAll(".vcard"));
 cards.forEach(function(c){c.style.transitionDelay="0s"});
 if(reduce||opts.instant){cards.forEach(function(c){var show=f==="all"||c.getAttribute("data-cat")===f;c.classList.toggle("gone",!show);if(show)c.classList.add("in")});return}
 var first=new Map(),leaving=[],entering=[],staying=[];
 cards.forEach(function(c){var show=f==="all"||c.getAttribute("data-cat")===f,was=!c.classList.contains("gone");
  if(was)first.set(c,c.getBoundingClientRect());
  if(show&&was)staying.push(c);else if(show)entering.push(c);else if(was)leaving.push(c)});
 leaving.forEach(function(c){c.classList.add("leaving")});
 clearTimeout(applyFilter._t);
 applyFilter._t=setTimeout(function(){
  leaving.forEach(function(c){c.classList.add("gone");c.classList.remove("leaving")});
  entering.forEach(function(c){c.classList.remove("gone");c.classList.add("fade","in")});
  staying.forEach(function(c){var l=c.getBoundingClientRect(),fr=first.get(c);if(!fr)return;var dx=fr.left-l.left,dy=fr.top-l.top;
   if(Math.abs(dx)>.5||Math.abs(dy)>.5){c.classList.add("flip");c.style.transform="translate("+dx+"px,"+dy+"px)"}});
  void grid.offsetWidth;
  requestAnimationFrame(function(){requestAnimationFrame(function(){
   staying.forEach(function(c){c.classList.remove("flip");c.style.transform=""});
   entering.forEach(function(c){c.classList.remove("fade")});
   if(lenis)lenis.resize();
  })});
 },leaving.length?170:0);
}
root.addEventListener("click",function(e){
 var fb=e.target.closest("[data-filter]");if(fb){applyFilter(fb.getAttribute("data-filter"));return}
 var ch=e.target.closest("[data-chip]");if(ch){applyFilter(ch.getAttribute("data-chip"));go("work");return}
 var vc=e.target.closest(".vcard");if(vc)openLB(Number(vc.getAttribute("data-vi")));
});

// email card: also copy the address so it always "works", even with no mail app
root.addEventListener("click",function(e){var a=e.target.closest("[data-copy]");if(!a)return;var v=a.getAttribute("data-copy");
 try{if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(v).then(function(){toast("Email copied: "+v)},function(){})}catch(err){}});

/* ---------- minimal video player (for .mp4 files hosted with the site) ---------- */
var VP={play:'<svg viewBox="0 0 24 24"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
 pause:'<svg viewBox="0 0 24 24"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor"/></svg>',
 vol:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>',
 mute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" fill="currentColor"/><path d="m16 9.5 5 5M21 9.5l-5 5"/></svg>',
 full:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9V5h4M19 9V5h-4M5 15v4h4M19 15v4h-4"/></svg>'};
function buildPlayer(v){
 var box=v.parentNode;if(!box)return;
 var ui=document.createElement("div");ui.className="vp show";
 ui.innerHTML='<button type="button" class="vp-big" aria-label="Play">'+VP.play+'</button>'+
  '<div class="vp-bar"><div class="vp-track" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><i></i></div>'+
  '<span class="vp-time">0:00</span><button type="button" class="vp-btn" data-vp="mute" aria-label="Mute">'+VP.vol+'</button><button type="button" class="vp-btn" data-vp="full" aria-label="Fullscreen">'+VP.full+'</button></div>';
 box.appendChild(ui);
 var big=ui.querySelector(".vp-big"),track=ui.querySelector(".vp-track"),fill=track.firstChild,time=ui.querySelector(".vp-time"),muteB=ui.querySelector('[data-vp="mute"]'),hideT=null,drag=false;
 function fmt(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")}
 function wake(){ui.classList.add("show");clearTimeout(hideT);if(!v.paused)hideT=setTimeout(function(){if(!drag)ui.classList.remove("show")},2200)}
 function state(){var p=v.paused;ui.classList.toggle("paused",p);big.innerHTML=p?VP.play:VP.pause;big.setAttribute("aria-label",p?"Play":"Pause");wake()}
 function toggle(){if(v.paused){var pr=v.play();if(pr&&pr.catch)pr.catch(function(){})}else v.pause()}
 function seek(x){var r=track.getBoundingClientRect(),f=Math.min(1,Math.max(0,(x-r.left)/r.width));if(v.duration)v.currentTime=f*v.duration;fill.style.transform="scaleX("+f+")"}
 v.addEventListener("play",state);v.addEventListener("pause",state);
 v.addEventListener("ended",function(){v.currentTime=0;state()});
 v.addEventListener("timeupdate",function(){if(!v.duration)return;var f=v.currentTime/v.duration;if(!drag)fill.style.transform="scaleX("+f+")";time.textContent=fmt(v.currentTime)+" / "+fmt(v.duration);track.setAttribute("aria-valuenow",Math.round(f*100))});
 ui.addEventListener("click",function(e){
  var b=e.target.closest("[data-vp]");
  if(b){var a=b.getAttribute("data-vp");
   if(a==="mute"){v.muted=!v.muted;muteB.innerHTML=v.muted?VP.mute:VP.vol;muteB.setAttribute("aria-label",v.muted?"Unmute":"Mute")}
   else if(a==="full"){if(document.fullscreenElement)document.exitFullscreen();else if(box.requestFullscreen)box.requestFullscreen().catch(function(){});else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}
   wake();return}
  if(e.target.closest(".vp-bar"))return;
  toggle()});
 track.addEventListener("pointerdown",function(e){drag=true;try{track.setPointerCapture(e.pointerId)}catch(x){}seek(e.clientX);wake()});
 track.addEventListener("pointermove",function(e){if(drag)seek(e.clientX)});
 track.addEventListener("pointerup",function(){drag=false;wake()});track.addEventListener("pointercancel",function(){drag=false});
 track.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();e.stopPropagation();v.currentTime=Math.max(0,Math.min(v.duration||0,v.currentTime+(e.key==="ArrowRight"?5:-5)));wake()}});
 ui.querySelector(".vp-bar").addEventListener("touchstart",function(e){e.stopPropagation()},{passive:true});
 ui.addEventListener("pointermove",wake);
 state();var pr=v.play();if(pr&&pr.catch)pr.catch(function(){state()});
}

/* ---------- lightbox ---------- */
var lb=document.createElement("div");lb.className="lb";lb.setAttribute("role","dialog");lb.setAttribute("aria-modal","true");lb.setAttribute("aria-labelledby","lbTitle");lb.setAttribute("aria-hidden","true");
lb.innerHTML='<div class="lb-back" data-lbclose></div><div class="lb-box" data-lenis-prevent><button type="button" class="lb-close" data-lbclose aria-label="Close video"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg></button><div class="lb-video"><div class="lb-frame"></div></div><div class="lb-info"><span class="tagchip" id="lbTag"></span><h3 id="lbTitle"></h3><small id="lbClient" style="color:var(--muted);font-weight:600"></small><p id="lbDesc"></p><a id="lbOpen" class="lb-open" target="_blank" rel="noopener" hidden>Video not playing? Open it in Google Drive</a><div class="lb-nav"><button type="button" data-lbstep="-1" aria-label="Previous video"><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg></button><button type="button" data-lbstep="1" aria-label="Next video"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></button></div></div></div>';
document.body.appendChild(lb);
var lbFrame=lb.querySelector(".lb-frame"),lbList=[],lbPos=0,lbLast=null;

function visibleVideos(){return allVideos().map(function(v,n){v.n=n;return v}).filter(function(v){return filter==="all"||String(v.ci)===filter})}
function clearFrame(){lbFrame.classList.remove("loading");var f=lbFrame.querySelector("iframe,video");if(f){if(f.tagName==="VIDEO"){try{f.pause()}catch(e){}f.removeAttribute("src");f.load&&f.load()}else f.src="about:blank"}lbFrame.innerHTML=""}
function showLB(){
 var v=lbList[lbPos];if(!v)return;var k=cats()[v.ci]||{};
 lb.classList.toggle("wide",!!v.wide);
 document.getElementById("lbTag").textContent=k.chip||k.title||"";document.getElementById("lbTitle").textContent=v.title||"";
 document.getElementById("lbClient").textContent=v.client||"";document.getElementById("lbDesc").textContent=v.desc||"";
 clearFrame();
 var em=embedFor(videoUrlOf(v)),poster="";
 var op=document.getElementById("lbOpen");if(op){var dv=em&&/drive\.google\.com\/file\/d\/[\w-]+\/preview/.test(em.src);op.hidden=!dv;if(dv)op.href=em.src.replace(/\/preview$/,"/view")}
 if(v.poster){var m=IMG[v.poster];poster='<img class="lb-poster" src="'+esc(m?(v.wide&&m.wide?m.wide:m.webp):v.poster)+'" alt="" decoding="async">'}
 if(!em){lbFrame.innerHTML='<div class="lb-soon">'+poster+'<span>Video coming soon</span></div>';}
 else{
  lbFrame.innerHTML=poster;lbFrame.classList.add("loading");
  var el;
  if(em.type==="video"){el=document.createElement("video");el.src=em.src;el.preload="auto";el.playsInline=true;el.setAttribute("playsinline","");el.setAttribute("webkit-playsinline","");el.addEventListener("loadeddata",done,{once:true});el.addEventListener("error",done,{once:true});setTimeout(function(){buildPlayer(el)},0)}
  else{el=document.createElement("iframe");el.src=em.src;el.allow="autoplay; fullscreen; picture-in-picture; encrypted-media";el.setAttribute("allowfullscreen","");el.setAttribute("referrerpolicy","strict-origin-when-cross-origin");el.title=v.title||"Video";el.addEventListener("load",done,{once:true})}
  lbFrame.appendChild(el);
  var tm=setTimeout(done,8000);
  function done(){clearTimeout(tm);lbFrame.classList.remove("loading");var p=lbFrame.querySelector(".lb-poster");if(p&&p.parentNode===lbFrame)p.remove()}
 }
 lb.querySelectorAll("[data-lbstep]").forEach(function(b){b.style.visibility=lbList.length>1?"visible":"hidden"});
}
function openLB(n){
 lbList=visibleVideos();lbPos=Math.max(0,lbList.findIndex(function(v){return v.n===n}));if(!lbList.length)return;
 lbLast=document.activeElement;showLB();
 lb.classList.add("open");lb.setAttribute("aria-hidden","false");
 if(lenis)lenis.stop();document.documentElement.classList.add("lb-open");document.documentElement.style.overflow="hidden";
 lb.querySelector(".lb-close").focus({preventScroll:true});
}
function closeLB(){
 if(!lb.classList.contains("open"))return;
 lb.classList.remove("open");lb.setAttribute("aria-hidden","true");clearFrame();
 document.documentElement.style.overflow="";document.documentElement.classList.remove("lb-open");
 if(lenis)lenis.start();
 if(lbLast&&lbLast.focus)lbLast.focus({preventScroll:true});
}
function stepLB(d){if(lbList.length<2)return;lbPos=(lbPos+d+lbList.length)%lbList.length;showLB()}
lb.addEventListener("click",function(e){if(e.target.closest("[data-lbclose]"))return closeLB();var s=e.target.closest("[data-lbstep]");if(s)stepLB(Number(s.getAttribute("data-lbstep")))});
document.addEventListener("keydown",function(e){
 if(!lb.classList.contains("open"))return;
 if(e.key==="Escape"){e.preventDefault();closeLB();return}
 if(e.key==="ArrowRight"){e.preventDefault();stepLB(1);return}
 if(e.key==="ArrowLeft"){e.preventDefault();stepLB(-1);return}
 if(e.key==="Tab"){ // focus trap
  var f=[].slice.call(lb.querySelectorAll('button,[href],iframe,video,[tabindex]:not([tabindex="-1"])')).filter(function(x){return x.offsetParent!==null||x.tagName==="IFRAME"});
  if(!f.length)return;var first=f[0],last=f[f.length-1];
  if(e.shiftKey&&(document.activeElement===first||!lb.contains(document.activeElement))){e.preventDefault();last.focus()}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
 }
});
// swipe left/right on touch
(function(){var sx=0,sy=0,t0=0;
 lb.addEventListener("touchstart",function(e){if(e.touches.length!==1)return;sx=e.touches[0].clientX;sy=e.touches[0].clientY;t0=Date.now()},{passive:true});
 lb.addEventListener("touchend",function(e){var t=e.changedTouches[0];if(!t||Date.now()-t0>700)return;var dx=t.clientX-sx,dy=t.clientY-sy;
  if(Math.abs(dx)>56&&Math.abs(dx)>Math.abs(dy)*1.4)stepLB(dx<0?1:-1)},{passive:true});
})();

/* ---------- boot ---------- */
function readHash(){var m=/^#work\/([\w-]+)$/.exec(location.hash||"");if(!m)return null;return catIndexBySlug(m[1])}
function boot(j){
 data=j||{};
 cats().forEach(function(k){(k.videos||[]).forEach(function(v){var u=imageFromLink(v&&v.posterUrl);if(u)v.poster=u})});
 var hf=readHash();if(hf!=null)filter=hf;
 render();
 var h=(location.hash||"").replace(/^#/,"").split("/")[0];
 if(h&&document.getElementById(h))setTimeout(function(){go(h,true)},60);
 setTimeout(function(){booted=true},2600);
}
window.addEventListener("hashchange",function(){var hf=readHash();if(hf!=null&&hf!==filter)applyFilter(hf,{silent:true});else if(location.hash==="#work"&&filter!=="all")applyFilter("all",{silent:true})});

fetch("/content/site.json",{cache:"no-cache"}).then(function(r){if(!r.ok)throw new Error("site.json "+r.status);return r.json()}).then(boot)
 .catch(function(){root.innerHTML='<p style="padding:40px;text-align:center">Could not load the website content.</p>'});

})();
