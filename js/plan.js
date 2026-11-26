/* =====================================================================
   plan.js — "Meu plano de estudos" como componente: abre em qualquer página, sem sair dela.
   Carregue no fim do <body> (depois de js/menu.js e, se a página usar, de js/catalog.js).
     · usa o botão #planBtn do topo e o contador #planCount; se a página não tiver o botão,
       ele cria um no canto direito do topo;
     · dados em localStorage['dio-study-plan'] = [{id, hue}] (ids do catálogo de js/catalog.js);
       se a página não carregou o catálogo, ele carrega data/*.js e js/catalog.js na 1ª abertura;
     · index.html#plano (ou qualquer página com #plano) abre o painel direto.
   API: DioPlan.open(), .close(), .list(), .has(id), .add(id,hue), .remove(id), .toggle(id,hue),
        .set(lista) para mudanças em lote e .refresh(). Toda mudança dispara o evento 'dio-plan-change' no window: as páginas ouvem
        para atualizar os próprios botões; e, se a página mudar o plano por conta própria, basta
        disparar esse mesmo evento para o painel e o contador se atualizarem.
   ===================================================================== */
(function(){
  if(window.DioPlan) return;
  var KEY='dio-study-plan', VIEW_KEY='dio-plan-view';
  var cs=document.currentScript;
  var ROOT=cs&&cs.src?cs.src.replace(/js\/plan\.js(\?.*)?$/,''):'';
  var EVT='dio-plan-change';

  /* ---------- estado ---------- */
  function load(){ try{ var p=JSON.parse(localStorage.getItem(KEY)); return Array.isArray(p)?p:[]; }catch(e){ return []; } }
  function save(p){ try{ localStorage.setItem(KEY,JSON.stringify(p)); }catch(e){} }
  function changed(){ try{ window.dispatchEvent(new CustomEvent(EVT)); }catch(e){} }
  function has(id){ return load().some(function(x){ return x.id===id; }); }
  function add(id,hue){ var p=load(); if(p.some(function(x){ return x.id===id; })) return; p.push({id:id,hue:hue||'#B800E7'}); save(p); changed(); }
  function remove(id){ save(load().filter(function(x){ return x.id!==id; })); changed(); }
  function toggle(id,hue){ if(has(id)) remove(id); else add(id,hue); }

  /* ---------- catálogo: carrega sob demanda nas páginas que não o têm ---------- */
  var DATA=[
    ['data/tracks.js',function(){ return typeof TRACKS!=='undefined'; }],
    ['data/certifications.js',function(){ return typeof CERTIFICATIONS!=='undefined'; }],
    ['data/projects.js',function(){ return typeof PROJECTS!=='undefined'; }],
    ['data/courses.js',function(){ return typeof COURSES!=='undefined'; }],
    ['data/articles.js',function(){ return typeof ARTICLES!=='undefined'; }],
    ['data/mentorships.js',function(){ return typeof MENTORSHIPS!=='undefined'; }],
    ['js/catalog.js',function(){ return typeof CATALOG!=='undefined'; }]
  ];
  var waiting=null;
  function ensureData(cb){
    if(typeof CATALOG!=='undefined'){ cb(); return; }
    if(waiting){ waiting.push(cb); return; }
    waiting=[cb];
    var i=0;
    (function next(){
      while(i<DATA.length&&DATA[i][1]()) i++;
      if(i>=DATA.length){ var q=waiting; waiting=null; q.forEach(function(f){ f(); }); return; }
      var s=document.createElement('script'); s.src=ROOT+DATA[i][0]; i++;
      s.onload=next; s.onerror=next;
      document.head.appendChild(s);
    })();
  }
  /* id do plano: número do catálogo ou 'live:<slug>' para qualquer mentoria (a aba Mentorias
     deixa adicionar todas, mesmo as que não têm número no catálogo) */
  function info(id){
    if(typeof id==='string'&&id.indexOf('live:')===0){
      var slug=id.slice(5), m=(typeof MENTORSHIPS!=='undefined'?MENTORSHIPS:[]).filter(function(x){ return x.s===slug; })[0];
      return {t:m?m.t:slug.replace(/-/g,' '),u:'https://web.dio.me/lives/'+slug,k:'mentoria'};
    }
    return (typeof CATALOG!=='undefined'&&CATALOG[id])||{t:'—',u:'#',k:'formacao'};
  }
  var TIPO={formacao:'Formação',certificacao:'Certificação',projeto:'Projeto',curso:'Curso',mentoria:'Mentoria',artigo:'Artigo'};

  /* ---------- estilo (prefixo dp-, com as próprias cores: fica igual em todas as páginas) ---------- */
  var css=''
    +'.dp-ov{position:fixed;inset:0;z-index:180;background:rgba(0,0,0,.4);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);opacity:0;transition:opacity .4s ease}'
    +'.dp-ov.show{opacity:1}'
    +'body.dp-open{overflow:hidden}'
    +'.dp-panel{--ink:#f5f5f7;--ink-soft:#a1a1a6;--ink-faint:#6e6e73;--fill:rgba(118,118,128,.24);--fill-2:rgba(118,118,128,.32);'
    +  '--ment:#EDA486;--accent:#BF5AF2;--mono:"SF Mono",ui-monospace,Menlo,Monaco,"Cascadia Code",Consolas,monospace;--ease:cubic-bezier(.25,.1,.25,1);'
    +  'position:fixed;top:0;right:0;z-index:190;height:100vh;height:100dvh;width:min(500px,96vw);display:flex;flex-direction:column;'
    +  'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue","Segoe UI",Inter,Roboto,system-ui,Arial,sans-serif;'
    +  'font-size:16px;line-height:1.4;letter-spacing:-.01em;color:var(--ink);text-align:left;'
    +  'background:linear-gradient(180deg,rgba(40,22,58,.96),rgba(18,18,20,.97) 34%);border-left:1px solid rgba(255,255,255,.1);'
    +  '-webkit-backdrop-filter:saturate(180%) blur(24px);backdrop-filter:saturate(180%) blur(24px);'
    +  'box-shadow:-30px 0 80px -30px rgba(0,0,0,.7);transform:translateX(102%);transition:transform .5s cubic-bezier(.32,.72,0,1);visibility:hidden}'
    +'.dp-panel.show{transform:translateX(0);visibility:visible}'
    +'.dp-panel *{box-sizing:border-box}'
    +'.dp-head{padding:28px 24px 10px;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}'
    +'.dp-title{font-size:1.9rem;font-weight:800;letter-spacing:-.035em;line-height:1.1;margin:0}'
    +'.dp-sub{font-family:var(--mono);font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ment);margin-top:8px}'
    +'.dp-x{flex:none;width:30px;height:30px;border-radius:50%;display:grid;place-items:center;cursor:pointer;background:var(--fill);border:0;color:var(--ink-soft);transition:background .2s}'
    +'.dp-x svg{width:15px;height:15px}'
    +'.dp-x:hover{background:var(--fill-2);color:var(--ink)}'
    +'.dp-tools{display:flex;gap:8px;padding:8px 24px 14px}'
    +'.dp-tool{flex:1;min-height:42px;display:inline-flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;font:inherit;font-size:.86rem;font-weight:600;'
    +  'padding:10px 14px;border-radius:12px;border:0;transition:filter .2s,background .2s,color .2s}'
    +'.dp-tool svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}'
    +'.dp-tool.primary{flex:2;color:#1d1d1f;background:linear-gradient(95deg,var(--ment),#FF6FB5 60%,var(--accent) 120%)}'
    +'.dp-tool.primary:hover{filter:brightness(1.08)}'
    +'.dp-tool.danger{background:transparent;border:1px solid rgba(255,69,58,.4);color:#FF6B63}'
    +'.dp-tool.danger:hover{background:#FF453A;color:#fff}'
    +'.dp-views{display:flex;gap:2px;padding:2px;margin:0 24px 6px;background:var(--fill);border-radius:9px}'
    +'.dp-views button{flex:1;font:inherit;font-size:.8rem;font-weight:500;color:var(--ink);background:transparent;border:0;border-radius:7px;padding:6px 10px;cursor:pointer}'
    +'.dp-views button[aria-pressed="true"]{background:#636366;color:#fff;box-shadow:0 3px 8px rgba(0,0,0,.12)}'
    +'.dp-body{flex:1;overflow-y:auto;padding:10px 20px 30px}'
    +'.dp-load{padding:40px 10px;text-align:center;color:var(--ink-soft);font-size:.9rem}'
    /* lista: cada conteúdo é um cartão com a pecinha numerada na cor da fase */
    +'.dp-row{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;margin:8px 0;padding:12px 12px 12px 14px;border-radius:16px;'
    +  'background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);transition:transform .2s var(--ease),border-color .2s,background .2s}'
    +'.dp-row:hover{transform:translateX(-3px);background:rgba(255,255,255,.07);border-color:color-mix(in srgb,var(--evhue) 60%,transparent)}'
    +'.dp-row.dragging{opacity:.4}'
    +'.dp-row.over-top{box-shadow:inset 0 3px 0 -1px var(--accent)}'
    +'.dp-row.over-bottom{box-shadow:inset 0 -3px 0 -1px var(--accent)}'
    +'.dp-row.enter{animation:dpIn .5s cubic-bezier(.22,1,.36,1) backwards}'
    +'@keyframes dpIn{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:none}}'
    +'.dp-pill{position:relative;width:44px;height:40px;margin-top:6px;border-radius:8px;display:grid;place-items:center;font-size:1rem;font-weight:800;color:#fff;'
    +  'background:var(--evhue);background-image:linear-gradient(180deg,rgba(255,255,255,.28),rgba(255,255,255,0) 60%);'
    +  'box-shadow:inset 0 2px 0 rgba(255,255,255,.4),inset 0 -4px 0 rgba(0,0,0,.22),0 4px 0 -1px color-mix(in srgb,var(--evhue) 55%,#000)}'
    +'.dp-pill::before,.dp-pill::after{content:"";position:absolute;top:-6px;width:13px;height:6px;border-radius:3px 3px 0 0;'
    +  'background:color-mix(in srgb,var(--evhue) 80%,#fff);box-shadow:inset 0 1px 0 rgba(255,255,255,.5)}'
    +'.dp-pill::before{left:6px}.dp-pill::after{right:6px}'
    +'.dp-main{min-width:0}'
    +'.dp-fase{display:block;margin:0 0 3px;font-family:var(--mono);font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:color-mix(in srgb,var(--evhue) 65%,#fff)}'
    +'.dp-name{font-size:.95rem;font-weight:600;line-height:1.25;color:var(--ink)}'
    +'.dp-acts{display:flex;gap:4px}'
    +'.dp-ic{width:34px;height:34px;display:grid;place-items:center;border-radius:10px;border:0;padding:0;cursor:pointer;font:inherit;font-size:.85rem;'
    +  'background:transparent;color:var(--ink-soft);text-decoration:none;transition:background .2s,color .2s}'
    +'.dp-ic svg{width:15px;height:15px}'
    +'.dp-open{color:var(--ink);background:rgba(255,255,255,.08)}'
    +'.dp-open:hover{background:var(--evhue);color:#fff}'
    +'.dp-rm:hover{background:rgba(255,69,58,.18);color:#FF453A}'
    +'.dp-handle{cursor:grab;touch-action:none}'
    +'.dp-handle:hover{background:rgba(255,255,255,.08);color:var(--ink)}'
    +'.dp-handle svg{width:16px;height:16px;fill:currentColor}'
    +'.dp-ic:focus-visible{outline:2px solid var(--accent);outline-offset:2px}'
    +'.dp-empty{margin-top:30px;padding:44px 24px;border:1px dashed rgba(255,255,255,.16);border-radius:20px;text-align:center;color:var(--ink-soft)}'
    +'.dp-empty .ic{font-size:2.6rem;margin-bottom:10px}'
    +'.dp-empty p{margin:6px 0;font-size:.9rem;line-height:1.5}'
    +'.dp-empty b{color:var(--ink)}'
    /* skill tree: nós em zigue-zague ligados na ordem de estudo */
    +'.dp-tree{position:relative;margin:4px 0 20px;background:radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1.5px) 0 0/20px 20px}'
    +'.dp-lines{position:absolute;inset:0;width:100%;height:100%}'
    +'.dp-l{fill:none;stroke:rgba(255,255,255,.16);stroke-width:2;vector-effect:non-scaling-stroke;stroke-dasharray:5 6}'
    +'.dp-l.t0{stroke:var(--evhue);stroke-dasharray:none;filter:drop-shadow(0 0 5px var(--evhue))}'
    +'.dp-l.t1{stroke:var(--evhue);stroke-dasharray:6 6;animation:dpFlow 1s linear infinite}'
    +'@keyframes dpFlow{to{stroke-dashoffset:-12}}'
    +'.dp-root{position:absolute;left:50%;top:22px;transform:translate(-50%,-50%);z-index:1;font-family:var(--mono);font-size:.66rem;letter-spacing:.2em;text-transform:uppercase;'
    +  'color:#fff;background:#111;border:1px solid rgba(255,255,255,.14);border-radius:99px;padding:4px 12px}'
    +'.dp-node{position:absolute;translate:-50% -26px;width:46%;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}'
    +'.dp-node.enter{animation:dpPop .5s cubic-bezier(.3,1.6,.5,1) both}'
    +'@keyframes dpPop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:none}}'
    +'.dp-gem{width:52px;height:52px;flex:none;display:grid;place-items:center;font-weight:800;font-size:1.1rem;color:#12091f;'
    +  'clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);background:linear-gradient(160deg,#fff,var(--evhue));filter:drop-shadow(0 0 10px var(--evhue))}'
    +'.dp-gem svg{width:20px;height:20px}'
    +'.dp-node.t1 .dp-gem{background:linear-gradient(160deg,color-mix(in srgb,var(--evhue) 50%,#1c1c1e),#1c1c1e);color:#fff;animation:dpPulse 1.8s ease-in-out infinite}'
    +'@keyframes dpPulse{0%,100%{filter:drop-shadow(0 0 4px var(--evhue))}50%{filter:drop-shadow(0 0 16px var(--evhue))}}'
    +'.dp-node.t2 .dp-gem{background:#232326;color:rgba(255,255,255,.5);filter:none}'
    +'.dp-info{display:flex;flex-direction:column;gap:2px;align-items:center;background:rgba(22,22,24,.92);border-radius:10px;padding:3px 8px 5px}'
    +'.dp-info i{font-style:normal;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--evhue)}'
    +'.dp-node.t2 .dp-info i{color:var(--ink-faint)}'
    +'.dp-info b{font-size:.82rem;font-weight:600;line-height:1.2;color:var(--ink);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}'
    +'.dp-node.t2 .dp-info b{color:var(--ink-soft)}'
    +'.dp-act{display:flex;gap:10px;font-size:.72rem}'
    +'.dp-act a,.dp-act button{font:inherit;font-weight:600;color:var(--ink-soft);background:none;border:0;padding:0;cursor:pointer;text-decoration:none}'
    +'.dp-act a:hover{color:var(--evhue)}.dp-act button:hover{color:#FF453A}'
    /* aviso rápido do próprio painel */
    +'.dp-toast{position:fixed;left:50%;bottom:24px;z-index:200;transform:translate(-50%,10px);opacity:0;pointer-events:none;'
    +  'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Inter,Roboto,system-ui,Arial,sans-serif;font-size:.9rem;color:#f5f5f7;'
    +  'background:rgba(28,28,30,.96);border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:10px 16px;box-shadow:0 12px 30px rgba(0,0,0,.4);transition:opacity .25s,transform .25s}'
    +'.dp-toast.show{opacity:1;transform:translate(-50%,0)}'
    /* botão criado nas páginas que não têm o "Meu plano" no topo */
    +'.dp-btn{display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:.8rem;font-weight:500;letter-spacing:-.01em;color:#f5f5f7;'
    +  'background:transparent;border:0;border-radius:980px;padding:7px 12px;cursor:pointer;transition:background .2s}'
    +'.dp-btn:hover{background:rgba(255,255,255,.08)}'
    +'.dp-btn svg{width:16px;height:16px}'
    +'.dp-btn .plan-count{min-width:20px;height:20px;padding:0 6px;border-radius:999px;display:inline-grid;place-items:center;background:#B700FF;color:#fff;font-size:.7rem;font-weight:600}'
    +'.dp-btn .plan-count.zero{background:rgba(118,118,128,.24);color:#a1a1a6}'
    +'@media (max-width:560px){.dp-panel{width:100vw}}'
    +'@media (prefers-reduced-motion:reduce){.dp-row.enter,.dp-node.enter,.dp-l.t1,.dp-node.t1 .dp-gem{animation:none}.dp-panel,.dp-ov,.dp-row{transition:none}}';
  var st=document.createElement('style'); st.setAttribute('data-plan','');
  st.textContent=css; (document.head||document.documentElement).appendChild(st);

  /* ---------- painel ---------- */
  var ICO_PLAN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4.5" width="18" height="16" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>';
  var ICO_OPEN='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
  var ICO_GRIP='<svg viewBox="0 0 24 24"><circle cx="9" cy="6" r="1.6"/><circle cx="15" cy="6" r="1.6"/><circle cx="9" cy="12" r="1.6"/><circle cx="15" cy="12" r="1.6"/><circle cx="9" cy="18" r="1.6"/><circle cx="15" cy="18" r="1.6"/></svg>';
  var ICO_LOCK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var ov, panel, bodyEl, subEl, toastEl, toastT, lastFocus=null, view='list';
  try{ if(localStorage.getItem(VIEW_KEY)==='tree') view='tree'; }catch(e){}
  function esc(s){ return String(s).replace(/[&<>"]/g,function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement('div'); toastEl.className='dp-toast'; toastEl.setAttribute('role','status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML=msg; toastEl.classList.add('show');
    clearTimeout(toastT); toastT=setTimeout(function(){ toastEl.classList.remove('show'); },2400);
  }

  /* cores das fases: paleta do projeto, embaralhada a cada abertura */
  var PAL=['#B800E7','#1E5FC0','#0F766E','#8B2FC9','#D60A52','#C2410C','#0891B2','#3949AB','#D97706','#0078D4','#4D7C0F','#A21CAF','#15803D','#0E7490'];
  var pal=PAL.slice();
  function shuffle(){ pal=PAL.slice(); for(var i=pal.length-1;i>0;i--){ var j=Math.floor(Math.random()*(i+1)), t=pal[i]; pal[i]=pal[j]; pal[j]=t; } }
  shuffle();
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;

  function build(){
    if(panel) return;
    ov=document.createElement('div'); ov.className='dp-ov'; ov.hidden=true;
    panel=document.createElement('aside'); panel.className='dp-panel'; panel.id='planPanel';
    panel.setAttribute('role','dialog'); panel.setAttribute('aria-modal','true'); panel.setAttribute('aria-labelledby','dpTitle'); panel.setAttribute('aria-hidden','true');
    panel.innerHTML='<div class="dp-head"><div><h2 class="dp-title" id="dpTitle">🎯 Meu plano de estudos</h2><div class="dp-sub"></div></div>'
      +'<button class="dp-x" type="button" aria-label="Fechar plano"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></div>'
      +'<div class="dp-tools"><button class="dp-tool primary" type="button" data-act="download"><svg viewBox="0 0 24 24"><path d="M12 3v12M7 12l5 5 5-5M5 21h14"/></svg>Baixar plano (.md)</button>'
      +'<button class="dp-tool danger" type="button" data-act="reset"><svg viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 10v7M14 10v7"/></svg>Resetar estudos</button></div>'
      +'<div class="dp-views" role="group" aria-label="Visão do plano"><button type="button" data-view="list">Lista</button><button type="button" data-view="tree">Skill tree</button></div>'
      +'<div class="dp-body"></div>';
    document.body.appendChild(ov); document.body.appendChild(panel);
    bodyEl=panel.querySelector('.dp-body'); subEl=panel.querySelector('.dp-sub');
    ov.addEventListener('click',close);
    panel.querySelector('.dp-x').addEventListener('click',close);
    panel.addEventListener('click',onClick);
    bindDrag();
    syncView();
  }
  function syncView(){
    [].forEach.call(panel.querySelectorAll('.dp-views button'),function(b){ b.setAttribute('aria-pressed',String(b.getAttribute('data-view')===view)); });
  }

  function render(animate){
    if(!panel) return;
    var plan=load(), n=plan.length;
    subEl.textContent=n?(n+(n>1?' conteúdos':' conteúdo')+' no seu plano'):'Nenhum conteúdo adicionado ainda';
    if(!n){
      bodyEl.innerHTML='<div class="dp-empty"><div class="ic">📚</div><p><b>Seu plano está vazio</b></p>'
        +'<p>Use os botões de adicionar nas Guias, nos Roadmaps e nos Lesson packs para montar o seu plano de estudos.</p></div>';
      return;
    }
    if(typeof CATALOG==='undefined'){
      bodyEl.innerHTML='<p class="dp-load">Carregando o seu plano…</p>';
      ensureData(function(){ render(animate); });
      return;
    }
    var anim=animate&&!reduce;
    bodyEl.innerHTML=view==='tree'?tree(plan,anim):list(plan,anim);
  }
  function openLink(tk){
    var art=tk.k==='artigo';
    return '<a class="dp-ic dp-open" href="'+esc(tk.u)+'"'+(art?'':' target="_blank" rel="noopener"')+' draggable="false" '
      +'title="'+(art?'Ler artigo':'Ver na plataforma')+'" aria-label="'+(art?'Ler artigo: ':'Abrir na DIO: ')+esc(tk.t)+'">'+ICO_OPEN+'</a>';
  }
  function list(plan,anim){
    return plan.map(function(item,i){
      var tk=info(item.id), hue=pal[i%pal.length];
      return '<div class="dp-row'+(anim?' enter':'')+'" draggable="true" data-idx="'+i+'" style="--evhue:'+hue+(anim?';animation-delay:'+(i*70)+'ms':'')+'">'
        +'<div class="dp-pill" aria-hidden="true">'+(i+1)+'</div>'
        +'<div class="dp-main"><span class="dp-fase">Fase '+(i+1)+(TIPO[tk.k]?' · '+TIPO[tk.k]:'')+'</span><div class="dp-name">'+esc(tk.t)+'</div></div>'
        +'<div class="dp-acts">'+openLink(tk)
        +'<button class="dp-ic dp-rm" type="button" data-id="'+esc(item.id)+'" title="Remover" aria-label="Remover do plano: '+esc(tk.t)+'">✕</button>'
        +'<button class="dp-ic dp-handle" type="button" data-idx="'+i+'" title="Arraste para reordenar" aria-label="Reordenar (setas para cima e para baixo)">'+ICO_GRIP+'</button>'
        +'</div></div>';
    }).join('');
  }
  function tree(plan,anim){
    var ROW=132, TOP=66, n=plan.length, H=TOP+n*ROW+10, lines='', nodes='';
    function xOf(i){ return i%2?72:28; }
    function yOf(i){ return TOP+i*ROW+26; }
    plan.forEach(function(item,i){
      var tk=info(item.id), hue=pal[i%pal.length], t=i===0?'t0':(i===1?'t1':'t2');
      var x1=i?xOf(i-1):50, y1=i?yOf(i-1):22, x2=xOf(i), y2=yOf(i), my=(y1+y2)/2;
      lines+='<path class="dp-l '+t+'" d="M'+x1+' '+y1+' C'+x1+' '+my+' '+x2+' '+my+' '+x2+' '+y2+'" style="--evhue:'+hue+'"/>';
      nodes+='<div class="dp-node '+t+(anim?' enter':'')+'" style="--evhue:'+hue+';top:'+y2+'px;left:'+x2+'%'+(anim?';animation-delay:'+(120+i*90)+'ms':'')+'">'
        +'<span class="dp-gem">'+(i>1?ICO_LOCK:(i+1))+'</span>'
        +'<div class="dp-info"><i>'+(i===0?'Comece aqui':(i===1?'Próximo':'Fase '+(i+1)))+'</i><b>'+esc(tk.t)+'</b>'
        +'<span class="dp-act"><a href="'+esc(tk.u)+'"'+(tk.k==='artigo'?'':' target="_blank" rel="noopener"')+'>Abrir</a>'
        +'<button class="dp-rm" type="button" data-id="'+esc(item.id)+'">Remover</button></span></div></div>';
    });
    return '<div class="dp-tree" style="height:'+H+'px"><svg class="dp-lines" viewBox="0 0 100 '+H+'" preserveAspectRatio="none" aria-hidden="true">'+lines+'</svg>'
      +'<span class="dp-root">Você</span>'+nodes+'</div>';
  }

  function onClick(e){
    var v=e.target.closest('[data-view]');
    if(v){ view=v.getAttribute('data-view'); try{ localStorage.setItem(VIEW_KEY,view); }catch(err){} syncView(); render(true); return; }
    var rm=e.target.closest('.dp-rm');
    if(rm){ var rid=rm.getAttribute('data-id'); remove(/^\d+$/.test(rid)?parseInt(rid,10):rid); return; }
    var a=e.target.closest('[data-act]'); if(!a) return;
    if(a.getAttribute('data-act')==='download') download();
    else if(a.getAttribute('data-act')==='reset'){
      if(!load().length) return;
      if(window.confirm('Resetar todo o plano de estudos? Essa ação não pode ser desfeita.')){ save([]); changed(); }
    }
  }

  /* reordenar: arrastar (mouse) ou setas na alça (teclado) */
  function move(from,to){
    var p=load(); if(to<0||to>=p.length||from===to) return;
    var it=p.splice(from,1)[0]; p.splice(to,0,it); save(p); changed();
  }
  function bindDrag(){
    var drag=-1;
    function clear(){ [].forEach.call(bodyEl.querySelectorAll('.over-top,.over-bottom'),function(el){ el.classList.remove('over-top','over-bottom'); }); }
    bodyEl.addEventListener('dragstart',function(e){
      var row=e.target.closest('.dp-row'); if(!row) return;
      drag=parseInt(row.getAttribute('data-idx'),10); row.classList.add('dragging');
      try{ e.dataTransfer.effectAllowed='move'; e.dataTransfer.setData('text/plain',String(drag)); }catch(err){}
    });
    bodyEl.addEventListener('dragover',function(e){
      var row=e.target.closest('.dp-row'); if(!row||drag<0) return;
      e.preventDefault();
      var r=row.getBoundingClientRect(); clear(); row.classList.add((e.clientY-r.top)<r.height/2?'over-top':'over-bottom');
    });
    bodyEl.addEventListener('drop',function(e){
      var row=e.target.closest('.dp-row'); if(!row||drag<0) return;
      e.preventDefault();
      var t=parseInt(row.getAttribute('data-idx'),10), r=row.getBoundingClientRect(), at=(e.clientY-r.top)<r.height/2?t:t+1;
      if(drag<at) at--;
      clear(); var from=drag; drag=-1; move(from,at);
    });
    bodyEl.addEventListener('dragend',function(){ drag=-1; clear(); var d=bodyEl.querySelector('.dragging'); if(d) d.classList.remove('dragging'); });
    bodyEl.addEventListener('keydown',function(e){
      var h=e.target.closest('.dp-handle'); if(!h||(e.key!=='ArrowUp'&&e.key!=='ArrowDown')) return;
      e.preventDefault();
      var from=parseInt(h.getAttribute('data-idx'),10), to=from+(e.key==='ArrowUp'?-1:1);
      if(to<0||to>=load().length) return;
      move(from,to);
      var nh=bodyEl.querySelector('.dp-row[data-idx="'+to+'"] .dp-handle'); if(nh) nh.focus();
    });
  }

  /* baixar o plano como README.md */
  function download(){
    var plan=load();
    if(!plan.length){ toast('Seu plano está vazio 🙃'); return; }
    ensureData(function(){
      var n=plan.length, badge='https://img.shields.io/badge/%E2%96%B6%20Acessar%20meu%20conte%C3%BAdo-8A2BE2?style=for-the-badge';
      var md='# 🎯 Meu Plano de Estudos — DIO\n\n'
        +'![Conteúdos](https://img.shields.io/badge/Conte%C3%BAdos-'+n+'-8A2BE2?style=for-the-badge) '
        +'![Plataforma](https://img.shields.io/badge/Plataforma-DIO-A100FF?style=for-the-badge) '
        +'![Status](https://img.shields.io/badge/Status-Em%20andamento-1F9D55?style=for-the-badge)\n\n'
        +'> **🚀 Objetivo:** concluir estes '+n+' conteúdos na ordem abaixo, evoluindo do básico ao avançado na plataforma DIO.\n\n'
        +'| # | Conteúdo | Concluído | Acesso |\n|:--:|:--|:--:|:--:|\n';
      plan.forEach(function(item,i){
        var tk=info(item.id);
        md+='| '+(i+1)+' | '+String(tk.t).replace(/\|/g,'\\|')+' | ☐ | [![Acessar meu conteúdo]('+badge+')]('+tk.u+') |\n';
      });
      md+='\n---\n<sub>Gerado com 💜 pelo DIO Explorer · felipeaguiarcode.github.io/dio-explorer</sub>\n';
      var url=URL.createObjectURL(new Blob([md],{type:'text/markdown;charset=utf-8'}));
      var a=document.createElement('a'); a.href=url; a.download='README.md';
      document.body.appendChild(a); a.click(); a.parentNode.removeChild(a);
      setTimeout(function(){ URL.revokeObjectURL(url); },1000);
      toast('<b>README.md</b> do seu plano baixado 📥');
    });
  }

  /* ---------- abrir e fechar ---------- */
  function open(){
    build(); shuffle(); render(true);
    lastFocus=document.activeElement;
    ov.hidden=false;
    requestAnimationFrame(function(){ ov.classList.add('show'); panel.classList.add('show'); });
    panel.setAttribute('aria-hidden','false'); document.body.classList.add('dp-open');
    setTimeout(function(){ var x=panel.querySelector('.dp-x'); if(x) x.focus(); },60);
  }
  function close(){
    if(!panel||!panel.classList.contains('show')) return;
    ov.classList.remove('show'); panel.classList.remove('show');
    panel.setAttribute('aria-hidden','true'); document.body.classList.remove('dp-open');
    setTimeout(function(){ if(!panel.classList.contains('show')) ov.hidden=true; },300);
    if(lastFocus&&lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&panel&&panel.classList.contains('show')) close(); });

  /* ---------- botão e contador do topo ---------- */
  function syncCount(){
    var n=load().length;
    [].forEach.call(document.querySelectorAll('#planCount'),function(el){ el.textContent=n; el.classList.toggle('zero',!n); });
  }
  function hookButton(){
    var b=document.getElementById('planBtn');
    if(!b){
      var bar=document.querySelector('.topbar .topbar-in'); if(!bar) return;
      b=document.createElement('button'); b.type='button'; b.id='planBtn'; b.className='dp-btn';
      b.innerHTML=ICO_PLAN+'Meu plano <span class="plan-count zero" id="planCount">0</span>';
      bar.appendChild(b);
    }
    if(b.tagName==='A'){ b.setAttribute('role','button'); b.removeAttribute('title'); }
    b.setAttribute('aria-haspopup','dialog');
    b.addEventListener('click',function(e){ e.preventDefault(); open(); });
  }

  /* qualquer mudança (deste painel, da página ou de outra aba) atualiza contador e lista */
  window.addEventListener(EVT,function(){ syncCount(); if(panel&&panel.classList.contains('show')) render(false); });
  window.addEventListener('storage',function(e){ if(e.key===KEY) changed(); });

  function set(p){ save(Array.isArray(p)?p:[]); changed(); }
  window.DioPlan={open:open,close:close,list:load,has:has,add:add,remove:remove,toggle:toggle,set:set,refresh:changed};

  function init(){
    hookButton(); syncCount();
    if(/[#&]plano\b/.test(location.hash)) setTimeout(open,120);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
