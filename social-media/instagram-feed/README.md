# Instagram Feed — PNGs para Meta Business Suite

Cada subpasta corresponde a um carrossel. As imagens são geradas pelo script de export em **1080×1350 px** (formato 4:5, recomendado pelo Instagram para feed/carrosséis).

## Como gerar os PNGs (1080×1350)

Na pasta **`assets/social-media`** (onde está este README e os HTML):

```bash
npm install
npm run export
```

Isto abre cada carousel HTML, captura cada slide em 1080×1350 px e grava os PNGs nas pastas abaixo.

## Estrutura das pastas (ordem da grid 3×3)

| Pasta | Carrossel | Capa |
|-------|-----------|------|
| `01-o-que-e-casa-porteira` | O que é uma casa da porteira? | clara |
| `02-quem-somos` | Quem Somos | azul |
| `03-o-problema` | O Problema | clara |
| `04-porque-adiam` | Porque adiam? | azul |
| `05-tres-caminhos` | 3 caminhos | clara |
| `06-avaliacao-gratuita` | Avaliação gratuita | azul |
| `07-legalizacao` | Legalização | clara |
| `08-compra-direta` | Compra Direta | azul |
| `09-opcoes-flexiveis` | Opções flexíveis | clara |

Em cada pasta: `01.png`, `02.png`, … (um ficheiro por slide). Upload no Meta Business Suite como **carrossel** na mesma ordem (01, 02, 03, …).

## Requisitos

- **Node.js** (v18 ou superior)
- **Chrome** instalado no PC (o script usa o Chrome do sistema se o Puppeteer não tiver Chromium). Se der erro «Could not find Chrome», instala o Chrome ou corre: `npx puppeteer browsers install chrome`

Se algo falhar, abre os HTML manualmente no browser, redimensiona para 1080×1350 e captura cada slide.
