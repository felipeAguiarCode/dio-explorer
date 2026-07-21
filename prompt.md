# SPEC — Roadmap DIO (engenharia reversa)

> **Para os alunos:** este documento é a "planta baixa" completa do arquivo `roadmap-dio.html`.
> Ele funciona como um **system prompt passo a passo**: você pode ler para entender como a
> aplicação foi construída **ou** colar (em partes ou inteiro) num assistente de código
> (Claude Code, etc.) para recriar o projeto do zero.
>
> A aplicação foi construída **incrementalmente**, um prompt de cada vez — exatamente como numa
> aula ao vivo. No fim deste documento há a **sequência exata de prompts** que gerou o resultado final.

---

## 0. System prompt (papel do modelo)

```
Você é um engenheiro front-end sênior especializado em interfaces bonitas, acessíveis e
performáticas. Sua tarefa é construir uma ÚNICA página HTML autocontida (sem build, sem
dependências externas, sem frameworks) que funcione abrindo o arquivo direto no navegador.

Regras invioláveis:
1. Um único arquivo .html. Todo o CSS dentro de <style> e todo o JS dentro de <script>.
2. ZERO dependências externas: nada de CDN, Google Fonts, imagens externas ou fetch.
   Ícones são SVG inline. Fontes são a stack nativa do sistema.
3. JavaScript "vanilla" (ES5/ES6 simples, sem transpilação). Nada de React/Vue/jQuery.
4. Tema claro E escuro, dirigidos por CSS custom properties (variáveis).
5. Responsivo (mobile-first friendly) e acessível (roles, aria-*, foco visível,
   prefers-reduced-motion, prefers-color-scheme).
6. Conteúdo em português do Brasil.
7. Código legível: nomes claros, mesma densidade de comentários do arquivo existente.

Sempre que possível, RENDERIZE a interface a partir de dados (arrays/objetos) em JS,
em vez de escrever HTML repetido à mão.
```

---

## 1. Visão geral do produto

Uma landing page chamada **"Roadmap DIO — Por onde eu começo?"** que organiza as **67 formações**
da plataforma DIO em **15 trilhas de carreira**. Cada trilha é desenhada como uma **torre de LEGO**
(blocos empilhados do zero ao avançado). O usuário:

1. Escolhe uma carreira (cards no topo);
2. Monta a torre de baixo para cima (blocos = formações);
3. Clica em cada bloco para abrir a formação na plataforma DIO;
4. Pode montar um **plano de estudos** pessoal (agenda estilo Outlook) via botão **"+"** em cada bloco.

Estética: **vibe de jogo mobile** (fundo "arcade" com brilho neon e grade, HUD, cards estilo
*level select*, peças brilhando) com acabamento **One UI** (cantos bem arredondados, botões em
pílula, sombras suaves). Hero em **largura total** com um **mapa-múndi estilo Super Mario World**
no canto superior direito.

**Fonte dos dados:** o arquivo `formacoes-dio.md` (lista das 67 formações com título + URL).

---

## 2. Restrições técnicas (resumo)

| Item | Decisão |
|---|---|
| Arquivo | 1 único `.html` autocontido |
| CSS | Inline em `<style>`, com custom properties (design tokens) |
| JS | Vanilla, dentro de `<script>`, renderização data-driven |
| Ícones | SVG inline (viewBox `0 0 24 24`, `stroke="currentColor"`) |
| Fontes | Stack nativa (`-apple-system`, `Segoe UI`, `Roboto`… / mono do sistema) |
| Tema | claro/escuro via `prefers-color-scheme` + toggle manual salvo em `localStorage` |
| Persistência | `localStorage` (tema e plano de estudos) |
| Acessibilidade | `aria-*`, foco visível, `prefers-reduced-motion`, contraste |
| Dependências | **nenhuma** |

---

## 3. Design system (tokens)

Definir em `:root` (claro) e sobrescrever em `@media (prefers-color-scheme:dark)` **e** em
`:root[data-theme="dark"]` / `:root[data-theme="light"]` (para o toggle manual vencer o sistema).

### Paleta — tema CLARO
```
--paper:#FAFAFA;  --surface:#FFFFFF;  --surface-2:#F1F1F5;
--ink:#15161B;    --ink-soft:#38393D; --ink-faint:#8B8B92;
--line:#E1E1E6;   --line-strong:#C9C9D2;
--brand:#A44DDA;  --brand-ink:#8021B8;
--mag-a:#B800E7;  --mag-b:#A200CC;    --gold:#E5E145;
--hue-mix:#0A0A0F; --hue-lift:0%;
color-scheme:light;
```

