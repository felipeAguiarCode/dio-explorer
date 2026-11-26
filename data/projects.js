/* =====================================================================
   PROJECTS — projetos (labs) DIO, web.dio.me/lab/...
   Cada item:  id: {t, u, ancora}
     id      número único em todo o catálogo
     t, u    título e link
     ancora  (opcional) id da formação que o projeto pratica: nos mapas da aba
             Roadmaps o projeto aparece pendurado nela (quando ela está no mapa)
   ===================================================================== */
const PROJECTS={
  73:{t:"Criando uma Dashboard da Porsche com Agentes de IA",u:"https://web.dio.me/lab/criando-agentes-de-criacao-de-dashboards-com-excel-e-claude-code/learning/d77a7428-f40b-451b-a890-1b942712194e",ancora:6},
  74:{t:"Copiloto de Vendas com IA para Atendimento ao Cliente",u:"https://web.dio.me/lab/copiloto-de-vendas-com-ia-para-atendimento-em-loja/learning/30b2b6c1-ee9c-433a-af21-d97ac9fee691",ancora:94},
  75:{t:"Criando um Agente para Automatizar um Fluxo de Trabalho em Python",u:"https://web.dio.me/lab/criando-um-agente-para-automatizar-um-fluxo-de-trabalho/learning/6634e12c-42c2-4d96-92bb-55058f769fbe",ancora:96},
  76:{t:"Plataformas e Arquiteturas Inteligentes para Dados e IA",u:"https://web.dio.me/lab/plataformas-e-arquiteturas-inteligentes-para-dados-e-ia/learning/44207581-32d3-4cd9-ae5f-430c1dac0fca",ancora:11},
  77:{t:"Agente para Criar Processo de Deploy Automatizado com Azure DevOps",u:"https://web.dio.me/lab/agente-para-criar-processo-de-deploy-automatizado-com-azure-devops/learning/fdfbc15c-2a89-438e-a784-923b5163a289",ancora:40},
  78:{t:"Criando um Agente de Revisão de Qualidade de Código com Microsoft Copilot Studio",u:"https://web.dio.me/lab/criando-um-agente-de-revisao-de-qualidade-de-codigo-com-microsoft-copilot-studio/learning/3a35d382-66bf-41ef-887b-cdc301482898",ancora:65},
  79:{t:"Agente de IA para Criar Serviços Serverless com GitHub Copilot e Azure Functions",u:"https://web.dio.me/lab/agente-de-ia-para-criar-servicos-serverless-com-github-copilot-e-azure-functions/learning/50cf2641-eae8-46d3-84b5-ef8c7aa1c8db",ancora:10},
  80:{t:"Treinando uma IA de Aprendizagem: Explore o Poder do NotebookLM",u:"https://web.dio.me/lab/acelere-sua-aprendizagem-com-ia-explore-o-poder-do-notebooklm/learning/36ac21c8-859c-430b-aa28-1ea3521799b0",ancora:93},
  81:{t:"Construa seu Assistente Virtual com Inteligência Artificial",u:"https://web.dio.me/lab/construa-seu-assistente-virtual-com-inteligencia-artificial/learning/26e69a48-c98d-4f01-ac54-0841a8c417a0",ancora:4},
  82:{t:"Calculadora EcoTrip: Simulador de Impacto Ambiental para Viagens",u:"https://web.dio.me/lab/calculadora-ecotrip-simulador-de-impacto-ambiental-para-viagens/learning/0c97038d-5595-4102-924a-eae2d11fc090",ancora:64},
  83:{t:"IA Entrevistador: Seu Simulador Inteligente de Entrevistas",u:"https://web.dio.me/lab/ia-entrevistador-seu-simulador-inteligente-de-entrevistas/learning/20285967-5eee-4f43-a1da-e7e5a90eb473",ancora:1},
  84:{t:"IA Mentor de Carreira: Descubra Seu Futuro em Tech",u:"https://web.dio.me/lab/ia-mentor-de-carreira-descubra-seu-futuro-em-tech/learning/23f5a8f4-88e3-4fc1-b7fd-93decc384de5",ancora:1},
  85:{t:"Criando um APP de Organização de Finanças Pessoais com Vibe Coding",u:"https://web.dio.me/lab/criando-um-app-de-organizacao-de-financas-pessoais-com-vibe-coding/learning/56e71f84-8be7-43e5-a9a6-5799eb3eac66",ancora:44},
  86:{t:"Criando um Plano de Aula Interativo e Personalizado com Ecossistema IA",u:"https://web.dio.me/lab/plano-de-aula-interativo-e-personalizado-com-ecossistema-ia/learning/afb8967f-c58a-483c-84be-24d615d3378c",ancora:93},
  87:{t:"Gerenciando uma Fábrica de Agentes com Azure IA Foundry",u:"https://web.dio.me/lab/gerenciando-uma-fabrica-de-agentes-com-azure-ia-foundry/learning/f7dbbe32-573b-42cc-b064-3e3c228f4a32",ancora:10},
  88:{t:"Criando um Agente para Detecção de Vulnerabilidades em Arquiteturas",u:"https://web.dio.me/lab/geracao-de-vulnerabilidades/learning/e2a0f011-72fc-4928-a216-868742656279",ancora:36},
  89:{t:"Gerando Testes Unitários com LangChain e Azure ChatGPT",u:"https://web.dio.me/lab/gerando-testes-unitarios-com-langchain-e-azure-chatgpt/learning/2ba57c3e-cd6f-4295-b60b-2b26704a03a5",ancora:24},
  90:{t:"Agente de IA para Consultas SQL",u:"https://web.dio.me/lab/agente-de-ia-para-consultas-sql/learning/d29374c1-6aa6-44b9-98c4-41515fe7465a",ancora:58},
  91:{t:"Treinando seu Primeiro Modelo de Machine Learning para prever Vendas",u:"https://web.dio.me/lab/treinando-um-modelo-de-machine-learning-para-prever-vendas/learning/2923a5ee-1a38-4844-a00c-aac5ebc2214d",ancora:61},
  92:{t:"Criando um Chatbot Baseado em Conteúdo de PDFs",u:"https://web.dio.me/lab/como-criar-um-chat-que-responde-com-base-em-pdfs-proprios/learning/c2168e0e-783c-4977-a13f-20a064147b0c",ancora:93},
};
