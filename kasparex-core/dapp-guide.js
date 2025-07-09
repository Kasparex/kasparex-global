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
    } catch (err) {
      console.warn("Invalid guide JSON metadata");
    }
  }

  guideConfig = { ...guideConfig, ...customConfig };

  const container = document.createElement("div");
  container.id = "kasparex-guide-container";
  container.style.position = guideConfig.layout === "sidebar" ? "fixed" : "fixed";
  container.style.top = guideConfig.layout === "sidebar" ? "0" : "unset";
  container.style.left = guideConfig.layout === "sidebar" ? "unset" : "20px";
  container.style.right = guideConfig.layout === "sidebar" ? "0" : "unset";
  container.style.bottom = guideConfig.layout === "sidebar" ? "0" : "200px";
  container.style.background = "white";
  container.style.border = "1px solid #ccc";
  container.style.padding = "20px";
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 5px 25px rgba(0,0,0,0.15)";
  container.style.width = guideConfig.layout === "sidebar" ? "300px" : "320px";
  container.style.maxWidth = "90%";
  container.style.zIndex = "10000";
  container.style.fontFamily = "var(--font-family)";
  container.style.overflowY = "auto";
  container.style.display = guideConfig.layout === "sidebar" ? "block" : "none";
  container.style.height = guideConfig.layout === "sidebar" ? "100vh" : "auto";

  container.innerHTML = `
    <h2 style="margin-top:0;">🧭 ${guideConfig.title}</h2>
    <p><strong>🧠 What it does:</strong><br>${guideConfig.what}</p>
    <p><strong>⚙️ How it works:</strong><br>${guideConfig.how}</p>
    <p><strong>🎯 Why it matters:</strong><br>${guideConfig.why}</p>
    <p><strong>🎁 Benefits:</strong><br><ul>${guideConfig.benefits.map(b => `<li>${b}</li>`).join("")}</ul></p>
    <p><strong>💸 Fees:</strong><br>${guideConfig.fees}</p>
  `;

  document.body.appendChild(container);

  if (guideConfig.layout === "modal") {
    const btn = document.createElement("button");
    btn.textContent = "❓";
    btn.style.position = "fixed";
    btn.style.bottom = "150px";
    btn.style.left = "20px";
    btn.style.zIndex = "9999";
    btn.title = "How it works";
    btn.onclick = () => {
      container.style.display = container.style.display === "none" ? "block" : "none";
    };
    document.body.appendChild(btn);
  }
}