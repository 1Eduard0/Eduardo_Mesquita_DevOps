const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const requiredFiles = [
  'index.html',
  'style.css',
  'script.js'
];

if (!fs.existsSync(distDir)) {
  console.error('Diretório dist não foi encontrado. Execute npm run build antes da validação.');
  process.exit(1);
}

for (const file of requiredFiles) {
  const filePath = path.join(distDir, file);

  if (!fs.existsSync(filePath)) {
    console.error(`Arquivo obrigatório não encontrado no build: ${file}`);
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile() || stats.size === 0) {
    console.error(`Arquivo inválido ou vazio no build: ${file}`);
    process.exit(1);
  }
}

const indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');

if (!indexContent.includes('ShopMax')) {
  console.error('O arquivo dist/index.html não contém a identificação esperada do ShopMax.');
  process.exit(1);
}

console.log('Build validado com sucesso. Arquivos obrigatórios encontrados em dist/.');
