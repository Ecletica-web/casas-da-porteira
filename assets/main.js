(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    // Create hidden iframe for form submission
    const iframe = document.createElement("iframe");
    iframe.name = "hidden_iframe_" + Date.now();
    iframe.style.display = "none";
    form.parentNode.appendChild(iframe);
    form.target = iframe.name;

    const statusEl = form.querySelector("[data-form-status]");
    const btn = form.querySelector('button[type="submit"]');

    // Add UTMs and user agent as hidden fields
    const qs = new URLSearchParams(window.location.search);
    if (qs.get("utm_source")) {
      let input = form.querySelector('input[name="utm_source"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "utm_source";
        form.appendChild(input);
      }
      input.value = qs.get("utm_source");
    }
    if (qs.get("utm_medium")) {
      let input = form.querySelector('input[name="utm_medium"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "utm_medium";
        form.appendChild(input);
      }
      input.value = qs.get("utm_medium");
    }
    if (qs.get("utm_campaign")) {
      let input = form.querySelector('input[name="utm_campaign"]');
      if (!input) {
        input = document.createElement("input");
        input.type = "hidden";
        input.name = "utm_campaign";
        form.appendChild(input);
      }
      input.value = qs.get("utm_campaign");
    }
    
    // Add user agent
    let userAgentInput = form.querySelector('input[name="user_agent"]');
    if (!userAgentInput) {
      userAgentInput = document.createElement("input");
      userAgentInput.type = "hidden";
      userAgentInput.name = "user_agent";
      form.appendChild(userAgentInput);
    }
    userAgentInput.value = navigator.userAgent;

    form.addEventListener("submit", (e) => {
      if (btn) btn.disabled = true;
      if (statusEl) statusEl.textContent = "A enviar...";

      // Listen for iframe load to detect submission success
      iframe.onload = () => {
        setTimeout(() => {
          if (statusEl) statusEl.textContent = "Enviado ✅ Vamos responder em 24h.";
          
          // preserve source value before reset
          const source = form.querySelector('input[name="source"]');
          const sourceValue = source ? source.value : null;
          
          form.reset();

          // restore source field and hidden fields after reset
          if (source && sourceValue) {
            source.value = sourceValue;
          }
          
          // Restore UTM and user agent fields
          if (qs.get("utm_source")) {
            const utmSource = form.querySelector('input[name="utm_source"]');
            if (utmSource) utmSource.value = qs.get("utm_source");
          }
          if (qs.get("utm_medium")) {
            const utmMedium = form.querySelector('input[name="utm_medium"]');
            if (utmMedium) utmMedium.value = qs.get("utm_medium");
          }
          if (qs.get("utm_campaign")) {
            const utmCampaign = form.querySelector('input[name="utm_campaign"]');
            if (utmCampaign) utmCampaign.value = qs.get("utm_campaign");
          }
          if (userAgentInput) {
            userAgentInput.value = navigator.userAgent;
          }

          if (btn) btn.disabled = false;
        }, 500);
      };
    });
  });
})();
