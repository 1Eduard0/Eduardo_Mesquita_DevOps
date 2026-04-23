const balanceElement = document.getElementById("balance");
const amountInput = document.getElementById("amountInput");
const addBalanceBtn = document.getElementById("addBalanceBtn");
const buyButtons = document.querySelectorAll(".buy-btn");
const cartCountElement = document.getElementById("cartCount");
const toast = document.getElementById("toast");

let balance = 0;
let cartCount = 0;

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function updateBalanceUI() {
  balanceElement.textContent = formatCurrency(balance);
}

function updateCartUI() {
  cartCountElement.textContent = cartCount;
}

function showToast(message, type = "info") {
  toast.textContent = message;
  toast.className = `toast show ${type}`;

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.className = "toast";
  }, 2500);
}

function addBalance() {
  const value = parseFloat(amountInput.value);

  if (isNaN(value) || value <= 0) {
    showToast("Digite um valor válido para adicionar saldo.", "error");
    return;
  }

  balance += value;
  updateBalanceUI();
  amountInput.value = "";

  showToast(`Saldo adicionado com sucesso: ${formatCurrency(value)}`, "success");
}

function buyProduct(productName, productPrice) {
  if (balance >= productPrice) {
    balance -= productPrice;
    cartCount++;
    updateBalanceUI();
    updateCartUI();

    showToast(
      `${productName} comprado com sucesso por ${formatCurrency(productPrice)}.`,
      "success"
    );
  } else {
    const missing = productPrice - balance;
    showToast(
      `Saldo insuficiente. Faltam ${formatCurrency(missing)} para comprar ${productName}.`,
      "error"
    );
  }
}

addBalanceBtn.addEventListener("click", addBalance);

amountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addBalance();
  }
});

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.name;
    const productPrice = parseFloat(button.dataset.price);
    buyProduct(productName, productPrice);
  });
});

updateBalanceUI();
updateCartUI();
