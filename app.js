// Produktlista
const products = [
  { id: 1, name: "70-tals klänning", price: 450, image: "https://via.placeholder.com/200x250?text=Kl%C3%A4nning" },
  { id: 2, name: "Retro vas", price: 250, image: "https://via.placeholder.com/200x250?text=Vas" },
  { id: 3, name: "Pastellskjorta", price: 300, image: "https://via.placeholder.com/200x250?text=Skjorta" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Rendera produkter
const productList = document.getElementById("product-list");
function renderProducts() {
  productList.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} kr</p>
      <button onclick="addToCart(${p.id})">Lägg i korg</button>
    `;
    productList.appendChild(card);
  });
}
renderProducts();

// Hantera varukorg
function updateCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  document.getElementById("cart-count").textContent = cart.length;

  const itemsList = document.getElementById("cart-items");
  itemsList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} kr`;
    li.innerHTML += ` <button onclick="removeFromCart(${index})">❌</button>`;
    itemsList.appendChild(li);
  });

  document.getElementById("cart-total").textContent = `Totalt: ${total} kr`;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

updateCart();

// Modaler
const cartModal = document.getElementById("cart-modal");
const checkoutModal = document.getElementById("checkout-modal");
document.getElementById("cart-button").onclick = () => cartModal.classList.remove("hidden");
document.querySelectorAll(".close").forEach(c => c.onclick = () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.add("hidden");
});

// Kassa
document.getElementById("checkout-button").onclick = () => {
  cartModal.classList.add("hidden");
  checkoutModal.classList.remove("hidden");
};

document.getElementById("checkout-form").onsubmit = (e) => {
  e.preventDefault();
  const summary = document.getElementById("order-summary");
  summary.innerHTML = "<h3>Tack för din beställning!</h3><p>Vi hör av oss snart ✨</p>";
  summary.classList.remove("hidden");
  cart = [];
  updateCart();
};
