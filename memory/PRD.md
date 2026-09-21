# PRD — Para Gabrielly, com amor

## Atualização atual — carta pessoal, tempo total e animação 2D

Esta seção substitui as decisões antigas sobre a mensagem principal e contagem
regressiva descritas no histórico abaixo. O usuário informou que já salvou a
versão anterior no GitHub. Estas novas alterações ainda precisam ser salvas.

Pedido: substituir “A carta” integralmente pela mensagem pessoal fornecida,
começando “Oiii, meu amor. Hoje a gente faz 2 meses. Passou mais rápido do que eu
imaginava.” e terminando “Eu te amo, Gabrielly, e sempre vou amar.”; trocar a
contagem regressiva pela contagem total; avaliar animação 2D de rolagem.

Escolhas confirmadas: contar desde **21/07/2026 00:00 local**, exibindo o total
em dias, horas, minutos e segundos, sempre crescendo; efeitos discretos nos
papéis e detalhes, **sem mover o texto durante a leitura** ou prender o scroll.

Implementação atual:
- `hero.greeting` + os nove itens de `hero.paragraphs` em config.js reproduzem
  todo o texto do usuário, mantendo inclusive kkkkk, acentos e pontuação.
- `relationshipStart` substitui `anniversary`. `initElapsedCounter` no arquivo
  countdown.js calcula segundos decorridos reais; dias = períodos de 24h.
- Abaixo da data inicial, mostra zero; começa sozinho e não para em setembro.
  Visibilidade da aba recalcula sem atraso acumulado. Não existe mais celebração
  substituindo as placas. IDs/CSS do contador preservados; a etiqueta da data
  agora tem o testid semântico `relationship-start-date`.
- Seção “O nosso tempo juntos”, etiqueta “Juntos desde 21 de julho de 2026”.
- Novo `scroll-effects.js`: requestAnimationFrame sob demanda, listeners passivos,
  só enfeites aria-hidden, deslocamento até 8px desktop/4px mobile. Nada de loop
  contínuo, dependências ou scroll artificial. Respeita movimento reduzido,
  inclusive mudanças de preferência enquanto o site estiver aberto.
- Carta longa aparece apenas por opacidade; papéis preservam entrada única.
  Bilhete alinhado ao topo no desktop; mobile continua em coluna única.
- README atualizado sobre data, texto fixo do autor e animações.

Validação atual concluída:
- Relatório do agente: `/app/test_reports/iteration_2.json`. Passaram texto exato
  (saudação + nove parágrafos), contagem antes/no/depois do início e viradas,
  62 dias em 21/09/2026, continuidade após aniversário e layout com 1000+ dias.
- Passaram envelope, foco, fechar/reabrir, áudio sem autoplay, cinco músicas,
  oito razões e três memórias, navegação, testids e axe WCAG A/AA.
- Zero overflow em 360/390/768/1024/1920. Screenshots da carta longa e contador
  capturados também nas larguras 360, 390 e 1024 após os ajustes finais.
- Agente suspeitou de reset incompleto dos offsets ao mudar movimento reduzido.
  Conferência direta não reproduziu: todos ficaram vazios com translate:none.
  Ainda assim, refresh/update agora também limpam os offsets se a preferência
  mudar antes da entrega do evento change. Três ciclos completos de alternância
  passaram, com sete elementos zerados e efeito visual desativado em todos.
- Nenhum fluxo quebrado conhecido no escopo testado; testes em Chromium.
- Evidências consolidadas: `/app/test_reports/update_verification.json`.

Backlog atual: P0 concluído; P1 personalizar assinatura se o usuário
desejar e salvar a atualização; P2 dedicatória opcional para a música favorita.

---

## Histórico da primeira versão

## Pedido original e decisões aprovadas

Criar uma landing page romântica de página única, em português, como presente
espontâneo para Gabrielly. Aparência artesanal skeuomórfica: envelope com selo
de cera roxo, papel/cartolina, fitas, lilás/lavanda/uva, creme e rosé. Sem estética
futurista, fotos obrigatórias, bibliotecas pesadas ou backend. Tipografia Google
Fonts com alternativas. Arquivos separados index.html, css/style.css, js/ e
assets/audio/, assets/img/, personalizáveis com comentários e README.

O envelope deve abrir por clique/toque/teclado, revelar a carta e permitir scroll
normal. Hero de amor sincero; contador local até 21/09/2026 00:00 com celebração
quando terminar; oito razões; três memórias fiéis; player completo; fechamento
com assinatura editável. Responsivo de 360 a 1920px, movimento reduzido, foco e
semântica acessível. Preparar para GitHub Pages no repositório solicitado:
https://github.com/Stancryy/surpresa-para-gabi.git.

