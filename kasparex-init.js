// kasparex-init.js

document.addEventListener("DOMContentLoaded", () => {
  console.log("Kasparex dApp initialized ✅");

  // Example: enhance all buttons with ripple effect
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", (e) => {
      btn.classList.add("clicked");
      setTimeout(() => btn.classList.remove("clicked"), 300);
    });
  });
});
