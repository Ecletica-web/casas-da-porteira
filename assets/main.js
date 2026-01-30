(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const form = document.querySelector("form[data-lead-form]");
  if (!form) return;

  const statusEl = document.querySelector("[data-form-status]");

  form.addEventListener("submit", () => {
    if (statusEl) statusEl.textContent = "A enviar…";
    setTimeout(() => {
      if (statusEl) statusEl.textContent = "Enviado com sucesso. Resposta em 24h.";
      alert("Obrigado! Recebemos o seu pedido. Resposta em 24h.");
      form.reset();
    }, 800);
  });
})();
