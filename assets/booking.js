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

  // Renders the live total panel based on selection + property rates.
  // Returns the most-recent computed total (number) or null.
  function makeTotalPanel(opts) {
    var container = opts.container;
    var property = opts.property;
    var weekday = safeNum(property.rates.weekday);
    var weekend = safeNum(property.rates.weekend);
    var cleaning = safeNum(property.rates.cleaningFee);
    var petFee = safeNum(property.rates.petFee);
    var petType = property.rates.petFeeType || "per-stay";

    var ratesUsable = weekday !== null && weekend !== null && cleaning !== null;

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
      if (!ratesUsable) {
        var p = document.createElement("div");
        p.className = "empty-state";
        p.textContent = "Rates not yet published for this property — contact us for a quote.";
        body.appendChild(p);
        state.total = null;
        return;
      }
      if (!state.checkIn || !state.checkOut) {
        var p2 = document.createElement("div");
        p2.className = "empty-state";
        p2.textContent = "Pick check-in and check-out dates above to see your total.";
        body.appendChild(p2);
        state.total = null;
        return;
      }
      var weekdayCost = state.weekdayNights * weekday;
      var weekendCost = state.weekendNights * weekend;
      var petCost = 0;
      if (state.pets && petFee !== null) {
        if (petType === "per-night") petCost = petFee * state.nights;
        else if (petType === "per-pet") petCost = petFee * Math.max(1, state.petCount || 1);
        else petCost = petFee; // per-stay default
      }
      var subtotal = weekdayCost + weekendCost;
      var preTaxTotal = subtotal + cleaning + petCost;
      var occupancyTax = preTaxTotal * 0.03; // 3% local occupancy tax
      var salesTax = preTaxTotal * 0.06;     // 6% PA state sales tax
      var total = preTaxTotal + occupancyTax + salesTax;

      var lines = [];
      lines.push({ label: state.checkIn + " → " + state.checkOut, value: state.nights + " night" + (state.nights === 1 ? "" : "s") });
      if (state.weekdayNights) lines.push({ label: state.weekdayNights + " weekday × " + dollars(weekday), value: dollars(weekdayCost) });
      if (state.weekendNights) lines.push({ label: state.weekendNights + " weekend × " + dollars(weekend), value: dollars(weekendCost) });
      lines.push({ label: "Cleaning fee", value: dollars(cleaning) });
      if (state.pets && petFee !== null) lines.push({ label: "Pet fee (" + petType + ")", value: dollars(petCost) });
      lines.push({ label: "Occupancy tax (3%)", value: dollars(occupancyTax) });
      lines.push({ label: "Sales tax (6%)", value: dollars(salesTax) });
      lines.forEach(function (l) {
        var row = document.createElement("div");
        row.className = "line";
        row.innerHTML = '<span>' + l.label + '</span><span>' + l.value + '</span>';
        body.appendChild(row);
      });
      var tot = document.createElement("div");
      tot.className = "line total";
      tot.innerHTML = '<span>Total</span><span>' + dollars(total) + '</span>';
      body.appendChild(tot);
      state.total = total;
    }

    render();

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
      if (!payload.smsConsent) {
        msgEl.classList.add("error");
        msgEl.textContent = "Please agree to receive transactional SMS messages.";
        return;
      }
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
    });
  }

  window.MVPBooking = {
    makeTotalPanel: makeTotalPanel,
    makeBookingForm: makeBookingForm,
    renderPayments: renderPayments,
  };
})();