import { initEmbedModule } from './embed.js';
import { initThemeSwitcher } from './theme.js';
import { initNotifications } from './notify.js';
import { initWalletModule } from './wallet.js';
import { initTokenSelector } from './token-selector.js';
import { initDappGuide } from './dapp-guide.js';

// Initialize all modules after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  initEmbedModule();
  initThemeSwitcher();
  initNotifications();
  initWalletModule();
  initTokenSelector();
  initDappGuide(); // Can optionally pass config or load from metadata
});
