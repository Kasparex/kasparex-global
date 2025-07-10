import { initEmbedModule } from './embed.js';
import { initThemeSwitcher } from './theme.js';
import { initNotifications } from './notify.js';
import { initWalletModule } from './wallet.js';
import { initTokenSelector } from './token-selector.js';
import { initDappGuide } from './dapp-guide.js';

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.createElement("div");
  wrapper.className = "kasparex-panel";
  wrapper.style.maxWidth = "100%";
  wrapper.style.marginBottom = "2rem";
  wrapper.style.padding = "1rem 1.5rem";
  wrapper.style.border = "1px solid var(--border-color)";
  wrapper.style.borderRadius = "12px";
  wrapper.style.boxShadow = "0 4px 16px var(--shadow-color)";
  wrapper.style.display = "flex";
  wrapper.style.flexWrap = "wrap";
  wrapper.style.gap = "1rem";
  wrapper.style.alignItems = "center";
  wrapper.style.justifyContent = "space-between";
  wrapper.style.background = "var(--widget-background)";

  const themeContainer = document.createElement("div");
  themeContainer.id = "theme-container";
  wrapper.appendChild(themeContainer);

  const tokenSelector = document.createElement("div");
  tokenSelector.id = "token-selector-container";
  wrapper.appendChild(tokenSelector);

  const walletArea = document.createElement("div");
  walletArea.id = "wallet-area";
  walletArea.style.marginLeft = "auto";
  wrapper.appendChild(walletArea);

  document.body.prepend(wrapper);

  initThemeSwitcher("theme-container");
  initTokenSelector("token-selector-container");
  initWalletModule("wallet-area");
  initEmbedModule();
  initNotifications();
  initDappGuide();
});
