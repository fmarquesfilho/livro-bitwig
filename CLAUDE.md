# Livro "Aprendendo Bitwig Studio"

Livro em português (pt-BR), feito com mdBook, publicado no GitHub Pages sob CC BY-SA 4.0.

## Regras de conteúdo

- O manual do Bitwig (User Guide 5.3 e Quick Guide 6.1) é © Bitwig GmbH: usar só como referência. Nunca copiar ou traduzir trechos; escrever texto próprio e linkar a seção do manual.
- Só adaptar material com licença compatível com CC BY-SA 4.0 (CC0, CC BY, CC BY-SA). Material NC ou ND só pode ser citado. A lista fica em `src/referencias.md`; manter atualizada.
- Todo trecho adaptado leva atribuição no capítulo (título, obra, autor/fonte, licença).
- Estrutura de cada capítulo de conceito: explicação independente do software → demo interativa → seção "No Bitwig" com devices e exercício.
- Não afirmar nomes de devices ou parâmetros do Bitwig sem conferir no manual ou no Quick Guide.

## Demos

Demos Web Audio ficam em `theme/demos.js` (objeto `demos`, uma função por demo) e são usadas no Markdown com `<div class="synth-demo" data-demo="nome"></div>`. Áudio só começa após clique e com volume baixo por padrão.
