const http = require('http');

const port = process.env.PORT || 3000;
const baseUrl = `http://localhost:${port}`;

const checks = [
  {
    path: '/',
    expectedStatus: 200,
    expectedText: 'ShopMax'
  },
  {
    path: '/style.css',
    expectedStatus: 200,
    expectedText: '.topbar'
  },
  {
    path: '/script.js',
    expectedStatus: 200,
    expectedText: 'addBalance'
  }
];

async function run() {
  for (const check of checks) {
    await requestWithRetry(check);
  }

  console.log('Smoke test concluído com sucesso. Aplicação respondeu corretamente.');
}

function requestWithRetry(check, attempt = 1) {
  return new Promise((resolve, reject) => {
    const request = http.get(`${baseUrl}${check.path}`, (response) => {
      let body = '';

      response.on('data', (chunk) => {
        body += chunk;
      });

      response.on('end', () => {
        if (response.statusCode !== check.expectedStatus) {
          retryOrFail(check, attempt, resolve, reject, `Status inesperado em ${check.path}: ${response.statusCode}`);
          return;
        }

        if (!body.includes(check.expectedText)) {
          retryOrFail(check, attempt, resolve, reject, `Conteúdo esperado não encontrado em ${check.path}.`);
          return;
        }

        console.log(`✓ ${check.path} respondeu com sucesso.`);
        resolve();
      });
    });

    request.on('error', (error) => {
      retryOrFail(check, attempt, resolve, reject, error.message);
    });

    request.setTimeout(5000, () => {
      request.destroy();
      retryOrFail(check, attempt, resolve, reject, `Timeout em ${check.path}.`);
    });
  });
}

function retryOrFail(check, attempt, resolve, reject, message) {
  if (attempt < 5) {
    setTimeout(() => {
      requestWithRetry(check, attempt + 1).then(resolve).catch(reject);
    }, 1000);
    return;
  }

  reject(new Error(message));
}

run().catch((error) => {
  console.error(`Smoke test falhou: ${error.message}`);
  process.exit(1);
});
