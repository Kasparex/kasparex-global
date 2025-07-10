let guideConfig = {
  title: "Unnamed dApp",
  what: "This dApp lets you interact with Kaspa smart contracts or perform custom actions.",
  how: "Connect your wallet, configure options, and use the interface. Fees may apply.",
  why: "Designed for utility, decentralization, and reward sharing within the Kaspa ecosystem.",
  benefits: ["Fast interactions", "Low fees", "Open source & decentralized"],
  fees: "Some actions may incur KAS fees. Please review the terms before using.",
  layout: "modal"
};

export function initDappGuide(customConfig = {}) {
  const meta = document.getElementById("kasparex-guide-meta");
  if (meta) {
    try {
      const parsed = JSON.parse(meta.textContent);
      guideConfig = { ...guideConfig, ...parsed };
    } catch {}
  }

  guideConfig = { ...guideConfig, ...customConfig };

  const container = document.createElement("div");
  container.id = "kasparex-guide-container";
  container.style.position = "relative";
  container.style.marginTop = "2rem";
  container.style.padding = "1.5rem";
  container.style.borderRadius = "12px";
  container.style.background = "var(--widget-background)";
  container.style.border = "1px solid var(--border-color)";
  container.style.boxShadow = "0 4px 16px var(--shadow-color)";
  container.style.maxWidth = "640px";

  container.innerHTML = `
    <h2 style="margin-top:0;">🧭 ${guideConfig.title}</h2>
    <p><strong>🧠 What it does:</strong><br>${guideConfig.what}</p>
    <p><strong>⚙️ How it works:</strong><br>${guideConfig.how}</p>
    <p><strong>🎯 Why it matters:</strong><br>${guideConfig.why}</p>
    <p><strong>🎁 Benefits:</strong><br><ul>${guideConfig.benefits.map(b => `<li>${b}</li>`).join("")}</ul></p>
    <p><strong>💸 Fees:</strong><br>${guideConfig.fees}</p>
  `;

  document.body.appendChild(container);
}