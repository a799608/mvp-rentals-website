// MVP Rentals — interactive month-grid calendar.
// Loads availability from the GAS endpoint, renders one month at a time,
// and emits onChange whenever the user picks a check-in/check-out range.
// Convention: weekend = Fri + Sat night. Weekday = Sun-Thu night.

(function () {
  "use strict";

  function ymd(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, "0");
    var d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function parseYmd(s) {
    var parts = s.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function isWeekendNight(date) {
    var dow = date.getDay(); // 0=Sun, 5=Fri, 6=Sat
    return dow === 5 || dow === 6;
  }

  function addDays(date, n) {
    var d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
  }

  function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  function nightsBetween(checkIn, checkOut) {
    var ms = parseYmd(checkOut) - parseYmd(checkIn);
    return Math.round(ms / (1000 * 60 * 60 * 24));
  }

  function fmtMoney(n) {
    if (typeof n !== "number" || isNaN(n)) return "";
    return "$" + n.toFixed(0);
  }

  // Fetch availability JSON from the GAS endpoint.
  // Returns Promise<Array<[checkInYmd, checkOutYmd]>> for the given property.
  async function fetchAvailability(propertyName, endpoint) {
    if (!endpoint || endpoint.indexOf("@") === 0) {
      console.warn("Availability endpoint not configured; treating all dates as open.");
      return [];
    }
    try {
      var res = await fetch(endpoint, { method: "GET" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      var json = await res.json();
      return json[propertyName] || [];
    } catch (err) {
      console.warn("Availability fetch failed:", err);
      return [];
    }
  }

  // Build a Set<ymd> of every date that is inside any booked range.
  // A booked range is [checkIn, checkOut). The checkout day itself is open.
  function buildBookedSet(ranges) {
    var booked = new Set();
    ranges.forEach(function (r) {
      if (!r || r.length < 2) return;
      var start = parseYmd(r[0]);
      var end = parseYmd(r[1]);
      var d = new Date(start);
      while (d < end) {
        booked.add(ymd(d));
        d = addDays(d, 1);
      }
    });
    return booked;
  }

  function makeCalendar(opts) {
    var container = opts.container;
    var property = opts.property;
    var onChange = opts.onChange || function () {};
    var endpoint = opts.endpoint;
    var monthsToShow = opts.months || 3;

    var weekday = Number(property.rates.weekday);
    var weekend = Number(property.rates.weekend);
    var ratesUsable = !isNaN(weekday) && !isNaN(weekend);

    var bookedSet = new Set();
    var checkIn = null;
    var checkOut = null;

    container.innerHTML = "";

    var monthsWrap = document.createElement("div");
    monthsWrap.className = "calendar-months";
    container.appendChild(monthsWrap);

    var legend = document.createElement("div");
    legend.className = "calendar-legend";
    legend.innerHTML =
      '<span><span class="swatch" style="background:#EDE5D2"></span>Open weekday</span>' +
      '<span><span class="swatch" style="background:#FBE9B6"></span>Open weekend</span>' +
      '<span><span class="swatch" style="background:#E5E0D2"></span>Booked</span>' +
      '<span><span class="swatch" style="background:var(--accent,#1F6224)"></span>Selected</span>';
    container.appendChild(legend);

    function emitChange() {
      if (!checkIn || !checkOut) {
        onChange({ checkIn: null, checkOut: null, nights: 0, weekendNights: 0, weekdayNights: 0 });
        return;
      }
      var nights = nightsBetween(checkIn, checkOut);
      var d = parseYmd(checkIn);
      var weekendNights = 0, weekdayNights = 0;
      for (var i = 0; i < nights; i++) {
        if (isWeekendNight(d)) weekendNights++; else weekdayNights++;
        d = addDays(d, 1);
      }
      onChange({
        checkIn: checkIn, checkOut: checkOut, nights: nights,
        weekendNights: weekendNights, weekdayNights: weekdayNights,
      });
    }

    function rangeIsClear(startYmd, endYmd) {
      var d = parseYmd(startYmd);
      var e = parseYmd(endYmd);
      while (d < e) {
        if (bookedSet.has(ymd(d))) return false;
        d = addDays(d, 1);
      }
      return true;
    }

    function handleCellClick(cellYmd) {
      if (!checkIn || (checkIn && checkOut)) {
        checkIn = cellYmd; checkOut = null;
      } else {
        if (cellYmd <= checkIn) { checkIn = cellYmd; checkOut = null; }
        else if (!rangeIsClear(checkIn, cellYmd)) { checkIn = cellYmd; checkOut = null; }
        else { checkOut = cellYmd; }
      }
      renderAll();
      emitChange();
    }

    function renderMonth(monthDate) {
      var wrap = document.createElement("div");
      wrap.className = "calendar-month";

      var label = document.createElement("div");
      label.className = "calendar-month-label";
      label.textContent = monthDate.toLocaleString("en-US", { month: "long", year: "numeric" });
      wrap.appendChild(label);

      var grid = document.createElement("div");
      grid.className = "calendar-grid";
      wrap.appendChild(grid);

      var today = new Date(); today.setHours(0,0,0,0);
      var dows = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
      dows.forEach(function (d) {
        var hd = document.createElement("div");
        hd.className = "cal-dow";
        hd.textContent = d;
        grid.appendChild(hd);
      });

      var first = new Date(monthDate);
      var firstDow = first.getDay();
      var daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
      for (var i = 0; i < firstDow; i++) {
        var empty = document.createElement("div");
        empty.className = "cal-cell empty";
        grid.appendChild(empty);
      }
      for (var dnum = 1; dnum <= daysInMonth; dnum++) {
        var cellDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), dnum);
        var cellYmd = ymd(cellDate);
        var isPast = cellDate < today;
        var isBooked = bookedSet.has(cellYmd);
        var isWeekend = isWeekendNight(cellDate);
        var price = isWeekend ? weekend : weekday;
        var cell = document.createElement("div");
        cell.className = "cal-cell";
        if (isWeekend) cell.classList.add("weekend");
        if (isBooked) cell.classList.add("booked");
        if (isPast) cell.classList.add("past");
        if (checkIn && cellYmd === checkIn) cell.classList.add("endpoint");
        if (checkOut && cellYmd === checkOut) cell.classList.add("endpoint");
        if (checkIn && checkOut && cellYmd > checkIn && cellYmd < checkOut) cell.classList.add("in-range");
        var dayEl = document.createElement("div");
        dayEl.className = "day";
        dayEl.textContent = dnum;
        var priceEl = document.createElement("div");
        priceEl.className = "price";
        priceEl.textContent = ratesUsable && !isPast && !isBooked ? fmtMoney(price) : "";
        cell.appendChild(dayEl);
        cell.appendChild(priceEl);
        if (!isPast && !isBooked) {
          (function (yy) {
            cell.addEventListener("click", function () { handleCellClick(yy); });
          })(cellYmd);
        }
        grid.appendChild(cell);
      }
      return wrap;
    }

    function renderAll() {
      monthsWrap.innerHTML = "";
      var start = startOfMonth(new Date());
      for (var m = 0; m < monthsToShow; m++) {
        var monthDate = new Date(start.getFullYear(), start.getMonth() + m, 1);
        monthsWrap.appendChild(renderMonth(monthDate));
      }
    }

    renderAll();
    fetchAvailability(property.name, endpoint).then(function (ranges) {
      bookedSet = buildBookedSet(ranges);
      renderAll();
    });

    return {
      reset: function () { checkIn = null; checkOut = null; renderAll(); emitChange(); },
    };
  }

  window.MVPCalendar = { create: makeCalendar };
})();