export const site = {
  name: "TriCounty Mobile Tyres 24/7",
  shortName: "TriCounty",
  legalName: "TriCounty Tyres Ltd",
  tagline: "Emergency mobile tyre fitting and repair specialists serving the Northamptonshire region. Registered and fully insured for all vehicle types.",
  logoMarkTitle: "TriCounty",
};

export const nav = {
  callLabel: "Call",
  menuOpenLabel: "Open menu",
  menuCloseLabel: "Close menu",
  brandAria: "TriCounty Mobile Tyres home",
  overlayAria: "Full screen navigation menu",
  links: [
    { id: "hero", label: "Contact" },
    { id: "services", label: "Services" },
    { id: "how-it-works", label: "How it works" },
    { id: "gallery", label: "Gallery" },
    { id: "reviews", label: "Reviews" },
    { id: "coverage", label: "Coverage" },
  ],
};

export const mobileNavOverlay = {
  sectionLabel: "Menu navigation",
  emergencyLine: "Emergency line active 24/7",
  technicianDirect: "Technician direct",
  averageResponseLabel: "Average response",
  averageResponseValue: "Under 30 mins",
  whatsappCta: "WhatsApp",
  serviceAreas: ["Northampton", "Milton Keynes", "Bedford"],
  items: [
    { scrollTo: "hero", index: "01", label: "Get in touch", icon: "clock" },
    { scrollTo: "services", index: "02", label: "Our services", icon: "wrench" },
    { scrollTo: "how-it-works", index: "03", label: "How it works", icon: "help" },
    { scrollTo: "gallery", index: "04", label: "Gallery", icon: "images" },
    { scrollTo: "reviews", index: "05", label: "Trust reviews", icon: "star" },
    { scrollTo: "coverage", index: "06", label: "Coverage area", icon: "map" },
  ],
};

export const hero = {
  /** Full-bleed hero background in /public. */
  landingImage: "/gallery/Landing%20page%20img.png",
  /** 0–1: smaller shows more of the illustration and more page colour at edges. */
  landingImageScale: 0.88,
  statusLeft: "24/7 EMERGENCY TYRE FITTING",
  title: "Stuck with a flat?",
  description: "Northampton's fastest mobile tyre fitting service. We come to you 24/7.",
  primaryCtaLeft: "Call now",
  primaryCtaRight: "07852 310107",
  whatsappCta: "WhatsApp",
  checkCoverageCta: "Check coverage",
};

export const contact = {
  phoneDisplay: "07852 310107",
  phoneDisplayNational: "07852 310107",
  phoneTel: "+447852310107",
  whatsappUrl: "https://wa.me/447852310107",
  officeLabel: "Head office",
  addressLines: ["TriCounty Tyres Ltd, St James", "Northampton", "NN5 5BB"],
};

/** Full-width scrolling banner (replaces former postcode checker block). */
export const coverageMarquee = {
  regionAria: "TriCounty mobile tyre service highlights",
  separator: "✦",
  items: [
    "24/7 emergency mobile tyre fitting",
    "Northampton & TriCounty — we come to you",
    "Roadside & driveway · Fully insured",
    "50-mile radius · Fast response",
    "07852 310107 — call any time",
  ],
};

export const trustBar = {
  items: [
    { key: "rac", label: "RAC accredited" },
    { key: "hours", label: "24/7 availability" },
    { key: "radius", label: "50-mile radius" },
  ],
};

export const servicesSection = {
  title: "Our services",
  viewAllLabel: "View all services",
  viewAllSuffix: "\u2192",
  viewAllHref: "#services",
  items: [
    {
      key: "emergency",
      title: "Emergency fit",
      description: "Rapid 30–60 min roadside response.",
      icon: "wrench",
    },
    {
      key: "puncture",
      title: "Puncture fix",
      description: "Professional repair on the spot.",
      icon: "zap",
    },
    {
      key: "locking",
      title: "Locking nut",
      description: "Damage-free removal experts.",
      icon: "shield",
    },
    {
      key: "home",
      title: "Home/work",
      description: "Tyre fitting at your convenience.",
      icon: "map",
    },
  ],
};

