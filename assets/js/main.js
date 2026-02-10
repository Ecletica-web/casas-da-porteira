/**
 * Novos Fogos — Lead form handling & footer year.
 * Forms with [data-lead-form] submit via fetch and redirect to obrigado.html on success.
 */
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const statusEl = form.querySelector("[data-form-status]");
      const btn = form.querySelector('button[type="submit"]');
      const endpoint = form.getAttribute("data-action") || form.getAttribute("action");
      const fd = new FormData(form);

      const qs = new URLSearchParams(window.location.search);
      fd.set("utm_source", qs.get("utm_source") || "");
      fd.set("utm_medium", qs.get("utm_medium") || "");
      fd.set("utm_campaign", qs.get("utm_campaign") || "");
      fd.set("user_agent", navigator.userAgent);

      try {
        if (btn) {
          btn.disabled = true;
          btn.textContent = "A enviar...";
        }
        if (statusEl) statusEl.textContent = "A enviar...";

        const res = await fetch(endpoint, { method: "POST", body: fd });
        const json = await res.json();

        if (json.ok) {
          const successUrl = "obrigado.html" + (window.location.search ? window.location.search : "");
          window.location.href = successUrl;
          return;
        } else {
          console.error(json);
          if (statusEl) statusEl.textContent = "Falha ao enviar. Tenta novamente.";
          if (btn) {
            btn.disabled = false;
            btn.textContent = "Enviar pedido";
          }
        }
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = "Erro de rede. Tenta novamente.";
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Enviar pedido";
        }
      }
    });
  });
})();
