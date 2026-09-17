/**
 * Khan's Saloon & Royal Bridal Couture - Data Source
 */

const SALOON_DATA = {
  // 1. SALON SERVICES (Matching Image 1, 2 & 3 with bespoke photography)
  services: [
    {
      category: "Makeup Services",
      shortTitle: "Makeup",
      tagline: "Enhance your natural beauty with our professional makeup services",
      subtitle: "Bridal Look Rs. 25,000 | Party Makeup Rs. 8,000 | No-Makeup Look Rs. 5,000",
      items: [
        {
          id: "srv-bridal-makeup",
          title: "Bridal Look",
          price: 25000,
          priceText: "Rs. 25,000",
          desc: "Complete signature high-definition bridal makeover including 24K gold skin prep, mink 3D lashes, bridal contouring, hairstyle, jewelry setting & dupatta draping.",
          image: "assets/images/service_bridal_makeup.jpg",
          tag: "Signature Bridal"
        },
        {
          id: "srv-party-makeup",
          title: "Party Makeup",
          price: 8000,
          priceText: "Rs. 8,000",
          desc: "Flawless evening glam with airbrushed soft glow, custom eye art, false eyelashes and luxury blowdry or curls.",
          image: "assets/images/service_party_makeup.jpg",
          tag: "Trending Glam"
        },
        {
          id: "srv-nomakeup-look",
          title: "No-Makeup Look",
          price: 5000,
          priceText: "Rs. 5,000",
          desc: "Ultra-hydrating dewy skin finish, feathered brows, tinted lip hydration and natural glowing highlights.",
          image: "assets/images/service_nomakeup_look.jpg",
          tag: "Dewy Natural"
        }
      ]
    },
    {
      category: "Hair Services",
      shortTitle: "Hair Services",
      tagline: "Transform your hair with luxury Italian coloring, balayage, and precision styling",
      subtitle: "Hair Color/Streaks Rs. 6,000+ | Highlights/Balayage Rs. 8,500+ | Haircuts starting Rs. 1,000",
      items: [
        {
          id: "srv-hair-streaks",
          title: "Hair Color & Streaks",
          price: 6000,
          priceText: "Rs. 6,000+",
          desc: "Vibrant global tone or customized fashion streaks with ammonia-free Italian nourishing pigments and gloss seal.",
          image: "assets/images/service_hair_streaks.jpg",
          tag: "Fashion Colors"
        },
        {
          id: "srv-hair-balayage",
          title: "Highlights & Balayage",
          price: 8500,
          priceText: "Rs. 8,500+",
          desc: "Seamless hand-painted French balayage, honey caramel tones, and dimensional face-framing babylights.",
          image: "assets/images/service_hair_balayage.jpg",
          tag: "Bestseller"
        },
        {
          id: "srv-hair-cuts",
          title: "Designer Haircuts (Layer/Bob)",
          price: 1000,
          priceText: "Starting Rs. 1,000",
          desc: "Personalized face-contouring haircut, curtain bangs, volume feather layers, or chic blunt bob with blowdry.",
          image: "assets/images/service_hair_cut.jpg",
          tag: "Precision Styling"
        }
      ]
    },
    {
      category: "Nail Care & Facials",
      shortTitle: "Nail Care & Facials",
      tagline: "Indulge in clinical vortex hydra facials, 24K gold masks, and deluxe spa manicures",
      subtitle: "Manicure/Pedicure Rs. 1,500/2,000 | Hydra Facial Rs. 4,500",
      items: [
        {
          id: "srv-mani-pedi",
          title: "Deluxe Manicure & Pedicure",
          price: 2000,
          priceText: "Rs. 1,500 / 2,000",
          desc: "Rose petal milk soak, exfoliating salt scrub, cuticle therapy, paraffin wax dip, massage and high-gloss polish.",
          image: "assets/images/service_manicure_pedicure.jpg",
          tag: "Relaxing Spa"
        },
        {
          id: "srv-hydra-facial",
          title: "Advanced Hydra Facial",
          price: 4500,
          priceText: "Rs. 4,500",
          desc: "6-step clinical vortex suction pore cleanse, hyaluronic acid infusion, ultrasonic skin lifting and cold hammer glow therapy.",
          image: "assets/images/service_hydra_facial.jpg",
          tag: "Deep Glow"
        },
        {
          id: "srv-bridal-glow-facial",
          title: "24K Gold Bridal Facial",
          price: 6500,
          priceText: "Rs. 6,500",
          desc: "Pure 24-karat gold leaf mask with botanical peptides to deeply illuminate and prep bridal skin for wedding days.",
          image: "assets/images/service_gold_facial.jpg",
          tag: "Bridal Special"
        }
      ]
    },
    {
      category: "Mehndi Designs",
      shortTitle: "Mehndi Designs",
      tagline: "Celebrate your big day with rich organic henna art, intricate Mughal motifs and Arabic floral bels",
      subtitle: "Bridal Mehndi Rs. 10,000 | Simple Mehndi Rs. 1,000 | Arabic Mehndi Rs. 2,500",
      items: [
        {
          id: "srv-bridal-mehndi",
          title: "Royal Bridal Mehndi",
          price: 10000,
          priceText: "Rs. 10,000",
          desc: "Intricate traditional Mughal motifs, figures, peacocks, barat procession artwork covering both hands to elbows and feet.",
          image: "assets/images/service_bridal_mehndi.jpg",
          tag: "Bridal Masterpiece"
        },
        {
          id: "srv-simple-mehndi",
          title: "Simple Mandala Mehndi",
          price: 1000,
          priceText: "Rs. 1,000",
          desc: "Elegant central circular mandala with finger lattice, delicate floral cuffs, and deep organic brown stain.",
          image: "assets/images/service_simple_mehndi.jpg",
          tag: "Minimal Chic"
        },
        {
          id: "srv-arabic-mehndi",
          title: "Arabic Floral Mehndi",
          price: 2500,
          priceText: "Rs. 2,500",
          desc: "Bold Arabic floral bels with negative space shading, contemporary wrist cuffs and trailing motifs.",
          image: "assets/images/service_arabic_mehndi.jpg",
          tag: "Modern Festive"
        }
      ]
    }
  ],

  // 2. PAKISTANI BRIDAL GALLERY (User's real brides + bridal showcase)
  brides: [
    {
      id: "bride-mint-walima",
      name: "The Royal Pastel Walima Bride",
      ceremony: "Walima / Reception",
      category: "walima",
      image: "assets/images/bride_mint_green.png",
      makeupArtist: "Khan's Master Stylist Team",
      lookSummary: "Soft dewy bridal glow with rose quartz undertones, smokey winged liner, and sculpted cheekbones.",
      dressDetails: "Mint sage & champagne handcrafted bridal gown adorned with silver kora dabka and Swarovski crystals.",
      jewelryDetails: "22K gold-plated Kundan choker with mint green enamel drops, matching matha patti, oversized jhumkas and bridal cocktail ring."
    },
    {
      id: "bride-ivory-nikkah",
      name: "The Noor-e-Nikkah Bride",
      ceremony: "Nikkah / Barat",
      category: "nikkah",
      image: "assets/images/bride_ivory_gold.png",
      makeupArtist: "Khan's Saloon Signature",
      lookSummary: "Timeless classic bridal elegance, luminous champagne eyelids, natural petal pink lips and defined brows.",
      dressDetails: "Ivory and antique gold handcrafted pure silk peshwas with intricate badla and tilla threadwork.",
      jewelryDetails: "Basra pearl multi-strand choker, Mughal polki tikka, handcrafted pearls jhumkis and delicate bridal potli."
    },
    {
      id: "bride-crimson-barat",
      name: "The Grand Barat Shehnai Bride",
      ceremony: "Barat Ceremony",
      category: "barat",
      image: "assets/images/barat_bride_crimson.jpg",
      makeupArtist: "Senior Bridal Specialist",
      lookSummary: "Regal bridal glam featuring velvet smokey eyes, fluttery 3D lashes, matte deep nude rose lip, and porcelain base.",
      dressDetails: "Handcrafted royal deep crimson maroon micro velvet lehenga with authentic gold zardozi and scalloped dupatta.",
      jewelryDetails: "Mughal Kundan & Polki guluband necklace set, traditional oversized round nath with pearl string, and double-sided matha patti."
    },
    {
      id: "bride-lilac-walima",
      name: "The Ethereal Lilac Princess",
      ceremony: "Walima Reception",
      category: "walima",
      image: "assets/images/walima_bride_lilac.jpg",
      makeupArtist: "Khan's Celebrity Lounge",
      lookSummary: "Ultra-modern soft glam, glassy skin glow, soft mauve shimmer lid, and hydrated nude gloss.",
      dressDetails: "Dusty lilac silver sequined peplum gown with sweeping trail and cutwork scalloped borders.",
      jewelryDetails: "Diamond-cut Basra pearl statement choker, matching crystal drops and floral pearl maang tikka."
    },
    {
      id: "bride-festive-mehndi",
      name: "The Vibrant Mayun & Mehndi Bride",
      ceremony: "Mehndi & Mayun",
      category: "mehndi",
      image: "assets/images/couture_banarasi_sharara.jpg",
      makeupArtist: "Khan's Festive Studio",
      lookSummary: "Fresh dewy sun-kissed makeover, golden bronze lid wash, bright peach cheeks and stained lips.",
      dressDetails: "Pure Banarasi handloom raw silk mustard peplum with tangerine flared sharara and gold gotta patti embroidery.",
      jewelryDetails: "Handcrafted yellow meenakari choker, pearl tassel karas, and custom floral accents."
    }
  ],

  // 3. HANDCRAFTED BRIDAL COUTURE COLLECTIONS (CRAFT SPECIALIZATIONS)
  dresses: [
    {
      id: "dress-zardozi-crimson",
      title: "'Shahzadi-e-Haram' Royal Zardozi & Velvet Bridal Lehenga",
      designer: "Khan's Signature Atelier",
      specialization: "Pure Zardozi & Antique Gold Dabka Handcraft",
      designerSlug: "zardozi-dabka",
      price: 185000,
      priceFormatted: "Rs. 185,000",
      category: "zardozi-dabka",
      image: "assets/images/couture_zardozi_crimson.jpg",
      fabric: "Pure Micro Velvet & Katan Silk",
      work: "Heavy Antique Gold Dabka, Kora, Resham & Swarovski Crystals",
      includes: "Flared Velvet Lehenga (16 Kalis), Embellished Choli, Scalloped Velvet Dupatta & Matching Bridal Pouch",
      delivery: "4 - 6 Weeks (Custom Stitched to Measurements)"
    },
    {
      id: "dress-tilla-emerald",
      title: "'Zeb-un-Nisa' Royal Mughal Tilla & Emerald Heritage Train Gown",
      designer: "Khan's Royal Bridal Studio",
      specialization: "Royal Mughal Tilla & Cutdana Filigree Embroidery",
      designerSlug: "tilla-filigree",
      price: 210000,
      priceFormatted: "Rs. 210,000",
      category: "tilla-filigree",
      image: "assets/images/couture_tilla_emerald.jpg",
      fabric: "Royal Emerald Velvet with Pure Net Overlay",
      work: "Royal Mughal Tilla, Handcrafted Zardozi & Cutdana Filigree",
      includes: "Floor-sweeping Bridal Train Gown, Inner Silk Jamawar Lehnga, Dupatta with Heavy 4-sided Border & Potli",
      delivery: "5 - 7 Weeks (Custom Stitched to Measurements)"
    },
    {
      id: "dress-resham-peshwas",
      title: "'Noor-e-Khaas' Champagne Silk Kalidaar Peshwas",
      designer: "Khan's Couture Atelier",
      specialization: "Delicate French Knot Resham, Badla & Basra Pearl Work",
      designerSlug: "resham-peshwas",
      price: 165000,
      priceFormatted: "Rs. 165,000",
      category: "resham-peshwas",
      image: "assets/images/couture_resham_peshwas.jpg",
      fabric: "Pure Raw Silk & Shimmer Tissue Organza",
      work: "Delicate Badla, French Knot Resham, Pearl Sequins & Gotta Work",
      includes: "Flared Kalidaar Peshwas, Banarasi Silk Sharara Pants, Hand-embroidered Organza Dupatta",
      delivery: "3 - 5 Weeks (Custom Stitched to Measurements)"
    },
    {
      id: "dress-banarasi-sharara",
      title: "'Gul-o-Gulzar' Pure Banarasi Katan Silk Sharara",
      designer: "Khan's Festive Studio",
      specialization: "Traditional Pure Banarasi Handloom & Gotta Patti Heritage",
      designerSlug: "banarasi-handloom",
      price: 135000,
      priceFormatted: "Rs. 135,000",
      category: "banarasi-handloom",
      image: "assets/images/couture_banarasi_sharara.jpg",
      fabric: "Pure Banarasi Katan Silk & Brocade",
      work: "Authentic Gold Gotta Patti, Kiran Lace, Mirrors & Floral Resham",
      includes: "Embroidered Peplum Kurti, Heavy 2-tier Gathered Sharara, Banarasi Chunri Dupatta",
      delivery: "3 - 4 Weeks (Custom Stitched to Measurements)"
    }
  ],

  // 4. ROYAL BRIDAL JEWELRY BOUTIQUE (FOR SALE)
  jewelry: [
    {
      id: "jwl-nizam-kundan-set",
      title: "Royal Nizam Mint Kundan Bridal Set",
      category: "bridal-sets",
      price: 38500,
      priceFormatted: "Rs. 38,500",
      rating: 5.0,
      reviewsCount: 28,
      image: "assets/images/jewelry_kundan_set.jpg",
      badge: "Pure Kundan",
      desc: "Complete 5-piece royal bridal jewelry set featuring 22K gold plating, mint green meenakari enameling, uncut kundan stones, and matching rani haar, choker, oversized jhumkas, matha patti, and nath.",
      inStock: true
    },
    {
      id: "jwl-polki-choker",
      title: "Noor-e-Chashm Polki & Basra Pearl Choker",
      category: "chokers",
      price: 42000,
      priceFormatted: "Rs. 42,000",
      rating: 4.9,
      reviewsCount: 34,
      image: "assets/images/jewelry_polki_necklace.jpg",
      badge: "Mughal Heritage",
      desc: "Exquisite hand-set Polki stones with lustrous green emerald droplets and rows of micro Basra seed pearls. Fully adjustable gold dori thread at back.",
      inStock: true
    },
    {
      id: "jwl-matha-patti",
      title: "Heritage Meenakari Crescent Matha Patti",
      category: "matha-patti",
      price: 14500,
      priceFormatted: "Rs. 14,500",
      rating: 5.0,
      reviewsCount: 19,
      image: "assets/images/jewelry_matha_patti.jpg",
      badge: "Handcrafted",
      desc: "Traditional Pakistani bridal forehead headpiece with layered pearl strands, central crescent moon kundan pendant, and emerald pearl fringe.",
      inStock: true
    },
    {
      id: "jwl-bridal-bangles",
      title: "22K Gold Kundan & Ruby Karas (Pair)",
      category: "bangles",
      price: 18000,
      priceFormatted: "Rs. 18,000",
      rating: 4.9,
      reviewsCount: 22,
      image: "assets/images/jewelry_bridal_bangles.jpg",
      badge: "Best Seller",
      desc: "Pair of heavy bridal cuffs featuring openable screw lock, studded with ruby red center stones, uncut kundan and delicate hanging pearl latkans.",
      inStock: true
    },
    {
      id: "jwl-royal-nath",
      title: "Rajputana Pearl & Ruby Bridal Nath",
      category: "nath",
      price: 6800,
      priceFormatted: "Rs. 6,800",
      rating: 5.0,
      reviewsCount: 16,
      image: "assets/images/jewelry_royal_nath.jpg",
      badge: "Traditional",
      desc: "Classic lightweight bridal nose ring with detachable 3-strand pearl chain, filigree gold work, and radiant ruby drop. Clip-on & pierced options available.",
      inStock: true
    }
  ],

  // 5. KHAN'S COSMETICS & PRODUCTS (Matching Image 2 exact list of 8 items)
  cosmetics: [
    {
      id: "prod-mascara",
      title: "Khan's Mascara",
      price: 850,
      priceFormatted: "Rs. 850",
      desc: "Waterproof extreme curl & volume formula with deep black carbon fibers.",
      icon: "assets/images/cosmetic_mascara.jpg"
    },
    {
      id: "prod-facepowder",
      title: "Khan's Facepowder",
      price: 900,
      priceFormatted: "Rs. 900",
      desc: "Micro-fine oil control compact powder with velvety matte finish.",
      icon: "assets/images/cosmetic_facepowder.jpg"
    },
    {
      id: "prod-flawless-base-1",
      title: "Khan's Flawless Base",
      price: 1200,
      priceFormatted: "Rs. 1,200",
      desc: "Long-wear 24H full coverage foundation designed for Pakistani skin tones.",
      icon: "assets/images/cosmetic_foundation.jpg"
    },
    {
      id: "prod-matte-lipstick-1",
      title: "Khan's Matte Lipstick",
      price: 600,
      priceFormatted: "Rs. 600",
      desc: "Non-drying velvet matte liquid lipstick in signature bridal nude & rose shades.",
      icon: "assets/images/cosmetic_lipstick.jpg"
    },
    {
      id: "prod-flawless-base-2",
      title: "Khan's Flawless Base (Radiant Honey)",
      price: 1200,
      priceFormatted: "Rs. 1,200",
      desc: "Weightless buildable luminous finish foundation with SPF 30 protection.",
      icon: "assets/images/cosmetic_facepowder.jpg"
    },
    {
      id: "prod-matte-lipstick-2",
      title: "Khan's Matte Lipstick (Velvet Berry)",
      price: 600,
      priceFormatted: "Rs. 600",
      desc: "Creamy pigmented matte formula enriched with Vitamin E and shea butter.",
      icon: "assets/images/cosmetic_lipstick.jpg"
    },
    {
      id: "prod-nail-paints",
      title: "Khan's Nail Paints",
      price: 300,
      priceFormatted: "Rs. 300",
      desc: "High-shine, chip-resistant salon grade nail lacquer in 36 bridal hues.",
      icon: "assets/images/cosmetic_nailpaints.jpg"
    },
    {
      id: "prod-premium-wigs",
      title: "Premium Wigs",
      price: 7500,
      priceFormatted: "Rs. 7,500",
      desc: "100% natural human hair seamless clip-in volumizers and lace front wigs.",
      icon: "assets/images/cosmetic_wigs.jpg"
    }
  ],

  // 6. REAL BRIDAL TESTIMONIALS & REVIEWS
  reviews: [
    {
      id: "rev-1",
      name: "Zainab Tariq",
      city: "Karachi (DHA)",
      ceremony: "Walima Ceremony",
      rating: 5,
      date: "Wedding Season 2026",
      image: "assets/images/bride_mint_green.png",
      review: "Booking Khan's Saloon for my Walima was the best decision of my wedding! The mint pastel makeover was so radiant, lightweight and lasted past 3 AM without a single touch-up. Everyone complimented the jewelry setting and hair styling.",
      tag: "Walima Bride"
    },
    {
      id: "rev-2",
      name: "Mahnoor Bilal",
      city: "Lahore (Gulberg)",
      ceremony: "Grand Barat",
      rating: 5,
      date: "Wedding Season 2026",
      image: "assets/images/barat_bride_crimson.jpg",
      review: "I wore the royal zardozi crimson velvet lehenga with the Royal Nizam Kundan set from Khan's boutique. The craftsmanship, the fitting, and the signature smoky bridal eye makeup turned me into a royal Mughal bride. 10/10 recommend!",
      tag: "Royal Zardozi Bride"
    },
    {
      id: "rev-3",
      name: "Fatima Al-Hassan",
      city: "Dubai, UAE",
      ceremony: "Nikkah & Reception",
      rating: 5,
      date: "Overseas Bride",
      image: "assets/images/bride_ivory_gold.png",
      review: "Being in Dubai, I ordered the Champagne Silk Kalidaar Peshwas and Basra pearl choker set online. Khan's bridal concierge coordinated my measurements over WhatsApp video call and shipped directly to UAE. It fit like a glove!",
      tag: "International Client"
    },
    {
      id: "rev-4",
      name: "Hira Usman",
      city: "Islamabad (F-7)",
      ceremony: "Mehndi & Sangeet",
      rating: 5,
      date: "Wedding Season 2026",
      image: "assets/images/couture_banarasi_sharara.jpg",
      review: "The royal bridal mehndi artists spent 4 hours crafting intricate Mughal motifs on my hands and feet. The organic stain came out deep mahogany brown! Plus the hydra facial one week prior gave me an incredible natural glow.",
      tag: "Mehndi & Skin Prep"
    }
  ],

  // 7. FREQUENTLY ASKED QUESTIONS
  faqs: [
    {
      question: "How far in advance should I book my bridal appointment?",
      answer: "We recommend reserving your bridal makeup slot at least 4 to 8 weeks in advance for peak wedding season (October through March). Dates are secured upon payment of a 30% advance deposit."
    },
    {
      question: "How long does custom stitching take for your bridal couture collections?",
      answer: "Made-to-measure bridal couture lehengas and peshwas typically take 4 to 6 weeks for hand embroidery (dabka, kora, zardozi) and personalized tailoring. Urgent rush orders (2 to 3 weeks) can be accommodated upon consultation."
    },
    {
      question: "Are your bridal jewelry pieces real gold or plated?",
      answer: "Our bridal jewelry boutique specializes in authentic 22-karat micro-gold electroplated pieces crafted over high-grade brass alloy with genuine uncut Kundan, Polki stones, and Basra pearls. All pieces carry anti-tarnish coating and our authenticity warranty."
    },
    {
      question: "Do you offer destination or venue bridal services?",
      answer: "Yes! Our Senior Master Bridal Stylist Team travels nationwide across Pakistan (Karachi, Lahore, Islamabad, Multan, Faisalabad) and internationally for destination weddings. Travel and lodging arrangements apply."
    },
    {
      question: "What are your delivery timelines and payment options for couture and jewelry?",
      answer: "We offer Cash on Delivery (COD) for jewelry and cosmetics across Pakistan within 2-4 business days. For custom bridal dresses, we accept direct bank transfers with 50% deposit and remaining upon dispatch with international DHL Express tracking."
    }
  ]
};

