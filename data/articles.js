/* =====================================================================
   ARTIGOS do blog da aplicação (pages/blog.html). O texto mora no blog; aqui fica o
   índice usado pelo catálogo (Meu plano, busca das Guias e mapas da aba Roadmaps).
   Cada item:  id: {t, u, tag, min, sub, ancora}
     id      número único em todo o catálogo (artigos usam 301 em diante)
     t, sub  título e resumo — iguais a data-title e data-sub do post
     u       pages/blog.html#<id do post> (caminho a partir da raiz do site)   |   tag, min  categoria e minutos de leitura
     ancora  (opcional) formações que o artigo explica: nos mapas, a caixa do artigo
             se pendura na primeira delas que estiver no caminho principal. Sem
             âncora, o artigo fica só no blog.
   ===================================================================== */
var ARTIGOS={
  301:{t:"3 prompts para verificar se sua aplicação não está comprometida",u:"pages/blog.html#prompts-seguranca",tag:"Segurança",min:4,
     sub:"Copie, cole no seu assistente de código e descubra segredos expostos, código suspeito e portas abertas antes que alguém descubra por você.",ancora:[36,95]},
  302:{t:"Git do zero: da instalação aos comandos do dia a dia",u:"pages/blog.html#git",tag:"Ferramentas",min:8,
     sub:"Instale, configure uma vez e aprenda os comandos que você vai usar todos os dias.",ancora:[21]},
  303:{t:"Como instalar o VS Code (e deixar pronto para programar)",u:"pages/blog.html#vscode",tag:"Ferramentas",min:4,
     sub:"Download, instalação em cada sistema e os cinco ajustes que valem a pena logo no primeiro dia.",ancora:[28]},
  304:{t:"A linha do tempo da inteligência artificial",u:"pages/blog.html#ia-linha-do-tempo",tag:"Inteligência artificial",min:5,
     sub:"De uma pergunta feita em 1950 aos assistentes que escrevem código: os marcos que explicam como chegamos aqui.",ancora:[26,93,29]},
  305:{t:"O que é um LLM e como ele funciona",u:"pages/blog.html#llm",tag:"Inteligência artificial",min:6,
     sub:"Tokens, contexto, temperatura e alucinação explicados sem matemática, e o que isso muda no jeito de usar.",ancora:[26,93,29]},
  306:{t:"Vazou uma chave de API? O que fazer nos primeiros 30 minutos",u:"pages/blog.html#chave-vazada",tag:"Segurança",min:4,
     sub:"A ordem certa importa: primeiro corte o acesso, depois descubra o estrago e só então limpe o repositório.",ancora:[36]},
  307:{t:"OWASP Top 10 em linguagem simples",u:"pages/blog.html#owasp-top-10",tag:"Segurança",min:6,
     sub:"As dez falhas mais comuns em aplicações web, com um exemplo e a correção de cada uma em uma frase.",ancora:[36]},
  308:{t:"Como reconhecer phishing e engenharia social",u:"pages/blog.html#phishing",tag:"Segurança",min:4,
     sub:"O ataque mais comum não quebra sistemas, convence pessoas. Sete sinais para desconfiar e o que fazer se você clicou.",ancora:[36]},
  309:{t:"Senhas e segundo fator: o mínimo que todo dev precisa fazer",u:"pages/blog.html#senhas-2fa",tag:"Segurança",min:3,
     sub:"Quatro hábitos que levam uma tarde para configurar e evitam a maior parte das invasões de conta.",ancora:[36]},
  310:{t:"Cheatsheet de Git",u:"pages/blog.html#cheatsheet-git",tag:"Cheatsheet",min:2,
     sub:"Os comandos que resolvem quase tudo, agrupados por situação. Para consultar, não para decorar.",ancora:[21]},
  311:{t:"Cheatsheet de terminal",u:"pages/blog.html#cheatsheet-terminal",tag:"Cheatsheet",min:2,
     sub:"Navegar, criar, mover e procurar arquivos pelo terminal no Linux, no macOS e no Git Bash do Windows.",ancora:[54]},
  312:{t:"Cheatsheet de atalhos do VS Code",u:"pages/blog.html#cheatsheet-vscode",tag:"Cheatsheet",min:2,
     sub:"Os atalhos que mais economizam tempo no editor. No macOS, troque Ctrl por Cmd."},
  313:{t:"Cheatsheet de Claude Code",u:"pages/blog.html#cheatsheet-claude-code",tag:"Cheatsheet",min:3,
     sub:"Instalação, comandos de terminal, comandos de barra e atalhos do assistente de código da Anthropic.",ancora:[95]},
  314:{t:"Cheatsheet de Codex",u:"pages/blog.html#cheatsheet-codex",tag:"Cheatsheet",min:3,
     sub:"Instalação, modos de aprovação e os comandos do Codex CLI, o assistente de código da OpenAI no terminal.",ancora:[95,29]},
  315:{t:"Cheatsheet de Docker",u:"pages/blog.html#cheatsheet-docker",tag:"Cheatsheet",min:3,
     sub:"Imagens, containers, volumes e Compose: os comandos para rodar qualquer aplicação em container.",ancora:[49]},
  /* série "Fundamentos": artigos curtos e interativos (simulador + teste rápido) */
  316:{t:"Lógica de programação: pensar em passos",u:"pages/blog.html#logica-de-programacao",tag:"Fundamentos",min:4,
     sub:"Programar é quebrar um problema em passos pequenos e sem ambiguidade. Execute um algoritmo linha a linha e veja as variáveis mudarem.",ancora:[28]},
  317:{t:"HTML: a estrutura de toda página",u:"pages/blog.html#html",tag:"Fundamentos",min:4,
     sub:"Tags dizem o que cada pedaço da página é. Edite um HTML de verdade e veja o resultado na hora.",ancora:[47]},
  318:{t:"CSS: o box model na prática",u:"pages/blog.html#css",tag:"Fundamentos",min:4,
     sub:"Todo elemento é uma caixa. Mexa em width, padding, border e margin e veja quanto espaço ela ocupa de verdade.",ancora:[48]},
  319:{t:"JavaScript: map, filter e reduce sem medo",u:"pages/blog.html#javascript",tag:"Fundamentos",min:5,
     sub:"Três métodos resolvem a maior parte do trabalho com listas. Escolha a operação e veja o código e o resultado.",ancora:[64,20]},
  320:{t:"APIs e HTTP: como sistemas conversam",u:"pages/blog.html#apis-http",tag:"Fundamentos",min:5,
     sub:"Método, rota, corpo e status: monte requisições para uma API de verdade (de mentirinha) e veja as respostas.",ancora:[20,17,67,66,44,58]},
  321:{t:"SQL: perguntas para o banco de dados",u:"pages/blog.html#sql",tag:"Fundamentos",min:4,
     sub:"SELECT, WHERE e ORDER BY cobrem a maioria das consultas. Monte a sua e veja o resultado numa tabela.",ancora:[58]},
  322:{t:"Python: listas em 5 minutos",u:"pages/blog.html#python",tag:"Fundamentos",min:4,
     sub:"Listas são o pão com manteiga do Python. Brinque com len, sorted, sum e fatiamento e veja cada linha rodando.",ancora:[18,17]},
  323:{t:"Cloud computing: IaaS, PaaS e SaaS sem confusão",u:"pages/blog.html#cloud-computing",tag:"Fundamentos",min:4,
     sub:"Na nuvem você aluga o que não quer manter. Escolha o modelo e veja quem cuida de cada camada.",ancora:[3,22,53,27]},
  324:{t:"Testes de software: pegue o bug antes do usuário",u:"pages/blog.html#testes-de-software",tag:"Fundamentos",min:4,
     sub:"Um teste é um exemplo que o código precisa acertar. Rode os casos, ache o bug e veja tudo ficar verde.",ancora:[65,24]},
  325:{t:"Scrum em 4 minutos: sprints, papéis e eventos",u:"pages/blog.html#scrum",tag:"Fundamentos",min:4,
     sub:"Scrum organiza o trabalho em ciclos curtos. Monte uma sprint dentro da capacidade do time e conheça cada evento.",ancora:[50]},
};