export const gallerySection = {
  title: "Gallery",
  slideLabel: "Image {current} of {total}",
  prevAria: "Previous image",
  nextAria: "Next image",
  /** Text search sent to Google Places (New); biased near the Maps listing coordinates. */
  googlePlaceTextQuery: "TriCounty Mobile Tyres 24/7 Northampton",
  googlePlaceLocationBias: {
    circle: {
      center: { latitude: 52.279894, longitude: -0.4063455 },
      radius: 20000,
    },
  },
  googlePhotosMax: 8,
  /** Google Maps listing (contributor photos shown in the app when API key is set). */
  googleMapsListingUrl: "https://maps.app.goo.gl/Yiryrxx7zocNsKk99",
  mapsCtaLabel: "View on Google Maps",
  mapsCtaAria: "Open TriCounty Mobile Tyres on Google Maps",
  items: [
    {
      key: "g1",
      src: "/gallerydiv/denny-muller-FXrcBTOy8Fw-unsplash.jpg",
      alt: "Close-up of a vehicle tyre and wheel",
    },
    {
      key: "g2",
      src: "/gallerydiv/enis-yavuz-CsYaNzll_rA-unsplash.jpg",
      alt: "Tyre and workshop tools",
    },
    {
      key: "g3",
      src: "/gallerydiv/kiefer-likens-amVdOUo7seo-unsplash.jpg",
      alt: "Vehicle wheel and tyre detail",
    },
    {
      key: "g4",
      src: "/gallerydiv/shalom-ejiofor-mPFAI2L7Lo4-unsplash.jpg",
      alt: "Mobile tyre service scene",
    },
    {
      key: "g5",
      src: "/gallerydiv/dylan-mcleod-dnhXS4lmwfc-unsplash.jpg",
      alt: "Tyre and vehicle detail",
    },
  ],
};

export const howItWorksSection = {
  title: "How it works",
  steps: [
    {
      key: "step-1",
      title: "Call or WhatsApp",
      description: "Speak directly to a technician in Northampton.",
    },
    {
      key: "step-2",
      title: "Get a fixed quote",
      description: "Transparent pricing based on your tyre size.",
    },
    {
      key: "step-3",
      title: "Help arrives",
      description: "Most call-outs attended within 60–90 minutes.",
    },
  ],
};

export const reviewsSection = {
  title: "Reviews",
  ratingValue: "4.9",
  ratingSuffix: "/5",
  items: [
    {
      key: "r1",
      quote:
        "\u201cAbsolute lifesaver! Stuck on the A45 at 2am. A technician arrived in 40 minutes.\u201d",
      name: "James Thompson",
      initials: "JT",
      avatarHue: 38,
      relativeTime: "2 days ago",
      rating: 5,
    },
    {
      key: "r2",
      quote:
        "\u201cCalled at midnight with a shredded tyre \u2014 calm, quick, and fairly priced. Exactly what you need in a panic.\u201d",
      name: "Sarah Jenkins",
      initials: "SJ",
      avatarHue: 280,
      relativeTime: "1 week ago",
      rating: 5,
    },
    {
      key: "r3",
      quote:
        "\u201cThey fitted two tyres on my drive while I worked from home. Spotless job and great communication.\u201d",
      name: "James Patel",
      initials: "JP",
      avatarHue: 165,
      relativeTime: "3 weeks ago",
      rating: 5,
    },
  ],
};

export const trustBadges = {
  items: [
    { key: "reviews", label: "Google reviews" },
    { key: "trade", label: "Trade accredited" },
    { key: "insured", label: "Fully insured" },
  ],
};

export const coverageSection = {
  title: "More areas we cover",
  subtitle: "Same-day mobile service across the wider TriCounty corridor.",
  towns: ["Rugby", "Hinckley", "Corby", "Brackley"],
};

export const emergencySection = {
  title: "Urgent help?",
  subtitle: "Fast response technician standing by",
  buttonLabel: "Tap to call now",
  iconAria: "Emergency call",
};

export const footerSection = {
  quickLinksTitle: "Quick links",
  contactTitle: "Contact",
  links: [
    { key: "gallery", label: "Gallery", href: "#gallery" },
    { key: "services", label: "Services", href: "#services" },
    { key: "coverage", label: "Coverage", href: "#coverage" },
    { key: "privacy", label: "Privacy", href: "#privacy" },
  ],
  copyright: "© 2026 TriCounty Mobile Tyres 24/7",
  socials: [
    { key: "fb", label: "Facebook", href: "https://www.facebook.com" },
    { key: "ig", label: "Instagram", href: "https://www.instagram.com" },
    { key: "tw", label: "X", href: "https://www.twitter.com" },
  ],
};

export const stickyBar = {
  tapLine1: "Emergency? Tap to call",
  tapLine2: "07852 310107",
};

export const stats = {
  ratingCountTarget: 49,
  ratingScale: 10,
};

export const a11y = {
  heroLightning: "Decorative lightning graphic",
  reviewVerified: "Verified customer review",
  starRating: "Star rating",
  carousel: "Customer reviews carousel",
  chevronLink: "Navigate to section",
  socialProfile: "Open social profile in a new tab",
  whatsAppChat: "Open WhatsApp chat in a new tab",
  checkCoverageScroll: "Scroll to service highlights banner",
  coveragePriorityCall: "Call to lock in a priority arrival slot",
};
