import { copyToClipboard } from './utils.js';

export function initEmbedModule() {
  const toolsContainer = document.createElement("div");
  toolsContainer.id = "kasparex-embed-tools";
  toolsContainer.style.position = "fixed";
  toolsContainer.style.bottom = "20px";
  toolsContainer.style.right = "20px";
  toolsContainer.style.zIndex = "9999";
  toolsContainer.innerHTML = `
    <button id="openEmbedModal" title="Embed Options ⚙️">⚙️</button>
    <div id="embedModal" style="display:none;position:fixed;bottom:70px;right:20px;background:#fff;padding:20px;border-radius:12px;box-shadow:0 5px 20px rgba(0,0,0,0.2);width:300px;z-index:10000;">
      <h3 style="margin-top:0;">📦 Embed This Widget</h3>
      <textarea id="embedCodeArea" readonly style="width:100%;height:80px;border-radius:8px;padding:8px;border:1px solid #ccc;font-size:0.8rem;"></textarea>
      <button id="copyEmbedCode" style="margin-top:10px;">📋 Copy Embed Code</button>
    </div>
  `;
  document.body.appendChild(toolsContainer);

  const modal = document.getElementById("embedModal");
  const toggleBtn = document.getElementById("openEmbedModal");
  const copyBtn = document.getElementById("copyEmbedCode");
  const textarea = document.getElementById("embedCodeArea");

  const srcUrl = window.location.href;
  textarea.value = `<iframe src="${srcUrl}" style="width:100%;height:600px;border:none;border-radius:12px;" loading="lazy"></iframe>`;

  toggleBtn.onclick = () => {
    modal.style.display = modal.style.display === "none" ? "block" : "none";
  };

  copyBtn.onclick = () => {
    copyToClipboard(textarea.value);
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy Embed Code";
    }, 1500);
  };
}