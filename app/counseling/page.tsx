"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  ArrowLeft,
  Video,
  MessageSquare,
  Clock,
  Star,
  Shield,
  Users,
  Award,
  Languages,
  Heart,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

interface Counselor {
  id: string
  name: string
  title: string
  specializations: string[]
  languages: string[]
  rating: number
  experience: string
  availability: string[]
  image: string
  bio: string
  sessionTypes: ("video" | "chat")[]
  price: {
    video: number
    chat: number
  }
}

const counselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Priya Sharma",
    title: "Clinical Psychologist",
    specializations: ["Anxiety Disorders", "Depression", "Academic Stress", "PTSD"],
    languages: ["English", "Hindi", "Urdu"],
    rating: 4.9,
    experience: "8 years",
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    image: "/placeholder-cp0d2.png",
    bio: "Specialized in working with students from J&K region, understanding cultural contexts and trauma-informed care.",
    sessionTypes: ["video", "chat"],
    price: { video: 1500, chat: 1000 },
  },
  {
    id: "2",
    name: "Dr. Arjun Mehta",
    title: "Counseling Psychologist",
    specializations: ["Student Counseling", "Career Guidance", "Stress Management"],
    languages: ["English", "Hindi"],
    rating: 4.8,
    experience: "6 years",
    availability: ["Mon", "Wed", "Fri", "Sat"],
    image: "/indian-male-psychologist.png",
    bio: "Focuses on academic and career-related stress, helping students navigate educational challenges.",
    sessionTypes: ["video", "chat"],
    price: { video: 1200, chat: 800 },
  },
  {
    id: "3",
    name: "Dr. Fatima Khan",
    title: "Trauma Specialist",
    specializations: ["PTSD", "Trauma Recovery", "Cultural Therapy", "Family Counseling"],
    languages: ["English", "Urdu", "Hindi"],
    rating: 4.9,
    experience: "10 years",
    availability: ["Tue", "Thu", "Sat", "Sun"],
    image: "/placeholder-a1nzu.png",
    bio: "Expert in trauma-informed care with deep understanding of J&K cultural context and community healing.",
    sessionTypes: ["video", "chat"],
    price: { video: 1800, chat: 1200 },
  },
  {
    id: "4",
    name: "Dr. Rajesh Kumar",
    title: "Psychiatric Counselor",
    specializations: ["Mood Disorders", "Anxiety", "Sleep Disorders", "Medication Management"],
    languages: ["English", "Hindi"],
    rating: 4.7,
    experience: "12 years",
    availability: ["Mon", "Tue", "Thu", "Fri"],
    image: "/placeholder-ft5lw.png",
    bio: "Combines therapy with psychiatric expertise, offering comprehensive mental health care.",
    sessionTypes: ["video"],
    price: { video: 2000, chat: 0 },
  },
]

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
]

