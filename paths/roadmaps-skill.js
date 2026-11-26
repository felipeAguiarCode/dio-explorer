/* =====================================================================
   ROADMAPS SKILL-BASED — uma por rota alternativa ("escolha 1") das trilhas.
   O mapa é a trilha-mãe com aquela rota escolhida: passos antes da escolha +
   a rota + passos depois.
     id, name      identificador (vai na URL: roadmap.html#<id>) e nome do card
     from + pick   trilha de paths/guias.js e rótulo da rota escolhida
     career        em vez de from/pick: usa a trilha inteira (AWS e Azure)
     alias         rotas de outras trilhas que também levam a este roadmap
     pre           ids de pré-requisitos extras (entram no começo)
     skip          ids da trilha-mãe que não fazem sentido nesta skill
     temas         temas de data/mentorias.js que viram caixas "Mentorias de <tema>"
     cor           cor original da marca (fundo do ícone e destaques do mapa)
     tinta         cor do desenho do logo (padrão branco)
     acento        segunda cor do logo, quando a marca tem (ex.: amarelo do Python)
     furo          cor dos "furos" do logo (padrão: a cor escurecida)
     logo          versão minimalista do logo, SVG 24×24 (miolo do <svg>)
   Sem cor, o roadmap usa a cor da trilha-mãe.
   ===================================================================== */
