"use client"

import Link from "next/link"
import { Plane, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavigationProps {
  showNavLinks?: boolean
  showLogout?: boolean
}

export default function Navigation({ showNavLinks = true, showLogout = false }: NavigationProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-md border-b border-cyan-500/30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side navigation options - only shown when showNavLinks is true */}
          {showNavLinks && (
            <div className="flex items-center space-x-4">
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
          )}

          {/* If nav links are hidden, add an empty div to maintain flex layout */}
          {!showNavLinks && <div></div>}

          {/* Logo on the right - always shown */}
          <Link href="/about" className="flex items-center space-x-2 group">
            <div className="bg-cyan-500/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/50 transition-all duration-300">
              <Plane className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-white neon-text hidden sm:inline">SkyTravel</span>
          </Link>

          {/* Logout button - only shown when showLogout is true */}
          {showLogout && (
            <Button variant="ghost" className="hover:bg-red-500/20 text-white" asChild>
              <a href="/">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </a>
            </Button>
          )}

          {/* If logout is hidden, add an empty div to maintain flex layout */}
          {!showLogout && <div></div>}
        </div>
      </div>
    </div>
  )
}
