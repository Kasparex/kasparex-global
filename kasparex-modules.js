// THEME TOGGLE
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

// WALLET
export function initWallet(containerId) {
  const container = document.getElementById(containerId);
  const btn = document.createElement("button");
  btn.className = "icon-button";
  btn.textContent = "🔌";
  btn.title = "Connect Wallet";

  btn.onclick = () => {
    const addr = prompt("Enter your Kaspa wallet:");
    if (addr) {
      localStorage.setItem("kasparex-wallet", addr);
      btn.textContent = "🔗";
    }
  };

  container.appendChild(btn);
}

// TOKEN SELECTOR
export function initTokenSelector(containerId) {
  const tokens = [
    { name: "KREX", ticker: "KREX", treasury: "kaspa:tkrx123", feeSplit: 70 },
    { name: "SARAH", ticker: "SARAH", treasury: "kaspa:tsrh456", feeSplit: 60 },
    { name: "VECTOR", ticker: "VECTOR", treasury: "kaspa:tvct789", feeSplit: 50 }
  ];

  const container = document.getElementById(containerId);
  const select = document.createElement("select");
  select.id = "kasparex-token-selector";

  const def = document.createElement("option");
  def.text = "🎯 Select Token";
  def.disabled = true;
  def.selected = true;
  select.appendChild(def);

  tokens.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t.ticker;
    opt.textContent = t.name;
    select.appendChild(opt);
  });

  select.onchange = () => {
    const selected = tokens.find(t => t.ticker === select.value);
    localStorage.setItem("kasparex-selected-token", JSON.stringify(selected));
  };

  const saved = localStorage.getItem("kasparex-selected-token");
  if (saved) {
    const tok = JSON.parse(saved);
    select.value = tok.ticker;
  }

  container.appendChild(select);
}

// EMBED WIDGET
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

// DAPP GUIDE
export function initGuide(containerId, config) {
  const guide = config || {
    title: "Kaspa Widget",
    what: "This dApp allows you to interact with Kaspa smart contracts.",
    how: "Connect wallet, select token, take action.",
    why: "Promotes decentralized interaction & utility.",
    benefits: ["Low fees", "No gas wars", "Secure"],
    fees: "0.01 KAS per action"
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
