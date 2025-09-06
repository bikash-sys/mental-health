"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BookOpen,
  Video,
  Headphones,
  Download,
  Search,
  Filter,
  Globe,
  Heart,
  Brain,
  Users,
  Clock,
  Star,
  Play,
  FileText,
  Bookmark,
} from "lucide-react"
import Link from "next/link"

interface Resource {
  id: string
  title: string
  description: string
  type: "article" | "video" | "audio" | "exercise" | "guide"
  category: "stress" | "anxiety" | "depression" | "mindfulness" | "academic" | "trauma" | "relationships"
  language: "en" | "hi" | "ur"
  duration?: string
  difficulty: "beginner" | "intermediate" | "advanced"
  tags: string[]
  author: string
  rating: number
  downloads?: number
  thumbnail?: string
  content?: string
}

const resources: Resource[] = [
  {
    id: "1",
    title: "Managing Academic Stress in J&K Universities",
    description:
      "Comprehensive guide for students dealing with academic pressure in the unique context of J&K educational system.",
    type: "article",
    category: "academic",
    language: "en",
    duration: "10 min read",
    difficulty: "beginner",
    tags: ["academic pressure", "study tips", "J&K context"],
    author: "Dr. Priya Sharma",
    rating: 4.8,
    downloads: 1250,
    thumbnail: "/academic-stress-guide.jpg",
  },
  {
    id: "2",
    title: "तनाव प्रबंधन के लिए श्वास तकनीकें",
    description: "सरल श्वास अभ्यास जो तनाव और चिंता को कम करने में मदद करते हैं। दैनिक जीवन में उपयोग के लिए व्यावहारिक तकनीकें।",
    type: "exercise",
    category: "stress",
    language: "hi",
    duration: "15 minutes",
    difficulty: "beginner",
    tags: ["breathing", "relaxation", "daily practice"],
    author: "डॉ. अर्जुन मेहता",
    rating: 4.9,
    downloads: 890,
    thumbnail: "/breathing-exercises-hindi.jpg",
  },
  {
    id: "3",
    title: "ذہنی سکون کے لیے مراقبہ",
    description: "اسلامی تعلیمات کے مطابق مراقبہ اور ذکر کی تکنیکیں جو ذہنی سکون اور روحانی بہتری کے لیے مفید ہیں۔",
    type: "audio",
    category: "mindfulness",
    language: "ur",
    duration: "20 minutes",
    difficulty: "intermediate",
    tags: ["meditation", "Islamic", "spiritual healing"],
    author: "ڈاکٹر فاطمہ خان",
    rating: 4.7,
    downloads: 650,
    thumbnail: "/meditation-urdu.jpg",
  },
  {
    id: "4",
    title: "Understanding PTSD in Conflict-Affected Areas",
    description:
      "Educational video addressing trauma responses common in conflict-affected regions like J&K, with culturally sensitive approaches to healing.",
    type: "video",
    category: "trauma",
    language: "en",
    duration: "25 minutes",
    difficulty: "intermediate",
    tags: ["PTSD", "trauma recovery", "conflict zones"],
    author: "Dr. Rajesh Kumar",
    rating: 4.9,
    downloads: 2100,
    thumbnail: "/ptsd-awareness-video.jpg",
  },
  {
    id: "5",
    title: "Sleep Hygiene for Students",
    description:
      "Evidence-based strategies for improving sleep quality, especially important for students dealing with irregular schedules and stress.",
    type: "guide",
    category: "stress",
    language: "en",
    duration: "12 min read",
    difficulty: "beginner",
    tags: ["sleep", "health", "student life"],
    author: "Dr. Meera Patel",
    rating: 4.6,
    downloads: 1800,
    thumbnail: "/sleep-hygiene-guide.jpg",
  },
  {
    id: "6",
    title: "रिश्तों में संवाद कौशल",
    description: "पारिवारिक और दोस्ती के रिश्तों में बेहतर संवाد के लिए व्यावहारिक सुझाव। सांस्कृतिक संदर्भ के साथ।",
    type: "article",
    category: "relationships",
    language: "hi",
    duration: "8 min read",
    difficulty: "beginner",
    tags: ["communication", "relationships", "family"],
    author: "डॉ. सुनीता वर्मा",
    rating: 4.5,
    downloads: 720,
    thumbnail: "/communication-skills-hindi.jpg",
  },
]

const categories = [
  { id: "all", name: "All Resources", icon: BookOpen },
  { id: "stress", name: "Stress Management", icon: Heart },
  { id: "anxiety", name: "Anxiety Support", icon: Brain },
  { id: "depression", name: "Depression Help", icon: Users },
  { id: "mindfulness", name: "Mindfulness", icon: Star },
  { id: "academic", name: "Academic Support", icon: BookOpen },
  { id: "trauma", name: "Trauma Recovery", icon: Heart },
  { id: "relationships", name: "Relationships", icon: Users },
]

