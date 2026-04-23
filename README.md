# ShopMax em Node.js

Projeto de marketplace adaptado para **Node.js**, mantendo a interface original em **HTML**, **CSS** e **JavaScript** e adicionando um servidor HTTP para execução local e futura evolução do sistema.

## Estrutura do projeto

```bash
shopmax-node/
│
├── azure-pipelines.yml
├── package.json
├── package-lock.json
├── server.js
├── .gitignore
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## Pré-requisitos

- Node.js 20 ou superior
- npm

## Como executar

```bash
npm install
npm start
```

Depois, acesse:

```bash
http://localhost:3000
```

## Scripts disponíveis

- `npm start`: inicia o servidor
- `npm run dev`: inicia o servidor em modo watch
- `npm run check`: valida a sintaxe do arquivo `server.js`

## Observações

- Os arquivos estáticos ficam dentro da pasta `public`
- O servidor foi implementado com módulos nativos do Node.js, sem dependências externas
- O pipeline foi ajustado para rodar com Node.js e análise no SonarQube Cloud
