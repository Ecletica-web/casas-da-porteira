# Novos Fogos — Casas da Porteira

Site estático para legalização de casas da porteira em Lisboa e Porto.

## Estrutura do projeto

```
├── index.html          # Redirect → inicio.html
├── inicio.html         # Página inicial
├── contacto.html       # Formulário de avaliação
├── sobre.html          # Sobre a equipa
├── servicos.html       # Serviços (legalização, venda, híbrido)
├── artigos.html        # Listagem de artigos
├── obrigado.html       # Página de sucesso (conversões)
├── privacidade.html    # Política de privacidade
├── termos.html         # Termos e condições
├── about.html, contact.html, ...  # Redirects (URLs antigas para campanhas)
├── *-casa-porteira.html           # Artigos (guia, Lisboa, Porto, etc.)
├── assets/
│   ├── css/
│   │   └── style.css   # Estilos globais
│   ├── js/
│   │   └── main.js     # Formulário lead + ano no footer
│   └── images/        # Imagens (logo, hero, ícones)
├── CNAME               # Domínio custom (GitHub Pages)
└── README.md
```

## URLs

- **Principais (PT):** `inicio.html`, `contacto.html`, `sobre.html`, `servicos.html`, `artigos.html`, `obrigado.html`, `privacidade.html`, `termos.html`.
- **Redirects (EN):** `index.html` → inicio, `about.html` → sobre, `contact.html` → contacto, etc. (preservam UTM e campanhas).

## Desenvolvimento

- Site estático: abrir `inicio.html` no browser ou servir a pasta com um servidor local.
- Formulário: envia para Google Apps Script; sucesso redireciona para `obrigado.html` (tracking de conversões).
- Analytics: Google (GA4 + Ads), Microsoft Clarity, Termly (cookies). Tags no `<head>` de cada página.

## Tecnologias

- HTML5, CSS3 (variáveis, grid, flexbox), JavaScript (vanilla).
- Sem build step; adequado para GitHub Pages ou qualquer hosting estático.
