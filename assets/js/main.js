/**
 * Novos Fogos — Lead form handling & footer year.
 * Forms with [data-lead-form] submit via fetch and redirect to obrigado.html on success.
 */
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const PHONE_DISPLAY = "+351 910829923";
  const PHONE_E164 = "+351910829923";
  const PHONE_WA = "351910829923";
  const SOCIAL_INSTAGRAM = "https://www.instagram.com/novosfogos.pt/";
  const SOCIAL_FACEBOOK = "https://www.facebook.com/profile.php?id=61588393794954";

  const ICONS = {
    whatsapp: '<img class="app-icon" src="/assets/images/transferir.png" alt="" />',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2m0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5z"/><path fill="currentColor" d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7"/><path fill="currentColor" d="M17.5 6.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>',
    facebook:
      '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.87.24-1.46 1.49-1.46H16.7V5.02C16.4 4.98 15.33 4.9 14.08 4.9c-2.62 0-4.42 1.6-4.42 4.54V11H7v3h2.66v8z"/></svg>',
  };

  function injectFooterPhoneActions() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const footerCols = Array.from(footer.querySelectorAll(".footer-col"));
    const supportCol =
      footerCols.find((col) => {
        const h4 = col.querySelector("h4");
        const title = (h4 ? h4.textContent : "").toLowerCase();
        return title.includes("suporte");
      }) ||
      footerCols.find((col) => col.querySelector('a[href^="mailto:info@novosfogos.com"]')) ||
      footerCols.find((col) => col.querySelector('a[href^="mailto:"]'));

    if (!supportCol) return;
    if (supportCol.querySelector('[data-phone-actions="true"]')) return;

    const phoneLink = document.createElement("a");
    phoneLink.href = `tel:${PHONE_E164}`;
    phoneLink.textContent = PHONE_DISPLAY;
    phoneLink.setAttribute("data-phone-actions", "true");

    const emailLink = supportCol.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.insertAdjacentElement("afterend", phoneLink);
    } else {
      supportCol.appendChild(phoneLink);
    }
  }

  function injectFooterSocialLinks() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;

    const social = footer.querySelector(".footer-social");
    if (!social) return;
    if (social.querySelector('[data-footer-social="true"]')) return;

    social.innerHTML = "";

    const links = [
      { key: "whatsapp", href: `https://wa.me/${PHONE_WA}`, aria: "WhatsApp" },
      { key: "instagram", href: SOCIAL_INSTAGRAM, aria: "Instagram" },
      { key: "facebook", href: SOCIAL_FACEBOOK, aria: "Facebook" },
    ];

    links.forEach(({ key, href, aria }) => {
      const a = document.createElement("a");
      a.className = "icon-link footer-social-btn";
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener";
      a.setAttribute("aria-label", aria);
      a.setAttribute("data-footer-social", "true");
      a.innerHTML = ICONS[key] || "";
      social.appendChild(a);
    });
  }

  function buildWhatsAppUrl() {
    const page = window.location.href;
    const text = `Olá! Gostava de falar convosco. (${page})`;
    return `https://wa.me/${PHONE_WA}?text=${encodeURIComponent(text)}`;
  }

  const ICON_PHONE =
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.3 21 3 13.7 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01z"/></svg>';

  function injectHeaderContactActions() {
    const nav = document.querySelector(".site-header .nav-links");
    if (!nav) return;
    if (nav.querySelector('[data-header-actions="true"]')) return;

    const cta = nav.querySelector('a.btn');
    if (!cta) return;

    const actions = document.createElement("div");
    actions.className = "nav-contact-actions";
    actions.setAttribute("data-header-actions", "true");

    const wa = document.createElement("a");
    wa.href = buildWhatsAppUrl();
    wa.target = "_blank";
    wa.rel = "noopener";
    wa.className = "nav-wa";
    wa.setAttribute("aria-label", "WhatsApp");
    wa.innerHTML = ICONS.whatsapp;

    const call = document.createElement("a");
    call.href = `tel:${PHONE_E164}`;
    call.className = "nav-call";
    call.setAttribute("aria-label", "Ligar");
    call.innerHTML = ICON_PHONE;

    actions.appendChild(call);
    actions.appendChild(wa);

    cta.insertAdjacentElement("beforebegin", actions);
  }

  function injectMobileBurgerMenu() {
    const header = document.querySelector(".site-header");
    const navBar = document.querySelector(".site-header .nav");
    const links = document.querySelector(".site-header .nav-links");
    if (!header || !navBar || !links) return;
    if (navBar.querySelector('[data-burger="true"]')) return;

    // Build a dropdown container (separate from nav-links row)
    const dropdown = document.createElement("div");
    dropdown.className = "nav-dropdown";
    dropdown.setAttribute("data-nav-dropdown", "true");

    // Always include key pages in burger dropdown (can duplicate header links)
    const items = [
      { label: "Início", href: "inicio.html" },
      { label: "Artigos", href: "artigos.html" },
      { label: "Serviços", href: "servicos.html" },
      { label: "Sobre", href: "sobre.html" },
      { label: "Contacto", href: "contacto.html" },
      { label: "Avaliação Gratuita", href: "contacto.html" },
    ];

    items.forEach(({ label, href }) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      dropdown.appendChild(a);
    });

    const burger = document.createElement("button");
    burger.type = "button";
    burger.className = "nav-burger";
    burger.setAttribute("aria-label", "Menu");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("data-burger", "true");
    burger.innerHTML =
      '<span class="nav-burger-lines" aria-hidden="true"><span></span><span></span><span></span></span>';

    burger.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!header.classList.contains("nav-open")) return;
      const t = e.target;
      if (t instanceof Node && (header.contains(t))) return;
      header.classList.remove("nav-open");
      burger.setAttribute("aria-expanded", "false");
    });

    // Close when clicking a link inside dropdown
    dropdown.addEventListener("click", (e) => {
      const a = e.target instanceof Element ? e.target.closest("a") : null;
      if (!a) return;
      header.classList.remove("nav-open");
      burger.setAttribute("aria-expanded", "false");
    });

    // Insert burger at end of header row and dropdown under it
    navBar.appendChild(burger);
    header.appendChild(dropdown);
  }

  function injectWhatsAppFloatingButton() {
    if (document.querySelector('[data-wa-float="true"]')) return;

    const a = document.createElement("a");
    a.href = buildWhatsAppUrl();
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "wa-float";
    a.setAttribute("aria-label", "WhatsApp");
    a.setAttribute("data-wa-float", "true");
    a.innerHTML = ICONS.whatsapp;

    document.body.appendChild(a);
  }

  injectFooterPhoneActions();
  injectFooterSocialLinks();
  injectMobileBurgerMenu();
  injectHeaderContactActions();
  injectWhatsAppFloatingButton();

  const forms = document.querySelectorAll("form[data-lead-form]");
  if (!forms.length) return;

  forms.forEach((form) => {
    form.setAttribute("action", "#"); // prevent native submit ever navigating to script URL
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
