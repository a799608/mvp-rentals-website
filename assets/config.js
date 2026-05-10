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
      tagline: "Secluded Pocono cottage with pool, beach access, and pet-friendly fenced yard",
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/trails/hero.jpg?v=2f86b72",
      color: "#4BACC6",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A private cottage tucked into thick pines at the edge of a Pocono lake community. Three-floor layout includes a third-floor covered deck — perfect for rain or snow storms. Fully equipped kitchen, beach access, shared seasonal pool, washer/dryer, and HDTV with streaming. Fenced yard for pets. Ten minutes to Jim Thorpe, near ski slopes and water parks.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/07bd588b-235c-453a-9b8c-49d028427465.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/a03d0e90-392a-48eb-95bd-6cd6a1ddc5b5.jpeg",
      "https://a0.muscache.com/im/pictures/8ad4c11a-6881-440f-9985-74f7eb0bb18e.jpg",
      "https://a0.muscache.com/im/pictures/ca610c5c-ca37-4810-8052-dfdbb2ce0460.jpg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/77bea69f-bfa5-4a85-b24f-f895602d9c4f.jpeg",
      "https://a0.muscache.com/im/pictures/11f07e6a-a6f1-480b-b7fc-52bc46918ef1.jpg",
      "https://a0.muscache.com/im/pictures/eb504f3a-a50a-4f84-b0d4-b6990860573b.jpg",
      "https://a0.muscache.com/im/pictures/a12be2df-3c8f-41ff-978a-fd17b330ad4a.jpg"
      ],
      photosByRoom: {
        "Living room": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/07bd588b-235c-453a-9b8c-49d028427465.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/4e4d5ead-1a4b-4a88-a757-d1881909cc2c.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/477e69e6-60fb-40e8-9db6-44e61113f6a0.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/69f1b58f-99d9-4c77-903f-bc217362e274.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/3df5149d-75eb-46c1-9f63-6464d5b4459b.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/fe04eb96-80c5-4db3-98bd-97a5a351b278.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/65a869b3-0dac-43f9-98d4-80a3ebe1c388.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/c9e1f15b-0df9-4434-b866-be818c41e71e.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/45953964-4f74-40db-8cbb-f9ae6d112237.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/f6c029b1-64bb-47b4-958a-5f0303161f26.jpeg"
        ],
        "Full kitchen": [
          "https://a0.muscache.com/im/pictures/8ad4c11a-6881-440f-9985-74f7eb0bb18e.jpg"
        ],
        "Dining area": [
          "https://a0.muscache.com/im/pictures/11f07e6a-a6f1-480b-b7fc-52bc46918ef1.jpg",
          "https://a0.muscache.com/im/pictures/eb504f3a-a50a-4f84-b0d4-b6990860573b.jpg"
        ],
        "Bedroom 1": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/29109f56-0930-4d26-8754-dc0c592401a8.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/8abc7083-c37c-49ce-8854-238247942813.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/c1addc4e-93ab-4f09-a2ad-7cc8462f8390.jpeg"
        ],
        "Bedroom 2": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/9d771ae3-14b1-4fd7-9db4-d83d384e351f.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/7e9f0de0-86ab-48c1-818b-16d0840d136f.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/d144df8c-2354-46fc-993e-c4e06e88dd3b.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/5704a3ec-a00e-42ad-a9f6-b7bd856b1d0d.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/8c41e7d3-1537-4b46-8a76-851b440a1ff3.jpeg"
        ],
        "Bedroom 3": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/2c1035a4-2792-41c7-904d-baf3253db50f.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/8e8b527a-8fdc-49d7-b087-006d97e1dc46.jpeg"
        ],
        "Full bathroom 1": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/286a5bc3-5508-4658-8821-7a5770378fba.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/d5593ac6-e9d6-4c45-9d98-04b9a32b70e2.jpeg"
        ],
        "Full bathroom 2": [
          "https://a0.muscache.com/im/pictures/a12be2df-3c8f-41ff-978a-fd17b330ad4a.jpg"
        ],
        "Deck": [
          "https://a0.muscache.com/im/pictures/398d59c3-943f-421d-b011-4448c7f90ba1.jpg",
          "https://a0.muscache.com/im/pictures/d67d5dde-5e08-4c63-88fc-73241ca28084.jpg"
        ],
        "Exterior": [
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/2658c849-b7b4-4c0a-9e72-53b6b0ba5f58.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/7e6321a7-5015-467b-a170-93f39f8c356b.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/e5f3e5af-2465-42f1-9f48-5d2a586f6b78.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/e19cd242-2ca6-4273-8e86-ed83626c88b4.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/7d5df6bc-23bc-40de-ad95-1441a7279c8d.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/cf626c5a-820f-4d3a-9b2a-dbd60f3b08b5.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/77bea69f-bfa5-4a85-b24f-f895602d9c4f.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/8598947b-6490-439c-bb6d-5ccd9306cbee.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/fc0e0595-4908-4a80-b1fe-0a84bdeeab8b.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/f8f6286b-da5c-4fbc-8d08-ac121bdc282a.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/c0dd60c5-866a-4878-a11c-d1164a5b3b25.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/70dbdbbc-56ff-4ccd-b871-acd9314e47f3.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/ffb87c07-ec12-4bf4-89cb-c2800a462a1b.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/25dce80c-8c43-4bf3-8843-a041920d0728.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/a03d0e90-392a-48eb-95bd-6cd6a1ddc5b5.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/5f98eed3-b18b-453e-bcfd-a2e71b54de35.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1273155947919003993/original/eefce259-eea2-4bf8-8f01-991bfc99b8e3.jpeg",
          "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTI3MzE1NTk0NzkxOTAwMzk5Mw%3D%3D/original/efeef297-8ad2-440c-85b6-695712f87244.jpeg"
        ],
        "Additional photos": [
          "https://a0.muscache.com/im/pictures/ca610c5c-ca37-4810-8052-dfdbb2ce0460.jpg",
          "https://a0.muscache.com/im/pictures/fdaf81a6-68be-415f-ae47-b462ec7844aa.jpg",
          "https://a0.muscache.com/im/pictures/18267aa0-676d-4c15-840c-1f99690d494c.jpg",
          "https://a0.muscache.com/im/pictures/5579e26b-96bd-43f2-9f8a-1b433f3a8052.jpg",
          "https://a0.muscache.com/im/pictures/dd02276c-0403-466c-bba5-9839f816730c.jpg",
          "https://a0.muscache.com/im/pictures/eb457696-05a1-406a-91f7-5ee2768650f3.jpg",
          "https://a0.muscache.com/im/pictures/25e21f79-6c6f-4990-a1be-e432df97fc1c.jpg",
          "https://a0.muscache.com/im/pictures/4eb26406-beef-406d-8068-376a773606f0.jpg",
          "https://a0.muscache.com/im/pictures/9813426f-ff48-441c-9634-80349deffd13.jpg",
          "https://a0.muscache.com/im/pictures/12bddf3e-f308-4015-864e-df6468e99854.jpg",
          "https://a0.muscache.com/im/pictures/84252d04-d209-4bd5-a8d5-0ceced34b6a6.jpg",
          "https://a0.muscache.com/im/pictures/e04834dd-8121-4363-9376-ab7243ae9493.jpg",
          "https://a0.muscache.com/im/pictures/96afc4a5-9584-471d-a027-f63ca328954a.jpg",
          "https://a0.muscache.com/im/pictures/83c3534a-b1c1-4cbd-86fb-293bde5b0a88.jpg",
          "https://a0.muscache.com/im/pictures/a788d4db-32b4-453d-a6ed-0d29739fc415.jpg",
          "https://a0.muscache.com/im/pictures/67c9f27b-a6af-4a06-8e41-7f09667a6435.jpg",
          "https://a0.muscache.com/im/pictures/d2366e2d-ae05-400d-9754-4a80dbb841f8.jpg",
          "https://a0.muscache.com/im/pictures/f741284d-0753-449c-afda-c2fe46bcd2cc.jpg",
          "https://a0.muscache.com/im/pictures/85e53a65-e1d0-4117-8a2b-4d8a9a1a975e.jpg",
          "https://a0.muscache.com/im/pictures/4b7b33e7-33e1-4761-8aca-09d42ac515b2.jpg",
          "https://a0.muscache.com/im/pictures/e4a6b12d-e4d5-4815-86b4-37a7df13849e.jpg",
          "https://a0.muscache.com/im/pictures/e7914ac2-881b-42ae-a9da-8724e11b0879.jpg",
          "https://a0.muscache.com/im/pictures/a88e4602-e512-466c-93f3-369a50c9aa67.jpg",
          "https://a0.muscache.com/im/pictures/44052075-6ac0-4694-bdbb-48040e0105ed.jpg",
          "https://a0.muscache.com/im/pictures/511e82bb-1ed2-4869-9990-8fe92a29197e.jpg",
          "https://a0.muscache.com/im/pictures/406f5170-2745-4b47-ac35-c1207854c077.jpg",
          "https://a0.muscache.com/im/pictures/8f4f2b16-64f4-4864-8281-a40202ab2398.jpg"
        ]
      },
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
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/wylie/hero.jpg?v=2f86b72",
      color: "#ED7D31",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A charming cabin retreat in Albrightsville with a fully fenced yard, lake and beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Ideal for families and groups who want the outdoors close by — hiking, skiing, and water parks all nearby. Full kitchen, streaming HDTV, washer/dryer, and self check-in. Pets warmly welcome.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTY2MTI3Mjk%3D/original/845a0345-3dfa-47fd-9f24-f9d294cd7fe9.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-16612729/original/dce5bdf2-6508-4b80-8a5a-67a567d53793.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTY2MTI3Mjk%3D/original/372e13e0-8b0b-49b2-bb4b-ddba9dc3ce3e.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTY2MTI3Mjk%3D/original/ee785998-b1e9-4d33-97c3-40299789db43.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTY2MTI3Mjk%3D/original/8bd4af83-199a-48a9-adcb-b499b2b2d9f7.jpeg",
      "https://a0.muscache.com/im/pictures/da734186-1065-47bf-8a4e-11c3000c2ace.jpg",
      "https://a0.muscache.com/im/pictures/b7b0f065-9b17-4576-a42e-522b59de26f2.jpg",
      "https://a0.muscache.com/im/pictures/8cea2039-c136-4368-96fb-1d6d70260f06.jpg"
      ],
      photosByRoom: {
        "Living room": [],
        "Full kitchen": [],
        "Dining area": [],
        "Bedroom 1": [],
        "Bedroom 2": [],
        "Bedroom 3": [],
        "Full bathroom 1": [],
        "Full bathroom 2": [],
        "Backyard": [],
        "Exterior": [],
        "Game room": [],
        "Additional photos": []
      },
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
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/pound/hero.jpg?v=2f86b72",
      color: "#1B6B2A",
      maxGuests: 8,
      bedrooms: 3,
      bathrooms: 2,
      beds: 5,
      description: "A cozy cottage in Albrightsville with a fully fenced yard, beach access, and shared seasonal pool. Comfortably sleeps 8 across 3 bedrooms. Features a full kitchen, washer/dryer, streaming HDTV, and dedicated workspace. Self check-in via keypad. Pet friendly. Close to Jim Thorpe, ski slopes, and Pocono water parks.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Free washer & dryer"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/51762f3c-6bde-4c73-b99a-abc691e149ff.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/cc48e0bc-df12-4f52-b92a-a97c1bfbbf50.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/c0bbd523-cb37-438a-bed5-aadd7ab347c6.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/2e908238-3873-427f-91e0-b905f126d5da.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/982f3c97-cd98-4456-b4f6-ddeb2f43eca1.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/7af3fd1c-166c-4029-8f16-bb6eac92b503.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NDAyMjkzMjA=/original/2eb13cfe-e156-421b-8c26-a460d9c774d1.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-40229320/original/a77d26a7-28bc-4bc1-b784-4cbcf22d2035.jpeg"
      ],
      photosByRoom: {
        "Living room 1": [],
        "Living room 2": [],
        "Full kitchen": [],
        "Dining area": [],
        "Bedroom 1": [],
        "Bedroom 2": [],
        "Bedroom 3": [],
        "Full bathroom 1": [],
        "Full bathroom 2": [],
        "Backyard": [],
        "Exterior": [],
        "Additional photos": []
      },
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
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/maccauley/hero.jpg?v=2f86b72",
      color: "#A6261D",
      maxGuests: 12,
      bedrooms: 4,
      bathrooms: 2,
      beds: 7,
      description: "The ultimate Pocono group retreat — featuring an arcade, two dedicated game rooms, a theater room area, and TVs in every room. Fully fenced backyard with wire mesh fence for pets. Sleeps 12 across 4 bedrooms with 7 beds. Beach access, shared pool, full kitchen, washer/dryer. Near Jim Thorpe, ski resorts, and Pocono Speedway.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "Multiple game room spaces",
        "Game Room 1: Arcade cabinet (multi-game), pool table, ping pong",
        "Game Room 2: Foosball, air hockey, darts",
        "Theater room"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/b8d46698-c619-4b73-88d2-e1c2990983a0.png",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/110bfc08-4a13-4404-aa9c-ef7d219b7f04.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/c63bae85-7673-40f4-90be-e1fea0210382.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/d1f04608-c288-4502-bbd5-d34392cc4720.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/580e7958-b09b-45c1-aa0f-64ab1b62d16d.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/055ef451-04c4-4aa0-877f-24e1754515bb.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/0db00cfc-8abb-456e-8565-1a1beac142c4.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6Nzc2MjI3MDYxMjAwNzIzMzgy/original/c7e5d05a-904a-4c40-8fd1-4e4d200a5341.jpeg"
      ],
      photosByRoom: {
        "Living room": [],
        "Full kitchen": [],
        "Dining area": [],
        "Bedroom 1": [],
        "Bedroom 2": [],
        "Bedroom 3": [],
        "Bedroom 4": [],
        "Full bathroom 1": [],
        "Full bathroom 2": [],
        "Backyard": [],
        "Patio": [],
        "Exterior": [],
        "Movie theater": [],
        "Game room 1": [],
        "Game room 2": [],
        "Additional photos": []
      },
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
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/milton/hero.jpg?v=2f86b72",
      color: "#70AD47",
      maxGuests: 10,
      bedrooms: 3,
      bathrooms: 2,
      beds: 6,
      description: "A spacious Pocono retreat designed for families and groups. Features dedicated game rooms, a fully fenced backyard for kids and pets, beach access, and shared seasonal pool. Sleeps 10 across 3 bedrooms. Full kitchen, streaming HDTV, washer, and dedicated workspace. Self check-in via keypad. Near Jim Thorpe, ski slopes, and Pocono water parks.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "HDTV with Netflix, Hulu, Amazon Prime, Disney+",
        "Multiple game room spaces",
        "Basement Game Room: Pool table, arcade machine, ping pong, air hockey, shuffleboard, darts, Connect 4 wall game, bean bag toss",
        "Loft Game Room: Basketball shooter, foosball"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ=/original/cc069248-7b2b-4b56-8a58-4aa52f927d13.png",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ%3D/original/283af09a-20d9-46eb-9226-11781eeb036f.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ%3D/original/4f58b947-fec6-4ee0-9c2b-bd0f8ba605f5.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ%3D/original/8bd98efe-faa2-4eb2-afe1-c69e03247100.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ%3D/original/cdc8caf3-5045-46a5-975d-456ca2bcaeb9.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTU5NzM1MzQ%3D/original/a4c2ca0d-6510-4ca8-910c-60e94b3182a5.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-15973534/original/c58f23ab-3cf7-4d1d-9f29-167dc3a9772f.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-15973534/original/53b86447-4060-4b41-b9d7-3a51dd0df7e3.jpeg"
      ],
      photosByRoom: {
        "Living room": [],
        "Full kitchen": [],
        "Dining area": [],
        "Bedroom 1": [],
        "Bedroom 2": [],
        "Bedroom 3": [],
        "Full bathroom 1": [],
        "Full bathroom 2": [],
        "Laundry area": [],
        "Exterior": [],
        "Game room 1": [],
        "Game room 2": [],
        "Additional photos": []
      },
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
      heroPhoto: "https://a799608.github.io/mvp-guest-guides/petrarch/hero.jpg?v=2f86b72",
      color: "#6D4C1F",
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 1,
      beds: 4,
      description: "A stylish mountain modern retreat ideal for couples or small groups. Features a fully fenced yard for pets, beach and lake access, and shared seasonal pool. Sleeps 6 in 3 bedrooms with 4 beds. Full kitchen, streaming TV, washer/dryer, and dedicated workspace. Near Jim Thorpe, ski slopes, and Pocono water parks. Easy self check-in.",
      included: [
        "Beach access",
        "Lake access",
        "Outdoor seasonal community pool",
        "Wifi",
        "Pets allowed",
        "TV with streaming",
        "Washer & dryer"
      ],
      photos: [
      "https://a0.muscache.com/im/pictures/miso/Hosting-1100977895146044046/original/3c3c9626-fde7-4a85-b7ff-d2adf66c76cb.jpeg",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1100977895146044046/original/ab88c8ea-03e1-45a9-807c-9cd833c395fa.jpeg",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1100977895146044046/original/3d638bc5-6952-48a0-b675-42e381a49cc8.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEwMDk3Nzg5NTE0NjA0NDA0Ng%3D%3D/original/e490f194-392b-4428-9f97-49d9e30709f2.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEwMDk3Nzg5NTE0NjA0NDA0Ng%3D%3D/original/ab3dcf03-bf18-4ff9-bf9f-f74bd87811c0.jpeg",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1100977895146044046/original/d48dff5a-2870-477e-b358-e022486a48b3.jpeg",
      "https://a0.muscache.com/im/pictures/miso/Hosting-1100977895146044046/original/339530c6-5705-4ea9-a70a-c64b32bd8d65.jpeg",
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEwMDk3Nzg5NTE0NjA0NDA0Ng%3D%3D/original/39348a39-400e-4a29-8890-582450dcfc13.jpeg"
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
