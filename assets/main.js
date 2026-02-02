(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // <-- stops redirect

      const statusEl = form.querySelector("[data-form-status]");
      const btn = form.querySelector('button[type="submit"]');

      const endpoint = form.getAttribute("action"); // uses your existing URL
      const fd = new FormData(form);

      // add UTMs + user agent without changing your HTML
      const qs = new URLSearchParams(window.location.search);
      fd.set("utm_source", qs.get("utm_source") || "");
      fd.set("utm_medium", qs.get("utm_medium") || "");
      fd.set("utm_campaign", qs.get("utm_campaign") || "");
      fd.set("user_agent", navigator.userAgent);

      try {
        if (btn) btn.disabled = true;
        if (statusEl) statusEl.textContent = "A enviar...";

        // send as form-urlencoded (avoids CORS pain)
        const res = await fetch(endpoint, {
          method: "POST",
          body: fd,
        });

        // Apps Script might return JSON or text depending on your doPost
        let ok = false;
        try {
          const json = await res.json();
          ok = !!json.ok;
        } catch {
          ok = res.ok;
        }

        if (ok) {
          if (statusEl) statusEl.textContent = "Enviado ✅ Vamos responder em 24h.";
          
          // preserve source value before reset
          const source = form.querySelector('input[name="source"]');
          const sourceValue = source ? source.value : null;
          
          form.reset();

          // restore source field after reset
          if (source && sourceValue) {
            source.value = sourceValue;
          }
        } else {
          if (statusEl) statusEl.textContent = "Falha ao enviar. Tenta novamente.";
        }
      } catch (err) {
        console.error(err);
        if (statusEl) statusEl.textContent = "Erro de rede. Tenta novamente.";
      } finally {
        if (btn) btn.disabled = false;
      }
    });
  });
})();