Memórias originais: primeiro momento a sós ao deixá-la em casa, conversa olho no
olho e beijos tímidos; segunda-feira em que ela não teve aula e ele faltou para
passar a manhã na casa dela, planejada no dia anterior; busca pelo celular do
irmão esquecido no ônibus, com longa caminhada e horas de conversa sobre o casal.

Plano aprovado: envelope em cada visita, reprodução exclusivamente manual,
oito razões, três memórias sem fotos, sem senha, assinatura '[Seu nome]'.
Última informação do usuário: **'as musicas estão no repositorio na pasta musicas'**.
Cinco MP3 já presentes no checkout foram copiados de musicas/ para assets/audio/;
originais preservados. Artistas desconhecidos rotulados 'Da nossa coleção'.

## Arquitetura

- HTML/CSS/JS ES modules puros na raiz. Caminhos relativos para subdiretórios.
- config.js centraliza conteúdo, assinatura, data e array PLAYLIST.
- main.js: criação segura de cartões, envelope, foco, scroll reveal e navegação.
- countdown.js: Date com componentes locais, nunca interpreta a data como UTC.
- player.js: HTMLAudioElement real, playlist, play/pause, anterior/próxima,
  seek, volume, mute, repetição da lista, erros e vazio. Sem autoplay.
- icons.js e SVG local: vetores decorativos pequenos. CSS faz os objetos físicos.
- Sem BD, API, credenciais, persistência ou cookies. Google Fonts é a única
  requisição externa da experiência. Fontes alternativas em caso de falha.
- frontend/server.js é apenas adaptador de prévia Node, iniciado pelo supervisor
  via yarn start (script padrão server.js); HOST e PORT vêm do ambiente. Não faz
  parte da hospedagem estática. Sem dependências de aplicação.

## Implementado

- Envelope roxo tátil animado, bilhete e ramo botânico local, entrada acessível.
- Página completa com mensagem autoral, contador, oito razões e três memórias.
- Player com cinco MP3 reais: Amber Hours, Heart’s Embrace, Midnight Bloom,
  Midnight Velvet Serenade, Moonlit Reverie.
- Estados vazios/falha, controles rotulados, controles físicos de volume no mobile.
- Fechamento, '[Seu nome]', botão guardar pausa o áudio e restaura envelope/foco.
- Breakpoints responsivos, prefers-reduced-motion, semântica e data-testid.
- README com personalização, áudio, GitHub Pages, privacidade e direitos autorais.
- Não foi executado push. Usuário deve usar Save to Github com conta autorizada.

## Verificações

- Prévia externa carregada; envelope, abertura, hero e playlist fotografados.
- Áudio permanece pausado na entrada e após abrir. Cinco faixas listadas.
- Revisão funcional pelo agente: /app/test_reports/iteration_1.json.
- Correções posteriores: proporção das imagens (`height: auto`) e posição do
  ramo eliminaram overflow; cores do bilhete e números ajustadas para contraste.
- Reteste real em navegador: overflow = 0 em 360, 390, 768, 1024 e 1920px;
  axe sem violações WCAG A/AA na carta toda e sem violações de contraste no envelope.
- Cinco MP3 reproduzem e avançam automaticamente ao chegar ao fim, incluindo
  quinta → primeira. A suspeita inicial do agente sobre ended não se reproduziu:
  eventos reais de pause/ended/play e currentTime crescente confirmaram o fluxo.
- Contagem com relógio controlado: 20/09/2026 23:59:58 mostra 00:00:00:02;
  21/09/2026 00:00:00 mostra celebração; visita em 2027 mantém celebração.
- Movimento reduzido: envelope abre imediatamente por Enter, sem autoplay;
  foco transferido, recarregar restaura envelope e testids sem duplicação.
- Agente validou controles do áudio, cinco faixas, seek, volume, mute, wrap,
  estados de 404 e array vazio, HTTP 206, conteúdo e ausência de chamadas /api.
- Testes automatizados feitos em Chromium. Não se afirma validação física de
  todos os navegadores ou aparelhos; implementação usa APIs nativas amplamente suportadas.
- Resultado consolidado: /app/test_reports/final_verification.json.

## Backlog priorizado

- P0: concluído; nenhum bloqueio conhecido no escopo entregue.
- P1: usuário personalizar assinatura, razões e artistas, se desejar.
- P1: usuário salvar no repositório autorizado via Save to Github.
- P2: opcionalmente inserir um bilhete ou dedicatória específica em cada música.

## Próximas tarefas

Usuário pode personalizar assinatura e textos em js/config.js e salvar no GitHub
usando Save to Github. Orientação do suporte foi repassada integralmente.
Não houve push realizado pelo agente. Sem integrações simuladas na aplicação.