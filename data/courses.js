/* =====================================================================
   COURSES — cursos DIO avulsos (web.dio.me/course/...)
   Cada item:  id: {t, u, img, min}
     id    número único em todo o catálogo (cursos usam 200 em diante)
     t, u  título e link na DIO
     img   (opcional) capa do curso (URL da imagem); sem ela, o lesson pack usa uma capa
           animada sobre IA (js/pack-covers.js)
     min   (opcional) duração em minutos; sem ela, vale 1 hora (60)
   Curso avulso não aparece nos roadmaps: entra nos lesson packs (paths/lesson-packs.js)
   e na busca e no Meu plano das Guias.
   ===================================================================== */
const COURSES={
  200:{t:"Introdução ao Empreendedorismo Digital: Como Começar a Empreender na Era da IA",
       u:"https://web.dio.me/course/introducao-a-empreendedorismo-digital-como-comecar-a-empreender-na-era-das-ia/learning/4f055afc-b7d2-43c3-8b57-0f9cf65d0fe1",
       img:"https://hermes.dio.me/courses/cover/56b921cc-e63e-4254-9f91-693c859b2a72_cover.jpg", min:60},
  201:{t:"One Person Business: Como Gerir e Organizar um Negócio de Uma Pessoa com Agentes de IA",
       u:"https://web.dio.me/course/one-person-business-como-gerir-e-organizar-um-negocio-de-uma-pessoa-com-agentes-de-ia/learning/89657155-e079-4be1-b799-d4fe1a610669",
       img:"https://hermes.dio.me/courses/cover/a20ea29f-3ede-445f-b679-7418a4c6f0a3_cover.jpg", min:60},
  202:{t:"Da Ideia ao MVP: Como Transformar uma Ideia em um Produto ou Serviço com IA e Business Model Canvas",
       u:"https://web.dio.me/course/da-ideia-ao-mvp-como-transformar-uma-ideia-em-um-produto-ou-servico-com-ia-e-business-model-canvas/learning/51afef3c-019d-478e-b45e-aafd65edb91f",
       img:"https://hermes.dio.me/courses/cover/1f1ea3e6-6596-4ba8-a992-f87dbbde20c7_cover.jpg"},
  /* capas a confirmar */
  203:{t:"De Chatbots a Agentes",
       u:"https://web.dio.me/course/potencializando-seus-estudos-e-carreira-com-ia-chatbots-copilotos-e-agentes/learning/0c91fe1c-f88b-4fe6-b891-83329e2379a6"},
  204:{t:"Introdução à Visão Geral do Ecossistema de Agentes",
       u:"https://web.dio.me/course/visao-geral-do-ecossistema-de-agentes/learning/c24e7b52-2957-44a6-a0d7-653d102869e9"},
  205:{t:"Introdução à Instalação e Configuração Inicial do OpenAgents",
       u:"https://web.dio.me/course/instalacao-e-configuracao-do-ambiente-de-agentes/learning/50534c95-3b37-448f-b987-2be3ea300222"},
  206:{t:"Fundamentos e setup de agentes com Google ADK",
       u:"https://web.dio.me/course/primeiros-passos-para-criar-agentes/learning/6c81146b-7e1b-4a49-8d78-f49f07fdbea0"},
  /* pack "IA do Zero": cursos das formações IA do Zero ao Primeiro Agente e Inteligência Artificial na Prática */
  207:{t:"Como a IA Funciona?",
       u:"https://web.dio.me/track/dxc-ia-do-zero-ao-primeiro-agente/course/era-da-ia-machine-learning-llms-ia-generativa-e-agentes/learning/93b09cec-f92f-4810-ad1e-ff916216f022"},
  208:{t:"Tudo o que Você Precisa Saber para Começar a Usar Inteligência Artificial",
       u:"https://web.dio.me/track/dxc-ia-do-zero-ao-primeiro-agente/course/tudo-o-que-voce-precisa-saber-para-comecar-a-usar-inteligencia-artificial/learning/749ae128-9a43-4816-9102-8ae49955bb96"},
  209:{t:"Fundamentos da IA Moderna: Machine Learning, LLMs, IA Generativa e Agentes",
       u:"https://web.dio.me/track/formacao-inteligencia-artificial-na-pratica/course/fundamentos-da-ia-moderna-machine-learning-llms-ia-generativa-e-agentes/learning/6c983dd3-c2d2-4bf0-ac0d-aba84164e066"},
  210:{t:"Potencializando Seus Estudos e Carreira com IA (Chatbots, Copilotos e Agentes)",
       u:"https://web.dio.me/track/formacao-inteligencia-artificial-na-pratica/course/potencializando-seus-estudos-e-carreira-com-ia-chatbots-copilotos-e-agentes-1/learning/f8936206-0ebf-4d90-ba9e-41389eb76b65"},
  211:{t:"Por Que o Contexto Muda a Resposta da IA",
       u:"https://web.dio.me/track/formacao-inteligencia-artificial-na-pratica/course/por-que-o-contexto-muda-a-resposta-da-ia/learning/d45e8966-8d2d-4b2e-8af2-d9d5f908d60a"}
};
