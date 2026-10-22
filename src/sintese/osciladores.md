# Osciladores e formas de onda

Todo sintetizador começa com um **oscilador**: um gerador que repete um mesmo
formato de onda muitas vezes por segundo. A quantidade de repetições por
segundo é a **frequência** (em hertz, Hz), que percebemos como altura. O
formato da onda determina o **timbre**.

## Experimente

Troque a forma de onda e a frequência e observe o osciloscópio. Repare como
ondas com "quinas" (quadrada, dente de serra) soam mais brilhantes que a
senoide.

<div class="synth-demo" data-demo="oscillator"></div>

## As quatro formas clássicas

| Forma | Harmônicos | Caráter |
|---|---|---|
| Senoide | Só a fundamental | Puro, "assobio" |
| Triangular | Só ímpares, caem rápido (1/n²) | Suave, parecida com flauta |
| Quadrada | Só ímpares, caem devagar (1/n) | Oca, parecida com clarinete |
| Dente de serra | Todos, caem devagar (1/n) | Brilhante, parecida com metais e cordas |

A frequência do enésimo harmônico é simplesmente \\( f_n = n \cdot f_0 \\),
onde \\( f_0 \\) é a frequência fundamental. O capítulo sobre
síntese aditiva mostra como somar senoides para construir cada uma dessas
formas.

## No Bitwig

> *Rascunho — a completar.*

- **Polysynth** e **Polymer**: osciladores com seleção de forma de onda.
- **Phase-4**: quatro osciladores senoidais com modulação de fase.
- **The Grid**: módulos de oscilador da categoria *Oscillator*.

**Exercício:** em uma track de instrumento, carregue o Polymer, desligue o
filtro e compare as formas de onda tocando a mesma nota. Coloque um analisador de
espectro depois do instrumento para ver os
harmônicos de cada forma.
