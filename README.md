# ShopMax Node

Projeto de site em Node.js preparado para pipelines no Azure DevOps.

## Scripts disponíveis

- `npm run check`: valida a sintaxe dos arquivos JavaScript
- `npm run build`: gera a pasta `dist`
- `npm run validate:dist`: valida se o build gerou os arquivos obrigatórios
- `npm run smoke`: executa um smoke test HTTP contra a aplicação em execução
- `npm test`: executa testes e gera:
  - `junit.xml`
  - `coverage/coverage-summary.json`
  - `coverage/cobertura-coverage.xml`
  - `coverage/lcov.info`
- `npm start`: inicia o servidor local

## Como rodar localmente

```bash
npm ci
npm run check
npm run build
npm run validate:dist
npm start
```

Depois acesse:

```text
http://localhost:3000
```

## Pipelines

- `azure-pipelines.yml`: análise estática com SonarQube Cloud/SonarCloud
- `azure-pipelines-1.yml`: pipeline de testes e cobertura
- `azure-pipelines-build-ci.yml`: pipeline Build CI, focada em validação, build, smoke test e publicação do artefato

## Estrutura

- `public/`: arquivos estáticos do site
- `src/`: regras de negócio testáveis
- `tests/`: testes automatizados
- `scripts/build.js`: geração do `dist`
- `scripts/run-tests.js`: executor de testes e geração de relatórios
- `scripts/validate-dist.js`: validação do artefato gerado
- `scripts/smoke-test.js`: smoke test HTTP da aplicação

## Pipeline Build CI completa

A pipeline `azure-pipelines-build-ci.yml` realiza integração contínua com foco em build da aplicação. Ela executa validação de sintaxe, testes unitários, publicação dos resultados de teste, geração do build, validação da pasta `dist`, smoke test HTTP sobre o artefato gerado e publicação dos artefatos finais no Azure DevOps.

Fluxo principal:

1. configura Node.js;
2. restaura dependências somente quando existirem dependências externas;
3. executa `npm run check`;
4. executa `npm run test:unit`;
5. valida relatórios JUnit e Cobertura;
6. executa `npm run build`;
7. valida a pasta `dist`;
8. sobe o servidor usando `PUBLIC_DIR=dist`;
9. executa smoke test HTTP;
10. empacota e publica os artefatos da aplicação.
