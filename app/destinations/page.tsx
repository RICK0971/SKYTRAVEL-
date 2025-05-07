"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plane, LogOut, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import Image from 'next/image'
import { destinations } from '../data/destinations'

export default function DestinationsPage() {
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen relative overflow-hidden gradient-bg">
      {/* Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: "url('/mirrored_airplane.jpg')",
          filter: "blur(3px) brightness(0.4) contrast(1.2)",
        }}
      />

      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back Button (most left) */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 flex items-center"
                onClick={() => router.back()}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              {/* Navigation buttons */}
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

      {/* Flying airplane animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="airplane airplane-1">
          <Plane className="h-8 w-8 text-cyan-400" />
        </div>
        <div className="airplane airplane-2">
          <Plane className="h-6 w-6 text-purple-400" />
        </div>
        <div className="airplane airplane-3">
          <Plane className="h-10 w-10 text-yellow-400" />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white neon-text tracking-wider">POPULAR DESTINATIONS</h1>
          <p className="text-cyan-300 mt-2 max-w-2xl mx-auto">
            Explore our handpicked selection of the most breathtaking destinations around the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="overflow-hidden backdrop-blur-md bg-black/40 rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 border border-cyan-500/30"
            >
              <div className="relative h-48">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">{destination.name}</h2>
                    <p className="text-cyan-300">{destination.country}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-white">{destination.rating}</span>
                  </div>
                </div>
                <p className="text-cyan-300 mb-4">{destination.description}</p>
                <div className="mb-4">
                  <h3 className="font-semibold text-white mb-2">Highlights:</h3>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, index) => (
                      <span
                        key={index}
                        className="bg-cyan-500/20 text-cyan-300 text-sm px-2 py-1 rounded border border-cyan-500/30"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-cyan-300">Best time to visit:</p>
                    <p className="text-white font-medium">{destination.bestTimeToVisit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-300">From</p>
                    <p className="text-2xl font-bold text-white">
                      {destination.price.currency} {destination.price.amount}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/flights?destination=${destination.id}`}
                  className="block w-full bg-cyan-600 text-white text-center py-2 rounded-lg hover:bg-cyan-500 transition-colors"
                >
                  Search Flights
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
} 