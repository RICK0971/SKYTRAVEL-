import axios from 'axios';

// Types
export interface Airport {
  name: string;
  code: string;
  city: string;
  country: string;
}

export interface Flight {
  airline: {
    name: string;
    logo: string;
  };
  flight: {
    number: string;
    iata: string;
  };
  departure: {
    airport: string;
    timezone: string;
    scheduled: string;
    estimated: string;
    terminal: string;
    gate: string;
  };
  arrival: {
    airport: string;
    timezone: string;
    scheduled: string;
    estimated: string;
    terminal: string;
    gate: string;
  };
  status: string;
  price: {
    currency: string;
    amount: number;
  };
}

// Mock airlines
const mockAirlines = [
  {
    name: "Delta Air Lines",
    code: "DL",
    logo: "https://daisycon.io/images/airline/?width=100&height=30&color=ffffff&iata=DL"
  },
  {
    name: "American Airlines",
    code: "AA",
    logo: "https://daisycon.io/images/airline/?width=100&height=30&color=ffffff&iata=AA"
  },
  {
    name: "United Airlines",
    code: "UA",
    logo: "https://daisycon.io/images/airline/?width=100&height=30&color=ffffff&iata=UA"
  }
];

// API Functions
export const searchAirports = async (query: string): Promise<Airport[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Create a mock airport based on the search query
  return [{
    name: query,
    code: query.substring(0, 3).toUpperCase(),
    city: query,
    country: "United States"
  }];
};

export const searchFlights = async (
  from: string,
  to: string,
  date: string,
  adults: number = 1,
  children: number = 0,
  infants: number = 0,
  cabinClass: string = 'economy'
): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate 2-3 mock flights
  const flights: Flight[] = [];
  const numFlights = Math.floor(Math.random() * 2) + 2; // Random number between 2 and 3

  for (let i = 0; i < numFlights; i++) {
    const airline = mockAirlines[Math.floor(Math.random() * mockAirlines.length)];
    const flightNumber = Math.floor(Math.random() * 1000) + 100;
    const departureTime = new Date(date);
    departureTime.setHours(8 + i * 4); // Flights at 8am, 12pm, 4pm
    const arrivalTime = new Date(departureTime);
    arrivalTime.setHours(departureTime.getHours() + 3); // 3-hour flight

    flights.push({
      airline: {
        name: airline.name,
        logo: airline.logo
      },
      flight: {
        number: flightNumber.toString(),
        iata: `${airline.code}${flightNumber}`
      },
      departure: {
        airport: from,
        timezone: "America/New_York",
        scheduled: departureTime.toISOString(),
        estimated: departureTime.toISOString(),
        terminal: String.fromCharCode(65 + i), // A, B, or C
        gate: `${Math.floor(Math.random() * 20) + 1}`
      },
      arrival: {
        airport: to,
        timezone: "America/New_York",
        scheduled: arrivalTime.toISOString(),
        estimated: arrivalTime.toISOString(),
        terminal: String.fromCharCode(65 + i), // A, B, or C
        gate: `${Math.floor(Math.random() * 20) + 1}`
      },
      status: "Scheduled",
      price: {
        currency: "USD",
        amount: Math.floor(Math.random() * (500 - 200) + 200) // Random price between $200 and $500
      }
    });
  }

  return flights;
}; 