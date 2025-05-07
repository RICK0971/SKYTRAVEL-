"use client"

import { useState, useEffect } from "react"
import { Plane, Globe, Users, Code, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

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
      <nav className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Back Button on top-left */}
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10 flex items-center space-x-1"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>

          {/* Logo on the top-right */}
          <Link href="/about" className="flex items-center space-x-2 group">
            <div className="bg-cyan-500/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/50 transition-all duration-300">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-white neon-text hidden sm:inline">SkyTravel</span>
          </Link>
        </div>
      </nav>

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
          <h1 className="text-4xl font-bold text-white neon-text tracking-wider">ABOUT SKYTRAVEL</h1>
          <p className="text-cyan-300 mt-2 max-w-2xl mx-auto">
            Your ultimate companion for discovering and booking unforgettable travel experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="backdrop-blur-md bg-black/40 p-8 border border-cyan-500/30">
            <div className="flex items-center mb-6">
              <Globe className="h-8 w-8 text-cyan-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white neon-text">Our Mission</h2>
            </div>
            <p className="text-cyan-300 mb-4 leading-relaxed">
            At SkyTravel, our mission is to turn your travel dreams into reality by making every journey seamless, meaningful, and unforgettable. We believe that exploring the world should be more than just visiting places — it should be about discovering new cultures, creating memories, and finding inspiration in every step. From breathtaking destinations to carefully curated experiences, we’re here to guide you through every part of your adventure with ease, excitement, and a touch of magic.
            </p>
          </Card>

          <Card className="backdrop-blur-md bg-black/40 p-8 border border-purple-500/30">
            <div className="flex items-center mb-6">
              <Users className="h-8 w-8 text-purple-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white neon-text-purple">Who We Are</h2>
            </div>
            <p className="text-purple-300 mb-4 leading-relaxed">
            The team bringing your journeys to life....
            </p>
            <p className="text-fuchsia-200 mb-4 leading-relaxed">
            Aditya Naryan Choudhary<br />
            https://github.com/Ramencode2
             <br />

            Devang Chauhan<br />
            https://github.com/Devangchauhan1
            <br />

            Agnideep Ghorai<br />

        
            </p>
          </Card>
        </div>

        <Card className="backdrop-blur-md bg-black/40 p-8 border border-yellow-500/30">
          <div className="flex items-center mb-6">
            <Code className="h-8 w-8 text-yellow-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white neon-text-gold">About This Project</h2>
          </div>
          <div className="space-y-4 text-yellow-300">
            <p className="leading-relaxed">
            SkyTravel is a modern travel platform designed to showcase immersive web experiences through seamless design and interactive features. Built using technologies like Next.js and Tailwind CSS, it delivers responsive layouts, smooth animations, and a visually compelling user interface. The project focuses on creating an intuitive journey for users—from discovering destinations to booking flights and hotels—making travel planning both inspiring and effortless.
            </p>
          </div>
        </Card>

        <div className="mt-12 text-center">
          
        </div>
      </div>
    </main>
  )
}
