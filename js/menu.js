/* =====================================================================
   menu.js — topo comum a todas as abas (Guias, Roadmaps, Mentorias, Blog).
   Carregue no <head> (sem defer): o estilo entra antes da página aparecer,
   e o botão do celular é montado a partir dos links de <nav class="tabs">.
   Desktop: logo grudado à esquerda e abas como links simples (sem fundo,
   fonte fina, logo depois do logo); "Meu plano" segue no canto direito.
   Celular (≤ 640px): as abas viram um menu hambúrguer no canto direito e o
   botão "Meu plano" fica oculto.
   ===================================================================== */
(function(){
  var BP=640;
  var css=''
    /* topo em largura total: logo na borda esquerda, como de costume */
    +':root .topbar .topbar-in{max-width:none;padding-left:24px;padding-right:24px}'
    /* abas: links simples, sem o fundo de pílula, fonte fina, colados ao logo */
    +':root .topbar .tabs{background:transparent;padding:0;gap:2px;border-radius:0;margin-left:10px}'
    +':root .topbar .tab{position:relative;background:transparent;box-shadow:none;border-radius:6px;padding:6px 12px;'
    +  'font-size:.9rem;font-weight:300;letter-spacing:0;color:rgba(245,245,247,.72);transition:color .2s}'
    +':root .topbar .tab:hover{background:transparent;color:#fff}'
    +':root .topbar .tab[aria-current="page"]{background:transparent;box-shadow:none;color:#fff;font-weight:500}'
    +':root .topbar .tab-ext{display:inline-flex;align-items:center;gap:4px}'
    +':root .topbar .tab-ext .ext-ic{width:12px;height:12px;opacity:.7}'
    +':root .topbar .tab[aria-current="page"]::after{content:"";position:absolute;left:12px;right:12px;bottom:-2px;height:2px;border-radius:2px;background:#BF5AF2}'
    +'.mm-btn{display:none;flex:none;width:38px;height:38px;margin-left:2px;padding:0;border:0;border-radius:10px;place-items:center;'
    +  'background:transparent;color:#f5f5f7;cursor:pointer;transition:background .2s}'
    +'.mm-btn:hover{background:rgba(255,255,255,.08)}'
    +'.mm-btn:focus-visible{outline:3px solid rgba(191,90,242,.7);outline-offset:2px}'
    +'.mm-btn svg{width:22px;height:22px}'
    +'.mm-btn .mm-x,.mm-btn[aria-expanded="true"] .mm-bars{display:none}'
    +'.mm-btn[aria-expanded="true"] .mm-x{display:block}'
    +'.mm-panel{position:fixed;left:0;right:0;top:53px;z-index:90;padding:8px 14px 14px;'
    +  'background:rgba(18,18,20,.97);-webkit-backdrop-filter:saturate(180%) blur(24px);backdrop-filter:saturate(180%) blur(24px);'
    +  'border-bottom:1px solid rgba(255,255,255,.1);box-shadow:0 18px 40px rgba(0,0,0,.45);'
    +  'font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue","Segoe UI",Inter,Roboto,system-ui,Arial,sans-serif;'
    +  'animation:mmIn .18s ease-out}'
    +'.mm-panel[hidden]{display:none}'
    +'@keyframes mmIn{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}'
    +'.mm-panel a{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 12px;border-radius:12px;'
    +  'color:#f5f5f7;text-decoration:none;font-size:1.05rem;font-weight:600;letter-spacing:-.01em}'
    +'.mm-panel a:hover{background:rgba(255,255,255,.06)}'
    +'.mm-panel a.mm-ext{justify-content:flex-start;gap:8px}'
    +'.mm-panel .ext-ic{width:14px;height:14px;opacity:.7}'
    +'.mm-panel a[aria-current="page"]{background:rgba(255,255,255,.1)}'
    +'.mm-panel a[aria-current="page"]::after{content:"";width:8px;height:8px;border-radius:50%;background:#BF5AF2;box-shadow:0 0 0 4px rgba(191,90,242,.25)}'
    +'@media (max-width:'+BP+'px){'
    +  '.topbar .topbar-in{flex-wrap:nowrap}'
    +  '.topbar-in>.tabs{display:none}'
    +  '.topbar-in>#planBtn{display:none}'
    +  '.mm-btn{display:inline-grid}'
    +'}'
    +'@media (prefers-reduced-motion:reduce){.mm-panel{animation:none}}';
  var st=document.createElement('style');
  st.setAttribute('data-menu','mobile');
  st.textContent=css;
  (document.head||document.documentElement).appendChild(st);

  var JOBS_URL='https://web.dio.me/ai-job-hunter';
  var EXT='<svg class="ext-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';
  var BARS='<svg class="mm-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var X='<svg class="mm-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function build(){
    var bar=document.querySelector('.topbar .topbar-in'), tabs=bar&&bar.querySelector('.tabs');
    if(!bar||!tabs||bar.querySelector('.mm-btn')) return;
    /* link externo "Vagas abertas": último item do menu, abre em outra aba */
    if(!tabs.querySelector('.tab-ext')){
      var jobs=document.createElement('a');
      jobs.className='tab tab-ext'; jobs.href=JOBS_URL; jobs.target='_blank'; jobs.rel='noopener';
      jobs.innerHTML='Vagas abertas'+EXT;
      tabs.appendChild(jobs);
    }
    var btn=document.createElement('button');
    btn.className='mm-btn'; btn.type='button';
    btn.setAttribute('aria-label','Abrir menu'); btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-controls','mmPanel');
    btn.innerHTML=BARS+X;
    var panel=document.createElement('nav');
    panel.className='mm-panel'; panel.id='mmPanel'; panel.hidden=true;
    panel.setAttribute('aria-label','Páginas do guia');
    [].forEach.call(tabs.querySelectorAll('a'),function(a){
      var l=document.createElement('a');
      l.href=a.getAttribute('href'); l.textContent=a.textContent;
      if(a.getAttribute('aria-current')) l.setAttribute('aria-current',a.getAttribute('aria-current'));
      if(a.target){ l.target=a.target; l.rel='noopener'; l.className='mm-ext'; l.insertAdjacentHTML('beforeend',EXT); }
      panel.appendChild(l);
    });
    bar.appendChild(btn);
    document.body.appendChild(panel);

    function open(){
      var top=document.querySelector('.topbar').getBoundingClientRect().bottom;
      panel.style.top=Math.max(0,Math.round(top))+'px';
      panel.hidden=false; btn.setAttribute('aria-expanded','true'); btn.setAttribute('aria-label','Fechar menu');
      var first=panel.querySelector('a'); if(first) first.focus();
    }
    function close(back){
      if(panel.hidden) return;
      panel.hidden=true; btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-label','Abrir menu');
      if(back) btn.focus();
    }
    btn.addEventListener('click',function(e){ e.stopPropagation(); panel.hidden?open():close(false); });
    document.addEventListener('click',function(e){ if(!panel.hidden&&!panel.contains(e.target)&&e.target!==btn) close(false); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') close(true); });
    window.addEventListener('resize',function(){ if(window.innerWidth>BP) close(false); });
    panel.addEventListener('click',function(e){ if(e.target.closest('a')) close(false); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',build); else build();
})();
