# Para Gabrielly, com amor

Uma carta de amor em página única, com envelope animado, papéis texturizados,
contagem regressiva, oito motivos, três lembranças e um player de música real.
Feita em HTML, CSS e JavaScript puros. Sem backend, instalação ou build para publicar.

## Arquivos

```text
index.html                 Estrutura e textos de apoio
css/style.css              Paleta, papel, envelope, player e responsividade
js/config.js               PERSONALIZE: textos, nome, data, motivos e músicas
js/main.js                 Conteúdo, abertura, navegação e animações
js/countdown.js            Contador no horário local do navegador
js/player.js               Player de áudio nativo e seus controles
js/icons.js                Pequenos ícones vetoriais, sem dependências
assets/audio/              Os cinco MP3 fornecidos, usados pelo player
assets/img/                Raminho decorativo e ícone do site
musicas/                   Originais do repositório, preservados
```

`frontend/` é apenas o servidor da prévia de desenvolvimento e não é necessário
no GitHub Pages. `memory/` e `plan/` são documentação de trabalho, não fazem parte
da experiência da carta. Nenhum destes diretórios precisa ser publicado.

## Personalizar a carta

Edite **`js/config.js`**:
- `recipient`: nome da destinatária;
- `signature`: substitua **`[Seu nome]`** pelo seu nome;
- `hero` e `closing`: mensagens principal e final;
- `reasons`: oito razões editáveis;
- `memories`: as três lembranças;
- `anniversary`: data e hora da contagem. O mês vai de 1 a 12.

Os demais textos pequenos estão comentados e organizados em `index.html`.
A paleta e as fontes ficam no início de `css/style.css`. As Google Fonts têm
alternativas locais caso não carreguem. Não há fotos pessoais ou serviços de rastreamento.

## Adicionar ou remover músicas

Os cinco MP3 da pasta original `musicas/` foram copiados para `assets/audio/`.
O player usa **apenas `assets/audio/`**. As cópias originais foram preservadas.

1. Adicione um MP3 autorizado em **`assets/audio/`**. Prefira nomes simples.
2. Em `js/config.js`, acrescente um objeto ao array `PLAYLIST`:

```js
export const PLAYLIST = [
  { title: 'Nome da música', artist: 'Nome do artista', file: 'minha-musica.mp3' },
  // Mais faixas aqui, separadas por vírgula.
];
```

O valor de `file` deve ser o nome exato, inclusive maiúsculas e extensão,
**sem** `assets/audio/` antes. Título e artista são os textos exibidos.
Não foram fornecidos nomes de artistas confirmados para os MP3 existentes;
por isso, o campo inicial diz “Da nossa coleção” e pode ser atualizado.

Para remover uma faixa, remova seu objeto do array. Adicionar somente um arquivo
à pasta **não** o inclui automaticamente no player. Com `PLAYLIST = []`, o player
mostra uma mensagem e mantém os controles indisponíveis. Não há faixas fictícias.

O áudio começa **somente** quando alguém usa o player, nunca ao carregar a página
ou abrir o envelope. Play/pausa, faixa anterior/seguinte, seleção de faixas,
progresso, volume e silenciar funcionam por teclado. Ao terminar uma música,
a próxima começa; a última volta à primeira. No celular, se o navegador limitar
o volume via JavaScript, use os botões físicos. Arquivos ausentes ou incompatíveis
exibem avisos sem bloquear a leitura.

## Visualizar no computador

Como o JavaScript usa módulos, abra com um servidor local em vez de clicar
diretamente no HTML. Na pasta do projeto, execute `python3 -m http.server` e abra
o endereço informado no terminal. Também é possível usar o Live Server do editor.

## Publicar no GitHub Pages

Repositório de destino: https://github.com/Stancryy/surpresa-para-gabi

1. Salve os arquivos no repositório mantendo `index.html` na raiz, com as pastas
   `css/`, `js/` e `assets/` ao lado. Na plataforma de criação, use **Save to Github**
   para enviar as alterações à conta autorizada. Preparar arquivos não equivale a enviá-los.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**.
4. Selecione a branch `main` e a pasta **/ (root)**; clique em **Save**.
5. Aguarde o GitHub apresentar o link do site. Com esse repositório, o endereço
   padrão é `https://stancryy.github.io/surpresa-para-gabi/`.

Todos os caminhos da página são relativos: não precisam ser alterados para
funcionar dentro de `/surpresa-para-gabi/`. Não há variáveis de ambiente, chaves
ou servidor de aplicação necessários para o site estático.

## Privacidade, direitos e acessibilidade

- Não há senha. Qualquer pessoa com o link pode ler a carta; num repositório
  público, textos e músicas também ficam públicos. `noindex` é uma orientação
  aos buscadores, não uma proteção de acesso.
- Disponibilize apenas músicas cuja publicação seja autorizada. Os arquivos
  usados foram fornecidos no repositório; a página não licencia as gravações.
- Não há coleta própria de dados nem cookies. Google Fonts é uma requisição
  externa para tipografia, com fontes locais alternativas se estiver indisponível.
- O envelope reaparece a cada visita. “Guardar a carta” volta ao envelope e pausa
  o áudio. A data de dois meses é **21/09/2026, 00:00, no horário local**; depois
  desse momento o contador é substituído pela celebração.
- Movimento reduzido, HTML semântico, foco visível, controles rotulados e
  mensagens de estado são respeitados. Sem bibliotecas pesadas.