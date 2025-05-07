"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, HotelIcon, MapPinIcon, StarIcon, Plane, ArrowLeft, LogOut } from "lucide-react"
import { searchHotels, searchLocations, type Hotel, type Location } from "@/app/services/booking"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function HotelsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [searchParams, setSearchParams] = useState({
    location: "",
    checkin_date: "",
    checkout_date: "",
    adults_number: 1,
    room_number: 1,
    children_number: 0,
  })
  const [loading, setLoading] = useState(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [showLocationList, setShowLocationList] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleLocationSearch = async (query: string) => {
    if (query.length < 2) {
      setLocations([])
      return
    }
    
    try {
      const results = await searchLocations(query)
      setLocations(results)
      setShowLocationList(true)
    } catch (error) {
      toast.error("Failed to fetch locations")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'location') {
      handleLocationSearch(value)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.location || !searchParams.checkin_date || !searchParams.checkout_date) {
      toast.error("Please fill in all required fields")
      return
    }

    // Redirect to results page with search parameters
    const queryParams = new URLSearchParams({
      location: searchParams.location,
      checkin: searchParams.checkin_date,
      checkout: searchParams.checkout_date,
      adults: searchParams.adults_number.toString(),
      rooms: searchParams.room_number.toString(),
      children: searchParams.children_number.toString()
    })

    router.push(`/hotels/results?${queryParams.toString()}`)
  }

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
                <Plane className="h-6 w-6 text-white" />
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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white neon-text tracking-wider">FIND YOUR HOTEL</h1>
          <p className="text-cyan-300 mt-2 max-w-2xl mx-auto">
            Search and compare hotels from around the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`backdrop-blur-md bg-black/40 border border-cyan-500/50 shadow-xl rounded-xl transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } hover:scale-[1.02]`}>
            <CardHeader>
              <CardTitle className="text-white neon-text">Hotel Search</CardTitle>
              <CardDescription className="text-cyan-300">Enter your travel details to find the best hotels</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-cyan-300">Destination</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Search city or hotel"
                        value={searchParams.location}
                        onChange={handleInputChange}
                        className="bg-black/50 border-cyan-500/50 text-white"
                      />
                      {showLocationList && locations.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-black/90 border border-cyan-500/50 rounded-md shadow-lg">
                          {locations.map((location) => (
                            <div
                              key={location.dest_id}
                              className="px-4 py-2 hover:bg-cyan-500/20 cursor-pointer text-white"
                              onClick={() => {
                                setSearchParams(prev => ({ ...prev, location: location.dest_id }))
                                setLocations([])
                                setShowLocationList(false)
                              }}
                            >
                              {location.name}, {location.country}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkin_date" className="text-cyan-300">Check-in Date</Label>
                    <Input
                      type="date"
                      id="checkin_date"
                      name="checkin_date"
                      value={searchParams.checkin_date}
                      onChange={handleInputChange}
                      className="bg-black/50 border-cyan-500/50 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="checkout_date" className="text-cyan-300">Check-out Date</Label>
                    <Input
                      type="date"
                      id="checkout_date"
                      name="checkout_date"
                      value={searchParams.checkout_date}
                      onChange={handleInputChange}
                      className="bg-black/50 border-cyan-500/50 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adults_number" className="text-cyan-300">Adults</Label>
                    <Select
                      value={searchParams.adults_number.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, adults_number: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-500/50 text-white">
                        <SelectValue placeholder="Select number of adults" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-500/50">
                        <SelectItem value="1" className="text-white hover:bg-cyan-500/20">1 Adult</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-cyan-500/20">2 Adults</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-cyan-500/20">3 Adults</SelectItem>
                        <SelectItem value="4" className="text-white hover:bg-cyan-500/20">4 Adults</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="room_number" className="text-cyan-300">Rooms</Label>
                    <Select
                      value={searchParams.room_number.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, room_number: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-500/50 text-white">
                        <SelectValue placeholder="Select number of rooms" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-500/50">
                        <SelectItem value="1" className="text-white hover:bg-cyan-500/20">1 Room</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-cyan-500/20">2 Rooms</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-cyan-500/20">3 Rooms</SelectItem>
                        <SelectItem value="4" className="text-white hover:bg-cyan-500/20">4 Rooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="children_number" className="text-cyan-300">Children</Label>
                    <Select
                      value={searchParams.children_number.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, children_number: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-500/50 text-white">
                        <SelectValue placeholder="Select number of children" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-500/50">
                        <SelectItem value="0" className="text-white hover:bg-cyan-500/20">No Children</SelectItem>
                        <SelectItem value="1" className="text-white hover:bg-cyan-500/20">1 Child</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-cyan-500/20">2 Children</SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-cyan-500/20">3 Children</SelectItem>
                      </SelectContent>
                    </Select>
              </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search Hotels"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8 backdrop-blur-md bg-black/40 border border-cyan-500/50">
            <CardHeader>
              <CardTitle className="text-white neon-text">Travel Tips</CardTitle>
              <CardDescription className="text-cyan-300">Make the most of your stay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CalendarIcon className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Book in Advance</h3>
                    <p className="text-cyan-300">
                      Book your hotel at least 2-3 weeks in advance for the best prices and availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <HotelIcon className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Check Hotel Facilities</h3>
                    <p className="text-cyan-300">
                      Review the hotel's amenities and facilities before booking to ensure they meet your needs.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Location Matters</h3>
                    <p className="text-cyan-300">
                      Consider the hotel's location in relation to attractions and transportation.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </main>
  )
}
