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
      tagline: "Secluded Pocono cottage with pool, beach access, and pet-friendly fenced yard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/trails/hero.jpg",
      color: "#4BACC6",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A private cottage tucked into thick pines at the edge of a Pocono lake community. Three-floor layout includes a third-floor covered deck — perfect for rain or snow storms. Fully equipped kitchen, beach access, shared seasonal pool, washer/dryer, and HDTV with streaming. Fenced yard for pets. Ten minutes to Jim Thorpe, near ski slopes and water parks.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "photos/trails-1.jpg",
      "photos/trails-2.jpg",
      "photos/trails-3.jpg",
      "photos/trails-4.jpg",
      "photos/trails-5.jpg",
      "photos/trails-6.jpg",
      "photos/trails-7.jpg",
      "photos/trails-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/1273155947919003993",
        vrbo: "https://www.vrbo.com/971220ha"
      },
      rates: {
        weekday: 95,
        weekend: 145,
        cleaningFee: 175,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $95/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
    {
      slug: "wylie",
      name: "Wylie",
      address: "119 Wylie Circle",
      tagline: "Rustic Pocono cabin with lake access, fenced yard, and pet-friendly perks",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/wylie/hero.jpg",
      color: "#ED7D31",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A charming cabin retreat in Albrightsville with a fully fenced yard, lake and beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Ideal for families and groups who want the outdoors close by — hiking, skiing, and water parks all nearby. Full kitchen, streaming HDTV, washer/dryer, and self check-in. Pets warmly welcome.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "photos/wylie-1.jpg",
      "photos/wylie-2.jpg",
      "photos/wylie-3.jpg",
      "photos/wylie-4.jpg",
      "photos/wylie-5.jpg",
      "photos/wylie-6.jpg",
      "photos/wylie-7.jpg",
      "photos/wylie-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/16612729",
        vrbo: "https://www.vrbo.com/3688087ha"
      },
      rates: {
        weekday: 115,
        weekend: 165,
        cleaningFee: 175,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $115/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
    {
      slug: "pound",
      name: "Pound",
      address: "28 Pound Lane",
      tagline: "Cozy Pocono cottage with fenced yard, pool, and beach access for families",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/pound/hero.jpg",
      color: "#1B6B2A",
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 2,
      beds: 5,
      description: "A cozy cottage in Albrightsville with a fully fenced yard, beach access, and shared seasonal pool. Comfortably sleeps 8 across 3 bedrooms. Features a full kitchen, washer/dryer, streaming HDTV, and dedicated workspace. Self check-in via keypad. Pet friendly. Close to Jim Thorpe, ski slopes, and Pocono water parks.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "photos/pound-1.jpg",
      "photos/pound-2.jpg",
      "photos/pound-3.jpg",
      "photos/pound-4.jpg",
      "photos/pound-5.jpg",
      "photos/pound-6.jpg",
      "photos/pound-7.jpg",
      "photos/pound-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/40229320",
        vrbo: "https://www.vrbo.com/3848476ha"
      },
      rates: {
        weekday: 95,
        weekend: 145,
        cleaningFee: 175,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $95/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
    {
      slug: "maccauley",
      name: "MacCauley",
      address: "82 MacCauley Rd",
      tagline: "Premier Pocono retreat with arcade, theater room, and fully fenced backyard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/maccauley/hero.jpg",
      color: "#A6261D",
      maxGuests: 12,
      bedrooms: 4,
      bathrooms: 2,
      beds: 7,
      description: "The ultimate Pocono group retreat — featuring an arcade, two dedicated game rooms, a theater room area, and TVs in every room. Fully fenced backyard with wire mesh fence for pets. Sleeps 12 across 4 bedrooms with 7 beds. Beach access, shared pool, full kitchen, washer/dryer. Near Jim Thorpe, ski resorts, and Pocono Speedway.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Arcade & game rooms",
        "Theater room",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed"
      ],
      photos: [
      "photos/maccauley-1.jpg",
      "photos/maccauley-2.jpg",
      "photos/maccauley-3.jpg",
      "photos/maccauley-4.jpg",
      "photos/maccauley-5.jpg",
      "photos/maccauley-6.jpg",
      "photos/maccauley-7.jpg",
      "photos/maccauley-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/776227061200723382",
        vrbo: "https://www.vrbo.com/3133799"
      },
      rates: {
        weekday: 225,
        weekend: 275,
        cleaningFee: 240,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $225/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
    {
      slug: "milton",
      name: "Milton",
      address: "121 Milton Way",
      tagline: "Pocono family retreat with game rooms, fenced yard, pool, and beach access",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/milton/hero.jpg",
      color: "#70AD47",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A spacious Pocono retreat designed for families and groups. Features dedicated game rooms, a fully fenced backyard for kids and pets, beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Full kitchen, streaming HDTV, washer, and dedicated workspace. Self check-in via keypad. Near Jim Thorpe, ski slopes, and Pocono water parks.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Game rooms",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+"
      ],
      photos: [
      "photos/milton-1.jpg",
      "photos/milton-2.jpg",
      "photos/milton-3.jpg",
      "photos/milton-4.jpg",
      "photos/milton-5.jpg",
      "photos/milton-6.jpg",
      "photos/milton-7.jpg",
      "photos/milton-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/15973534",
        vrbo: "https://www.vrbo.com/3505122ha"
      },
      rates: {
        weekday: 150,
        weekend: 200,
        cleaningFee: 225,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $150/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
    {
      slug: "petrarch",
      name: "Petrarch",
      address: "209 Petrarch Trail",
      tagline: "Modern Pocono mountain retreat for couples, pet-friendly with fenced yard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/petrarch/hero.jpg",
      color: "#6D4C1F",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 1,
      beds: 4,
      description: "A stylish mountain modern retreat ideal for couples or small groups. Features a fully fenced yard for pets, beach and lake access, and shared seasonal pool. Sleeps 6 in 3 bedrooms with 4 beds. Full kitchen, streaming TV, washer/dryer, and dedicated workspace. Near Jim Thorpe, ski slopes, and Pocono water parks. Easy self check-in.",
      included: [
        "Beach access",
        "Shared outdoor pool (seasonal)",
        "Kitchen",
        "Wifi",
        "Free parking on premises",
        "Pets allowed",
        "TV with streaming",
        "Washer & dryer"
      ],
      photos: [
      "photos/petrarch-1.jpg",
      "photos/petrarch-2.jpg",
      "photos/petrarch-3.jpg",
      "photos/petrarch-4.jpg",
      "photos/petrarch-5.jpg",
      "photos/petrarch-6.jpg",
      "photos/petrarch-7.jpg",
      "photos/petrarch-8.jpg"
      ],
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/1100977895146044046",
        vrbo: "https://www.vrbo.com/3891350"
      },
      rates: {
        weekday: 95,
        weekend: 145,
        cleaningFee: 125,
        petFee: 25,
        petFeeType: "per-night",
        smartPricingNote: "From $95/night via Smart Pricing — final rate confirmed when we reply."
      }
    },
  ],
};

// Convenience helper used by every property page.
window.SITE_CONFIG.getProperty = function(slug) {
  return window.SITE_CONFIG.properties.find(function(p) { return p.slug === slug; });
};