### Paleta — tema ESCURO
```
--paper:#0D0D12;  --surface:#1B1C24;  --surface-2:#15161B;
--ink:#FFFFFF;    --ink-soft:#C7C7CE; --ink-faint:#98989C;
--line:#2D2D37;   --line-strong:#3C3C48;
--brand:#A44DDA;  --brand-ink:#C58BEA;
--mag-a:#B800E7;  --mag-b:#A200CC;    --gold:#E5E145;
--hue-mix:#FFFFFF; --hue-lift:44%;
color-scheme:dark;
```

### Tipografia
```
--sans: -apple-system,BlinkMacSystemFont,"SF Pro Text","SF Pro Display","Segoe UI",Roboto,system-ui,"Helvetica Neue",Arial,sans-serif;
--mono: "SF Mono",ui-monospace,Menlo,Monaco,"Cascadia Code",Consolas,monospace;
```

### Truque de cor por trilha (IMPORTANTE)
Cada carreira tem uma cor `--hue`. Derivamos `--huec` (cor de **texto/acento**) misturando `--hue`
com `--hue-mix` na proporção `--hue-lift`:
```
--huec: color-mix(in srgb, var(--hue) calc(100% - var(--hue-lift)), var(--hue-mix) var(--hue-lift));
```
- No claro (`--hue-lift:0%`) → `--huec` == `--hue`.
- No escuro (`--hue-lift:44%`, mix com branco) → `--huec` fica **mais clara**, garantindo contraste do
  texto sobre fundo escuro. Use `--hue` para **preenchimentos** (blocos coloridos) e `--huec` para
  **texto/bordas/acentos**.

### Sombra base
```
--shadow: 0 1px 2px rgba(21,22,27,.06), 0 12px 30px -16px rgba(21,22,27,.22);  /* claro */
--shadow: 0 1px 2px rgba(0,0,0,.35),   0 14px 34px -18px rgba(0,0,0,.8);       /* escuro */
```

---

## 4. Modelo de dados (copiar exatamente)

