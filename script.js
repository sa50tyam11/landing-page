console.log("Elvianne Luxury Website Loaded");

window.addEventListener("load", () => {
  const intro = document.getElementById("intro");

  setTimeout(() => {
    intro.style.display = "none";
  }, 4200); // must match animation delay
});
