// MVP Rentals — booking form, total panel, and payment blocks.
// Wires up calendar selection -> total -> form submission -> GAS -> confirmation page.

(function () {
  "use strict";

  function dollars(n) {
    if (typeof n !== "number" || isNaN(n)) return "—";
    return "$" + n.toFixed(0);
  }

  function safeNum(v) {
    var n = Number(v);
    return isNaN(n) ? null : n;
  }

  // Nightly direct prices (Will 2026-10-23). prices.json is published from the one price list: each night = the
  // higher of the Airbnb / VRBO listed price, and "discount" = the direct discount % (set in update_prices.py).
  var PRICES = { data: null, discount: null, ready: false, listeners: [] };
  function pricesUrl() { return window.location.origin + "/prices.json"; }   // site root on every page
  function loadPrices() {
    fetch(pricesUrl() + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        PRICES.data = d;
        PRICES.discount = safeNum(d.discount != null ? d.discount : d.defaultDiscount);
      })
      .catch(function () {})
      .then(function () {
        PRICES.ready = true;
        PRICES.listeners.forEach(function (fn) { fn(); });
      });
  }
  loadPrices();

  // Renders the live total panel based on selection + nightly prices.
  // Returns the most-recent computed total (number) or null.
  function makeTotalPanel(opts) {
    var container = opts.container;
    var property = opts.property;
    var r = property.rates || {};
    var petFee = safeNum(r.petFee);

    function cleaningFee() {
      var c = PRICES.data && PRICES.data.cleaning && PRICES.data.cleaning[property.slug];
      return safeNum(c != null ? c : r.cleaningFee);
    }
    // Sum of the discounted nightly prices for check-in .. night before check-out; null if any night has no price.
    function stayNights(ciYmd, nights) {
      var map = PRICES.data && PRICES.data.nights && PRICES.data.nights[property.slug];
      if (!map || PRICES.discount === null) return null;
      var p = (ciYmd || "").split("-");
      var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      var sum = 0;
      for (var i = 0; i < nights; i++) {
        var key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
        var base = safeNum(map[key]);
        if (base === null || map[key] == null) return null;
        sum += Math.round(base * (1 - PRICES.discount / 100));
        d.setDate(d.getDate() + 1);
      }
      return sum;
    }

    // "2026-06-05" -> "Friday 6/5"  (day-of-week helps guests catch a wrong-day pick)
    function fmtDay(ymdStr) {
      var p = (ymdStr || "").split("-");
      if (p.length !== 3) return ymdStr || "";
      var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return names[d.getDay()] + " " + Number(p[1]) + "/" + Number(p[2]);
    }

    container.innerHTML = "";
    var h3 = document.createElement("h3");
    h3.textContent = "Estimated Total";
    container.appendChild(h3);
    var body = document.createElement("div");
    container.appendChild(body);

    var state = {
      checkIn: null,
      checkOut: null,
      nights: 0,
      weekdayNights: 0,
      weekendNights: 0,
      pets: false,
      petCount: 0,
      total: null,
    };

    function render() {
      body.innerHTML = "";
      if (!state.checkIn || !state.checkOut) {
        var p2 = document.createElement("div");
        p2.className = "empty-state";
        p2.textContent = "Pick check-in and check-out dates above to see your total.";
        body.appendChild(p2);
        state.total = null;
        return;
      }
      if (!PRICES.ready) {
        var p3 = document.createElement("div");
        p3.className = "empty-state";
        p3.textContent = "Loading prices…";
        body.appendChild(p3);
        state.total = null;
        return;
      }
      var nights = state.nights;
      var accommodation = stayNights(state.checkIn, nights);
      var cleaning = cleaningFee();
      if (accommodation === null || cleaning === null) {
        var p = document.createElement("div");
        p.className = "empty-state";
        p.textContent = "Prices for these dates aren't published yet — send your request and we'll quote you.";
        body.appendChild(p);
        state.total = null;
        return;
      }
      var accLabel = "Stay (" + nights + " night" + (nights === 1 ? "" : "s") + ")";
      var petCost = (state.pets && petFee !== null) ? petFee * nights : 0;
      var total = accommodation + cleaning + petCost;

      var lines = [];
      lines.push({ label: fmtDay(state.checkIn) + " → " + fmtDay(state.checkOut), value: "" });
      lines.push({ label: accLabel, value: dollars(accommodation) });
      lines.push({ label: "Cleaning fee", value: dollars(cleaning) });
      if (state.pets && petFee !== null) lines.push({ label: "Pet fee (" + nights + " night" + (nights === 1 ? "" : "s") + ")", value: dollars(petCost) });
      lines.forEach(function (l) {
        var row = document.createElement("div");
        row.className = "line";
        row.innerHTML = '<span>' + l.label + '</span><span>' + l.value + '</span>';
        body.appendChild(row);
      });
      var tot = document.createElement("div");
      tot.className = "line total";
      tot.innerHTML = '<span>Estimated total</span><span>' + dollars(total) + '</span>';
      body.appendChild(tot);
      var note = document.createElement("div");
      note.className = "empty-state";
      note.style.marginTop = "8px";
      note.textContent = "Nightly prices include our book-direct discount. We'll confirm your exact total when we reply to your request.";
      body.appendChild(note);
      state.total = total;
    }

    render();
    PRICES.listeners.push(render);

    return {
      onCalendarChange: function (sel) {
        state.checkIn = sel.checkIn;
        state.checkOut = sel.checkOut;
        state.nights = sel.nights;
        state.weekdayNights = sel.weekdayNights;
        state.weekendNights = sel.weekendNights;
        render();
      },
      onPetsChange: function (pets, count) {
        state.pets = !!pets;
        state.petCount = count || 0;
        render();
      },
      getState: function () { return state; },
    };
  }

  function renderPayments(container) {
    container.innerHTML = "";
    var cfg = window.SITE_CONFIG.payments;
    if (cfg.contactMessage) {
      cfg.contactMessage.split(/\n\n+/).forEach(function (para) {
        var p = document.createElement("p");
        p.className = "pay-contact-message";
        p.textContent = para;
        container.appendChild(p);
      });
      return;
    }
    var enabledKeys = Object.keys(cfg).filter(function (k) { return cfg[k] && cfg[k].enabled; });
    if (!enabledKeys.length) {
      container.innerHTML = '<p class="empty-state">Payment options will be listed here.</p>';
      return;
    }
    var grid = document.createElement("div");
    grid.className = "pay-grid";
    enabledKeys.forEach(function (k) {
      var p = cfg[k];
      var block = document.createElement("div");
      block.className = "pay-block";
      var h4 = document.createElement("h4");
      h4.textContent = p.label;
      block.appendChild(h4);
      var idVal = p.handle || p.identifier || "";
      if (idVal) {
        var idWrap = document.createElement("div");
        var idEl = document.createElement("span");
        idEl.className = "id";
        idEl.textContent = idVal;
        var copy = document.createElement("button");
        copy.type = "button";
        copy.className = "copy-btn";
        copy.textContent = "Copy";
        copy.addEventListener("click", function () {
          navigator.clipboard.writeText(idVal).then(function () {
            copy.textContent = "Copied!";
            setTimeout(function () { copy.textContent = "Copy"; }, 1400);
          });
        });
        idWrap.appendChild(idEl);
        idWrap.appendChild(copy);
        block.appendChild(idWrap);
      }
      if (p.instructions) {
        var pNote = document.createElement("p");
        pNote.textContent = p.instructions;
        block.appendChild(pNote);
      }
      grid.appendChild(block);
    });
    container.appendChild(grid);
  }

  function makeBookingForm(opts) {
    var form = opts.form;
    var totalPanel = opts.totalPanel;
    var property = opts.property;
    var endpoint = opts.endpoint;
    var msgEl = form.querySelector(".form-message");

    var petsEl = form.querySelector("[name=pets]");
    var petCountEl = form.querySelector("[name=petCount]");
    if (petsEl) {
      petsEl.addEventListener("change", function () {
        var hasPets = petsEl.value === "yes";
        if (petCountEl) petCountEl.disabled = !hasPets;
        totalPanel.onPetsChange(hasPets, petCountEl ? Number(petCountEl.value) : 0);
      });
    }
    if (petCountEl) {
      petCountEl.addEventListener("input", function () {
        if (!petsEl) return;
        totalPanel.onPetsChange(petsEl.value === "yes", Number(petCountEl.value));
      });
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      msgEl.className = "form-message";
      msgEl.textContent = "";
      var state = totalPanel.getState();
      if (!state.checkIn || !state.checkOut) {
        msgEl.classList.add("error");
        msgEl.textContent = "Please pick check-in and check-out dates above.";
        return;
      }
      var fd = new FormData(form);
      var payload = {
        property: property.name,
        propertySlug: property.slug,
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        nights: state.nights,
        name: (fd.get("name") || "").trim(),
        email: (fd.get("email") || "").trim(),
        phone: (fd.get("phone") || "").trim(),
        partySize: Number(fd.get("partySize") || 0),
        petsRaw: petsEl ? petsEl.value : "",
        pets: petsEl ? petsEl.value === "yes" : false,
        petCount: petCountEl && !petCountEl.disabled ? Number(petCountEl.value) : 0,
        message: (fd.get("message") || "").trim(),
        smsConsent: !!fd.get("smsConsent"),
        total: state.total,
      };
      if (!payload.name || !payload.partySize) {
        msgEl.classList.add("error");
        msgEl.textContent = "Please fill in name and party size.";
        return;
      }
      if (!payload.email && !payload.phone) {
        msgEl.classList.add("error");
        msgEl.textContent = "Please provide either an email or a phone number so we can reach you.";
        return;
      }
      if (payload.petsRaw !== "yes" && payload.petsRaw !== "no") {
        msgEl.classList.add("error");
        msgEl.textContent = "Please indicate whether you are bringing pets.";
        return;
      }
      if (payload.pets && payload.petCount < 1) {
        msgEl.classList.add("error");
        msgEl.textContent = "Please indicate how many pets you are bringing.";
        return;
      }
      // Confirm the property (+ dates/total) before sending. A guest who
      // drifted onto the wrong home's page catches it here, before the
      // request is ever logged. Only on explicit confirm do we POST.
      showConfirmDialog(property, payload, performSubmit);

      async function performSubmit() {
        var btn = form.querySelector("button[type=submit]");
        btn.disabled = true;
        var oldLabel = btn.textContent;
        btn.textContent = "Sending…";

        if (!endpoint || endpoint.indexOf("@") === 0) {
          msgEl.classList.add("error");
          msgEl.textContent = "Booking endpoint not yet configured. Email " + window.SITE_CONFIG.brand.contactEmail + " or text " + window.SITE_CONFIG.brand.contactPhoneDisplay + " to book directly.";
          btn.disabled = false; btn.textContent = oldLabel;
          return;
        }

        try {
          var res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
          });
          var json = await res.json();
          if (!json || !json.ok) throw new Error(json && json.error || "Submission failed");
          var qs = new URLSearchParams({
            property: property.name,
            checkIn: payload.checkIn,
            checkOut: payload.checkOut,
            name: payload.name,
          });
          var base = window.SITE_CONFIG.basePath || "../";
          window.location.href = base + "booking-request-received.html?" + qs.toString();
        } catch (err) {
          msgEl.classList.add("error");
          msgEl.textContent = "Could not send your request. Please email " + window.SITE_CONFIG.brand.contactEmail + " or text " + window.SITE_CONFIG.brand.contactPhoneDisplay + " to book.";
          btn.disabled = false; btn.textContent = oldLabel;
        }
      }
    });
  }

  // Property-confirmation gate shown right before a booking request is sent.
  // Purpose: a guest who reached the wrong home's page (e.g. via a shared link
  // that previews a different property, or a mis-tap on the landing grid) sees
  // the property name + photo big and unmistakable, and must confirm before the
  // request is logged. Self-contained: inline styles, no stylesheet dependency,
  // works identically on all six property pages.
  function showConfirmDialog(property, payload, onConfirm) {
    var prior = document.getElementById("booking-confirm-overlay");
    if (prior) prior.remove();

    function fmtNice(ymd) {
      var p = (ymd || "").split("-");
      if (p.length !== 3) return ymd || "";
      var d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
      var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      var mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return days[d.getDay()] + ", " + mons[d.getMonth()] + " " + Number(p[2]);
    }

    var accent = property.color || "#C8990A";
    var overlay = document.createElement("div");
    overlay.id = "booking-confirm-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Confirm the home you are requesting");
    overlay.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px;background:rgba(5,12,7,0.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);";

    var card = document.createElement("div");
    card.style.cssText = "background:#0c1b10;color:#fff;border:1px solid rgba(255,255,255,0.12);border-radius:18px;max-width:380px;width:100%;overflow:hidden;box-shadow:0 18px 60px rgba(0,0,0,0.6);font-family:'Segoe UI',Arial,sans-serif;";

    var hero = document.createElement("div");
    hero.style.cssText = "position:relative;height:150px;background:#0c1b10 url('" + (property.heroPhoto || "") + "') center/cover no-repeat;";
    var shade = document.createElement("div");
    shade.style.cssText = "position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,0.10),rgba(12,27,16,0.92));";
    hero.appendChild(shade);
    var nameWrap = document.createElement("div");
    nameWrap.style.cssText = "position:absolute;left:18px;right:18px;bottom:12px;";
    var kicker = document.createElement("div");
    kicker.textContent = "You're requesting";
    kicker.style.cssText = "font-size:11px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.78);margin-bottom:3px;";
    var nm = document.createElement("div");
    nm.textContent = property.name;
    nm.style.cssText = "font-size:30px;font-weight:800;letter-spacing:0.5px;line-height:1.05;color:#fff;border-left:4px solid " + accent + ";padding-left:10px;";
    nameWrap.appendChild(kicker);
    nameWrap.appendChild(nm);
    hero.appendChild(nameWrap);
    card.appendChild(hero);

    var body = document.createElement("div");
    body.style.cssText = "padding:14px 18px 4px;";
    function line(label, value) {
      var row = document.createElement("div");
      row.style.cssText = "display:flex;justify-content:space-between;gap:12px;padding:7px 0;font-size:14px;border-bottom:1px solid rgba(255,255,255,0.07);";
      var l = document.createElement("span"); l.textContent = label; l.style.cssText = "color:rgba(255,255,255,0.6);";
      var v = document.createElement("span"); v.textContent = value; v.style.cssText = "color:#fff;font-weight:600;text-align:right;";
      row.appendChild(l); row.appendChild(v);
      return row;
    }
    body.appendChild(line("Dates", fmtNice(payload.checkIn) + "  →  " + fmtNice(payload.checkOut)));
    body.appendChild(line("Nights", String(payload.nights || 0)));
    if (payload.total != null) body.appendChild(line("Estimated total", "$" + payload.total));
    card.appendChild(body);

    var btns = document.createElement("div");
    btns.style.cssText = "display:flex;flex-direction:column;gap:8px;padding:12px 18px 18px;";
    var confirm = document.createElement("button");
    confirm.type = "button";
    confirm.textContent = "Yes — request " + property.name;
    confirm.style.cssText = "width:100%;min-height:48px;padding:14px;border:none;border-radius:11px;background:" + accent + ";color:#07120a;font-size:15px;font-weight:800;letter-spacing:0.4px;cursor:pointer;font-family:inherit;";
    var back = document.createElement("button");
    back.type = "button";
    back.textContent = "← Back";
    back.style.cssText = "width:100%;min-height:44px;padding:11px;border:1px solid rgba(255,255,255,0.22);border-radius:11px;background:transparent;color:rgba(255,255,255,0.85);font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;";
    btns.appendChild(confirm);
    btns.appendChild(back);
    card.appendChild(btns);

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    function close() {
      document.removeEventListener("keydown", onKey);
      overlay.remove();
    }
    function onKey(e) { if (e.key === "Escape") close(); }
    document.addEventListener("keydown", onKey);
    back.addEventListener("click", close);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    confirm.addEventListener("click", function () { close(); onConfirm(); });
    confirm.focus();
  }

  // Rate card on each property page, from the same nightly prices: lowest discounted midweek and weekend night
  // still open in the price list, plus cleaning and pet fee (replaces the hand-typed weekly/weekend table, 2026-10-23).
  function renderRateCard(el, property) {
    function draw() {
      el.innerHTML = "";
      var map = PRICES.data && PRICES.data.nights && PRICES.data.nights[property.slug];
      var disc = PRICES.discount;
      var mid = null, wk = null;
      if (map && disc !== null) {
        Object.keys(map).forEach(function (k) {
          var p = k.split("-"); var dow = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])).getDay();
          var v = Math.round(Number(map[k]) * (1 - disc / 100));
          if (dow === 5 || dow === 6) { if (wk === null || v < wk) wk = v; } else { if (mid === null || v < mid) mid = v; }
        });
      }
      var c = PRICES.data && PRICES.data.cleaning ? PRICES.data.cleaning[property.slug] : null;
      var pet = (property.rates || {}).petFee;
      var rows = [
        { label: "Midweek nights<span class='rate-note'>from, per night</span>", value: mid !== null ? dollars(mid) : "Ask" },
        { label: "Weekend nights<span class='rate-note'>from, per night</span>", value: wk !== null ? dollars(wk) : "Ask" },
        { label: "Cleaning fee<span class='rate-note'>per stay</span>", value: c != null ? dollars(Number(c)) : "Ask" },
        { label: "Pet fee<span class='rate-note'>per night</span>", value: pet != null && !isNaN(Number(pet)) ? dollars(Number(pet)) : "Ask" },
      ];
      rows.forEach(function (r) {
        var item = document.createElement("div");
        item.className = "rate-item";
        item.innerHTML = "<div class=\"label\">" + r.label + "</div><div class=\"value\">" + r.value + "</div>";
        el.appendChild(item);
      });
    }
    if (PRICES.ready) draw(); else PRICES.listeners.push(draw);
  }

  window.MVPBooking = {
    renderRateCard: renderRateCard,
    makeTotalPanel: makeTotalPanel,
    makeBookingForm: makeBookingForm,
    renderPayments: renderPayments,
  };
})();