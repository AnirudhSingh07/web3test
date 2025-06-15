"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users, Clock, Wallet, ExternalLink, Star, Heart, Share2 } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  country: string
  attendees: number
  maxAttendees: number
  category: string
  price: string
  organizer: string
  image: string
  featured?: boolean
  rating: number
}

interface EventCardProps {
  event: Event
  featured?: boolean
  delay?: number
}

export function EventCard({ event, featured = false, delay = 0 }: EventCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      DeFi: "from-green-500 to-emerald-500",
      NFT: "from-purple-500 to-pink-500",
      Development: "from-blue-500 to-cyan-500",
      Gaming: "from-red-500 to-orange-500",
      Startup: "from-yellow-500 to-amber-500",
      DAO: "from-indigo-500 to-purple-500",
    }
    return colors[category] || "from-gray-500 to-gray-600"
  }

  const handleRegister = async () => {
    setIsRegistering(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRegistering(false)
    alert(`Successfully registered for ${event.title}!`)
  }

  const attendancePercentage = (event.attendees / event.maxAttendees) * 100

  return (
    <Card
      className={`group relative overflow-hidden bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 animate-slide-up ${
        featured ? "lg:col-span-1 border-yellow-500/30" : ""
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {featured && (
        <div className="absolute top-4 left-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            <Star className="h-3 w-3 mr-1" />
            Featured
          </Badge>
        </div>
      )}

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          onClick={() => setIsLiked(!isLiked)}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : "text-white"} transition-colors`} />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          onClick={() => navigator.share?.({ title: event.title, url: window.location.href })}
        >
          <Share2 className="h-4 w-4 text-white" />
        </Button>
      </div>

      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(event.category)} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
        />
      </div>

      <CardHeader className="relative z-10 pb-4">
        <div className="flex justify-between items-start mb-3">
          <Badge className={`bg-gradient-to-r ${getCategoryColor(event.category)} text-white border-0 shadow-lg`}>
            {event.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-white text-sm font-medium">{event.rating}</span>
          </div>
        </div>

        <CardTitle className="text-white text-xl mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
          {event.title}
        </CardTitle>

        <CardDescription className="text-gray-300 leading-relaxed line-clamp-2">{event.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2 text-gray-300">
            <Calendar className="h-4 w-4 text-purple-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-300 col-span-2">
            <MapPin className="h-4 w-4 text-green-400" />
            <span>{event.location}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="h-4 w-4 text-cyan-400" />
              <span>
                {event.attendees}/{event.maxAttendees} attendees
              </span>
            </div>
            <Badge
              variant="outline"
              className={`border-white/30 text-white ${event.price === "Free" ? "bg-green-500/20 border-green-500/50" : "bg-purple-500/20 border-purple-500/50"}`}
            >
              {event.price}
            </Badge>
          </div>

          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
              style={{ width: `${attendancePercentage}%` }}
            />
          </div>
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-4">Organized by {event.organizer}</p>
          <Button
            onClick={handleRegister}
            disabled={isRegistering}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-105 group"
          >
            {isRegistering ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                Registering...
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Register with Wallet
                <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
