(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // prevents navigating to /exec

      const statusEl = form.querySelector("[data-form-status]");
      const btn = form.querySelector('button[type="submit"]');

      const endpoint = form.getAttribute("action"); // keep using the form action
      const fd = new FormData(form);

      // add tracking fields (your sheet has these columns)
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
          // Redirect to success page for conversion tracking (GA4, Clarity, Ads)
          var successUrl = "obrigado.html";
          var qs = window.location.search;
          if (qs) successUrl += (qs.startsWith("?") ? qs : "?" + qs);
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
