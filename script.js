/* =========================
   INTRO SPLASH CONTROL
========================= */
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  if (intro) {
    setTimeout(() => {
      intro.style.display = "none";
    }, 4200); // sync with your CSS animation
  }
});

/* =========================
   SMOOTH NAV SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* =========================
   CART STATE
========================= */
let cart = JSON.parse(localStorage.getItem("elvianne_cart")) || [];

/* =========================
   CART UI (Injected – no HTML change)
========================= */
const cartDrawer = document.createElement("div");
cartDrawer.className = "cart-drawer";
cartDrawer.innerHTML = `
  <div class="cart-head">
    <h3>Your Cart</h3>
    <button id="closeCart">✕</button>
  </div>
  <div class="cart-body"></div>
  <div class="cart-foot">
    <strong id="cartTotal">Total: ₹0</strong>
    <button id="checkoutBtn">Checkout</button>
  </div>
`;
document.body.appendChild(cartDrawer);

/* =========================
   CART STYLES (inline, theme-safe)
========================= */
const style = document.createElement("style");
style.innerHTML = `
.cart-drawer{
  position:fixed;
  top:0; right:-380px;
  width:340px; height:100vh;
  background:#fff;
  box-shadow:-20px 0 40px rgba(0,0,0,.25);
  transition:.45s ease;
  z-index:9999;
  display:flex;
  flex-direction:column;
}
.cart-drawer.open{ right:0 }
.cart-head,.cart-foot{
  padding:1rem;
  border-bottom:1px solid #eee;
  display:flex;
  justify-content:space-between;
  align-items:center;
}
.cart-body{
  flex:1;
  overflow-y:auto;
  padding:1rem;
}
.cart-item{
  display:flex;
  justify-content:space-between;
  margin-bottom:.8rem;
  font-size:.9rem;
}
.cart-foot button{
  background:#111;
  color:#fff;
  border:none;
  padding:.6rem 1.6rem;
  border-radius:999px;
}
`;
document.head.appendChild(style);

/* =========================
   CART FUNCTIONS
========================= */
const cartBody = cartDrawer.querySelector(".cart-body");
const cartTotal = cartDrawer.querySelector("#cartTotal");

function saveCart() {
  localStorage.setItem("elvianne_cart", JSON.stringify(cart));
}

function renderCart() {
  cartBody.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    cartBody.innerHTML += `
      <div class="cart-item">
        <span>${item.name}</span>
        <strong>₹${item.price}</strong>
      </div>
    `;
  });

  cartTotal.innerText = `Total: ₹${total}`;
  saveCart();
}

/* =========================
   OPEN / CLOSE CART
========================= */
const shopBtn = document.querySelector(".nav-btn");
if (shopBtn) {
  shopBtn.addEventListener("click", () => {
    cartDrawer.classList.add("open");
    renderCart();
  });
}

cartDrawer.querySelector("#closeCart")
  .addEventListener("click", () => {
    cartDrawer.classList.remove("open");
  });

/* =========================
   ADD TO CART BUTTONS
========================= */
document.querySelectorAll(".product-card button").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");

    const name = card.querySelector("h3").innerText;
    const price = Number(
      card.querySelector("span").innerText.replace("₹", "")
    );

    cart.push({ name, price });
    renderCart();
    cartDrawer.classList.add("open");
  });
});

/* =========================
   CHECKOUT (HONEST DEMO)
========================= */
cartDrawer.querySelector("#checkoutBtn")
  .addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    alert("Order placed successfully (Demo)");
    cart = [];
    saveCart();
    renderCart();
    cartDrawer.classList.remove("open");
  });

/* =========================
   PREMIUM SCROLL REVEAL
========================= */
const revealEls = document.querySelectorAll(
  ".section, .product-card, .style-card, .review"
);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = 1;
      e.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(40px)";
  el.style.transition = "all 0.9s ease";
  revealObserver.observe(el);
});
