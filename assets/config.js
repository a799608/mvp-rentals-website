// MVP Rentals — site configuration.
// Every value tagged with @PLACEHOLDER must be filled in before going live.
// Search this file for "@" to find them all.

window.SITE_CONFIG = {
  brand: {
    name: "MVP Rentals",
    legalName: "Proper TTs LLC",
    dba: "MVP Rentals",
    ein: "39-4982848",
    addressLine: "502 W 7th St Ste 100",
    addressCity: "Erie",
    addressState: "PA",
    addressZip: "16502",
    contactEmail: "wm.m.morris@gmail.com",
    contactPhone: "+1 610 621 0769",
    contactPhoneDisplay: "(610) 621-0769",
    governingState: "Pennsylvania",
  },

  // Google Apps Script web-app endpoints. Both filled in by the build agent
  // after the GAS project is deployed.
  endpoints: {
    availability: "https://script.google.com/macros/s/AKfycbxSb0ZFe_XbDMviK9BKrXz64gBbv7WE3oylP4LyVjZ1MpOcy5Z8sdkhe_t7BGrKxDt6qQ/exec",
    submitBooking: "https://script.google.com/macros/s/AKfycbxSb0ZFe_XbDMviK9BKrXz64gBbv7WE3oylP4LyVjZ1MpOcy5Z8sdkhe_t7BGrKxDt6qQ/exec",
  },

  // Payment methods. Flip enabled: true to surface the block on property
  // pages. Venmo + Zelle live in v1; the rest are scaffolded for later.
  payments: {
    venmo: {
      enabled: true,
      label: "Venmo",
      handle: "@VENMO_HANDLE_HERE",
      instructions: "Send to the handle above. Include your check-in date in the note.",
    },
    zelle: {
      enabled: true,
      label: "Zelle",
      identifier: "@ZELLE_EMAIL_OR_PHONE_HERE",
      instructions: "Send to the address/phone above. Include your check-in date in the memo.",
    },
    paypal: {
      enabled: false,
      label: "PayPal",
      identifier: "@PAYPAL_HANDLE_HERE",
      instructions: "",
    },
    stripe: {
      enabled: false,
      label: "Credit / Debit Card",
      instructions: "",
    },
    applePay: {
      enabled: false,
      label: "Apple Pay",
      instructions: "",
    },
    googlePay: {
      enabled: false,
      label: "Google Pay",
      instructions: "",
    },
    ach: {
      enabled: false,
      label: "Bank Transfer (ACH)",
      instructions: "",
    },
  },

  properties: [
    {
      slug: "trails",
      name: "Trails",
      address: "845 Towamensing Trails Rd",
      tagline: "@TRAILS_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/trails/hero.jpg",
      color: "#4BACC6",
      maxGuests: "@TRAILS_MAX_GUESTS_HERE",
      bedrooms: "@TRAILS_BEDROOMS_HERE",
      bathrooms: "@TRAILS_BATHROOMS_HERE",
      description: "@TRAILS_DESCRIPTION_HERE — about 80 words describing the home, location, vibe.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@TRAILS_WEEKDAY_RATE_HERE",
        weekend: "@TRAILS_WEEKEND_RATE_HERE",
        cleaningFee: "@TRAILS_CLEANING_FEE_HERE",
        petFee: "@TRAILS_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
    {
      slug: "wylie",
      name: "Wylie",
      address: "119 Wylie Circle",
      tagline: "@WYLIE_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/wylie/hero.jpg",
      color: "#ED7D31",
      maxGuests: "@WYLIE_MAX_GUESTS_HERE",
      bedrooms: "@WYLIE_BEDROOMS_HERE",
      bathrooms: "@WYLIE_BATHROOMS_HERE",
      description: "@WYLIE_DESCRIPTION_HERE — about 80 words.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@WYLIE_WEEKDAY_RATE_HERE",
        weekend: "@WYLIE_WEEKEND_RATE_HERE",
        cleaningFee: "@WYLIE_CLEANING_FEE_HERE",
        petFee: "@WYLIE_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
    {
      slug: "pound",
      name: "Pound",
      address: "28 Pound Lane",
      tagline: "@POUND_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/pound/hero.jpg",
      color: "#1B6B2A",
      maxGuests: "@POUND_MAX_GUESTS_HERE",
      bedrooms: "@POUND_BEDROOMS_HERE",
      bathrooms: "@POUND_BATHROOMS_HERE",
      description: "@POUND_DESCRIPTION_HERE — about 80 words.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@POUND_WEEKDAY_RATE_HERE",
        weekend: "@POUND_WEEKEND_RATE_HERE",
        cleaningFee: "@POUND_CLEANING_FEE_HERE",
        petFee: "@POUND_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
    {
      slug: "maccauley",
      name: "MacCauley",
      address: "82 MacCauley Rd",
      tagline: "@MACCAULEY_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/maccauley/hero.jpg",
      color: "#A6261D",
      maxGuests: "@MACCAULEY_MAX_GUESTS_HERE",
      bedrooms: "@MACCAULEY_BEDROOMS_HERE",
      bathrooms: "@MACCAULEY_BATHROOMS_HERE",
      description: "@MACCAULEY_DESCRIPTION_HERE — about 80 words.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@MACCAULEY_WEEKDAY_RATE_HERE",
        weekend: "@MACCAULEY_WEEKEND_RATE_HERE",
        cleaningFee: "@MACCAULEY_CLEANING_FEE_HERE",
        petFee: "@MACCAULEY_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
    {
      slug: "milton",
      name: "Milton",
      address: "121 Milton Way",
      tagline: "@MILTON_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/milton/hero.jpg",
      color: "#70AD47",
      maxGuests: "@MILTON_MAX_GUESTS_HERE",
      bedrooms: "@MILTON_BEDROOMS_HERE",
      bathrooms: "@MILTON_BATHROOMS_HERE",
      description: "@MILTON_DESCRIPTION_HERE — about 80 words.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@MILTON_WEEKDAY_RATE_HERE",
        weekend: "@MILTON_WEEKEND_RATE_HERE",
        cleaningFee: "@MILTON_CLEANING_FEE_HERE",
        petFee: "@MILTON_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
    {
      slug: "petrarch",
      name: "Petrarch",
      address: "209 Petrarch Trail",
      tagline: "@PETRARCH_TAGLINE_HERE",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/petrarch/hero.jpg",
      color: "#6D4C1F",
      maxGuests: "@PETRARCH_MAX_GUESTS_HERE",
      bedrooms: "@PETRARCH_BEDROOMS_HERE",
      bathrooms: "@PETRARCH_BATHROOMS_HERE",
      description: "@PETRARCH_DESCRIPTION_HERE — about 80 words.",
      included: ["WiFi", "Full Kitchen", "Parking", "Linens & Towels"],
      rates: {
        weekday: "@PETRARCH_WEEKDAY_RATE_HERE",
        weekend: "@PETRARCH_WEEKEND_RATE_HERE",
        cleaningFee: "@PETRARCH_CLEANING_FEE_HERE",
        petFee: "@PETRARCH_PET_FEE_HERE",
        petFeeType: "per-stay",
      },
    },
  ],
};

// Convenience helper used by every property page.
window.SITE_CONFIG.getProperty = function(slug) {
  return window.SITE_CONFIG.properties.find(function(p) { return p.slug === slug; });
};
