const { addBalance, buyProduct, formatCurrency } = require('../src/shop-core');

const tests = [
  {
    name: 'formatCurrency deve formatar valor em real',
    run() {
      const formatted = formatCurrency(10);
      if (formatted !== 'R$\u00a010,00') {
        throw new Error(`Valor formatado inesperado: ${formatted}`);
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
    name: 'addBalance deve rejeitar valor inválido',
    run() {
      const result = addBalance(100, 0);
      if (result.success || result.balance !== 100) {
        throw new Error('Valor inválido não foi tratado corretamente.');
      }
    }
  },
  {
    name: 'buyProduct deve realizar compra com saldo suficiente',
    run() {
      const result = buyProduct(300, 1, 'Headset RGB', 299.9);
      if (!result.success || result.cartCount !== 2) {
        throw new Error('Compra não foi concluída corretamente.');
      }
    }
  },
  {
    name: 'buyProduct deve impedir compra sem saldo suficiente',
    run() {
      const result = buyProduct(100, 0, 'Notebook Gamer', 4999.9);
      if (result.success || result.cartCount !== 0) {
        throw new Error('Compra indevida foi permitida.');
      }
    }
  }
];

module.exports = tests;