### 4.1 `TRACKS` — as 67 formações (id → {título `t`, url `u`})
```js
var TRACKS={
  1:{t:"AI Builder com Lovable",u:"https://web.dio.me/track/ai-builder-com-lovable"},
  2:{t:"CrewAI Fundamentals",u:"https://web.dio.me/track/crew-ai-fundalmentals"},
  3:{t:"AWS Cloud Foundations",u:"https://web.dio.me/track/formacao-aws-cloud-fundations"},
  4:{t:"AI Automation com N8N",u:"https://web.dio.me/track/ai-automation-com-n8n"},
  5:{t:"GitHub Copilot",u:"https://web.dio.me/track/formacao-github-copilot"},
  6:{t:"Análise de Dados com Excel e IA",u:"https://web.dio.me/track/formacao-analise-de-dados-com-excel-e-ia"},
  7:{t:"Neo4J: Análise de Dados com Grafos",u:"https://web.dio.me/track/formacao-neo4j-analise-de-dado-com-grafos"},
  8:{t:"AI for Teachers",u:"https://web.dio.me/track/formacao-ai-for-teachers"},
  9:{t:"UI/UX Designer",u:"https://web.dio.me/track/formacao-uiux-designer"},
  10:{t:"AZ-204 Certification",u:"https://web.dio.me/track/formacao-az-204-certification"},
  11:{t:"Databricks Data Engineer",u:"https://web.dio.me/track/formacao-databricks-data-engineer"},
  12:{t:"AI-102 Certification",u:"https://web.dio.me/track/formacao-ai-102-certification"},
  13:{t:"DP-100 (Microsoft)",u:"https://web.dio.me/track/formacao-dp-100-da-microsoft"},
  14:{t:"Java Fundamentals",u:"https://web.dio.me/track/formacao-java-fundamentals"},
  15:{t:"AWS CLF-02 Practitioner",u:"https://web.dio.me/track/formacao-aws-clf-02"},
  16:{t:"Azure AI Fundamentals (AI-900)",u:"https://web.dio.me/track/formacao-microsoft-azure-ai-900-fundamentals"},
  17:{t:"Python Backend Developer",u:"https://web.dio.me/track/formacao-python-backend-developer"},
  18:{t:"Python Fundamentals",u:"https://web.dio.me/track/formacao-python-fundamentals"},
  19:{t:"Rust Fundamentals",u:"https://web.dio.me/track/formacao-rust-fundamentals"},
  20:{t:"Node.js Fundamentals",u:"https://web.dio.me/track/formacao-nodejs-fundamentals"},
  21:{t:"GitHub Certification",u:"https://web.dio.me/track/formacao-github-certification"},
  22:{t:"Microsoft AZ-900 Certification",u:"https://web.dio.me/track/formacao-microsoft-az-900-certification"},
  23:{t:"Ruby on Rails Developer",u:"https://web.dio.me/track/formacao-ruby-rails-developer"},
  24:{t:"Automação de Testes com Cypress",u:"https://web.dio.me/track/formacao-automacao-testes-cypress"},
  25:{t:"Kotlin Back-end Developer",u:"https://web.dio.me/track/formacao-kotlin-backend-developer"},
  26:{t:"Fundamentos de Inteligência Artificial",u:"https://web.dio.me/track/formacao-fundamentos-de-inteligencia-artificial"},
  27:{t:"DevOps Fundamentals",u:"https://web.dio.me/track/formacao-devops-fundamentals"},
  28:{t:"Lógica de Programação",u:"https://web.dio.me/track/formacao-logica-de-programacao"},
  29:{t:"ChatGPT for Devs",u:"https://web.dio.me/track/formacao-chatgpt-devs"},
  30:{t:"OutSystems Fundamentals",u:"https://web.dio.me/track/formacao-outsystems-fundamentals"},
  31:{t:"Lua Developer",u:"https://web.dio.me/track/formacao-lua-developer"},
  32:{t:"AWS Cloud Practitioner Certification",u:"https://web.dio.me/track/formacao-aws-cloud-practitioner-certification"},
  33:{t:"Ruby Developer",u:"https://web.dio.me/track/formacao-ruby-developer"},
  34:{t:"Web3 Fundamentals",u:"https://web.dio.me/track/formacao-web3-fundamentals"},
  35:{t:"Unity 3D Game Developer",u:"https://web.dio.me/track/formacao-unity-3d-game-developer"},
  36:{t:"Cybersecurity Specialist",u:"https://web.dio.me/track/formacao-cybersecurity"},
  37:{t:"IoT Specialist",u:"https://web.dio.me/track/formacao-iot-specialist"},
  38:{t:"Power BI Analyst",u:"https://web.dio.me/track/formacao-power-bi-analyst"},
  39:{t:"React Native Developer",u:"https://web.dio.me/track/formacao-react-native-developer"},
  40:{t:"CI/CD com GitLab",u:"https://web.dio.me/track/formacao-gitlab-cicd"},
  41:{t:"Android Developer",u:"https://web.dio.me/track/formacao-android-developer"},
  42:{t:"Go Developer",u:"https://web.dio.me/track/formacao-go-developer"},
  43:{t:"Kubernetes Fundamentals",u:"https://web.dio.me/track/formacao-kubernetes"},
  44:{t:"TypeScript Fullstack Developer",u:"https://web.dio.me/track/formacao-typescript-fullstack-developer"},
  45:{t:"Programação Reativa com Spring WebFlux",u:"https://web.dio.me/track/formacao-programacao-reativa-com-spring-webflux"},
  46:{t:"Angular Developer",u:"https://web.dio.me/track/formacao-angular-developer"},
  47:{t:"HTML Web Developer",u:"https://web.dio.me/track/formacao-html-web-developer"},
  48:{t:"CSS Web Developer",u:"https://web.dio.me/track/formacao-css-web-developer"},
  49:{t:"Docker Fundamentals",u:"https://web.dio.me/track/formacao-docker-fundamentals"},
  50:{t:"Scrum Master Certification",u:"https://web.dio.me/track/formacao-scrum-master"},
  51:{t:"PHP Experience",u:"https://web.dio.me/track/formacao-php-experience"},
  52:{t:"Blockchain Specialist",u:"https://web.dio.me/track/formacao-blockchain"},
  53:{t:"Google Cloud (GCP) Specialist",u:"https://web.dio.me/track/formacao-gcp-specialist"},
  54:{t:"Linux Fundamentals",u:"https://web.dio.me/track/formacao-linux-fundamentals"},
  55:{t:"UX Designer",u:"https://web.dio.me/track/formacao-ux-designer"},
  56:{t:"Flutter Specialist",u:"https://web.dio.me/track/formacao-flutter-specialist"},
  57:{t:"Swift & iOS Experience",u:"https://web.dio.me/track/formacao-swift-and-ios-experience"},
  58:{t:"SQL Database Specialist",u:"https://web.dio.me/track/formacao-sql-db-specialist"},
  59:{t:"Game Developer: Roblox & Metaverse",u:"https://web.dio.me/track/formacao-game-developer-roblox"},
  60:{t:"iOS Developer",u:"https://web.dio.me/track/formacao-ios-developer"},
  61:{t:"Machine Learning Specialist",u:"https://web.dio.me/track/formacao-machine-learning-specialist"},
  62:{t:"React Developer",u:"https://web.dio.me/track/formacao-react-developer"},
  63:{t:"CRM Dynamics 365 Developer",u:"https://web.dio.me/track/formacao-dynamics-365"},
  64:{t:"JavaScript Developer",u:"https://web.dio.me/track/formacao-javascript-developer"},
  65:{t:"Quality Assurance (QA) Experience",u:"https://web.dio.me/track/formacao-quality-assurance-experience"},
  66:{t:".NET Developer",u:"https://web.dio.me/track/formacao-dotnet-developer"},
  67:{t:"Java Developer",u:"https://web.dio.me/track/formacao-java-developer"}
};
```