const languages = [
  { code: "all", name: "All Languages", flag: "🌐" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
]

const resourceTypes = [
  { id: "all", name: "All Types", icon: BookOpen },
  { id: "article", name: "Articles", icon: FileText },
  { id: "video", name: "Videos", icon: Video },
  { id: "audio", name: "Audio", icon: Headphones },
  { id: "exercise", name: "Exercises", icon: Heart },
  { id: "guide", name: "Guides", icon: BookOpen },
]

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    const matchesLanguage = selectedLanguage === "all" || resource.language === selectedLanguage
    const matchesType = selectedType === "all" || resource.type === selectedType

    return matchesSearch && matchesCategory && matchesLanguage && matchesType
  })

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return FileText
      case "video":
        return Video
      case "audio":
        return Headphones
      case "exercise":
        return Heart
      case "guide":
        return BookOpen
      default:
        return BookOpen
    }
  }

  const getLanguageDisplay = (lang: string) => {
    switch (lang) {
      case "en":
        return "English"
      case "hi":
        return "हिंदी"
      case "ur":
        return "اردو"
      default:
        return lang
    }
  }

  if (selectedResource) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => setSelectedResource(null)} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold">{selectedResource.title}</h1>
                <p className="text-sm text-muted-foreground">by {selectedResource.author}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {React.createElement(getResourceIcon(selectedResource.type), { className: "w-5 h-5 text-primary" })}
                    <Badge variant="secondary">{selectedResource.type}</Badge>
                    <Badge variant="outline">{getLanguageDisplay(selectedResource.language)}</Badge>
                  </div>
                  <CardTitle className="text-2xl">{selectedResource.title}</CardTitle>
                  <CardDescription className="text-base">{selectedResource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedResource.type === "video" && (
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Video content would be embedded here</p>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Video
                        </Button>
                      </div>
                    </div>
                  )}

                  {selectedResource.type === "audio" && (
                    <div className="bg-muted rounded-lg p-8 flex items-center justify-center mb-6">
                      <div className="text-center">
                        <Headphones className="w-16 h-16 text-primary mx-auto mb-4" />
                        <p className="text-muted-foreground">Audio player would be embedded here</p>
                        <Button className="mt-4">
                          <Play className="w-4 h-4 mr-2" />
                          Play Audio
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="prose max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      This resource provides comprehensive guidance on {selectedResource.category} management,
                      specifically tailored for students in the J&K region. The content addresses cultural sensitivities
                      and provides practical, actionable strategies that can be implemented in daily life.
                    </p>

                    <h3 className="text-lg font-semibold mt-6 mb-3">Key Topics Covered:</h3>
                    <ul className="space-y-2">
                      {selectedResource.tags.map((tag, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="capitalize">{tag}</span>
                        </li>
                      ))}
                    </ul>

                    {selectedResource.type === "exercise" && (
                      <>
                        <h3 className="text-lg font-semibold mt-6 mb-3">How to Practice:</h3>
                        <ol className="space-y-3">
                          <li>1. Find a quiet, comfortable space where you won't be disturbed</li>
                          <li>2. Set aside the recommended time duration for this practice</li>
                          <li>3. Follow the guided instructions step by step</li>
                          <li>4. Practice regularly for best results</li>
                        </ol>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg">Resource Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Duration</p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedResource.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Difficulty</p>
                    <Badge variant="outline" className="capitalize">
                      {selectedResource.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rating</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedResource.rating}</span>
                    </div>
                  </div>
                  {selectedResource.downloads && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Downloads</p>
                      <p className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        {selectedResource.downloads.toLocaleString()}
                      </p>
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <Button className="w-full">
                      <Bookmark className="w-4 h-4 mr-2" />
                      Save Resource
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Multi-Language Resource Library</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive mental health resources in English, Hindi, and Urdu, tailored for students in J&K and across
            India.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search resources, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-40">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      <span className="flex items-center gap-2">
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  <category.icon className="w-3 h-3 mr-1" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredResources.length} of {resources.length} resources
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const IconComponent = getResourceIcon(resource.type)
            return (
              <Card
                key={resource.id}
                className="border-2 hover:border-primary/20 transition-colors cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {getLanguageDisplay(resource.language)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {resource.duration}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-muted-foreground">{resource.rating}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {resource.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {resource.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{resource.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">by {resource.author}</span>
                      <Badge variant="outline" className="text-xs capitalize">
                        {resource.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or browse different categories.</p>
          </div>
        )}

        {/* Featured Collections */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Heart className="w-8 h-8 text-primary mb-2" />
                <CardTitle>J&K Student Wellness Kit</CardTitle>
                <CardDescription>
                  Curated resources specifically for students in Jammu & Kashmir, addressing regional challenges.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Collection
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-secondary/20">
              <CardHeader>
                <Globe className="w-8 h-8 text-secondary mb-2" />
                <CardTitle>Multilingual Mindfulness</CardTitle>
                <CardDescription>
                  Meditation and mindfulness practices available in English, Hindi, and Urdu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Collection
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle>Academic Success Toolkit</CardTitle>
                <CardDescription>
                  Evidence-based strategies for managing academic stress and improving performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Explore Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
