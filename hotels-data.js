/**
 * AirAsia Local Sample Hotel Data
 * Fully offline, frontend-only demonstration dataset.
 * Contains 24+ realistic sample hotels with room categories, amenities, reviews, and static map badges.
 * No external APIs, databases, or backend services required.
 */

window.AIRASIA_HOTELS_DATA = [
  // Kuala Lumpur
  {
    id: "HT-001",
    name: "AirAsia Tune Hotel KLIA2",
    city: "Kuala Lumpur",
    country: "Malaysia",
    address: "Lot Pt 13, Jalan KLIA 2/2, 64000 KLIA, Selangor",
    locationBadge: "Direct Covered Walkway to KLIA Terminal 2",
    stars: 4,
    rating: 4.6,
    reviewsCount: 1420,
    pricePerNight: 5800,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Official Airport Partner",
    amenities: ["Free High-Speed WiFi", "24/7 Transit Shuttle", "Luggage Storage", "Air Conditioning", "Onsite Bistro"],
    description: "Ultra-convenient transit hotel seamlessly connected to KLIA Terminal 2 via a covered pedestrian bridge. Featuring 5-star standard beds and power showers.",
    rooms: [
      { id: "RM-01", name: "Double Room with Ensuite", bed: "1 Queen Bed", size: "18 sqm", guests: 2, pricePerNight: 5800 },
      { id: "RM-02", name: "Twin Transit Room", bed: "2 Single Beds", size: "18 sqm", guests: 2, pricePerNight: 6100 },
      { id: "RM-03", name: "Premium Family Quad", bed: "2 Queen Beds", size: "32 sqm", guests: 4, pricePerNight: 9800 }
    ]
  },
  {
    id: "HT-002",
    name: "EQ Kuala Lumpur & Sky Bar",
    city: "Kuala Lumpur",
    country: "Malaysia",
    address: "Equatorial Plaza, Jalan Sultan Ismail, 50250 KL",
    locationBadge: "Golden Triangle • 5 min to Petronas Twin Towers",
    stars: 5,
    rating: 4.9,
    reviewsCount: 2840,
    pricePerNight: 16500,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Luxury Traveler Choice",
    amenities: ["Infinity Sky Pool", "Spa & Wellness Sanctuary", "Free WiFi", "Breakfast Included", "Sky 51 Rooftop Bar"],
    description: "Award-winning 5-star architectural landmark offering breathtaking panoramic views of the Petronas Twin Towers and exceptional Malaysian hospitality.",
    rooms: [
      { id: "RM-04", name: "Deluxe King City View", bed: "1 Super King Bed", size: "40 sqm", guests: 2, pricePerNight: 16500 },
      { id: "RM-05", name: "Club Twin Twin-Towers View", bed: "2 Double Beds", size: "45 sqm", guests: 2, pricePerNight: 21500 },
      { id: "RM-06", name: "Executive Skyline Suite", bed: "1 King Bed + Living Area", size: "75 sqm", guests: 3, pricePerNight: 34000 }
    ]
  },
  {
    id: "HT-003",
    name: "The Chow Kit - An Ormond Hotel",
    city: "Kuala Lumpur",
    country: "Malaysia",
    address: "1012 Jalan Sultan Ismail, Chow Kit, 50100 KL",
    locationBadge: "Heritage Chow Kit • Walk to LRT Monorail",
    stars: 4,
    rating: 4.7,
    reviewsCount: 920,
    pricePerNight: 8200,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Design Hotel Award",
    amenities: ["Artisan Kitchen", "Free High-Speed WiFi", "Cocktail Bar", "Vintage Brass Decor", "Concierge"],
    description: "Boutique heritage luxury blending contemporary modern aesthetics with Malaysian craftsmanship in KL's most vibrant cultural precinct.",
    rooms: [
      { id: "RM-07", name: "The Den King", bed: "1 King Bed", size: "22 sqm", guests: 2, pricePerNight: 8200 },
      { id: "RM-08", name: "The Towkay Suite", bed: "1 King Bed", size: "38 sqm", guests: 2, pricePerNight: 13500 }
    ]
  },
  {
    id: "HT-004",
    name: "Aloft Kuala Lumpur Sentral",
    city: "Kuala Lumpur",
    country: "Malaysia",
    address: "No 5 Jalan Stesen Sentral, 50470 KL",
    locationBadge: "Direct Link to KL Sentral Transit Hub",
    stars: 4,
    rating: 4.5,
    reviewsCount: 1680,
    pricePerNight: 9400,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"],
    badge: "Transit Friendly",
    amenities: ["Rooftop Splash Pool", "Mai Bar", "Free WiFi", "Fitness Center", "Meeting Rooms"],
    description: "Sassy and tech-forward hotel right beside KL Sentral, offering a direct 28-minute non-stop train link to Kuala Lumpur International Airport.",
    rooms: [
      { id: "RM-09", name: "Breezy King Room", bed: "1 King Bed", size: "33 sqm", guests: 2, pricePerNight: 9400 },
      { id: "RM-10", name: "Sweet Suite", bed: "1 King Bed + Lounge", size: "65 sqm", guests: 3, pricePerNight: 17200 }
    ]
  },

  // Bangkok
  {
    id: "HT-005",
    name: "Amari Don Muang Airport Bangkok",
    city: "Bangkok",
    country: "Thailand",
    address: "333 Chert Wudthakas Road, Don Mueang, 10210 Bangkok",
    locationBadge: "Connected to Don Mueang Airport (DMK) Terminal 1",
    stars: 4,
    rating: 4.6,
    reviewsCount: 1890,
    pricePerNight: 6400,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
    ],
    badge: "Best DMK Transit Stays",
    amenities: ["Walkway to DMK Airport", "Outdoor Swimming Pool", "Free WiFi", "Authentic Thai Restaurant", "Fitness Hub"],
    description: "Direct bridge access to AirAsia's main Bangkok hub at Don Mueang Airport. Relax in style before your morning island-hopping flight.",
    rooms: [
      { id: "RM-11", name: "Deluxe King Transit", bed: "1 King Bed", size: "32 sqm", guests: 2, pricePerNight: 6400 },
      { id: "RM-12", name: "Grand Deluxe Pool View", bed: "1 King or 2 Twins", size: "38 sqm", guests: 2, pricePerNight: 8100 }
    ]
  },
  {
    id: "HT-006",
    name: "The Standard, Bangkok Mahanakhon",
    city: "Bangkok",
    country: "Thailand",
    address: "114 Narathiwas Rajanagarindra Rd, Silom, Bang Rak, 10500 Bangkok",
    locationBadge: "Inside King Power Mahanakhon Skyscraper",
    stars: 5,
    rating: 4.8,
    reviewsCount: 1350,
    pricePerNight: 19800,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"],
    badge: "Ultra-Chic Luxury",
    amenities: ["Sky Beach Rooftop Bar", "Terrace Pool", "Michelin-starred Mexican Dining", "24/7 Gym", "Designer Interiors"],
    description: "Thailand's flagship design hotel located inside the iconic pixelated Mahanakhon building. Bold, vibrant, and unforgettable.",
    rooms: [
      { id: "RM-13", name: "Standard Prince King", bed: "1 King Bed", size: "40 sqm", guests: 2, pricePerNight: 19800 },
      { id: "RM-14", name: "Corner King Skyline Suite", bed: "1 King Bed", size: "56 sqm", guests: 2, pricePerNight: 28500 }
    ]
  },
  {
    id: "HT-007",
    name: "Centara Grand at CentralWorld",
    city: "Bangkok",
    country: "Thailand",
    address: "999/99 Rama 1 Road, Pathumwan, 10330 Bangkok",
    locationBadge: "Direct Link to CentralWorld Shopping Mega-Mall",
    stars: 5,
    rating: 4.7,
    reviewsCount: 3100,
    pricePerNight: 14200,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80"],
    badge: "Shopper's Paradise",
    amenities: ["Red Sky Rooftop Restaurant", "Spa Cenvaree", "Tennis Courts", "Outdoor Pool", "Skywalk Access"],
    description: "Towering above Bangkok's premier retail and entertainment center with world-class facilities and panoramic city dining.",
    rooms: [
      { id: "RM-15", name: "Superior World Room", bed: "1 King or 2 Twins", size: "36 sqm", guests: 2, pricePerNight: 14200 },
      { id: "RM-16", name: "Club World King with Lounge", bed: "1 King Bed", size: "45 sqm", guests: 2, pricePerNight: 21000 }
    ]
  },

  // Singapore
  {
    id: "HT-008",
    name: "Crowne Plaza Changi Airport",
    city: "Singapore",
    country: "Singapore",
    address: "75 Airport Boulevard, Terminal 3, Changi, 819664 Singapore",
    locationBadge: "Ranked World's Best Airport Hotel • Terminal 3",
    stars: 5,
    rating: 4.9,
    reviewsCount: 4200,
    pricePerNight: 24500,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
    badge: "World's #1 Airport Hotel",
    amenities: ["Resort Style Garden Pool", "Direct Skytrain Access", "Soundproof Rooms", "Jewel Changi Walkway", "Club Lounge"],
    description: "Voted World's Best Airport Hotel for consecutive years. Step straight from your flight into tropical resort gardens and soundproof rooms.",
    rooms: [
      { id: "RM-17", name: "Jewel View Deluxe King", bed: "1 King Bed", size: "36 sqm", guests: 2, pricePerNight: 24500 },
      { id: "RM-18", name: "Premier Runway View Room", bed: "1 King Bed", size: "42 sqm", guests: 2, pricePerNight: 29000 }
    ]
  },
  {
    id: "HT-009",
    name: "Marina Bay Sands Singapore",
    city: "Singapore",
    country: "Singapore",
    address: "10 Bayfront Avenue, Marina Bay, 018956 Singapore",
    locationBadge: "World Famous Rooftop Infinity Pool",
    stars: 5,
    rating: 4.9,
    reviewsCount: 9800,
    pricePerNight: 48000,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"],
    badge: "Global Icon",
    amenities: ["World's Largest Infinity Pool", "SkyPark Observation Deck", "Celebrity Chef Restaurants", "Shoppes Mall", "Casino"],
    description: "An architectural marvel towering over Marina Bay with the world's most famous rooftop infinity pool and unmatched luxury.",
    rooms: [
      { id: "RM-19", name: "Deluxe King Gardens by the Bay View", bed: "1 King Bed", size: "39 sqm", guests: 2, pricePerNight: 48000 },
      { id: "RM-20", name: "Sands Premier King Marina Bay View", bed: "1 King Bed", size: "47 sqm", guests: 2, pricePerNight: 58500 }
    ]
  },
  {
    id: "HT-010",
    name: "YOTEL Singapore Orchard Road",
    city: "Singapore",
    country: "Singapore",
    address: "366 Orchard Road, 238904 Singapore",
    locationBadge: "Heart of Orchard Road • MRT Beside Hotel",
    stars: 4,
    rating: 4.5,
    reviewsCount: 2150,
    pricePerNight: 15400,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"],
    badge: "Smart Cabins",
    amenities: ["Robotic Service Staff", "Outdoor Pool", "Free Ultra-Fast WiFi", "Smart Adjustable Beds", "KOMYUNITI Lounge"],
    description: "First-class airline cabin inspired smart rooms located centrally on Singapore's premier retail boulevard.",
    rooms: [
      { id: "RM-21", name: "Premium Queen Cabin", bed: "1 Adjustable Queen Bed", size: "16 sqm", guests: 2, pricePerNight: 15400 },
      { id: "RM-22", name: "First Class King Suite", bed: "1 King Bed", size: "32 sqm", guests: 2, pricePerNight: 23000 }
    ]
  },

  // Bali
  {
    id: "HT-011",
    name: "Ayana Resort & Rock Bar Bali",
    city: "Bali",
    country: "Indonesia",
    address: "Jl. Karang Mas Sejahtera, Jimbaran, 80364 Bali",
    locationBadge: "Clifftop Jimbaran • Sunset Rock Bar Access",
    stars: 5,
    rating: 4.9,
    reviewsCount: 5200,
    pricePerNight: 28000,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"],
    badge: "Best Ocean Resort",
    amenities: ["12 Freshwater Swimming Pools", "World Famous Rock Bar", "Private Beach", "Thalassotherapy Spa", "Tennis Courts"],
    description: "Perched atop limestone cliffs above Jimbaran Bay with sunset views over the Indian Ocean and home to the world-renowned Rock Bar.",
    rooms: [
      { id: "RM-23", name: "Resort View King Room", bed: "1 King Bed", size: "48 sqm", guests: 2, pricePerNight: 28000 },
      { id: "RM-24", name: "Ocean Front King Suite", bed: "1 King Bed + Ocean Balcony", size: "65 sqm", guests: 2, pricePerNight: 39500 }
    ]
  },
  {
    id: "HT-012",
    name: "Padma Resort Ubud",
    city: "Bali",
    country: "Indonesia",
    address: "Banjar Carik, Desa Puhu, Payangan, Ubud, 80572 Bali",
    locationBadge: "Surrounded by Ubud Bamboo Forest & Valleys",
    stars: 5,
    rating: 4.8,
    reviewsCount: 2900,
    pricePerNight: 22500,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80"],
    badge: "Nature Sanctuary",
    amenities: ["Heated Infinity Pool Over Valley", "Agroforestry Garden", "Yoga Shala", "Afternoon Tea Included", "Free Shuttle to Ubud"],
    description: "Tucked inside the untouched northern valley of Payangan, overlooking bamboo forests with Bali's longest heated infinity pool.",
    rooms: [
      { id: "RM-25", name: "Premier Forest View Room", bed: "1 King or 2 Twins", size: "59 sqm", guests: 2, pricePerNight: 22500 },
      { id: "RM-26", name: "One Bedroom Forest Suite", bed: "1 King Bed + Living Room", size: "102 sqm", guests: 3, pricePerNight: 36000 }
    ]
  },
  {
    id: "HT-013",
    name: "Amnaya Resort Kuta",
    city: "Bali",
    country: "Indonesia",
    address: "Jl. Kartika Plaza, Gang Puspa Ayu No. 99, Kuta, 80361 Bali",
    locationBadge: "Walk to Kuta Beach • 10 min to DPS Airport",
    stars: 4,
    rating: 4.7,
    reviewsCount: 1850,
    pricePerNight: 7600,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    badge: "Top Value Stay",
    amenities: ["Lush Tropical Courtyard Pool", "Bhaveka Spa", "Sukun Restaurant", "Airport Transfer Assistance", "Free WiFi"],
    description: "Peaceful boutique retreat hidden in the center of Kuta, famous for heartfelt Balinese hospitality and gourmet dining.",
    rooms: [
      { id: "RM-27", name: "Deluxe King Balcony", bed: "1 King Bed", size: "45 sqm", guests: 2, pricePerNight: 7600 },
      { id: "RM-28", name: "Amnaya Suite with Bathtub", bed: "1 King Bed", size: "65 sqm", guests: 2, pricePerNight: 11200 }
    ]
  },

  // Phuket
  {
    id: "HT-014",
    name: "The Nai Harn Phuket",
    city: "Phuket",
    country: "Thailand",
    address: "23/3 Moo 1, Vises Road, Rawai, Muang, 83130 Phuket",
    locationBadge: "Direct Nai Harn Beach Overlook",
    stars: 5,
    rating: 4.8,
    reviewsCount: 1940,
    pricePerNight: 17500,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"],
    badge: "Leading Beach Resort",
    amenities: ["Private Sun Terrace with Daybed", "Sea View Infinity Pool", "Water Sports Gear", "Beach Butler Service", "Rooftop Lounge"],
    description: "Iconic clifftop sanctuary offering front-row vistas of pristine Nai Harn Bay and Andaman sunsets.",
    rooms: [
      { id: "RM-29", name: "Deluxe Ocean View", bed: "1 King Bed", size: "47 sqm", guests: 2, pricePerNight: 17500 },
      { id: "RM-30", name: "Grand Ocean View Suite", bed: "1 King Bed", size: "85 sqm", guests: 2, pricePerNight: 28000 }
    ]
  },
  {
    id: "HT-015",
    name: "Lub d Phuket Patong",
    city: "Phuket",
    country: "Thailand",
    address: "5/5 Sawatdirak Road, Patong, Kathu, 83150 Phuket",
    locationBadge: "2 min walk to Patong Beach & Night Market",
    stars: 3,
    rating: 4.6,
    reviewsCount: 2200,
    pricePerNight: 4600,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
    badge: "Social Traveler Choice",
    amenities: ["See-through Pool", "Muay Thai Boxing Ring", "Co-working Space", "Game Area", "Cocktail Bar"],
    description: "Fun, social and award-winning resort in Patong with transparent pool and vibrant community spaces.",
    rooms: [
      { id: "RM-31", name: "Deluxe Private King", bed: "1 King Bed", size: "25 sqm", guests: 2, pricePerNight: 4600 },
      { id: "RM-32", name: "Junior Suite with Pool View", bed: "1 King Bed", size: "38 sqm", guests: 2, pricePerNight: 6900 }
    ]
  },

  // Penang
  {
    id: "HT-016",
    name: "Eastern & Oriental Hotel Penang",
    city: "Penang",
    country: "Malaysia",
    address: "10 Farquhar Street, 10200 George Town, Penang",
    locationBadge: "Historic George Town • UNESCO Heritage Seafront",
    stars: 5,
    rating: 4.8,
    reviewsCount: 2600,
    pricePerNight: 15200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
    badge: "Grand Heritage Icon",
    amenities: ["Seafront Infinity Pool", "Heritage Butler Service", "Colonial High Tea", "Spa Services", "Historic Garden Walks"],
    description: "The grand dame of Southeast Asian colonial hotels, established in 1885 and frequented by world luminaries.",
    rooms: [
      { id: "RM-33", name: "Heritage Wing Deluxe Suite", bed: "1 King Bed", size: "58 sqm", guests: 2, pricePerNight: 15200 },
      { id: "RM-34", name: "Victory Annexe Seafront Suite", bed: "1 King Bed + Balcony", size: "65 sqm", guests: 2, pricePerNight: 19800 }
    ]
  },
  {
    id: "HT-017",
    name: "Cheong Fatt Tze - The Blue Mansion",
    city: "Penang",
    country: "Malaysia",
    address: "14 Leith Street, 10200 George Town, Penang",
    locationBadge: "George Town UNESCO Cultural Heritage Core",
    stars: 4,
    rating: 4.7,
    reviewsCount: 1100,
    pricePerNight: 11800,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    badge: "UNESCO Heritage Winner",
    amenities: ["Courtyard Swimming Pool", "Indigo Fine Dining", "Heritage Guided Tours", "Feng Shui Architecture", "Free WiFi"],
    description: "Famous indigo-blue boutique mansion with courtyard chambers dating back to the late 19th century.",
    rooms: [
      { id: "RM-35", name: "Liang Collection Courtyard Room", bed: "1 Queen Bed", size: "32 sqm", guests: 2, pricePerNight: 11800 },
      { id: "RM-36", name: "The Escupidor Suite", bed: "1 King Bed", size: "48 sqm", guests: 2, pricePerNight: 16500 }
    ]
  },

  // Langkawi
  {
    id: "HT-018",
    name: "The Danna Langkawi Luxury Resort",
    city: "Langkawi",
    country: "Malaysia",
    address: "Telaga Harbour Park, Pantai Kok, 07000 Langkawi",
    locationBadge: "Pantai Kok Beachfront & Marina",
    stars: 5,
    rating: 4.9,
    reviewsCount: 3100,
    pricePerNight: 23500,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"],
    badge: "Best Island Resort",
    amenities: ["3-Tier Beachfront Infinity Pool", "Private White Sand Beach", "Danna Spa", "Champagne Breakfast", "Complimentary Water Sports"],
    description: "Colonial elegance meets tropical luxury with Langkawi's largest three-tier infinity pool overlooking the Andaman Sea.",
    rooms: [
      { id: "RM-37", name: "Merchant Marina View King", bed: "1 King Bed", size: "60 sqm", guests: 2, pricePerNight: 23500 },
      { id: "RM-38", name: "Grand Viceroy Ocean Front Room", bed: "1 King Bed", size: "65 sqm", guests: 2, pricePerNight: 31000 }
    ]
  },
  {
    id: "HT-019",
    name: "Pelangi Beach Resort & Spa Langkawi",
    city: "Langkawi",
    country: "Malaysia",
    address: "Pantai Cenang, 07000 Langkawi",
    locationBadge: "Direct Pantai Cenang Beach Access",
    stars: 5,
    rating: 4.7,
    reviewsCount: 2450,
    pricePerNight: 14800,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80"],
    badge: "Chalet Living",
    amenities: ["Traditional Malay Wooden Chalets", "Cascading Horizon Pools", "Cenang Beachfront", "Kids Club", "Pelangi Lounge"],
    description: "Set across 35 acres of palm-fringed gardens along the golden sands of Pantai Cenang with wooden Malay chalets on stilts.",
    rooms: [
      { id: "RM-39", name: "Garden Terrace Chalet", bed: "1 King or 2 Singles", size: "46 sqm", guests: 2, pricePerNight: 14800 },
      { id: "RM-40", name: "Beachfront King Chalet", bed: "1 King Bed", size: "46 sqm", guests: 2, pricePerNight: 21500 }
    ]
  },

  // Tokyo
  {
    id: "HT-020",
    name: "The Prince Gallery Tokyo Kioicho",
    city: "Tokyo",
    country: "Japan",
    address: "1-2 Kioicho, Chiyoda-ku, 102-8585 Tokyo",
    locationBadge: "Chiyoda • Direct Subway Link to Akasaka-Mitsuke",
    stars: 5,
    rating: 4.9,
    reviewsCount: 1800,
    pricePerNight: 38500,
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80"],
    badge: "Skyline Serenity",
    amenities: ["Indoor Glass Pool", "Kioi Spa by Swissline", "Washitsu Japanese Suites", "Sky Lounge Levita", "Floor-to-ceiling Tokyo Views"],
    description: "Suspended high above Tokyo's verdant Kioicho neighborhood, seamlessly marrying contemporary Japanese art and skyline luxury.",
    rooms: [
      { id: "RM-41", name: "Deluxe King City Skyline", bed: "1 King Bed", size: "42 sqm", guests: 2, pricePerNight: 38500 },
      { id: "RM-42", name: "Club Grand Panoramic Suite", bed: "1 King Bed", size: "75 sqm", guests: 3, pricePerNight: 62000 }
    ]
  },
  {
    id: "HT-021",
    name: "Hotel Gracery Shinjuku",
    city: "Tokyo",
    country: "Japan",
    address: "1-19-1 Kabukicho, Shinjuku-ku, 160-8466 Tokyo",
    locationBadge: "Famous Godzilla Head • 5 min to Shinjuku Station",
    stars: 4,
    rating: 4.6,
    reviewsCount: 3900,
    pricePerNight: 16800,
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"],
    badge: "Shinjuku Landmark",
    amenities: ["Godzilla Viewing Terrace", "Soundproof High-Rise Rooms", "Italian Trattoria", "Free High-Speed WiFi", "English Concierge"],
    description: "The iconic Shinjuku hotel crowned by the life-size Godzilla head, surrounded by Tokyo's premier shopping and dining.",
    rooms: [
      { id: "RM-43", name: "Standard Double Room", bed: "1 Double Bed", size: "18 sqm", guests: 2, pricePerNight: 16800 },
      { id: "RM-44", name: "Godzilla View Twin Room", bed: "2 Single Beds", size: "24 sqm", guests: 2, pricePerNight: 21000 }
    ]
  },

  // Jakarta
  {
    id: "HT-022",
    name: "Hotel Indonesia Kempinski Jakarta",
    city: "Jakarta",
    country: "Indonesia",
    address: "Jl. M.H. Thamrin No. 1, 10310 Jakarta",
    locationBadge: "Facing Bundaran HI Landmark",
    stars: 5,
    rating: 4.8,
    reviewsCount: 3400,
    pricePerNight: 17200,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
    badge: "Heritage Grand Stays",
    amenities: ["Rooftop Botanical Garden Pool", "Kempinski The Spa", "Direct Access to Grand Indonesia Mall", "Paulaner Bräuhaus", "Butler Service"],
    description: "Indonesia's first luxury 5-star hotel, lovingly restored with historical grandeur right in front of the famous Bundaran HI roundabout.",
    rooms: [
      { id: "RM-45", name: "Grand Deluxe King", bed: "1 King Bed", size: "62 sqm", guests: 2, pricePerNight: 17200 },
      { id: "RM-46", name: "Executive Club Suite", bed: "1 King Bed", size: "84 sqm", guests: 2, pricePerNight: 26000 }
    ]
  },

  // Dhaka
  {
    id: "HT-023",
    name: "The Westin Dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    address: "Main Gulshan Avenue, Plot-01, Road 45, Gulshan-2, 1212 Dhaka",
    locationBadge: "Gulshan-2 Diplomatic Zone • 20 min to DAC Airport",
    stars: 5,
    rating: 4.7,
    reviewsCount: 2200,
    pricePerNight: 18500,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"],
    badge: "Diplomatic Hub",
    amenities: ["Heavenly Bed Comfort", "Outdoor Heated Pool", "Heavenly Spa", "Seasonal Tastes Buffet", "Airport Limousine"],
    description: "Premier 5-star luxury in the heart of Dhaka's secure Gulshan diplomatic quarter, boasting signature Heavenly Beds and fine dining.",
    rooms: [
      { id: "RM-47", name: "Deluxe Heavenly King", bed: "1 King Heavenly Bed", size: "38 sqm", guests: 2, pricePerNight: 18500 },
      { id: "RM-48", name: "Executive Suite Gulshan Skyline", bed: "1 King Bed + Living Area", size: "72 sqm", guests: 3, pricePerNight: 29500 }
    ]
  },
  {
    id: "HT-024",
    name: "InterContinental Dhaka",
    city: "Dhaka",
    country: "Bangladesh",
    address: "1 Minto Road, Ramna, 1000 Dhaka",
    locationBadge: "Historic Ramna Green • Close to Shahbagh",
    stars: 5,
    rating: 4.8,
    reviewsCount: 1950,
    pricePerNight: 17800,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    gallery: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80"],
    badge: "Iconic Heritage",
    amenities: ["Temperature-Controlled Pool", "Balcony Lounge", "Fitness Center & Spa", "Lush Landscaped Gardens", "Banquet Facilities"],
    description: "Dhaka's historic diplomatic address offering refined luxury, lush gardens, and seamless accessibility across the capital.",
    rooms: [
      { id: "RM-49", name: "Classic King Garden View", bed: "1 King Bed", size: "40 sqm", guests: 2, pricePerNight: 17800 },
      { id: "RM-50", name: "Club InterContinental Suite", bed: "1 King Bed + Lounge", size: "80 sqm", guests: 3, pricePerNight: 28000 }
    ]
  }
];
