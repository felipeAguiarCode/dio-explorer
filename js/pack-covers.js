/* =====================================================================
   PACK COVERS — capas animadas sobre IA para os conteúdos sem capa dos lesson packs.
   Na página de um pack (pages/roadmap.html), todo item sem img ganha uma destas 20
   variantes, pintada com a cor do pack. A variante sai do id do conteúdo (o mesmo
   conteúdo tem sempre a mesma capa) e pula as que o pack já usou, para a lista não
   repetir capa.
   Cada variante é function(c,k) e devolve o miolo de um SVG 320×180:
     c  cor do pack      k  prefixo único dos ids de gradiente, padrão e recorte
   As animações são as classes pa-* do CSS da arte dos packs (.ev-svg, em roadmap.html).
   Deixe o desenho entre y 25 e 155 (a capa de curso é mais larga e corta o alto e o pé)
   e o canto de cima à esquerda livre (é onde fica o número do item).
   ===================================================================== */
var PACK_COVERS=(function(){
  var W='#fff', MONO='ui-monospace,Menlo,Consolas,monospace', SANS='ui-sans-serif,system-ui,Arial';
  function r1(v){ return Math.round(v*10)/10; }
  function dl(s){ return ' style="animation-delay:'+r1(s)+'s"'; }
  function line(x1,y1,x2,y2,a){ return '<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'"'+a+'/>'; }
  /* fundo: preto, pontinhos e o brilho da cor do pack em (x%, y%) */
  function bg(c,k,x,y){
    return '<defs><radialGradient id="'+k+'g" cx="'+x+'%" cy="'+y+'%" r="65%">'
      +'<stop offset="0" stop-color="'+c+'" stop-opacity=".6"/><stop offset=".6" stop-color="'+c+'" stop-opacity=".12"/>'
      +'<stop offset="1" stop-color="'+c+'" stop-opacity="0"/></radialGradient>'
      +'<pattern id="'+k+'d" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#fff" fill-opacity=".1"/></pattern></defs>'
      +'<rect width="320" height="180" fill="#0c0c11"/><rect width="320" height="180" fill="url(#'+k+'d)"/><rect width="320" height="180" fill="url(#'+k+'g)"/>';
  }
  /* brilho de 4 pontas (o símbolo da IA) com centro em x,y e raio r; a = atributos extras */
  function star(x,y,r,a){
    var q=r*.14;
    return '<path d="M'+x+' '+r1(y-r)+'Q'+r1(x+q)+' '+r1(y-q)+' '+r1(x+r)+' '+y+'Q'+r1(x+q)+' '+r1(y+q)+' '+x+' '+r1(y+r)
      +'Q'+r1(x-q)+' '+r1(y+q)+' '+r1(x-r)+' '+y+'Q'+r1(x-q)+' '+r1(y-q)+' '+x+' '+r1(y-r)+'Z"'+(a||'')+'/>';
  }

  /* 1. rede neural: sinais correndo de camada em camada */
  function rede(c,k){
    var a=[[86,52],[86,90],[86,128]], b=[[146,36],[146,72],[146,108],[146,144]], o=[[206,70],[206,110]];
    var s=bg(c,k,55,50), n='';
    a.forEach(function(p,i){ b.forEach(function(q,j){
      var on=(i+j)%3===0;
      s+=line(p[0],p[1],q[0],q[1],(on?' class="pa-flow"':'')+' stroke="'+(on?c:W)+'" stroke-opacity="'+(on?1:.18)+'" stroke-width="'+(on?2.6:1.6)+'" stroke-linecap="round"');
    }); });
    b.forEach(function(q,j){
      o.forEach(function(p){ s+=line(q[0],q[1],p[0],p[1],' class="pa-flow" stroke="'+c+'" stroke-width="2.2" stroke-linecap="round"'); });
      n+='<circle class="pa-pulse"'+dl(-j*.5)+' cx="'+q[0]+'" cy="'+q[1]+'" r="8" fill="'+c+'" stroke="'+W+'" stroke-opacity=".6" stroke-width="2"/>';
    });
    a.forEach(function(p,i){ n+='<circle class="pa-dot"'+dl(i*.3)+' cx="'+p[0]+'" cy="'+p[1]+'" r="7" fill="'+W+'"/>'; });
    o.forEach(function(p,i){
      n+='<circle class="pa-ping"'+dl(-i*1.2)+' cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="none" stroke="'+c+'" stroke-width="2"/>'
        +'<circle cx="'+p[0]+'" cy="'+p[1]+'" r="11" fill="'+c+'" stroke="'+W+'" stroke-width="2"/>';
    });
    return s+n+star(250,90,15,' class="pa-tw" fill="'+W+'"')+star(262,44,7,' class="pa-tw"'+dl(-1.2)+' fill="'+c+'"');
  }

  /* 2. chat: a conversa aparecendo, com a IA digitando */
  function chat(c,k){
    function bub(x,y,w,f,op,d,extra){
      return '<g class="pa-pop"'+dl(d)+'><rect x="'+x+'" y="'+y+'" width="'+w+'" height="20" rx="10" fill="'+f+'" fill-opacity="'+op+'"/>'+(extra||'')+'</g>';
    }
    var dots='';
    [0,1,2].forEach(function(j){ dots+='<circle class="pa-dot"'+dl(j*.2)+' cx="'+(106+j*11)+'" cy="128" r="3" fill="'+W+'"/>'; });
    return bg(c,k,45,40)
      +'<rect x="76" y="26" width="168" height="128" rx="16" fill="'+W+'" fill-opacity=".06" stroke="'+W+'" stroke-opacity=".2" stroke-width="1.5"/>'
      +bub(146,40,84,W,.85,0)+bub(90,66,116,c,1,.6)+bub(90,92,86,c,.65,1.2)+bub(90,118,50,c,.45,1.8,dots)
      +star(264,46,12,' class="pa-tw" fill="'+c+'"')+star(56,128,8,' class="pa-tw"'+dl(-1.3)+' fill="'+W+'"');
  }

  /* 3. chip: o processador de IA com sinais correndo pelas trilhas */
  function chip(c,k){
    var s=bg(c,k,50,50), pins='', ends='';
    [136,148,160,172,184].forEach(function(v){ pins+='M'+v+' 58V50M'+v+' 122V130M128 '+(v-70)+'H120M192 '+(v-70)+'H200'; });
    [['M120 78H98L86 66H68',1,68,66],['M120 102H92L82 112H64',0,64,112],['M200 78H222L234 66H252',0,252,66],
     ['M200 102H226L236 112H256',1,256,112],['M200 90H266',1,266,90],['M172 50V40L182 30H198',1,198,30],
     ['M148 50V30',0,148,30],['M148 130V140L138 150H122',1,122,150],['M172 130V150',0,172,150]]
    .forEach(function(t,j){
      s+='<path'+(t[1]?' class="pa-flow"':'')+' d="'+t[0]+'" fill="none" stroke="'+(t[1]?c:W)+'" stroke-opacity="'+(t[1]?1:.25)+'" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>';
      ends+=t[1]?'<circle class="pa-dot"'+dl(j*.15)+' cx="'+t[2]+'" cy="'+t[3]+'" r="4.5" fill="'+c+'"/>'
        :'<circle cx="'+t[2]+'" cy="'+t[3]+'" r="4" fill="none" stroke="'+W+'" stroke-opacity=".5" stroke-width="2"/>';
    });
    return s+'<path d="'+pins+'" stroke="'+W+'" stroke-opacity=".65" stroke-width="2.6" stroke-linecap="round"/>'+ends
      +'<g class="pa-pulse"><rect x="128" y="58" width="64" height="64" rx="12" fill="'+c+'"/>'
      +'<rect x="138" y="68" width="44" height="44" rx="8" fill="#0c0c11" fill-opacity=".45"/>'
      +'<text x="160" y="97" text-anchor="middle" font-family="'+SANS+'" font-size="20" font-weight="800" fill="'+W+'">IA</text></g>';
  }

  /* 4. tokens: o modelo escrevendo a resposta, um token de cada vez */
  function tokens(c,k){
    var rows=[[[34,c,1],[22,W,.7],[44,c,.7],[30,W,.45]],[[28,W,.7],[48,c,1],[30,c,.6],[22,W,.45]],[[40,c,1],[26,W,.7]]];
    var s=bg(c,k,55,45)+'<rect x="60" y="30" width="200" height="120" rx="14" fill="'+W+'" fill-opacity=".05" stroke="'+W+'" stroke-opacity=".2" stroke-width="1.5"/>';
    var n=0, x=76;
    rows.forEach(function(r,j){
      x=76;
      r.forEach(function(t){
        s+='<rect class="pa-pop"'+dl(n++*.22)+' x="'+x+'" y="'+(52+j*28)+'" width="'+t[0]+'" height="16" rx="8" fill="'+t[1]+'" fill-opacity="'+t[2]+'"/>';
        x+=t[0]+6;
      });
    });
    return s+'<rect class="pa-dot" x="'+x+'" y="108" width="8" height="16" rx="2" fill="'+W+'"/>'
      +'<circle cx="252" cy="34" r="13" fill="'+c+'" stroke="#0c0c11" stroke-width="3"/>'+star(252,34,8,' class="pa-spin pa-slow" fill="'+W+'"');
  }

  /* 5. órbitas: o núcleo da IA com sinais girando em três órbitas */
  function orbita(c,k){
    var s=bg(c,k,50,50);
    [0,60,-60].forEach(function(a,j){
      var e=' cx="160" cy="90" rx="78" ry="26" transform="rotate('+a+' 160 90)" fill="none"';
      s+='<ellipse'+e+' stroke="'+W+'" stroke-opacity=".2" stroke-width="1.6"/>'
        +'<ellipse class="pa-orbit"'+dl(-j*1.1)+e+' pathLength="100" stroke="'+(j===1?W:c)+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 94"/>';
    });
    return s+'<circle class="pa-ping" cx="160" cy="90" r="20" fill="none" stroke="'+c+'" stroke-width="2"/>'
      +'<circle class="pa-pulse" cx="160" cy="90" r="20" fill="'+c+'"/>'+star(160,90,11,' fill="'+W+'"');
  }

  /* 6. voz: a onda de áudio de um assistente falando */
  function voz(c,k){
    var s=bg(c,k,50,50)+line(56,90,264,90,' stroke="'+W+'" stroke-opacity=".15" stroke-width="1.5"'), n=22;
    for(var j=0;j<n;j++){
      var env=Math.sin(Math.PI*(j+.5)/n), h=r1(12+env*(36+34*Math.abs(Math.sin(j*1.9))));
      s+='<rect class="pa-bar"'+dl(-(j*.13)%1.1)+' x="'+r1(68+j*8.6)+'" y="'+r1(90-h/2)+'" width="4.6" height="'+h+'" rx="2.3" fill="'+(j%4===1?W:c)+'"/>';
    }
    return s+star(262,44,10,' class="pa-tw" fill="'+W+'"')+star(58,134,7,' class="pa-tw"'+dl(-1.1)+' fill="'+c+'"');
  }

  /* 7. visão computacional: a IA varrendo a imagem e marcando o que reconhece */
  function visao(c,k){
    return bg(c,k,62,40)
      +'<defs><clipPath id="'+k+'c"><rect x="70" y="30" width="180" height="120" rx="12"/></clipPath></defs>'
      +'<rect x="70" y="30" width="180" height="120" rx="12" fill="'+W+'" fill-opacity=".05"/>'
      +'<g clip-path="url(#'+k+'c)"><circle cx="206" cy="62" r="12" fill="'+W+'" fill-opacity=".6"/>'
      +'<path d="M70 150L118 88L146 118L174 94L250 150Z" fill="'+c+'" fill-opacity=".5"/>'
      +'<path d="M150 150L200 108L250 150Z" fill="'+c+'" fill-opacity=".85"/>'
      +'<g class="pa-scan"><rect x="70" y="22" width="180" height="14" fill="'+c+'" fill-opacity=".2"/>'
      +line(70,36,250,36,' stroke="'+c+'" stroke-width="2.5"')+'</g></g>'
      +'<rect x="70" y="30" width="180" height="120" rx="12" fill="none" stroke="'+W+'" stroke-opacity=".22" stroke-width="1.5"/>'
      +'<g class="pa-pop"><rect x="188" y="44" width="36" height="36" rx="4" fill="none" stroke="'+c+'" stroke-width="2.4"/>'
      +'<rect x="188" y="36" width="20" height="8" rx="2" fill="'+c+'"/></g>'
      +'<g class="pa-pop"'+dl(.7)+'><rect x="98" y="80" width="84" height="62" rx="4" fill="none" stroke="'+W+'" stroke-width="2.4"/>'
      +'<rect x="98" y="72" width="26" height="8" rx="2" fill="'+W+'"/></g>';
  }

  /* 8. brilhos: o símbolo da IA generativa pulsando entre faíscas */
  function brilhos(c,k){
    return bg(c,k,50,50)
      +'<circle class="pa-spin pa-slow" cx="160" cy="90" r="62" fill="none" stroke="'+W+'" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="2 8"/>'
      +'<circle class="pa-ping" cx="160" cy="90" r="28" fill="none" stroke="'+c+'" stroke-width="2"/>'
      +'<g class="pa-pulse">'+star(160,90,46,' fill="'+c+'"')+star(160,90,20,' fill="'+W+'" fill-opacity=".9"')+'</g>'
      +star(226,46,15,' class="pa-tw" fill="'+W+'"')+star(100,128,11,' class="pa-tw"'+dl(-1)+' fill="'+W+'"')
      +star(236,128,9,' class="pa-tw"'+dl(-.5)+' fill="'+c+'"')+star(94,54,8,' class="pa-tw"'+dl(-1.8)+' fill="'+c+'"')
      +star(272,90,6,' class="pa-tw"'+dl(-2.2)+' fill="'+W+'"');
  }

  /* 9. grafo de conhecimento: ideias ligadas, com a informação circulando */
  function grafo(c,k){
    var p=[[160,90],[100,56],[108,128],[214,46],[238,116],[174,146],[64,96],[272,70],[150,34],[212,88]];
    var e=[[0,1],[0,2],[0,3],[0,5],[0,9],[1,6],[2,6],[3,7],[4,7],[1,8],[3,8],[4,5],[9,4],[9,3],[2,5]];
    var s=bg(c,k,50,50), n='';
    e.forEach(function(x,j){
      var a=p[x[0]], b=p[x[1]], on=j%3===0;
      s+=line(a[0],a[1],b[0],b[1],(on?' class="pa-flow'+(j%2?' pa-back':'')+'"':'')+' stroke="'+(on?c:W)+'" stroke-opacity="'+(on?1:.25)+'" stroke-width="'+(on?2.4:1.8)+'" stroke-linecap="round"');
    });
    p.forEach(function(q,j){
      if(j) n+='<circle class="pa-dot"'+dl(j*.17)+' cx="'+q[0]+'" cy="'+q[1]+'" r="'+(j%3?6:8)+'" fill="'+(j%3?W:c)+'"/>';
    });
    return s+n+'<circle class="pa-ping" cx="160" cy="90" r="13" fill="none" stroke="'+c+'" stroke-width="2"/>'
      +'<circle class="pa-pulse" cx="160" cy="90" r="13" fill="'+c+'" stroke="'+W+'" stroke-width="2"/>';
  }

  /* 10. prompt: a pergunta no terminal e a resposta da IA chegando */
  function prompt(c,k){
    var s='';
    [[94,150,c,1],[108,168,W,.5],[122,110,W,.5]].forEach(function(l,j){
      s+='<rect class="pa-pop"'+dl(.4+j*.5)+' x="76" y="'+l[0]+'" width="'+l[1]+'" height="8" rx="4" fill="'+l[2]+'" fill-opacity="'+l[3]+'"/>';
    });
    return bg(c,k,55,45)
      +'<rect x="60" y="30" width="200" height="120" rx="12" fill="#111117" fill-opacity=".85" stroke="'+W+'" stroke-opacity=".2" stroke-width="1.5"/>'
      +'<circle cx="76" cy="46" r="4" fill="#ff5f57"/><circle cx="88" cy="46" r="4" fill="#febc2e"/><circle cx="100" cy="46" r="4" fill="#28c840"/>'
      +star(242,46,8,' class="pa-spin pa-slow" fill="'+c+'"')
      +'<text x="76" y="77" font-family="'+MONO+'" font-size="15" font-weight="700" fill="'+c+'">&gt;</text>'
      +'<rect x="92" y="68" width="118" height="8" rx="4" fill="'+W+'" fill-opacity=".8"/>'
      +s+'<rect class="pa-dot" x="192" y="119" width="7" height="13" rx="1.5" fill="'+W+'"/>';
  }

  /* 11. matriz: os números da rede acendendo em ondas */
  function matriz(c,k){
    var s=bg(c,k,55,50);
    for(var i=0;i<15;i++) for(var j=0;j<8;j++){
      var hot=(i*3+j*5)%7===0;
      s+='<circle class="pa-dot"'+dl(-((i+j)*.09)%1.2)+' cx="'+(55+i*15)+'" cy="'+(37+j*15)+'" r="'+(hot?3.6:2.4)+'" fill="'+(hot?c:W)+'"/>';
    }
    return s+'<rect class="pa-pop" x="137" y="59" width="46" height="46" rx="8" fill="'+c+'" fill-opacity=".15" stroke="'+c+'" stroke-width="2.4"/>';
  }

  /* 12. vetores: embeddings agrupados por sentido, com a busca chegando perto */
  function vetores(c,k){
    var cl=[[112,114,c],[192,62,W],[234,116,c]], off=[[0,0],[-12,-8],[10,-10],[14,6],[-8,12],[-16,4],[6,14]];
    var s=bg(c,k,55,55)+'<path d="M64 30V148H272" fill="none" stroke="'+W+'" stroke-opacity=".3" stroke-width="1.8" stroke-linecap="round"/>';
    cl.forEach(function(q,j){
      s+='<path class="pa-draw"'+dl(j*.4)+' pathLength="320" d="M64 148L'+q[0]+' '+q[1]+'" fill="none" stroke="'+q[2]+'" stroke-opacity=".45" stroke-width="1.8" stroke-linecap="round"/>';
      var g='<g class="pa-float"'+dl(-j*1.3)+'><circle class="pa-spin" cx="'+q[0]+'" cy="'+q[1]+'" r="25" fill="none" stroke="'+q[2]+'" stroke-opacity=".5" stroke-width="1.6" stroke-dasharray="3 5"/>';
      off.forEach(function(o,i){ g+='<circle cx="'+(q[0]+o[0])+'" cy="'+(q[1]+o[1])+'" r="'+(i?3.6:5.2)+'" fill="'+q[2]+'" fill-opacity="'+(i?.75:1)+'"/>'; });
      s+=g+'</g>';
    });
    return s+star(158,96,10,' class="pa-tw" fill="'+W+'"');
  }

  /* 13. robô: o agente de IA piscando, com as ferramentas em órbita */
  function robo(c,k){
    return bg(c,k,50,50)
      +'<circle class="pa-spin pa-rev" cx="160" cy="92" r="62" fill="none" stroke="'+W+'" stroke-opacity=".22" stroke-width="1.6" stroke-dasharray="3 8"/>'
      +'<g class="pa-spin" style="animation-duration:12s"><circle cx="160" cy="92" r="68" fill="none"/>'
      +'<circle cx="222" cy="92" r="6" fill="'+W+'"/><circle cx="129" cy="38.3" r="5.5" fill="'+c+'" stroke="'+W+'" stroke-width="1.6"/>'
      +'<circle cx="129" cy="145.7" r="4.5" fill="'+W+'" fill-opacity=".7"/></g>'
      +'<g class="pa-float">'+line(160,64,160,52,' stroke="'+W+'" stroke-width="2.6" stroke-linecap="round"')
      +'<circle class="pa-pulse" cx="160" cy="48" r="5" fill="'+c+'" stroke="'+W+'" stroke-width="1.6"/>'
      +'<rect x="114" y="82" width="8" height="22" rx="4" fill="'+W+'" fill-opacity=".7"/><rect x="198" y="82" width="8" height="22" rx="4" fill="'+W+'" fill-opacity=".7"/>'
      +'<rect x="120" y="64" width="80" height="58" rx="18" fill="'+c+'"/>'
      +'<rect x="130" y="75" width="60" height="32" rx="10" fill="#0c0c11" fill-opacity=".55"/>'
      +'<rect class="pa-blink" x="145" y="83" width="8" height="16" rx="4" fill="'+W+'"/>'
      +'<rect class="pa-blink" x="167" y="83" width="8" height="16" rx="4" fill="'+W+'"/></g>';
  }

  /* 14. engrenagens: a automação com IA girando (os dentes são o traço tracejado do círculo) */
  function gear(x,y,R,n,f,rev,dur){
    var t=r1(Math.PI*(R+3)/n);
    return '<g class="pa-spin'+(rev?' pa-rev':'')+'" style="animation-duration:'+dur+'s">'
      +'<circle cx="'+x+'" cy="'+y+'" r="'+(R+3)+'" fill="none" stroke="'+f+'" stroke-width="9" stroke-dasharray="'+t+' '+t+'"/>'
      +'<circle cx="'+x+'" cy="'+y+'" r="'+R+'" fill="'+f+'"/>'
      +'<circle cx="'+x+'" cy="'+y+'" r="'+r1(R*.4)+'" fill="#0c0c11" fill-opacity=".7"/></g>';
  }
  function engrenagens(c,k){
    return bg(c,k,45,55)
      +gear(146,98,32,10,c,0,12)+gear(186.7,57.3,18,6,W,1,6.8)+gear(196.3,116.3,14,5,W,1,5.3)
      +star(146,98,9,' fill="'+W+'"')
      +'<path class="pa-flow" d="M218 116H256" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/>'
      +'<circle class="pa-pulse" cx="264" cy="116" r="7" fill="'+c+'"/>'
      +star(250,52,10,' class="pa-tw" fill="'+W+'"');
  }

  /* 15. radar: a IA varrendo e encontrando sinais */
  function radar(c,k){
    var s=bg(c,k,50,50);
    [22,44,66].forEach(function(r){ s+='<circle cx="160" cy="90" r="'+r+'" fill="none" stroke="'+W+'" stroke-opacity=".18" stroke-width="1.5"/>'; });
    s+='<path d="M94 90H226M160 24V156" stroke="'+W+'" stroke-opacity=".12" stroke-width="1.5"/>'
      +'<g class="pa-spin" style="animation-duration:3.6s"><circle cx="160" cy="90" r="66" fill="none"/>'
      +'<path d="M160 90L210.6 47.6A66 66 0 0 1 226 90Z" fill="'+c+'" fill-opacity=".35"/>'
      +line(160,90,226,90,' stroke="'+c+'" stroke-width="2.6" stroke-linecap="round"')+'</g>';
    [[196,66,c],[124,118,W],[208,122,c],[130,60,W],[178,106,c]].forEach(function(p,j){
      s+='<circle class="pa-dot"'+dl(-j*.5)+' cx="'+p[0]+'" cy="'+p[1]+'" r="4.5" fill="'+p[2]+'"/>';
    });
    return s+'<circle class="pa-ping" cx="160" cy="90" r="6" fill="none" stroke="'+c+'" stroke-width="2"/><circle cx="160" cy="90" r="5" fill="'+W+'"/>';
  }

  /* 16. atenção: um token olhando para os outros, como no transformer */
  function atencao(c,k){
    var xs=[80,112,144,176,208,240], w=[.35,.6,1,.25,.8,.45], q=2, s=bg(c,k,50,50), top='', bot='';
    xs.forEach(function(x,j){
      var y=xs[(j+2)%6];
      if(j!==q) s+='<path d="M'+x+' 54C'+x+' 90 '+y+' 90 '+y+' 126" fill="none" stroke="'+W+'" stroke-opacity=".12" stroke-width="1.5"/>';
    });
    xs.forEach(function(x,j){
      s+='<path class="pa-draw"'+dl(j*.15)+' pathLength="320" d="M'+xs[q]+' 54C'+xs[q]+' 92 '+x+' 88 '+x+' 126" fill="none" stroke="'+c+'" stroke-opacity="'+w[j]+'" stroke-width="'+r1(1+w[j]*4)+'" stroke-linecap="round"/>';
      top+=j===q?'<rect class="pa-pulse" x="'+(x-13)+'" y="40" width="26" height="14" rx="7" fill="'+c+'"/>'
        :'<rect x="'+(x-13)+'" y="40" width="26" height="14" rx="7" fill="'+W+'" fill-opacity=".5"/>';
      bot+='<rect x="'+(x-13)+'" y="126" width="26" height="14" rx="7" fill="'+W+'" fill-opacity=".25"/>'
        +'<rect x="'+(x-13)+'" y="126" width="26" height="14" rx="7" fill="'+c+'" fill-opacity="'+w[j]+'"/>';
    });
    return s+top+bot;
  }

  /* 17. ciclo do agente: pensar, agir e observar, sem parar */
  function ciclo(c,k){
    var n=[[160,40],[203.3,115],[116.7,115]], ic=[
      star(160,40,9,' fill="'+W+'"'),
      '<path d="M206 104L197 117H204L201 126L210 112H203Z" fill="'+W+'"/>',
      '<ellipse cx="116.7" cy="115" rx="9" ry="5.6" fill="none" stroke="'+W+'" stroke-width="2"/><circle cx="116.7" cy="115" r="2.6" fill="'+W+'"/>'];
    var s=bg(c,k,50,50)
      +'<circle cx="160" cy="90" r="50" fill="none" stroke="'+W+'" stroke-opacity=".2" stroke-width="2"/>'
      +'<circle class="pa-orbit" cx="160" cy="90" r="50" pathLength="100" fill="none" stroke="'+c+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="18 82" style="animation-duration:3.6s"/>';
    n.forEach(function(p,j){
      s+='<g class="pa-pulse"'+dl(-j*.8)+'><circle cx="'+p[0]+'" cy="'+p[1]+'" r="17" fill="#17171f" stroke="'+c+'" stroke-width="2.6"/>'+ic[j]+'</g>';
    });
    return s+'<text x="160" y="96" text-anchor="middle" font-family="'+SANS+'" font-size="16" font-weight="800" fill="'+W+'" fill-opacity=".85">IA</text>';
  }

  /* 18. treino: o modelo aprendendo, com o erro caindo e a precisão subindo */
  function treino(c,k){
    return bg(c,k,40,65)
      +'<path d="M64 60H266M64 88H266M64 116H266" stroke="'+W+'" stroke-opacity=".08" stroke-width="1.2"/>'
      +'<path d="M64 30V146H268" fill="none" stroke="'+W+'" stroke-opacity=".3" stroke-width="1.8" stroke-linecap="round"/>'
      +'<path class="pa-draw" pathLength="320" d="M72 40C98 104 128 118 166 126S236 136 260 138" fill="none" stroke="'+c+'" stroke-width="3.6" stroke-linecap="round"/>'
      +'<path class="pa-draw"'+dl(.4)+' pathLength="320" d="M72 136C112 84 150 64 260 52" fill="none" stroke="'+W+'" stroke-opacity=".75" stroke-width="2.2" stroke-linecap="round"/>'
      +'<circle class="pa-pulse" cx="260" cy="138" r="5.5" fill="'+c+'"/>'
      +star(260,52,9,' class="pa-tw" fill="'+W+'"');
  }

  /* 19. difusão: a imagem (um brilho de IA) surgindo do ruído, pixel a pixel */
  function difusao(c,k){
    var s=bg(c,k,50,50), R=64;
    for(var i=0;i<11;i++) for(var j=0;j<7;j++){
      var px=(i-5)*16, py=(j-3)*16, h=(i*37+j*91)%10;
      var inS=Math.pow(Math.abs(px)/R,.8)+Math.pow(Math.abs(py)/R,.8)<=1;
      s+='<rect'+(inS||h<3?' class="pa-dot"'+dl(-h*.12):'')+' x="'+(153.5+px)+'" y="'+(83.5+py)+'" width="13" height="13" rx="3"'
        +' fill="'+(inS?c:W)+'" fill-opacity="'+(inS?1:r1(.06+h*.025))+'"/>';
    }
    return s+star(256,40,9,' class="pa-tw" fill="'+W+'"')+star(64,142,7,' class="pa-tw"'+dl(-1.2)+' fill="'+c+'"');
  }

  /* 20. busca (RAG): a IA lendo os documentos e levando o trecho certo para a resposta */
  function busca(c,k){
    function doc(x,y,a,hl){
      return '<g transform="rotate('+a+' '+(x+30)+' '+(y+40)+')"><rect x="'+x+'" y="'+y+'" width="60" height="80" rx="8" fill="#17171f" stroke="'+W+'" stroke-opacity=".3" stroke-width="1.5"/>'
        +'<path d="M'+(x+10)+' '+(y+16)+'h40M'+(x+10)+' '+(y+28)+'h32M'+(x+10)+' '+(y+52)+'h26M'+(x+10)+' '+(y+64)+'h34" stroke="'+W+'" stroke-opacity=".35" stroke-width="3" stroke-linecap="round"/>'
        +'<path'+(hl?' class="pa-dot"':'')+' d="M'+(x+10)+' '+(y+40)+'h36" stroke="'+(hl?c:W)+'" stroke-opacity="'+(hl?1:.35)+'" stroke-width="'+(hl?4:3)+'" stroke-linecap="round"/></g>';
    }
    return bg(c,k,60,50)
      +doc(60,54,-10)+doc(128,54,10)+doc(94,46,0,1)
      +'<g class="pa-pan"><circle cx="96" cy="84" r="20" fill="'+c+'" fill-opacity=".2" stroke="'+W+'" stroke-width="4.5"/>'
      +line(110,98,124,112,' stroke="'+W+'" stroke-width="6" stroke-linecap="round"')+'</g>'
      +'<path class="pa-flow" d="M202 90H232" stroke="'+c+'" stroke-width="3" stroke-linecap="round"/>'
      +'<circle class="pa-ping" cx="252" cy="90" r="18" fill="none" stroke="'+c+'" stroke-width="2"/>'
      +'<circle class="pa-pulse" cx="252" cy="90" r="18" fill="'+c+'"/>'+star(252,90,10,' fill="'+W+'"');
  }

  return [rede,chat,chip,tokens,orbita,voz,visao,brilhos,grafo,prompt,
          matriz,vetores,robo,engrenagens,radar,atencao,ciclo,treino,difusao,busca];
})();

/* SVG pronto da capa animada do conteúdo id, na cor c. used = variantes que o pack já usou
   ({índice: 1}); a escolhida entra nele, para a próxima capa do pack não repetir */
function packCoverArt(id,c,used){
  var n=PACK_COVERS.length, v=((id*7)%n+n)%n;
  for(var j=0;j<n&&used[v];j++) v=(v+1)%n;
  used[v]=1;
  return '<svg class="ev-svg" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">'+PACK_COVERS[v](c,'cv'+id)+'</svg>';
}
