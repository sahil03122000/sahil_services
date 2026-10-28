/* =========================================================================
   Settings — edit these.
   ========================================================================= */
const CONFIG = {
  // WhatsApp / phone number with country code, digits only.
  phone: "917027098656",
  email: "sahil84330@gmail.com",
  // Free key from https://web3forms.com. With a key, the form emails
  // enquiries straight to your inbox; without one, "Send enquiry" opens the
  // visitor's email app instead. The key is safe to publish.
  web3formsKey: ""
};

/* ========================================================================= */

const whatsappUrl = (message = "") =>
  `https://wa.me/${CONFIG.phone}` +
  (message ? `?text=${encodeURIComponent(message)}` : "");

const prettyPhone = () => {
  const local = CONFIG.phone.replace(/^91/, "");
  return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
};

// Wire up every WhatsApp / call / email link from CONFIG.
document.querySelectorAll(".js-whatsapp").forEach(link => {
  link.href = whatsappUrl(link.dataset.msg);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
});
document.querySelectorAll(".js-call").forEach(link => {
  link.href = `tel:+${CONFIG.phone}`;
});
document.querySelectorAll(".js-email").forEach(link => {
  link.href = `mailto:${CONFIG.email}`;
});
document.querySelectorAll(".js-phone-label").forEach(el => {
  el.textContent = prettyPhone();
});
document.querySelectorAll(".js-email-label").forEach(el => {
  el.textContent = CONFIG.email;
});

document.getElementById("year").textContent = new Date().getFullYear();

/* =========================================================================
   Quote form
   ========================================================================= */
const form = document.getElementById("quote-form");
const errorEl = form.querySelector(".quote__error");
const submitBtn = form.querySelector('button[type="submit"]');
const success = document.querySelector(".quote__success");

const values = () => {
  const data = new FormData(form);
  const get = key => String(data.get(key) || "").trim();
  return {
    name: get("name"),
    reach: get("reach"),
    business: get("business"),
    type: get("type"),
    message: get("message"),
    botcheck: data.get("botcheck") === "on"
  };
};

const validate = v => {
  if (!v.name || !v.reach || !v.message) {
    errorEl.textContent =
      "Please fill in your name, phone or email, and a little about your project.";
    return false;
  }
  errorEl.textContent = "";
  return true;
};

const summary = v => {
  const details = [
    `Name: ${v.name}`,
    `Contact: ${v.reach}`,
    ...(v.business ? [`Business: ${v.business}`] : []),
    `Need: ${v.type || "Not sure yet"}`
  ];
  return ["Hi Sahil,", "", ...details, "", v.message].join("\n");
};

const subject = v => `Website enquiry: ${v.business || v.name}`;

form.addEventListener("input", () => {
  if (errorEl.textContent) errorEl.textContent = "";
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  const v = values();
  if (!validate(v) || submitBtn.disabled) return;

  if (!CONFIG.web3formsKey) {
    window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(
      subject(v)
    )}&body=${encodeURIComponent(summary(v))}`;
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending…";
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {"Content-Type": "application/json", Accept: "application/json"},
      body: JSON.stringify({
        access_key: CONFIG.web3formsKey,
        subject: subject(v),
        from_name: "Website enquiry form",
        name: v.name,
        // Lets you hit "Reply" in your inbox when they left an email.
        ...(v.reach.includes("@") ? {email: v.reach} : {}),
        contact: v.reach,
        business: v.business || "-",
        need: v.type || "Not sure yet",
        message: v.message,
        botcheck: v.botcheck
      })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) throw new Error();
    form.reset();
    form.hidden = true;
    success.hidden = false;
  } catch (e) {
    errorEl.textContent = `Couldn't send right now. Please message me on WhatsApp or email ${CONFIG.email}.`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send enquiry";
  }
});

document.getElementById("quote-whatsapp").addEventListener("click", () => {
  const v = values();
  if (!validate(v)) return;
  window.open(whatsappUrl(summary(v)), "_blank", "noopener,noreferrer");
});

document.getElementById("quote-again").addEventListener("click", () => {
  success.hidden = true;
  form.hidden = false;
  form.querySelector("input").focus();
});
