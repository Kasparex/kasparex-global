import { initEmbedModule } from './embed.js';
import { initThemeSwitcher } from './theme.js';
import { initNotifications } from './notify.js';
import { initWalletModule } from './wallet.js';
import { initTokenSelector } from './token-selector.js';
import { initDappGuide } from './dapp-guide.js';

function createCollapsiblePanel(id, title, initFunc) {
  const panel = document.createElement("div");
  panel.className = "kasparex-panel";
  panel.style.marginTop = "1rem";

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn-outline";
  toggleBtn.style.width = "100%";
  toggleBtn.style.textAlign = "left";
  toggleBtn.style.fontWeight = "600";
  toggleBtn.style.borderRadius = "8px";
  toggleBtn.textContent = `▶ ${title}`;
  panel.appendChild(toggleBtn);

  const content = document.createElement("div");
  content.id = id;
  content.style.display = "none";
  content.style.paddingTop = "1rem";
  panel.appendChild(content);

  toggleBtn.addEventListener("click", () => {
    const isOpen = content.style.display === "block";
    content.style.display = isOpen ? "none" : "block";
    toggleBtn.textContent = `${isOpen ? "▶" : "▼"} ${title}`;
  });

  document.body.appendChild(panel);
  initFunc(id);
}

document.addEventListener("DOMContentLoaded", () => {
  const topPanel = document.createElement("div");
  topPanel.className = "kasparex-panel";
  topPanel.style.marginBottom = "1rem";
  topPanel.style.display = "flex";
  topPanel.style.justifyContent = "space-between";
  topPanel.style.gap = "1rem";
  topPanel.style.flexWrap = "wrap";

  const themeContainer = document.createElement("div");
  themeContainer.id = "theme-container";

  const walletContainer = document.createElement("div");
  walletContainer.id = "wallet-container";

  topPanel.appendChild(themeContainer);
  topPanel.appendChild(walletContainer);
  document.body.prepend(topPanel);

  createCollapsiblePanel("token-selector-container", "🎯 Token Selector", initTokenSelector);
  createCollapsiblePanel("embed-container", "📦 Embed Widget", initEmbedModule);
  createCollapsiblePanel("guide-container", "🧭 dApp Guide", initDappGuide);

  initThemeSwitcher("theme-container");
  initWalletModule("wallet-container");
  initNotifications();
});