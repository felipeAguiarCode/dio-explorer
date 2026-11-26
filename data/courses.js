/* =====================================================================
   COURSES — cursos DIO avulsos (web.dio.me/course/...)
   Cada item:  id: {t, u, img, min}
     id    número único em todo o catálogo (cursos usam 200 em diante)
     t, u  título e link na DIO
     img   (opcional) capa do curso (URL da imagem)
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
       img:"https://hermes.dio.me/courses/cover/1f1ea3e6-6596-4ba8-a992-f87dbbde20c7_cover.jpg"}
};
