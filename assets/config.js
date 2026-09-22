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
    availability: "https://poconomvp.com/availability.json",  // absolute URL so property subpages resolve correctly
    submitBooking: "https://script.google.com/macros/s/AKfycbxSb0ZFe_XbDMviK9BKrXz64gBbv7WE3oylP4LyVjZ1MpOcy5Z8sdkhe_t7BGrKxDt6qQ/exec",
  },

  // Payment methods. Flip enabled: true to surface the block on property
  // pages. Venmo + Zelle live in v1; the rest are scaffolded for later.
  payments: {
    contactMessage: "After we review and accept your reservation request, Will will send you a Venmo payment request — just tap to pay.\n\nVenmo accepted. Other payment methods available on request.",
    venmo: {
      enabled: false,
      label: "Venmo",
      handle: "@VENMO_HANDLE_HERE",
      instructions: "Send to the handle above. Include your check-in date in the note.",
    },
    zelle: {
      enabled: false,
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
      tagline: "Secluded pet-friendly Pocono cottage with pool and beach access",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/trails/hero.jpg?v=2f86b72",
      color: "#4BACC6",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A private cottage tucked into thick pines at the edge of a Pocono lake community in Albrightsville, PA. Three-floor layout includes a third-floor covered deck — perfect for rain or snow storms. Sleeps 10 across 3 bedrooms with 6 beds. Fully equipped kitchen, beach access, shared seasonal pool, washer/dryer, propane fireplace, and HDTV with streaming. Pet friendly — half-acre wooded lot. Ten minutes to Jim Thorpe, near ski slopes and water parks.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "High speed Wi-Fi (~400 Mbps)",
          "Pets encouraged",
          "4 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Fire TV)",
          "Half acre lot",
          "In-home washer & dryer",
        ]
      },
      photos: [
      "/trails/photos/001-living-room.jpg",
      "/trails/photos/002-living-room.jpg",
      "/trails/photos/003-living-room.jpg",
      "/trails/photos/004-living-room.jpg",
      "/trails/photos/005-living-room.jpg",
      "/trails/photos/006-living-room.jpg",
      "/trails/photos/007-living-room.jpg",
      "/trails/photos/008-living-room.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "/trails/photos/001-living-room.jpg",
          "/trails/photos/002-living-room.jpg",
          "/trails/photos/003-living-room.jpg",
          "/trails/photos/004-living-room.jpg",
          "/trails/photos/005-living-room.jpg",
          "/trails/photos/006-living-room.jpg",
          "/trails/photos/007-living-room.jpg",
          "/trails/photos/008-living-room.jpg",
          "/trails/photos/009-living-room.jpg",
          "/trails/photos/010-living-room.jpg"
        ],
        "Full kitchen": [
          "/trails/photos/011-full-kitchen.jpg"
        ],
        "Dining area": [
          "/trails/photos/012-dining-area.jpg",
          "/trails/photos/013-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/trails/photos/014-bedroom-1.jpg",
          "/trails/photos/015-bedroom-1.jpg",
          "/trails/photos/016-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/trails/photos/017-bedroom-2.jpg",
          "/trails/photos/018-bedroom-2.jpg",
          "/trails/photos/019-bedroom-2.jpg",
          "/trails/photos/020-bedroom-2.jpg",
          "/trails/photos/021-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/trails/photos/022-bedroom-3.jpg",
          "/trails/photos/023-bedroom-3.jpg"
        ],
        "Full bathroom 1": [
          "/trails/photos/024-full-bathroom-1.jpg",
          "/trails/photos/025-full-bathroom-1.jpg"
        ],
        "Full bathroom 2": [
          "/trails/photos/026-full-bathroom-2.jpg"
        ],
        "Deck": [
          "/trails/photos/027-deck.jpg",
          "/trails/photos/028-deck.jpg"
        ],
        "Exterior": [
          "/trails/photos/029-exterior.jpg",
          "/trails/photos/030-exterior.jpg",
          "/trails/photos/031-exterior.jpg",
          "/trails/photos/032-exterior.jpg",
          "/trails/photos/033-exterior.jpg",
          "/trails/photos/034-exterior.jpg",
          "/trails/photos/035-exterior.jpg",
          "/trails/photos/036-exterior.jpg",
          "/trails/photos/037-exterior.jpg",
          "/trails/photos/038-exterior.jpg",
          "/trails/photos/039-exterior.jpg",
          "/trails/photos/040-exterior.jpg",
          "/trails/photos/041-exterior.jpg",
          "/trails/photos/042-exterior.jpg",
          "/trails/photos/043-exterior.jpg",
          "/trails/photos/044-exterior.jpg",
          "/trails/photos/045-exterior.jpg",
          "/trails/photos/046-exterior.jpg"
        ],
        "Additional photos": [
          "/trails/photos/047-additional-photos.jpg",
          "/trails/photos/048-additional-photos.jpg",
          "/trails/photos/049-additional-photos.jpg",
          "/trails/photos/050-additional-photos.jpg",
          "/trails/photos/051-additional-photos.jpg",
          "/trails/photos/052-additional-photos.jpg",
          "/trails/photos/053-additional-photos.jpg",
          "/trails/photos/054-additional-photos.jpg",
          "/trails/photos/055-additional-photos.jpg",
          "/trails/photos/056-additional-photos.jpg",
          "/trails/photos/057-additional-photos.jpg",
          "/trails/photos/058-additional-photos.jpg",
          "/trails/photos/059-additional-photos.jpg",
          "/trails/photos/060-additional-photos.jpg",
          "/trails/photos/061-additional-photos.jpg",
          "/trails/photos/062-additional-photos.jpg",
          "/trails/photos/063-additional-photos.jpg",
          "/trails/photos/064-additional-photos.jpg",
          "/trails/photos/065-additional-photos.jpg",
          "/trails/photos/066-additional-photos.jpg",
          "/trails/photos/067-additional-photos.jpg",
          "/trails/photos/068-additional-photos.jpg",
          "/trails/photos/069-additional-photos.jpg",
          "/trails/photos/070-additional-photos.jpg",
          "/trails/photos/071-additional-photos.jpg",
          "/trails/photos/072-additional-photos.jpg",
          "/trails/photos/073-additional-photos.jpg",
          "/trails/photos/074-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/1273155947919003993",
        vrbo: "https://www.vrbo.com/971220ha"
      },
      rates: {
        midweek: 275,
        weekendNight: 425,
        weekend: 850,
        weekly: 1600,
        holidayWeekend: 1500,
        cleaningFee: 150,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
    {
      slug: "wylie",
      name: "Wylie",
      address: "119 Wylie Circle",
      tagline: "Rustic Pocono cabin with lake access, fenced yard, and pet-friendly perks",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/wylie/hero.jpg?v=2f86b72",
      color: "#ED7D31",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A charming cabin retreat in Albrightsville with a fully fenced yard, lake and beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Ideal for families and groups who want the outdoors close by — hiking, skiing, and water parks all nearby. Full kitchen, streaming HDTV, washer/dryer, propane fireplace, and self check-in. Pets warmly welcome.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "High speed Wi-Fi (~400 Mbps)",
          "Pets encouraged",
          "4 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Fire TV)",
          "Half acre lot",
          "In-home washer & dryer",
        ]
      },
      photos: [
      "/wylie/photos/001-living-room.jpg",
      "/wylie/photos/002-living-room.jpg",
      "/wylie/photos/003-living-room.jpg",
      "/wylie/photos/004-living-room.jpg",
      "/wylie/photos/005-full-kitchen.jpg",
      "/wylie/photos/006-dining-area.jpg",
      "/wylie/photos/007-bedroom-1.jpg",
      "/wylie/photos/008-bedroom-1.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "/wylie/photos/001-living-room.jpg",
          "/wylie/photos/002-living-room.jpg",
          "/wylie/photos/003-living-room.jpg",
          "/wylie/photos/004-living-room.jpg"
        ],
        "Full kitchen": [
          "/wylie/photos/005-full-kitchen.jpg"
        ],
        "Dining area": [
          "/wylie/photos/006-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/wylie/photos/007-bedroom-1.jpg",
          "/wylie/photos/008-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/wylie/photos/009-bedroom-2.jpg",
          "/wylie/photos/010-bedroom-2.jpg",
          "/wylie/photos/011-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/wylie/photos/012-bedroom-3.jpg",
          "/wylie/photos/013-bedroom-3.jpg"
        ],
        "Full bathroom 1": [
          "/wylie/photos/014-full-bathroom-1.jpg"
        ],
        "Full bathroom 2": [
          "/wylie/photos/015-full-bathroom-2.jpg"
        ],
        "Backyard": [
          "/wylie/photos/016-backyard.jpg",
          "/wylie/photos/017-backyard.jpg",
          "/wylie/photos/018-backyard.jpg",
          "/wylie/photos/019-backyard.jpg"
        ],
        "Exterior": [
          "/wylie/photos/020-exterior.jpg",
          "/wylie/photos/021-exterior.jpg",
          "/wylie/photos/022-exterior.jpg"
        ],
        "Game room": [
          "/wylie/photos/023-game-room.jpg",
          "/wylie/photos/024-game-room.jpg"
        ],
        "Additional photos": [
          "/wylie/photos/025-additional-photos.jpg",
          "/wylie/photos/026-additional-photos.jpg",
          "/wylie/photos/027-additional-photos.jpg",
          "/wylie/photos/028-additional-photos.jpg",
          "/wylie/photos/029-additional-photos.jpg",
          "/wylie/photos/030-additional-photos.jpg",
          "/wylie/photos/031-additional-photos.jpg",
          "/wylie/photos/032-additional-photos.jpg",
          "/wylie/photos/033-additional-photos.jpg",
          "/wylie/photos/034-additional-photos.jpg",
          "/wylie/photos/035-additional-photos.jpg",
          "/wylie/photos/036-additional-photos.jpg",
          "/wylie/photos/037-additional-photos.jpg",
          "/wylie/photos/038-additional-photos.jpg",
          "/wylie/photos/039-additional-photos.jpg",
          "/wylie/photos/040-additional-photos.jpg",
          "/wylie/photos/041-additional-photos.jpg",
          "/wylie/photos/042-additional-photos.jpg",
          "/wylie/photos/043-additional-photos.jpg",
          "/wylie/photos/044-additional-photos.jpg",
          "/wylie/photos/045-additional-photos.jpg",
          "/wylie/photos/046-additional-photos.jpg",
          "/wylie/photos/047-additional-photos.jpg",
          "/wylie/photos/048-additional-photos.jpg",
          "/wylie/photos/049-additional-photos.jpg",
          "/wylie/photos/050-additional-photos.jpg",
          "/wylie/photos/051-additional-photos.jpg",
          "/wylie/photos/052-additional-photos.jpg",
          "/wylie/photos/053-additional-photos.jpg",
          "/wylie/photos/054-additional-photos.jpg",
          "/wylie/photos/055-additional-photos.jpg",
          "/wylie/photos/056-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/16612729",
        vrbo: "https://www.vrbo.com/3688087ha"
      },
      rates: {
        midweek: 275,
        weekendNight: 425,
        weekend: 850,
        weekly: 1600,
        holidayWeekend: 1500,
        cleaningFee: 150,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
    {
      slug: "pound",
      name: "Pound",
      address: "28 Pound Lane",
      tagline: "Cozy Pocono cottage with fenced yard, pool, and beach access for families",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/pound/hero.jpg?v=2f86b72",
      color: "#1B6B2A",
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 2,
      beds: 5,
      description: "A cozy cottage in Albrightsville with a fully fenced yard, beach access, and shared seasonal pool. Comfortably sleeps 8 across 3 bedrooms. Features a full kitchen, washer/dryer, streaming HDTV, propane fireplace, and dedicated workspace. Self check-in via keypad. Pet friendly. Close to Jim Thorpe, ski slopes, and Pocono water parks.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "High speed Wi-Fi (~400 Mbps)",
          "Pets encouraged",
          "4 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Fire TV)",
          "Half acre lot",
          "In-home washer & dryer",
        ]
      },
      photos: [
      "/pound/photos/001-living-room-1.jpg",
      "/pound/photos/002-living-room-1.jpg",
      "/pound/photos/003-living-room-1.jpg",
      "/pound/photos/004-living-room-1.jpg",
      "/pound/photos/005-living-room-2.jpg",
      "/pound/photos/006-living-room-2.jpg",
      "/pound/photos/007-full-kitchen.jpg",
      "/pound/photos/008-full-kitchen.jpg"
      ],
      photosByRoom: {
        "Living room 1": [
          "/pound/photos/001-living-room-1.jpg",
          "/pound/photos/002-living-room-1.jpg",
          "/pound/photos/003-living-room-1.jpg",
          "/pound/photos/004-living-room-1.jpg"
        ],
        "Living room 2": [
          "/pound/photos/005-living-room-2.jpg",
          "/pound/photos/006-living-room-2.jpg"
        ],
        "Full kitchen": [
          "/pound/photos/007-full-kitchen.jpg",
          "/pound/photos/008-full-kitchen.jpg"
        ],
        "Dining area": [
          "/pound/photos/009-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/pound/photos/010-bedroom-1.jpg",
          "/pound/photos/011-bedroom-1.jpg",
          "/pound/photos/012-bedroom-1.jpg",
          "/pound/photos/013-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/pound/photos/014-bedroom-2.jpg",
          "/pound/photos/015-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/pound/photos/016-bedroom-3.jpg",
          "/pound/photos/017-bedroom-3.jpg",
          "/pound/photos/018-bedroom-3.jpg"
        ],
        "Full bathroom 1": [
          "/pound/photos/019-full-bathroom-1.jpg",
          "/pound/photos/020-full-bathroom-1.jpg"
        ],
        "Full bathroom 2": [
          "/pound/photos/021-full-bathroom-2.jpg",
          "/pound/photos/022-full-bathroom-2.jpg"
        ],
        "Backyard": [
          "/pound/photos/023-backyard.jpg",
          "/pound/photos/024-backyard.jpg",
          "/pound/photos/025-backyard.jpg",
          "/pound/photos/026-backyard.jpg",
          "/pound/photos/027-backyard.jpg",
          "/pound/photos/028-backyard.jpg",
          "/pound/photos/029-backyard.jpg",
          "/pound/photos/030-backyard.jpg"
        ],
        "Exterior": [
          "/pound/photos/031-exterior.jpg",
          "/pound/photos/032-exterior.jpg",
          "/pound/photos/033-exterior.jpg"
        ],
        "Additional photos": [
          "/pound/photos/034-additional-photos.jpg",
          "/pound/photos/035-additional-photos.jpg",
          "/pound/photos/036-additional-photos.jpg",
          "/pound/photos/037-additional-photos.jpg",
          "/pound/photos/038-additional-photos.jpg",
          "/pound/photos/039-additional-photos.jpg",
          "/pound/photos/040-additional-photos.jpg",
          "/pound/photos/041-additional-photos.jpg",
          "/pound/photos/042-additional-photos.jpg",
          "/pound/photos/043-additional-photos.jpg",
          "/pound/photos/044-additional-photos.jpg",
          "/pound/photos/045-additional-photos.jpg",
          "/pound/photos/046-additional-photos.jpg",
          "/pound/photos/047-additional-photos.jpg",
          "/pound/photos/048-additional-photos.jpg",
          "/pound/photos/049-additional-photos.jpg",
          "/pound/photos/050-additional-photos.jpg",
          "/pound/photos/051-additional-photos.jpg",
          "/pound/photos/052-additional-photos.jpg",
          "/pound/photos/053-additional-photos.jpg",
          "/pound/photos/054-additional-photos.jpg",
          "/pound/photos/055-additional-photos.jpg",
          "/pound/photos/056-additional-photos.jpg",
          "/pound/photos/057-additional-photos.jpg",
          "/pound/photos/058-additional-photos.jpg",
          "/pound/photos/059-additional-photos.jpg",
          "/pound/photos/060-additional-photos.jpg",
          "/pound/photos/061-additional-photos.jpg",
          "/pound/photos/062-additional-photos.jpg",
          "/pound/photos/063-additional-photos.jpg",
          "/pound/photos/064-additional-photos.jpg",
          "/pound/photos/065-additional-photos.jpg",
          "/pound/photos/066-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/40229320",
        vrbo: "https://www.vrbo.com/3848476ha"
      },
      rates: {
        midweek: 275,
        weekendNight: 425,
        weekend: 850,
        weekly: 1600,
        holidayWeekend: 1500,
        cleaningFee: 150,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
    {
      slug: "maccauley",
      name: "MacCauley",
      address: "82 MacCauley Rd",
      tagline: "Premier Pocono retreat with arcade, theater room, and fully fenced backyard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/maccauley/hero.jpg?v=2f86b72",
      color: "#A6261D",
      maxGuests: 12,
      bedrooms: 4,
      bathrooms: 2,
      beds: 7,
      description: "The ultimate Pocono group retreat in Albrightsville, PA — featuring an arcade, two dedicated game rooms, a theater room area, and TVs in every room. Fully fenced backyard with wire mesh fence for pets. Sleeps 12 across 4 bedrooms with 7 beds. Floor-to-ceiling river-rock gas fireplace. Beach access, shared pool, full kitchen, washer/dryer. Near Jim Thorpe, ski resorts, and Pocono Speedway.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "High speed Wi-Fi (~400 Mbps)",
          "Pets encouraged",
          "4 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Fire TV)",
          "Half acre lot",
          "In-home washer & dryer",
          "Multiple game room spaces",
          "Game Room 1: Arcade cabinet (multi-game), pool table, ping pong",
          "Game Room 2: Foosball, air hockey, darts",
          "Theater room",
        ]
      },
      photos: [
      "/maccauley/photos/001-living-room.jpg",
      "/maccauley/photos/002-living-room.jpg",
      "/maccauley/photos/003-living-room.jpg",
      "/maccauley/photos/004-living-room.jpg",
      "/maccauley/photos/005-living-room.jpg",
      "/maccauley/photos/006-living-room.jpg",
      "/maccauley/photos/007-living-room.jpg",
      "/maccauley/photos/008-living-room.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "/maccauley/photos/001-living-room.jpg",
          "/maccauley/photos/002-living-room.jpg",
          "/maccauley/photos/003-living-room.jpg",
          "/maccauley/photos/004-living-room.jpg",
          "/maccauley/photos/005-living-room.jpg",
          "/maccauley/photos/006-living-room.jpg",
          "/maccauley/photos/007-living-room.jpg",
          "/maccauley/photos/008-living-room.jpg"
        ],
        "Full kitchen": [
          "/maccauley/photos/009-full-kitchen.jpg",
          "/maccauley/photos/010-full-kitchen.jpg"
        ],
        "Dining area": [
          "/maccauley/photos/011-dining-area.jpg",
          "/maccauley/photos/012-dining-area.jpg",
          "/maccauley/photos/013-dining-area.jpg",
          "/maccauley/photos/014-dining-area.jpg",
          "/maccauley/photos/015-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/maccauley/photos/016-bedroom-1.jpg",
          "/maccauley/photos/017-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/maccauley/photos/018-bedroom-2.jpg",
          "/maccauley/photos/019-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/maccauley/photos/020-bedroom-3.jpg",
          "/maccauley/photos/021-bedroom-3.jpg"
        ],
        "Bedroom 4": [
          "/maccauley/photos/022-bedroom-4.jpg",
          "/maccauley/photos/023-bedroom-4.jpg"
        ],
        "Full bathroom 1": [
          "/maccauley/photos/024-full-bathroom-1.jpg",
          "/maccauley/photos/025-full-bathroom-1.jpg",
          "/maccauley/photos/026-full-bathroom-1.jpg"
        ],
        "Full bathroom 2": [
          "/maccauley/photos/027-full-bathroom-2.jpg",
          "/maccauley/photos/028-full-bathroom-2.jpg"
        ],
        "Backyard": [
          "/maccauley/photos/029-backyard.jpg",
          "/maccauley/photos/030-backyard.jpg",
          "/maccauley/photos/031-backyard.jpg",
          "/maccauley/photos/032-backyard.jpg",
          "/maccauley/photos/033-backyard.jpg",
          "/maccauley/photos/034-backyard.jpg",
          "/maccauley/photos/035-backyard.jpg"
        ],
        "Patio": [
          "/maccauley/photos/036-patio.jpg",
          "/maccauley/photos/037-patio.jpg",
          "/maccauley/photos/038-patio.jpg",
          "/maccauley/photos/039-patio.jpg",
          "/maccauley/photos/040-patio.jpg",
          "/maccauley/photos/041-patio.jpg",
          "/maccauley/photos/042-patio.jpg"
        ],
        "Exterior": [
          "/maccauley/photos/043-exterior.jpg",
          "/maccauley/photos/044-exterior.jpg",
          "/maccauley/photos/045-exterior.jpg",
          "/maccauley/photos/046-exterior.jpg",
          "/maccauley/photos/047-exterior.jpg",
          "/maccauley/photos/048-exterior.jpg",
          "/maccauley/photos/049-exterior.jpg",
          "/maccauley/photos/050-exterior.jpg",
          "/maccauley/photos/051-exterior.jpg",
          "/maccauley/photos/052-exterior.jpg"
        ],
        "Movie theater": [
          "/maccauley/photos/053-movie-theater.jpg",
          "/maccauley/photos/054-movie-theater.jpg",
          "/maccauley/photos/055-movie-theater.jpg",
          "/maccauley/photos/056-movie-theater.jpg",
          "/maccauley/photos/057-movie-theater.jpg",
          "/maccauley/photos/058-movie-theater.jpg"
        ],
        "Game room 1": [
          "/maccauley/photos/059-game-room-1.jpg",
          "/maccauley/photos/060-game-room-1.jpg",
          "/maccauley/photos/061-game-room-1.jpg",
          "/maccauley/photos/062-game-room-1.jpg",
          "/maccauley/photos/063-game-room-1.jpg",
          "/maccauley/photos/064-game-room-1.jpg",
          "/maccauley/photos/065-game-room-1.jpg",
          "/maccauley/photos/066-game-room-1.jpg",
          "/maccauley/photos/067-game-room-1.jpg",
          "/maccauley/photos/068-game-room-1.jpg",
          "/maccauley/photos/069-game-room-1.jpg",
          "/maccauley/photos/070-game-room-1.jpg",
          "/maccauley/photos/071-game-room-1.jpg"
        ],
        "Game room 2": [
          "/maccauley/photos/072-game-room-2.jpg",
          "/maccauley/photos/073-game-room-2.jpg",
          "/maccauley/photos/074-game-room-2.jpg",
          "/maccauley/photos/075-game-room-2.jpg",
          "/maccauley/photos/076-game-room-2.jpg",
          "/maccauley/photos/077-game-room-2.jpg",
          "/maccauley/photos/078-game-room-2.jpg",
          "/maccauley/photos/079-game-room-2.jpg",
          "/maccauley/photos/080-game-room-2.jpg",
          "/maccauley/photos/081-game-room-2.jpg"
        ],
        "Additional photos": [
          "/maccauley/photos/082-additional-photos.jpg",
          "/maccauley/photos/083-additional-photos.jpg",
          "/maccauley/photos/084-additional-photos.jpg",
          "/maccauley/photos/085-additional-photos.jpg",
          "/maccauley/photos/086-additional-photos.jpg",
          "/maccauley/photos/087-additional-photos.jpg",
          "/maccauley/photos/088-additional-photos.jpg",
          "/maccauley/photos/089-additional-photos.jpg",
          "/maccauley/photos/090-additional-photos.jpg",
          "/maccauley/photos/091-additional-photos.jpg",
          "/maccauley/photos/092-additional-photos.jpg",
          "/maccauley/photos/093-additional-photos.jpg",
          "/maccauley/photos/094-additional-photos.jpg",
          "/maccauley/photos/095-additional-photos.jpg",
          "/maccauley/photos/096-additional-photos.jpg",
          "/maccauley/photos/097-additional-photos.jpg",
          "/maccauley/photos/098-additional-photos.jpg",
          "/maccauley/photos/099-additional-photos.jpg",
          "/maccauley/photos/100-additional-photos.jpg",
          "/maccauley/photos/101-additional-photos.jpg",
          "/maccauley/photos/102-additional-photos.jpg",
          "/maccauley/photos/103-additional-photos.jpg",
          "/maccauley/photos/104-additional-photos.jpg",
          "/maccauley/photos/105-additional-photos.jpg",
          "/maccauley/photos/106-additional-photos.jpg",
          "/maccauley/photos/107-additional-photos.jpg",
          "/maccauley/photos/108-additional-photos.jpg",
          "/maccauley/photos/109-additional-photos.jpg",
          "/maccauley/photos/110-additional-photos.jpg",
          "/maccauley/photos/111-additional-photos.jpg",
          "/maccauley/photos/112-additional-photos.jpg",
          "/maccauley/photos/113-additional-photos.jpg",
          "/maccauley/photos/114-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/776227061200723382",
        vrbo: "https://www.vrbo.com/3133799"
      },
      rates: {
        midweek: 400,
        weekendNight: 625,
        weekend: 1250,
        weekly: 2400,
        holidayWeekend: 2100,
        cleaningFee: 180,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
    {
      slug: "milton",
      name: "Milton",
      address: "121 Milton Way",
      tagline: "Pocono family retreat with game rooms, fenced yard, pool, and beach access",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/milton/hero.jpg?v=2f86b72",
      color: "#70AD47",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A spacious Pocono retreat in Albrightsville, PA, designed for families and groups. Features dedicated game rooms, a fully fenced backyard for kids and pets, beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Full kitchen, streaming HDTV, washer, propane fireplace, and dedicated workspace. Self check-in via keypad. Near Jim Thorpe, ski slopes, and Pocono water parks.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "High speed Wi-Fi (~400 Mbps)",
          "Pets encouraged",
          "4 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Fire TV)",
          "Half acre lot",
          "In-home washer & dryer",
          "Multiple game room spaces",
          "Basement Game Room: Pool table, arcade machine, ping pong, air hockey, shuffleboard, darts, Connect 4 wall game, bean bag toss",
          "Loft Game Room: Basketball shooter, foosball",
        ]
      },
      photos: [
      "/milton/photos/001-living-room.jpg",
      "/milton/photos/002-living-room.jpg",
      "/milton/photos/003-living-room.jpg",
      "/milton/photos/004-living-room.jpg",
      "/milton/photos/005-living-room.jpg",
      "/milton/photos/006-living-room.jpg",
      "/milton/photos/007-living-room.jpg",
      "/milton/photos/008-living-room.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "/milton/photos/001-living-room.jpg",
          "/milton/photos/002-living-room.jpg",
          "/milton/photos/003-living-room.jpg",
          "/milton/photos/004-living-room.jpg",
          "/milton/photos/005-living-room.jpg",
          "/milton/photos/006-living-room.jpg",
          "/milton/photos/007-living-room.jpg",
          "/milton/photos/008-living-room.jpg",
          "/milton/photos/009-living-room.jpg"
        ],
        "Full kitchen": [
          "/milton/photos/010-full-kitchen.jpg",
          "/milton/photos/011-full-kitchen.jpg",
          "/milton/photos/012-full-kitchen.jpg",
          "/milton/photos/013-full-kitchen.jpg",
          "/milton/photos/014-full-kitchen.jpg"
        ],
        "Dining area": [
          "/milton/photos/015-dining-area.jpg",
          "/milton/photos/016-dining-area.jpg",
          "/milton/photos/017-dining-area.jpg",
          "/milton/photos/018-dining-area.jpg",
          "/milton/photos/019-dining-area.jpg",
          "/milton/photos/020-dining-area.jpg",
          "/milton/photos/021-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/milton/photos/022-bedroom-1.jpg",
          "/milton/photos/023-bedroom-1.jpg",
          "/milton/photos/024-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/milton/photos/025-bedroom-2.jpg",
          "/milton/photos/026-bedroom-2.jpg",
          "/milton/photos/027-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/milton/photos/028-bedroom-3.jpg",
          "/milton/photos/029-bedroom-3.jpg"
        ],
        "Full bathroom 1": [
          "/milton/photos/030-full-bathroom-1.jpg",
          "/milton/photos/031-full-bathroom-1.jpg"
        ],
        "Full bathroom 2": [
          "/milton/photos/032-full-bathroom-2.jpg",
          "/milton/photos/033-full-bathroom-2.jpg"
        ],
        "Laundry area": [
          "/milton/photos/034-laundry-area.jpg"
        ],
        "Exterior": [
          "/milton/photos/035-exterior.jpg",
          "/milton/photos/036-exterior.jpg",
          "/milton/photos/037-exterior.jpg",
          "/milton/photos/038-exterior.jpg",
          "/milton/photos/039-exterior.jpg",
          "/milton/photos/040-exterior.jpg",
          "/milton/photos/041-exterior.jpg",
          "/milton/photos/042-exterior.jpg",
          "/milton/photos/043-exterior.jpg",
          "/milton/photos/044-exterior.jpg"
        ],
        "Game room 1": [
          "/milton/photos/045-game-room-1.jpg",
          "/milton/photos/046-game-room-1.jpg",
          "/milton/photos/047-game-room-1.jpg",
          "/milton/photos/048-game-room-1.jpg",
          "/milton/photos/049-game-room-1.jpg",
          "/milton/photos/050-game-room-1.jpg",
          "/milton/photos/051-game-room-1.jpg",
          "/milton/photos/052-game-room-1.jpg",
          "/milton/photos/053-game-room-1.jpg",
          "/milton/photos/054-game-room-1.jpg",
          "/milton/photos/055-game-room-1.jpg",
          "/milton/photos/056-game-room-1.jpg",
          "/milton/photos/057-game-room-1.jpg",
          "/milton/photos/058-game-room-1.jpg",
          "/milton/photos/059-game-room-1.jpg"
        ],
        "Game room 2": [
          "/milton/photos/060-game-room-2.jpg",
          "/milton/photos/061-game-room-2.jpg"
        ],
        "Additional photos": [
          "/milton/photos/062-additional-photos.jpg",
          "/milton/photos/063-additional-photos.jpg",
          "/milton/photos/064-additional-photos.jpg",
          "/milton/photos/065-additional-photos.jpg",
          "/milton/photos/066-additional-photos.jpg",
          "/milton/photos/067-additional-photos.jpg",
          "/milton/photos/068-additional-photos.jpg",
          "/milton/photos/069-additional-photos.jpg",
          "/milton/photos/070-additional-photos.jpg",
          "/milton/photos/071-additional-photos.jpg",
          "/milton/photos/072-additional-photos.jpg",
          "/milton/photos/073-additional-photos.jpg",
          "/milton/photos/074-additional-photos.jpg",
          "/milton/photos/075-additional-photos.jpg",
          "/milton/photos/076-additional-photos.jpg",
          "/milton/photos/077-additional-photos.jpg",
          "/milton/photos/078-additional-photos.jpg",
          "/milton/photos/079-additional-photos.jpg",
          "/milton/photos/080-additional-photos.jpg",
          "/milton/photos/081-additional-photos.jpg",
          "/milton/photos/082-additional-photos.jpg",
          "/milton/photos/083-additional-photos.jpg",
          "/milton/photos/084-additional-photos.jpg",
          "/milton/photos/085-additional-photos.jpg",
          "/milton/photos/086-additional-photos.jpg",
          "/milton/photos/087-additional-photos.jpg",
          "/milton/photos/088-additional-photos.jpg",
          "/milton/photos/089-additional-photos.jpg",
          "/milton/photos/090-additional-photos.jpg",
          "/milton/photos/091-additional-photos.jpg",
          "/milton/photos/092-additional-photos.jpg",
          "/milton/photos/093-additional-photos.jpg",
          "/milton/photos/094-additional-photos.jpg",
          "/milton/photos/095-additional-photos.jpg",
          "/milton/photos/096-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/15973534",
        vrbo: "https://www.vrbo.com/3505122ha"
      },
      rates: {
        midweek: 350,
        weekendNight: 475,
        weekend: 950,
        weekly: 2100,
        holidayWeekend: 1800,
        cleaningFee: 170,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
    {
      slug: "petrarch",
      name: "Petrarch",
      address: "209 Petrarch Trail",
      tagline: "Modern Pocono mountain retreat for couples, pet-friendly with fenced yard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/petrarch/hero.jpg?v=2f86b72",
      color: "#6D4C1F",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 1,
      beds: 4,
      description: "A stylish mountain modern retreat in Albrightsville, PA, ideal for couples or small groups. Features a fully fenced yard for pets, beach and lake access, and shared seasonal pool. Sleeps 6 in 3 bedrooms with 4 beds. Full kitchen, streaming TV, washer/dryer, stone masonry gas fireplace, and dedicated workspace. Near Jim Thorpe, ski slopes, and Pocono water parks. Easy self check-in.",
      included: {
        community: [
          "Beach access",
          "Lake access",
          "Pool access (outdoor seasonal community)",
        ],
        home: [
          "Air conditioning",
          "Pets encouraged",
          "Fully fenced yard",
          "One acre lot",
          "High speed Wi-Fi (~400 Mbps)",
          "2 HDTVs with streaming (Netflix, Hulu, Amazon, Disney+ / Roku TV)",
          "In-home washer & dryer",
        ]
      },
      photos: [
      "/petrarch/photos/001-living-room.jpg",
      "/petrarch/photos/002-living-room.jpg",
      "/petrarch/photos/003-living-room.jpg",
      "/petrarch/photos/004-living-room.jpg",
      "/petrarch/photos/005-living-room.jpg",
      "/petrarch/photos/006-living-room.jpg",
      "/petrarch/photos/007-living-room.jpg",
      "/petrarch/photos/008-full-kitchen.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "/petrarch/photos/001-living-room.jpg",
          "/petrarch/photos/002-living-room.jpg",
          "/petrarch/photos/003-living-room.jpg",
          "/petrarch/photos/004-living-room.jpg",
          "/petrarch/photos/005-living-room.jpg",
          "/petrarch/photos/006-living-room.jpg",
          "/petrarch/photos/007-living-room.jpg"
        ],
        "Full kitchen": [
          "/petrarch/photos/008-full-kitchen.jpg",
          "/petrarch/photos/009-full-kitchen.jpg",
          "/petrarch/photos/010-full-kitchen.jpg",
          "/petrarch/photos/011-full-kitchen.jpg",
          "/petrarch/photos/012-full-kitchen.jpg",
          "/petrarch/photos/013-full-kitchen.jpg"
        ],
        "Dining area": [
          "/petrarch/photos/014-dining-area.jpg",
          "/petrarch/photos/015-dining-area.jpg",
          "/petrarch/photos/016-dining-area.jpg"
        ],
        "Bedroom 1": [
          "/petrarch/photos/017-bedroom-1.jpg",
          "/petrarch/photos/018-bedroom-1.jpg",
          "/petrarch/photos/019-bedroom-1.jpg",
          "/petrarch/photos/020-bedroom-1.jpg"
        ],
        "Bedroom 2": [
          "/petrarch/photos/021-bedroom-2.jpg",
          "/petrarch/photos/022-bedroom-2.jpg"
        ],
        "Bedroom 3": [
          "/petrarch/photos/023-bedroom-3.jpg",
          "/petrarch/photos/024-bedroom-3.jpg"
        ],
        "Full bathroom": [
          "/petrarch/photos/025-full-bathroom.jpg",
          "/petrarch/photos/026-full-bathroom.jpg",
          "/petrarch/photos/027-full-bathroom.jpg",
          "/petrarch/photos/028-full-bathroom.jpg",
          "/petrarch/photos/029-full-bathroom.jpg",
          "/petrarch/photos/030-full-bathroom.jpg"
        ],
        "Exterior": [
          "/petrarch/photos/031-exterior.jpg",
          "/petrarch/photos/032-exterior.jpg",
          "/petrarch/photos/033-exterior.jpg",
          "/petrarch/photos/034-exterior.jpg",
          "/petrarch/photos/035-exterior.jpg",
          "/petrarch/photos/036-exterior.jpg",
          "/petrarch/photos/037-exterior.jpg"
        ],
        "Additional photos": [
          "/petrarch/photos/038-additional-photos.jpg",
          "/petrarch/photos/039-additional-photos.jpg",
          "/petrarch/photos/040-additional-photos.jpg",
          "/petrarch/photos/041-additional-photos.jpg",
          "/petrarch/photos/042-additional-photos.jpg",
          "/petrarch/photos/043-additional-photos.jpg",
          "/petrarch/photos/044-additional-photos.jpg",
          "/petrarch/photos/045-additional-photos.jpg",
          "/petrarch/photos/046-additional-photos.jpg",
          "/petrarch/photos/047-additional-photos.jpg",
          "/petrarch/photos/048-additional-photos.jpg",
          "/petrarch/photos/049-additional-photos.jpg",
          "/petrarch/photos/050-additional-photos.jpg",
          "/petrarch/photos/051-additional-photos.jpg",
          "/petrarch/photos/052-additional-photos.jpg",
          "/petrarch/photos/053-additional-photos.jpg",
          "/petrarch/photos/054-additional-photos.jpg",
          "/petrarch/photos/055-additional-photos.jpg",
          "/petrarch/photos/056-additional-photos.jpg",
          "/petrarch/photos/057-additional-photos.jpg",
          "/petrarch/photos/058-additional-photos.jpg",
          "/petrarch/photos/059-additional-photos.jpg",
          "/petrarch/photos/060-additional-photos.jpg",
          "/petrarch/photos/061-additional-photos.jpg",
          "/petrarch/photos/062-additional-photos.jpg",
          "/petrarch/photos/063-additional-photos.jpg",
          "/petrarch/photos/064-additional-photos.jpg",
          "/petrarch/photos/065-additional-photos.jpg"
        ]
      },
      platformUrls: {
        airbnb: "https://www.airbnb.com/rooms/1100977895146044046",
        vrbo: "https://www.vrbo.com/3891350"
      },
      rates: {
        midweek: 200,
        weekendNight: 375,
        weekend: 750,
        weekly: 1400,
        holidayWeekend: 1200,
        cleaningFee: 120,
        petFee: 25,
        petFeeType: "per-night"
      }
    },
  ],
};

// Convenience helper used by every property page.
window.SITE_CONFIG.getProperty = function(slug) {
  return window.SITE_CONFIG.properties.find(function(p) { return p.slug === slug; });
};
