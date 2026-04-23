const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, 'public');

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

function getFilePath(urlPath) {
  const safePath = urlPath === '/' ? '/index.html' : urlPath;
  const normalizedPath = path.normalize(safePath).replace(/^(\.\.[/\\])+/, '');
  return path.join(publicDirectory, normalizedPath);
}

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = contentTypes[extension] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('Arquivo não encontrado.');
        return;
      }

      response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Erro interno do servidor.');
      return;
    }

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const filePath = getFilePath(request.url);

  if (!filePath.startsWith(publicDirectory)) {
    response.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Acesso negado.');
    return;
  }

  sendFile(response, filePath);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
