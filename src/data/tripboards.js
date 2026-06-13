export const tripboards = [
  // Japan Itinerary
  {
    id: 'tb-japan',
    destinationId: 'japan',
    title: 'Tokyo & Kyoto Highlights',
    creator: {
      name: 'Aditya Shirole',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
      title: 'Travel Expert'
    },
    likes: 854,
    duration: '5 Days, 4 Nights',
    durationDays: 5,
    budget: '₹95,000 / person',
    budgetVal: 95000,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Tokyo & Shinjuku Nightlife',
        activities: [
          {
            time: '02:00 PM',
            title: 'Hotel Check-in',
            description: 'Check in at Shinjuku Granbell Hotel. Rest and freshen up after the flight.',
            category: 'hotel',
            emoji: '🏨',
            duration: '1h'
          },
          {
            time: '05:30 PM',
            title: 'Explore Shinjuku & Godzilla Head',
            description: 'Stroll around Kabukicho, Tokyo\'s famous entertainment district. Spot the massive Godzilla head towering over the Gracery Building.',
            category: 'leisure',
            emoji: '🦖',
            duration: '2h'
          },
          {
            time: '08:00 PM',
            title: 'Ramen Dinner in Omoide Yokocho',
            description: 'Have a delicious, steaming bowl of authentic Tonkotsu Ramen in the narrow, nostalgic alleyways of Memory Lane.',
            category: 'food',
            emoji: '🍜',
            duration: '1.5h'
          }
        ]
      },
      {
        day: 2,
        title: 'Historic Asakusa & Modern Shibuya',
        activities: [
          {
            time: '09:00 AM',
            title: 'Senso-ji Temple Visit',
            description: 'Visit Tokyo\'s oldest and most iconic Buddhist temple in Asakusa. Walk through the giant red Kaminarimon Gate.',
            category: 'culture',
            emoji: '⛩️',
            duration: '2.5h'
          },
          {
            time: '01:00 PM',
            title: 'Sushi Lunch at Tsukiji Outer Market',
            description: 'Enjoy fresh sushi, tamagoyaki (sweet omelet), and street snacks at the historic Tsukiji market area.',
            category: 'food',
            emoji: '🍣',
            duration: '1.5h'
          },
          {
            time: '04:00 PM',
            title: 'Shibuya Crossing & Hachiko Statue',
            description: 'Experience the world\'s busiest pedestrian crossing. Take photos with the loyal Hachiko dog statue nearby.',
            category: 'city',
            emoji: '🚦',
            duration: '2h'
          },
          {
            time: '06:30 PM',
            title: 'Shibuya Sky Sunset',
            description: 'Head up to the open-air observation deck of Shibuya Scramble Square for breathtaking 360-degree views of Tokyo at sunset.',
            category: 'leisure',
            emoji: '🌇',
            duration: '1.5h'
          }
        ]
      },
      {
        day: 3,
        title: 'Day Trip to Mt. Fuji (Hakone)',
        activities: [
          {
            time: '08:00 AM',
            title: 'Romancecar Train to Hakone',
            description: 'Board the scenic Romancecar express train from Shinjuku to Hakone-Yumoto station.',
            category: 'leisure',
            emoji: '🚄',
            duration: '1.5h'
          },
          {
            time: '11:00 AM',
            title: 'Lake Ashi Sightseeing Cruise',
            description: 'Cruise Lake Ashi on a pirate ship with stunning views of the red torii gate of Hakone Shrine and, on clear days, Mt. Fuji.',
            category: 'nature',
            emoji: '⛵',
            duration: '2h'
          },
          {
            time: '02:00 PM',
            title: 'Owakudani Sulphur Valley',
            description: 'Take the Hakone Ropeway cable car to Owakudani volcanic valley. Eat the famous black eggs boiled in natural hot springs.',
            category: 'nature',
            emoji: '🥚',
            duration: '1.5h'
          }
        ]
      },
      {
        day: 4,
        title: 'Bullet Train to Kyoto & Fushimi Inari Shrine',
        activities: [
          {
            time: '08:30 AM',
            title: 'Shinkansen to Kyoto',
            description: 'Experience the world-famous Japanese bullet train from Tokyo to Kyoto, traveling at 320 km/h.',
            category: 'leisure',
            emoji: '🚄',
            duration: '2.5h'
          },
          {
            time: '02:00 PM',
            title: 'Fushimi Inari Torii Path Hike',
            description: 'Hike through the spectacular tunnels of thousands of vermilion torii gates winding up the mountain.',
            category: 'culture',
            emoji: '⛩️',
            duration: '3h'
          },
          {
            time: '07:00 PM',
            title: 'Dinner & Geisha Spotting in Gion',
            description: 'Walk through the historical streets of Gion. Spot geishas heading to teahouses and enjoy a traditional Kaiseki dinner.',
            category: 'culture',
            emoji: '🏮',
            duration: '2h'
          }
        ]
      },
      {
        day: 5,
        title: 'Bamboo Groves & Golden Pavilion',
        activities: [
          {
            time: '09:00 AM',
            title: 'Arashiyama Bamboo Forest',
            description: 'Walk through towering bamboo groves. Listen to the rustling of bamboo stalks swaying in the wind.',
            category: 'nature',
            emoji: '🎋',
            duration: '2h'
          },
          {
            time: '12:00 PM',
            title: 'Kinkaku-ji (Golden Pavilion)',
            description: 'Marvel at the breathtaking Zen temple whose top two floors are completely covered in gold leaf, reflecting in the pond.',
            category: 'culture',
            emoji: '🌟',
            duration: '1.5h'
          },
          {
            time: '04:00 PM',
            title: 'Kyoto Station Departure',
            description: 'Head to Kyoto Station for your return train or airport transfer, concluding your memorable Japan trip.',
            category: 'leisure',
            emoji: '✈️',
            duration: '1h'
          }
        ]
      }
    ],
    flights: ['f-japan-2', 'f-japan-1'],
    hotels: ['h-japan-1', 'h-japan-2']
  },

  // Bali Itinerary
  {
    id: 'tb-bali',
    destinationId: 'bali',
    title: 'Bali Explorer: Tropical Paradise',
    creator: {
      name: 'Shubham Chintalwar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
      title: 'Bali Local Expert'
    },
    likes: 1290,
    duration: '5 Days, 4 Nights',
    durationDays: 5,
    budget: '₹45,000 / person',
    budgetVal: 45000,
    itinerary: [
      {
        day: 1,
        title: 'Ubud Welcoming & Sacred Monkey Forest',
        activities: [
          {
            time: '12:30 PM',
            title: 'Maya Ubud Check-in',
            description: 'Check-in to your resort. Relax by the pool overlooking the Petanu River valley.',
            category: 'hotel',
            emoji: '🏨',
            duration: '1h'
          },
          {
            time: '03:00 PM',
            title: 'Sacred Monkey Forest Sanctuary',
            description: 'Walk through the lush jungle and interact with the playful long-tailed macaques that inhabit the ancient temple ruins.',
            category: 'nature',
            emoji: '🐒',
            duration: '2h'
          },
          {
            time: '07:00 PM',
            title: 'Balinese Crispy Duck Dinner',
            description: 'Savor Bebek Bengil (Crispy Duck), Ubud\'s signature culinary dish, in a restaurant overlooking paddy fields.',
            category: 'food',
            emoji: '🍛',
            duration: '2h'
          }
        ]
      },
      {
        day: 2,
        title: 'Tegallalang Rice Terraces & Volcano View',
        activities: [
          {
            time: '08:30 AM',
            title: 'Tegallalang Rice Terraces & Swing',
            description: 'Take amazing photos at the green terraced valleys. Experience the famous jungle swing over the edge.',
            category: 'nature',
            emoji: '🌴',
            duration: '3h'
          },
          {
            time: '12:30 PM',
            title: 'Kintamani Volcano Lunch',
            description: 'Enjoy a buffet lunch with panoramic views of the active volcano Mt. Batur and its crater lake.',
            category: 'nature',
            emoji: '🌋',
            duration: '2h'
          },
          {
            time: '04:00 PM',
            title: 'Tirta Empul Holy Water Temple',
            description: 'Visit this Hindu Balinese water temple. Participate in a traditional purification ritual in the spring water pools.',
            category: 'culture',
            emoji: '💦',
            duration: '1.5h'
          }
        ]
      },
      {
        day: 3,
        title: 'Nusa Penida Day Trip & Snorkeling',
        activities: [
          {
            time: '07:30 AM',
            title: 'Speed Boat from Sanur',
            description: 'Take a speed boat from Sanur harbor to the ruggedly beautiful island of Nusa Penida.',
            category: 'leisure',
            emoji: '🚤',
            duration: '1h'
          },
          {
            time: '09:30 AM',
            title: 'Kelingking T-Rex Beach',
            description: 'Marvel at the spectacular cliff formation that resembles a T-Rex overlooking the turquoise ocean.',
            category: 'nature',
            emoji: '🦖',
            duration: '2.5h'
          },
          {
            time: '01:30 PM',
            title: 'Angel\'s Billabong & Broken Beach',
            description: 'Explore the natural infinity pool of Angel\'s Billabong and the massive limestone arch of Broken Beach.',
            category: 'nature',
            emoji: '🌊',
            duration: '2h'
          }
        ]
      },
      {
        day: 4,
        title: 'Uluwatu Sunset & Kecak Dance',
        activities: [
          {
            time: '10:00 AM',
            title: 'Relax at Pandawa Beach',
            description: 'Sunbathe on the fine white sands of Pandawa beach, carved out of limestone cliffs.',
            category: 'beach',
            emoji: '🏖️',
            duration: '3h'
          },
          {
            time: '04:30 PM',
            title: 'Uluwatu Temple Cliff Walk',
            description: 'Visit the sea temple perched 70 meters high on a steep cliff. Watch out for the local monkeys!',
            category: 'culture',
            emoji: '🏯',
            duration: '1.5h'
          },
          {
            time: '06:00 PM',
            title: 'Kecak Fire Dance Show',
            description: 'Watch the dramatic sunset performance of the Kecak dance against the backdrop of the ocean.',
            category: 'culture',
            emoji: '🔥',
            duration: '1.5h'
          }
        ]
      },
      {
        day: 5,
        title: 'Seminyak Shopping & Departure',
        activities: [
          {
            time: '09:30 AM',
            title: 'Boutique Shopping in Seminyak',
            description: 'Stroll around Seminyak\'s trendy shopping streets for Balinese crafts, fashion, and souvenirs.',
            category: 'shopping',
            emoji: '🛍️',
            duration: '3h'
          },
          {
            time: '02:00 PM',
            title: 'Airport Transfer',
            description: 'Check out from your hotel and head to Denpasar International Airport for your flight home.',
            category: 'leisure',
            emoji: '✈️',
            duration: '1.5h'
          }
        ]
      }
    ],
    flights: ['f-bali-1', 'f-bali-2'],
    hotels: ['h-bali-1', 'h-bali-2']
  }
];

export default tripboards;
