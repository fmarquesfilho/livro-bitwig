# Handoff — Livro "Aprendendo Bitwig Studio"

*Atualizado em 23/10/2026.*

## Objetivo do projeto

O autor, Fernando Figueira (GitHub `fmarquesfilho`), está escrevendo um livro
gratuito, em português do Brasil, para **aprender a usar o Bitwig Studio a
fundo**. O livro é publicado no GitHub Pages.

Cada capítulo de conceito segue a mesma ordem:

1. **Conceito independente do software**, com foco em síntese sonora.
2. **Demonstração interativa** no navegador (Web Audio API).
3. Seção **"No Bitwig"**, que aplica o conceito aos devices, moduladores e
   módulos da The Grid, com um exercício prático.

## Onde está cada coisa

| Item | Local |
|---|---|
| Pasta local | `/Users/fernando/dev/livro-bitwig` |
| Repositório (público) | https://github.com/fmarquesfilho/livro-bitwig |
| Livro online | https://fmarquesfilho.github.io/livro-bitwig/ |
| Branch | `main` (push em `main` republica o site em 1–2 min) |
| Licença | CC BY-SA 4.0 (texto completo em `LICENSE`) |

## Decisões já tomadas (não reabrir sem o autor pedir)

- **Ferramenta: mdBook 0.5.4** (instalado via Homebrew). O autor **rejeitou o
  Astro Starlight**: não sugerir de novo.
- **Licença CC BY-SA 4.0**, escolhida para permitir adaptar Wikibooks,
  Wikipedia e Open Music Theory.
- **Pasta** `~/dev/livro-bitwig`; o idioma do livro é pt-BR.
- **Dependabot** atualiza as GitHub Actions mensalmente. O autor perguntou
  sobre o Renovate e ficou decidido que não é necessário.
- As actions já estão nas versões com Node 24 (o runtime mais novo das GitHub
  Actions). Não existe "Node 26" para actions.

## Regras de conteúdo (também em `CLAUDE.md`)

- O **manual do Bitwig é © Bitwig GmbH**, com todos os direitos reservados.
  Ele serve só como referência: nunca copiar nem traduzir trechos. Escrever
  texto próprio e linkar a seção do manual.
- Só **adaptar** material com licença compatível com CC BY-SA 4.0 (CC0, CC BY
  ou CC BY-SA). Material com cláusula NC ou ND só pode ser **citado**.
- Todo trecho adaptado leva atribuição no próprio capítulo (título, obra,
  fonte e licença).
- **Não afirmar nomes de devices ou parâmetros do Bitwig sem conferir** no
  manual ou no Quick Guide.

## Fontes pesquisadas

Detalhes e links em `src/referencias.md`.

- **Bitwig:** a versão atual é a **6.1**, mas o
  [User Guide oficial](https://www.bitwig.com/userguide/latest/) ainda
  descreve a **5.3** (tem PDF). As novidades da série 6 estão no
  [Quick Guide 6/6.1 (PDF)](https://downloads.bitwig.com/6.1/Release-Notes-6.1.pdf).
  A Bitwig anunciou um User Guide novo para a versão 6. Quando sair, atualizar
  as referências.
- **Podem ser adaptados:**
  - [Wikibooks — Sound Synthesis Theory](https://en.wikibooks.org/wiki/Sound_Synthesis_Theory)
    (CC BY-SA 4.0): é a fonte principal para a Parte III.
  - Open Music Theory (CC BY-SA 4.0).
  - Wikipedia (CC BY-SA 4.0).
  - MDN Web Audio: textos em CC BY-SA 2.5 e exemplos de código em CC0.
- **Só podem ser citados:**
  - Think DSP (CC BY-NC).
  - Computational Music Synthesis, de Sean Luke (CC BY-ND).
  - cmtext.com, de Jeffrey Hass (sem licença formal).
  - Livro do Miller Puckette (© World Scientific).

## Estrutura do repositório

```
book.toml                 configuração (pt-BR, site-url /livro-bitwig/, MathJax, CSS/JS extras)
src/SUMMARY.md            sumário em 5 partes; entradas com link vazio [Título]() são rascunhos
src/introducao.md         proposta do livro, versão do Bitwig, licença e aviso de marca
src/como-usar.md          explica as demos e as seções "No Bitwig"
src/referencias.md        tabela de fontes e licenças
src/sintese/osciladores.md  capítulo-modelo (único capítulo de conteúdo pronto)
theme/demos.js            demos Web Audio: objeto `demos`, uma função por demo
theme/demos.css           estilo das demos (usa as variáveis de tema do mdBook)
.github/workflows/deploy.yml  build com mdBook 0.5.4 e deploy no Pages
.github/dependabot.yml    atualização mensal das actions
CLAUDE.md                 regras para IAs que trabalham no repo
```

## Como trabalhar

```bash
cd ~/dev/livro-bitwig
mdbook serve --open      # pré-visualização com recarga automática
mdbook build             # gera em book/ (ignorado pelo git)
```

**Nova demo:**
1. Adicionar uma função em `demos` dentro de `theme/demos.js`. Ela recebe o
   elemento raiz e monta a interface.
2. Usar a demo no Markdown com
   `<div class="synth-demo" data-demo="nome"></div>`.

Já existem os helpers `getContext()` (AudioContext compartilhado), `el()`,
`slider()` e `drawScope()` (osciloscópio alinhado no cruzamento por zero). O
áudio só pode começar depois de um clique, e o volume padrão deve ser baixo.

**Novo capítulo:**
1. Criar o `.md` em `src/`.
2. Trocar o `[Título]()` correspondente no `SUMMARY.md` pelo caminho do
   arquivo.

## Estado atual

**Pronto e verificado:**
- O build local e o deploy funcionam.
- A demo `oscillator` (forma de onda, frequência, volume e osciloscópio) foi
  testada no navegador.
- A última execução do workflow terminou com sucesso, sem o aviso de Node 20.
- O site responde HTTP 200.

**Pendências e próximos passos sugeridos:**
1. **Conferir os devices citados** em `src/sintese/osciladores.md`
   (Polysynth, Polymer, Phase-4, categoria *Oscillator* da The Grid) no manual
   e no Quick Guide, e tirar a marca de "Rascunho".
2. Escrever os capítulos da **Parte II** (som, áudio digital, espectro).
   Sugestão de demos: forma de onda com analisador de espectro, e
   amostragem/aliasing.
3. Escrever os capítulos da **Parte III**, adaptando o Wikibooks com
   atribuição. Sugestão de demos:
   - filtro passa-baixa com cutoff/ressonância;
   - ADSR;
   - LFO;
   - síntese aditiva com controle de harmônicos;
   - FM com razão e índice.
4. Escrever as **Partes I, IV e V** a partir do manual 5.3 e do Quick Guide 6.1,
   sempre com texto próprio.
5. Criar um capítulo **"Novidades do Bitwig Studio 6"** a partir do Quick
   Guide.
6. Opcional:
   - Glossário. Foi retirado do `SUMMARY.md` por enquanto.
   - PDF via `print.html` ou plugin `mdbook-pdf`.
   - Melhoria da demo: o osciloscópio mostra o sinal já com o ganho
     aplicado, então a onda aparece pequena com volume baixo. Dá para
     normalizar a escala ou ligar o analisador antes do ganho.

## Observações

- Os avisos do GitHub Actions sobre "ubuntu-latest → Ubuntu 26" são só
  informativos.
- Commits do assistente terminam com
  `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Adaptar à IA que
  continuar o trabalho.
