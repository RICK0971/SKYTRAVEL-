import type React from "react"
import "./globals.css"
import { Inter, Montserrat, Orbitron } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import Script from "next/script"

// Load fonts properly using Next.js font system
const inter = Inter({ subsets: ["latin"] })

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-orbitron",
})

export const metadata = {
  title: "SkyTravel - Your Journey Begins Here",
  description: "Find and book your next adventure with SkyTravel",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.variable} ${orbitron.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <div className="scan-lines"></div>
          {children}
          <Toaster position="top-center" theme="dark" />
        </ThemeProvider>

        {/* Particles.js for digital particle effect */}
        <Script src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js" />
        <Script id="particles-config">
          {`
            if (typeof particlesJS !== 'undefined') {
              particlesJS("particles-js", {
                "particles": {
                  "number": {
                    "value": 50,
                    "density": {
                      "enable": true,
                      "value_area": 800
                    }
                  },
                  "color": {
                    "value": "#00ffff"
                  },
                  "shape": {
                    "type": "circle",
                    "stroke": {
                      "width": 0,
                      "color": "#000000"
                    }
                  },
                  "opacity": {
                    "value": 0.3,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 1,
                      "opacity_min": 0.1,
                      "sync": false
                    }
                  },
                  "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                      "enable": false,
                      "speed": 40,
                      "size_min": 0.1,
                      "sync": false
                    }
                  },
                  "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ffff",
                    "opacity": 0.2,
                    "width": 1
                  },
                  "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                      "enable": false,
                      "rotateX": 600,
                      "rotateY": 1200
                    }
                  }
                },
                "interactivity": {
                  "detect_on": "canvas",
                  "events": {
                    "onhover": {
                      "enable": true,
                      "mode": "grab"
                    },
                    "onclick": {
                      "enable": true,
                      "mode": "push"
                    },
                    "resize": true
                  },
                  "modes": {
                    "grab": {
                      "distance": 140,
                      "line_linked": {
                        "opacity": 0.5
                      }
                    },
                    "push": {
                      "particles_nb": 4
                    }
                  }
                },
                "retina_detect": true
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}

import "./globals.css"


import './globals.css'