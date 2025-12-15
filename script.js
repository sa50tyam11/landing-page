const cart = document.getElementById("cart");
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let items = JSON.parse(localStorage.getItem("cart")) || [];

// Open / Close Cart
openCart.onclick = () => { cart.classList.add("open"); renderCart(); };
closeCart.onclick = () => cart.classList.remove("open");

// Add to cart
document.querySelectorAll(".product-card button").forEach(btn => {
  btn.onclick = () => {
    const card = btn.closest(".product-card");
    const name = card.dataset.name;
    const price = Number(card.dataset.price);
    items.push({ name, price });
    save();
    cart.classList.add("open");
  };
});

// Render cart
function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  items.forEach(i => {
    total += i.price;
    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${i.name}</span>
        <strong>₹${i.price}</strong>
      </div>
    `;
  });
  cartTotal.innerText = `Total: ₹${total}`;
}

// Save cart
function save() {
  localStorage.setItem("cart", JSON.stringify(items));
  renderCart();
}

// Scroll buttons
document.querySelectorAll(".scroll-shop").forEach(btn => {
  btn.onclick = () =>
    document.querySelector("#new").scrollIntoView({ behavior: "smooth" });
});

// Checkout
document.getElementById("payNow").onclick = () => {
  alert("Payment successful (Demo)");
  items = [];
  save();
  cart.classList.remove("open");
};

document.getElementById("checkoutBtn").onclick = () => {
  cart.classList.add("open");
};
