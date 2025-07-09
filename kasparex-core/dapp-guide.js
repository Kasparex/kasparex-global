let guideConfig = {
  title: "Unnamed dApp",
  what: "This dApp lets you interact with Kaspa smart contracts or perform custom actions.",
  how: "Connect your wallet, configure options, and use the interface. Fees may apply.",
  why: "Designed for utility, decentralization, and reward sharing within the Kaspa ecosystem.",
  benefits: ["Fast interactions", "Low fees", "Open source & decentralized"],
  fees: "Some actions may incur KAS fees. Please review the terms before using."
};

export function initDappGuide(customConfig = {}) {
  guideConfig = { ...guideConfig, ...customConfig };

  const btn = document.createElement("button");
  btn.textContent = "❓";
  btn.style.position = "fixed";
  btn.style.bottom = "150px";
  btn.style.left = "20px";
  btn.style.zIndex = "9999";
  btn.title = "How it works";
  btn.onclick = toggleGuideModal;
  document.body.appendChild(btn);

  const modal = document.createElement("div");
  modal.id = "kasparex-guide-modal";
  modal.style.position = "fixed";
  modal.style.bottom = "200px";
  modal.style.left = "20px";
  modal.style.background = "white";
  modal.style.border = "1px solid #ccc";
  modal.style.padding = "20px";
  modal.style.borderRadius = "12px";
  modal.style.boxShadow = "0 5px 25px rgba(0,0,0,0.15)";
  modal.style.width = "320px";
  modal.style.maxWidth = "90%";
  modal.style.zIndex = "10000";
  modal.style.display = "none";
  modal.style.fontFamily = "var(--font-family)";

  modal.innerHTML = `
    <h2 style="margin-top:0;">🧭 ${guideConfig.title}</h2>
    <p><strong>🧠 What it does:</strong><br>${guideConfig.what}</p>
    <p><strong>⚙️ How it works:</strong><br>${guideConfig.how}</p>
    <p><strong>🎯 Why it matters:</strong><br>${guideConfig.why}</p>
    <p><strong>🎁 Benefits:</strong><br><ul>${guideConfig.benefits.map(b => `<li>${b}</li>`).join("")}</ul></p>
    <p><strong>💸 Fees:</strong><br>${guideConfig.fees}</p>
  `;

  document.body.appendChild(modal);
}

function toggleGuideModal() {
  const modal = document.getElementById("kasparex-guide-modal");
  if (!modal) return;
  modal.style.display = modal.style.display === "none" ? "block" : "none";
}