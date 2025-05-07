import axios from 'axios';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';

if (!RAPIDAPI_KEY) {
  console.error('RAPIDAPI_KEY is not defined in environment variables');
}

// Mock hotel data
const mockHotels: Hotel[] = [
  {
    hotel_id: "1",
    name: "Grand Luxury Resort & Spa",
    main_photo_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    review_score: 9.2,
    review_nr: 1245,
    address: {
      street: "123 Ocean Drive",
      city: "Miami",
      country: "United States"
    },
    price_breakdown: {
      currency: "USD",
      gross_amount: 299
    },
    url: "https://booking.com",
    hotel_info: {
      hotel_type: "Resort",
      hotel_facilities: ["Swimming Pool", "Spa", "Fitness Center", "Restaurant", "Beach Access"]
    }
  },
  {
    hotel_id: "2",
    name: "Urban Boutique Hotel",
    main_photo_url: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    review_score: 8.7,
    review_nr: 856,
    address: {
      street: "456 Downtown Ave",
      city: "New York",
      country: "United States"
    },
    price_breakdown: {
      currency: "USD",
      gross_amount: 199
    },
    url: "https://booking.com",
    hotel_info: {
      hotel_type: "Boutique",
      hotel_facilities: ["Rooftop Bar", "Business Center", "Room Service", "Free WiFi", "Gym"]
    }
  },
  {
    hotel_id: "3",
    name: "Mountain View Lodge",
    main_photo_url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    review_score: 9.5,
    review_nr: 632,
    address: {
      street: "789 Mountain Road",
      city: "Denver",
      country: "United States"
    },
    price_breakdown: {
      currency: "USD",
      gross_amount: 249
    },
    url: "https://booking.com",
    hotel_info: {
      hotel_type: "Lodge",
      hotel_facilities: ["Ski Storage", "Hot Tub", "Restaurant", "Fireplace", "Hiking Trails"]
    }
  },
  {
    hotel_id: "4",
    name: "Seaside Inn & Suites",
    main_photo_url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    review_score: 8.9,
    review_nr: 478,
    address: {
      street: "321 Beach Boulevard",
      city: "San Diego",
      country: "United States"
    },
    price_breakdown: {
      currency: "USD",
      gross_amount: 179
    },
    url: "https://booking.com",
    hotel_info: {
      hotel_type: "Beach Hotel",
      hotel_facilities: ["Private Beach", "Pool", "Water Sports", "Restaurant", "Bar"]
    }
  },
  {
    hotel_id: "5",
    name: "Historic Downtown Hotel",
    main_photo_url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    review_score: 9.0,
    review_nr: 923,
    address: {
      street: "567 Main Street",
      city: "Chicago",
      country: "United States"
    },
    price_breakdown: {
      currency: "USD",
      gross_amount: 229
    },
    url: "https://booking.com",
    hotel_info: {
      hotel_type: "Historic",
      hotel_facilities: ["Historic Tours", "Fine Dining", "Spa", "Ballroom", "Business Center"]
    }
  }
];

// Mock locations data
const mockLocations: Location[] = [
  {
    dest_id: "MIA",
    name: "Miami",
    country: "United States",
    city: "Miami"
  },
  {
    dest_id: "NYC",
    name: "New York",
    country: "United States",
    city: "New York"
  },
  {
    dest_id: "DEN",
    name: "Denver",
    country: "United States",
    city: "Denver"
  },
  {
    dest_id: "SAN",
    name: "San Diego",
    country: "United States",
    city: "San Diego"
  },
  {
    dest_id: "CHI",
    name: "Chicago",
    country: "United States",
    city: "Chicago"
  }
];

const bookingApi = axios.create({
  baseURL: 'https://booking-com15.p.rapidapi.com/api/v1',
  headers: {
    'X-RapidAPI-Key': RAPIDAPI_KEY,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to log requests
bookingApi.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    console.log('With headers:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to log responses
bookingApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return Promise.reject(error);
  }
);

export interface HotelSearchParams {
  location: string;
  checkin_date: string;
  checkout_date: string;
  adults_number: number;
  room_number: number;
  children_number: number;
}

export interface Location {
  dest_id: string;
  name: string;
  country: string;
  city?: string;
}

export interface Hotel {
  hotel_id: string;
  name: string;
  main_photo_url: string;
  review_score: number;
  review_nr: number;
  address: {
    street: string;
    city: string;
    country: string;
  };
  price_breakdown: {
    currency: string;
    gross_amount: number;
  };
  url: string;
  hotel_info: {
    hotel_type: string;
    hotel_facilities: string[];
  };
}

export const searchLocations = async (query: string): Promise<Location[]> => {
  try {
    // Use mock data for locations
    const filteredLocations = mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase()) ||
      location.country.toLowerCase().includes(query.toLowerCase())
    );
    return filteredLocations;
  } catch (error) {
    console.error('Error searching locations:', error);
    throw error;
  }
};

