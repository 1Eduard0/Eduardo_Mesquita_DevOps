const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

const requiredFiles = [
  'junit.xml',
  'coverage/cobertura-coverage.xml',
  'coverage/coverage-summary.json',
  'coverage/lcov.info'
];

for (const file of requiredFiles) {
  const filePath = path.join(rootDir, file);

  if (!fs.existsSync(filePath)) {
    console.error(`Relatório obrigatório não encontrado: ${file}`);
    process.exit(1);
  }

  const stats = fs.statSync(filePath);
  if (!stats.isFile() || stats.size === 0) {
    console.error(`Relatório inválido ou vazio: ${file}`);
    process.exit(1);
  }
}

const junitContent = fs.readFileSync(path.join(rootDir, 'junit.xml'), 'utf8');
const coverageContent = fs.readFileSync(path.join(rootDir, 'coverage/cobertura-coverage.xml'), 'utf8');

if (!junitContent.includes('<testsuite')) {
  console.error('Arquivo junit.xml não possui estrutura JUnit válida.');
  process.exit(1);
}

if (!coverageContent.includes('<coverage')) {
  console.error('Arquivo cobertura-coverage.xml não possui estrutura Cobertura válida.');
  process.exit(1);
}

console.log('Relatórios de testes unitários e cobertura validados com sucesso.');
