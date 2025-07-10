export function initThemeSwitcher(containerId = null) {
  const container = containerId ? document.getElementById(containerId) : document.body;
  if (!container) return;

  const toggleWrap = document.createElement("label");
  toggleWrap.className = "toggle-switch";
  toggleWrap.style.marginRight = "1rem";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = "theme-toggle-checkbox";

  const slider = document.createElement("span");
  slider.className = "slider";

  toggleWrap.appendChild(input);
  toggleWrap.appendChild(slider);
  container.appendChild(toggleWrap);

  const savedTheme = localStorage.getItem("kasparex-theme") || "light";
  document.body.classList.toggle("dark-theme", savedTheme === "dark");
  input.checked = savedTheme === "dark";

  input.addEventListener("change", () => {
    const mode = input.checked ? "dark" : "light";
    localStorage.setItem("kasparex-theme", mode);
    document.body.classList.toggle("dark-theme", mode === "dark");
  });
}