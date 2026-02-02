(() => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const form = document.querySelector("form[data-lead-form]");
  if (!form) return;

  const statusEl = document.querySelector("[data-form-status]");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    if (statusEl) statusEl.textContent = "A enviar…";

    // Collect form data
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (const [key, value] of formData.entries()) {
      if (value) data[key] = value;
    }

    // Add UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("utm_source")) data.utm_source = urlParams.get("utm_source");
    if (urlParams.get("utm_medium")) data.utm_medium = urlParams.get("utm_medium");
    if (urlParams.get("utm_campaign")) data.utm_campaign = urlParams.get("utm_campaign");

    // Add user agent
    data.user_agent = navigator.userAgent;

    // Fix field name: num_condominos -> num_condominios (to match script expectations)
    if (data.num_condominos) {
      data.num_condominios = data.num_condominos;
      delete data.num_condominos;
    }

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        if (statusEl) statusEl.textContent = "Enviado com sucesso. Resposta em 24h.";
        alert("Obrigado! Recebemos o seu pedido. Resposta em 24h.");
        form.reset();
      } else {
        throw new Error(result.error || "Erro ao enviar");
      }
    } catch (err) {
      if (statusEl) statusEl.textContent = "Erro ao enviar. Tente novamente.";
      console.error("Form submission error:", err);
      alert("Erro ao enviar o formulário. Por favor, tente novamente.");
    }
  });
})();
