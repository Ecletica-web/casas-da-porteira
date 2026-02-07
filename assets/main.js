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

    form.addEventListener("submit", async function(e) {
      e.preventDefault(); // Always prevent default to handle submission ourselves
      
      if (isSubmitting) {
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
        
        // Update URL without page reload for Google Ads conversion tracking
        const url = new URL(window.location.href);
        url.searchParams.set('form', 'success');
        window.history.pushState({}, '', url.toString());
        
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
        console.error('Form submission error:', errorMsg);
        if (statusEl) statusEl.textContent = errorMsg || "Erro ao enviar. Tenta novamente.";
        if (btn) {
          btn.disabled = false;
          btn.textContent = "Enviar pedido";
        }
        isSubmitting = false;
      };

      // Get form endpoint
      const endpoint = form.getAttribute("action");
      if (!endpoint) {
        handleError("URL do formulário não configurada.");
        return;
      }

      // Ensure all hidden fields are up to date before submission
      addHiddenField("utm_source", utmSourceValue);
      addHiddenField("utm_medium", utmMediumValue);
      addHiddenField("utm_campaign", utmCampaignValue);
      addHiddenField("user_agent", navigator.userAgent);

      // Log form data for debugging (without sensitive info)
      const formDataObj = {};
      const formData = new FormData(form);
      for (const [key, value] of formData.entries()) {
        formDataObj[key] = key === 'email' || key === 'phone' ? '[REDACTED]' : value;
      }
      console.log('Form data to submit:', formDataObj);

      // Use iframe method (most reliable for Google Apps Script)
      // Set up iframe handlers
      let loadHandler = null;
      let timeoutHandler = null;
      let successCalled = false;

      const cleanup = () => {
        if (loadHandler && iframe) iframe.removeEventListener('load', loadHandler);
        if (timeoutHandler) clearTimeout(timeoutHandler);
      };

      const callSuccessOnce = () => {
        if (successCalled) return;
        successCalled = true;
        cleanup();
        handleSuccess();
      };

      loadHandler = function() {
        console.log('Iframe loaded - form submitted successfully');
        // Small delay to ensure data is processed
        setTimeout(() => {
          callSuccessOnce();
        }, 300);
      };

      // Set up listeners BEFORE submitting
      if (iframe) {
        // Remove any existing listeners first
        iframe.removeEventListener('load', loadHandler);
        iframe.addEventListener('load', loadHandler);
      }
      
      // Fallback timeout - if iframe doesn't load in 5 seconds, assume success anyway
      // (form was submitted, even if we can't detect it)
      timeoutHandler = setTimeout(() => {
        console.log('Iframe timeout - assuming form was submitted');
        callSuccessOnce();
      }, 5000);

      // Ensure form target is set
      form.target = "hidden_iframe";
      
      // Submit form to iframe (this is the most reliable method for Google Apps Script)
      console.log('Submitting form to iframe:', endpoint);
      try {
        form.submit();
      } catch (submitError) {
        console.error('Form submit error:', submitError);
        cleanup();
        handleError("Erro ao enviar. Por favor, tenta novamente.");
      }
    });
  });
})();
