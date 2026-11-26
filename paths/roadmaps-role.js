/* =====================================================================
   ROADMAPS ROLE-BASED — profissões. Cada item usa a trilha de mesmo id em
   paths/guides.js (nome, cor, descrição e passos); aqui fica só o que é do mapa:
     id     id da trilha em paths/guides.js (a ordem aqui é a ordem dos cards)
     name, hue, tag, steps   só para roadmaps que NÃO têm trilha nas Guias: o item
            traz o próprio nome, cor, descrição e passos (mesmo formato de guides.js)
     vagas  id da carreira no AI Job Hunter (botão "Ver vagas" abre
            https://web.dio.me/ai-job-hunter?tab=all&career=<id>); sem ele, o
            botão abre a lista de vagas sem filtro
     temas  temas de data/mentorships.js que viram caixas "Mentorias de <tema>"
     ori    origami do card: [nome, desenho] (mini-linguagem de js/catalog.js).
            Frontend é a fênix (visual, renasce a cada deploy); Backend, o tubarão
            (manda nas profundezas, onde ninguém vê)
   ===================================================================== */
var ROADMAPS_ROLE=[
  {id:'frontend', temas:['front-end','javascript','react'],
   ori:["Fênix","b 11,11.4 1.2,1.6 4.6,7.6 .6,8 5.2,11.8 2,12.8 9.4,13.8|c 11,11.4 5.2,11.8 9.4,13.8|b 13,11.4 22.8,1.6 19.4,7.6 23.4,8 18.8,11.8 22,12.8 14.6,13.8|d 13,11.4 18.8,11.8 14.6,13.8|a 10.6,9.2 13.4,9.2 14,15 12,17.6 10,15|a 11,9.6 11.4,6.6 12.6,5.6 13.6,6.8 13,9.6|c 12.4,6 11,2.4 12.9,4.8 13.4,1.8 13.8,5.6|d 13.4,6.6 15.4,7.2 13.6,8|c 10.6,16.4 7.4,22.8 10.6,20 12,23.4 13.4,20 16.6,22.8 13.4,16.4|b 11.2,17 9.6,21 12,18.8 14.4,21 12.8,17|k 12.5,7.4 .45"]},
  {id:'backend', vagas:'1b73eec2-c27b-4820-8e79-8238c93a5224', temas:['back-end','java','python','sql'],
   ori:["Tubarão","c 10,8.8 13.2,2.8 15.6,9.1|b 1.4,13 5,10 12,8.6 18,9.6 21,11.6 12,12.4|a 1.4,13 12,12.4 21,11.6 18,14 12,15.4 5,15|c 20.5,11.6 23.6,5.4 22.4,11.5|d 20.5,11.6 22.4,11.5 23.2,16.8|d 9,14.6 7,19.6 12,15.2|k 4.8,11.5 .65"]},
  {id:'fullstack', temas:['front-end','back-end'],
   ori:["Camelo","a 8,10 10,5.5 12.4,9.5 14.4,5.5 16.8,10|b 7,10 17.5,10 18.5,14 16,15.4 8.4,15.4 6.6,13|c 7.4,10.6 5.6,13 3,8.4 4.8,7.2|a 4.8,7.2 3,8.4 1,8.6 1.2,6.8 3.4,5.8|d 8.4,15.2 9.6,15.2 9.4,21 8.4,21|d 10.8,15.2 12,15.2 11.8,21 10.8,21|d 14,15.2 15.2,15.2 15.4,21 14.4,21|d 16,15 17.2,14.8 17.6,21 16.6,21|l 18.4,11 19.6,14.4|k 3.2,7 .5"]},
  {id:'mobile', temas:['mobile'],
   ori:["Canguru","d 9,17 1,21.5 3,22 10.6,19.2|b 9,8.5 13,8 15.6,12 15,17.6 12.6,19.6 8.6,18.6 7.4,13|a 11,12.5 15,12.4 14.6,17 12,18.2|a 12,4.6 14.6,4 18.4,6.2 16.6,8.2 13.2,8.6|c 12.6,4.8 12.4,1 14.2,4.2|l 14.6,10.6 17,12.6|c 10,19 18,20.6 18,22 9.6,21.6|k 15,5.6 .55"]},
  {id:'devops-cloud', temas:['devops','cloud','linux'],
   ori:["Águia","a 11,10 1,4 2.4,8 .8,8.6 3.4,11 2,12 6,13|b 13,10 23,4 21.6,8 23.2,8.6 20.6,11 22,12 18,13|c 10.6,9 13.4,9 14,15 12,19 10,15|d 10.4,17 13.6,17 15,21.5 12,20.4 9,21.5|a 10.6,9.4 11.2,6.2 12.6,5.6 13.6,7 13.4,9.4|d 12.6,6.6 14.8,7.4 13.4,8.2|k 12.4,7 .45"]},
  {id:'dados-ia', temas:['dados','machine learning','power bi','excel'],
   ori:["Esquilo","c 13,17 18.6,14 21.6,9 20.4,4 16.6,2.4 14.6,5.4 17.4,6.6 17.6,10.6 13.6,14.4|b 8,10 12,9.4 14,14 13.4,18.6 8.6,19 6.8,15.6|a 4,9.2 6.6,5.6 10,6.4 11,9.4 7.6,11.6 4.6,11.2|c 7.6,6 8.6,3.6 9.6,6.4|d 7.6,18.6 12.6,18.6 12.4,20 7,20|o 6.4,14 1.3|k 7.2,8.4 .6"]},
  /* só nos Roadmaps (sem trilha nas Guias): a coruja, que enxerga padrões no escuro */
  {id:'data-analyst', name:'Data Analyst', hue:'#CA8A04',
   tag:"Quero transformar dados em respostas: organizar planilhas, consultar bancos, montar dashboards e contar o que os números mostram.",
   steps:[{r:6,s:'base'},{r:73,s:'proj'},{r:58},{r:90,s:'proj'},{r:38},{r:28},{r:18},
     {fork:"Escolha um aprofundamento",opts:[{l:"Machine Learning",n:[61]},{l:"Engenharia de dados",n:[11]},{l:"Dados em grafos",n:[7]}]},
     {r:94},
     {d:"Projetos"},{r:91,s:'proj'},{r:76,s:'proj'},
     {d:"Opcionais"},{r:93,s:'opt'},{r:13,s:'opt'}],
   temas:['dados','excel','sql','power bi','machine learning','microsoft fabric'],
   ori:["Coruja","a 5,3.5 9,7 15,7 19,3.5 18.5,11.5 5.5,11.5|b 5.5,11.5 18.5,11.5 17.5,19 12,21.5 6.5,19|c 5.5,11.5 6.5,19 3.5,16|c 18.5,11.5 17.5,19 20.5,16|a 9,13 15,13 12,19.5|d 11,10.5 13,10.5 12,13|k 9.3,9 1.3|k 14.7,9 1.3"]},
  {id:'ai-builder', temas:['ia generativa','ai agentes','automação','engenharia de prompt'],
   ori:["Dragão","c 11,9 14,1.6 16,7 19.4,4.6 17.6,10.6|b 7,11 11,8.6 17,10.6 18.4,14.4 14.6,16 9.4,15|a 7,11 9.4,15 5.6,12.8 3,13.2 1.2,11.6 3.4,9.6 5.6,9.6|c 5,9.8 6,7 6.8,9.8|a 10,9.6 12,2.6 13.6,8 15.6,5.8 15,10.4|d 17,12 22.6,14.4 21,17.8 18.6,15.6|d 21,17.8 23.4,19.6 20.4,19.2|d 10,14.8 9.6,18.4 11.6,18.4 12.2,15.4|d 15,15.6 15.6,18.4 17.4,18.4 17,15|k 4.6,10.8 .55"]},
  {id:'ia-non-devs', temas:['ia generativa','automação','copilot studio'],
   ori:["Unicórnio","c 10.4,7.6 13.4,4.6 15.6,6 17.4,8.4 19.4,13 20.6,18.6 18.4,21.5 15.6,9|b 10.4,7.6 15.6,9 18.4,21.5 10.2,21.5 12,14 13,10.6|a 4,15.4 3.2,12.4 6,9 10.4,7.6 13,10.6 12,14 8.2,14.4 6.2,16.2|a 8.6,8.2 9.8,1.4 10.8,7.8|m 9.1,5.6 10.2,5|m 9.4,3.8 10,3.5|c 11.4,7.4 12.6,4.8 13.2,7.6|k 8.4,10.6 .65|k 4.4,13.6 .45"]},
  /* só nos Roadmaps (sem trilha nas Guias): o kraken, oito braços trabalhando ao mesmo tempo */
  {id:'ai-automation', name:'AI Automation', hue:'#DB2777',
   tag:"Quero automatizar processos com IA: fluxos que leem, decidem e agem sozinhos, do no-code aos agentes com código.",
   steps:[{r:26,s:'base'},{r:93},{r:6,s:'opt'},
     {fork:"Escolha como automatizar",opts:[{l:"No-code (n8n)",n:[4]},{l:"Com código (Python + CrewAI)",n:[18,2]}]},
     {r:81,s:'proj'},
     {r:94},{r:74,s:'proj'},{r:78,s:'proj'},
     {d:"Nível avançado"},{r:96},
     {d:"Projetos"},{r:75,s:'proj'}],
   temas:['automação','ai agentes','copilot studio'],
   ori:["Kraken","a 12,2 7,5 6,10 9,13 12,13|b 12,2 17,5 18,10 15,13 12,13|c 7,12 3,14.6 1.6,19 4,17.4 9,13|d 9,13 6.4,17.6 7,22 8.4,18.4 11,13.4|c 11,13.4 11,18.4 12.6,22 13,18.4 13,13.4|d 13,13.4 15.6,18.4 17,22 17.6,17.6 15,13|c 15,13 20,17.4 22.4,19 21,14.6 17,12|k 10,9.6 .8|k 14,9.6 .8"]},
  {id:'ia-developer', temas:['github copilot','vibe coding','ai agentes'],
   ori:["Abelha","a 9,9 7,2.6 12,3.4 12.6,8.4|b 12,8.4 14.6,3 18.6,4.6 14.6,9.4|b 8,10 15.6,9 19.4,12.4 16,16.6 9,16|x 11,9.6 12.6,9.4 12.8,16.2 11.2,16.1|x 14.4,9.4 15.8,9.6 16.6,15.9 15.2,16.4|d 19.4,12.4 22.6,13.4 19,14|a 3.8,13 5.2,10 8.4,10 9,15.4 5.6,16|l 5.4,10.2 4,6.4 2.4,6|k 6,12.4 .8"]},
  /* só nos Roadmaps (sem trilha nas Guias): o lobo, porque agentes trabalham em matilha */
  {id:'ai-agents', name:'AI Agents Engineering', hue:'#7C3AED',
   tag:"Quero construir agentes de IA que planejam, usam ferramentas e trabalham em equipe para resolver tarefas de verdade.",
   steps:[{r:28,s:'base'},{r:18},{r:26},{r:29},{r:5,s:'opt'},{r:92,s:'proj'},
     {fork:"Escolha como construir seus agentes",opts:[{l:"Com código (CrewAI)",n:[2]},{l:"Low-code (n8n)",n:[4]}]},
     {r:95},
     {d:"Mentorias · agentes com Claude Code"},{r:70,s:'ment'},{r:71,s:'ment'},{r:72,s:'ment'},
     {d:"Nível avançado"},{r:96},
     {d:"Projetos"},{r:75,s:'proj'},{r:90,s:'proj'},{r:87,s:'proj'},
     {d:"Certificação (opcional)"},{r:12,s:'opt'}],
   temas:['ai agentes'],
   ori:["Lobo","a 4.6,1.8 9.4,7.6 6,9.6|b 19.4,1.8 14.6,7.6 18,9.6|c 6.4,4.6 8.6,7.8 6.6,8.8|d 17.6,4.6 15.4,7.8 17.4,8.8|c 3.6,9.2 8.2,15.6 2.4,13.8|d 20.4,9.2 15.8,15.6 21.6,13.8|a 3.6,9.2 9.2,7.4 12,8.8 12,21.6 8.2,15.6|b 20.4,9.2 14.8,7.4 12,8.8 12,21.6 15.8,15.6|c 9.6,14.6 12,13.4 14.4,14.6 12,21.6|x 10.8,19.4 13.2,19.4 12,21|x 7.8,11.4 10.6,11.8 8.8,12.9|x 16.2,11.4 13.4,11.8 15.2,12.9"]},
  {id:'qa', temas:['qa/testes'],
   ori:["Tamanduá","c 17,9.6 21,5 23,7.6 22.6,12.6 19.6,14.6 18,14|b 7,10.8 12,8.6 17,9.6 18,14 15.6,15.8 9,15.4 8,13|c 9.6,9.8 12,8.6 14.6,15.6 12,15.6|a 1,15.2 7,10.8 8,13 1.6,16.2|c 9.2,10 10,8.2 10.6,9.8|d 9,15.4 10.8,15.4 10.6,19 8.6,19|d 14.4,15.6 16.2,15.6 16.4,19 14.4,19|k 8.2,11.4 .45"]},
  {id:'game', temas:['games'],
   ori:["Dado","a 12,2.6 20.6,7.4 12,12.2 3.4,7.4|b 3.4,7.4 12,12.2 12,21.4 3.4,16.6|c 12,12.2 20.6,7.4 20.6,16.6 12,21.4|k 12,7.4 1.1|k 5.6,10.6 .9|k 9.8,17.6 .9|k 14.2,18.2 .85|k 16.3,14.4 .85|k 18.4,10.6 .85"]},
  {id:'uiux', temas:[],
   ori:["Pavão","a 12,15.5 1.8,12.8 3.2,9.6|c 12,15.5 3.2,9.6 5.5,7.1|a 12,15.5 5.5,7.1 8.6,5.5|c 12,15.5 8.6,5.5 12,4.9|a 12,15.5 12,4.9 15.4,5.5|c 12,15.5 15.4,5.5 18.5,7.1|a 12,15.5 18.5,7.1 20.8,9.6|c 12,15.5 20.8,9.6 22.2,12.8|k 4.4,12.1 .85|k 5.9,9.8 .85|k 8.1,8.2 .85|k 15.9,8.2 .85|k 18.1,9.8 .85|k 19.6,12.1 .85|b 10.2,11 13.8,11 14.6,17.6 12,20.8 9.4,17.6|a 11,11.6 11.2,7.8 12.6,6.6 13.4,7.8 13,11.6|d 11.2,7.6 9.8,8.2 11.2,8.6|l 12.6,6.6 12.2,4.4|l 12.6,6.6 13.6,4.6|l 11.2,20.4 10.8,22.4|l 12.8,20.4 13.2,22.4|k 12.3,7.6 .4"]},
  {id:'gestao', temas:['agile','soft skills'],
   ori:["Leão","d 12,1.8 14.2,4.5 17.4,3.2 17.9,6.7 21.4,7.2 20.1,10.4 22.8,12.6 20.1,14.8 21.4,18 17.9,18.5 17.4,22 14.2,20.7 12,23.4 9.8,20.7 6.6,22 6.1,18.5 2.6,18 3.9,14.8 1.2,12.6 3.9,10.4 2.6,7.2 6.1,6.7 6.6,3.2 9.8,4.5|c 14.2,4.5 17.9,6.7 20.1,10.4 20.1,14.8 17.9,18.5 14.2,20.7 9.8,20.7 6.1,18.5 3.9,14.8 3.9,10.4 6.1,6.7 9.8,4.5|a 12,7.4 7.6,8.6 7,13 9.6,17.6 12,18.4|b 12,7.4 16.4,8.6 17,13 14.4,17.6 12,18.4|a 7.8,8.4 8.2,5.8 10.4,7.6|b 16.2,8.4 15.8,5.8 13.6,7.6|k 10,11.6 .75|k 14,11.6 .75|x 10.8,14 13.2,14 12,15.6|m 12,15.6 12,16.6|m 10.8,17 12,16.6 13.2,17"]},
];
