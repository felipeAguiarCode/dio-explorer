/* =====================================================================
   catalog.js — junta os arquivos de data/ num catálogo único.
   Carregue depois de data/*.js e antes de paths/*.js e do script da página:
     <script src="data/tracks.js"></script>   ... (todos os de data/, inclusive articles.js)
     <script src="js/catalog.js"></script>
   Expõe:
     TRACKS[id] = {t, u, k, ancora}   k = 'formacao' | 'certificacao' | 'projeto' | 'curso' | 'mentoria' | 'artigo'
                                      (artigos trazem também tag, min e sub)
     ORI[id]    = [nome, desenho]     origami do conteúdo (quando tem)
     tipoDe(id), oriRender(desenho), oriSvg(id)

   Mini-linguagem dos origamis (viewBox 24×24), formas separadas por "|":
     a b c d   plano de papel, do mais claro ao mais escuro (luz vindo de cima/esquerda);
               " M " dentro da forma abre um furo (fill-rule evenodd)
     o x,y r   círculo cheio           k x,y r   olho/furo na cor de fundo
     x ...     polígono na cor de fundo
     l ...     vinco/pata (traço)      m ...     traço na cor de fundo
   ===================================================================== */
/* raiz do site, descoberta pelo endereço deste arquivo (…/js/catalog.js): links internos do
   catálogo, como os artigos do blog, ficam certos tanto na home quanto nas páginas de pages/ */
var SITE_ROOT=(function(){
  var cs=typeof document!=='undefined'&&document.currentScript;
  return cs&&cs.src?cs.src.replace(/js\/catalog\.js(\?.*)?$/,''):'';
})();
function siteUrl(u){ return !u||/^([a-z]+:|\/\/)/i.test(u)?u:SITE_ROOT+u; }
var TRACKS={}, ORI={};
(function(){
  function add(src,tipo){
    Object.keys(src||{}).forEach(function(k){
      var id=+k, it=src[k];
      if(TRACKS[id]) console.warn('[catalogo] id '+id+' repetido em '+tipo+' (já era '+TRACKS[id].k+')');
      TRACKS[id]={t:it.t,u:siteUrl(it.u),k:tipo,ancora:it.ancora,tag:it.tag,min:it.min,sub:it.sub};
      if(it.ori) ORI[id]=it.ori;
    });
  }
  add(window.FORMACOES,'formacao');
  add(window.CERTIFICACOES,'certificacao');
  add(window.PROJETOS,'projeto');
  add(window.CURSOS,'curso');
  add(window.ARTIGOS,'artigo');
  /* mentorias entram no catálogo só quando têm id (as usadas como passo de trilha) */
  (window.MENTORIAS||[]).forEach(function(m){
    if(m.id==null) return;
    if(TRACKS[m.id]) console.warn('[catalogo] id '+m.id+' repetido em mentoria');
    TRACKS[m.id]={t:m.t,u:'https://web.dio.me/lives/'+m.s,k:'mentoria'};
  });
})();

function tipoDe(id){ return TRACKS[id]?TRACKS[id].k:'formacao'; }

var ORI_OP={a:1,b:.74,c:.5,d:.3}, ORI_CACHE={};
/* desenha qualquer origami escrito na mini-linguagem */
function oriRender(src){
  var inner=src.split('|').map(function(s){
    s=s.trim(); var k=s.charAt(0), r=s.slice(1).trim();
    if(k==='k'||k==='o'){ var p=r.split(/[ ,]+/); return '<circle'+(k==='k'?' class="ok"':'')+' cx="'+p[0]+'" cy="'+p[1]+'" r="'+(p[2]||1)+'"/>'; }
    if(k==='l'||k==='m') return '<path class="ol'+(k==='m'?' om':'')+'" d="M'+r+'"/>';
    if(k==='x') return '<path class="ok" d="M'+r+'Z"/>';
    return '<path fill-rule="evenodd" fill-opacity="'+ORI_OP[k]+'" d="M'+r.replace(/ M /g,'Z M')+'Z"/>';
  }).join('');
  return '<svg viewBox="0 0 24 24" fill="currentColor">'+inner+'</svg>';
}
/* origami de um conteúdo do catálogo (por id), com cache */
function oriSvg(id){
  return ORI_CACHE[id]||(ORI_CACHE[id]=oriRender(ORI[id][1]));
}
