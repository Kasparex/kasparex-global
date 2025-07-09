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
  container.style.position = "fixed";
  container.style.top = guideConfig.layout === "sidebar" ? "0" : "unset";
  container.style.left = guideConfig.layout === "sidebar" ? "unset" : "20px";
  container.style.right = guideConfig.layout === "sidebar" ? "0" : "unset";
  container.style.bottom = guideConfig.layout === "sidebar" ? "0" : "150px";
  container.style.background = "white";
  container.style.border = "1px solid #ccc";
  container.style.padding = "0";
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 5px 25px rgba(0,0,0,0.15)";
  container.style.width = guideConfig.layout === "sidebar" ? "300px" : "320px";
  container.style.maxWidth = "90%";
  container.style.zIndex = "10000";
  container.style.fontFamily = "var(--font-family)";
  container.style.overflow = "hidden";
  container.style.display = guideConfig.layout === "sidebar" ? "block" : "none";
  container.style.height = guideConfig.layout === "sidebar" ? "100vh" : "auto";
  container.style.maxHeight = guideConfig.layout === "sidebar" ? "none" : "70vh";

  container.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid #ddd;">
      <h2 style="margin:0;font-size:1.1rem;">🧭 ${guideConfig.title}</h2>
      <button id="guideCloseBtn" style="background:none;border:none;font-size:1.2rem;cursor:pointer;">❌</button>
    </div>
    <div id="guideTabs" style="display:flex;border-bottom:1px solid #ddd;">
      ${["What", "How", "Why", "Benefits", "Fees"].map(tab => `<button class="guide-tab" data-tab="${tab.toLowerCase()}" style="flex:1;padding:10px;border:none;background:#f0f0f0;cursor:pointer;">${tab}</button>`).join("")}
    </div>
    <div id="guideContent" style="padding:16px;overflow-y:auto;max-height:calc(70vh - 100px);font-size:0.95rem;"></div>
  `;

  document.body.appendChild(container);

  const contentMap = {
    what: `<p>${guideConfig.what}</p>`,
    how: `<p>${guideConfig.how}</p>`,
    why: `<p>${guideConfig.why}</p>`,
    benefits: `<ul>${guideConfig.benefits.map(b => `<li>${b}</li>`).join("")}</ul>`,
    fees: `<p>${guideConfig.fees}</p>`
  };

  const guideContent = container.querySelector("#guideContent");
  const tabs = container.querySelectorAll(".guide-tab");

  tabs.forEach(btn => {
    btn.onclick = () => {
      tabs.forEach(t => t.style.background = "#f0f0f0");
      btn.style.background = "#ffffff";
      const tab = btn.getAttribute("data-tab");
      guideContent.innerHTML = contentMap[tab];
    };
  });

  // Default tab
  tabs[0].click();

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

    container.querySelector("#guideCloseBtn").onclick = () => {
      container.style.display = "none";
    };
  }
}