### 4.2 `CAREERS` — as 15 trilhas
Cada carreira: `{id, name, hue, icon, tag, steps[]}`.
Gramática de um **passo** (`step`):
- `{r: <id>}` → bloco normal (núcleo).
- `{r: <id>, s:'base'}` → **ponto de partida** ("comece aqui").
- `{r: <id>, s:'opt'}` → bloco **opcional/complementar**.
- `{fork:"Título", opts:[{l:"Rótulo", n:[ids...]}, ...]}` → **ramificação** ("escolha 1").
- `{d:"Texto"}` → **divisória/legenda** (rótulo de seção dentro da torre).

```js
var CAREERS=[
  {id:"frontend",name:"Front-end",hue:"#1E5FC0",icon:IC.frontend,
   tag:"Construa o que o usuário vê: sites, telas e interações no navegador.",
   steps:[{r:28,s:'base'},{r:47},{r:48},{r:64},{r:21},
     {fork:"Escolha um framework",opts:[{l:"React",n:[62]},{l:"Angular",n:[46]}]},
     {r:44},{r:9,s:'opt'}]},

  {id:"backend",name:"Back-end",hue:"#0F766E",icon:IC.backend,
   tag:"APIs, regras de negócio, bancos de dados e servidores. Escolha uma linguagem para começar.",
   steps:[{r:28,s:'base'},
     {fork:"Escolha uma linguagem",opts:[
       {l:"Python",n:[18,17]},{l:"Java",n:[14,67,45]},{l:"JavaScript / Node",n:[64,20]},
       {l:"C# / .NET",n:[66]},{l:"Go",n:[42]},{l:"Kotlin",n:[25]},
       {l:"PHP",n:[51]},{l:"Ruby",n:[33,23]},{l:"Rust",n:[19]}
     ]},
     {r:58},{r:49}]},

  {id:"fullstack",name:"Full Stack",hue:"#8B2FC9",icon:IC.fullstack,
   tag:"Do banco de dados à interface — domine as duas pontas do desenvolvimento web.",
   steps:[{r:28,s:'base'},{r:47},{r:48},{r:64},{r:20},{r:44},{r:62},{r:58},{r:49}]},

  {id:"mobile",name:"Mobile",hue:"#D60A52",icon:IC.mobile,
   tag:"Apps para Android, iOS e multiplataforma. Escolha por onde publicar.",
   steps:[{r:28,s:'base'},
     {fork:"Escolha a plataforma",opts:[
       {l:"Android (Kotlin)",n:[25,41]},{l:"iOS (Swift)",n:[57,60]},
       {l:"Flutter",n:[56]},{l:"React Native",n:[39]}
     ]}]},

  {id:"dados-ia",name:"Dados & IA",hue:"#C2410C",icon:IC.data,
   tag:"Transforme dados em insights, dashboards e modelos de machine learning.",
   steps:[{r:28,s:'base'},{r:18},{r:58},{r:26},{r:6},{r:38},{r:61},{r:11},{r:7,s:'opt'},
     {d:"Certificações Azure para IA (opcional)"},
     {r:16,s:'opt'},{r:13,s:'opt'},{r:12,s:'opt'}]},

  {id:"ai-builder",name:"AI Builder / GenAI",hue:"#B800E7",icon:IC.ai,
   tag:"Crie produtos e automações com IA — dá para começar mesmo sem saber programar.",
   steps:[{r:26,s:'base'},{r:29},{r:5},{r:1},{r:4},{r:2},{r:8,s:'opt'}]},

  {id:"ia-non-devs",name:"IA Builder for non Devs",hue:"#15803D",icon:IC.wand,
   tag:"Crie apps, automações e análises com IA sem escrever código — feito para quem não é programador.",
   steps:[{r:26,s:'base'},{r:1},{r:4},{r:6},{r:8,s:'opt'}]},

  {id:"devops-cloud",name:"DevOps & Cloud",hue:"#3949AB",icon:IC.devops,
   tag:"Automatize deploys, containers e infraestrutura. Escolha uma nuvem para se certificar.",
   steps:[{r:54,s:'base'},{r:21},{r:49},{r:43},{r:40},{r:27},
     {fork:"Escolha uma nuvem",opts:[
       {l:"AWS",n:[3,15,32]},{l:"Azure",n:[22,10]},{l:"Google Cloud",n:[53]}
     ]}]},

  {id:"aws",name:"AWS Cloud",hue:"#D97706",icon:IC.aws,
   tag:"Foque seus estudos na nuvem da Amazon — do fundamento à certificação Cloud Practitioner.",
   steps:[{r:3,s:'base'},{r:32},{r:15},
     {d:"Bases que reforçam seus estudos (opcional)"},
     {r:54,s:'opt'},{r:49,s:'opt'},{r:43,s:'opt'},{r:27,s:'opt'}]},

  {id:"azure",name:"Microsoft Azure",hue:"#0078D4",icon:IC.azure,
   tag:"Foque seus estudos na nuvem da Microsoft — do fundamento AZ-900 às especializações em IA e dados.",
   steps:[{r:22,s:'base'},{r:10},
     {fork:"Escolha uma especialização",opts:[
       {l:"Inteligência Artificial",n:[16,12]},{l:"Dados & Machine Learning",n:[13]}
     ]},
     {d:"Bases que reforçam seus estudos (opcional)"},
     {r:54,s:'opt'},{r:49,s:'opt'}]},

  {id:"qa",name:"QA & Testes",hue:"#4D7C0F",icon:IC.qa,
   tag:"Garanta qualidade de software com testes manuais e automação.",
   steps:[{r:28,s:'base'},{r:65},{r:24}]},

  {id:"game",name:"Game Dev",hue:"#CC0000",icon:IC.game,
   tag:"Crie jogos 2D/3D e experiências no metaverso.",
   steps:[{r:28,s:'base'},{r:35},{r:59},{r:31,s:'opt'}]},

  {id:"uiux",name:"UI/UX Design",hue:"#A21CAF",icon:IC.uiux,
   tag:"Projete interfaces e experiências centradas no usuário.",
   steps:[{r:9,s:'base'},{r:55}]},

  {id:"emergentes",name:"Especializações",hue:"#0E7490",icon:IC.emergentes,
   tag:"Fronteiras da tecnologia — ideais depois de já ter uma primeira base de programação.",
   steps:[
     {fork:"Escolha uma especialização",opts:[
       {l:"Cybersecurity",n:[36]},{l:"Web3 & Blockchain",n:[34,52]},{l:"IoT",n:[37]},
       {l:"Low-code (OutSystems)",n:[30]},{l:"CRM (Dynamics 365)",n:[63]}
     ]}]},

  {id:"gestao",name:"Gestão & Ágil",hue:"#475569",icon:IC.gestao,
   tag:"Lidere times e processos ágeis — complementa qualquer trilha técnica.",
   steps:[{r:50}]}
];
```

