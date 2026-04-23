const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function resolveFilePath(urlPath) {
  if (urlPath === '/') {
    return path.join(publicDir, 'index.html');
  }

  return path.join(publicDir, urlPath);
}

function sendFile(filePath, response) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Arquivo não encontrado.');
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    const contentType = contentTypes[extension] || 'application/octet-stream';

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  });
}

function createServer() {
  return http.createServer((request, response) => {
    const sanitizedPath = request.url.split('?')[0];
    const filePath = resolveFilePath(sanitizedPath);
    sendFile(filePath, response);
  });
}

if (require.main === module) {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Servidor ShopMax iniciado em http://localhost:${PORT}`);
  });
}

module.exports = {
  createServer,
  resolveFilePath
};
