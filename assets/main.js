(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    // Ensure iframe exists (create if not in HTML)
    let iframe = form.parentNode.querySelector('iframe[name="hidden_iframe"]');
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.style.display = "none";
      form.parentNode.appendChild(iframe);
    }
    form.target = "hidden_iframe";

    const statusEl = form.querySelector("[data-form-status]");
    const btn = form.querySelector('button[type="submit"]');

    // Add UTMs and user agent as hidden fields
    const qs = new URLSearchParams(window.location.search);
    
    function addHiddenField(name, value) {
      if (!value) return;
      let input = form.querySelector(`input[name="${name}"]`);
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        form.appendChild(input);
      }
      input.value = value;
    }

    addHiddenField("utm_source", qs.get("utm_source"));
    addHiddenField("utm_medium", qs.get("utm_medium"));
    addHiddenField("utm_campaign", qs.get("utm_campaign"));
    addHiddenField("user_agent", navigator.userAgent);

    let submitted = false;
    let successTimeout;

    form.addEventListener("submit", (e) => {
      // Don't prevent default - let form submit naturally to iframe
      if (submitted) {
        e.preventDefault();
        return false;
      }
      
      submitted = true;
      if (btn) btn.disabled = true;
      if (statusEl) statusEl.textContent = "A enviar...";

      // Preserve values before reset
      const source = form.querySelector('input[name="source"]');
      const sourceValue = source ? source.value : null;
      const utmSourceValue = qs.get("utm_source");
      const utmMediumValue = qs.get("utm_medium");
      const utmCampaignValue = qs.get("utm_campaign");

      // Listen for iframe load
      const handleSuccess = () => {
        clearTimeout(successTimeout);
        if (statusEl) statusEl.textContent = "Enviado ✅ Vamos responder em 24h.";
        
        form.reset();

        // Restore hidden fields
        if (source && sourceValue) {
          source.value = sourceValue;
        }
        addHiddenField("utm_source", utmSourceValue);
        addHiddenField("utm_medium", utmMediumValue);
        addHiddenField("utm_campaign", utmCampaignValue);
        addHiddenField("user_agent", navigator.userAgent);

        if (btn) btn.disabled = false;
        submitted = false;
      };

      // Set up iframe load handler
      iframe.onload = () => {
        handleSuccess();
      };

      // Fallback: assume success after 3 seconds (Apps Script usually works even if iframe doesn't fire onload)
      successTimeout = setTimeout(() => {
        handleSuccess();
      }, 3000);
    });
  });
})();