### 4.3 Ícones (SVG inline, `viewBox="0 0 24 24"`, sem preenchimento, `stroke="currentColor"`)
Objeto `IC` com as chaves: `frontend, backend, fullstack, mobile, data, ai, wand, devops, qa, game,
uiux, emergentes, gestao, aws, azure`. Ícones auxiliares soltos: `EXT` (link externo ↗), `FLAG`
(bandeira do "comece aqui"), `GO` (seta →), `PLUS` (+), `CHECK` (✓).
Os `paths` exatos estão no arquivo `roadmap-dio.html` (seção `var IC = {...}`); replique-os ou
desenhe equivalentes no mesmo estilo (traço 1.7–2.4, `stroke-linecap/linejoin round`).

---

## 5. Estrutura do arquivo

```
<title>
<style> … design tokens + todos os componentes + skins … </style>
<header class="topbar"> … marca + [Meu plano] + [Todas as trilhas] + [tema] … </header>
<section class="hero"> … mapa (SVG) + .hero-in (eyebrow, h1, lede, passos, stats HUD) … </section>
<main class="wrap">
  <div class="sec-head">…</div>
  <div class="legend">…</div>            <!-- legenda dos tipos de peça -->
  <div class="cards" id="cards"></div>   <!-- cards renderizados por JS -->
  <button class="backlink" id="backlink">…</button>
  <div id="trails"></div>                <!-- trilhas renderizadas por JS -->
  <footer>…</footer>
</main>
<div class="plan-overlay" id="planOverlay" hidden></div>   <!-- painel do plano -->
<aside class="plan-panel" id="planPanel"> … agenda … </aside>
<script> … tema + dados + render + filtro + plano … </script>
```

