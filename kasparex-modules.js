// Theme Switcher
export function initThemeSwitcher(containerId) {
  const container = document.getElementById(containerId);
  const wrap = document.createElement("label");
  wrap.className = "toggle-switch";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "theme-toggle";

  const slider = document.createElement("span");
  slider.className = "slider";

  wrap.appendChild(input);
  wrap.appendChild(slider);
  container.appendChild(wrap);

  const saved = localStorage.getItem("kasparex-theme") || "light";
  document.body.classList.toggle("dark-theme", saved === "dark");
  input.checked = saved === "dark";

  input.addEventListener("change", () => {
    const mode = input.checked ? "dark" : "light";
    document.body.classList.toggle("dark-theme", mode === "dark");
    localStorage.setItem("kasparex-theme", mode);
  });
}

// Wallet Module
export function initWallet(containerId) {
  const container = document.getElementById(containerId);
  const btn = document.createElement("button");
  btn.className = "btn-outline";
  btn.title = "Connect Wallet";

  function openDashboard() {
    togglePopup('dashboard-popup');
  }

  btn.onclick = () => {
    const addr = prompt("Enter your Kaspa wallet address:");
    if (addr) {
      localStorage.setItem("kasparex-wallet", addr);
      updateButton(addr);
      updateDashboard(addr);
    }
  };

  function updateButton(addr) {
    btn.textContent = addr.slice(0, 6) + "..." + addr.slice(-4);
    btn.className = "btn-outline";
    btn.style.cursor = "pointer";
    btn.onclick = openDashboard;
  }

  const saved = localStorage.getItem("kasparex-wallet");
  if (saved) {
    updateButton(saved);
    updateDashboard(saved);
  } else {
    btn.textContent = "CONNECT";
  }

  container.appendChild(btn);
}

// Embed
export function initEmbed(containerId) {
  const container = document.getElementById(containerId);
  const label = document.createElement("p");
  label.innerHTML = "<strong>📦 Embed This Widget</strong>";

  const txt = document.createElement("textarea");
  txt.readOnly = true;
  txt.style.width = "100%";
  txt.style.height = "80px";
  txt.value = `<iframe src="\${window.location.href}" style="width:100%;height:600px;border:none;border-radius:12px;" loading="lazy"></iframe>`;

  const btn = document.createElement("button");
  btn.textContent = "📋 Copy Embed Code";
  btn.onclick = () => {
    txt.select();
    document.execCommand("copy");
    btn.textContent = "✅ Copied!";
    setTimeout(() => btn.textContent = "📋 Copy Embed Code", 1500);
  };

  container.appendChild(label);
  container.appendChild(txt);
  container.appendChild(btn);
}

// Guide
export function initGuide(containerId, config) {
  const guide = config || {
    title: "Kaspa Widget",
    what: "This dApp allows you to interact with Kaspa smart contracts.",
    how: "Connect wallet, use the interface, enjoy benefits.",
    why: "Promotes decentralization and ecosystem utility.",
    benefits: ["No gas wars", "Ultra fast", "Fully decentralized"],
    fees: "0.01 KAS per use"
  };

  const container = document.getElementById(containerId);
  const box = document.createElement("div");
  box.className = "card";

  box.innerHTML = `
    <h3>🧭 ${guide.title}</h3>
    <p><strong>🧠 What:</strong> ${guide.what}</p>
    <p><strong>⚙️ How:</strong> ${guide.how}</p>
    <p><strong>🎯 Why:</strong> ${guide.why}</p>
    <p><strong>🎁 Benefits:</strong><br><ul>${guide.benefits.map(b => `<li>${b}</li>`).join("")}</ul></p>
    <p><strong>💸 Fees:</strong> ${guide.fees}</p>
  `;

  container.appendChild(box);
}

// Dashboard
function updateDashboard(address) {
  const dash = document.getElementById("dashboard-popup");
  if (!dash) return;

  dash.innerHTML = \`
    📊 <strong>Wallet Dashboard</strong><br><br>
    <strong>Address:</strong><br>
    <code style="font-size: 0.85rem;">\${address}</code><br><br>
    <strong>Balance:</strong> <span id="kas-balance">Loading...</span> KAS<br>
    <strong>Interactions:</strong> 12 uses<br>
  \`;

  // Placeholder for mock balance (simulate async)
  setTimeout(() => {
    const balance = (Math.random() * 100).toFixed(3);
    document.getElementById("kas-balance").textContent = balance;
  }, 500);
}