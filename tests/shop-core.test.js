const { addBalance, buyProduct, formatCurrency } = require('../src/shop-core');

const tests = [
  {
    name: 'formatCurrency deve formatar valor inteiro em real',
    run() {
      const formatted = formatCurrency(10);
      if (formatted !== 'R$\u00a010,00') {
        throw new Error(`Valor formatado inesperado: ${formatted}`);
      }
    }
  },
  {
    name: 'formatCurrency deve formatar valor decimal em real',
    run() {
      const formatted = formatCurrency(299.9);
      if (formatted !== 'R$\u00a0299,90') {
        throw new Error(`Valor decimal formatado inesperado: ${formatted}`);
      }
    }
  },
  {
    name: 'addBalance deve somar saldo com valor válido',
    run() {
      const result = addBalance(100, 50);
      if (!result.success || result.balance !== 150) {
        throw new Error('Saldo não foi atualizado corretamente.');
      }
    }
  },
  {
    name: 'addBalance deve aceitar valor numérico em formato texto',
    run() {
      const result = addBalance(100, '25.50');
      if (!result.success || result.balance !== 125.5) {
        throw new Error('Valor em texto não foi convertido corretamente.');
      }
    }
  },
  {
    name: 'addBalance deve rejeitar valor zero',
    run() {
      const result = addBalance(100, 0);
      if (result.success || result.balance !== 100) {
        throw new Error('Valor zero não foi tratado corretamente.');
      }
    }
  },
  {
    name: 'addBalance deve rejeitar valor não numérico',
    run() {
      const result = addBalance(100, 'abc');
      if (result.success || result.balance !== 100) {
        throw new Error('Valor não numérico não foi tratado corretamente.');
      }
    }
  },
  {
    name: 'buyProduct deve realizar compra com saldo suficiente',
    run() {
      const result = buyProduct(300, 1, 'Headset RGB', 299.9);
      if (!result.success || result.cartCount !== 2 || result.balance !== 0.10000000000002274) {
        throw new Error('Compra não foi concluída corretamente.');
      }
    }
  },
  {
    name: 'buyProduct deve impedir compra sem saldo suficiente',
    run() {
      const result = buyProduct(100, 0, 'Notebook Gamer', 4999.9);
      if (result.success || result.cartCount !== 0 || result.balance !== 100) {
        throw new Error('Compra indevida foi permitida.');
      }
    }
  },
  {
    name: 'buyProduct deve rejeitar preço inválido',
    run() {
      const result = buyProduct(100, 0, 'Produto inválido', 0);
      if (result.success || result.message !== 'Preço do produto inválido.') {
        throw new Error('Preço inválido não foi tratado corretamente.');
      }
    }
  },
  {
    name: 'buyProduct deve informar valor faltante quando saldo é insuficiente',
    run() {
      const result = buyProduct(100, 0, 'Cadeira Gamer', 899.9);
      if (!result.message.includes('Faltam') || !result.message.includes('Cadeira Gamer')) {
        throw new Error('Mensagem de saldo insuficiente não foi gerada corretamente.');
      }
    }
  }
];

module.exports = tests;
