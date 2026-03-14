# Carrosséis Instagram — Novos Fogos

Cada ficheiro HTML é um carrossel (slides **1080×1080 px**).

## Exportar PNGs para Meta Business Suite

Para ter **uma pasta por carrossel** com os slides em PNG (1080×1080), prontos para upload:

```bash
cd social-media
npm install
npm run export
```

As imagens são guardadas em **`social-media/instagram-feed/01-o-que-e-casa-porteira`** a **`09-opcoes-flexiveis`** (ficheiros `01.png`, `02.png`, …). Ver `instagram-feed/README.md` para detalhes.

## Alternativa manual

Abre cada `.html` no browser (a partir da pasta do projeto), redimensiona para **1080×1080 px**, faz scroll a cada slide e captura o ecrã.

## Ficheiros

**Carrosséis (1080×1080)** — O logo aparece **apenas em slides com fundo branco**. Capa **clara** = azul claro (slide--cover), capa **azul** = fundo azul (slide--brand).

**Ordem sugerida para a grid 3×3** (alternância clara / azul na capa):

| 1 claro | 2 azul | 3 claro |
| 4 azul | 5 claro | 6 azul |
| 7 claro | 8 azul | 9 claro |

1. `carousel-1-o-que-e-casa-porteira.html` — O que é uma casa da porteira? (capa clara)
2. `carousel-quem-somos.html` — Quem Somos (capa azul)
3. `carousel-post-2-o-problema.html` — O Problema (capa clara)
4. `carousel-3-porque-adiam.html` — Porque adiam? (capa azul)
5. `carousel-2-tres-caminhos.html` — 3 caminhos (capa clara)
6. `post-9-avaliacao-gratuita.html` — Avaliação gratuita (capa azul)
7. `carousel-post-4-legalizacao.html` — Legalização (capa clara)
8. `carousel-post-5-compra-direta.html` — Compra Direta (capa azul)
9. `carousel-post-6-modelo-hibrido.html` — Opções flexíveis (capa clara)

Abre os HTML a partir da pasta do projeto para as imagens e o logo carregarem. Cores: `#3b82f6`, `#1e3a8a`, `#eff6ff`.
