import axios from 'axios';

const AVIATIONSTACK_API_KEY = process.env.NEXT_PUBLIC_AVIATIONSTACK_API_KEY;
const AVIATIONSTACK_BASE_URL = 'http://api.aviationstack.com/v1';

interface FlightSearchParams {
  origin: string;
  destination: string;
  date: string;
  return_date?: string;
  adults: number;
  cabin_class?: string;
}

interface Flight {
  id: string;
  airline: {
    name: string;
    iata: string;
  };
  departure: {
    airport: string;
    iata: string;
    scheduled: string;
    terminal?: string;
    gate?: string;
  };
  arrival: {
    airport: string;
    iata: string;
    scheduled: string;
    terminal?: string;
    gate?: string;
  };
  flight: {
    number: string;
    iata: string;
  };
  status: string;
}

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  try {
    const response = await axios.get(`${AVIATIONSTACK_BASE_URL}/flights`, {
      params: {
        access_key: AVIATIONSTACK_API_KEY,
        dep_iata: params.origin,
        arr_iata: params.destination,
        flight_date: params.date,
        limit: 100
      }
    });

    if (!response.data.data) {
      throw new Error('No flight data available');
    }

    return response.data.data.map((flight: any) => ({
      id: flight.flight.iata,
      airline: {
        name: flight.airline.name,
        iata: flight.airline.iata
      },
      departure: {
        airport: flight.departure.airport,
        iata: flight.departure.iata,
        scheduled: flight.departure.scheduled,
        terminal: flight.departure.terminal,
        gate: flight.departure.gate
      },
      arrival: {
        airport: flight.arrival.airport,
        iata: flight.arrival.iata,
        scheduled: flight.arrival.scheduled,
        terminal: flight.arrival.terminal,
        gate: flight.arrival.gate
      },
      flight: {
        number: flight.flight.number,
        iata: flight.flight.iata
      },
      status: flight.flight_status
    }));
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error;
  }
};

export const getAirports = async (query: string) => {
  try {
    const response = await axios.get(`${AVIATIONSTACK_BASE_URL}/airports`, {
      params: {
        access_key: AVIATIONSTACK_API_KEY,
        search: query,
        limit: 10
      }
    });

    if (!response.data.data) {
      throw new Error('No airport data available');
    }

    return response.data.data.map((airport: any) => ({
      code: airport.iata_code,
      name: airport.airport_name,
      city: airport.city,
      country: airport.country_name
    }));
  } catch (error) {
    console.error('Error searching airports:', error);
    throw error;
  }
}; 