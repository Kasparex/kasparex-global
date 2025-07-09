import { initEmbedModule } from './embed.js';
import { initThemeSwitcher } from './theme.js';
import { initNotifications } from './notify.js';

document.addEventListener("DOMContentLoaded", () => {
  initEmbedModule();
  initThemeSwitcher();
  initNotifications();
});