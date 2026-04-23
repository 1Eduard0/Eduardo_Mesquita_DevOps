# ShopMax Node

Versão do projeto preparada para funcionar com uma pipeline de build e testes no Azure DevOps sem alterar a pipeline fornecida.

## Scripts disponíveis

- `npm run check`: valida a sintaxe dos arquivos Node.js
- `npm run build`: gera a pasta `dist`
- `npm test`: executa testes e gera:
  - `junit.xml`
  - `coverage/coverage-summary.json`
  - `coverage/cobertura-coverage.xml`
  - `coverage/lcov.info`

## Estrutura

- `public/`: arquivos estáticos
- `src/`: regras de negócio testáveis
- `tests/`: testes automatizados
- `scripts/build.js`: geração do `dist`
- `scripts/run-tests.js`: executor de testes e geração de relatórios
