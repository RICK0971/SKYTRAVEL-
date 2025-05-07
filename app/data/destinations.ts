export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  rating: number;
  price: {
    currency: string;
    amount: number;
  };
  highlights: string[];
  bestTimeToVisit: string;
  popularAttractions: string[];
}

export const destinations: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    description: "The City of Light, known for its iconic Eiffel Tower, world-class museums, and romantic atmosphere.",
    image: "/images/destinations/paris.jpeg",
    rating: 4.8,
    price: {
      currency: "USD",
      amount: 1200
    },
    highlights: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Champs-Élysées"
    ],
    bestTimeToVisit: "April to June, September to October",
    popularAttractions: [
      "Eiffel Tower",
      "Louvre Museum",
      "Notre-Dame Cathedral",
      "Arc de Triomphe",
      "Montmartre"
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    description: "A vibrant metropolis where traditional culture meets cutting-edge technology.",
    image: "/images/destinations/tokyo.jpeg",
    rating: 4.7,
    price: {
      currency: "USD",
      amount: 1500
    },
    highlights: [
      "Shibuya Crossing",
      "Tokyo Skytree",
      "Senso-ji Temple",
      "Tsukiji Outer Market"
    ],
    bestTimeToVisit: "March to May, September to November",
    popularAttractions: [
      "Tokyo Skytree",
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Meiji Shrine",
      "Tokyo Disneyland"
    ]
  },
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    description: "The city that never sleeps, offering iconic landmarks, world-class dining, and endless entertainment.",
    image: "/images/destinations/new york.jpg",
    rating: 4.6,
    price: {
      currency: "USD",
      amount: 1300
    },
    highlights: [
      "Statue of Liberty",
      "Central Park",
      "Times Square",
      "Empire State Building"
    ],
    bestTimeToVisit: "April to June, September to November",
    popularAttractions: [
      "Statue of Liberty",
      "Central Park",
      "Times Square",
      "Empire State Building",
      "Brooklyn Bridge"
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    description: "The Eternal City, home to ancient ruins, Renaissance art, and delicious cuisine.",
    image: "/images/destinations/rome.jpg",
    rating: 4.7,
    price: {
      currency: "USD",
      amount: 1100
    },
    highlights: [
      "Colosseum",
      "Vatican City",
      "Trevi Fountain",
      "Roman Forum"
    ],
    bestTimeToVisit: "April to June, September to October",
    popularAttractions: [
      "Colosseum",
      "Vatican Museums",
      "Trevi Fountain",
      "Pantheon",
      "Roman Forum"
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    description: "A tropical paradise known for its lush landscapes, vibrant culture, and beautiful beaches.",
    image: "/images/destinations/bali.jpg",
    rating: 4.8,
    price: {
      currency: "USD",
      amount: 900
    },
    highlights: [
      "Ubud Monkey Forest",
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Seminyak Beach"
    ],
    bestTimeToVisit: "April to October",
    popularAttractions: [
      "Ubud Monkey Forest",
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Seminyak Beach",
      "Sacred Monkey Forest Sanctuary"
    ]
  }
]; 