---

## 6. Passo a passo de construção

### PASSO 1 — Base do projeto
- Criar o HTML autocontido, `<title>` "Roadmap DIO — Por onde eu começo?".
- Definir todos os **tokens** do Passo 3 do design system (claro/escuro/toggle).
- `body` com `--sans`, `overflow-x:hidden`, antialias.

### PASSO 2 — Tema claro/escuro
- Botão de tema na topbar. Ícone alterna sol/lua.
- Ordem de decisão: valor salvo em `localStorage('dio-theme')` → senão `prefers-color-scheme`.
- Ao clicar, grava `data-theme` no `<html>` e persiste. Os overrides `:root[data-theme=...]`
  garantem que a escolha manual vença o sistema.

### PASSO 3 — Hero
- **Largura total** (full-bleed): o `.hero` fica **fora** do `.wrap`; o conteúdo vai num
  `.hero-in` centralizado (`max-width:1080px`). Cantos inferiores arredondados (`border-radius:0 0 34px 34px`).
- Fundo: gradiente roxo escuro `linear-gradient(155deg,#0C0118,#23002F 55%,#320043)`.
- Conteúdo: `.eyebrow` (mono, dourado), `h1` ("Por onde eu **começo?**" com trecho em degradê),
  `.lede`, 3 `.step-chip` ("Escolha / Monte / Clique") e `.stats` (67 formações · 15 trilhas · 0 pré-requisitos).
- **Mapa-múndi (SVG) estilo Super Mario World** no **canto superior direito** (`position:absolute;
  top:22px;right:8px`), atrás do texto (`z-index` menor), escondido em telas ≤820px. Elementos:
  colinas em camadas (baixa opacidade), **trilha sinuosa pontilhada** (`stroke-dasharray`), casa
  inicial, 3 nós de fase (magenta / dourado / contorno), moedas douradas e um **castelo com
  bandeira**. Usa as cores da paleta via classes `.mag`/`.gold`.

### PASSO 4 — Cards de carreira (data-driven)
- Renderizar um `<button class="card">` por item de `CAREERS` dentro de `#cards`
  (`grid` responsivo, `minmax(232px,1fr)`).
- Cada card: ícone (fundo `--hue`), nome, contador "N formações" e "Ver trilha →".
- **Contador** = `refCount(c)`: nº de formações **únicas** somando `steps[].r` e os `ids` de todos
  os `fork.opts[].n`.

### PASSO 5 — Trilhas (torres de LEGO)
- Para cada carreira, uma `<section class="trail" id="trail-<id>">` em `#trails`, com `--hue` inline.
- Cabeçalho (ícone + nome + `tag` + pílula "N formações [· com ramificação]").
- **Peça (`brick`)**: `<a href=URL target=_blank>` com "studs" (bolinhas no topo), número/ bandeira,
  título e cauda (badge + botão "+" + ícone ↗). Variantes de estilo:
  - `base` → gradiente magenta, badge "comece aqui", bandeira no lugar do número.
  - `opt` → peça translúcida (cor clara), badge "opcional".
  - `sub` → peça menor (usada dentro dos forks).
  - normal → peça sólida na cor da trilha, numerada.
