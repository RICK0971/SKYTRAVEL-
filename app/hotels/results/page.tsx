"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HotelIcon, StarIcon, MapPinIcon, ArrowLeft, LogOut, Filter, Search } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"

// Mock hotel data
const mockHotels = [
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

export default function HotelResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const location = searchParams.get('location') || 'Miami'
  const checkin = searchParams.get('checkin') || '2024-03-20'
  const checkout = searchParams.get('checkout') || '2024-03-25'
  const adults = searchParams.get('adults') || '2'
  const rooms = searchParams.get('rooms') || '1'

  return (
    <main className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/hotel-background.jpg')",
          filter: "blur(3px) brightness(0.4) contrast(1.2)",
        }}
      />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left side - Back button + Navigation buttons */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 flex items-center"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              <Link href="/destinations">
                <Button variant="ghost" className="text-white hover:bg-cyan-500/20">
                  Destinations
                </Button>
              </Link>
              <Link href="/hotels">
                <Button variant="ghost" className="text-white hover:bg-purple-500/20">
                  Hotels
                </Button>
              </Link>
              <Link href="/flights">
                <Button variant="ghost" className="text-white hover:bg-yellow-500/20">
                  Flights
                </Button>
              </Link>
            </div>

            {/* Logo in the middle */}
            <Link href="/about" className="flex items-center space-x-2 group">
              <div className="bg-cyan-500/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/50 transition-all duration-300">
                <HotelIcon className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-white neon-text hidden sm:inline">SkyTravel</span>
            </Link>

            {/* Logout button on the right */}
            <Button variant="ghost" className="hover:bg-red-500/20 text-white" asChild>
              <a href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white neon-text tracking-wider">HOTEL SEARCH RESULTS</h1>
          <p className="text-cyan-300 mt-2">
            {location} • {checkin} to {checkout} • {adults} Adults • {rooms} Room{rooms !== '1' ? 's' : ''}
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card className="backdrop-blur-md bg-black/40 border border-cyan-500/50">
              <CardHeader>
                <CardTitle className="text-white neon-text flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-cyan-300 font-semibold mb-2">Price Range</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      $0 - $200
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      $200 - $300
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      $300+
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-cyan-300 font-semibold mb-2">Hotel Type</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      Resort
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      Boutique
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      Lodge
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      Beach Hotel
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-cyan-300 font-semibold mb-2">Rating</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      <StarIcon className="h-4 w-4 mr-2 text-yellow-400" />
                      9+ Excellent
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      <StarIcon className="h-4 w-4 mr-2 text-yellow-400" />
                      8+ Very Good
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-white hover:bg-cyan-500/20">
                      <StarIcon className="h-4 w-4 mr-2 text-yellow-400" />
                      7+ Good
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
            {mockHotels.map((hotel) => (
              <Card 
                key={hotel.hotel_id} 
                className={`backdrop-blur-md bg-black/40 border border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] ${
                  selectedHotel === hotel.hotel_id ? 'ring-2 ring-cyan-500' : ''
                }`}
                onClick={() => setSelectedHotel(hotel.hotel_id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative w-full md:w-64 h-48">
                      <Image
                        src={hotel.main_photo_url}
                        alt={hotel.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{hotel.name}</h3>
                          <p className="text-cyan-300 mt-1 flex items-center">
                            <MapPinIcon className="h-4 w-4 mr-1" />
                            {hotel.address.street}, {hotel.address.city}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="flex items-center bg-cyan-500/30 px-2 py-1 rounded">
                              <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                              <span className="text-white">{hotel.review_score}</span>
                            </div>
                            <span className="text-cyan-300 ml-2">
                              {hotel.review_nr} reviews
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">
                            {hotel.price_breakdown.currency} {hotel.price_breakdown.gross_amount}
                          </div>
                          <div className="text-cyan-300">per night</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="text-cyan-300 mb-2">Hotel Type: {hotel.hotel_info.hotel_type}</div>
                        <div className="flex flex-wrap gap-2">
                          {hotel.hotel_info.hotel_facilities.map((facility, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          className="bg-cyan-600 hover:bg-cyan-500 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(hotel.url, '_blank');
                          }}
                        >
                          View on Booking.com
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
} 