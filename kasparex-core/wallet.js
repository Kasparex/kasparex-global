let walletAddress = null;

export function initWalletModule() {
  const btn = document.createElement("button");
  btn.textContent = "🔌 Connect Wallet";
  btn.style.position = "fixed";
  btn.style.top = "20px";
  btn.style.left = "20px";
  btn.style.zIndex = "9999";
  btn.onclick = connectWallet;
  document.body.appendChild(btn);
}

async function connectWallet() {
  try {
    // Placeholder for future WASM integration
    walletAddress = prompt("Enter your Kaspa address (dev mode):");
    if (walletAddress) {
      alert("Connected: " + walletAddress);
      localStorage.setItem("kasparex-wallet", walletAddress);
    }
  } catch (err) {
    console.error("Wallet connect failed:", err);
  }
}

export function getWalletAddress() {
  return walletAddress || localStorage.getItem("kasparex-wallet") || null;
}