- **Fork**: renderiza uma "baseplate" (placa pontilhada) com colunas (`opt-stack`), cada uma com um
  rótulo e as peças `sub`.
- **Divisória `d`**: `<div class="plate-label">Texto</div>`.
- Visual das peças: relevo 3D via `box-shadow` (brilho no topo, sombra embaixo, "profundidade"
  `0 6px 0 -1px var(--deep)`), com `:hover`/`:active` simulando pressionar a peça.

### PASSO 6 — Filtro por carreira
- Clicar num card → mostra só aquela trilha (`.hidden` nas demais), marca `aria-pressed`, exibe o
  botão "Todas as trilhas" (topbar) e o "backlink", e faz `scrollIntoView` suave.
- Clicar de novo no mesmo card, ou em "Todas as trilhas"/"backlink" → mostra tudo.
- Respeitar `prefers-reduced-motion` no scroll.

### PASSO 7 — Acabamento One UI
- Cantos **bem** arredondados: cards `24px`, baseplate `26px`, peças `15px`, sub `12px`, legenda `22px`.
- Botões em **pílula** (`border-radius:999px`): topbar e CTA do rodapé.
- Mais respiro (paddings maiores) e sombras mais suaves.

### PASSO 8 — Skin gamer (jogo mobile)
Bloco de CSS adicional (skin), tudo com a paleta:
- **Fundo arcade**: `body::before` (brilhos radiais magenta/roxo/dourado) + `body::after`
  (grade sutil com `mask` radial que some nas bordas).
- **Hero**: `text-shadow` neon no `h1`; `.stats` viram **HUD** (painéis com vidro fosco e número em
  degradê); chips com brilho.
- **Cards level-select**: leve tint na cor da trilha, ícone com halo, `:hover` com elevação + zoom +
  anel de glow; selecionado com borda luminosa.
- **Peças**: `:hover` brilha na cor; peça `base` com **pulso** contínuo (`@keyframes startGlow`).
- **CTA** com pulso (`ctaPulse`); **mapa** flutua (`floatMap`).
- Tudo cancelado em `@media (prefers-reduced-motion:reduce)`.

### PASSO 9 — Plano de estudos (agenda estilo Outlook)
**Objetivo:** botão "+" em cada peça adiciona/remove a formação de um plano pessoal; um painel mostra
o plano como uma agenda; botões de "Ver na plataforma" e "Resetar estudos".

- **Modelo:** `plan = [{id, hue}]` salvo em `localStorage('dio-study-plan')`. Guardar a **cor**
  (`--hue`) da trilha de onde a peça foi adicionada.
- **Botão "+" (`.add-brick`)** dentro da cauda da peça (é um `<button>` dentro do `<a>`): ao clicar,
  `e.preventDefault()` (não navega) + alterna no plano. Mostra "+" normal e "✓" dourado quando no plano.
  Sincronizar o estado em **todas** as instâncias daquele id (a mesma formação pode aparecer em
  várias trilhas). Usar **delegação de eventos** no `document`.
- **Header:** botão "Meu plano" com **contador** (badge) que reflete `plan.length`.
- **Painel (`aside.plan-panel`)** deslizante da direita + overlay; fecha no ✕, no overlay ou `Esc`;
  trava o scroll do fundo (`body.plan-open{overflow:hidden}`).
- **Agenda:** agendar **uma formação por dia útil** a partir de **hoje** (`new Date()`, pulando
  sáb/dom), na ordem de inserção. Cada linha: coluna de data (dia da semana / número / mês, com
  "hoje" destacado) + "evento" com **barra colorida na cor da trilha** (`--evhue` inline), horário
  fixo ("19:00 – 20:30 · 1h30"), título e link **"Ver na plataforma"**. Botão ✕ remove o item.
- **Barra de ferramentas** do painel: **"Ver na plataforma"** (link geral p/ `web.dio.me`) e
  **"Resetar estudos"** (vermelho, com `confirm()`, limpa o plano e desmarca todos os "+").
