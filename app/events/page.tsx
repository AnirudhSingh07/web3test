"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Search, Filter, Star, Home, User } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { EventCard } from "@/components/event-card"

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
  featured: boolean
  rating: number
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedCountry, setSelectedCountry] = useState("United States")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoading, setIsLoading] = useState(true)
  const [userAge, setUserAge] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const isVerified = localStorage.getItem("ageVerified")
    const dateOfBirth = localStorage.getItem("dateOfBirth")

    if (!isVerified) {
      router.push("/")
      return
    }

    if (dateOfBirth) {
      const age = calculateAge(dateOfBirth)
      setUserAge(age)
    }

    loadEvents()
  }, [router])

  useEffect(() => {
    filterEvents()
  }, [events, searchQuery, selectedCategory])

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  const loadEvents = async () => {
    setIsLoading(true)

    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockEvents: Event[] = [
      {
        id: 1,
        title: "DeFi Summit 2024",
        description:
          "Join leading DeFi protocols and learn about the future of decentralized finance. Network with industry leaders and discover new opportunities.",
        date: "2024-02-15",
        time: "10:00 AM",
        location: "San Francisco, CA",
        country: "United States",
        attendees: 245,
        maxAttendees: 500,
        category: "DeFi",
        price: "Free",
        organizer: "DeFi Alliance",
        image: "/placeholder.svg?height=200&width=400",
        featured: true,
        rating: 4.8,
      },
      {
        id: 2,
        title: "NFT Art Gallery Opening",
        description:
          "Exclusive NFT art exhibition featuring top digital artists from around the world. Experience the future of digital art.",
        date: "2024-02-20",
        time: "6:00 PM",
        location: "New York, NY",
        country: "United States",
        attendees: 89,
        maxAttendees: 150,
        category: "NFT",
        price: "Free",
        organizer: "CryptoArt Collective",
        image: "/placeholder.svg?height=200&width=400",
        featured: false,
        rating: 4.6,
      },
      {
        id: 3,
        title: "Blockchain Developer Workshop",
        description:
          "Hands-on workshop for building dApps on Ethereum. Learn from experienced developers and build your first dApp.",
        date: "2024-02-25",
        time: "2:00 PM",
        location: "Austin, TX",
        country: "United States",
        attendees: 156,
        maxAttendees: 200,
        category: "Development",
        price: "$50",
        organizer: "Web3 Builders",
        image: "/placeholder.svg?height=200&width=400",
        featured: true,
        rating: 4.9,
      },
      {
        id: 4,
        title: "Metaverse Gaming Conference",
        description:
          "Explore the future of gaming in virtual worlds. Meet game developers, investors, and players shaping the metaverse.",
        date: "2024-03-01",
        time: "11:00 AM",
        location: "Los Angeles, CA",
        country: "United States",
        attendees: 312,
        maxAttendees: 400,
        category: "Gaming",
        price: "$75",
        organizer: "MetaGame Studios",
        image: "/placeholder.svg?height=200&width=400",
        featured: false,
        rating: 4.7,
      },
      {
        id: 5,
        title: "Web3 Startup Pitch Day",
        description:
          "Watch innovative Web3 startups pitch to top VCs. Network with entrepreneurs and investors in the Web3 space.",
        date: "2024-03-05",
        time: "1:00 PM",
        location: "Miami, FL",
        country: "United States",
        attendees: 78,
        maxAttendees: 100,
        category: "Startup",
        price: "Free",
        organizer: "Crypto Ventures",
        image: "/placeholder.svg?height=200&width=400",
        featured: true,
        rating: 4.5,
      },
      {
        id: 6,
        title: "DAO Governance Workshop",
        description: "Learn about decentralized governance and how to participate in DAO decision-making processes.",
        date: "2024-03-10",
        time: "3:00 PM",
        location: "Denver, CO",
        country: "United States",
        attendees: 67,
        maxAttendees: 120,
        category: "DAO",
        price: "$30",
        organizer: "DAO Collective",
        image: "/placeholder.svg?height=200&width=400",
        featured: false,
        rating: 4.4,
      },
    ]

    setEvents(mockEvents.filter((event) => event.country === selectedCountry))
    setIsLoading(false)
  }

  const filterEvents = () => {
    let filtered = events

    if (searchQuery) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((event) => event.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    setFilteredEvents(filtered)
  }

  const handleBackToHome = () => {
    localStorage.removeItem("ageVerified")
    localStorage.removeItem("dateOfBirth")
    localStorage.removeItem("verificationDate")
    router.push("/")
  }

  const categories = ["all", "DeFi", "NFT", "Development", "Gaming", "Startup", "DAO"]

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 " >
        <ParticleBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-spin-slow">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Loading Events...</h2>
            <p className="text-gray-300">Discovering amazing Web3 events for you</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden w-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <ParticleBackground />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="animate-fade-in">
            <h1 className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text ">
              Web3 Events
            </h1>
            <p className="text-gray-300 text-lg">Discover amazing Web3 events in {selectedCountry}</p>
          </div>

          <div className="flex items-center gap-4 animate-slide-in-right">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Age Verified</p>
                  <p className="text-white font-medium">{userAge ? `${userAge} years old` : "Verified User"}</p>
                </div>
              </div>
            </Card>

            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-8 animate-slide-up">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search events, organizers, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-purple-500 transition-all duration-300"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48 bg-white/10 border-white/20 text-white">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-800">
                      {category === "all" ? "All Categories" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 transition-all duration-300"
                onClick={() => {
                  alert("Country selector would be implemented here")
                }}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {selectedCountry}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Events */}
        {filteredEvents.some((event) => event.featured) && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
              <Star className="h-8 w-8 text-yellow-400" />
              Featured Events
            </h2>
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredEvents
                .filter((event) => event.featured)
                .slice(0, 2)
                .map((event, index) => (
                  <EventCard key={event.id} event={event} featured delay={index * 200} />
                ))}
            </div>
          </div>
        )}

        {/* All Events */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">All Events ({filteredEvents.length})</h2>

          {filteredEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} delay={index * 100} />
              ))}
            </div>
          ) : (
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center py-16">
              <CardContent>
                <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">No Events Found</h3>
                <p className="text-gray-300 mb-4">
                  {searchQuery || selectedCategory !== "all"
                    ? "Try adjusting your search or filters"
                    : `No Web3 events are currently available in ${selectedCountry}`}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
