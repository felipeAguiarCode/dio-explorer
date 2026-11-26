/* =====================================================================
   LESSON PACKS — pacotes de conteúdos com uma finalidade (aba Roadmaps > Lesson packs),
   no estilo de roadmap.sh/packs. Cada pack vira um card na lista e uma página própria
   (roadmap.html#lesson-packs/<id>). Enquanto a lista estiver vazia, a aba mostra "Em breve".
     id         identificador (vai na URL)
     titulo     nome do pack            descricao  uma frase: o que a pessoa vai construir
     cor        cor de destaque         roadmap    (opcional) id de um roadmap (role ou skill):
                                                   o pack usa o ícone dele e aponta para o mapa
     selo       (opcional) etiqueta no alto da caixa, como na App Store ("Comece agora")
     icone      ícone do pack (SVG 24×24, miolo do <svg>, desenhado em currentColor) ligado ao
                projeto; aparece sobre a cor do pack. Sem ele, vale o ícone do roadmap
     arte       (opcional) animação SVG da caixa: 'voz' (assistente de voz), 'time' (time de
                agentes ligado a um orquestrador), 'negocio' (painel com vendas crescendo)
                ou 'blocos' (padrão)
     aprender   lista "O que você vai aprender"
     itens      na ordem de estudo: ids de data/ (cursos, projetos, mentorias com id...),
                ou {id, nota} para explicar o papel daquele item no pack
   ===================================================================== */
var LESSON_PACKS=[
  {id:'ia-para-empreendedores', titulo:"IA para empreendedores",
   descricao:"Comece a empreender na era da IA: tire a ideia do papel, toque um negócio de uma pessoa só com agentes de IA e crie produtos que geram renda.",
   cor:'#059669', roadmap:'ia-non-devs', selo:"Para empreender", arte:'negocio',
   icone:'<path fill-rule="evenodd" d="M12 2.5c3.2 2 5 5.6 5 9.6v3.4l-2.4 2.4H9.4L7 15.5v-3.4c0-4 1.8-7.6 5-9.6zM10.1 9.5a1.9 1.9 0 1 0 3.8 0a1.9 1.9 0 1 0-3.8 0z"/><path d="M7 13.2l-3 2.6v3.4l3.4-1.6zM17 13.2l3 2.6v3.4l-3.4-1.6z" opacity=".75"/><path d="M10.2 18.6h3.6c0 1.6-.8 2.9-1.8 3.9-1-1-1.8-2.3-1.8-3.9z" opacity=".75"/>',
   aprender:["Começar um negócio digital aproveitando a IA desde o primeiro dia",
     "Gerir e organizar um negócio de uma pessoa só com agentes de IA",
     "Transformar uma ideia em produto ou serviço com IA e o Business Model Canvas",
     "Criar, publicar e vender produtos feitos com IA e Lovable"],
   itens:[
     {id:200, nota:"Entenda o que muda ao empreender com IA e dê os primeiros passos do seu negócio digital."},
     {id:201, nota:"Organize e toque um negócio de uma pessoa só, com agentes de IA cuidando das tarefas do dia a dia."},
     {id:202, nota:"Transforme a sua ideia em produto ou serviço: valide com o Business Model Canvas e chegue ao MVP com IA."},
     {id:102, nota:"Crie e publique um produto com IA e Lovable e aprenda a gerar renda com ele."}]},
  {id:'jarvis-claude-code', titulo:"Criando um Jarvis com Claude Code",
   descricao:"Do assistente de voz aos agentes de IA: construa o seu próprio Jarvis com Claude Code, em mentorias ao vivo da DIO.",
   cor:'#D97757', roadmap:'claude-code', selo:"Comece agora", arte:'voz',
   icone:'<circle cx="12" cy="12" r="9.6" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="18.8" cy="5.2" r="1.7"/><rect x="6.9" y="10.4" width="1.6" height="3.2" rx=".8"/><rect x="9.1" y="8.8" width="1.6" height="6.4" rx=".8"/><rect x="11.2" y="7.2" width="1.6" height="9.6" rx=".8"/><rect x="13.3" y="8.8" width="1.6" height="6.4" rx=".8"/><rect x="15.5" y="10.4" width="1.6" height="3.2" rx=".8"/>',
   aprender:["Montar um assistente pessoal com IA que responde a comandos de voz",
     "Usar o Claude Code para construir e evoluir o assistente",
     "Criar agentes de IA que o Jarvis aciona para executar tarefas"],
   itens:[
     {id:97, nota:"Monte a base do Jarvis: um assistente pessoal com IA que entende o que você fala."},
     {id:98, nota:"Dê novas habilidades ao Jarvis com agentes de IA criados no Claude Code."}]},
  {id:'time-de-agentes-ia', titulo:"Criando meu próprio time de IA Agents",
   descricao:"Monte do zero um time de agentes de IA com Claude Code, aprenda a orquestrá-lo e leve uma ideia até o MVP.",
   cor:'#7C3AED', roadmap:'ai-agents', selo:"Mão na massa", arte:'time',
   icone:'<path fill-rule="evenodd" d="M9.7 5h4.6a2.2 2.2 0 0 1 2.2 2.2v2.6a2.2 2.2 0 0 1-2.2 2.2H9.7a2.2 2.2 0 0 1-2.2-2.2V7.2A2.2 2.2 0 0 1 9.7 5zM9.5 8.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0zM12.5 8.5a1 1 0 1 0 2 0a1 1 0 1 0-2 0z"/><path d="M12 5V3.3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="12" cy="2.5" r="1.1"/><path d="M9.4 12l-2.6 3M14.6 12l2.6 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".8"/><path d="M9.8 18h4.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="1.1 1.5" opacity=".8"/><path fill-rule="evenodd" d="M3.3 15h3.9a1.8 1.8 0 0 1 1.8 1.8v2.4a1.8 1.8 0 0 1-1.8 1.8H3.3a1.8 1.8 0 0 1-1.8-1.8v-2.4A1.8 1.8 0 0 1 3.3 15zM3.3 18a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM5.6 18a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z"/><path fill-rule="evenodd" d="M16.8 15h3.9a1.8 1.8 0 0 1 1.8 1.8v2.4a1.8 1.8 0 0 1-1.8 1.8h-3.9a1.8 1.8 0 0 1-1.8-1.8v-2.4a1.8 1.8 0 0 1 1.8-1.8zM16.8 18a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0zM19.1 18a.8.8 0 1 0 1.6 0a.8.8 0 1 0-1.6 0z"/>',
   aprender:["Criar um time de agentes de IA de desenvolvimento no Claude Code, cada um com o seu papel",
     "Orquestrar os agentes para levar um problema até o produto",
     "Construir um MVP completo com o seu time multiagente"],
   itens:[
     {id:99, nota:"Monte do zero o seu time de agentes de desenvolvimento no Claude Code."},
     {id:100, nota:"Orquestre o time: do problema ao produto, com os agentes trabalhando juntos."},
     {id:101, nota:"Coloque o time para trabalhar: recrie o Tinder do zero até o MVP."}]}
];