- **Estado vazio** amigável quando `plan` está vazio.
- **Responsivo:** painel vira tela cheia no mobile; o botão do header colapsa para ícone + contador.

---

## 7. Funções de renderização (referência)

```js
refCount(c)            // conta formações únicas de uma carreira (steps.r + fork.opts.n)
studs(n)               // gera N "studs" (bolinhas) no topo da peça
brick(id,variant,num,badge)  // <a class="brick..."> ... </a>, inclui o botão .add-brick com data-id
// render dos cards: CAREERS.forEach -> button.card (com --hue inline)
// render das trilhas: CAREERS.forEach -> section.trail (base/opt/sub/fork/divisória)
// filtro: showAll() / filterTo(id)
// tema: saved()/sysDark()/isDark()/paint()
// plano (IIFE): loadPlan/savePlan/has/weekdays/syncButtons/updateCount/render/openPanel/closePanel
```

**Detalhe importante:** `brick()` recebe o **id** da formação (não o objeto), para conseguir gravar
`data-id` no botão "+". A cor do item é lida em tempo de clique com
`getComputedStyle(botao).getPropertyValue('--hue')` (herdado da `.trail`).

---

## 8. Critérios de aceite (checklist)

- [ ] Abre offline (clique duplo no arquivo), sem console de erros.
- [ ] 15 cards e 15 trilhas renderizados a partir de `CAREERS`.
- [ ] Contadores de formações corretos (inclui os ids dos forks).
- [ ] Tema claro/escuro funciona e persiste; escolha manual vence o sistema.
- [ ] Hero em largura total; mapa no canto superior direito; some em ≤820px.
- [ ] Filtro por carreira mostra/oculta trilhas e faz scroll suave.
- [ ] Cada peça abre a formação certa em nova aba.
- [ ] Botão "+" adiciona/remove **sem** navegar; "✓" aparece; contador do header atualiza.
- [ ] Painel abre/fecha (botão, overlay, Esc); agenda mostra datas a partir de hoje (dias úteis).
- [ ] "Ver na plataforma" (por evento e geral) e "Resetar estudos" (com confirmação) funcionam.
- [ ] Plano persiste após recarregar (localStorage).
- [ ] `prefers-reduced-motion` desliga animações; foco visível; contraste adequado.
- [ ] Responsivo (topbar, cards, painel) em mobile.

---

## 9. Sequência de prompts (como foi feito ao vivo)

Reproduza a evolução do demo colando um prompt de cada vez:

1. **Base:** *"Leia o `formacoes-dio.md` e crie um `roadmap-dio.html`: uma landing que organiza as 67
   formações da DIO em trilhas de carreira, cada trilha como uma torre de LEGO (do zero ao avançado),
   cada peça abre a formação na plataforma. Tema claro/escuro, responsivo, sem dependências, tudo em
   um arquivo. Renderize a partir de dados em JS."*
2. **Novas caixas de nuvem:** *"Crie duas novas caixas no `roadmap-dio.html`: uma focada em estudos de
   AWS e outra em Azure."*
3. **Hero + mapa:** *"Deixe a caixa de hero em 100% de largura e transforme o desenho de trilha do
   fundo num mapa-múndi estilo Super Mario World (mantendo a paleta)."*
4. **Mapa reposicionado + One UI:** *"Quero o mapa mais para cima, no lado direito da hero, e todo o
   layout mais no estilo One UI."*
5. **Caixa IA no-code:** *"Crie uma caixa 'IA Builder for non Devs' com todas as trilhas de IA que não
   tenham a ver com devs."*
6. **Vibe gamer:** *"Deixe todo o layout com uma vibe mais gamer, estilo jogo mobile."*
7. **Plano de estudos:** *"Adicione um botão '+' em cada bloco para incluí-lo num plano de estudos; no
   header, um menu para ver o plano organizado como uma agenda do Outlook, com botões de 'ver na
   plataforma' e 'resetar estudos'."*

> **Dica de aula:** peça sempre alterações **pequenas e verificáveis**. A cada prompt, abra o arquivo
> no navegador e confira o critério de aceite correspondente antes de seguir. É assim que se faz
> engenharia reversa com IA: incremento → verificação → próximo incremento.

---

*Documento gerado para fins didáticos — plataforma DIO. As 67 formações e URLs pertencem à DIO;
a ordem sugerida nas trilhas é uma recomendação de estudo, adaptável ao ritmo de cada aluno.*
