# Favicon (Novos Fogos)

O favicon do site usa o **novo logo** (ícone azul casa + keyhole, sem texto).

## O que está feito

- **Header:** novo logo `logo-azul.png` no fundo branco em todas as páginas.
- **Favicon:** ícone `logo-azul-s-nome.png` copiado para a raiz como `favicon.png`.
- **`<head>`:** em todas as páginas: `<link rel="icon" type="image/png" href="/favicon.png" />`.

Assim, `https://teu-dominio.com/favicon.png` fica acessível e o Google consegue usá-lo.

## Requisitos do Google

- Imagem **quadrada** (ou o Google pode não mostrar).
- Tamanho **mínimo 48×48 px** (recomendado 48×48, 96×96 ou 192×192).
- Formato **PNG ou ICO** (não SVG para resultados de pesquisa).
- No **mesmo domínio** e não bloqueada por `robots.txt`.

Se o ícone atual não for quadrado, convém criar uma versão 48×48 ou 192×192 em quadrado (com padding se precisar) e substituir o `favicon.png` na raiz.

## Depois de publicar

1. Em **Google Search Console** → Inspeção de URL → pedir indexação da homepage.
2. O favicon pode demorar alguns dias a aparecer nos resultados.
