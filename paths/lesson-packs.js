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
                agentes ligado a um orquestrador), 'negocio' (painel com vendas crescendo),
                'agente' (conversa de chat virando um agente com ferramentas), 'terminal'
                (terminal com código sendo escrito), 'codigo' (diff de código e testes passando),
                'dados' (gráficos e pontos de dados), 'cert' (medalha de certificação e
                checklist da preparação), 'ia' (rede neural levando sinais até o núcleo "IA")
                ou 'blocos' (padrão)
     aprender   lista "O que você vai aprender"
     itens      na ordem de estudo: ids de data/ (cursos, projetos, mentorias com id...),
                ou {id, nota} para explicar o papel daquele item no pack. Item sem capa (ou
                com capa que não carrega) ganha uma das 20 capas animadas de js/pack-covers.js
   ===================================================================== */
var LESSON_PACKS=[
  {id:'ia-do-zero', titulo:"IA do Zero",
   descricao:"Comece do zero na inteligência artificial: entenda como a IA funciona, de machine learning e LLMs à IA generativa e aos agentes, e use-a nos estudos e na carreira.",
   cor:'#DB2777', roadmap:'ia-non-devs', selo:"IA, os primeiros passos", arte:'ia',
   icone:'<ellipse cx="10.5" cy="13" rx="6.6" ry="8.8" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 8.4Q11.1 12.4 15.1 13Q11.1 13.6 10.5 17.6Q9.9 13.6 5.9 13Q9.9 12.4 10.5 8.4z"/><path d="M19.6 1.6Q20 4.2 22.6 4.6Q20 5 19.6 7.6Q19.2 5 16.6 4.6Q19.2 4.2 19.6 1.6z"/>',
   aprender:["Entender como a IA funciona, sem precisar de conhecimento técnico",
     "Diferenciar machine learning, LLMs, IA generativa e agentes",
     "Usar chatbots, copilotos e agentes para turbinar os estudos e a carreira",
     "Dar o contexto certo para conseguir respostas melhores da IA"],
   itens:[
     {id:207, nota:"Comece por aqui: o que acontece por trás de uma IA e como ela chega a uma resposta."},
     {id:208, nota:"O essencial para começar a usar inteligência artificial no dia a dia, sem complicação."},
     {id:209, nota:"Machine learning, LLMs, IA generativa e agentes: os conceitos que formam a IA de hoje."},
     {id:210, nota:"Chatbots, copilotos e agentes: como cada um ajuda nos seus estudos e na sua carreira."},
     {id:211, nota:"Feche o pack entendendo por que o contexto muda a resposta da IA e como usar isso a seu favor."}]},
  {id:'primeiro-agente', titulo:"Criando meu Primeiro Agente",
   descricao:"Do chatbot ao agente: entenda o ecossistema de agentes de IA, prepare o ambiente com OpenAgents e crie seu primeiro agente com o Google ADK.",
   cor:'#2563EB', roadmap:'ai-agents', selo:"Para começar", arte:'agente',
   icone:'<path fill-rule="evenodd" d="M5 4h14a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-6.5L8 21.5V18H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zM7.6 11a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0zM13.4 11a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0z"/><path d="M12 4V2.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="1.9" r="1.1"/>',
   aprender:["Diferenciar chatbots, copilotos e agentes de IA",
     "Entender o ecossistema de agentes e as ferramentas de cada parte",
     "Instalar e configurar o ambiente de agentes com OpenAgents",
     "Criar o seu primeiro agente com o Google ADK"],
   itens:[
     {id:203, nota:"Entenda a diferença entre chatbots, copilotos e agentes, e como cada um ajuda nos estudos e na carreira."},
     {id:204, nota:"Conheça o ecossistema de agentes de IA: as peças, as ferramentas e como tudo se conecta."},
     {id:205, nota:"Prepare o ambiente: instale e configure o OpenAgents para rodar seus agentes."},
     {id:206, nota:"Dê os primeiros passos com o Google ADK e coloque o seu primeiro agente para funcionar."}]},
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
     {id:101, nota:"Coloque o time para trabalhar: recrie o Tinder do zero até o MVP."}]},
  {id:'claude-code', titulo:"Programando com Claude Code",
   descricao:"Do setup ao app pronto: aprenda a programar com o Claude Code no dia a dia, com vibe coding, design e segurança.",
   cor:'#EA580C', roadmap:'claude-code', selo:"Do zero ao expert", arte:'terminal',
   icone:'<path d="M7 7l-4.5 5L7 17M17 7l4.5 5L17 17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 7.6v8.8M7.6 12h8.8M8.9 8.9l6.2 6.2M15.1 8.9l-6.2 6.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
   aprender:["Configurar o Claude Code e usá-lo para acelerar o desenvolvimento",
     "Programar com IA em projetos reais, do back-end ao front-end",
     "Usar o Claude Design junto com o Claude Code",
     "Cuidar da segurança do código gerado com IA"],
   itens:[
     {id:326, nota:"Comece por aqui: instale o Claude Code no seu sistema e faça o primeiro login."},
     {id:327, nota:"Os comandos e atalhos do dia a dia, com um guia de qual usar em cada situação."},
     {id:68, nota:"A visão completa: do primeiro comando ao uso avançado do Claude Code."},
     {id:103, nota:"Programe com IA no Claude Code, do problema ao código funcionando."},
     {id:105, nota:"Do design ao código: una o Claude Design e o Claude Code no mesmo fluxo."},
     {id:106, nota:"Antes de publicar: os cuidados de segurança com código feito por IA."},
     {id:85, nota:"Projeto final: crie um app de finanças pessoais com vibe coding."}]},
  {id:'codex', titulo:"Programando com GPT e Codex",
   descricao:"Do ChatGPT ao Codex: domine o assistente de código da OpenAI, recrie um app conhecido e crie agentes de IA.",
   cor:'#10A37F', roadmap:'codex', selo:"Mão no código", arte:'codigo',
   icone:'<path d="M6 2.5h8l4.5 4.5v6.3M11 21.5H6A1.5 1.5 0 0 1 4.5 20V4A1.5 1.5 0 0 1 6 2.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.6 9h2.8M9 7.6v2.8M7.6 13.6h2.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M12.4 9h3.2M12.4 13.6h2.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" opacity=".65"/><circle cx="17" cy="17.5" r="4.6"/><path d="M15 17.6l1.4 1.4 2.6-2.8" fill="none" style="stroke:var(--hue)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
   aprender:["Usar o GPT e o Codex passo a passo para programar",
     "Recriar um app open source com a ajuda da IA",
     "Criar agentes de IA com o GPT Codex"],
   itens:[
     {id:107, nota:"O passo a passo para dominar o GPT e o Codex."},
     {id:108, nota:"Programe com o ChatGPT e o Codex em uma imersão prática."},
     {id:109, nota:"Mão na massa: recrie o Canva open source com o Codex."},
     {id:110, nota:"Do código aos agentes: crie agentes de IA com o GPT Codex (e compare com o Claude Code)."}]},
  {id:'ia-para-dados', titulo:"IA para dados",
   descricao:"Use a IA para analisar dados de ponta a ponta: do Excel ao Python, de consultas SQL a dashboards e modelos de machine learning.",
   cor:'#0891B2', roadmap:'data-analyst', selo:"Dados + IA", arte:'dados',
   icone:'<path d="M3 5.5c0-1.5 2.9-2.8 6.5-2.8S16 4 16 5.5v12.6c0 1.5-2.9 2.8-6.5 2.8S3 19.6 3 18.1z" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M3 5.5c0 1.5 2.9 2.8 6.5 2.8S16 7 16 5.5M3 11.8c0 1.5 2.9 2.8 6.5 2.8S16 13.3 16 11.8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M19.6 13.2l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z"/>',
   aprender:["Entender os fundamentos de dados para IA e machine learning",
     "Analisar dados com IA no Excel, no Power BI e no Python",
     "Contar histórias com dados em dashboards feitos com IA",
     "Criar agentes de IA para consultar bancos de dados e prever resultados"],
   itens:[
     {id:111, nota:"A base: o que a IA e o machine learning precisam dos seus dados."},
     {id:112, nota:"IA na análise de dados, do Excel ao Power BI."},
     {id:113, nota:"Imersão prática: dados e IA com Excel e Claude Code."},
     {id:73, nota:"Projeto: crie um dashboard da Porsche com agentes de IA."},
     {id:114, nota:"Leve a análise para o Python com a ajuda do Claude."},
     {id:90, nota:"Projeto: um agente de IA que responde perguntas consultando o banco em SQL."},
     {id:115, nota:"Storytelling com dados: dashboards que contam uma história, feitos com IA."},
     {id:91, nota:"Projeto final: treine seu primeiro modelo de machine learning para prever vendas."}]},
  {id:'certificacao-dp-700', titulo:"Certificação DP-700",
   descricao:"Prepare-se para a prova DP-700 da Microsoft, de engenharia de dados no Microsoft Fabric, em quatro workshops ao vivo.",
   cor:'#0F766E', roadmap:'azure', selo:"Certificação", arte:'cert',
   icone:'<path d="M8.4 15 6.8 21.3 12 18.9l5.2 2.4L15.6 15" fill="currentColor" fill-opacity=".7"/><circle cx="12" cy="9.3" r="6.9"/><path d="M9.1 9.4l2 2 3.8-4" fill="none" style="stroke:var(--hue)" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>',
   aprender:["Desenhar a arquitetura e a segurança de soluções no Microsoft Fabric",
     "Ingerir e transformar dados no Fabric",
     "Operar, versionar e fazer o deploy das soluções",
     "Otimizar a performance e chegar preparado ao exame DP-700"],
   itens:[
     {id:116, nota:"Workshop 1: arquitetura e segurança no Fabric, a base cobrada na prova."},
     {id:117, nota:"Workshop 2: ingestão e transformação de dados."},
     {id:118, nota:"Workshop 3: operação, ciclo de vida e deploy das soluções."},
     {id:119, nota:"Workshop 4: otimização de performance e preparação final para o exame."}]}
];
