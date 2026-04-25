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
