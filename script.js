const productsCatalog = [
  {
    id: "iphone17",
    title: "iPhone 17",
    price: 109990,
    category: "iphone",
    page: "iphone-17.html"
  },
  {
    id: "airpods3",
    title: "AirPods Pro 3",
    price: 32990,
    category: "audio",
    page: "airpods-pro-3.html"
  },
  {
    id: "macbookm5",
    title: "MacBook Pro 14″ (M5)",
    price: 229990,
    category: "laptop",
    page: "macbook-pro-14-m5.html"
  }
];

let cart = JSON.parse(localStorage.getItem("appleDevicesCart") || "[]");

const saveCart = () => {
  localStorage.setItem("appleDevicesCart", JSON.stringify(cart));
};

const formatPrice = (value) =>
  `${new Intl.NumberFormat("ru-RU").format(value)} ₽`;

const calculateTotal = () =>
  cart.reduce((total, item) => total + Number(item.price), 0);

const updateCartCounters = () => {
  document.querySelectorAll("[data-cart-count]").forEach((element) => {
    element.textContent = cart.length;
  });
};

const renderCart = () => {
  const cartList = document.querySelector("#cartList");
  const totalElement = document.querySelector("#cartTotal");

  if (!cartList || !totalElement) {
    updateCartCounters();
    return;
  }

  cartList.innerHTML = "";

  if (!cart.length) {
    cartList.innerHTML = `
      <div class="cart-empty">
        Корзина пуста.
      </div>
    `;
    totalElement.textContent = formatPrice(0);
    updateCartCounters();
    return;
  }

  cart.forEach((item, index) => {
    const wrapper = document.createElement("div");
    wrapper.className = "cart-item";
    wrapper.innerHTML = `
      <div class="d-flex justify-content-between gap-3">
        <div>
          <p class="fw-semibold mb-1">${item.title}</p>
          <p class="small text-secondary mb-0">${formatPrice(item.price)}</p>
        </div>
        <button class="btn btn-sm btn-outline-danger" data-remove-index="${index}">
          Удалить
        </button>
      </div>
    `;
    cartList.appendChild(wrapper);
  });

  totalElement.textContent = formatPrice(calculateTotal());

  document.querySelectorAll("[data-remove-index]").forEach((button) => {
    button.addEventListener("click", () => removeFromCart(Number(button.dataset.removeIndex)));
  });

  updateCartCounters();
};

const addToCart = (productId) => {
  const product = productsCatalog.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  cart.push(product);
  saveCart();
  renderCart();
};

const removeFromCart = (index) => {
  cart = cart.filter((_, itemIndex) => itemIndex !== index);
  saveCart();
  renderCart();
};

const clearCart = () => {
  cart = [];
  saveCart();
  renderCart();
};

const pay = () => {
  if (!cart.length) {
    alert("Корзина пуста");
    return;
  }

  alert("Покупка прошла успешно!");
  clearCart();
};

const filterProducts = (category) => {
  document.querySelectorAll(".product-card").forEach((card) => {
    const shouldShow =
      category === "all" || card.dataset.category === category;
    card.classList.toggle("d-none", !shouldShow);
  });
};

const bindButtons = () => {
  document.querySelectorAll("[data-add-to-cart]").forEach((button) => {
    button.addEventListener("click", () => addToCart(button.dataset.addToCart));
  });

  const payButton = document.querySelector("#payButton");
  if (payButton) {
    payButton.addEventListener("click", pay);
  }

  const clearCartButton = document.querySelector("#clearCartButton");
  if (clearCartButton) {
    clearCartButton.addEventListener("click", clearCart);
  }

  const categoryFilter = document.querySelector("#categoryFilter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
      filterProducts(categoryFilter.value);
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  bindButtons();
  renderCart();
  updateCartCounters();
});
