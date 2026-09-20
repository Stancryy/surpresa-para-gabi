/**
 * PERSONALIZE AQUI — todos os textos e músicas do presente.
 * Não é preciso mexer no player nem no HTML para alterar o conteúdo.
 * Mantenha as aspas e as vírgulas ao editar.
 */
export const CONFIG = {
  recipient: 'Gabrielly',
  signature: '[Seu nome]', // PERSONALIZE: substitua pelo seu nome.
  // Mês começa em 1 nesta configuração. A data usa o horário LOCAL do navegador.
  anniversary: { year: 2026, month: 9, day: 21, hour: 0, minute: 0 },
  hero: {
    title: 'Se for com você,',
    accent: 'eu quero viver.',
    greeting: 'Meu amor,',
    paragraphs: [
      'Não esperei uma data especial para te escrever. Às vezes, o carinho fica tão grande aqui dentro que precisa encontrar um jeito de chegar até você. Hoje, ele virou esta carta.',
      'Eu amo ter você na minha vida, Gabrielly. Amo nossas conversas, o seu jeito de estar perto e até a saudade que fica quando a gente se despede. Com você, as coisas simples têm um lugar especial em mim.',
      'Quero estar ao seu lado de verdade: ouvir, cuidar, aprender com você e fazer a minha parte, todos os dias, pelo nosso futuro. Não tenho todas as respostas, mas tenho muita vontade de construir esse caminho com você.'
    ],
    note: 'Não é sobre um dia especial.\nÉ sobre você tornar os dias especiais.'
  },
  // PERSONALIZE: oito motivos. Não são acontecimentos inventados; são sugestões de carinho.
  reasons: [
    { title: 'O seu sorriso', text: 'Porque ver você sorrir muda o ritmo do meu dia. É uma das minhas formas favoritas de saber que está tudo bem.', icon: 'sun' },
    { title: 'Nossas conversas', text: 'Porque com você eu quero falar de tudo — das coisas pequenas aos sonhos que ainda nem sei explicar.', icon: 'message' },
    { title: 'Seu jeito de cuidar', text: 'Porque o carinho que existe no seu jeito me faz sentir acolhido. E me dá vontade de cuidar de você também.', icon: 'heart' },
    { title: 'Sua companhia', text: 'Porque estar junto de você já é um bom plano. O lugar importa muito menos quando a companhia é você.', icon: 'coffee' },
    { title: 'Você sendo você', text: 'Porque eu gosto do que acontece quando você se sente à vontade: do seu jeito espontâneo, sem precisar ensaiar.', icon: 'sparkles' },
    { title: 'Os pequenos gestos', text: 'Porque o amor também mora nas delicadezas que quase passam despercebidas. Com você, eu aprendo a reparar nelas.', icon: 'flower' },
    { title: 'Poder ser eu mesmo', text: 'Porque ao seu lado eu quero ser sincero, dividir o que sinto e deixar você conhecer quem eu realmente sou.', icon: 'feather' },
    { title: 'O que ainda vem', text: 'Porque pensar no futuro fica mais bonito quando imagino você nele. Quero construir, com calma, tanta coisa com você.', icon: 'infinity' }
  ],
  // PERSONALIZE: mantenha aqui as lembranças de vocês, sem precisar editar os cartões.
  memories: [
    { number: '01', label: 'O COMEÇO DE NÓS', title: 'Os primeiros beijos', text: 'Naquele dia em que te deixei em casa, a gente ficou realmente a sós pela primeira vez. Conversar olho no olho tinha um jeito diferente, novo — e tão bom. Vieram os beijos tímidos, daqueles que talvez durem pouco, mas ficam muito tempo na memória. Os nossos ficaram.', note: 'tímidos, mas inesquecíveis.', icon: 'heart' },
    { number: '02', label: 'NOSSO TEMPO JUNTO', title: 'Uma segunda-feira só nossa', text: 'Você não teria aula, e eu decidi faltar à minha para passar a manhã na sua casa. A gente planejou tudo no dia anterior, torcendo para dar certo. E deu. Uma segunda-feira que poderia ser tão comum acabou se tornando uma das manhãs mais maravilhosas da minha vida.', note: 'eu escolheria aquela manhã de novo.', icon: 'sun' },
    { number: '03', label: 'ENTRE PASSOS E PALAVRAS', title: 'Um caminho cheio de conversa', text: 'Meu irmão esqueceu o celular no ônibus, e fomos juntos recuperá-lo. A gente andou muito, mas o que ficou mesmo foram as horas conversando sobre nós dois. Foi um dos dias em que mais conversamos pessoalmente. No meio daquele caminho, eu gostei ainda mais de estar com você.', note: 'o melhor do caminho era você.', icon: 'footprints' }
  ],
  closing: {
    title: 'Ainda temos tanto',
    accent: 'para viver.',
    paragraphs: [
      'E eu quero viver com você. Os dias tranquilos, as descobertas, os planos que vão mudar pelo caminho. Quero celebrar o que der certo e segurar a sua mão quando for difícil.',
      'Esta carta é só um jeito de te lembrar: eu te amo, Gabrielly. E, no que depender de mim, não vai faltar cuidado, presença e vontade de fazer o nosso amor crescer.'
    ]
  }
};

/**
 * PERSONALIZE AS MÚSICAS AQUI.
 * 1. Coloque o arquivo autorizado em assets/audio/.
 * 2. Adicione { title: 'Título', artist: 'Artista', file: 'nome-exato.mp3' } abaixo.
 * O nome em `file` deve coincidir com o arquivo, inclusive maiúsculas e extensão.
 * Para remover uma faixa, remova o objeto completo da lista.
 * Para não ter músicas, use export const PLAYLIST = [];
 * Os cinco arquivos abaixo vieram de musicas/ no repositório fornecido.
 * Como não havia informação confirmada de artista, o campo é descritivo.
 */
export const PLAYLIST = [
  { title: 'Amber Hours', artist: 'Da nossa coleção', file: 'Amber_Hours.mp3' },
  { title: "Heart’s Embrace", artist: 'Da nossa coleção', file: 'Heart_s_Embrace.mp3' },
  { title: 'Midnight Bloom', artist: 'Da nossa coleção', file: 'Midnight_Bloom.mp3' },
  { title: 'Midnight Velvet Serenade', artist: 'Da nossa coleção', file: 'Midnight_Velvet_Serenade.mp3' },
  { title: 'Moonlit Reverie', artist: 'Da nossa coleção', file: 'Moonlit_Reverie.mp3' }
];