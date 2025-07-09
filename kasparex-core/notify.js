export function initNotifications() {
  const container = document.createElement("div");
  container.id = "kasparex-toast-container";
  container.style.position = "fixed";
  container.style.top = "20px";
  container.style.right = "20px";
  container.style.zIndex = "10000";
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.gap = "10px";
  document.body.appendChild(container);
}

export function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.padding = "12px 16px";
  toast.style.borderRadius = "8px";
  toast.style.color = "#fff";
  toast.style.minWidth = "180px";
  toast.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
  toast.style.fontSize = "0.95rem";
  toast.style.background = {
    success: "#28a745",
    error: "#e3342f",
    info: "#4c51bf"
  }[type] || "#4c51bf";

  document.getElementById("kasparex-toast-container").appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}