export const searchHotels = async (params: HotelSearchParams): Promise<Hotel[]> => {
  try {
    // Use mock data for hotels
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter hotels based on location
    const filteredHotels = mockHotels.filter(hotel => 
      hotel.address.city.toLowerCase().includes(params.location.toLowerCase())
    );
    
    return filteredHotels;
  } catch (error) {
    console.error('Error searching hotels:', error);
    throw error;
  }
};

export const getHotelDetails = async (hotelId: string): Promise<any> => {
  try {
    const response = await bookingApi.get(`/hotels/getHotelDetails`, {
      params: {
        hotel_id: hotelId,
        languagecode: 'en-us',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting hotel details:', error);
    throw error;
  }
};

export interface CarRentalSearchParams {
  pick_up_latitude: number;
  pick_up_longitude: number;
  drop_off_latitude: number;
  drop_off_longitude: number;
  pick_up_time: string;
  drop_off_time: string;
  driver_age: number;
  currency_code: string;
  location: string;
}

export interface CarRental {
  id: string;
  name: string;
  type: string;
  price: {
    amount: number;
    currency: string;
  };
  provider: {
    name: string;
    rating: number;
  };
  features: string[];
  image_url: string;
  pickup_location: {
    name: string;
    address: string;
  };
  dropoff_location: {
    name: string;
    address: string;
  };
}

export const searchCarRentals = async (params: CarRentalSearchParams): Promise<CarRental[]> => {
  try {
    const response = await bookingApi.get('/cars/searchCarRentals', {
      params: {
        pick_up_latitude: params.pick_up_latitude,
        pick_up_longitude: params.pick_up_longitude,
        drop_off_latitude: params.drop_off_latitude,
        drop_off_longitude: params.drop_off_longitude,
        pick_up_time: params.pick_up_time,
        drop_off_time: params.drop_off_time,
        driver_age: params.driver_age,
        currency_code: params.currency_code,
        location: params.location,
      },
    });

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data);
      return [];
    }

    return response.data.map((car: any) => ({
      id: car.id,
      name: car.name,
      type: car.type,
      price: {
        amount: car.price.amount,
        currency: car.price.currency,
      },
      provider: {
        name: car.provider.name,
        rating: car.provider.rating,
      },
      features: car.features || [],
      image_url: car.image_url,
      pickup_location: {
        name: car.pickup_location.name,
        address: car.pickup_location.address,
      },
      dropoff_location: {
        name: car.dropoff_location.name,
        address: car.dropoff_location.address,
      },
    }));
  } catch (error) {
    console.error('Error searching car rentals:', error);
    throw error;
  }
};

export interface Airport {
  name: string;
  code: string;
  city: string;
}

export const searchAirports = async (query: string): Promise<Airport[]> => {
  try {
    // Use mock data for airports
    const mockAirports: Airport[] = [
      {
        name: "John F. Kennedy International Airport",
        code: "JFK",
        city: "New York"
      },
      {
        name: "Los Angeles International Airport",
        code: "LAX",
        city: "Los Angeles"
      },
      {
        name: "Heathrow Airport",
        code: "LHR",
        city: "London"
      },
      {
        name: "Charles de Gaulle Airport",
        code: "CDG",
        city: "Paris"
      },
      {
        name: "Dubai International Airport",
        code: "DXB",
        city: "Dubai"
      }
    ];

    return mockAirports.filter(airport => 
      airport.name.toLowerCase().includes(query.toLowerCase()) ||
      airport.code.toLowerCase().includes(query.toLowerCase()) ||
      airport.city.toLowerCase().includes(query.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching airports:', error);
    throw error;
  }
}; 