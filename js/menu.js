/* =====================================================================
   menu.js — menu hambúrguer do celular (≤ 640px), igual em todas as abas.
   Carregue no <head> (sem defer): o estilo entra antes da página aparecer,
   e o botão é montado a partir dos links que já estão em <nav class="tabs">.
   No celular: as abas somem, o hambúrguer fica no canto direito do topo e o
   botão "Meu plano" fica oculto.
   ===================================================================== */
(function(){
  var BP=640;
  var css=''
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

  var BARS='<svg class="mm-bars" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
  var X='<svg class="mm-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  function build(){
    var bar=document.querySelector('.topbar .topbar-in'), tabs=bar&&bar.querySelector('.tabs');
    if(!bar||!tabs||bar.querySelector('.mm-btn')) return;
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
