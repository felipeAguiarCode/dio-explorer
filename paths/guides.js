/* =====================================================================
   GUIAS — as trilhas da aba Guias (torres de LEGO) e base de todos os roadmaps.
   IC       ícones de traço de cada carreira (SVG 24×24)
   CAREERS  cada trilha: {id, name, hue, icon, tag, steps}
     steps: {r:id}               passo obrigatório (id de qualquer arquivo de data/)
            {r:id, s:'base'}     primeiro passo ("comece aqui")
            {r:id, s:'opt'}      opcional
            {r:id, s:'proj'}     projeto     |  {r:id, s:'ment'}  mentoria
            {fork:"rótulo", opts:[{l:"Python", n:[18,17]}, ...]}  escolha 1 entre rotas
                                 (cada rota vira um roadmap skill-based em paths/roadmaps-skill.js)
            {d:"Projetos"}       divisória com título
   ===================================================================== */
var IC={
  frontend:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M6.5 6.5h.01M9 6.5h.01"/>',
  backend:'<rect x="3" y="4" width="18" height="6" rx="1.6"/><rect x="3" y="14" width="18" height="6" rx="1.6"/><path d="M6.5 7h.01M6.5 17h.01"/>',
  fullstack:'<path d="M12 3 3 7.7l9 4.7 9-4.7L12 3Z"/><path d="M3 12.3l9 4.7 9-4.7"/><path d="M3 16.8l9 4.7 9-4.7" opacity=".55"/>',
  mobile:'<rect x="6.5" y="3" width="11" height="18" rx="2.6"/><path d="M11 18h2"/>',
  data:'<path d="M3 21h18"/><rect x="5" y="11" width="3" height="7" rx="1"/><rect x="10.5" y="6" width="3" height="12" rx="1"/><rect x="16" y="14" width="3" height="4" rx="1"/>',
  ai:'<path d="M12 3.2l1.7 4.9 4.9 1.7-4.9 1.7L12 16.4l-1.7-4.9L5.4 9.8l4.9-1.7L12 3.2Z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z"/>',
  iadev:'<rect x="6" y="6" width="12" height="12" rx="2.5"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9.5 3v2.5M14.5 3v2.5M9.5 18.5V21M14.5 18.5V21M3 9.5h2.5M3 14.5h2.5M18.5 9.5H21M18.5 14.5H21"/>',
  wand:'<path d="M14.4 3.4l1.15 2.85L18.4 7.4l-2.85 1.15L14.4 11.4l-1.15-2.85L10.4 7.4l2.85-1.15L14.4 3.4Z"/><path d="M12.6 9.6 4.6 17.6"/><path d="M6 5v2.4M4.8 6.2h2.4"/><path d="M18.2 14.6v2M17.2 15.6h2"/>',
  devops:'<path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 8.5a3.5 3.5 0 0 1 1 6.9"/><path d="M12 12v7"/><path d="M9.5 16.5 12 19l2.5-2.5"/>',
  qa:'<circle cx="12" cy="12" r="9"/><path d="M8 12.2l2.6 2.6L16 9"/>',
  game:'<rect x="2" y="7.5" width="20" height="9" rx="4.5"/><path d="M6.5 11v3M5 12.5h3"/><path d="M15.5 12h.01M18 13.5h.01"/>',
  uiux:'<path d="M4.5 19.5 8 18.5 18.5 8l-3-3L5 15.5l-.5 4Z"/><path d="M14 6.5l3 3"/>',
  emergentes:'<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2 5.2-5.2 2 2-5.2 5.2-2Z"/>',
  gestao:'<rect x="3" y="4" width="4.6" height="16" rx="1.2"/><rect x="9.7" y="4" width="4.6" height="10" rx="1.2"/><rect x="16.4" y="4" width="4.6" height="13" rx="1.2"/>',
  aws:'<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M12 17.8v-3.4M10.2 16l1.8-1.8 1.8 1.8"/>',
  azure:'<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><path d="M9.2 15.4l2 2 3.6-3.8"/>'
};

