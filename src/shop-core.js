function formatCurrency(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function addBalance(currentBalance, amount) {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
    return {
      success: false,
      balance: currentBalance,
      message: 'Digite um valor válido para adicionar saldo.'
    };
  }

  return {
    success: true,
    balance: currentBalance + numericAmount,
    message: `Saldo adicionado com sucesso: ${formatCurrency(numericAmount)}`
  };
}

function buyProduct(currentBalance, cartCount, productName, productPrice) {
  const numericPrice = Number(productPrice);

  if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
    return {
      success: false,
      balance: currentBalance,
      cartCount,
      message: 'Preço do produto inválido.'
    };
  }

  if (currentBalance >= numericPrice) {
    return {
      success: true,
      balance: currentBalance - numericPrice,
      cartCount: cartCount + 1,
      message: `${productName} comprado com sucesso por ${formatCurrency(numericPrice)}.`
    };
  }

  const missing = numericPrice - currentBalance;
  return {
    success: false,
    balance: currentBalance,
    cartCount,
    message: `Saldo insuficiente. Faltam ${formatCurrency(missing)} para comprar ${productName}.`
  };
}

module.exports = {
  formatCurrency,
  addBalance,
  buyProduct
};
