(function () {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    // Ensure iframe exists - check both parent and form container
    let iframe = form.parentNode.querySelector('iframe[name="hidden_iframe"]');
    if (!iframe) {
      // Try to find it in the form's container
      const formContainer = form.closest('.form-compact, .card, .container');
      if (formContainer) {
        iframe = formContainer.querySelector('iframe[name="hidden_iframe"]');
      }
    }
    
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.name = "hidden_iframe";
      iframe.id = "hidden_iframe_" + Date.now();
      iframe.style.display = "none";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";
      iframe.style.position = "absolute";
      iframe.style.left = "-9999px";
      // Insert after form, not as child
      form.parentNode.insertBefore(iframe, form.nextSibling);
    }
    
    // Ensure form has target set
    if (!form.target || form.target !== "hidden_iframe") {
      form.target = "hidden_iframe";
    }

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

    // Add hidden fields on page load
    addHiddenField("utm_source", qs.get("utm_source"));
    addHiddenField("utm_medium", qs.get("utm_medium"));
    addHiddenField("utm_campaign", qs.get("utm_campaign"));
    addHiddenField("user_agent", navigator.userAgent);

    let isSubmitting = false;

    form.addEventListener("submit", function(e) {
      if (isSubmitting) {
        e.preventDefault();
        return false;
      }

      isSubmitting = true;
      if (btn) {
        btn.disabled = true;
        btn.textContent = "A enviar...";
      }
      if (statusEl) statusEl.textContent = "A enviar...";

      // Preserve values
      const source = form.querySelector('input[name="source"]');
      const sourceValue = source ? source.value : null;
      const utmSourceValue = qs.get("utm_source");
      const utmMediumValue = qs.get("utm_medium");
      const utmCampaignValue = qs.get("utm_campaign");

      // Handle success
      const handleSuccess = () => {
        if (statusEl) statusEl.textContent = "Enviado ✅ Vamos responder em 24h.";
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Enviar pedido";
        }
        
        form.reset();

        // Restore hidden fields
        if (source && sourceValue) {
          source.value = sourceValue;
        }
        addHiddenField("utm_source", utmSourceValue);
        addHiddenField("utm_medium", utmMediumValue);
        addHiddenField("utm_campaign", utmCampaignValue);
        addHiddenField("user_agent", navigator.userAgent);

        isSubmitting = false;
      };

      // Handle error
      const handleError = (errorMsg) => {
        if (statusEl) statusEl.textContent = errorMsg || "Erro ao enviar. Tenta novamente.";
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Enviar pedido";
        }
        isSubmitting = false;
      };

      // Try to detect iframe load - use multiple methods
      let loadHandler = null;
      let timeoutHandler = null;
      let errorHandler = null;
      let successCalled = false;

      const cleanup = () => {
        if (loadHandler && iframe) iframe.removeEventListener('load', loadHandler);
        if (errorHandler && iframe) iframe.removeEventListener('error', errorHandler);
        if (timeoutHandler) clearTimeout(timeoutHandler);
      };

      const callSuccessOnce = () => {
        if (successCalled) return;
        successCalled = true;
        cleanup();
        handleSuccess();
      };

      loadHandler = function() {
        try {
          // Check if iframe loaded successfully
          if (iframe && iframe.contentWindow) {
            try {
              const iframeUrl = iframe.contentWindow.location.href;
              if (iframeUrl && (iframeUrl.includes('script.google.com') || iframeUrl.includes('accounts.google.com'))) {
                // Success - Apps Script responded
                callSuccessOnce();
                return;
              }
            } catch (e) {
              // Cross-origin - this is expected, assume success
              callSuccessOnce();
              return;
            }
          }
          // Iframe loaded but couldn't check URL - assume success
          callSuccessOnce();
        } catch (e) {
          // Any error - assume success (form was submitted)
          callSuccessOnce();
        }
      };

      errorHandler = function() {
        // Even on error, assume success after delay (form was submitted)
        setTimeout(() => {
          callSuccessOnce();
        }, 1000);
      };

      // Set up listeners
      if (iframe) {
        iframe.addEventListener('load', loadHandler);
        iframe.addEventListener('error', errorHandler);
      }
      
      // Primary fallback timeout - assume success after 2 seconds
      timeoutHandler = setTimeout(() => {
        callSuccessOnce();
      }, 2000);

      // Let form submit naturally to iframe
      // Don't prevent default - form should submit normally
      return true;
    });
  });
})();
