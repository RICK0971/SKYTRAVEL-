"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Plane, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      setIsLoading(false)
      return
    }

    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Redirect to dashboard on successful signup
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup')
    } finally {
      setIsLoading(false)
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

      {/* Flying airplane animation */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="airplane airplane-1">
          <Plane className="h-8 w-8 text-purple-400" />
        </div>
        <div className="airplane airplane-2">
          <Plane className="h-6 w-6 text-cyan-400" />
        </div>
        <div className="airplane airplane-3">
          <Plane className="h-10 w-10 text-yellow-400" />
        </div>
      </div>

      {/* Back Button */}
      <div className="fixed top-0 left-0 z-10 p-4">
        <Button
          variant="ghost"
          className="text-white hover:bg-white/10 flex items-center space-x-1"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>
      </div>

      {/* Signup Form */}
      <div className="container mx-auto px-4 flex items-center justify-center min-h-screen relative z-20">
        <Card className="w-full max-w-md backdrop-blur-md bg-black/40 border border-purple-500/50 shadow-xl rounded-xl">
          <div className="p-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white tracking-wider neon-text-purple">JOIN SKYTRAVEL</h1>
              <p className="text-purple-300 mt-2">Create an account to start your journey</p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-md">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-purple-300">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border-purple-500/50 text-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-purple-300">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border-purple-500/50 text-white"
                  placeholder="Enter your email"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-purple-300">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border-purple-500/50 text-white"
                  placeholder="Create a password"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-purple-300">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/50 border-purple-500/50 text-white"
                  placeholder="Confirm your password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-purple-300">
                Already have an account?{" "}
                <a href="/" className="text-white font-semibold hover:underline">
                  Login
                </a>
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
