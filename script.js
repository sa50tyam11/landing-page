console.log("Elvianne Luxury Website Loaded");

window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    intro.style.display = "none";
  }, 4200); // must match animation delay
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".product-card button").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const product = {
      name: card.querySelector("h3").innerText,
      price: card.querySelector("span").innerText,
      image: card.querySelector("img").src
    };

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{ threshold: 0.15 });

document.querySelectorAll(".section, .product-card").forEach(el=>{
  observer.observe(el);
});
