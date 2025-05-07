"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plane } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      router.push("/dashboard")
    } else {
      alert("Please enter both username and password")
    }
  }

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

      {/* Logo top-right */}
      <div className="fixed top-0 right-0 z-10 p-4">
        <Link href="/about" className="flex items-center space-x-2 group">
          <div className="bg-cyan-500/30 backdrop-blur-sm p-2 rounded-full group-hover:bg-cyan-500/50 transition-all duration-300">
            <Plane className="h-6 w-6 text-white" />
          </div>
          <span className="font-bold text-white neon-text hidden sm:inline">SkyTravel</span>
        </Link>
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

      {/* Login Form */}
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-20">
        <Card
          className={`w-full max-w-md backdrop-blur-md bg-black/40 border border-cyan-500/50 shadow-xl rounded-xl transition-all duration-1000 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          } hover:scale-[1.02]`}
        >
          <div className="p-8">
            <div className="text-left mb-6">
              <h1 className="text-[300%] font-extrabold text-white leading-tight tracking-tight font-sans lowercase neon-text animate-pulse">
                explore,<br />dream<br />& discover.
              </h1>
              <p className="text-cyan-300 mt-4 text-center animate-fade-in">
                Sign in to continue your journey
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2 animate-fade-in">
                <label htmlFor="username" className="block text-sm font-medium text-cyan-300">
                  Username or Email
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full bg-black/50 border-cyan-500/50 text-white"
                  placeholder="Enter your username or email"
                />
              </div>

              <div className="space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <label htmlFor="password" className="block text-sm font-medium text-cyan-300">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/50 border-cyan-500/50 text-white"
                  placeholder="Enter your password"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-md animate-fade-in"
                style={{ animationDelay: "400ms" }}
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "600ms" }}>
              <p className="text-cyan-300">
                Not a Member?{" "}
                <Link href="/signup" className="text-white font-semibold hover:underline">
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
