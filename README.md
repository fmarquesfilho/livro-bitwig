# Aprendendo Bitwig Studio

Livro aberto e gratuito sobre síntese sonora e produção musical com o
Bitwig Studio. Cada conceito é apresentado primeiro com demonstrações
interativas no navegador e depois aplicado aos devices, moduladores e à
The Grid do Bitwig.

Leia online: <https://fmarquesfilho.github.io/livro-bitwig/>

## Escrevendo localmente

O livro usa o [mdBook](https://rust-lang.github.io/mdBook/).

```bash
brew install mdbook
mdbook serve --open
```

- Capítulos ficam em `src/` e a ordem é definida em `src/SUMMARY.md`.
  Entradas com link vazio `[Título]()` são capítulos ainda não escritos.
- Demonstrações interativas ficam em `theme/demos.js` e são inseridas no
  Markdown com `<div class="synth-demo" data-demo="nome"></div>`.

## Fontes e direitos

Veja [src/referencias.md](src/referencias.md). Em resumo: o manual do Bitwig é
protegido por direitos autorais e serve apenas de referência; trechos
adaptados de outras obras precisam ter licença compatível com CC BY-SA 4.0 e
atribuição no capítulo.

## Licença

Texto e código deste repositório: [CC BY-SA 4.0](LICENSE).

Bitwig e Bitwig Studio são marcas registradas da Bitwig GmbH. Este projeto é
independente e não tem afiliação com a Bitwig.