export default function CounselingPage() {
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [sessionType, setSessionType] = useState<"video" | "chat">("video")
  const [showBooking, setShowBooking] = useState(false)

  const handleBookSession = () => {
    if (selectedCounselor && selectedDate && selectedTime) {
      // Here you would typically make an API call to book the session
      alert(`Session booked with ${selectedCounselor.name} on ${selectedDate.toDateString()} at ${selectedTime}`)
      setShowBooking(false)
      setSelectedCounselor(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {!showBooking ? (
          <>
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Virtual Counseling</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with qualified mental health professionals who understand the unique challenges faced by
                students in J&K.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardHeader>
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Secure & Private</CardTitle>
                  <CardDescription>End-to-end encrypted sessions with complete confidentiality</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Languages className="w-8 h-8 text-secondary mx-auto mb-2" />
                  <CardTitle className="text-lg">Multilingual Support</CardTitle>
                  <CardDescription>Counselors available in English, Hindi, and Urdu</CardDescription>
                </CardHeader>
              </Card>
              <Card className="text-center">
                <CardHeader>
                  <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Culturally Sensitive</CardTitle>
                  <CardDescription>
                    Professionals trained in J&K cultural context and trauma-informed care
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            {/* Counselors Grid */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Available Counselors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {counselors.map((counselor) => (
                  <Card key={counselor.id} className="border-2 hover:border-primary/20 transition-colors">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={counselor.image || "/placeholder.svg"} alt={counselor.name} />
                          <AvatarFallback>
                            {counselor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-lg">{counselor.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">{counselor.rating}</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">{counselor.title}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <Award className="w-4 h-4" />
                            <span>{counselor.experience} experience</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{counselor.bio}</p>

                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium mb-2">Specializations:</p>
                          <div className="flex flex-wrap gap-1">
                            {counselor.specializations.map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Languages:</p>
                          <div className="flex gap-1">
                            {counselor.languages.map((lang, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                          <div className="text-sm">
                            <p className="font-medium">Starting from:</p>
                            <p className="text-primary font-semibold">
                              ₹{Math.min(counselor.price.video, counselor.price.chat || Number.POSITIVE_INFINITY)}
                              /session
                            </p>
                          </div>
                          <Button
                            onClick={() => {
                              setSelectedCounselor(counselor)
                              setShowBooking(true)
                            }}
                          >
                            Book Session
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Support */}
            <Card className="border-2 border-orange-200 bg-orange-50/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Clock className="w-5 h-5" />
                  Need Immediate Support?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-orange-700 mb-4">
                  If you're experiencing a mental health crisis, please reach out for immediate help:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium text-orange-800">Crisis Helplines:</p>
                    <p className="text-sm text-orange-700">National: 1800-599-0019</p>
                    <p className="text-sm text-orange-700">J&K: 0194-2440033</p>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800">Emergency Services:</p>
                    <p className="text-sm text-orange-700">Call: 112</p>
                    <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Chat with Crisis Counselor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          /* Booking Interface */
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="ghost" onClick={() => setShowBooking(false)} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Book Session</h1>
                <p className="text-muted-foreground">Schedule your session with {selectedCounselor?.name}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Counselor Info */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage
                          src={selectedCounselor?.image || "/placeholder.svg"}
                          alt={selectedCounselor?.name}
                        />
                        <AvatarFallback>
                          {selectedCounselor?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedCounselor?.name}</h3>
                        <p className="text-sm text-muted-foreground">{selectedCounselor?.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-1">Specializations:</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedCounselor?.specializations.map((spec, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Languages:</p>
                        <p className="text-sm text-muted-foreground">{selectedCounselor?.languages.join(", ")}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Schedule Your Session</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={sessionType} onValueChange={(value) => setSessionType(value as "video" | "chat")}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="video" disabled={!selectedCounselor?.sessionTypes.includes("video")}>
                          <Video className="w-4 h-4 mr-2" />
                          Video Call
                        </TabsTrigger>
                        <TabsTrigger value="chat" disabled={!selectedCounselor?.sessionTypes.includes("chat")}>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Text Chat
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="video" className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Video className="w-5 h-5 text-blue-600" />
                            <h4 className="font-medium text-blue-800">Video Session</h4>
                          </div>
                          <p className="text-sm text-blue-700">
                            Face-to-face counseling session via secure video call. Duration: 50 minutes.
                          </p>
                          <p className="text-lg font-semibold text-blue-800 mt-2">₹{selectedCounselor?.price.video}</p>
                        </div>
                      </TabsContent>

                      <TabsContent value="chat" className="space-y-6">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                            <h4 className="font-medium text-green-800">Chat Session</h4>
                          </div>
                          <p className="text-sm text-green-700">
                            Text-based counseling session via secure messaging. Duration: 60 minutes.
                          </p>
                          <p className="text-lg font-semibold text-green-800 mt-2">₹{selectedCounselor?.price.chat}</p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Date</label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Time</label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={selectedTime === time ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedTime(time)}
                              className="text-xs"
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t">
                      <div className="text-sm text-muted-foreground">
                        <p>Session will be conducted in a secure, encrypted environment</p>
                        <p>You'll receive a confirmation email with session details</p>
                      </div>
                      <Button onClick={handleBookSession} disabled={!selectedDate || !selectedTime} size="lg">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
