"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  User,
  MapPin,
  Hotel,
  Calendar,
  LogOut,
  ArrowLeft,
  Plane
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen gradient-bg relative">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, cyan 2%, transparent 0%), 
                         radial-gradient(circle at 75px 75px, purple 2%, transparent 0%)`,
            backgroundSize: "100px 100px",
          }}
        ></div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
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

            <Link href="/about" className="flex items-center space-x-2 group">
              <div className="bg-cyan-500/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/50 transition-all duration-300">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-white neon-text hidden sm:inline">SkyTravel</span>
            </Link>

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
        <div
          className={`flex items-center mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-cyan-500/30 backdrop-blur-sm p-3 rounded-full mr-4 glow-border">
            <User className="h-12 w-12 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white neon-text">Welcome back, Traveler!</h1>
            <p className="text-cyan-300">Your next adventure awaits</p>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card
            className={`hd-card p-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-cyan-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">My Trips</h2>
            </div>
            <p className="text-cyan-300 mb-4">You have 2 upcoming trips</p>
            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white neon-button">View Trips</Button>
          </Card>

          <Card
            className={`hd-card-purple p-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex items-center mb-4">
              <Hotel className="h-6 w-6 text-purple-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">My Bookings</h2>
            </div>
            <p className="text-purple-300 mb-4">You have 1 hotel reservation</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white neon-button-purple">
              View Bookings
            </Button>
          </Card>

          <Card
            className={`hd-card-gold p-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-yellow-400 mr-2" />
              <h2 className="text-xl font-semibold text-white">Travel Calendar</h2>
            </div>
            <p className="text-yellow-300 mb-4">Next trip: Paris in 15 days</p>
            <Button className="w-full bg-yellow-600 hover:bg-yellow-500 text-white neon-button-gold">
              View Calendar
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
