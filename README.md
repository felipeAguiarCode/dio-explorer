<div align="center">

# 🚀 DIO Explorer

### Um jeito visual e divertido de descobrir tudo o que você pode aprender na DIO.

<br>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Online](https://img.shields.io/badge/site-online-8A2BE2?style=for-the-badge&logo=github)

<br>

### 🌐 [**Acessar o site**](https://felipeaguiarcode.github.io/dio-explorer/)

<br>

<img src="assets/roadmap.png" alt="Tela do roadmap DIO" width="820">

</div>

<br>

## ✨ O que é isto?

O **DIO Explorer** é um site simples e bonito que mostra, de forma visual, o caminho de aprendizado
da [DIO](https://web.dio.me/). Em vez de listas cansativas, você vê **mapas**, **blocos** e até um
**sistema solar animado** — assim fica fácil entender por onde começar e o que cada plano oferece.

Não precisa instalar nada. É só abrir no navegador. 😉

<br>

## 🗺️ O que você encontra

- **Guias — "Por onde eu começo?"**
  As formações da DIO montadas como **torres de LEGO**. Escolha a carreira dos seus sonhos e vá
  encaixando as peças, do básico ao avançado.

- **Roadmaps — mapas mentais no estilo roadmap.sh**
  Cada carreira (**role-based**) e cada tecnologia (**skill-based**: React, Python, AWS…) vira um mapa
  interativo: formações obrigatórias no caminho principal, opcionais tracejadas, projetos e mentorias
  ligados ao passo que reforçam. Clique numa caixa para abrir o conteúdo na DIO ou guardar no seu plano.

- **Conteúdos — o sistema solar dos planos**
  Uma tela animada onde o seu plano fica no **centro** e tudo o que ele inclui **gira em volta**
  como planetas. Compare o **DIO Pro** e o **DIO Global** com um clique.

<br>

<div align="center">

|  DIO Pro  |  DIO Global  |
|:---------:|:------------:|
| <img src="assets/dio-pro.png" alt="Sistema solar do DIO Pro" width="440"> | <img src="assets/dio-global.png" alt="Sistema solar do DIO Global" width="440"> |
| 🟢 Conteúdos em **verde** | 🟡 Extras exclusivos em **amarelo** |

</div>

<br>

## 🖱️ Como usar

1. Abra o site pelo botão **[🌐 Acessar o site](https://felipeaguiarcode.github.io/dio-explorer/)**.
2. Na aba **Guias**, clique na carreira que combina com você e veja a trilha completa.
3. Na aba **Roadmaps**, abra o mapa da carreira ou da tecnologia e clique nas caixas para ver cada conteúdo.
4. Na aba **Conteúdos**, troque entre **DIO Pro** e **DIO Global** para ver o que cada plano oferece.
5. Clique em qualquer **planeta** para ler o que aquele conteúdo significa.

<br>

## 🗂️ Onde fica cada coisa

| Pasta | O que tem |
|---|---|
| `index.html` | A home (aba Guias). |
| `pages/` | As outras abas: `roadmap.html`, `mentorships.html`, `blog.html` e `plans.html`. |
| `data/` | Os conteúdos, um arquivo por tipo: `tracks.js`, `certifications.js`, `projects.js`, `courses.js`, `mentorships.js` (sessões + temas) e `articles.js` (índice dos posts do blog, com as formações que cada um explica). Todo conteúdo tem um **id** único em todo o catálogo. |
| `paths/` | A configuração dos caminhos: `guides.js` (trilhas das Guias), `roadmaps-role.js`, `roadmaps-skill.js`, `lesson-packs.js` e `project-ideas.js`. |
| `js/catalog.js` | Junta os arquivos de `data/` num catálogo único e desenha os origamis. |

Para incluir um curso, projeto ou mentoria novo: cadastre no arquivo certo de `data/` com um id livre
e encaixe esse id numa trilha em `paths/guides.js`. Os roadmaps se atualizam sozinhos.

<br>

## 🛠️ Feito com

HTML, CSS e JavaScript puro — **sem nenhuma dependência**. Leve, rápido e funciona direto no navegador.

<br>

<div align="center">

Feito com 💜 para a comunidade **DIO**

</div>