var ROADMAPS_SKILL=[
  {id:'react', name:'React', from:'frontend', pick:'React', temas:['react'],
   cor:'#61DAFB', tinta:'#20232A',
   logo:'<g fill="none" stroke="currentColor" stroke-width="1.5"><ellipse cx="12" cy="12" rx="10" ry="3.9"/><ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.9" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="2.1"/>'},
  {id:'angular', name:'Angular', from:'frontend', pick:'Angular', temas:['front-end'],
   cor:'#DD0031',
   logo:'<path d="M12 2l9 3.2-1.4 12.2L12 22l-7.6-4.6L3 5.2z"/><path d="M8.2 16.6 12 6.6l3.8 10M9.5 13.2h5" fill="none" stroke="var(--ori-k)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'},
  {id:'python', name:'Python', from:'backend', pick:'Python', temas:['python'],
   cor:'#3776AB', acento:'#FFD43B',
   logo:'<path d="M8 2.5h5.5A2.5 2.5 0 0 1 16 5v5.5H9.5A2.5 2.5 0 0 0 7 13v2.5H4.5A2.5 2.5 0 0 1 2 13v-3a2.5 2.5 0 0 1 2.5-2.5H8z"/><path fill="var(--acc,currentColor)" d="M16 21.5h-5.5A2.5 2.5 0 0 1 8 19v-5.5h6.5A2.5 2.5 0 0 0 17 11V8.5h2.5A2.5 2.5 0 0 1 22 11v3a2.5 2.5 0 0 1-2.5 2.5H16z"/><circle cx="10.5" cy="4.9" r=".95" fill="var(--ori-k)"/><circle cx="13.5" cy="19.1" r=".95" fill="var(--ori-k)"/>'},
  {id:'java', name:'Java', from:'backend', pick:'Java', temas:['java'],
   cor:'#5382A1', acento:'#F89820',
   logo:'<path d="M5 11h12v4.5a4.5 4.5 0 0 1-4.5 4.5h-3A4.5 4.5 0 0 1 5 15.5z"/><path d="M17 12.6h1.4a2.2 2.2 0 0 1 0 4.4H17M3.5 21.8h15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M9 3.4c-1.3 1.5 1.3 2.5 0 4.2M12.8 2.2c-1.5 1.9 1.5 3.1 0 5.4" fill="none" stroke="var(--acc,currentColor)" stroke-width="1.6" stroke-linecap="round"/>'},
  {id:'javascript-node', name:'JavaScript / Node', from:'backend', pick:'JavaScript / Node', temas:['javascript'],
   cor:'#F7DF1E', tinta:'#111111',
   logo:'<text x="20" y="19.6" text-anchor="end" font-size="11" font-weight="800" font-family="Arial,Helvetica,sans-serif">JS</text>'},
  {id:'dotnet', name:'C# / .NET', from:'backend', pick:'C# / .NET', temas:['.net'],
   cor:'#512BD4',
   logo:'<path d="M12 2l8.7 5v10L12 22l-8.7-5V7z"/><text x="12" y="15.4" text-anchor="middle" font-size="8.2" font-weight="800" font-family="Arial,Helvetica,sans-serif" fill="var(--ori-k)">C#</text>'},
  {id:'go', name:'Go', from:'backend', pick:'Go', temas:[],
   cor:'#00ADD8',
   logo:'<path d="M1.5 9.6h4.2M.8 12.2h4.4M2 14.8h3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><text x="14.6" y="16.4" text-anchor="middle" font-size="10.5" font-style="italic" font-weight="800" font-family="Arial,Helvetica,sans-serif">GO</text>'},
  {id:'kotlin', name:'Kotlin', from:'backend', pick:'Kotlin', temas:[],
   cor:'#7F52FF', acento:'#F88909',
   logo:'<path d="M4 4h16L4 20z"/><path fill="var(--acc,currentColor)" d="M4 20l8-8 8 8z"/>'},
  {id:'php', name:'PHP', from:'backend', pick:'PHP', temas:[],
   cor:'#777BB4',
   logo:'<ellipse cx="12" cy="12" rx="10.6" ry="6.6"/><text x="12" y="14.4" text-anchor="middle" font-size="7.4" font-style="italic" font-weight="800" font-family="Arial,Helvetica,sans-serif" fill="var(--ori-k)">php</text>'},
  {id:'ruby', name:'Ruby', from:'backend', pick:'Ruby', temas:[],
   cor:'#CC342D',
   logo:'<path d="M6 4h12l4 5-10 12L2 9z"/><path d="M2 9h20M6 4l3 5 3-5 3 5 3-5M9 9l3 12 3-12" fill="none" stroke="var(--ori-k)" stroke-width="1" stroke-linejoin="round"/>'},
  {id:'rust', name:'Rust', from:'backend', pick:'Rust', temas:[],
   cor:'#CE422B',
   logo:'<circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-dasharray="2.1 1.67"/><circle cx="12" cy="12" r="7.6"/><text x="12" y="15.6" text-anchor="middle" font-size="10" font-weight="800" font-family="Arial,Helvetica,sans-serif" fill="var(--ori-k)">R</text>'},
  {id:'android', name:'Android', from:'mobile', pick:'Android (Kotlin)', temas:['mobile'],
   cor:'#3DDC84', tinta:'#073042', furo:'#3DDC84',
   logo:'<path d="M3.6 18a8.4 8.4 0 0 1 16.8 0z"/><path d="M7.4 10.6 5.6 7.4M16.6 10.6l1.8-3.2" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="8.8" cy="14.4" r="1" fill="var(--ori-k)"/><circle cx="15.2" cy="14.4" r="1" fill="var(--ori-k)"/>'},
  {id:'ios', name:'iOS / Swift', from:'mobile', pick:'iOS (Swift)', temas:['mobile'],
   cor:'#F05138',
   logo:'<path d="M6 7.2c2.6 2.9 5.8 5.3 8.6 6.7-2.3-2-4.6-4.6-6.3-7.4 2.6 2.4 5.9 4.9 8.6 6.4.6-2.6-.4-5.4-2.4-7.2 3.6 2.2 5 5.9 4.2 8.8 1.1 1.3 1.4 2.6 1.1 3-.5-1-1.7-1.3-2.8-.8-2.9 1.3-7.1 1-10.4-2.3 2 1 5.2 1.2 7.4.3C11.4 13.5 8.4 10.6 6 7.2z"/>'},
  {id:'flutter', name:'Flutter', from:'mobile', pick:'Flutter', temas:['mobile'],
   cor:'#02569B', tinta:'#47C5FB',
   logo:'<path d="M14 2.5h6L9 13.5l-3-3z"/><path d="M14 11.5h6l-5.2 5.2-3-3z"/><path fill-opacity=".7" d="M11.8 19.7l3-3L20 22h-6z"/>'},
  {id:'react-native', name:'React Native', from:'mobile', pick:'React Native', temas:['mobile','react'],
   cor:'#61DAFB', tinta:'#20232A',
   logo:'<rect x="5.5" y="1.8" width="13" height="20.4" rx="2.8" fill="none" stroke="currentColor" stroke-width="1.6"/><g fill="none" stroke="currentColor" stroke-width="1.1"><ellipse cx="12" cy="12" rx="5" ry="2"/><ellipse cx="12" cy="12" rx="5" ry="2" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="5" ry="2" transform="rotate(120 12 12)"/></g><circle cx="12" cy="12" r="1.1"/>'},
  {id:'aws', name:'AWS', career:'aws', alias:[['devops-cloud','AWS']], temas:['aws'],
   cor:'#232F3E', acento:'#FF9900',
   logo:'<text x="12" y="12.6" text-anchor="middle" font-size="9.2" font-weight="800" font-family="Arial,Helvetica,sans-serif">aws</text><path d="M3.6 15.4c4.8 3.2 11.6 3.2 16 0M17.4 14.4l2.6.8-.7 2.6" fill="none" stroke="var(--acc,currentColor)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>'},
  {id:'azure', name:'Microsoft Azure', career:'azure', alias:[['devops-cloud','Azure']], temas:['azure'],
   cor:'#0078D4',
   logo:'<path fill-opacity=".72" d="M9 3h5L6.6 21H1.8z"/><path d="M14.6 7.6 22.2 21H8.2l7.2-2.4-4.3-5z"/>'},
  {id:'google-cloud', name:'Google Cloud', from:'devops-cloud', pick:'Google Cloud', skip:[77], temas:['cloud'],
   cor:'#4285F4',
   logo:'<path d="M7 18.8h10.6a4.1 4.1 0 0 0 .6-8.2 6.2 6.2 0 0 0-11.8-1.4A4.8 4.8 0 0 0 7 18.8z" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>'},
  {id:'cybersecurity', name:'Cybersecurity', from:'emergentes', pick:'Cybersecurity', pre:[28], temas:['cibersegurança'],
   logo:'<path d="M12 2.2l7.6 3v5.8c0 4.8-3.2 8.8-7.6 10.7-4.4-1.9-7.6-5.9-7.6-10.7V5.2z"/><rect x="9" y="11" width="6" height="5.2" rx="1" fill="var(--ori-k)"/><path d="M10.1 11V9.6a1.9 1.9 0 0 1 3.8 0V11" fill="none" stroke="var(--ori-k)" stroke-width="1.4"/>'},
  {id:'web3', name:'Web3 & Blockchain', from:'emergentes', pick:'Web3 & Blockchain', pre:[28], skip:[88], temas:['blockchain'],
   cor:'#627EEA',
   logo:'<path d="M12 2l6.6 10.4L12 16 5.4 12.4z"/><path fill-opacity=".72" d="M12 2v14l6.6-3.6z"/><path d="M12 17.6l6.6-3.8L12 22l-6.6-8.2z"/><path fill-opacity=".72" d="M12 17.6V22l6.6-8.2z"/>'},
  {id:'iot', name:'IoT', from:'emergentes', pick:'IoT', pre:[28], skip:[88], temas:[],
   logo:'<rect x="7" y="10.5" width="10" height="10" rx="1.6"/><path d="M5 13h2M5 16h2M5 19h0M17 13h2M17 16h2M10 20.5v2M14 20.5v2M8.6 7.6a4.9 4.9 0 0 1 6.8 0M6 5a8.6 8.6 0 0 1 12 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="15.5" r="1.6" fill="var(--ori-k)"/>'},
  {id:'outsystems', name:'OutSystems', from:'emergentes', pick:'Low-code (OutSystems)', pre:[28], skip:[88], temas:[],
   cor:'#CC2D3A',
   logo:'<rect x="4.2" y="4.2" width="15.6" height="15.6" rx="6" fill="none" stroke="currentColor" stroke-width="4"/>'},
  {id:'dynamics', name:'Dynamics 365', from:'emergentes', pick:'CRM (Dynamics 365)', pre:[28], skip:[88], temas:[],
   cor:'#0B53CE',
   logo:'<path d="M5.5 2.4l13 7.2-6 3.4z"/><path fill-opacity=".72" d="M5.5 2.4 12.5 13l-7 8.6z"/><path fill-opacity=".5" d="M12.5 13l6-3.4v4.4L5.5 21.6z"/>'},
];
