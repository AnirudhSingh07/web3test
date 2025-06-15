"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Calendar, Sparkles, ArrowRight, Users } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"

export default function HomePage() {
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has already verified age
    const isVerified = localStorage.getItem("ageVerified")
    if (isVerified) {
      router.push("/events")
    }
  }, [router])

  const handleGetStarted = async () => {
    setIsNavigating(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    router.push("/verify-age")
  }

  const features = [
    {
      icon: Shield,
      title: "Age Verification",
      description: "Quick and secure age verification to access exclusive events",
      color: "from-blue-500 to-cyan-500",
      delay: "0ms",
    },
    {
      icon: Calendar,
      title: "Discover Events",
      description: "Find amazing Web3 events, conferences, and meetups worldwide",
      color: "from-green-500 to-emerald-500",
      delay: "200ms",
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with like-minded individuals in the Web3 space",
      color: "from-purple-500 to-pink-500",
      delay: "400ms",
    },
  ]

  return (
    <div className="w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-white text-sm font-medium">Welcome to the Future of Events</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Web3 Events
            <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Platform
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
            Verify your age and discover the most exciting Web3 events, conferences, and meetups happening around the
            world
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleGetStarted}
              disabled={isNavigating}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              size="lg"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isNavigating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    Get Started
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: feature.delay }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <CardHeader className="relative z-10 text-center pb-4">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${feature.color} mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-white text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-300 leading-relaxed">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: "10K+", label: "Active Users" },
            { number: "500+", label: "Events Hosted" },
            { number: "50+", label: "Countries" },
            { number: "99%", label: "Satisfaction" },
          ].map((stat, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text ">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How it Works Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Verify Your Age",
                description: "Enter your date of birth to verify you're 18 or older",
                icon: Shield,
                color: "from-blue-500 to-cyan-500",
              },
              {
                step: "02",
                title: "Browse Events",
                description: "Discover amazing Web3 events in your country and worldwide",
                icon: Calendar,
                color: "from-green-500 to-emerald-500",
              },
              {
                step: "03",
                title: "Join Community",
                description: "Register for events and connect with the Web3 community",
                icon: Users,
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, index) => (
              <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="relative mb-6">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center mb-4`}
                  >
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center text-purple-900 font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border-white/20 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
          <CardContent className="relative z-10 text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join the Web3 Revolution?</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Don't miss out on the most innovative events in the Web3 space. Verify your age now and start exploring!
            </p>
            <Button
              onClick={handleGetStarted}
              disabled={isNavigating}
              className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              {isNavigating ? "Loading..." : "Verify Age Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
