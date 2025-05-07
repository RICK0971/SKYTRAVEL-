"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, Plane, ArrowLeft, LogOut, MapPinIcon } from "lucide-react"
import { searchAirports, type Airport } from "@/app/services/flightlabs"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FlightsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const [searchParams, setSearchParams] = useState({
    from: "",
    to: "",
    date: "",
    adults: 1,
    children: 0,
    infants: 0,
    cabinClass: "ECONOMY"
  })
  const [loading, setLoading] = useState(false)
  const [airports, setAirports] = useState<Airport[]>([])
  const [showAirportList, setShowAirportList] = useState(false)
  const [activeField, setActiveField] = useState<"from" | "to" | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleAirportSearch = async (query: string) => {
    if (query.length < 2) {
      setAirports([])
      return
    }
    
    try {
      const results = await searchAirports(query)
      setAirports(results)
      setShowAirportList(true)
    } catch (error) {
      toast.error("Failed to fetch airports")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (name === 'from' || name === 'to') {
      setActiveField(name)
      handleAirportSearch(value)
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchParams.from || !searchParams.to || !searchParams.date) {
      toast.error("Please fill in all required fields")
      return
    }

    // Redirect to results page with search parameters
    const queryParams = new URLSearchParams({
      from: searchParams.from,
      to: searchParams.to,
      date: searchParams.date,
      adults: searchParams.adults.toString(),
      children: searchParams.children.toString(),
      infants: searchParams.infants.toString(),
      cabinClass: searchParams.cabinClass
    })

    router.push(`/flights/results?${queryParams.toString()}`)
  }

  return (
    <main className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/flight-background.jpg')",
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
          <h1 className="text-4xl font-bold text-white neon-text tracking-wider">FIND YOUR FLIGHT</h1>
          <p className="text-cyan-300 mt-2 max-w-2xl mx-auto">
            Search and compare flights from around the world
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className={`backdrop-blur-md bg-black/40 border border-cyan-500/50 shadow-xl rounded-xl transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } hover:scale-[1.02]`}>
            <CardHeader>
              <CardTitle className="text-white neon-text">Flight Search</CardTitle>
              <CardDescription className="text-cyan-300">Enter your travel details to find the best flights</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-cyan-300">From</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="from"
                        name="from"
                        placeholder="Airport or city"
                        value={searchParams.from}
                        onChange={handleInputChange}
                        className="bg-black/50 border-cyan-500/50 text-white"
                      />
                      {showAirportList && activeField === 'from' && airports.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-black/90 border border-cyan-500/50 rounded-md shadow-lg">
                          {airports.map((airport) => (
                            <div
                              key={airport.code}
                              className="px-4 py-2 hover:bg-cyan-500/20 cursor-pointer text-white"
                              onClick={() => {
                                setSearchParams(prev => ({ ...prev, from: airport.code }))
                                setAirports([])
                                setShowAirportList(false)
                              }}
                            >
                              {airport.name} ({airport.code})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-cyan-300">To</Label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="to"
                        name="to"
                        placeholder="Airport or city"
                        value={searchParams.to}
                        onChange={handleInputChange}
                        className="bg-black/50 border-cyan-500/50 text-white"
                      />
                      {showAirportList && activeField === 'to' && airports.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-black/90 border border-cyan-500/50 rounded-md shadow-lg">
                          {airports.map((airport) => (
                            <div
                              key={airport.code}
                              className="px-4 py-2 hover:bg-cyan-500/20 cursor-pointer text-white"
                              onClick={() => {
                                setSearchParams(prev => ({ ...prev, to: airport.code }))
                                setAirports([])
                                setShowAirportList(false)
                              }}
                            >
                              {airport.name} ({airport.code})
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-cyan-300">Date</Label>
                    <Input
                      type="date"
                      id="date"
                      name="date"
                      value={searchParams.date}
                      onChange={handleInputChange}
                      className="bg-black/50 border-cyan-500/50 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cabinClass" className="text-cyan-300">Cabin Class</Label>
                    <Select
                      value={searchParams.cabinClass}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, cabinClass: value })
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-500/50 text-white">
                        <SelectValue placeholder="Select cabin class" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-500/50">
                        <SelectItem value="ECONOMY" className="text-white hover:bg-cyan-500/20">Economy</SelectItem>
                        <SelectItem value="PREMIUM_ECONOMY" className="text-white hover:bg-cyan-500/20">Premium Economy</SelectItem>
                        <SelectItem value="BUSINESS" className="text-white hover:bg-cyan-500/20">Business</SelectItem>
                        <SelectItem value="FIRST" className="text-white hover:bg-cyan-500/20">First Class</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adults" className="text-cyan-300">Adults</Label>
                    <Select
                      value={searchParams.adults.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, adults: parseInt(value) })
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
                    <Label htmlFor="children" className="text-cyan-300">Children</Label>
                    <Select
                      value={searchParams.children.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, children: parseInt(value) })
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

                  <div className="space-y-2">
                    <Label htmlFor="infants" className="text-cyan-300">Infants</Label>
                    <Select
                      value={searchParams.infants.toString()}
                      onValueChange={(value) =>
                        setSearchParams({ ...searchParams, infants: parseInt(value) })
                      }
                    >
                      <SelectTrigger className="bg-black/50 border-cyan-500/50 text-white">
                        <SelectValue placeholder="Select number of infants" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/90 border-cyan-500/50">
                        <SelectItem value="0" className="text-white hover:bg-cyan-500/20">No Infants</SelectItem>
                        <SelectItem value="1" className="text-white hover:bg-cyan-500/20">1 Infant</SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-cyan-500/20">2 Infants</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-md"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search Flights"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8 backdrop-blur-md bg-black/40 border border-cyan-500/50">
            <CardHeader>
              <CardTitle className="text-white neon-text">Travel Tips</CardTitle>
              <CardDescription className="text-cyan-300">Make the most of your flight</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <CalendarIcon className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Book in Advance</h3>
                    <p className="text-cyan-300">
                      Book your flight at least 2-3 weeks in advance for the best prices and availability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Plane className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Check Flight Status</h3>
                    <p className="text-cyan-300">
                      Monitor your flight status and set up notifications for any changes.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPinIcon className="w-6 h-6 text-cyan-400 mt-1" />
                  <div>
                    <h3 className="font-semibold text-white">Airport Information</h3>
                    <p className="text-cyan-300">
                      Check terminal and gate information before heading to the airport.
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
