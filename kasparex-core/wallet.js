export function initWalletModule(containerId = null) {
  const container = containerId ? document.getElementById(containerId) : document.body;
  if (!container) return;

  const button = document.createElement("button");
  button.textContent = "🔌 Connect Wallet";
  button.className = "icon-button";
  button.style.fontSize = "1rem";

  button.onclick = () => {
    const address = prompt("Enter your Kaspa address:");
    if (address) {
      localStorage.setItem("kasparex-wallet", address);
      button.textContent = "🔗 Connected";
    }
  };

  container.appendChild(button);
}