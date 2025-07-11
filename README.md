# 🌐 Kasparex Global

This repository contains the core UI, JS modules, and templates used across all Kasparex dApps and widgets. These files ensure consistent styling, behavior, and integration patterns throughout the Kasparex ecosystem.

---

## 📄 File Overview

### `dapp-template.html`
A clean starter template for new Kaspa-based dApps.  
Includes:
- Pre-wired imports for global CSS & JS
- Universal layout structure
- Placeholder panels for easy customization  
Use this as a base when building new tools/widgets.

---

### `index.html`
A minimal landing page or test entry point.  
Used mostly for quick local dev tests or to preview small features.

---

### `kasparex-init.js`
Initial setup script for global dApps.  
Handles:
- Environment setup
- Wallet detection and connection
- Base UI triggers (modals, loaders, etc.)
Should be loaded before the modules file.

---

### `kasparex-modules.js`
Bundled utility functions and modules used across Kasparex dApps.  
Includes:
- Wallet dashboard
- Token selectors
- Theme switcher
- Guide popups
- Fee handler logic
This is the core logic that powers the modular features in widgets.

---

### `kasparex-style.css`
Global stylesheet for all Kasparex widgets and dApps.  
Defines:
- Theme variables (light/dark)
- Unified panel layout
- Buttons, tags, loaders, modals
- Tables, alerts, nav pills, progress bars, and more  
All new dApps should rely on this file to ensure visual consistency.

---

### `kasparex-ui-showcase.html`
A live UI component demo page.  
Shows all global UI elements like:
- Panels, buttons, pills, alerts
- Stats cards, tooltips, loaders  
Useful for developers designing new widgets and dApps using the global UI system.

---

### `package.json`
Node.js config file.  
Lists dependencies (like `express`), project metadata, and start scripts.

---

### `server.js`
A basic Express.js server to serve local files.  
Useful for:
- Running dApps locally
- Testing UI/JS interactions
Can be extended later for backend API support.

---

## ✅ Usage Tips

- Start from `dapp-template.html` to ensure your widget is fully compatible.
- Always include `kasparex-style.css`, `kasparex-init.js`, and `kasparex-modules.js` in that order.
- Preview UI elements in `kasparex-ui-showcase.html` to stay consistent with Kasparex branding.

---

Built with ❤️ for the Kaspa ecosystem by the Kasparex team.
