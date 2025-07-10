const tokenList = [
  { name: "KREX", ticker: "KREX", treasury: "kaspa:tkrx123", feeSplit: 70 },
  { name: "SARAH", ticker: "SARAH", treasury: "kaspa:tsrh456", feeSplit: 60 },
  { name: "VECTOR", ticker: "VECTOR", treasury: "kaspa:tvct789", feeSplit: 50 }
];
let selectedToken = null;

export function initTokenSelector(containerId = null) {
  const container = containerId ? document.getElementById(containerId) : document.body;
  if (!container) return;

  const dropdown = document.createElement("select");
  dropdown.id = "kasparex-token-selector";
  dropdown.className = "token-selector";

  const defaultOption = document.createElement("option");
  defaultOption.text = "🎯 Select Token";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  dropdown.appendChild(defaultOption);

  tokenList.forEach(token => {
    const option = document.createElement("option");
    option.value = token.ticker;
    option.textContent = token.name;
    dropdown.appendChild(option);
  });

  dropdown.onchange = () => {
    selectedToken = tokenList.find(t => t.ticker === dropdown.value);
    localStorage.setItem("kasparex-selected-token", JSON.stringify(selectedToken));
  };

  container.appendChild(dropdown);

  const saved = localStorage.getItem("kasparex-selected-token");
  if (saved) {
    selectedToken = JSON.parse(saved);
    dropdown.value = selectedToken.ticker;
  }
}