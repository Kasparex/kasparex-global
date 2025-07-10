export function initEmbedModule() {
  const modal = document.createElement("div");
  modal.id = "embedModal";
  modal.className = "modal";
  modal.style.position = "relative";
  modal.style.marginTop = "2rem";

  const label = document.createElement("h3");
  label.textContent = "📦 Embed This Widget";

  const textarea = document.createElement("textarea");
  textarea.readOnly = true;
  textarea.style.width = "100%";
  textarea.style.height = "80px";
  textarea.style.borderRadius = "8px";
  textarea.style.padding = "0.5rem";
  textarea.style.marginTop = "0.5rem";
  textarea.style.border = "1px solid var(--border-color)";
  textarea.style.fontSize = "0.9rem";

  const srcUrl = window.location.href;
  textarea.value = `<iframe src="${srcUrl}" style="width:100%;height:600px;border:none;border-radius:12px;" loading="lazy"></iframe>`;

  const copyBtn = document.createElement("button");
  copyBtn.textContent = "📋 Copy Embed Code";
  copyBtn.style.marginTop = "1rem";
  copyBtn.onclick = () => {
    textarea.select();
    document.execCommand("copy");
    copyBtn.textContent = "✅ Copied!";
    setTimeout(() => {
      copyBtn.textContent = "📋 Copy Embed Code";
    }, 1500);
  };

  modal.appendChild(label);
  modal.appendChild(textarea);
  modal.appendChild(copyBtn);
  document.body.appendChild(modal);
}