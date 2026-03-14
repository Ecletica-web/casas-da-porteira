/**
 * Export each carousel HTML to a folder of 1080×1350 PNG slides for Instagram / Meta Business Suite (4:5 feed).
 * Run from social-media: npm install && npm run export
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const SLIDE_WIDTH = 1080;
const SLIDE_HEIGHT = 1350;
const CAROUSELS = [
  { html: 'carousel-1-o-que-e-casa-porteira.html', folder: '01-o-que-e-casa-porteira' },
  { html: 'carousel-quem-somos.html', folder: '02-quem-somos' },
  { html: 'carousel-post-2-o-problema.html', folder: '03-o-problema' },
  { html: 'carousel-3-porque-adiam.html', folder: '04-porque-adiam' },
  { html: 'carousel-2-tres-caminhos.html', folder: '05-tres-caminhos' },
  { html: 'post-9-avaliacao-gratuita.html', folder: '06-avaliacao-gratuita' },
  { html: 'carousel-post-4-legalizacao.html', folder: '07-legalizacao' },
  { html: 'carousel-post-5-compra-direta.html', folder: '08-compra-direta' },
  { html: 'carousel-post-6-modelo-hibrido.html', folder: '09-opcoes-flexiveis' },
];

const baseDir = __dirname;
const outputBase = path.join(baseDir, 'instagram-feed');

async function exportCarousel(browser, { html, folder }) {
  const htmlPath = path.join(baseDir, html);
  if (!fs.existsSync(htmlPath)) {
    console.warn(`Skip ${html}: file not found`);
    return;
  }

  const outDir = path.join(outputBase, folder);
  fs.mkdirSync(outDir, { recursive: true });

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  const page = await browser.newPage();

  await page.setViewport({
    width: SLIDE_WIDTH,
    height: SLIDE_HEIGHT * 2,
    deviceScaleFactor: 1,
  });

  await page.goto(fileUrl, {
    waitUntil: ['networkidle0', 'load'],
    timeout: 15000,
  });

  const slideHandles = await page.$$('.slide');
  const count = slideHandles.length;
  if (count === 0) {
    console.warn(`No .slide elements in ${html}`);
    await page.close();
    return;
  }

  for (let i = 0; i < count; i++) {
    await slideHandles[i].scrollIntoView();
    await page.waitForTimeout(200);

    const num = String(i + 1).padStart(2, '0');
    const pngPath = path.join(outDir, `${num}.png`);
    await slideHandles[i].screenshot({
      path: pngPath,
      type: 'png',
    });
  }

  slideHandles.forEach((h) => h.dispose());

  await page.close();
  console.log(`  ${folder}: ${count} slides → ${outDir}`);
}

async function main() {
  const runAll = process.argv.includes('--all');
  const carousels = runAll ? CAROUSELS : CAROUSELS;

  if (!fs.existsSync(path.join(baseDir, 'carousel-1-o-que-e-casa-porteira.html'))) {
    console.error('Run this script from assets/social-media (where the HTML and carousel-style.css are).');
    process.exit(1);
  }

  fs.mkdirSync(outputBase, { recursive: true });

  console.log('Exporting carousels to instagram-feed/ (1080×1350 PNG)...\n');

  const chromePaths = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ].filter(Boolean);
  const executablePath = chromePaths.find((p) => fs.existsSync(p));

  const browser = await puppeteer.launch({
    headless: 'new',
    ...(executablePath && { executablePath }),
  });

  try {
    for (const c of carousels) {
      await exportCarousel(browser, c);
    }
  } finally {
    await browser.close();
  }

  console.log('\nDone. Upload the PNGs in each folder to Meta Business Suite as a carousel.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
