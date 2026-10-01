/**
 * AirAsia Frontend Booking Platform
 * Vanilla JavaScript implementation
 * Features: Flight & Hotel Search, Interactive Filters, Step-by-Step Booking,
 * LocalStorage Management, Print Functionality, and Responsive UI.
 */

(function () {
  'use strict';

  // ==========================================================================
  // Mock Data & Airport Database
  // ==========================================================================
  const AIRPORTS = [
    { code: 'DAC', city: 'Dhaka', country: 'Bangladesh', name: 'Hazrat Shahjalal Intl Airport', tz: 6 },
    { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', name: 'Kuala Lumpur Intl Airport (KLIA2)', tz: 8 },
    { code: 'DMK', city: 'Bangkok', country: 'Thailand', name: 'Don Mueang Intl Airport', tz: 7 },
    { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Singapore Changi Airport', tz: 8 },
    { code: 'DPS', city: 'Bali', country: 'Indonesia', name: 'Ngurah Rai Intl Airport (Denpasar)', tz: 8 },
    { code: 'CGK', city: 'Jakarta', country: 'Indonesia', name: 'Soekarno-Hatta Intl Airport', tz: 7 }
  ];

  const POPULAR_DESTINATIONS = [
    {
      code: 'KUL',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      price: 24500,
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80',
      tag: 'Most Popular'
    },
    {
      code: 'DMK',
      city: 'Bangkok',
      country: 'Thailand',
      price: 22800,
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=600&q=80',
      tag: 'Direct Flight'
    },
    {
      code: 'SIN',
      city: 'Singapore',
      country: 'Singapore',
      price: 26900,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=600&q=80',
      tag: 'Best Value'
    },
    {
      code: 'DPS',
      city: 'Bali',
      country: 'Indonesia',
      price: 33400,
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      tag: 'Island Getaway'
    },
    {
      code: 'CGK',
      city: 'Jakarta',
      country: 'Indonesia',
      price: 29500,
      image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=600&q=80',
      tag: 'Special Fare'
    },
    {
      code: 'DAC',
      city: 'Dhaka',
      country: 'Bangladesh',
      price: 21900,
      image: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=800&q=85',
      tag: 'Hub City'
    }
  ];

  const FLIGHT_DEALS = [
    { from: 'DAC', to: 'KUL', label: 'Dhaka to Kuala Lumpur', desc: 'Direct Daily • 7kg Carry-on included', price: 24500 },
    { from: 'DAC', to: 'DMK', label: 'Dhaka to Bangkok', desc: 'Non-stop Service • Weekend Special', price: 22800 },
    { from: 'KUL', to: 'DPS', label: 'Kuala Lumpur to Bali', desc: 'Direct 3h flight • Tropical Escape', price: 14200 },
    { from: 'KUL', to: 'SIN', label: 'Kuala Lumpur to Singapore', desc: '55 mins flight • Multiple Daily Frequencies', price: 7900 }
  ];

  const HOTELS_DATA = [
    // Kuala Lumpur
    {
      id: 'ht-1',
      name: 'Grand Pacific Suites & Spa',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      rating: 4.8,
      reviewsCount: 342,
      pricePerNight: 8500,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Fitness Center'],
      description: 'Experience refined luxury in central Kuala Lumpur with sweeping skyline views of the Petronas Twin Towers, full-service infinity pool, and world-class dining.',
      rooms: [
        { type: 'Deluxe King Room', maxGuests: 2, priceBonus: 0, bed: '1 Extra-large double bed' },
        { type: 'Premier Twin Suite', maxGuests: 3, priceBonus: 2200, bed: '2 Large single beds' },
        { type: 'Executive Skyline Suite', maxGuests: 4, priceBonus: 5500, bed: '1 King bed + 1 Sofa bed' }
      ]
    },
    {
      id: 'ht-2',
      name: 'AirAsia Tune Hotel KLIA2',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      rating: 4.6,
      reviewsCount: 1420,
      pricePerNight: 5800,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Airport Shuttle', 'Breakfast Included', 'Fitness Center', 'Luggage Storage'],
      description: 'Convenient airport transit hotel seamlessly linked to KLIA Terminal 2 via a covered bridge, featuring 5-star beds and power showers.',
      rooms: [
        { type: 'Transit Double Ensuite', maxGuests: 2, priceBonus: 0, bed: '1 Queen Bed' },
        { type: 'Twin Transit Room', maxGuests: 2, priceBonus: 600, bed: '2 Single Beds' },
        { type: 'Family Transit Quad', maxGuests: 4, priceBonus: 4000, bed: '2 Queen Beds' }
      ]
    },
    {
      id: 'ht-3',
      name: 'EQ Kuala Lumpur & Sky Bar',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      rating: 4.9,
      reviewsCount: 2840,
      pricePerNight: 16500,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Spa & Wellness'],
      description: 'Iconic 5-star architectural landmark with an infinity sky pool and panoramic views over the Petronas Twin Towers.',
      rooms: [
        { type: 'Deluxe King City View', maxGuests: 2, priceBonus: 0, bed: '1 Super King Bed' },
        { type: 'Club Twin Towers View', maxGuests: 2, priceBonus: 4500, bed: '2 Double Beds' },
        { type: 'Executive Skyline Suite', maxGuests: 3, priceBonus: 9500, bed: '1 King Bed + Living Area' }
      ]
    },
    {
      id: 'ht-4',
      name: 'The Chow Kit Ormond Heritage',
      city: 'Kuala Lumpur',
      country: 'Malaysia',
      rating: 4.7,
      reviewsCount: 920,
      pricePerNight: 8200,
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Breakfast Included', 'Airport Shuttle', 'Boutique Kitchen', 'Cocktail Lounge'],
      description: 'Boutique design haven blending vintage mid-century Malaysian aesthetics with bespoke guest luxury in the cultural heart of KL.',
      rooms: [
        { type: 'The Den King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'The Clifford Twin', maxGuests: 2, priceBonus: 1200, bed: '2 Single Beds' },
        { type: 'Towkay Executive Suite', maxGuests: 3, priceBonus: 4500, bed: '1 King Bed + Living Lounge' }
      ]
    },

    // Bangkok
    {
      id: 'ht-5',
      name: 'Chao Phraya Riverside Resort',
      city: 'Bangkok',
      country: 'Thailand',
      rating: 4.7,
      reviewsCount: 410,
      pricePerNight: 7200,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Spa & Wellness', 'Water Taxi'],
      description: 'Tranquil riverside sanctuary along the Chao Phraya with complimentary private water shuttle to BTS Skytrain and night markets.',
      rooms: [
        { type: 'Superior Riverview', maxGuests: 2, priceBonus: 0, bed: '1 Double Bed' },
        { type: 'Deluxe Balcony Suite', maxGuests: 3, priceBonus: 1800, bed: '1 King Bed' },
        { type: 'Family Garden Villa', maxGuests: 4, priceBonus: 4200, bed: '2 Queen Beds' }
      ]
    },
    {
      id: 'ht-6',
      name: 'Banyan Tree Bangkok Sky Sanctuary',
      city: 'Bangkok',
      country: 'Thailand',
      rating: 4.8,
      reviewsCount: 1650,
      pricePerNight: 14800,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Spa & Wellness'],
      description: 'Legendary urban resort situated on Sathon Road featuring the Vertigo open-air rooftop grill and award-winning holistic spa suites.',
      rooms: [
        { type: 'Horizon King Suite', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Oasis Club Retreat', maxGuests: 2, priceBonus: 3200, bed: '1 King Bed' },
        { type: 'Two-Bedroom Presidential Suite', maxGuests: 4, priceBonus: 8800, bed: '2 King Beds' }
      ]
    },
    {
      id: 'ht-7',
      name: 'Sukhumvit Sky Oasis Suites',
      city: 'Bangkok',
      country: 'Thailand',
      rating: 4.6,
      reviewsCount: 880,
      pricePerNight: 8900,
      image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Fitness Center', 'Airport Shuttle'],
      description: 'Vibrant modern high-rise in central Sukhumvit with direct BTS skybridge link, rooftop saltwater infinity pool, and Japanese dining.',
      rooms: [
        { type: 'Premier King Studio', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Executive Corner Suite', maxGuests: 3, priceBonus: 2400, bed: '1 King Bed + Daybed' },
        { type: 'Sky Penthouse Suite', maxGuests: 4, priceBonus: 6500, bed: '2 King Beds' }
      ]
    },

    // Singapore
    {
      id: 'ht-8',
      name: 'Marina Vista Bay Hotel',
      city: 'Singapore',
      country: 'Singapore',
      rating: 4.9,
      reviewsCount: 528,
      pricePerNight: 16500,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Fitness Center'],
      description: 'Sophisticated modern hotel steps from Gardens by the Bay and MRT stations with a high-floor observation deck and harbor vistas.',
      rooms: [
        { type: 'City View Deluxe', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Harbor Premier Room', maxGuests: 2, priceBonus: 3500, bed: '1 King Bed' },
        { type: 'Marina Family Suite', maxGuests: 4, priceBonus: 8000, bed: '2 Queen Beds' }
      ]
    },
    {
      id: 'ht-9',
      name: 'The Fullerton Heritage Bay',
      city: 'Singapore',
      country: 'Singapore',
      rating: 4.9,
      reviewsCount: 3120,
      pricePerNight: 24500,
      image: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Heritage Spa'],
      description: 'Grand neo-classical monument overlooking Marina Bay waters, delivering world-renowned 5-star service and waterfront culinary journeys.',
      rooms: [
        { type: 'Courtyard Heritage King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Marina Bay Water View', maxGuests: 2, priceBonus: 4800, bed: '1 King Bed' },
        { type: 'Governor Presidential Suite', maxGuests: 4, priceBonus: 14000, bed: '1 King + 2 Doubles' }
      ]
    },
    {
      id: 'ht-10',
      name: 'Sentosa Cove Beachfront Resort',
      city: 'Singapore',
      country: 'Singapore',
      rating: 4.8,
      reviewsCount: 1420,
      pricePerNight: 19800,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Beach Access'],
      description: 'Exclusive island sanctuary with sandy lagoon access, lush tropical gardens, and direct marina yacht berths on Sentosa Island.',
      rooms: [
        { type: 'Ocean Lagoon King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Beachfront Pool Villa', maxGuests: 3, priceBonus: 5200, bed: '1 King Canopy Bed' },
        { type: 'Sentosa Family Bungalow', maxGuests: 4, priceBonus: 10500, bed: '2 King Beds' }
      ]
    },

    // Bali
    {
      id: 'ht-11',
      name: 'Ubud Seminyak Haven Villa',
      city: 'Bali',
      country: 'Indonesia',
      rating: 4.8,
      reviewsCount: 290,
      pricePerNight: 9800,
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Spa & Wellness'],
      description: 'Authentic Balinese private villa immersed in lush gardens with plunge pool, open-air living pavilion, and organic morning breakfast.',
      rooms: [
        { type: 'Private Pool Villa', maxGuests: 2, priceBonus: 0, bed: '1 King Canopy Bed' },
        { type: 'Two-Bedroom Garden Sanctuary', maxGuests: 4, priceBonus: 5000, bed: '2 King Beds' },
        { type: 'Presidential Royal Villa', maxGuests: 6, priceBonus: 9500, bed: '3 Large Bedrooms' }
      ]
    },
    {
      id: 'ht-12',
      name: 'Nusa Dua Tropical Cliff & Lagoon',
      city: 'Bali',
      country: 'Indonesia',
      rating: 4.9,
      reviewsCount: 2150,
      pricePerNight: 15400,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Private Beach'],
      description: 'Spectacular cliff-edge oceanfront resort with tiered crystal swimming lagoons, private white-sand beach cove, and fire dancing shows.',
      rooms: [
        { type: 'Cliff Ocean King Suite', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Lagoon Access Villa', maxGuests: 2, priceBonus: 4000, bed: '1 King Bed' },
        { type: 'Royal Cliffside Residence', maxGuests: 4, priceBonus: 11000, bed: '2 King Suites' }
      ]
    },
    {
      id: 'ht-13',
      name: 'Canggu Surfside Eco Resort',
      city: 'Bali',
      country: 'Indonesia',
      rating: 4.7,
      reviewsCount: 1180,
      pricePerNight: 7600,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Yoga Pavilion'],
      description: 'Bohemian eco-chic resort steps from Echo Beach surfing breaks, with organic garden cafe, daily yoga, and bamboo architecture.',
      rooms: [
        { type: 'Eco Garden King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Surfside Balcony Loft', maxGuests: 2, priceBonus: 1800, bed: '1 Queen Bed' },
        { type: 'Bamboo Family Sanctuary', maxGuests: 4, priceBonus: 4600, bed: '2 Double Beds' }
      ]
    },

    // Phuket
    {
      id: 'ht-14',
      name: 'Kata Rocks Oceanfront Villas',
      city: 'Phuket',
      country: 'Thailand',
      rating: 4.9,
      reviewsCount: 1740,
      pricePerNight: 21000,
      image: 'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1549294413-26f195200c16?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Ocean Sunset Bar'],
      description: 'Super-luxury modern yacht-styled residences perched over the Andaman Sea with private infinity plunge pools and panoramic sunsets.',
      rooms: [
        { type: 'One-Bedroom Sky Villa', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Two-Bedroom Ocean Residence', maxGuests: 4, priceBonus: 7500, bed: '2 King Beds' },
        { type: 'Three-Bedroom Penthouse', maxGuests: 6, priceBonus: 16000, bed: '3 King Beds' }
      ]
    },
    {
      id: 'ht-15',
      name: 'Patong Bay Tropical Lagoon Resort',
      city: 'Phuket',
      country: 'Thailand',
      rating: 4.6,
      reviewsCount: 2210,
      pricePerNight: 6800,
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Beach Shuttle'],
      description: 'Lively beachfront resort featuring free-form lagoon pools with swim-up cocktail bars, lush palms, and evening beach BBQs.',
      rooms: [
        { type: 'Deluxe Pool View Room', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Pool Access Double', maxGuests: 2, priceBonus: 1600, bed: '1 King Bed' },
        { type: 'Family Lagoon Suite', maxGuests: 4, priceBonus: 3800, bed: '2 Queen Beds' }
      ]
    },

    // Penang
    {
      id: 'ht-16',
      name: 'Eastern & Oriental Heritage Hotel',
      city: 'Penang',
      country: 'Malaysia',
      rating: 4.9,
      reviewsCount: 2980,
      pricePerNight: 15200,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Heritage Gardens'],
      description: 'The pearl of George Town, this colonial grand dame has hosted royalty and literary icons along Penang’s sea wall since 1885.',
      rooms: [
        { type: 'Heritage Deluxe Suite', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Straits Seafront Suite', maxGuests: 2, priceBonus: 3800, bed: '1 Four-poster King' },
        { type: 'Writers Presidential Suite', maxGuests: 4, priceBonus: 9200, bed: '2 King Suites' }
      ]
    },
    {
      id: 'ht-17',
      name: 'Batu Ferringhi Beachfront Escape',
      city: 'Penang',
      country: 'Malaysia',
      rating: 4.6,
      reviewsCount: 1410,
      pricePerNight: 7400,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Watersports Center'],
      description: 'Family beach haven right on Batu Ferringhi sands with water sports, night market access, and sunset seafood barbecues.',
      rooms: [
        { type: 'Superior Sea Facing Room', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Deluxe Terrace Room', maxGuests: 3, priceBonus: 1500, bed: '1 King + Sofa Bed' },
        { type: 'Penang Family Suite', maxGuests: 4, priceBonus: 4000, bed: '2 Queen Beds' }
      ]
    },

    // Langkawi
    {
      id: 'ht-18',
      name: 'The Andaman Rainforest & Coral Sanctuary',
      city: 'Langkawi',
      country: 'Malaysia',
      rating: 4.8,
      reviewsCount: 1820,
      pricePerNight: 16800,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Nature Treks'],
      description: 'Nestled between a 10-million-year-old ancient rainforest and the white sands of Datai Bay, home to coral nurseries and monkeys.',
      rooms: [
        { type: 'Rainforest Deluxe King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Seaview Canopy Suite', maxGuests: 2, priceBonus: 4200, bed: '1 King Canopy Bed' },
        { type: 'Executive Beach Villa', maxGuests: 4, priceBonus: 11000, bed: '2 King Beds' }
      ]
    },
    {
      id: 'ht-19',
      name: 'Pantai Cenang Sunset Beach Club',
      city: 'Langkawi',
      country: 'Malaysia',
      rating: 4.6,
      reviewsCount: 1280,
      pricePerNight: 6400,
      image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Beachfront Lounge'],
      description: 'Lively and casual beachfront resort right on Cenang Beach strip with sunset fire performances and tax-free shopping walks.',
      rooms: [
        { type: 'Cenang Beachfront King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Poolside Verandah Double', maxGuests: 2, priceBonus: 1200, bed: '1 King Bed' },
        { type: 'Island Family Bungalow', maxGuests: 4, priceBonus: 3200, bed: '2 Queen Beds' }
      ]
    },

    // Tokyo
    {
      id: 'ht-20',
      name: 'Cerulean Tower Panoramic View Hotel',
      city: 'Tokyo',
      country: 'Japan',
      rating: 4.8,
      reviewsCount: 2450,
      pricePerNight: 23500,
      image: 'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506059612708-99d6c258160e?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Fuji Mountain Views'],
      description: 'High above Shibuya crossing, this prestigious 40-story tower offers Mt. Fuji vistas, traditional Noh theatre, and jazz bar.',
      rooms: [
        { type: 'Superior High Floor King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Corner Shibuya View Suite', maxGuests: 2, priceBonus: 5800, bed: '1 King Bed' },
        { type: 'Cerulean Executive Suite', maxGuests: 3, priceBonus: 12500, bed: '1 King + Tatami Lounge' }
      ]
    },
    {
      id: 'ht-21',
      name: 'Shinjuku Prince Sky Hotel',
      city: 'Tokyo',
      country: 'Japan',
      rating: 4.6,
      reviewsCount: 3100,
      pricePerNight: 14200,
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Airport Shuttle', 'Breakfast Included', 'Direct Subway Link', 'Luggage Storage'],
      description: 'Directly above Seibu-Shinjuku Station with seamless access to Narita Express, Golden Gai nightlife, and Omoide Yokocho dining.',
      rooms: [
        { type: 'Standard Double City View', maxGuests: 2, priceBonus: 0, bed: '1 Double Bed' },
        { type: 'Deluxe Twin High Floor', maxGuests: 2, priceBonus: 2200, bed: '2 Single Beds' },
        { type: 'Family Connected Rooms', maxGuests: 4, priceBonus: 6800, bed: '2 Double Beds' }
      ]
    },

    // Jakarta
    {
      id: 'ht-22',
      name: 'The Pan Pacific Jakarta Central',
      city: 'Jakarta',
      country: 'Indonesia',
      rating: 4.6,
      reviewsCount: 195,
      pricePerNight: 6800,
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1568495248636-6432b97bd949?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Fitness Center', 'Breakfast Included'],
      description: 'Contemporary high-rise hotel in the golden triangle district of Thamrin, offering direct connectivity to premier shopping centers.',
      rooms: [
        { type: 'Deluxe City View', maxGuests: 2, priceBonus: 0, bed: '1 King or 2 Single Beds' },
        { type: 'Club Premier Room', maxGuests: 3, priceBonus: 2000, bed: '1 King Bed' },
        { type: 'Executive Ambassador Suite', maxGuests: 4, priceBonus: 4500, bed: '1 Master Bed + Lounge' }
      ]
    },
    {
      id: 'ht-23',
      name: 'SCBD Grand Jakarta Penthouse Hotel',
      city: 'Jakarta',
      country: 'Indonesia',
      rating: 4.8,
      reviewsCount: 1140,
      pricePerNight: 12500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Spa & Wellness'],
      description: 'Located in Jakarta’s prestigious Sudirman Central Business District with direct access to luxury boutiques, rooftop dining, and MRT.',
      rooms: [
        { type: 'SCBD Deluxe King', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Premier Executive Club', maxGuests: 2, priceBonus: 2800, bed: '1 King Bed' },
        { type: 'Sky Penthouse 2-Bedroom', maxGuests: 4, priceBonus: 7800, bed: '2 King Beds' }
      ]
    },

    // Dhaka
    {
      id: 'ht-24',
      name: 'Rosewood Crown Airport Residency',
      city: 'Dhaka',
      country: 'Bangladesh',
      rating: 4.5,
      reviewsCount: 220,
      pricePerNight: 5900,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Airport Shuttle', 'Breakfast Included', '24h Room Service', 'Fitness Center'],
      description: 'Convenient 4-star transit and business sanctuary located only 8 minutes from Hazrat Shahjalal International Airport with 24/7 dining.',
      rooms: [
        { type: 'Standard Transit Queen', maxGuests: 2, priceBonus: 0, bed: '1 Queen Bed' },
        { type: 'Deluxe Executive King', maxGuests: 2, priceBonus: 1500, bed: '1 King Bed' },
        { type: 'Family Transit Suite', maxGuests: 4, priceBonus: 3500, bed: '2 Double Beds' }
      ]
    },
    {
      id: 'ht-25',
      name: 'The Westin Dhaka Diplomatic Quarter',
      city: 'Dhaka',
      country: 'Bangladesh',
      rating: 4.8,
      reviewsCount: 2200,
      pricePerNight: 18500,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Airport Shuttle', 'Breakfast Included', 'Spa & Wellness'],
      description: 'Premier 5-star luxury in Dhaka’s secure Gulshan diplomatic quarter featuring signature Heavenly Beds and international culinary stations.',
      rooms: [
        { type: 'Deluxe Heavenly King', maxGuests: 2, priceBonus: 0, bed: '1 King Heavenly Bed' },
        { type: 'Club Floor Suite', maxGuests: 2, priceBonus: 3600, bed: '1 King Bed' },
        { type: 'Presidential Diplomatic Suite', maxGuests: 4, priceBonus: 11500, bed: '2 King Suites' }
      ]
    },
    {
      id: 'ht-26',
      name: 'InterContinental Dhaka Heritage & Green',
      city: 'Dhaka',
      country: 'Bangladesh',
      rating: 4.8,
      reviewsCount: 1950,
      pricePerNight: 17800,
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      ],
      amenities: ['Free Wi-Fi', 'Swimming Pool', 'Breakfast Included', 'Airport Shuttle', 'Lush Gardens'],
      description: 'Historic diplomatic address offering refined luxury, temperature-controlled pool, lush private parkland, and fine dining.',
      rooms: [
        { type: 'Classic King Garden View', maxGuests: 2, priceBonus: 0, bed: '1 King Bed' },
        { type: 'Club InterContinental Room', maxGuests: 2, priceBonus: 3200, bed: '1 King Bed' },
        { type: 'Executive Heritage Suite', maxGuests: 4, priceBonus: 9800, bed: '2 King Beds' }
      ]
    }
  ];

  // ==========================================================================
  // Storage Helper (Graceful fallback if localStorage is unavailable)
  // ==========================================================================
  const MemoryStorage = {
    _data: {},
    getItem(key) { return this._data[key] || null; },
    setItem(key, val) { this._data[key] = String(val); },
    removeItem(key) { delete this._data[key]; },
    clear() { this._data = {}; }
  };

  function getSafeStorage() {
    try {
      const testKey = '__airasia_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch (e) {
      console.warn('localStorage unavailable; operating in memory fallback store.', e);
      return MemoryStorage;
    }
  }

  const store = getSafeStorage();
  const FLIGHT_BOOKINGS_KEY = 'airasia_flight_bookings_v2';
  const HOTEL_BOOKINGS_KEY = 'airasia_hotel_bookings_v2';
  const AUTH_USER_KEY = 'airasia_user_session_v3';
  const AUTH_REGISTRY_KEY = 'airasia_registered_users_v3';

  // ==========================================================================
  // Local Authentication Layer (Browser LocalStorage Only - No External API)
  // ==========================================================================
  function getCurrentUser() {
    try {
      const raw = store.getItem(AUTH_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function setCurrentUser(user) {
    try {
      if (user) {
        store.setItem(AUTH_USER_KEY, JSON.stringify(user));
      } else {
        store.removeItem(AUTH_USER_KEY);
      }
    } catch (e) {
      console.warn('Failed to persist user session:', e);
    }
    updateAuthUI();
  }

  function getUsersRegistry() {
    try {
      const raw = store.getItem(AUTH_REGISTRY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveUserToRegistry(user) {
    const users = getUsersRegistry();
    const idx = users.findIndex(u => u.email.toLowerCase() === user.email.toLowerCase());
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    store.setItem(AUTH_REGISTRY_KEY, JSON.stringify(users));
  }

  function updateAuthUI() {
    const user = getCurrentUser();
    const signinBtn = document.getElementById('btn-header-signin');
    const userWrap = document.getElementById('header-user-wrap');
    const userNameEl = document.getElementById('header-username-text');
    const userAvatarEl = document.getElementById('header-avatar-letter');
    const dropNameEl = document.getElementById('dropdown-full-name');
    const dropEmailEl = document.getElementById('dropdown-email');
    const heroGreeting = document.getElementById('hero-user-greeting');
    const heroNameEl = document.getElementById('hero-user-display-name');
    const mobileStatus = document.getElementById('mobile-user-status');

    if (user) {
      // Desktop Header: Logged In
      if (signinBtn) signinBtn.style.display = 'none';
      if (userWrap) userWrap.style.display = 'flex';
      const firstName = (user.name || 'Traveler').trim().split(' ')[0];
      const initialLetter = (user.name || 'T').trim().charAt(0).toUpperCase();

      if (userNameEl) userNameEl.textContent = firstName;
      if (userAvatarEl) userAvatarEl.textContent = initialLetter;
      if (dropNameEl) dropNameEl.textContent = user.name || 'Traveler';
      if (dropEmailEl) dropEmailEl.textContent = user.email || 'user@airasia.com';
      if (heroGreeting) heroGreeting.style.display = 'inline-flex';
      if (heroNameEl) heroNameEl.textContent = user.name;

      // Mobile Drawer: Logged In
      if (mobileStatus) {
        mobileStatus.innerHTML = `
          <div class="mobile-logged-in-box">
            <div class="mobile-user-info">
              <span class="user-capsule-avatar">${escapeHtml(initialLetter)}</span>
              <div>
                <div class="mobile-user-name">${escapeHtml(user.name)}</div>
                <div class="mobile-user-email">${escapeHtml(user.email)}</div>
              </div>
            </div>
            <button type="button" class="btn-mobile-logout" id="btn-mobile-logout">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        `;
        const mobileLogoutBtn = document.getElementById('btn-mobile-logout');
        if (mobileLogoutBtn) {
          mobileLogoutBtn.addEventListener('click', handleSignOut);
        }
      }
    } else {
      // Desktop Header: Logged Out
      if (signinBtn) signinBtn.style.display = 'inline-flex';
      if (userWrap) userWrap.style.display = 'none';
      if (heroGreeting) heroGreeting.style.display = 'none';

      // Mobile Drawer: Logged Out
      if (mobileStatus) {
        mobileStatus.innerHTML = `
          <div class="mobile-auth-actions">
            <button type="button" class="btn-mobile-auth-primary" id="btn-mobile-signin">Sign In</button>
            <button type="button" class="btn-mobile-auth-secondary" id="btn-mobile-signup">Create Account</button>
          </div>
        `;
        const mobSignIn = document.getElementById('btn-mobile-signin');
        const mobSignUp = document.getElementById('btn-mobile-signup');
        if (mobSignIn) {
          mobSignIn.addEventListener('click', () => {
            const drawer = document.getElementById('mobile-drawer');
            if (drawer) drawer.classList.remove('open');
            navigateToAuth('signin');
          });
        }
        if (mobSignUp) {
          mobSignUp.addEventListener('click', () => {
            const drawer = document.getElementById('mobile-drawer');
            if (drawer) drawer.classList.remove('open');
            navigateToAuth('signup');
          });
        }
      }
    }
  }

  function handleSignOut() {
    setCurrentUser(null);
    const userDropdown = document.getElementById('header-user-dropdown') || document.querySelector('.user-capsule-dropdown');
    if (userDropdown) userDropdown.classList.remove('open');
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');
    showToast('You have been signed out successfully.', 'info');
    if (State.currentView === 'bookings' || State.currentView === 'auth') {
      switchView('flight');
    }
  }

  function navigateToAuth(tab = 'signin') {
    switchView('auth');
    showAuthTab(tab);
  }

  function showAuthTab(tab) {
    const tabSignIn = document.getElementById('tab-page-signin');
    const tabSignUp = document.getElementById('tab-page-signup');
    const formSignIn = document.getElementById('page-form-signin');
    const formSignUp = document.getElementById('page-form-signup');
    const titleEl = document.getElementById('auth-main-title');
    const subEl = document.getElementById('auth-main-subtitle');
    const signinError = document.getElementById('page-signin-error');
    const signupError = document.getElementById('page-signup-error');

    if (signinError) signinError.style.display = 'none';
    if (signupError) signupError.style.display = 'none';

    if (tab === 'signup') {
      if (tabSignUp) {
        tabSignUp.classList.add('active');
        tabSignUp.setAttribute('aria-selected', 'true');
      }
      if (tabSignIn) {
        tabSignIn.classList.remove('active');
        tabSignIn.setAttribute('aria-selected', 'false');
      }
      if (formSignUp) formSignUp.style.display = 'block';
      if (formSignIn) formSignIn.style.display = 'none';
      if (titleEl) titleEl.textContent = 'Create an AirAsia Account';
      if (subEl) subEl.textContent = 'Register to easily manage flight itineraries, save passengers, and book hotels.';
    } else {
      if (tabSignIn) {
        tabSignIn.classList.add('active');
        tabSignIn.setAttribute('aria-selected', 'true');
      }
      if (tabSignUp) {
        tabSignUp.classList.remove('active');
        tabSignUp.setAttribute('aria-selected', 'false');
      }
      if (formSignIn) formSignIn.style.display = 'block';
      if (formSignUp) formSignUp.style.display = 'none';
      if (titleEl) titleEl.textContent = 'Sign In to AirAsia';
      if (subEl) subEl.textContent = 'Access your bookings, manage itineraries, and enjoy seamless travel experiences.';
    }
  }

  function initAuthSystem() {
    updateAuthUI();

    const signinBtn = document.getElementById('btn-header-signin');
    const userBtn = document.getElementById('header-user-btn');
    const userDropdown = document.getElementById('header-user-dropdown') || document.querySelector('.user-capsule-dropdown');
    const btnSignOut = document.getElementById('btn-menu-logout');
    const btnSignOutAlt = document.getElementById('dropdown-sign-out');
    const btnMyBookings = document.getElementById('dropdown-my-bookings');
    const btnClearData = document.getElementById('btn-menu-clear-data') || document.getElementById('dropdown-clear-data');

    // Header Sign In button navigates to dedicated Auth Page
    if (signinBtn) {
      signinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToAuth('signin');
      });
    }

    // Toggle User Dropdown
    if (userBtn && userDropdown) {
      userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-capsule-wrap')) {
          userDropdown.classList.remove('open');
        }
      });
    }

    // Dropdown items
    if (btnMyBookings) {
      btnMyBookings.addEventListener('click', () => {
        if (userDropdown) userDropdown.classList.remove('open');
        switchView('bookings');
      });
    }

    if (btnClearData) {
      btnClearData.addEventListener('click', () => {
        if (userDropdown) userDropdown.classList.remove('open');
        const clearModal = document.getElementById('clear-data-modal');
        if (clearModal) clearModal.classList.add('open');
      });
    }

    if (btnSignOut) {
      btnSignOut.addEventListener('click', handleSignOut);
    }
    if (btnSignOutAlt && btnSignOutAlt !== btnSignOut) {
      btnSignOutAlt.addEventListener('click', handleSignOut);
    }

    // Auth Page Tab Switching
    const tabSignIn = document.getElementById('tab-page-signin');
    const tabSignUp = document.getElementById('tab-page-signup');
    const linkGotoSignUp = document.getElementById('btn-link-goto-signup');
    const linkGotoSignIn = document.getElementById('btn-link-goto-signin');
    const btnAuthBack = document.getElementById('btn-auth-back-flights');

    if (tabSignIn) {
      tabSignIn.addEventListener('click', () => showAuthTab('signin'));
    }
    if (tabSignUp) {
      tabSignUp.addEventListener('click', () => showAuthTab('signup'));
    }
    if (linkGotoSignUp) {
      linkGotoSignUp.addEventListener('click', () => showAuthTab('signup'));
    }
    if (linkGotoSignIn) {
      linkGotoSignIn.addEventListener('click', () => showAuthTab('signin'));
    }
    if (btnAuthBack) {
      btnAuthBack.addEventListener('click', () => switchView('flight'));
    }

    // Password Show/Hide Toggle Buttons
    document.querySelectorAll('.btn-toggle-password').forEach(toggleBtn => {
      toggleBtn.addEventListener('click', () => {
        const targetId = toggleBtn.dataset.target;
        if (!targetId) return;
        const targetInput = document.getElementById(targetId);
        if (!targetInput) return;

        const isPassword = targetInput.type === 'password';
        targetInput.type = isPassword ? 'text' : 'password';

        // Toggle eye icon appearance
        toggleBtn.innerHTML = isPassword ? `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
            <line x1="1" y1="1" x2="23" y2="23"/>
          </svg>
        ` : `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        `;
      });
    });

    // Quick Autofill Test Account Button
    const quickFillBtn = document.getElementById('btn-quick-fill-account');
    if (quickFillBtn) {
      quickFillBtn.addEventListener('click', () => {
        const emailInput = document.getElementById('page-signin-email');
        const passInput = document.getElementById('page-signin-password');
        const signinError = document.getElementById('page-signin-error');
        if (emailInput) emailInput.value = 'yasinchowdhury999@gmail.com';
        if (passInput) passInput.value = 'pass1234';
        if (signinError) signinError.style.display = 'none';
        showToast('Filled test user credentials. Click Sign In to continue.', 'info');
      });
    }

    // Handle Page Sign In Form Submission
    const formSignIn = document.getElementById('page-form-signin');
    if (formSignIn) {
      formSignIn.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('page-signin-email');
        const passInput = document.getElementById('page-signin-password');
        const errorAlert = document.getElementById('page-signin-error');

        const email = emailInput ? emailInput.value.trim() : '';
        const password = passInput ? passInput.value : '';

        if (errorAlert) errorAlert.style.display = 'none';

        if (!email || !password) {
          if (errorAlert) {
            errorAlert.textContent = 'Please enter both your email address and password.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        const registry = getUsersRegistry();
        const found = registry.find(u => u.email.toLowerCase() === email.toLowerCase());

        if (!found) {
          if (errorAlert) {
            errorAlert.textContent = 'No account found with this email. Please check your spelling or click "Create Account".';
            errorAlert.style.display = 'block';
          }
          return;
        }

        if (found.password && found.password !== password) {
          if (errorAlert) {
            errorAlert.textContent = 'Incorrect password. Please try again or use the test credentials below.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Authentication Success
        const userSession = {
          id: found.id,
          name: found.name,
          email: found.email,
          phone: found.phone || '',
          joinedAt: found.joinedAt || new Date().toISOString()
        };

        setCurrentUser(userSession);
        if (emailInput) emailInput.value = '';
        if (passInput) passInput.value = '';
        showToast(`Welcome back, ${userSession.name}!`, 'success');
        switchView('flight');
      });
    }

    // Handle Page Sign Up Form Submission
    const formSignUp = document.getElementById('page-form-signup');
    if (formSignUp) {
      formSignUp.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('page-signup-name');
        const emailInput = document.getElementById('page-signup-email');
        const phoneInput = document.getElementById('page-signup-phone');
        const passInput = document.getElementById('page-signup-password');
        const confirmInput = document.getElementById('page-signup-confirm');
        const termsCheck = document.getElementById('page-signup-terms');
        const errorAlert = document.getElementById('page-signup-error');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const password = passInput ? passInput.value : '';
        const confirmPass = confirmInput ? confirmInput.value : '';
        const termsAgreed = termsCheck ? termsCheck.checked : false;

        if (errorAlert) errorAlert.style.display = 'none';

        if (!name || !email || !phone || !password || !confirmPass) {
          if (errorAlert) {
            errorAlert.textContent = 'Please fill out all required fields to create your account.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          if (errorAlert) {
            errorAlert.textContent = 'Please provide a valid email address (e.g. name@example.com).';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Password length check
        if (password.length < 6) {
          if (errorAlert) {
            errorAlert.textContent = 'Password must be at least 6 characters in length.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Password confirmation match
        if (password !== confirmPass) {
          if (errorAlert) {
            errorAlert.textContent = 'Passwords do not match. Please ensure both password fields match.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Terms acceptance
        if (!termsAgreed) {
          if (errorAlert) {
            errorAlert.textContent = 'Please accept AirAsia Terms of Service and Privacy Policy to continue.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Check uniqueness in registry
        const registry = getUsersRegistry();
        const existing = registry.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
          if (errorAlert) {
            errorAlert.textContent = 'An account with this email address already exists. Please sign in instead.';
            errorAlert.style.display = 'block';
          }
          return;
        }

        // Create new account
        const newUser = {
          id: 'usr-' + Date.now(),
          name: name,
          email: email,
          phone: phone,
          password: password,
          joinedAt: new Date().toISOString()
        };

        saveUserToRegistry(newUser);

        // Auto login session
        const sessionUser = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          joinedAt: newUser.joinedAt
        };

        setCurrentUser(sessionUser);

        // Reset form
        formSignUp.reset();
        showToast(`Welcome to AirAsia, ${name}! Your account has been created.`, 'success');
        switchView('flight');
      });
    }
  }

  function initClearDataSystem() {
    const clearModal = document.getElementById('clear-data-modal');
    const confirmClearBtn = document.getElementById('btn-confirm-clear-data');
    const cancelClearBtn = document.getElementById('btn-cancel-clear-data');
    const closeClearBtn = document.getElementById('btn-close-clear-modal');
    const clearAllDataBtn = document.getElementById('btn-clear-all-data');

    function openClearModal(e) {
      if (e) e.preventDefault();
      if (clearModal) clearModal.classList.add('open');
    }

    function closeClearModal() {
      if (clearModal) clearModal.classList.remove('open');
    }

    if (clearAllDataBtn) {
      clearAllDataBtn.addEventListener('click', openClearModal);
    }

    if (confirmClearBtn) {
      confirmClearBtn.addEventListener('click', () => {
        try {
          store.removeItem(FLIGHT_BOOKINGS_KEY);
          store.removeItem(HOTEL_BOOKINGS_KEY);
          closeClearModal();
          showToast('All saved demo bookings have been cleared.', 'premium-success');
          if (State.currentView === 'bookings') {
            renderBookingsPage();
          }
        } catch (e) {
          console.error(e);
        }
      });
    }

    if (cancelClearBtn) {
      cancelClearBtn.addEventListener('click', closeClearModal);
    }

    if (closeClearBtn) {
      closeClearBtn.addEventListener('click', closeClearModal);
    }

    if (clearModal) {
      clearModal.addEventListener('click', (e) => {
        if (e.target === clearModal) {
          closeClearModal();
        }
      });
    }
  }

  // Seed sample bookings & registered test user if completely empty
  function seedInitialDemoBookings() {
    try {
      if (!store.getItem(AUTH_REGISTRY_KEY)) {
        const initialUser = {
          id: 'usr-1',
          name: 'Yasin Chowdhury',
          email: 'yasinchowdhury999@gmail.com',
          phone: '+880 1712 345678',
          password: 'pass1234',
          joinedAt: new Date().toISOString()
        };
        store.setItem(AUTH_REGISTRY_KEY, JSON.stringify([initialUser]));
      }

      if (!store.getItem(FLIGHT_BOOKINGS_KEY)) {
        const initialFlights = [
          {
            id: 'AA-7K9W21',
            type: 'flight',
            route: 'Dhaka (DAC) → Kuala Lumpur (KUL)',
            origin: 'DAC',
            destination: 'KUL',
            tripType: 'oneway',
            date: getFutureDate(3),
            flightNumber: 'AK-71',
            airline: 'AirAsia',
            passengersCount: 1,
            passengersList: [{ name: 'Yasin Chowdhury', type: 'Adult', seat: '1A' }],
            totalPrice: 27000,
            status: 'Confirmed',
            isSimulatedPayment: true,
            createdAt: new Date().toISOString()
          }
        ];
        store.setItem(FLIGHT_BOOKINGS_KEY, JSON.stringify(initialFlights));
      }

      if (!store.getItem(HOTEL_BOOKINGS_KEY)) {
        const initialHotels = [
          {
            id: 'HT-4B81QX',
            type: 'hotel',
            hotelName: 'Grand Pacific Suites & Spa',
            city: 'Kuala Lumpur',
            roomType: 'Deluxe King Room',
            checkIn: getFutureDate(3),
            checkOut: getFutureDate(6),
            nights: 3,
            rooms: 1,
            guestCount: 2,
            leadGuest: 'Yasin Chowdhury',
            email: 'yasinchowdhury999@gmail.com',
            phone: '+880 1712 345678',
            totalPrice: 28050,
            status: 'Confirmed',
            isSimulatedPayment: true,
            createdAt: new Date().toISOString()
          }
        ];
        store.setItem(HOTEL_BOOKINGS_KEY, JSON.stringify(initialHotels));
      }
    } catch (err) {
      console.error('Failed seeding initial bookings:', err);
    }
  }

  // ==========================================================================
  // Multi-Currency Engine & Exchange Rates (Base: BDT)
  // ==========================================================================
  const CURRENCIES = {
    BDT: { code: 'BDT', symbol: '৳', name: 'Bangladeshi Taka', rate: 1, decimals: 0, flag: '🇧🇩' },
    MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', rate: 0.035, decimals: 2, flag: '🇲🇾' },
    USD: { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.0082, decimals: 2, flag: '🇺🇸' },
    THB: { code: 'THB', symbol: '฿', name: 'Thai Baht', rate: 0.28, decimals: 0, flag: '🇹🇭' },
    SGD: { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rate: 0.0108, decimals: 2, flag: '🇸🇬' },
    IDR: { code: 'IDR', symbol: 'Rp', name: 'Indonesian Rupiah', rate: 125, decimals: 0, flag: '🇮🇩' },
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 0.70, decimals: 0, flag: '🇮🇳' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.0076, decimals: 2, flag: '🇪🇺' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0064, decimals: 2, flag: '🇬🇧' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rate: 0.0125, decimals: 2, flag: '🇦🇺' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rate: 0.0112, decimals: 2, flag: '🇨🇦' },
    AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rate: 0.030, decimals: 2, flag: '🇦🇪' }
  };

  // ==========================================================================
  // Application State
  // ==========================================================================
  const State = {
    selectedCurrency: 'BDT',
    currentView: 'flight', // 'flight' | 'flight-results' | 'flight-booking' | 'payment' | 'flight-confirmation' | 'hotel' | 'hotel-confirmation' | 'bookings' | 'about'
    flightSearch: {
      tripType: 'oneway', // 'oneway' | 'round'
      origin: 'DAC',
      destination: 'KUL',
      departureDate: getFutureDate(1),
      returnDate: getFutureDate(4),
      adults: 1,
      children: 0,
      infants: 0,
      cabin: 'Economy'
    },
    flightResults: {
      searchedRoute: null,
      outboundList: [],
      returnList: [],
      activeRoundTripStep: 'outbound', // 'outbound' | 'return'
      selectedOutbound: null,
      selectedReturn: null,
      filters: {
        maxPrice: 60000,
        stops: 'all', // 'all' | 'direct' | '1stop'
        depTime: 'all', // 'all' | 'morning' | 'afternoon' | 'evening'
        cabin: 'all', // 'all' | 'Economy' | 'Premium Flatbed'
        baggage: 'all' // 'all' | 'checked-included'
      },
      sortBy: 'price-asc'
    },
    flightBooking: {
      passengers: [],
      contact: { email: '', phone: '' },
      addons: { baggageKg: 0, meal: false, insurance: false },
      assignedSeats: {}, // { 0: '1A', 1: '1B' }
      activePaxIndexForSeat: 0,
      calculatedBaseFare: 0,
      calculatedTaxes: 0,
      calculatedSeatsFee: 0,
      calculatedAddons: 0,
      calculatedGrandTotal: 0,
      lastConfirmedBooking: null
    },
    hotelSearch: {
      destination: 'Kuala Lumpur',
      checkInDate: getFutureDate(1),
      checkOutDate: getFutureDate(4),
      guests: 2,
      rooms: 1
    },
    hotelResults: {
      list: [],
      filters: {
        maxPrice: 25000,
        rating: 0,
        amenity: 'all'
      }
    },
    activeHotelDetail: null,
    hotelBooking: {
      hotel: null,
      room: null,
      leadGuest: '',
      email: '',
      phone: '',
      specialRequests: '',
      lastConfirmedBooking: null
    }
  };

  // ==========================================================================
  // Date Helpers & Formatting
  // ==========================================================================
  function getFutureDate(daysAhead) {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  function formatDisplayDate(dateStr) {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  function formatPrice(amountInBDT, options = {}) {
    const currKey = State.selectedCurrency || 'BDT';
    const curr = CURRENCIES[currKey] || CURRENCIES['BDT'];
    const converted = (Number(amountInBDT) || 0) * curr.rate;
    let formattedNum;
    if (curr.decimals === 0) {
      formattedNum = Math.round(converted).toLocaleString('en-US');
    } else {
      formattedNum = converted.toLocaleString('en-US', {
        minimumFractionDigits: curr.decimals,
        maximumFractionDigits: curr.decimals
      });
    }

    if (options.plainNumber) {
      return formattedNum;
    }
    return `${curr.code} ${formattedNum}`;
  }

  function formatBDT(amount) {
    return formatPrice(amount);
  }

  function renderFlightBookingAddonLabels() {
    const bagSelect = document.getElementById('addon-baggage-select');
    if (bagSelect) {
      const currentVal = bagSelect.value;
      bagSelect.innerHTML = `
        <option value="0">None (Free)</option>
        <option value="20">+20 kg (+${formatPrice(2500)}/pax)</option>
        <option value="30">+30 kg (+${formatPrice(3800)}/pax)</option>
      `;
      bagSelect.value = currentVal;
    }
    const mealPriceEl = document.getElementById('addon-meal-price');
    if (mealPriceEl) {
      mealPriceEl.textContent = `+${formatPrice(550)}`;
    }
    const insPriceEl = document.getElementById('addon-insurance-price');
    if (insPriceEl) {
      insPriceEl.textContent = `+${formatPrice(1200)}`;
    }
  }

  function updatePriceSliderLabels() {
    const priceMin = document.getElementById('filter-price-min');
    const priceVal = document.getElementById('filter-price-val');
    if (priceMin) priceMin.textContent = formatPrice(5000);
    if (priceVal) priceVal.textContent = formatPrice(State.flightResults.filters.maxPrice);
  }

  function setCurrency(code, notify = true) {
    if (!CURRENCIES[code]) return;
    State.selectedCurrency = code;
    try {
      localStorage.setItem('airasia_selected_currency', code);
    } catch {
      // ignore
    }

    const curr = CURRENCIES[code];

    // Update Header Display
    const symbolEl = document.getElementById('header-currency-symbol');
    const codeEl = document.getElementById('header-currency-code');
    if (symbolEl) symbolEl.textContent = curr.symbol;
    if (codeEl) codeEl.textContent = curr.code;

    // Update Mobile Select
    const mobileSel = document.getElementById('mobile-currency-select');
    if (mobileSel && mobileSel.value !== code) {
      mobileSel.value = code;
    }

    // Update active class in dropdown options
    const items = document.querySelectorAll('.currency-option-item');
    items.forEach(btn => {
      if (btn.dataset.currency === code) {
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      }
    });

    // Close dropdown
    const wrap = document.getElementById('currency-dropdown-wrap');
    if (wrap) wrap.classList.remove('open');
    const selBtn = document.getElementById('currency-selector-btn');
    if (selBtn) selBtn.setAttribute('aria-expanded', 'false');

    // Update dynamic addon labels & slider labels
    renderFlightBookingAddonLabels();
    updatePriceSliderLabels();

    // Re-render active view to immediately reflect the new currency
    if (State.currentView === 'flight') {
      initHomeWidgets();
    } else if (State.currentView === 'flight-results') {
      renderFlightCards();
    } else if (State.currentView === 'flight-booking') {
      updateFlightBookingPriceBreakdown();
    } else if (State.currentView === 'flight-confirmation') {
      if (State.flightBooking.lastConfirmedBooking) {
        const totalEl = document.getElementById('confirmation-total-text');
        if (totalEl) totalEl.textContent = formatPrice(State.flightBooking.lastConfirmedBooking.totalPrice);
      }
    } else if (State.currentView === 'hotel') {
      renderHotelsList();
    } else if (State.currentView === 'hotel-confirmation') {
      if (State.hotelBooking.lastConfirmedBooking) {
        const totalEl = document.getElementById('hotel-confirm-total');
        if (totalEl) totalEl.textContent = formatPrice(State.hotelBooking.lastConfirmedBooking.totalPrice);
      }
    } else if (State.currentView === 'bookings') {
      renderBookingsPage();
    }

    if (notify) {
      showToast(`Currency changed to ${curr.name} (${curr.code})`, 'info');
    }
  }

  function initCurrencySelector() {
    const wrap = document.getElementById('currency-dropdown-wrap');
    const selBtn = document.getElementById('currency-selector-btn');
    const optionsList = document.getElementById('currency-options-list');
    const mobileSelect = document.getElementById('mobile-currency-select');

    if (!wrap || !selBtn) return;

    // Load saved currency or default to BDT
    let saved = 'BDT';
    try {
      saved = localStorage.getItem('airasia_selected_currency') || 'BDT';
    } catch {
      saved = 'BDT';
    }
    if (!CURRENCIES[saved]) saved = 'BDT';
    State.selectedCurrency = saved;

    // Populate dropdown options
    if (optionsList) {
      optionsList.innerHTML = '';
      Object.keys(CURRENCIES).forEach(cCode => {
        const c = CURRENCIES[cCode];
        const isSel = cCode === saved;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `currency-option-item ${isSel ? 'active' : ''}`;
        btn.dataset.currency = cCode;
        btn.setAttribute('role', 'option');
        btn.setAttribute('aria-selected', isSel ? 'true' : 'false');
        btn.innerHTML = `
          <div class="currency-option-left">
            <span class="currency-option-flag">${c.flag}</span>
            <div>
              <span class="currency-option-code">${c.code}</span>
              <span style="font-size:12px; color:var(--text-muted); margin-left:3px;">(${c.symbol})</span>
            </div>
            <span class="currency-option-name">${escapeHtml(c.name)}</span>
          </div>
          <span class="currency-option-check">✓</span>
        `;
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          setCurrency(cCode, true);
        });
        optionsList.appendChild(btn);
      });
    }

    // Populate mobile select
    if (mobileSelect) {
      mobileSelect.innerHTML = '';
      Object.keys(CURRENCIES).forEach(cCode => {
        const c = CURRENCIES[cCode];
        const opt = document.createElement('option');
        opt.value = cCode;
        opt.textContent = `${c.flag} ${c.code} (${c.symbol}) - ${c.name}`;
        if (cCode === saved) opt.selected = true;
        mobileSelect.appendChild(opt);
      });
      mobileSelect.addEventListener('change', (e) => {
        setCurrency(e.target.value, true);
      });
    }

    // Toggle dropdown on button click
    selBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrap.classList.toggle('open');
      selBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!wrap.contains(e.target)) {
        wrap.classList.remove('open');
        selBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrap.classList.contains('open')) {
        wrap.classList.remove('open');
        selBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Apply saved currency without notification on init
    setCurrency(saved, false);
  }

  function calculateNights(checkIn, checkOut) {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.abs(d2 - d1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  }

  function generateReference(prefix) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `${prefix}-${code}`;
  }

  function getAirport(code) {
    return AIRPORTS.find(a => a.code === code) || { code, city: code, country: '', name: code, tz: 6 };
  }

  // ==========================================================================
  // Mock Flight Generator (Consistent & Timezone Aware, AIRASIA_FLIGHTS_DATA first)
  // ==========================================================================
  function generateMockFlights(originCode, destinationCode, dateStr) {
    const origin = getAirport(originCode);
    const dest = getAirport(destinationCode);

    // Primary: Query from offline window.AIRASIA_FLIGHTS_DATA dataset if present
    if (typeof window !== 'undefined' && Array.isArray(window.AIRASIA_FLIGHTS_DATA)) {
      const staticMatches = window.AIRASIA_FLIGHTS_DATA.filter(f => {
        const o = (f.origin || f.originCode || '').toUpperCase();
        const d = (f.destination || f.destCode || '').toUpperCase();
        return o === originCode && d === destinationCode;
      });

      if (staticMatches.length > 0) {
        return staticMatches.map((f, index) => {
          const depHour = parseInt((f.departureTime || '08:00').split(':')[0], 10) || 8;
          const durMins = f.durationMinutes || 210;
          const isDirect = f.stops === 0 || f.stopsText === 'Direct' || f.isDirect === true;
          const stopsText = f.stopsText || (isDirect ? 'Non-stop' : `${f.stops || 1} stop via KUL`);
          const adultBase = Number(f.priceBDT || f.adultPrice || f.baseFareBDT || 24500);
          const cabin = f.cabinClass || f.class || 'Economy';
          const baggage = f.baggageAllowance || '7 kg Cabin Baggage included';
          const hasCheckedBag = Boolean(
            baggage.includes('20') || baggage.includes('30') || baggage.toLowerCase().includes('checked')
          );

          return {
            id: `fl-${originCode}-${destCode(destinationCode)}-${index}-${f.flightNumber || 'AK'}-${dateStr}`,
            flightNumber: f.flightNumber || `AK-${500 + index}`,
            airline: f.airline || 'AirAsia',
            aircraft: f.aircraft || 'Airbus A320neo',
            originCode,
            originCity: f.originCity || origin.city,
            originAirport: f.originAirport || origin.name,
            destCode: destinationCode,
            destCity: f.destinationCity || f.destCity || dest.city,
            destAirport: f.destinationAirport || f.destAirport || dest.name,
            date: dateStr,
            departureTime: f.departureTime || '08:00',
            arrivalTime: f.arrivalTime || '12:00',
            departureHour: depHour,
            durationMinutes: durMins,
            durationFormatted: f.duration || f.durationFormatted || `${Math.floor(durMins / 60)}h ${durMins % 60}m`,
            stops: stopsText,
            isDirect,
            cabinClass: cabin,
            baggageAllowance: baggage,
            hasCheckedBag,
            adultPrice: adultBase,
            seatPitch: f.seatPitch || (cabin === 'Premium Flatbed' ? '59 inches • Full Flatbed' : '29 inches standard • Leather seats'),
            mealOption: cabin === 'Premium Flatbed' ? 'Complimentary Santan Meal included' : 'Santan in-flight meals available for pre-order'
          };
        });
      }
    }

    // Fallback generator for unlisted city-pairs to ensure zero broken searches
    let baseDurationMinutes = 230; // 3h 50m default
    let baseDistanceFare = 24500;

    const pair = `${originCode}-${destinationCode}`;
    if (pair === 'KUL-SIN' || pair === 'SIN-KUL') {
      baseDurationMinutes = 55;
      baseDistanceFare = 7800;
    } else if (pair === 'DAC-KUL' || pair === 'KUL-DAC') {
      baseDurationMinutes = 230;
      baseDistanceFare = 24500;
    } else if (pair === 'DAC-DMK' || pair === 'DMK-DAC') {
      baseDurationMinutes = 150;
      baseDistanceFare = 22400;
    } else if (pair === 'KUL-DPS' || pair === 'DPS-KUL') {
      baseDurationMinutes = 180;
      baseDistanceFare = 14500;
    } else if (pair === 'KUL-CGK' || pair === 'CGK-KUL') {
      baseDurationMinutes = 120;
      baseDistanceFare = 11500;
    } else if (pair === 'DAC-DPS' || pair === 'DPS-DAC') {
      baseDurationMinutes = 430;
      baseDistanceFare = 34500;
    }

    // Generate 5 schedule slots
    const schedules = [
      { flightNo: 'AK-71', airline: 'AirAsia', depHour: 1, depMin: 25, aircraft: 'Airbus A320neo', stopType: 'direct', priceVar: 0, cabinClass: 'Economy', baggage: '7 kg Cabin Baggage included', hasChecked: false },
      { flightNo: 'D7-182', airline: 'AirAsia X', depHour: 7, depMin: 45, aircraft: 'Airbus A330-300', stopType: 'direct', priceVar: 1800, cabinClass: 'Premium Flatbed', baggage: '20 kg Checked + 7 kg Cabin included', hasChecked: true },
      { flightNo: 'AK-77', airline: 'AirAsia', depHour: 13, depMin: 15, aircraft: 'Airbus A320', stopType: 'direct', priceVar: -900, cabinClass: 'Economy', baggage: '7 kg Cabin Baggage included', hasChecked: false },
      { flightNo: 'FD-312', airline: 'Thai AirAsia', depHour: 18, depMin: 30, aircraft: 'Airbus A320neo', stopType: 'direct', priceVar: 2400, cabinClass: 'Economy', baggage: '20 kg Checked + 7 kg Cabin included', hasChecked: true },
      { flightNo: 'QZ-204', airline: 'Indonesia AirAsia', depHour: 10, depMin: 10, aircraft: 'Airbus A320', stopType: '1stop', extraMins: 110, priceVar: -3200, cabinClass: 'Economy', baggage: '7 kg Cabin Baggage included', hasChecked: false }
    ];

    return schedules.map((slot, index) => {
      const durMins = baseDurationMinutes + (slot.extraMins || 0);
      const hours = Math.floor(durMins / 60);
      const mins = durMins % 60;

      // Timezone shift calculation
      const tzShift = dest.tz - origin.tz;
      const arrTotalMins = (slot.depHour * 60 + slot.depMin) + durMins + (tzShift * 60);
      
      const arrHour = Math.floor((arrTotalMins % 1440 + 1440) % 1440 / 60);
      const arrMin = Math.floor((arrTotalMins % 1440 + 1440) % 60);
      const nextDay = arrTotalMins >= 1440;

      const depTimeStr = `${String(slot.depHour).padStart(2, '0')}:${String(slot.depMin).padStart(2, '0')}`;
      const arrTimeStr = `${String(arrHour).padStart(2, '0')}:${String(arrMin).padStart(2, '0')}` + (nextDay ? ' (+1)' : '');
      const durationStr = `${hours}h ${mins}m`;

      const adultBase = Math.max(5000, baseDistanceFare + slot.priceVar);

      return {
        id: `fl-${originCode}-${destCode(destinationCode)}-${index}-${slot.flightNo}`,
        flightNumber: slot.flightNo,
        airline: slot.airline,
        aircraft: slot.aircraft,
        originCode,
        originCity: origin.city,
        originAirport: origin.name,
        destCode: destinationCode,
        destCity: dest.city,
        destAirport: dest.name,
        date: dateStr,
        departureTime: depTimeStr,
        arrivalTime: arrTimeStr,
        departureHour: slot.depHour,
        durationMinutes: durMins,
        durationFormatted: durationStr,
        stops: slot.stopType === 'direct' ? 'Non-stop' : '1 stop via KUL',
        isDirect: slot.stopType === 'direct',
        cabinClass: slot.cabinClass || 'Economy',
        baggageAllowance: slot.baggage,
        hasCheckedBag: slot.hasChecked,
        adultPrice: adultBase,
        seatPitch: slot.cabinClass === 'Premium Flatbed' ? '59 inches • Full Flatbed' : '29 inches standard • Leather seats',
        mealOption: slot.cabinClass === 'Premium Flatbed' ? 'Complimentary Santan Meal included' : 'Santan in-flight meals available for pre-order'
      };
    });
  }

  function destCode(c) { return c; }

  // ==========================================================================
  // Toast Notification Helper
  // ==========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      <span>${escapeHtml(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ==========================================================================
  // Navigation & View Switching
  // ==========================================================================
  function switchView(viewName) {
    State.currentView = viewName;
    const views = document.querySelectorAll('.app-view');
    views.forEach(v => {
      v.style.display = 'none';
      v.classList.remove('active');
    });

    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.style.display = 'block';
      target.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update navbar active state
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkView = link.dataset.targetView;
      if (linkView === viewName || (viewName.startsWith('flight') && linkView === 'flight') || (viewName.startsWith('hotel') && linkView === 'hotel')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update smooth sliding pill animation in the navigation panel
    requestAnimationFrame(updateNavSlidingPill);

    // Close mobile drawer if open
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.classList.remove('open');

    // Re-render specific views on navigation
    if (viewName === 'bookings') {
      renderBookingsPage();
    } else if (viewName === 'hotel') {
      renderHotelsList();
    } else if (viewName === 'auth') {
      const isSignUpActive = document.getElementById('tab-page-signup')?.classList.contains('active');
      showAuthTab(isSignUpActive ? 'signup' : 'signin');
    }

    setTimeout(() => {
      observeScrollRevealElements();
    }, 60);
  }

  function updateNavSlidingPill() {
    const nav = document.querySelector('.main-nav');
    const pill = document.getElementById('nav-sliding-pill');
    if (!nav || !pill) return;
    const activeLink = nav.querySelector('.nav-link.active');
    if (activeLink && activeLink.offsetParent !== null) {
      const navRect = nav.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();
      const offsetLeft = linkRect.left - navRect.left;
      const width = linkRect.width;
      pill.style.transform = `translateX(${offsetLeft}px)`;
      pill.style.width = `${width}px`;
      pill.style.opacity = '1';
    } else {
      pill.style.opacity = '0';
    }
  }

  // ==========================================================================
  // Flight Search Form & Interactivity
  // ==========================================================================
  function initFlightSearchForm() {
    // Trip type toggle
    const tripTypeBtns = document.querySelectorAll('.trip-type-btn');
    const returnDateGroup = document.getElementById('return-date-group');

    tripTypeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tripTypeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const type = btn.dataset.tripType;
        State.flightSearch.tripType = type;
        if (returnDateGroup) {
          returnDateGroup.style.display = type === 'round' ? 'flex' : 'none';
        }
      });
    });

    // Airport Selectors Dropdowns
    setupAirportDropdown('origin', 'DAC');
    setupAirportDropdown('destination', 'KUL');

    // Swap Airports Button
    const swapBtn = document.getElementById('btn-swap-airports');
    if (swapBtn) {
      swapBtn.addEventListener('click', () => {
        const temp = State.flightSearch.origin;
        State.flightSearch.origin = State.flightSearch.destination;
        State.flightSearch.destination = temp;

        updateAirportDisplay('origin', State.flightSearch.origin);
        updateAirportDisplay('destination', State.flightSearch.destination);
      });
    }

    // Dates Setup (min date today)
    const today = new Date().toISOString().split('T')[0];
    const depDateInput = document.getElementById('flight-dep-date');
    const retDateInput = document.getElementById('flight-ret-date');

    if (depDateInput) {
      depDateInput.min = today;
      depDateInput.value = State.flightSearch.departureDate;
      depDateInput.addEventListener('change', (e) => {
        State.flightSearch.departureDate = e.target.value;
        if (retDateInput) {
          retDateInput.min = e.target.value;
          if (retDateInput.value && retDateInput.value < e.target.value) {
            retDateInput.value = e.target.value;
            State.flightSearch.returnDate = e.target.value;
          }
        }
      });
    }

    if (retDateInput) {
      retDateInput.min = State.flightSearch.departureDate;
      retDateInput.value = State.flightSearch.returnDate;
      retDateInput.addEventListener('change', (e) => {
        State.flightSearch.returnDate = e.target.value;
      });
    }

    // Passengers Popover
    setupPassengersSelector();

    // Flight Search Submit
    const searchBtn = document.getElementById('btn-search-flights');
    if (searchBtn) {
      searchBtn.addEventListener('click', handleFlightSearchSubmit);
    }

    // Reset Flight Search Form Button
    const resetBtn = document.getElementById('btn-reset-flight-search');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        // Reset trip type to one-way
        const oneWayBtn = document.getElementById('btn-trip-oneway');
        if (oneWayBtn) oneWayBtn.click();

        // Reset airports to default DAC -> KUL
        State.flightSearch.origin = 'DAC';
        State.flightSearch.destination = 'KUL';
        updateAirportDisplay('origin', 'DAC');
        updateAirportDisplay('destination', 'KUL');

        // Reset dates
        const todayStr = new Date().toISOString().split('T')[0];
        if (depDateInput) {
          depDateInput.value = todayStr;
          State.flightSearch.departureDate = todayStr;
        }
        if (retDateInput) {
          retDateInput.value = '';
          State.flightSearch.returnDate = '';
        }

        // Reset passengers to 1 Adult
        State.flightSearch.passengers = { adults: 1, children: 0, infants: 0 };
        const countAdults = document.getElementById('count-adults');
        const countChildren = document.getElementById('count-children');
        const countInfants = document.getElementById('count-infants');
        if (countAdults) countAdults.textContent = '1';
        if (countChildren) countChildren.textContent = '0';
        if (countInfants) countInfants.textContent = '0';
        updatePassengersDisplay();

        // Clear error message
        const errEl = document.getElementById('flight-search-error');
        if (errEl) {
          errEl.classList.remove('show');
          errEl.textContent = '';
        }

        showToast('Search filters reset to default', 'info');
      });
    }
  }

  function setupAirportDropdown(type, initialCode) {
    const displayBtn = document.getElementById(`${type}-display-btn`);
    const menu = document.getElementById(`${type}-dropdown-menu`);
    const searchInput = document.getElementById(`${type}-search-input`);
    const optionsList = document.getElementById(`${type}-options-list`);

    State.flightSearch[type] = initialCode;
    updateAirportDisplay(type, initialCode);

    function renderOptions(filter = '') {
      if (!optionsList) return;
      optionsList.innerHTML = '';
      const filtered = AIRPORTS.filter(a => {
        const text = `${a.city} ${a.name} ${a.code} ${a.country}`.toLowerCase();
        return text.includes(filter.toLowerCase());
      });

      filtered.forEach(a => {
        const div = document.createElement('div');
        div.className = 'airport-option-item';
        div.innerHTML = `
          <div class="airport-option-info">
            <span class="airport-option-city">${escapeHtml(a.city)}, ${escapeHtml(a.country)}</span>
            <span class="airport-option-name">${escapeHtml(a.name)}</span>
          </div>
          <span class="airport-option-code">${escapeHtml(a.code)}</span>
        `;
        div.addEventListener('click', () => {
          State.flightSearch[type] = a.code;
          updateAirportDisplay(type, a.code);
          if (menu) menu.classList.remove('open');
          if (displayBtn) displayBtn.classList.remove('active');
        });
        optionsList.appendChild(div);
      });
    }

    renderOptions();

    if (displayBtn) {
      displayBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // close other menus
        document.querySelectorAll('.airport-dropdown-menu, .passengers-popover').forEach(m => {
          if (m !== menu) m.classList.remove('open');
        });
        const isOpen = menu && menu.classList.contains('open');
        if (menu) menu.classList.toggle('open', !isOpen);
        displayBtn.classList.toggle('active', !isOpen);
        if (!isOpen && searchInput) {
          searchInput.value = '';
          renderOptions('');
          setTimeout(() => searchInput.focus(), 50);
        }
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderOptions(e.target.value);
      });
      searchInput.addEventListener('click', (e) => e.stopPropagation());
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (menu && !menu.contains(e.target) && displayBtn && !displayBtn.contains(e.target)) {
        menu.classList.remove('open');
        displayBtn.classList.remove('active');
      }
    });
  }

  function updateAirportDisplay(type, code) {
    const airport = getAirport(code);
    const codeEl = document.getElementById(`${type}-display-code`);
    const cityEl = document.getElementById(`${type}-display-city`);
    if (codeEl) codeEl.textContent = airport.code;
    if (cityEl) cityEl.textContent = `${airport.city} (${airport.country})`;
  }

  function setupPassengersSelector() {
    const triggerBtn = document.getElementById('passengers-display-btn');
    const popover = document.getElementById('passengers-popover');
    const summaryEl = document.getElementById('passengers-display-text');

    function updateSummary() {
      const { adults, children, infants } = State.flightSearch;
      const total = adults + children + infants;
      let text = `${adults} Adult${adults > 1 ? 's' : ''}`;
      if (children > 0) text += `, ${children} Child${children > 1 ? 'ren' : ''}`;
      if (infants > 0) text += `, ${infants} Infant${infants > 1 ? 's' : ''}`;
      if (summaryEl) summaryEl.textContent = text;

      // Update counters in popover
      const adultsVal = document.getElementById('count-adults');
      const childrenVal = document.getElementById('count-children');
      const infantsVal = document.getElementById('count-infants');
      if (adultsVal) adultsVal.textContent = adults;
      if (childrenVal) childrenVal.textContent = children;
      if (infantsVal) infantsVal.textContent = infants;

      // Disable/enable minus/plus buttons
      const btnMinusAdults = document.getElementById('btn-minus-adults');
      const btnPlusInfants = document.getElementById('btn-plus-infants');
      if (btnMinusAdults) btnMinusAdults.disabled = adults <= 1;
      if (btnPlusInfants) btnPlusInfants.disabled = infants >= adults;
    }

    if (triggerBtn) {
      triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.airport-dropdown-menu').forEach(m => m.classList.remove('open'));
        const isOpen = popover && popover.classList.contains('open');
        if (popover) popover.classList.toggle('open', !isOpen);
      });
    }

    document.addEventListener('click', (e) => {
      if (popover && !popover.contains(e.target) && triggerBtn && !triggerBtn.contains(e.target)) {
        popover.classList.remove('open');
      }
    });

    // Control buttons
    ['adults', 'children', 'infants'].forEach(cat => {
      const plusBtn = document.getElementById(`btn-plus-${cat}`);
      const minusBtn = document.getElementById(`btn-minus-${cat}`);

      if (plusBtn) {
        plusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (cat === 'adults') {
            if (State.flightSearch.adults < 9) State.flightSearch.adults++;
          } else if (cat === 'children') {
            if (State.flightSearch.children < 8) State.flightSearch.children++;
          } else if (cat === 'infants') {
            if (State.flightSearch.infants < State.flightSearch.adults) State.flightSearch.infants++;
          }
          updateSummary();
        });
      }

      if (minusBtn) {
        minusBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (cat === 'adults') {
            if (State.flightSearch.adults > 1) {
              State.flightSearch.adults--;
              if (State.flightSearch.infants > State.flightSearch.adults) {
                State.flightSearch.infants = State.flightSearch.adults;
              }
            }
          } else if (cat === 'children') {
            if (State.flightSearch.children > 0) State.flightSearch.children--;
          } else if (cat === 'infants') {
            if (State.flightSearch.infants > 0) State.flightSearch.infants--;
          }
          updateSummary();
        });
      }
    });

    updateSummary();
  }

  function handleFlightSearchSubmit() {
    const errorEl = document.getElementById('flight-search-error');
    if (errorEl) {
      errorEl.classList.remove('show');
      errorEl.textContent = '';
    }

    const { origin, destination, departureDate, returnDate, tripType, adults, infants } = State.flightSearch;

    // Validations
    if (origin === destination) {
      showFormError('Origin and destination airport cannot be the same.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (departureDate < today) {
      showFormError('Departure date cannot be in the past.');
      return;
    }

    if (tripType === 'round') {
      if (!returnDate || returnDate < departureDate) {
        showFormError('Return date must be on or after departure date.');
        return;
      }
    }

    if (adults < 1) {
      showFormError('At least 1 adult passenger is required.');
      return;
    }

    if (infants > adults) {
      showFormError('Number of infants cannot exceed number of adult passengers.');
      return;
    }

    // Generate flights
    State.flightResults.outboundList = generateMockFlights(origin, destination, departureDate);
    State.flightResults.returnList = tripType === 'round' ? generateMockFlights(destination, origin, returnDate) : [];
    State.flightResults.activeRoundTripStep = 'outbound';
    State.flightResults.selectedOutbound = null;
    State.flightResults.selectedReturn = null;
    State.flightResults.searchedRoute = {
      origin,
      destination,
      departureDate,
      returnDate,
      tripType,
      adults,
      children: State.flightSearch.children,
      infants
    };

    renderFlightResultsView();
    switchView('flight-results');
  }

  function showFormError(msg) {
    const errorEl = document.getElementById('flight-search-error');
    if (errorEl) {
      errorEl.textContent = msg;
      errorEl.classList.add('show');
    } else {
      showToast(msg, 'error');
    }
  }

  // ==========================================================================
  // Flight Results Rendering, Filtering & Sorting
  // ==========================================================================
  function renderFlightResultsView() {
    const summaryRouteEl = document.getElementById('results-summary-route');
    const summaryMetaEl = document.getElementById('results-summary-meta');
    const stepBanner = document.getElementById('round-trip-step-banner');

    const s = State.flightResults.searchedRoute;
    if (!s) return;

    const orig = getAirport(s.origin);
    const dest = getAirport(s.destination);

    if (summaryRouteEl) {
      summaryRouteEl.innerHTML = `
        <span>${escapeHtml(orig.city)} (${s.origin})</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
        <span>${escapeHtml(dest.city)} (${s.destination})</span>
      `;
    }

    if (summaryMetaEl) {
      const paxCount = s.adults + s.children + s.infants;
      const tripText = s.tripType === 'round' ? `Round Trip • Dep: ${formatDisplayDate(s.departureDate)} - Ret: ${formatDisplayDate(s.returnDate)}` : `One Way • ${formatDisplayDate(s.departureDate)}`;
      summaryMetaEl.textContent = `${tripText} • ${paxCount} Passenger${paxCount > 1 ? 's' : ''} • Economy`;
    }

    // Step banner for round trips
    if (stepBanner) {
      if (s.tripType === 'round') {
        stepBanner.style.display = 'flex';
        const isOutbound = State.flightResults.activeRoundTripStep === 'outbound';
        stepBanner.innerHTML = `
          <div>
            <strong>${isOutbound ? 'Step 1 of 2: Select Outbound Flight' : 'Step 2 of 2: Select Return Flight'}</strong>
            <span style="margin-left: 8px; font-weight: normal;">
              ${isOutbound ? `${orig.city} to ${dest.city} on ${formatDisplayDate(s.departureDate)}` : `${dest.city} to ${orig.city} on ${formatDisplayDate(s.returnDate)}`}
            </span>
          </div>
          ${State.flightResults.selectedOutbound && !isOutbound ? `<button id="btn-back-to-outbound" style="font-size:12px; font-weight:700; color:var(--primary); text-decoration:underline;">Change Outbound</button>` : ''}
        `;

        const backBtn = document.getElementById('btn-back-to-outbound');
        if (backBtn) {
          backBtn.addEventListener('click', () => {
            State.flightResults.activeRoundTripStep = 'outbound';
            renderFlightCards();
            renderFlightResultsView();
          });
        }
      } else {
        stepBanner.style.display = 'none';
      }
    }

    initFlightFilters();
    renderFlightCards();
  }

  function initFlightFilters() {
    const priceSlider = document.getElementById('filter-price-slider');
    const priceVal = document.getElementById('filter-price-val');
    const stopsRadios = document.querySelectorAll('input[name="filter-stops"]');
    const timeRadios = document.querySelectorAll('input[name="filter-time"]');
    const cabinRadios = document.querySelectorAll('input[name="filter-cabin"]');
    const baggageRadios = document.querySelectorAll('input[name="filter-baggage"]');
    const sortSelect = document.getElementById('results-sort-select');
    const resetBtn = document.getElementById('btn-reset-flight-filters');

    if (priceSlider && priceVal) {
      priceSlider.value = State.flightResults.filters.maxPrice;
      priceVal.textContent = formatBDT(State.flightResults.filters.maxPrice);
      priceSlider.oninput = (e) => {
        State.flightResults.filters.maxPrice = Number(e.target.value);
        priceVal.textContent = formatBDT(e.target.value);
        renderFlightCards();
      };
    }

    stopsRadios.forEach(radio => {
      radio.onchange = (e) => {
        State.flightResults.filters.stops = e.target.value;
        renderFlightCards();
      };
    });

    timeRadios.forEach(radio => {
      radio.onchange = (e) => {
        State.flightResults.filters.depTime = e.target.value;
        renderFlightCards();
      };
    });

    cabinRadios.forEach(radio => {
      radio.onchange = (e) => {
        State.flightResults.filters.cabin = e.target.value;
        renderFlightCards();
      };
    });

    baggageRadios.forEach(radio => {
      radio.onchange = (e) => {
        State.flightResults.filters.baggage = e.target.value;
        renderFlightCards();
      };
    });

    if (sortSelect) {
      sortSelect.onchange = (e) => {
        State.flightResults.sortBy = e.target.value;
        renderFlightCards();
      };
    }

    if (resetBtn) {
      resetBtn.onclick = () => {
        State.flightResults.filters = { maxPrice: 60000, stops: 'all', depTime: 'all', cabin: 'all', baggage: 'all' };
        if (priceSlider) priceSlider.value = 60000;
        if (priceVal) priceVal.textContent = formatBDT(60000);
        stopsRadios.forEach(r => r.checked = r.value === 'all');
        timeRadios.forEach(r => r.checked = r.value === 'all');
        cabinRadios.forEach(r => r.checked = r.value === 'all');
        baggageRadios.forEach(r => r.checked = r.value === 'all');
        renderFlightCards();
      };
    }
  }

  function renderFlightCards() {
    const container = document.getElementById('flight-cards-container');
    const countEl = document.getElementById('results-count-text');
    if (!container) return;

    const s = State.flightResults.searchedRoute;
    const isOutbound = State.flightResults.activeRoundTripStep === 'outbound';
    let flights = isOutbound ? State.flightResults.outboundList : State.flightResults.returnList;

    // Apply filters
    const f = State.flightResults.filters;
    let filtered = flights.filter(fl => {
      // Max price filter (per adult)
      if (fl.adultPrice > f.maxPrice) return false;

      // Stops filter
      if (f.stops === 'direct' && !fl.isDirect) return false;
      if (f.stops === '1stop' && fl.isDirect) return false;

      // Departure time filter
      if (f.depTime === 'morning' && (fl.departureHour < 6 || fl.departureHour >= 12)) return false;
      if (f.depTime === 'afternoon' && (fl.departureHour < 12 || fl.departureHour >= 18)) return false;
      if (f.depTime === 'evening' && (fl.departureHour < 18 || fl.departureHour >= 24)) return false;

      // Cabin filter
      if (f.cabin && f.cabin !== 'all') {
        if (f.cabin === 'Premium Flatbed' && fl.cabinClass !== 'Premium Flatbed') return false;
        if (f.cabin === 'Economy' && fl.cabinClass === 'Premium Flatbed') return false;
      }

      // Baggage filter
      if (f.baggage === 'checked-included' && !fl.hasCheckedBag) return false;

      return true;
    });

    // Sorting
    filtered.sort((a, b) => {
      if (State.flightResults.sortBy === 'price-asc') return a.adultPrice - b.adultPrice;
      if (State.flightResults.sortBy === 'price-desc') return b.adultPrice - a.adultPrice;
      if (State.flightResults.sortBy === 'duration-asc') return a.durationMinutes - b.durationMinutes;
      if (State.flightResults.sortBy === 'departure-asc') return a.departureHour - b.departureHour;
      return 0;
    });

    if (countEl) {
      countEl.textContent = `${filtered.length} flight${filtered.length === 1 ? '' : 's'} available`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box">
          <div class="empty-state-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <h3 class="empty-state-title">No matching flights found</h3>
          <p class="empty-state-desc">Try adjusting your price slider, time slot, cabin class, or stop filters to see available flights.</p>
          <button class="btn-outline" id="btn-empty-reset" style="margin-top: 12px; width: auto; padding: 10px 24px;">Reset Filters</button>
        </div>
      `;
      const btn = document.getElementById('btn-empty-reset');
      if (btn) btn.onclick = () => document.getElementById('btn-reset-flight-filters').click();
      return;
    }

    // Passengers pricing
    const adults = s.adults;
    const children = s.children;
    const infants = s.infants;

    container.innerHTML = '';
    filtered.forEach(flight => {
      const childPrice = Math.round(flight.adultPrice * 0.75);
      const infantPrice = Math.round(flight.adultPrice * 0.15);
      const totalPrice = (flight.adultPrice * adults) + (childPrice * children) + (infantPrice * infants);

      const card = document.createElement('div');
      card.className = 'flight-card';
      card.innerHTML = `
        <div class="flight-card-main">
          <div class="airline-badge-col">
            <span class="airline-name">${escapeHtml(flight.airline)}</span>
            <span class="flight-number">${escapeHtml(flight.flightNumber)}</span>
            <span class="aircraft-type">${escapeHtml(flight.aircraft)}</span>
            <span class="cabin-badge ${flight.cabinClass === 'Premium Flatbed' ? 'flatbed' : 'economy'}" style="margin-top:4px; display:inline-block; font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:${flight.cabinClass === 'Premium Flatbed' ? 'rgba(227,37,38,0.12)' : 'var(--bg-light)'}; color:${flight.cabinClass === 'Premium Flatbed' ? 'var(--primary)' : 'var(--text-muted)'};">
              ${escapeHtml(flight.cabinClass || 'Economy')}
            </span>
          </div>

          <div class="flight-timeline-col">
            <div class="time-point dep">
              <div class="flight-time">${escapeHtml(flight.departureTime)}</div>
              <div class="flight-airport">${escapeHtml(flight.originCode)}</div>
            </div>

            <div class="flight-duration-center">
              <div class="duration-text">${escapeHtml(flight.durationFormatted)}</div>
              <div class="flight-line-visual">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <div class="flight-stops-text ${flight.isDirect ? '' : 'has-stop'}">${escapeHtml(flight.stops)}</div>
            </div>

            <div class="time-point arr">
              <div class="flight-time">${escapeHtml(flight.arrivalTime)}</div>
              <div class="flight-airport">${escapeHtml(flight.destCode)}</div>
            </div>
          </div>

          <div class="flight-action-col">
            <div class="flight-price-total">${formatBDT(totalPrice)}</div>
            <div class="flight-price-per-pax">${formatBDT(flight.adultPrice)} / adult</div>
            <button class="btn-select-flight" data-flight-id="${escapeHtml(flight.id)}">
              Select Flight
            </button>
          </div>
        </div>

        <div class="flight-card-footer">
          <div class="flight-baggage-preview">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="6" y="7" width="12" height="14" rx="2"/>
              <path d="M9 7V4a2 2 0 012-2h2a2 2 0 012 2v3"/>
            </svg>
            <span>${escapeHtml(flight.baggageAllowance)}</span>
          </div>
          <button class="btn-toggle-details" data-target="details-${escapeHtml(flight.id)}">
            <span>Flight Details</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>

        <div class="flight-expanded-details" id="details-${escapeHtml(flight.id)}">
          <div class="details-grid">
            <div>
              <div class="detail-item-title">Itinerary & Timing</div>
              <div class="detail-item-desc">
                Departs: ${escapeHtml(flight.originAirport)} (${flight.originCode}) at ${flight.departureTime}<br>
                Arrives: ${escapeHtml(flight.destAirport)} (${flight.destCode}) at ${flight.arrivalTime}
              </div>
            </div>
            <div>
              <div class="detail-item-title">Aircraft & Cabin</div>
              <div class="detail-item-desc">
                Craft: ${escapeHtml(flight.aircraft)}<br>
                Seat Pitch: ${escapeHtml(flight.seatPitch)}<br>
                Class: Economy (Demo Fare)
              </div>
            </div>
            <div>
              <div class="detail-item-title">Baggage & Meals</div>
              <div class="detail-item-desc">
                Cabin: 7 kg included<br>
                Check-in: Up to 30 kg available in booking add-ons<br>
                ${escapeHtml(flight.mealOption)}
              </div>
            </div>
          </div>
        </div>
      `;

      // Accordion toggle
      const toggleBtn = card.querySelector('.btn-toggle-details');
      const detailsSection = card.querySelector(`#details-${flight.id}`);
      toggleBtn.addEventListener('click', () => {
        detailsSection.classList.toggle('open');
      });

      // Select flight button
      const selectBtn = card.querySelector('.btn-select-flight');
      selectBtn.addEventListener('click', () => {
        handleFlightSelection(flight);
      });

      container.appendChild(card);
    });
  }

  function handleFlightSelection(flight) {
    const s = State.flightResults.searchedRoute;

    if (s.tripType === 'round' && State.flightResults.activeRoundTripStep === 'outbound') {
      State.flightResults.selectedOutbound = flight;
      State.flightResults.activeRoundTripStep = 'return';
      showToast('Outbound flight selected! Now choose your return flight.', 'success');
      renderFlightResultsView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (s.tripType === 'round') {
      State.flightResults.selectedReturn = flight;
    } else {
      State.flightResults.selectedOutbound = flight;
      State.flightResults.selectedReturn = null;
    }

    // Proceed to booking page
    initFlightBookingPage();
    switchView('flight-booking');
  }

  // ==========================================================================
  // Flight Booking Page & Interactive Seat Selection
  // ==========================================================================
  function initFlightBookingPage() {
    const container = document.getElementById('flight-booking-itinerary-summary');
    const paxFormContainer = document.getElementById('passengers-inputs-container');
    const outbound = State.flightResults.selectedOutbound;
    const returnFl = State.flightResults.selectedReturn;
    const s = State.flightResults.searchedRoute;

    if (!outbound) {
      switchView('flight');
      return;
    }

    // Reset addons and seat selections
    State.flightBooking.addons = { baggageKg: 0, meal: false, insurance: false };
    State.flightBooking.assignedSeats = {};
    State.flightBooking.activePaxIndexForSeat = 0;
    State.flightBooking.calculatedSeatsFee = 0;

    // Render Itinerary summary
    let itineraryHTML = `
      <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid var(--border-light);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase;">Outbound Flight</div>
          <span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:rgba(227,37,38,0.1); color:var(--primary);">
            ${escapeHtml(outbound.cabinClass || 'Economy')}
          </span>
        </div>
        <div style="font-size:16px; font-weight:800; color:var(--dark); margin-top:2px;">
          ${outbound.airline} (${outbound.flightNumber}) • ${outbound.originCity} (${outbound.originCode}) → ${outbound.destCity} (${outbound.destCode})
        </div>
        <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
          ${formatDisplayDate(outbound.date)} • Departs ${outbound.departureTime} • Arrives ${outbound.arrivalTime} (${outbound.durationFormatted}) • ${outbound.aircraft}
        </div>
      </div>
    `;

    if (returnFl) {
      itineraryHTML += `
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase;">Return Flight</div>
            <span style="font-size:11px; font-weight:700; padding:2px 8px; border-radius:4px; background:rgba(227,37,38,0.1); color:var(--primary);">
              ${escapeHtml(returnFl.cabinClass || 'Economy')}
            </span>
          </div>
          <div style="font-size:16px; font-weight:800; color:var(--dark); margin-top:2px;">
            ${returnFl.airline} (${returnFl.flightNumber}) • ${returnFl.originCity} (${returnFl.originCode}) → ${returnFl.destCity} (${returnFl.destCode})
          </div>
          <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
            ${formatDisplayDate(returnFl.date)} • Departs ${returnFl.departureTime} • Arrives ${returnFl.arrivalTime} (${returnFl.durationFormatted}) • ${returnFl.aircraft}
          </div>
        </div>
      `;
    }

    if (container) container.innerHTML = itineraryHTML;

    // Render Dynamic Passenger Forms
    const currentUser = getCurrentUser();
    if (paxFormContainer) {
      paxFormContainer.innerHTML = '';
      let paxIndex = 1;

      // Adults
      for (let i = 1; i <= s.adults; i++) {
        const defaultName = (i === 1 && currentUser) ? currentUser.name : '';
        paxFormContainer.appendChild(createPaxInputBlock(`Adult ${i}`, `adult-${i}`, paxIndex++, defaultName));
      }
      // Children
      for (let i = 1; i <= s.children; i++) {
        paxFormContainer.appendChild(createPaxInputBlock(`Child ${i} (2-11 yrs)`, `child-${i}`, paxIndex++));
      }
      // Infants
      for (let i = 1; i <= s.infants; i++) {
        paxFormContainer.appendChild(createPaxInputBlock(`Infant ${i} (under 2 yrs)`, `infant-${i}`, paxIndex++));
      }
    }

    // Auto-fill contact info if logged in
    const emailInput = document.getElementById('contact-email');
    const phoneInput = document.getElementById('contact-phone');
    if (currentUser) {
      if (emailInput && !emailInput.value) emailInput.value = currentUser.email;
      if (phoneInput && !phoneInput.value) phoneInput.value = '+880 1712-345678';
    }

    // Initialize Aircraft Seat Selection
    initSeatMap();

    // Add-on checkboxes
    setupAddonsListeners();

    // Recompute price
    updateBookingPriceSummary();

    // Wire Proceed to Payment Button
    const proceedBtn = document.getElementById('btn-proceed-to-payment');
    if (proceedBtn) {
      proceedBtn.disabled = false;
      proceedBtn.onclick = handleProceedToPayment;
    }
  }

  function createPaxInputBlock(label, idPrefix, number, prefillName = '') {
    const div = document.createElement('div');
    div.className = 'passenger-form-block';
    let firstName = '';
    let lastName = '';
    if (prefillName) {
      const parts = prefillName.split(' ');
      firstName = parts[0] || '';
      lastName = parts.slice(1).join(' ') || '';
    }

    div.innerHTML = `
      <div class="passenger-badge-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Passenger ${number}: ${label}</span>
      </div>
      <div class="inputs-row">
        <div>
          <label class="form-label" for="${idPrefix}-title">Title</label>
          <select class="input-standard" id="${idPrefix}-title">
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Mstr">Mstr</option>
          </select>
        </div>
        <div>
          <label class="form-label" for="${idPrefix}-first">First Name</label>
          <input type="text" class="input-standard" id="${idPrefix}-first" placeholder="e.g. Yasin" value="${escapeHtml(firstName)}" required />
        </div>
        <div>
          <label class="form-label" for="${idPrefix}-last">Last Name</label>
          <input type="text" class="input-standard" id="${idPrefix}-last" placeholder="e.g. Chowdhury" value="${escapeHtml(lastName)}" required />
        </div>
      </div>
    `;
    return div;
  }

  // ==========================================================================
  // Interactive Aircraft Seat Map Logic
  // ==========================================================================
  const OCCUPIED_DEMO_SEATS = new Set(['1C', '2D', '3B', '4F', '5A', '6E', '7B', '8C']);

  function getPassengerCountForSeats() {
    const s = State.flightResults.searchedRoute;
    return (s.adults || 1) + (s.children || 0);
  }

  function getPassengerLabel(idx) {
    const s = State.flightResults.searchedRoute;
    if (idx < s.adults) return `Adult ${idx + 1}`;
    return `Child ${idx - s.adults + 1}`;
  }

  function initSeatMap() {
    const selectorContainer = document.getElementById('seatmap-passenger-selector');
    const gridContainer = document.getElementById('aircraft-seatmap-grid');
    if (!selectorContainer || !gridContainer) return;

    const totalPax = getPassengerCountForSeats();

    // Default auto-assign initial seats if empty
    if (Object.keys(State.flightBooking.assignedSeats).length === 0) {
      let assignedCount = 0;
      for (let r = 3; r <= 8 && assignedCount < totalPax; r++) {
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(col => {
          const code = `${r}${col}`;
          if (!OCCUPIED_DEMO_SEATS.has(code) && assignedCount < totalPax) {
            State.flightBooking.assignedSeats[assignedCount] = code;
            assignedCount++;
          }
        });
      }
    }

    renderSeatMapUI();
  }

  function renderSeatMapUI() {
    const selectorContainer = document.getElementById('seatmap-passenger-selector');
    const gridContainer = document.getElementById('aircraft-seatmap-grid');
    if (!selectorContainer || !gridContainer) return;

    const totalPax = getPassengerCountForSeats();
    const activeIdx = State.flightBooking.activePaxIndexForSeat;

    // Render Passenger Selector Tabs
    selectorContainer.innerHTML = '';
    for (let i = 0; i < totalPax; i++) {
      const seat = State.flightBooking.assignedSeats[i];
      const isHot = seat && (seat.startsWith('1') || seat.startsWith('2'));
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `pax-seat-tab ${i === activeIdx ? 'active' : ''}`;
      btn.innerHTML = `
        <span class="pax-seat-num">P${i + 1}</span>
        <span class="pax-seat-name">${getPassengerLabel(i)}</span>
        <span class="pax-assigned-badge ${isHot ? 'hot' : ''}">${seat ? seat + (isHot ? ' 🔥' : '') : 'Select Seat'}</span>
      `;
      btn.onclick = () => {
        State.flightBooking.activePaxIndexForSeat = i;
        renderSeatMapUI();
      };
      selectorContainer.appendChild(btn);
    }

    // Render 8 Rows Aircraft Grid
    gridContainer.innerHTML = '';
    const assignedMap = State.flightBooking.assignedSeats; // { 0: '1A', 1: '1B' }
    const seatToPax = {};
    Object.entries(assignedMap).forEach(([paxI, seatCode]) => {
      seatToPax[seatCode] = Number(paxI);
    });

    for (let row = 1; row <= 8; row++) {
      const isHotRow = row <= 2;
      const rowDiv = document.createElement('div');
      rowDiv.className = `seat-grid-row ${isHotRow ? 'hot-row' : ''}`;

      // Left Seats: A, B, C
      const leftCol = document.createElement('div');
      leftCol.className = 'seat-col-group';
      ['A', 'B', 'C'].forEach(col => {
        leftCol.appendChild(createSeatElement(row, col, isHotRow, seatToPax, activeIdx));
      });

      // Aisle
      const aisle = document.createElement('div');
      aisle.className = 'seat-aisle-divider';
      aisle.textContent = row;

      // Right Seats: D, E, F
      const rightCol = document.createElement('div');
      rightCol.className = 'seat-col-group';
      ['D', 'E', 'F'].forEach(col => {
        rightCol.appendChild(createSeatElement(row, col, isHotRow, seatToPax, activeIdx));
      });

      rowDiv.appendChild(leftCol);
      rowDiv.appendChild(aisle);
      rowDiv.appendChild(rightCol);
      gridContainer.appendChild(rowDiv);
    }

    // Update Seat Fees
    let seatFees = 0;
    Object.values(assignedMap).forEach(seatCode => {
      if (seatCode.startsWith('1') || seatCode.startsWith('2')) {
        seatFees += 1200;
      }
    });
    State.flightBooking.calculatedSeatsFee = seatFees;
    updateBookingPriceSummary();
  }

  function createSeatElement(row, col, isHotRow, seatToPax, activeIdx) {
    const code = `${row}${col}`;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.dataset.seat = code;

    const isOccupied = OCCUPIED_DEMO_SEATS.has(code);
    const assignedPax = seatToPax[code];
    const isSelected = assignedPax !== undefined;
    const isCurrentPaxSelected = isSelected && assignedPax === activeIdx;

    let classList = ['seat-unit'];
    if (isHotRow) classList.push('hot-seat');
    if (isOccupied) classList.push('occupied');
    if (isSelected) classList.push('selected');
    if (isCurrentPaxSelected) classList.push('active-pax');

    btn.className = classList.join(' ');
    btn.title = isOccupied ? `${code}: Occupied` : `${code}: ${isHotRow ? 'Hot Seat (+1,200 BDT)' : 'Standard Seat (Included)'}`;

    let labelText = col;
    if (isSelected) {
      labelText = `P${assignedPax + 1}`;
    }
    btn.innerHTML = `<span>${labelText}</span>`;

    if (!isOccupied) {
      btn.onclick = () => handleSeatClick(code);
    }

    return btn;
  }

  function handleSeatClick(seatCode) {
    const activeIdx = State.flightBooking.activePaxIndexForSeat;
    const totalPax = getPassengerCountForSeats();

    // Check if another passenger already picked this seat
    Object.keys(State.flightBooking.assignedSeats).forEach(k => {
      if (State.flightBooking.assignedSeats[k] === seatCode) {
        delete State.flightBooking.assignedSeats[k];
      }
    });

    // Assign to active passenger
    State.flightBooking.assignedSeats[activeIdx] = seatCode;

    // Advance to next passenger without seat if available
    let nextPax = -1;
    for (let i = 0; i < totalPax; i++) {
      if (!State.flightBooking.assignedSeats[i]) {
        nextPax = i;
        break;
      }
    }
    if (nextPax !== -1) {
      State.flightBooking.activePaxIndexForSeat = nextPax;
    }

    renderSeatMapUI();
  }

  function setupAddonsListeners() {
    const bagSelect = document.getElementById('addon-baggage-select');
    const mealCheckbox = document.getElementById('addon-meal-check');
    const insCheckbox = document.getElementById('addon-insurance-check');

    if (bagSelect) {
      bagSelect.onchange = (e) => {
        State.flightBooking.addons.baggageKg = Number(e.target.value);
        updateBookingPriceSummary();
      };
    }
    if (mealCheckbox) {
      mealCheckbox.onchange = (e) => {
        State.flightBooking.addons.meal = e.target.checked;
        updateBookingPriceSummary();
      };
    }
    if (insCheckbox) {
      insCheckbox.onchange = (e) => {
        State.flightBooking.addons.insurance = e.target.checked;
        updateBookingPriceSummary();
      };
    }
  }

  function updateBookingPriceSummary() {
    const outbound = State.flightResults.selectedOutbound;
    const returnFl = State.flightResults.selectedReturn;
    const s = State.flightResults.searchedRoute;
    if (!outbound) return;

    const adults = s.adults;
    const children = s.children;
    const infants = s.infants;
    const totalPax = adults + children + infants;

    // Outbound fare
    const outAdultTotal = outbound.adultPrice * adults;
    const outChildTotal = Math.round(outbound.adultPrice * 0.75) * children;
    const outInfantTotal = Math.round(outbound.adultPrice * 0.15) * infants;
    const outboundTotal = outAdultTotal + outChildTotal + outInfantTotal;

    // Return fare
    let returnTotal = 0;
    if (returnFl) {
      const retAdultTotal = returnFl.adultPrice * adults;
      const retChildTotal = Math.round(returnFl.adultPrice * 0.75) * children;
      const retInfantTotal = Math.round(returnFl.adultPrice * 0.15) * infants;
      returnTotal = retAdultTotal + retChildTotal + retInfantTotal;
    }

    const baseFareTotal = outboundTotal + returnTotal;
    const taxesAndFees = Math.round(baseFareTotal * 0.08); // 8% airport taxes

    // Seats fee
    const seatsTotal = State.flightBooking.calculatedSeatsFee || 0;

    // Addons
    const baggagePrices = { 0: 0, 20: 2500, 30: 3800 };
    const bagCost = (baggagePrices[State.flightBooking.addons.baggageKg] || 0) * (adults + children);
    const mealCost = State.flightBooking.addons.meal ? (550 * (adults + children)) : 0;
    const insCost = State.flightBooking.addons.insurance ? (1200 * totalPax) : 0;
    const addonsTotal = bagCost + mealCost + insCost;

    const grandTotal = baseFareTotal + taxesAndFees + seatsTotal + addonsTotal;

    // Update DOM
    const baseEl = document.getElementById('price-summary-base');
    const taxEl = document.getElementById('price-summary-tax');
    const seatsRow = document.getElementById('price-summary-seats-row');
    const seatsEl = document.getElementById('price-summary-seats');
    const addonEl = document.getElementById('price-summary-addons');
    const grandEl = document.getElementById('price-summary-total');

    if (baseEl) baseEl.textContent = formatBDT(baseFareTotal);
    if (taxEl) taxEl.textContent = formatBDT(taxesAndFees);
    if (seatsRow) seatsRow.style.display = seatsTotal > 0 ? 'flex' : 'none';
    if (seatsEl) seatsEl.textContent = formatBDT(seatsTotal);
    if (addonEl) addonEl.textContent = formatBDT(addonsTotal);
    if (grandEl) grandEl.textContent = formatBDT(grandTotal);

    State.flightBooking.calculatedGrandTotal = grandTotal;
  }

  // ==========================================================================
  // Handle Proceed to Payment Transition
  // ==========================================================================
  function handleProceedToPayment() {
    const s = State.flightResults.searchedRoute;

    // Collect and validate passengers
    const passengersList = [];
    let isValid = true;

    // Adults
    for (let i = 1; i <= s.adults; i++) {
      const title = document.getElementById(`adult-${i}-title`)?.value || 'Mr';
      const first = document.getElementById(`adult-${i}-first`)?.value.trim();
      const last = document.getElementById(`adult-${i}-last`)?.value.trim();
      if (!first || !last) { isValid = false; break; }
      const seatCode = State.flightBooking.assignedSeats[i - 1] || 'Standard (Auto-assigned)';
      passengersList.push({ name: `${title} ${first} ${last}`, type: 'Adult', seat: seatCode });
    }

    // Children
    if (isValid) {
      for (let i = 1; i <= s.children; i++) {
        const title = document.getElementById(`child-${i}-title`)?.value || 'Mstr';
        const first = document.getElementById(`child-${i}-first`)?.value.trim();
        const last = document.getElementById(`child-${i}-last`)?.value.trim();
        if (!first || !last) { isValid = false; break; }
        const seatCode = State.flightBooking.assignedSeats[s.adults + i - 1] || 'Standard (Auto-assigned)';
        passengersList.push({ name: `${title} ${first} ${last}`, type: 'Child', seat: seatCode });
      }
    }

    // Infants
    if (isValid) {
      for (let i = 1; i <= s.infants; i++) {
        const title = document.getElementById(`infant-${i}-title`)?.value || 'Mstr';
        const first = document.getElementById(`infant-${i}-first`)?.value.trim();
        const last = document.getElementById(`infant-${i}-last`)?.value.trim();
        if (!first || !last) { isValid = false; break; }
        passengersList.push({ name: `${title} ${first} ${last}`, type: 'Infant', seat: 'Lap Seat' });
      }
    }

    // Contact
    const email = document.getElementById('contact-email')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim();

    if (!isValid || !email || !phone) {
      showToast('Please enter all passenger names, email address, and phone number.', 'error');
      return;
    }

    // Save state for payment view
    State.flightBooking.validatedPassengers = passengersList;
    State.flightBooking.validatedContact = { email, phone };

    initPaymentView();
    switchView('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ==========================================================================
  // Simulated Payment View & Processing Logic
  // ==========================================================================
  function initPaymentView() {
    const outbound = State.flightResults.selectedOutbound;
    const returnFl = State.flightResults.selectedReturn;
    const s = State.flightResults.searchedRoute;
    const grandTotal = State.flightBooking.calculatedGrandTotal;

    const routeBox = document.getElementById('payment-recap-route');
    const breakdownBox = document.getElementById('payment-recap-breakdown');
    const totalBox = document.getElementById('payment-recap-total');
    const feedbackBox = document.getElementById('payment-feedback-box');
    const backBtn = document.getElementById('btn-back-to-booking');
    const payBtn = document.getElementById('btn-process-payment');
    const fillSuccessBtn = document.getElementById('btn-fill-success-card');
    const fillFailBtn = document.getElementById('btn-fill-fail-card');

    if (feedbackBox) feedbackBox.style.display = 'none';

    // Render Route Summary Box
    if (routeBox && outbound) {
      routeBox.innerHTML = `
        <div style="font-size:12px; font-weight:700; color:var(--primary); text-transform:uppercase; margin-bottom:4px;">
          ${outbound.airline} • ${outbound.flightNumber} ${returnFl ? `+ ${returnFl.flightNumber}` : ''}
        </div>
        <div style="font-size:17px; font-weight:800; color:var(--dark);">
          ${outbound.originCity} (${outbound.originCode}) → ${outbound.destCity} (${outbound.destCode})
        </div>
        <div style="font-size:13px; color:var(--text-muted); margin-top:4px;">
          ${formatDisplayDate(outbound.date)} • ${s.adults + s.children + s.infants} Passenger${(s.adults + s.children + s.infants) > 1 ? 's' : ''} • ${outbound.cabinClass || 'Economy'}
        </div>
      `;
    }

    // Render Breakdown Box
    if (breakdownBox && outbound) {
      const seats = Object.values(State.flightBooking.assignedSeats || {});
      const hotSeatCount = seats.filter(c => c.startsWith('1') || c.startsWith('2')).length;
      const seatsFee = State.flightBooking.calculatedSeatsFee || 0;

      let itemsHTML = `
        <div class="recap-item-row">
          <span>Flight Base Fare (${s.adults} Ad, ${s.children} Ch, ${s.infants} Inf)</span>
          <span style="font-weight:700;">${document.getElementById('price-summary-base')?.textContent || 'BDT 0'}</span>
        </div>
        <div class="recap-item-row">
          <span>Airport Taxes & Govt Surcharges</span>
          <span style="font-weight:700;">${document.getElementById('price-summary-tax')?.textContent || 'BDT 0'}</span>
        </div>
      `;

      if (seats.length > 0) {
        itemsHTML += `
          <div class="recap-item-row">
            <span>Aircraft Seats (${seats.join(', ')}${hotSeatCount > 0 ? ` • ${hotSeatCount} Hot Seat` : ''})</span>
            <span style="font-weight:700;">${seatsFee > 0 ? formatBDT(seatsFee) : 'Included'}</span>
          </div>
        `;
      }

      const addonsFee = document.getElementById('price-summary-addons')?.textContent;
      if (addonsFee && addonsFee !== 'BDT 0') {
        itemsHTML += `
          <div class="recap-item-row">
            <span>Selected Add-ons (Baggage / Meals / Protection)</span>
            <span style="font-weight:700;">${addonsFee}</span>
          </div>
        `;
      }

      breakdownBox.innerHTML = itemsHTML;
    }

    if (totalBox) totalBox.textContent = formatBDT(grandTotal);

    // Back to Booking View
    if (backBtn) {
      backBtn.onclick = () => {
        switchView('flight-booking');
      };
    }

    // Helper references
    const fillNagadSuccessBtn = document.getElementById('btn-fill-nagad-success');
    const fillNagadFailBtn = document.getElementById('btn-fill-nagad-fail');
    const getNagadOtpBtn = document.getElementById('btn-get-nagad-otp');

    // Section containers
    const cardSection = document.getElementById('demo-card-form-section');
    const bkashSection = document.getElementById('demo-bkash-form-section');
    const nagadSection = document.getElementById('demo-nagad-form-section');
    const pointsSection = document.getElementById('demo-points-form-section');

    // Demo Card Helper: Success
    if (fillSuccessBtn) {
      fillSuccessBtn.onclick = () => {
        const user = getCurrentUser();
        const nameInput = document.getElementById('demo-card-name');
        const numInput = document.getElementById('demo-card-number');
        const expInput = document.getElementById('demo-card-expiry');
        const cvvInput = document.getElementById('demo-card-cvv');
        if (nameInput) nameInput.value = user ? user.name : 'Yasin Chowdhury';
        if (numInput) numInput.value = '4532 8888 8888 8888';
        if (expInput) expInput.value = '12/28';
        if (cvvInput) cvvInput.value = '888';
        if (feedbackBox) feedbackBox.style.display = 'none';
        showToast('Filled valid demo card (Visa *8888)', 'info');
      };
    }

    // Demo Card Helper: Fail
    if (fillFailBtn) {
      fillFailBtn.onclick = () => {
        const nameInput = document.getElementById('demo-card-name');
        const numInput = document.getElementById('demo-card-number');
        const expInput = document.getElementById('demo-card-expiry');
        const cvvInput = document.getElementById('demo-card-cvv');
        if (nameInput) nameInput.value = 'Declined Demo Tester';
        if (numInput) numInput.value = '4000 0000 0000 0002';
        if (expInput) expInput.value = '12/28';
        if (cvvInput) cvvInput.value = '888';
        if (feedbackBox) feedbackBox.style.display = 'none';
        showToast('Filled decline test card (*0002)', 'info');
      };
    }

    // Nagad Helpers
    if (fillNagadSuccessBtn) {
      fillNagadSuccessBtn.onclick = () => {
        const phoneInput = document.getElementById('demo-nagad-phone');
        const otpInput = document.getElementById('demo-nagad-otp');
        const pinInput = document.getElementById('demo-nagad-pin');
        if (phoneInput) phoneInput.value = '01823-456789';
        if (otpInput) otpInput.value = '654321';
        if (pinInput) pinInput.value = '9876';
        if (feedbackBox) feedbackBox.style.display = 'none';
        showToast('Filled verified Nagad account (01823-456789)', 'info');
      };
    }

    if (fillNagadFailBtn) {
      fillNagadFailBtn.onclick = () => {
        const phoneInput = document.getElementById('demo-nagad-phone');
        const otpInput = document.getElementById('demo-nagad-otp');
        const pinInput = document.getElementById('demo-nagad-pin');
        if (phoneInput) phoneInput.value = '01800-000002';
        if (otpInput) otpInput.value = '654321';
        if (pinInput) pinInput.value = '9876';
        if (feedbackBox) feedbackBox.style.display = 'none';
        showToast('Filled expired Nagad account (*000002)', 'info');
      };
    }

    if (getNagadOtpBtn) {
      getNagadOtpBtn.onclick = () => {
        const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
        const otpInput = document.getElementById('demo-nagad-otp');
        if (otpInput) otpInput.value = generatedOtp;
        showToast(`Nagad SMS Alert: Your OTP code is ${generatedOtp}`, 'success');
      };
    }

    // Update submit button text based on method
    function updatePayButtonText(method) {
      if (!payBtn) return;
      let label = 'Complete Simulated Payment';
      if (method === 'bkash') {
        label = `Confirm bKash Payment (${formatBDT(grandTotal)})`;
      } else if (method === 'nagad') {
        label = `Confirm Nagad Payment (${formatBDT(grandTotal)})`;
      } else if (method === 'points') {
        label = `Redeem AirAsia Points (${formatBDT(grandTotal)})`;
      } else {
        label = `Pay with Card (${formatBDT(grandTotal)})`;
      }
      payBtn.innerHTML = `
        <span>${label}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    }

    // Toggle Payment Method radios
    document.querySelectorAll('input[name="demo-payment-method"]').forEach(radio => {
      radio.onchange = (e) => {
        const val = e.target.value;
        document.querySelectorAll('.payment-method-option').forEach(l => {
          l.classList.remove('active', 'is-bkash', 'is-nagad');
        });

        const activeLabel = e.target.closest('.payment-method-option');
        if (activeLabel) {
          activeLabel.classList.add('active');
          if (val === 'bkash') activeLabel.classList.add('is-bkash');
          if (val === 'nagad') activeLabel.classList.add('is-nagad');
        }

        if (cardSection) cardSection.style.display = val === 'card' ? 'block' : 'none';
        if (bkashSection) bkashSection.style.display = val === 'bkash' ? 'block' : 'none';
        if (nagadSection) nagadSection.style.display = val === 'nagad' ? 'block' : 'none';
        if (pointsSection) pointsSection.style.display = val === 'points' ? 'block' : 'none';

        if (feedbackBox) feedbackBox.style.display = 'none';
        updatePayButtonText(val);
      };
    });

    // Set initial button text
    const initialMethod = document.querySelector('input[name="demo-payment-method"]:checked')?.value || 'card';
    updatePayButtonText(initialMethod);

    // bKash Confirmation Modal Opener
    function confirmBkashPayment(onProceed) {
      const modal = document.getElementById('bkash-confirm-modal');
      const accountEl = document.getElementById('bkash-confirm-account-num');
      const amountEl = document.getElementById('bkash-confirm-amount-display');
      const cancelBtn = document.getElementById('btn-cancel-bkash-confirm');
      const confirmBtn = document.getElementById('btn-proceed-bkash-confirm');
      const closeBtn = document.getElementById('btn-close-bkash-modal');

      const rawPhone = document.getElementById('demo-bkash-phone')?.value.trim() || '01712-345678';
      if (accountEl) accountEl.textContent = rawPhone.startsWith('+880') ? rawPhone : `+880 ${rawPhone}`;
      if (amountEl) amountEl.textContent = formatBDT(grandTotal);

      if (modal) modal.classList.add('open');

      const handleClose = () => {
        if (modal) modal.classList.remove('open');
      };

      if (cancelBtn) cancelBtn.onclick = handleClose;
      if (closeBtn) closeBtn.onclick = handleClose;

      if (confirmBtn) {
        confirmBtn.onclick = () => {
          handleClose();
          onProceed();
        };
      }
    }

    // Process flight payment execution
    function executeFlightPayment(selectedMethod, paymentMethodLabel, transactionId) {
      if (!payBtn) return;
      payBtn.disabled = true;
      const gatewaySpinnerMsg = selectedMethod === 'bkash'
        ? 'Connecting to bKash Direct Gateway...'
        : selectedMethod === 'nagad'
        ? 'Contacting Nagad Digital Banking...'
        : selectedMethod === 'points'
        ? 'Redeeming AirAsia Points...'
        : 'Simulating Local Card Payment...';

      payBtn.innerHTML = `
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
          <path d="M12 2a10 10 0 0110 10"/>
        </svg>
        <span>${gatewaySpinnerMsg}</span>
      `;

      setTimeout(() => {
        const bookingRef = generateReference('AA');
        const outbound = State.flightResults.selectedOutbound;
        const returnFl = State.flightResults.selectedReturn;
        const s = State.flightResults.searchedRoute;
        const passengers = State.flightBooking.validatedPassengers || [];
        const contact = State.flightBooking.validatedContact || { email: '', phone: '' };

        const bookingRecord = {
          id: bookingRef,
          type: 'flight',
          route: `${outbound.originCity} (${outbound.originCode}) → ${outbound.destCity} (${outbound.destCode})` + (returnFl ? ` (Round Trip)` : ''),
          origin: outbound.originCode,
          destination: outbound.destCode,
          tripType: s.tripType,
          date: outbound.date,
          returnDate: returnFl ? returnFl.date : null,
          flightNumber: outbound.flightNumber + (returnFl ? ` / ${returnFl.flightNumber}` : ''),
          airline: outbound.airline,
          aircraft: outbound.aircraft,
          cabinClass: outbound.cabinClass || 'Economy',
          departureTime: outbound.departureTime,
          arrivalTime: outbound.arrivalTime,
          passengersCount: passengers.length,
          passengersList: passengers,
          assignedSeats: State.flightBooking.assignedSeats,
          contactEmail: contact.email,
          contactPhone: contact.phone,
          addons: State.flightBooking.addons,
          totalPrice: State.flightBooking.calculatedGrandTotal,
          isSimulatedPayment: true,
          paymentMethod: paymentMethodLabel,
          transactionId: transactionId,
          status: 'Confirmed',
          createdAt: new Date().toISOString()
        };

        // Save to localStorage
        saveBooking(FLIGHT_BOOKINGS_KEY, bookingRecord);
        State.flightBooking.lastConfirmedBooking = bookingRecord;

        // Render flight confirmation
        renderFlightConfirmation(bookingRecord);
        switchView('flight-confirmation');
        showToast(`Flight booking confirmed via ${selectedMethod === 'bkash' ? 'bKash' : selectedMethod === 'nagad' ? 'Nagad' : 'demo payment'}! Ref: ${bookingRef}`, 'success');
      }, 750);
    }

    // Handle Payment Submission
    if (payBtn) {
      payBtn.disabled = false;

      payBtn.onclick = () => {
        const selectedMethod = document.querySelector('input[name="demo-payment-method"]:checked')?.value || 'card';

        if (selectedMethod === 'card') {
          const cardNum = document.getElementById('demo-card-number')?.value.replace(/\s+/g, '') || '';
          const cardName = document.getElementById('demo-card-name')?.value.trim() || '';

          if (cardNum.length < 15) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>Invalid Card:</strong> Please enter a full 16-digit test card number.';
            }
            showToast('Please enter a valid card number format.', 'error');
            return;
          }

          // Simulate bank decline for cards ending in 0002 or name containing Declined
          if (cardNum.endsWith('0002') || cardName.toLowerCase().includes('decline')) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = `
                <div style="font-weight:800; font-size:14px; margin-bottom:4px;">⚠️ Simulated Bank Decline (Code 05: Do Not Honor)</div>
                <div>Your card issuer declined this demonstration transaction. Use the <strong>"Fill Demo Card (Success)"</strong> button above to test a successful confirmation.</div>
              `;
            }
            showToast('Simulated payment declined by test bank.', 'error');
            return;
          }

          const transactionId = `TRX-CC${Math.floor(10000000 + Math.random() * 90000000)}`;
          const paymentMethodLabel = `Credit Card (*${cardNum.slice(-4)})`;
          executeFlightPayment(selectedMethod, paymentMethodLabel, transactionId);

        } else if (selectedMethod === 'bkash') {
          // Only validate bKash account number and bKash PIN
          const phone = document.getElementById('demo-bkash-phone')?.value.replace(/[^0-9]/g, '') || '';
          const pin = document.getElementById('demo-bkash-pin')?.value.trim() || '';

          if (phone.length < 10) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>bKash Error:</strong> Please enter your 11-digit bKash account number (e.g. 01712-345678).';
            }
            showToast('Please enter a valid bKash account number.', 'error');
            return;
          }

          if (pin.length < 4) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>bKash Error:</strong> Please enter your 5-digit bKash PIN (e.g. 12345).';
            }
            showToast('Please enter your 5-digit bKash PIN.', 'error');
            return;
          }

          if (feedbackBox) feedbackBox.style.display = 'none';

          const rawPhone = document.getElementById('demo-bkash-phone')?.value.trim() || phone;
          const transactionId = `TRX-BK${Math.floor(10000000 + Math.random() * 90000000)}`;
          const paymentMethodLabel = `bKash E-Banking (${rawPhone})`;

          // Prompt user confirmation before completing the bKash payment
          confirmBkashPayment(() => {
            executeFlightPayment(selectedMethod, paymentMethodLabel, transactionId);
          });

        } else if (selectedMethod === 'nagad') {
          const phone = document.getElementById('demo-nagad-phone')?.value.replace(/[^0-9]/g, '') || '';
          const otp = document.getElementById('demo-nagad-otp')?.value.trim() || '';
          const pin = document.getElementById('demo-nagad-pin')?.value.trim() || '';

          if (phone.length < 10) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>Nagad Error:</strong> Please enter a valid 11-digit Nagad mobile number (e.g. 01823-456789).';
            }
            showToast('Please enter a valid Nagad mobile number.', 'error');
            return;
          }

          if (otp.length < 4) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>Nagad Error:</strong> Please enter the 6-digit OTP (click "Generate OTP").';
            }
            showToast('Please enter the Nagad OTP.', 'error');
            return;
          }

          if (pin.length < 4) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = '<strong>Nagad Error:</strong> Please enter your 4-digit Nagad PIN (e.g. 9876).';
            }
            showToast('Please enter your 4-digit Nagad PIN.', 'error');
            return;
          }

          // Simulate timeout/error
          if (phone.includes('000002') || phone.toLowerCase().includes('fail')) {
            if (feedbackBox) {
              feedbackBox.style.display = 'block';
              feedbackBox.className = 'payment-feedback-box error';
              feedbackBox.innerHTML = `
                <div style="font-weight:800; font-size:14px; margin-bottom:4px; color:#991B1B;">⚠️ Nagad Gateway Error [NG-408: Session Timed Out]</div>
                <div>The Nagad verification session timed out. Please click <strong>"Generate OTP"</strong> to refresh your session or use <strong>"Fill Demo Nagad (Success)"</strong>.</div>
              `;
            }
            showToast('Nagad verification timed out.', 'error');
            return;
          }

          const rawPhone = document.getElementById('demo-nagad-phone')?.value.trim() || phone;
          const transactionId = `TRX-NG${Math.floor(10000000 + Math.random() * 90000000)}`;
          const paymentMethodLabel = `Nagad Digital Bank (${rawPhone})`;
          executeFlightPayment(selectedMethod, paymentMethodLabel, transactionId);

        } else if (selectedMethod === 'points') {
          const transactionId = `TRX-PTS${Math.floor(10000000 + Math.random() * 90000000)}`;
          const paymentMethodLabel = 'AirAsia Rewards Points';
          executeFlightPayment(selectedMethod, paymentMethodLabel, transactionId);
        }
      };
    }
  }

  function renderFlightConfirmation(booking) {
    const refEl = document.getElementById('confirmation-booking-ref');
    const routeEl = document.getElementById('confirmation-route-text');
    const datesEl = document.getElementById('confirmation-dates-text');
    const paxListEl = document.getElementById('confirmation-passengers-list');
    const totalEl = document.getElementById('confirmation-total-text');
    const methodEl = document.getElementById('confirmation-payment-method');

    if (refEl) refEl.textContent = booking.id;
    if (routeEl) routeEl.textContent = booking.route;
    if (datesEl) {
      datesEl.textContent = booking.returnDate
        ? `Outbound: ${formatDisplayDate(booking.date)} • Return: ${formatDisplayDate(booking.returnDate)}`
        : `Travel Date: ${formatDisplayDate(booking.date)}`;
    }

    if (paxListEl) {
      paxListEl.innerHTML = booking.passengersList
        .map(p => `<li><strong>${escapeHtml(p.name)}</strong> (${escapeHtml(p.type)}) — Seat: <span style="font-weight:700; color:var(--primary);">${escapeHtml(p.seat || 'Standard')}</span></li>`)
        .join('');
    }

    if (totalEl) totalEl.textContent = formatBDT(booking.totalPrice);

    if (methodEl) {
      let badgeStyle = 'background:#EFF6FF; color:#1D4ED8;';
      if (booking.paymentMethod && booking.paymentMethod.toLowerCase().includes('bkash')) {
        badgeStyle = 'background:#FDF2F8; color:#BE185D;';
      } else if (booking.paymentMethod && booking.paymentMethod.toLowerCase().includes('nagad')) {
        badgeStyle = 'background:#FFF7ED; color:#C2410C;';
      } else if (booking.paymentMethod && booking.paymentMethod.toLowerCase().includes('points')) {
        badgeStyle = 'background:#FEF3C7; color:#B45309;';
      }

      methodEl.innerHTML = `
        <span style="display:inline-flex; align-items:center; gap:6px;">
          <span style="display:inline-block; font-size:11px; font-weight:800; padding:3px 8px; border-radius:12px; ${badgeStyle}">
            ${escapeHtml(booking.paymentMethod || 'Paid')}
          </span>
          ${booking.transactionId ? `<span style="font-size:12px; color:var(--text-muted);">TrxID: <strong>${escapeHtml(booking.transactionId)}</strong></span>` : ''}
        </span>
      `;
    }
  }

  // ==========================================================================
  // Hotel Page & Search
  // ==========================================================================
  function initHotelSearchForm() {
    const destSelect = document.getElementById('hotel-dest-select');
    const checkInInput = document.getElementById('hotel-checkin-date');
    const checkOutInput = document.getElementById('hotel-checkout-date');
    const guestsInput = document.getElementById('hotel-guests-count');
    const roomsInput = document.getElementById('hotel-rooms-count');
    const searchBtn = document.getElementById('btn-search-hotels');

    const today = new Date().toISOString().split('T')[0];
    if (checkInInput) {
      checkInInput.min = today;
      checkInInput.value = State.hotelSearch.checkInDate;
      checkInInput.addEventListener('change', (e) => {
        State.hotelSearch.checkInDate = e.target.value;
        if (checkOutInput) {
          checkOutInput.min = e.target.value;
          if (checkOutInput.value <= e.target.value) {
            checkOutInput.value = getFutureDateFrom(e.target.value, 2);
            State.hotelSearch.checkOutDate = checkOutInput.value;
          }
        }
      });
    }

    if (checkOutInput) {
      checkOutInput.min = State.hotelSearch.checkInDate;
      checkOutInput.value = State.hotelSearch.checkOutDate;
      checkOutInput.addEventListener('change', (e) => {
        State.hotelSearch.checkOutDate = e.target.value;
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => {
        const dest = destSelect ? destSelect.value : 'Kuala Lumpur';
        const cin = checkInInput ? checkInInput.value : '';
        const cout = checkOutInput ? checkOutInput.value : '';
        const guests = guestsInput ? parseInt(guestsInput.value, 10) : 2;
        const rooms = roomsInput ? parseInt(roomsInput.value, 10) : 1;

        if (cin < today) {
          showToast('Check-in date cannot be in the past.', 'error');
          return;
        }
        if (cout <= cin) {
          showToast('Check-out date must be after check-in date.', 'error');
          return;
        }
        if (guests < 1 || rooms < 1) {
          showToast('Guest and room counts must be at least 1.', 'error');
          return;
        }

        State.hotelSearch = { destination: dest, checkInDate: cin, checkOutDate: cout, guests, rooms };
        renderHotelsList();
        showToast(`Showing hotels in ${dest}`, 'info');
      });
    }

    // Hotel Filters
    const starRadios = document.querySelectorAll('input[name="filter-hotel-stars"]');
    starRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        State.hotelResults.filters.rating = Number(e.target.value);
        renderHotelsList();
      });
    });

    const amenityRadios = document.querySelectorAll('input[name="filter-hotel-amenity"]');
    amenityRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        State.hotelResults.filters.amenity = e.target.value;
        renderHotelsList();
      });
    });
  }

  function getFutureDateFrom(dateStr, daysAhead) {
    const parts = dateStr.split('-');
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + daysAhead);
    return d.toISOString().split('T')[0];
  }

  function renderHotelsList() {
    const container = document.getElementById('hotels-cards-container');
    if (!container) return;

    const dest = State.hotelSearch.destination;
    const nights = calculateNights(State.hotelSearch.checkInDate, State.hotelSearch.checkOutDate);
    const rooms = State.hotelSearch.rooms;

    let filtered = HOTELS_DATA.filter(h => {
      if (dest !== 'All' && h.city !== dest) return false;
      if (State.hotelResults.filters.rating > 0 && h.rating < State.hotelResults.filters.rating) return false;
      if (State.hotelResults.filters.amenity !== 'all') {
        if (!h.amenities.includes(State.hotelResults.filters.amenity)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="empty-state-box" style="grid-column: 1/-1;">
          <h3 class="empty-state-title">No hotels found matching criteria</h3>
          <p class="empty-state-desc">Try choosing a different destination city or relaxing the star rating/amenities filter.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';
    filtered.forEach(hotel => {
      const totalStay = hotel.pricePerNight * nights * rooms;
      const card = document.createElement('div');
      card.className = 'hotel-card';
      card.innerHTML = `
        <div class="hotel-img-wrap">
          <img src="${hotel.image}" alt="${escapeHtml(hotel.name)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'" />
          <div class="hotel-star-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span>${hotel.rating} (${hotel.reviewsCount})</span>
          </div>
        </div>
        <div class="hotel-body">
          <h3 class="hotel-title">${escapeHtml(hotel.name)}</h3>
          <div class="hotel-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${escapeHtml(hotel.city)}, ${escapeHtml(hotel.country)}</span>
          </div>
          <div class="hotel-amenities-tags">
            ${hotel.amenities.slice(0, 3).map(a => `<span class="amenity-chip">${escapeHtml(a)}</span>`).join('')}
          </div>
          <div class="hotel-price-footer">
            <div>
              <div class="hotel-price-night">${formatBDT(hotel.pricePerNight)}<span style="font-size:12px; font-weight:normal; color:var(--text-muted);">/night</span></div>
              <div class="hotel-total-stay">${formatBDT(totalStay)} total for ${nights} night${nights > 1 ? 's' : ''}, ${rooms} room${rooms > 1 ? 's' : ''}</div>
            </div>
            <button class="btn-view-hotel" data-hotel-id="${escapeHtml(hotel.id)}">View Details</button>
          </div>
        </div>
      `;

      card.querySelector('.btn-view-hotel').addEventListener('click', () => {
        openHotelDetailsModal(hotel);
      });

      container.appendChild(card);
    });
  }

  function openHotelDetailsModal(hotel) {
    State.activeHotelDetail = hotel;
    const modal = document.getElementById('hotel-details-modal');
    if (!modal) return;

    const nights = calculateNights(State.hotelSearch.checkInDate, State.hotelSearch.checkOutDate);
    const rooms = State.hotelSearch.rooms;

    document.getElementById('modal-hotel-name').textContent = hotel.name;
    document.getElementById('modal-hotel-location').textContent = `${hotel.city}, ${hotel.country}`;
    document.getElementById('modal-hotel-desc').textContent = hotel.description;

    // Gallery images
    const mainImg = document.getElementById('modal-gallery-main');
    const side1 = document.getElementById('modal-gallery-side-1');
    const side2 = document.getElementById('modal-gallery-side-2');
    if (mainImg && hotel.gallery[0]) mainImg.src = hotel.gallery[0];
    if (side1 && hotel.gallery[1]) side1.src = hotel.gallery[1];
    if (side2 && hotel.gallery[2]) side2.src = hotel.gallery[2];

    // Amenities list
    const amContainer = document.getElementById('modal-amenities-container');
    if (amContainer) {
      amContainer.innerHTML = hotel.amenities.map(a => `
        <div style="display:flex; align-items:center; gap:6px; font-size:13px; color:var(--text-main);">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>${escapeHtml(a)}</span>
        </div>
      `).join('');
    }

    // Stay meta
    document.getElementById('modal-stay-meta').textContent = `${formatDisplayDate(State.hotelSearch.checkInDate)} → ${formatDisplayDate(State.hotelSearch.checkOutDate)} (${nights} nights, ${rooms} room${rooms > 1 ? 's' : ''}, ${State.hotelSearch.guests} guests)`;

    // Rooms list
    const roomsContainer = document.getElementById('modal-rooms-container');
    let selectedRoom = hotel.rooms[0];

    function renderRooms() {
      if (!roomsContainer) return;
      roomsContainer.innerHTML = '';
      hotel.rooms.forEach((room, idx) => {
        const isSel = room === selectedRoom;
        const roomNightPrice = hotel.pricePerNight + room.priceBonus;
        const totalRoomCost = roomNightPrice * nights * rooms;

        const div = document.createElement('div');
        div.className = `room-card ${isSel ? 'selected' : ''}`;
        div.innerHTML = `
          <div>
            <div style="font-size:15px; font-weight:700; color:var(--dark);">${escapeHtml(room.type)}</div>
            <div style="font-size:12px; color:var(--text-muted);">${escapeHtml(room.bed)} • Max ${room.maxGuests} Guests</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:16px; font-weight:800; color:var(--primary);">${formatBDT(totalRoomCost)}</div>
            <div style="font-size:11px; color:var(--text-muted);">${formatBDT(roomNightPrice)}/night</div>
            <button class="btn-select-room" style="font-size:12px; font-weight:700; color:${isSel ? 'var(--primary)' : 'var(--text-muted)'}; margin-top:4px;">
              ${isSel ? '✓ Selected' : 'Select'}
            </button>
          </div>
        `;

        div.addEventListener('click', () => {
          selectedRoom = room;
          renderRooms();
          updateTotal();
        });

        roomsContainer.appendChild(div);
      });
    }

    function updateTotal() {
      const roomNightPrice = hotel.pricePerNight + selectedRoom.priceBonus;
      const subtotal = roomNightPrice * nights * rooms;
      const taxes = Math.round(subtotal * 0.1);
      const grand = subtotal + taxes;
      document.getElementById('modal-itemized-total').textContent = formatBDT(grand);
    }

    renderRooms();
    updateTotal();

    // Auto-populate logged-in user details if available
    const activeUser = getCurrentUser();
    const guestNameInput = document.getElementById('hotel-guest-name');
    const guestEmailInput = document.getElementById('hotel-guest-email');
    const guestPhoneInput = document.getElementById('hotel-guest-phone');
    if (activeUser) {
      if (guestNameInput && !guestNameInput.value) guestNameInput.value = activeUser.name || '';
      if (guestEmailInput && !guestEmailInput.value) guestEmailInput.value = activeUser.email || '';
      if (guestPhoneInput && !guestPhoneInput.value && activeUser.phone) guestPhoneInput.value = activeUser.phone;
    }

    // Confirm booking inside modal
    const bookRoomBtn = document.getElementById('btn-confirm-hotel-booking');
    if (bookRoomBtn) {
      bookRoomBtn.disabled = false;
      bookRoomBtn.onclick = () => {
        const guestName = document.getElementById('hotel-guest-name')?.value.trim();
        const guestEmail = document.getElementById('hotel-guest-email')?.value.trim();
        const guestPhone = document.getElementById('hotel-guest-phone')?.value.trim();
        const guestReq = document.getElementById('hotel-guest-requests')?.value.trim();

        if (!guestName || !guestEmail || !guestPhone) {
          showToast('Please provide your name, email, and phone number.', 'error');
          return;
        }

        bookRoomBtn.disabled = true;
        bookRoomBtn.textContent = 'Confirming Stay...';

        setTimeout(() => {
          const ref = generateReference('HT');
          const roomNightPrice = hotel.pricePerNight + selectedRoom.priceBonus;
          const subtotal = roomNightPrice * nights * rooms;
          const grand = subtotal + Math.round(subtotal * 0.1);

          const record = {
            id: ref,
            type: 'hotel',
            hotelName: hotel.name,
            city: hotel.city,
            roomType: selectedRoom.type,
            checkIn: State.hotelSearch.checkInDate,
            checkOut: State.hotelSearch.checkOutDate,
            nights,
            rooms,
            guestCount: State.hotelSearch.guests,
            leadGuest: guestName,
            email: guestEmail,
            phone: guestPhone,
            requests: guestReq,
            totalPrice: grand,
            status: 'Confirmed',
            createdAt: new Date().toISOString()
          };

          saveBooking(HOTEL_BOOKINGS_KEY, record);
          modal.classList.remove('open');
          bookRoomBtn.disabled = false;
          bookRoomBtn.textContent = 'Book Room';

          // Show hotel confirmation
          renderHotelConfirmation(record);
          switchView('hotel-confirmation');
          showToast(`Hotel booking confirmed! Ref: ${ref}`, 'success');
        }, 500);
      };
    }

    modal.classList.add('open');
  }

  function renderHotelConfirmation(record) {
    const refEl = document.getElementById('hotel-confirm-ref');
    const nameEl = document.getElementById('hotel-confirm-name');
    const metaEl = document.getElementById('hotel-confirm-meta');
    const guestEl = document.getElementById('hotel-confirm-guest');
    const totalEl = document.getElementById('hotel-confirm-total');

    if (refEl) refEl.textContent = record.id;
    if (nameEl) nameEl.textContent = `${record.hotelName} (${record.city})`;
    if (metaEl) {
      metaEl.textContent = `${record.roomType} • ${formatDisplayDate(record.checkIn)} to ${formatDisplayDate(record.checkOut)} (${record.nights} nights, ${record.rooms} room)`;
    }
    if (guestEl) guestEl.textContent = `${record.leadGuest} (${record.guestCount} Guests)`;
    if (totalEl) totalEl.textContent = formatBDT(record.totalPrice);
  }

  // ==========================================================================
  // Bookings Management Page (Tabs, Cancellation, Printing, Clear Data)
  // ==========================================================================
  function renderBookingsPage() {
    const flightTabBtn = document.getElementById('tab-flight-bookings');
    const hotelTabBtn = document.getElementById('tab-hotel-bookings');
    const flightList = document.getElementById('bookings-flight-list');
    const hotelList = document.getElementById('bookings-hotel-list');
    const flightCountBadge = document.getElementById('badge-flight-count');
    const hotelCountBadge = document.getElementById('badge-hotel-count');

    let activeTab = 'flight';

    function loadAndRender() {
      const flightBookings = getBookings(FLIGHT_BOOKINGS_KEY);
      const hotelBookings = getBookings(HOTEL_BOOKINGS_KEY);

      if (flightCountBadge) flightCountBadge.textContent = flightBookings.length;
      if (hotelCountBadge) hotelCountBadge.textContent = hotelBookings.length;

      // Render Flights
      if (flightList) {
        if (flightBookings.length === 0) {
          flightList.innerHTML = `
            <div class="empty-state-box">
              <div class="empty-state-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
              </div>
              <h3 class="empty-state-title">No flight bookings yet. Start planning your next adventure.</h3>
              <p class="empty-state-desc">Search direct flights across Southeast Asia with AirAsia fares.</p>
              <button class="btn-search-main" id="btn-empty-goto-flight" style="padding: 10px 24px; font-size:14px; margin-top:8px;">Search Flights</button>
            </div>
          `;
          const btn = document.getElementById('btn-empty-goto-flight');
          if (btn) btn.onclick = () => switchView('flight');
        } else {
          flightList.innerHTML = '';
          flightBookings.forEach(booking => {
            const card = document.createElement('div');
            card.className = 'saved-booking-card';
            let methodBadgeHtml = '';
            if (booking.paymentMethod) {
              const isBkash = booking.paymentMethod.toLowerCase().includes('bkash');
              const isNagad = booking.paymentMethod.toLowerCase().includes('nagad');
              const bg = isBkash ? '#FDF2F8' : (isNagad ? '#FFF7ED' : '#F1F5F9');
              const color = isBkash ? '#BE185D' : (isNagad ? '#C2410C' : '#475569');
              const shortName = isBkash ? 'bKash' : (isNagad ? 'Nagad' : (booking.paymentMethod.includes('Points') ? 'Points' : 'Card'));
              methodBadgeHtml = `<span style="font-size:11px; font-weight:800; padding:2px 8px; border-radius:10px; background:${bg}; color:${color};">${shortName}</span>`;
            }

            card.innerHTML = `
              <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span class="saved-booking-ref-badge">${escapeHtml(booking.id)}</span>
                  <span class="status-badge ${booking.status.toLowerCase()}">${escapeHtml(booking.status)}</span>
                  ${methodBadgeHtml}
                </div>
                <h4 style="font-size:17px; font-weight:800; color:var(--dark);">${escapeHtml(booking.route)}</h4>
                <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
                  Flight: ${escapeHtml(booking.flightNumber)} • Date: ${formatDisplayDate(booking.date)} • ${booking.passengersCount} Traveler${booking.passengersCount > 1 ? 's' : ''}
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:20px;">
                <div style="text-align:right;">
                  <div style="font-size:18px; font-weight:800; color:var(--primary);">${formatBDT(booking.totalPrice)}</div>
                  <div style="font-size:11px; color:var(--text-muted);">Total Paid</div>
                </div>

                <div class="saved-booking-actions">
                  <button class="btn-outline btn-view-booking-details" data-id="${escapeHtml(booking.id)}" data-type="flight" style="padding: 8px 16px; font-size:13px;">
                    View Details
                  </button>
                  ${booking.status !== 'Cancelled' ? `
                    <button class="btn-cancel-booking" data-id="${escapeHtml(booking.id)}" data-type="flight">
                      Cancel Booking
                    </button>
                  ` : ''}
                  <button type="button" class="btn-delete-booking" data-id="${escapeHtml(booking.id)}" data-type="flight" aria-label="Delete booking ${escapeHtml(booking.id)}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            `;
            flightList.appendChild(card);
          });
        }
      }

      // Render Hotels
      if (hotelList) {
        if (hotelBookings.length === 0) {
          hotelList.innerHTML = `
            <div class="empty-state-box">
              <div class="empty-state-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <h3 class="empty-state-title">No hotel bookings yet. Start planning your next adventure.</h3>
              <p class="empty-state-desc">Explore handpicked stays, resorts, and city hotels with best rate guarantees.</p>
              <button class="btn-search-main" id="btn-empty-goto-hotel" style="padding: 10px 24px; font-size:14px; margin-top:8px;">Search Hotels</button>
            </div>
          `;
          const btn = document.getElementById('btn-empty-goto-hotel');
          if (btn) btn.onclick = () => switchView('hotel');
        } else {
          hotelList.innerHTML = '';
          hotelBookings.forEach(booking => {
            const card = document.createElement('div');
            card.className = 'saved-booking-card';
            card.innerHTML = `
              <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                  <span class="saved-booking-ref-badge">${escapeHtml(booking.id)}</span>
                  <span class="status-badge ${booking.status.toLowerCase()}">${escapeHtml(booking.status)}</span>
                </div>
                <h4 style="font-size:17px; font-weight:800; color:var(--dark);">${escapeHtml(booking.hotelName)}</h4>
                <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">
                  ${escapeHtml(booking.roomType)} • ${formatDisplayDate(booking.checkIn)} to ${formatDisplayDate(booking.checkOut)} (${booking.nights} nights)
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:20px;">
                <div style="text-align:right;">
                  <div style="font-size:18px; font-weight:800; color:var(--primary);">${formatBDT(booking.totalPrice)}</div>
                  <div style="font-size:11px; color:var(--text-muted);">Total Paid</div>
                </div>

                <div class="saved-booking-actions">
                  <button class="btn-outline btn-view-booking-details" data-id="${escapeHtml(booking.id)}" data-type="hotel" style="padding: 8px 16px; font-size:13px;">
                    View Details
                  </button>
                  ${booking.status !== 'Cancelled' ? `
                    <button class="btn-cancel-booking" data-id="${escapeHtml(booking.id)}" data-type="hotel">
                      Cancel Booking
                    </button>
                  ` : ''}
                  <button type="button" class="btn-delete-booking" data-id="${escapeHtml(booking.id)}" data-type="hotel" aria-label="Delete booking ${escapeHtml(booking.id)}">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                    </svg>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            `;
            hotelList.appendChild(card);
          });
        }
      }

      // Wire Action Buttons
      document.querySelectorAll('.btn-cancel-booking').forEach(btn => {
        btn.onclick = () => {
          const id = btn.dataset.id;
          const type = btn.dataset.type;
          handleCancelBooking(id, type);
        };
      });

      document.querySelectorAll('.btn-view-booking-details').forEach(btn => {
        btn.onclick = () => {
          const id = btn.dataset.id;
          const type = btn.dataset.type;
          openBookingDetailsModal(id, type);
        };
      });

      document.querySelectorAll('.btn-delete-booking').forEach(btn => {
        btn.onclick = () => handleDeleteBooking(btn.dataset.id, btn.dataset.type);
      });
    }

    if (flightTabBtn && hotelTabBtn) {
      flightTabBtn.onclick = () => {
        flightTabBtn.classList.add('active');
        hotelTabBtn.classList.remove('active');
        activeTab = 'flight';
        if (flightList) flightList.style.display = 'flex';
        if (hotelList) hotelList.style.display = 'none';
      };

      hotelTabBtn.onclick = () => {
        hotelTabBtn.classList.add('active');
        flightTabBtn.classList.remove('active');
        activeTab = 'hotel';
        if (flightList) flightList.style.display = 'none';
        if (hotelList) hotelList.style.display = 'flex';
      };
    }

    // Clear Data Button
    const clearBtn = document.getElementById('btn-clear-all-data');
    if (clearBtn) {
      clearBtn.onclick = (e) => {
        if (e) e.preventDefault();
        const clearModal = document.getElementById('clear-data-modal');
        if (clearModal) {
          clearModal.classList.add('open');
        } else {
          // Fallback direct clear
          store.removeItem(FLIGHT_BOOKINGS_KEY);
          store.removeItem(HOTEL_BOOKINGS_KEY);
          loadAndRender();
          showToast('All saved demo bookings have been cleared.', 'premium-success');
        }
      };
    }

    loadAndRender();
  }

  let pendingCancelTarget = null;
  let pendingDeleteTarget = null;

  function handleCancelBooking(id, type) {
    pendingCancelTarget = { id, type };
    const modal = document.getElementById('cancel-booking-modal');
    const idEl = document.getElementById('cancel-modal-booking-id');
    if (idEl) idEl.textContent = id;

    if (modal) {
      modal.classList.add('open');
    } else {
      executeCancellation(id, type);
    }
  }

  function executeCancellation(id, type) {
    if (!id) return;
    const key = type === 'flight' ? FLIGHT_BOOKINGS_KEY : HOTEL_BOOKINGS_KEY;
    const bookings = getBookings(key);
    const target = bookings.find(b => b.id === id);

    if (target) {
      target.status = 'Cancelled';
      target.cancelledAt = new Date().toISOString();
      store.setItem(key, JSON.stringify(bookings));
      showToast(`Booking ${id} has been cancelled.`, 'info');
      renderBookingsPage();
    }
  }

  function initCancelBookingModal() {
    const modal = document.getElementById('cancel-booking-modal');
    const proceedBtn = document.getElementById('btn-proceed-cancel-booking');
    const abortBtn = document.getElementById('btn-abort-cancel-booking');
    const closeBtn = document.getElementById('btn-close-cancel-modal');

    function closeModal() {
      if (modal) modal.classList.remove('open');
      pendingCancelTarget = null;
    }

    if (proceedBtn) {
      proceedBtn.onclick = () => {
        if (pendingCancelTarget) {
          executeCancellation(pendingCancelTarget.id, pendingCancelTarget.type);
        }
        closeModal();
      };
    }

    if (abortBtn) abortBtn.onclick = closeModal;
    if (closeBtn) closeBtn.onclick = closeModal;
  }

  function handleDeleteBooking(id, type) {
    pendingDeleteTarget = { id, type };
    const modal = document.getElementById('delete-booking-modal');
    const idEl = document.getElementById('delete-modal-booking-id');
    if (idEl) idEl.textContent = id;

    if (modal) {
      modal.classList.add('open');
    } else {
      executeBookingDeletion(id, type);
    }
  }

  function executeBookingDeletion(id, type) {
    const storageKey = type === 'flight' ? FLIGHT_BOOKINGS_KEY : HOTEL_BOOKINGS_KEY;
    const bookings = getBookings(storageKey);
    const remainingBookings = bookings.filter(booking => booking.id !== id);
    if (remainingBookings.length === bookings.length) return;

    try {
      store.setItem(storageKey, JSON.stringify(remainingBookings));
      showToast(`Booking ${id} deleted.`, 'premium-success');
      renderBookingsPage();
    } catch (error) {
      console.error('Failed to delete booking:', error);
      showToast('Could not delete this booking. Please try again.', 'error');
    }
  }

  function initDeleteBookingModal() {
    const modal = document.getElementById('delete-booking-modal');
    const confirmBtn = document.getElementById('btn-confirm-delete-booking');

    function closeModal() {
      if (modal) modal.classList.remove('open');
      pendingDeleteTarget = null;
    }

    if (confirmBtn) {
      confirmBtn.onclick = () => {
        const target = pendingDeleteTarget;
        closeModal();
        if (target) executeBookingDeletion(target.id, target.type);
      };
    }

    document.querySelectorAll('#delete-booking-modal .modal-close-btn, #delete-booking-modal .btn-close-modal').forEach(button => {
      button.addEventListener('click', closeModal);
    });

    if (modal) {
      modal.addEventListener('click', event => {
        if (event.target === modal) closeModal();
      });
    }
  }

  function openBookingDetailsModal(id, type) {
    const key = type === 'flight' ? FLIGHT_BOOKINGS_KEY : HOTEL_BOOKINGS_KEY;
    const bookings = getBookings(key);
    const b = bookings.find(item => item.id === id);
    if (!b) return;

    const modal = document.getElementById('booking-summary-modal');
    const content = document.getElementById('booking-modal-summary-content');
    if (!modal || !content) return;

    if (type === 'flight') {
      content.innerHTML = `
        <div class="boarding-pass-visual">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--border-light); padding-bottom:12px; margin-bottom:14px;">
            <div>
              <div style="font-size:12px; font-weight:800; color:var(--primary); text-transform:uppercase;">AirAsia E-Ticket</div>
              <div style="font-size:18px; font-weight:800; color:var(--dark);">${escapeHtml(b.id)}</div>
            </div>
            <span class="status-badge ${b.status.toLowerCase()}">${escapeHtml(b.status)}</span>
          </div>

          <div style="margin-bottom:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Flight Route</div>
            <div style="font-size:17px; font-weight:800; color:var(--dark);">${escapeHtml(b.route)}</div>
            <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">Flight: ${escapeHtml(b.flightNumber)} • Date: ${formatDisplayDate(b.date)}</div>
          </div>

          <div style="margin-bottom:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Passengers</div>
            <ul style="padding-left:18px; font-size:14px; color:var(--dark);">
              ${b.passengersList.map(p => `<li>${escapeHtml(p.name)} (${escapeHtml(p.type)})</li>`).join('')}
            </ul>
          </div>

          <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-light); padding-top:12px;">
            <div>
              <div style="font-size:12px; color:var(--text-muted);">Payment Method: <strong>${escapeHtml(b.paymentMethod || 'Credit Card')}</strong></div>
              ${b.transactionId ? `<div style="font-size:12px; color:var(--text-muted);">TrxID: <strong style="font-family:monospace;">${escapeHtml(b.transactionId)}</strong></div>` : ''}
              <div style="font-size:12px; color:var(--text-muted); margin-top:2px;">Contact: ${escapeHtml(b.contactEmail || '')}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px; color:var(--text-muted);">Total Paid</div>
              <div style="font-size:20px; font-weight:800; color:var(--primary);">${formatBDT(b.totalPrice)}</div>
            </div>
          </div>

          <div class="barcode-mock"></div>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="boarding-pass-visual">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px dashed var(--border-light); padding-bottom:12px; margin-bottom:14px;">
            <div>
              <div style="font-size:12px; font-weight:800; color:var(--primary); text-transform:uppercase;">Hotel Booking Voucher</div>
              <div style="font-size:18px; font-weight:800; color:var(--dark);">${escapeHtml(b.id)}</div>
            </div>
            <span class="status-badge ${b.status.toLowerCase()}">${escapeHtml(b.status)}</span>
          </div>

          <div style="margin-bottom:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Hotel & Location</div>
            <div style="font-size:17px; font-weight:800; color:var(--dark);">${escapeHtml(b.hotelName)} (${escapeHtml(b.city)})</div>
            <div style="font-size:13px; color:var(--text-muted); margin-top:2px;">Room: ${escapeHtml(b.roomType)}</div>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:12px;">
            <div>
              <div style="font-size:12px; color:var(--text-muted);">Check-in</div>
              <div style="font-size:14px; font-weight:700;">${formatDisplayDate(b.checkIn)}</div>
            </div>
            <div>
              <div style="font-size:12px; color:var(--text-muted);">Check-out</div>
              <div style="font-size:14px; font-weight:700;">${formatDisplayDate(b.checkOut)}</div>
            </div>
          </div>

          <div style="margin-bottom:12px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Lead Guest</div>
            <div style="font-size:14px; color:var(--dark);">${escapeHtml(b.leadGuest)} (${b.guestCount} Guests, ${b.rooms} Room)</div>
            <div style="font-size:12px; color:var(--text-muted);">Email: ${escapeHtml(b.email)} • Phone: ${escapeHtml(b.phone)}</div>
          </div>

          <div style="display:flex; justify-content:space-between; border-top:1px dashed var(--border-light); padding-top:12px;">
            <div>
              <div style="font-size:12px; color:var(--text-muted);">Duration: ${b.nights} nights</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:12px; color:var(--text-muted);">Total Amount</div>
              <div style="font-size:20px; font-weight:800; color:var(--primary);">${formatBDT(b.totalPrice)}</div>
            </div>
          </div>

          <div class="barcode-mock"></div>
        </div>
      `;
    }

    modal.classList.add('open');
  }

  function getBookings(storageKey) {
    try {
      const raw = store.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveBooking(storageKey, record) {
    try {
      const list = getBookings(storageKey);
      list.unshift(record);
      store.setItem(storageKey, JSON.stringify(list));
    } catch (e) {
      console.error('Failed saving booking:', e);
    }
  }

  // ==========================================================================
  // Popular Destinations & Deals Card Interactivity
  // ==========================================================================
  function initHomeWidgets() {
    const destContainer = document.getElementById('popular-destinations-grid');
    if (destContainer) {
      destContainer.innerHTML = '';
      POPULAR_DESTINATIONS.forEach(item => {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.innerHTML = `
          <div class="destination-img-wrap">
            <img src="${item.image}" alt="${escapeHtml(item.city)}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=600&q=80'" />
            <span class="destination-badge">${escapeHtml(item.tag)}</span>
          </div>
          <div class="destination-body">
            <div class="destination-route">
              <span class="destination-name">${escapeHtml(item.city)}</span>
              <span class="destination-code">${escapeHtml(item.code)}</span>
            </div>
            <span class="destination-country">${escapeHtml(item.country)}</span>
            <div class="destination-footer">
              <span class="price-label" style="color: rgba(255, 255, 255, 0.85) !important;">Fares from</span>
              <span class="price-amount" style="color: #ffffff !important; font-weight: 800;">${formatBDT(item.price)}</span>
            </div>
          </div>
        `;

        // Clicking destination card populates destination field and scrolls to search form!
        card.addEventListener('click', () => {
          State.flightSearch.destination = item.code;
          updateAirportDisplay('destination', item.code);
          const searchCard = document.getElementById('flight-search-card');
          if (searchCard) {
            searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            searchCard.style.outline = '3px solid var(--primary)';
            setTimeout(() => { searchCard.style.outline = 'none'; }, 1200);
          }
          showToast(`Destination set to ${item.city} (${item.code})`, 'info');
        });

        destContainer.appendChild(card);
      });
    }

    // Deals cards
    const dealsContainer = document.getElementById('flight-deals-grid');
    if (dealsContainer) {
      dealsContainer.innerHTML = '';
      FLIGHT_DEALS.forEach(deal => {
        const card = document.createElement('div');
        card.className = 'deal-card';
        card.innerHTML = `
          <div class="deal-info">
            <h4>${escapeHtml(deal.label)}</h4>
            <p>${escapeHtml(deal.desc)}</p>
          </div>
          <div class="deal-price">
            <span style="font-size:11px; color:rgba(255, 255, 255, 0.88) !important; display:block; text-transform:uppercase; letter-spacing:0.4px; font-weight:600;">One Way from</span>
            <span class="deal-price-val" style="color: #ffffff !important; font-weight: 800;">${formatBDT(deal.price)}</span>
          </div>
        `;

        card.addEventListener('click', () => {
          State.flightSearch.origin = deal.from;
          State.flightSearch.destination = deal.to;
          updateAirportDisplay('origin', deal.from);
          updateAirportDisplay('destination', deal.to);
          const searchCard = document.getElementById('flight-search-card');
          if (searchCard) {
            searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          showToast(`Route updated to ${deal.label}`, 'info');
        });

        dealsContainer.appendChild(card);
      });
    }

    // Observe newly generated destination cards
    observeScrollRevealElements();
  }

  // ==========================================================================
  // Intersection Observer Scroll Animations (Benefit Cards & Destinations)
  // ==========================================================================
  let scrollRevealObserver = null;

  function initScrollRevealObserver() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.benefit-card, .destination-card').forEach(el => {
        el.classList.add('in-view');
      });
      return;
    }

    if (scrollRevealObserver) {
      scrollRevealObserver.disconnect();
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    scrollRevealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    observeScrollRevealElements();
  }

  function observeScrollRevealElements() {
    if (!scrollRevealObserver) return;

    // Observe Popular Destination Cards with subtle sequential stagger per grid row
    const destContainer = document.getElementById('popular-destinations-grid');
    if (destContainer) {
      const destCards = destContainer.querySelectorAll('.destination-card');
      destCards.forEach((card, idx) => {
        if (!card.classList.contains('in-view')) {
          card.style.transitionDelay = `${(idx % 4) * 80}ms`;
          scrollRevealObserver.observe(card);
        }
      });
    }

    // Observe Benefit Cards with sequential stagger within their container
    document.querySelectorAll('.benefits-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.benefit-card');
      cards.forEach((card, idx) => {
        if (!card.classList.contains('in-view')) {
          card.style.transitionDelay = `${(idx % 3) * 110}ms`;
          scrollRevealObserver.observe(card);
        }
      });
    });

    // Standalone benefit cards if any
    document.querySelectorAll('.benefit-card:not(.in-view)').forEach((card, idx) => {
      if (!card.style.transitionDelay) {
        card.style.transitionDelay = `${(idx % 3) * 100}ms`;
      }
      scrollRevealObserver.observe(card);
    });
  }

  // ==========================================================================
  // Global Event Listeners & Initialization
  // ==========================================================================
  function initApp() {
    seedInitialDemoBookings();

    // Nav links setup
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = link.dataset.targetView;
        if (targetView) switchView(targetView);
      });
    });

    // Mobile Hamburger button
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    if (hamburgerBtn && mobileDrawer) {
      hamburgerBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
    }

    // Modify search button on flight results
    const modifySearchBtn = document.getElementById('btn-modify-search');
    if (modifySearchBtn) {
      modifySearchBtn.addEventListener('click', () => {
        switchView('flight');
        const searchCard = document.getElementById('flight-search-card');
        if (searchCard) {
          searchCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    }

    // Back to flight results from booking
    const backToResultsBtn = document.getElementById('btn-back-to-results');
    if (backToResultsBtn) {
      backToResultsBtn.addEventListener('click', () => {
        switchView('flight-results');
      });
    }

    // Print summary buttons
    document.querySelectorAll('.btn-print-summary').forEach(btn => {
      btn.addEventListener('click', () => {
        window.print();
      });
    });

    // View my bookings buttons
    document.querySelectorAll('.btn-goto-my-bookings').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView('bookings');
      });
    });

    // Book another flight buttons
    document.querySelectorAll('.btn-book-another-flight').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView('flight');
      });
    });

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn, .btn-close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        const overlay = btn.closest('.modal-overlay');
        if (overlay) overlay.classList.remove('open');
      });
    });

    // Modal click outside to close
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.classList.remove('open');
      });
    });

    // Dynamic transition that shrinks header height when scrolling down and isolates nav panel
    const siteHeader = document.getElementById('site-header');
    let isHeaderScrolled = false;
    let isScrollBlurTicking = false;

    // Dynamic scroll-linked blur intensity and subtle parallax for sky background & cloud dividers
    const updateScrollBlurIntensity = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      // Progress over first 700px of scrolling
      const progress = Math.min(scrollY / 700, 1);
      // Blur boost increases smoothly from 0px up to 10px
      const blurBoost = (progress * 10).toFixed(1);
      // Ambient backdrop blur increases from 0px up to 16px
      const ambientBlur = (progress * 16).toFixed(1);
      // Ambient backdrop opacity increases from 0 to 0.45
      const ambientOpacity = (progress * 0.45).toFixed(2);
      // Slight saturation boost for glass vibrancy
      const saturateBoost = (1 + progress * 0.15).toFixed(2);

      document.documentElement.style.setProperty('--scroll-blur-boost', `${blurBoost}px`);
      document.documentElement.style.setProperty('--scroll-ambient-blur', `${ambientBlur}px`);
      document.documentElement.style.setProperty('--scroll-ambient-opacity', ambientOpacity);
      document.documentElement.style.setProperty('--scroll-saturate-boost', saturateBoost);

      const aboutView = document.getElementById('view-about');
      const airplane = aboutView?.querySelector('.about-hero img');
      if (airplane) {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const availableScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const animationRange = Math.min(600, availableScroll);
        const airplaneProgress = aboutView.classList.contains('active') && !reducedMotion
          ? Math.min(scrollY / animationRange, 1)
          : 0;
        const isMobileViewport = window.innerWidth <= 768;
        const airplaneOffset = airplaneProgress * (isMobileViewport ? 24 : 160);
        const airplaneScale = 1 - airplaneProgress * (isMobileViewport ? 0.18 : 0.1);

        airplane.style.setProperty('--airplane-scroll-x', `${airplaneOffset.toFixed(1)}px`);
        airplane.style.setProperty('--airplane-scroll-scale', airplaneScale.toFixed(3));
      }

      // Subtle slow parallax for the background plane & cloud photo
      const skyPhoto = document.getElementById('sky-clouds-photo');
      if (skyPhoto) {
        skyPhoto.style.transform = `translate3d(0, ${(scrollY * 0.04).toFixed(1)}px, 0)`;
      }

      // Very subtle parallax on visible cloud section divider photos
      const dividers = document.querySelectorAll('.cloud-divider-photo');
      dividers.forEach(div => {
        const rect = div.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const offset = (rect.top - window.innerHeight / 2) * 0.05;
          div.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
        }
      });

      isScrollBlurTicking = false;
    };

    const handleWindowScroll = () => {
      if (siteHeader) {
        const scrolled = window.scrollY > 20;
        if (scrolled !== isHeaderScrolled) {
          isHeaderScrolled = scrolled;
          siteHeader.classList.toggle('scrolled', isHeaderScrolled);

          // Close open dropdowns if user starts scrolling down
          if (scrolled) {
            const currencyWrap = document.getElementById('currency-dropdown-wrap');
            if (currencyWrap && currencyWrap.classList.contains('open')) {
              currencyWrap.classList.remove('open');
              const cBtn = document.getElementById('currency-selector-btn');
              if (cBtn) cBtn.setAttribute('aria-expanded', 'false');
            }
            const userDropdown = document.getElementById('header-user-dropdown');
            if (userDropdown && userDropdown.classList.contains('open')) {
              userDropdown.classList.remove('open');
              const uBtn = document.getElementById('header-user-btn');
              if (uBtn) uBtn.setAttribute('aria-expanded', 'false');
            }
          }

          // Smoothly track sliding pill during and after layout transition
          requestAnimationFrame(updateNavSlidingPill);
          [50, 120, 220, 350, 500, 650, 800].forEach(delay => {
            setTimeout(updateNavSlidingPill, delay);
          });
        }
      }

      if (!isScrollBlurTicking) {
        requestAnimationFrame(updateScrollBlurIntensity);
        isScrollBlurTicking = true;
      }
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    handleWindowScroll();

    // Dynamic current year in footer
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Initialize modules
    initAuthSystem();
    initClearDataSystem();
    initCancelBookingModal();
    initDeleteBookingModal();
    initCurrencySelector();
    initFlightSearchForm();
    initHomeWidgets();
    initHotelSearchForm();
    initScrollRevealObserver();

    // Initial View
    switchView('flight');
    setTimeout(() => {
      updateNavSlidingPill();
    }, 50);

    window.addEventListener('resize', () => {
      requestAnimationFrame(updateNavSlidingPill);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
