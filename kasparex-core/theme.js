export function initThemeSwitcher() {
  const themeBtn = document.createElement("button");
  themeBtn.innerHTML = "🌓";
  themeBtn.id = "themeToggle";
  themeBtn.style.position = "fixed";
  themeBtn.style.bottom = "80px";
  themeBtn.style.left = "20px";
  themeBtn.style.zIndex = "9999";
  themeBtn.title = "Toggle Light/Dark Theme";
  document.body.appendChild(themeBtn);

  const currentTheme = localStorage.getItem("kasparex-theme");
  if (currentTheme === "dark") document.body.classList.add("dark-theme");

  themeBtn.onclick = () => {
    const isDark = document.body.classList.toggle("dark-theme");
    localStorage.setItem("kasparex-theme", isDark ? "dark" : "light");
  };
}