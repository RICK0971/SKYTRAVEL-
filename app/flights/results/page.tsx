"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane, ArrowLeft, LogOut, Filter, Clock, MapPin, Calendar } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { searchFlights } from "@/app/services/flightlabs"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"

export default function FlightResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [flights, setFlights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFlight, setSelectedFlight] = useState<string | null>(null)
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([])
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])

  // Get search parameters
  const from = searchParams.get('from') || ''
  const to = searchParams.get('to') || ''
  const date = searchParams.get('date') || ''
  const adults = parseInt(searchParams.get('adults') || '1')
  const children = parseInt(searchParams.get('children') || '0')
  const infants = parseInt(searchParams.get('infants') || '0')
  const cabinClass = searchParams.get('cabinClass') || 'ECONOMY'

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true)
        const results = await searchFlights(from, to, date, adults, children, infants, cabinClass)
        setFlights(results)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch flights')
        toast.error('Failed to fetch flights. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (from && to && date) {
      fetchFlights()
    }
  }, [from, to, date, adults, children, infants, cabinClass])

  const formatTime = (timeString: string) => {
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const formatDuration = (departure: string, arrival: string) => {
    const start = new Date(departure)
    const end = new Date(arrival)
    const duration = end.getTime() - start.getTime()
    const hours = Math.floor(duration / (1000 * 60 * 60))
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const handleFlightSelect = (flightId: string) => {
    setSelectedFlight(flightId)
    toast.success('Flight selected! Proceeding to booking...')
    // Here you would typically navigate to a booking page
    // router.push(`/flights/booking?flightId=${flightId}`);
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString; // Return the original string if date parsing fails
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
              <p className="text-xl">Searching for flights...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <p className="text-xl text-red-500 mb-4">{error}</p>
              <Button
                onClick={() => router.back()}
                className="bg-cyan-600 hover:bg-cyan-700"
              >
                Go Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: "url('/flight-background.jpg')" }}
      />

      {/* Navigation Bar */}
      <nav className="relative z-10 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white hover:text-cyan-400"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Search
            </Button>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:text-cyan-400"
                onClick={() => router.push('/destinations')}
              >
                Destinations
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-cyan-400"
                onClick={() => router.push('/hotels')}
              >
                Hotels
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-cyan-400"
                onClick={() => router.push('/flights')}
              >
                Flights
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:text-cyan-400"
                onClick={() => router.push('/')}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Search Summary */}
        <div className="mb-8 p-6 rounded-lg backdrop-blur-md bg-black/40 border border-cyan-500/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-cyan-400 mr-2" />
                <span>{from} → {to}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-cyan-400 mr-2" />
                <span>{formatDate(date)}</span>
              </div>
              <div className="flex items-center">
                <Plane className="h-5 w-5 text-cyan-400 mr-2" />
                <span>{adults} Adult{adults > 1 ? 's' : ''}, {children} Child{children !== 1 ? 'ren' : ''}, {infants} Infant{infants !== 1 ? 's' : ''}</span>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              onClick={() => router.back()}
            >
              Modify Search
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters */}
          <div className="w-64 space-y-6">
            <Card className="backdrop-blur-md bg-black/40 border border-cyan-500/50 p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Price Range</label>
                <Slider
                  defaultValue={[0, 1000]}
                  max={1000}
                  step={50}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Airlines */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Airlines</label>
                <div className="space-y-2">
                  {['Delta', 'American Airlines', 'United', 'Southwest'].map((airline) => (
                    <div key={airline} className="flex items-center">
                      <Checkbox
                        id={airline}
                        checked={selectedAirlines.includes(airline)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAirlines([...selectedAirlines, airline])
                          } else {
                            setSelectedAirlines(selectedAirlines.filter(a => a !== airline))
                          }
                        }}
                      />
                      <label htmlFor={airline} className="ml-2 text-sm">
                        {airline}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <div className="space-y-2">
                  {['0-3 hours', '3-6 hours', '6-9 hours', '9+ hours'].map((duration) => (
                    <div key={duration} className="flex items-center">
                      <Checkbox
                        id={duration}
                        checked={selectedDurations.includes(duration)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedDurations([...selectedDurations, duration])
                          } else {
                            setSelectedDurations(selectedDurations.filter(d => d !== duration))
                          }
                        }}
                      />
                      <label htmlFor={duration} className="ml-2 text-sm">
                        {duration}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Results */}
          <div className="flex-1 space-y-6">
            {flights.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-400">No flights found for your search criteria.</p>
                <Button
                  className="mt-4 bg-cyan-600 hover:bg-cyan-700"
                  onClick={() => router.back()}
                >
                  Modify Search
                </Button>
              </div>
            ) : (
              flights.map((flight) => (
                <Card
                  key={flight.flight.iata}
                  className={`backdrop-blur-md bg-black/40 border border-cyan-500/50 transition-all duration-300 hover:scale-[1.02] ${
                    selectedFlight === flight.flight.iata ? 'ring-2 ring-cyan-500' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={flight.airline.logo}
                          alt={flight.airline.name}
                          className="h-8 w-8 object-contain"
                        />
                        <div>
                          <h3 className="font-semibold">{flight.airline.name}</h3>
                          <p className="text-sm text-gray-400">{flight.flight.number}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-cyan-400">
                          ${flight.price.amount}
                        </p>
                        <p className="text-sm text-gray-400">per person</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{formatTime(flight.departure.scheduled)}</p>
                        <p className="text-sm text-gray-400">{flight.departure.airport}</p>
                      </div>
                      <div className="flex-1 px-8">
                        <div className="flex items-center">
                          <div className="flex-1 h-0.5 bg-cyan-500/50"></div>
                          <Plane className="h-4 w-4 text-cyan-400 mx-2 transform rotate-90" />
                          <div className="flex-1 h-0.5 bg-cyan-500/50"></div>
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-2">
                          {formatDuration(flight.departure.scheduled, flight.arrival.scheduled)}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{formatTime(flight.arrival.scheduled)}</p>
                        <p className="text-sm text-gray-400">{flight.arrival.airport}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-cyan-400 mr-1" />
                          <span className="text-sm">{flight.status}</span>
                        </div>
                        {flight.departure.terminal && (
                          <div className="text-sm text-gray-400">
                            Terminal {flight.departure.terminal}
                          </div>
                        )}
                      </div>
                      <Button
                        className="bg-cyan-600 hover:bg-cyan-700"
                        onClick={() => handleFlightSelect(flight.flight.iata)}
                      >
                        Select Flight
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 