var CAREERS=[
  {id:"frontend",name:"Frontend",hue:"#1E5FC0",icon:IC.frontend,
   tag:"Eu quero criar as telas e a parte visual dos sites e aplicativos que as pessoas usam.",
   steps:[{r:28,s:'base'},{r:47},{r:48},{r:64},{r:21},
     {fork:"Escolha um framework",opts:[{l:"React",n:[62]},{l:"Angular",n:[46]}]},
     {r:44},{r:9,s:'opt'},
     {d:"Projetos"},{r:82,s:'proj'},{r:85,s:'proj'}]},

  {id:"backend",name:"Backend",hue:"#0F766E",icon:IC.backend,
   tag:"Quero trabalhar fazendo o que funciona por trás do sistema: banco de dados, regras e servidores.",
   steps:[{r:28,s:'base'},{r:21},
     {fork:"Escolha uma linguagem",opts:[
       {l:"Python",n:[18,17]},
       {l:"Java",n:[14,67,45]},
       {l:"JavaScript / Node",n:[64,20]},
       {l:"C# / .NET",n:[66]},
       {l:"Go",n:[42]},
       {l:"Kotlin",n:[25]},
       {l:"PHP",n:[51]},
       {l:"Ruby",n:[33,23]},
       {l:"Rust",n:[19]}
     ]},
     {r:58},{r:49},
     {d:"Projetos"},{r:90,s:'proj'}]},

  {id:"fullstack",name:"Full Stack",hue:"#8B2FC9",icon:IC.fullstack,
   tag:"Eu quero aprender a criar um sistema completo, da tela até o banco de dados.",
   steps:[{r:28,s:'base'},{r:47},{r:48},{r:64},{r:21},{r:20},{r:44},{r:62},{r:58},{r:49},{r:95,s:'opt'}]},

  {id:"mobile",name:"Mobile",hue:"#D60A52",icon:IC.mobile,
   tag:"Quero criar aplicativos de celular para Android, iPhone ou os dois.",
   steps:[{r:28,s:'base'},{r:21},
     {fork:"Escolha a plataforma",opts:[
       {l:"Android (Kotlin)",n:[25,41]},
       {l:"iOS (Swift)",n:[57,60]},
       {l:"Flutter",n:[56]},
       {l:"React Native",n:[39]}
     ]}]},

  {id:"dados-ia",name:"Dados & IA",hue:"#C2410C",icon:IC.data,
   tag:"Eu quero trabalhar transformando dados em gráficos, relatórios e modelos de inteligência artificial.",
   steps:[{r:28,s:'base'},{r:18},{r:58},{r:26},{r:93},{r:6},{r:38},{r:61},{r:11},{r:7,s:'opt'},
     {d:"Certificações Azure para IA (opcional)"},
     {r:16,s:'opt'},{r:13,s:'opt'},{r:12,s:'opt'},
     {d:"Projetos"},{r:73,s:'proj'},{r:76,s:'proj'},{r:91,s:'proj'}]},

  {id:"ai-builder",name:"AI Builder / GenAI",hue:"#B800E7",icon:IC.ai,
   tag:"Quero criar produtos e automações com inteligência artificial, mesmo sem saber programar.",
   steps:[{r:26,s:'base'},{r:93},{r:29},{r:5},{r:1},{r:4},{r:2},{r:94},{r:96,s:'opt'},{r:8,s:'opt'},
     {d:"Projetos"},{r:74,s:'proj'},{r:81,s:'proj'},{r:83,s:'proj'},{r:92,s:'proj'}]},

  {id:"ia-non-devs",name:"AI & Low Code",hue:"#15803D",icon:IC.wand,
   tag:"Eu quero criar aplicativos, automações e análises com inteligência artificial sem escrever código.",
   steps:[{r:26,s:'base'},{r:93},{r:1},{r:4},{r:6},{r:94},{r:8,s:'opt'},
     {d:"Projetos"},{r:80,s:'proj'},{r:84,s:'proj'},{r:86,s:'proj'}]},

  {id:"ia-developer",name:"IA Developer",hue:"#0891B2",icon:IC.iadev,
   tag:"Quero programar usando inteligência artificial como parceira, do básico ao código assistido por IA.",
   steps:[{r:26,s:'base'},{r:29},{r:5},{r:95},
     {d:"Mentorias · Claude Code"},
     {r:68,s:'ment'},{r:69,s:'ment'},{r:70,s:'ment'},{r:71,s:'ment'},{r:72,s:'ment'},
     {d:"Nível avançado"},{r:96},
     {d:"Projetos"},{r:75,s:'proj'}]},

  {id:"devops-cloud",name:"DevOps & Cloud",hue:"#3949AB",icon:IC.devops,
   tag:"Eu quero trabalhar automatizando a entrega de sistemas e cuidando da infraestrutura na nuvem.",
   steps:[{r:54,s:'base'},{r:21},{r:49},{r:43},{r:40},{r:27},
     {fork:"Escolha uma nuvem",opts:[
       {l:"AWS",n:[3,15,32]},
       {l:"Azure",n:[22,10]},
       {l:"Google Cloud",n:[53]}
     ]},
     {d:"Projetos"},{r:77,s:'proj'}]},

  {id:"aws",name:"AWS Cloud",hue:"#D97706",icon:IC.aws,
   tag:"Quero me especializar na nuvem da Amazon, do zero até a certificação de fundamentos.",
   steps:[{r:3,s:'base'},{r:32},{r:15},
     {d:"Bases que reforçam seus estudos (opcional)"},
     {r:54,s:'opt'},{r:49,s:'opt'},{r:43,s:'opt'},{r:27,s:'opt'}]},

  {id:"azure",name:"Microsoft Azure",hue:"#0078D4",icon:IC.azure,
   tag:"Eu quero me especializar na nuvem da Microsoft, do zero até certificações em inteligência artificial e dados.",
   steps:[{r:22,s:'base'},{r:10},
     {fork:"Escolha uma especialização",opts:[
       {l:"Inteligência Artificial",n:[16,12]},
       {l:"Dados & Machine Learning",n:[13]}
     ]},
     {d:"Bases que reforçam seus estudos (opcional)"},
     {r:54,s:'opt'},{r:49,s:'opt'},
     {d:"Projetos"},{r:79,s:'proj'},{r:87,s:'proj'}]},

  {id:"qa",name:"QA & Testes",hue:"#4D7C0F",icon:IC.qa,
   tag:"Quero garantir que tudo funcione bem, testando os sistemas antes de chegarem ao usuário.",
   steps:[{r:28,s:'base'},{r:21},{r:65},{r:24},
     {d:"Projetos"},{r:78,s:'proj'},{r:89,s:'proj'}]},

  {id:"game",name:"Game Dev",hue:"#CC0000",icon:IC.game,
   tag:"Eu quero criar jogos e experiências interativas em 2D, 3D ou no metaverso.",
   steps:[{r:28,s:'base'},{r:21},{r:35},{r:59},{r:31,s:'opt'}]},

  {id:"uiux",name:"UI/UX Design",hue:"#A21CAF",icon:IC.uiux,
   tag:"Quero projetar telas e experiências pensando em como as pessoas vão usar o produto.",
   steps:[{r:9,s:'base'},{r:55}]},

  {id:"emergentes",name:"Especializações",hue:"#0E7490",icon:IC.emergentes,
   tag:"Eu quero me aprofundar em áreas mais avançadas da tecnologia, depois de já ter uma base em programação.",
   steps:[
     {fork:"Escolha uma especialização",opts:[
       {l:"Cybersecurity",n:[36]},
       {l:"Web3 & Blockchain",n:[34,52]},
       {l:"IoT",n:[37]},
       {l:"Low-code (OutSystems)",n:[30]},
       {l:"CRM (Dynamics 365)",n:[63]}
     ]},
     {d:"Projetos"},{r:88,s:'proj'}]},

  {id:"gestao",name:"Gestão & Ágil",hue:"#475569",icon:IC.gestao,
   tag:"Quero liderar times e processos, aplicando metodologias ágeis em qualquer área técnica.",
   steps:[{r:50},{r:94}]}
];
