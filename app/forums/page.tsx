"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  MessageSquare,
  Users,
  Shield,
  Plus,
  Search,
  Flag,
  ThumbsUp,
  MessageCircle,
  Clock,
  Eye,
  AlertTriangle,
  Heart,
  Brain,
  BookOpen,
  Home,
} from "lucide-react"
import Link from "next/link"

interface ForumPost {
  id: string
  title: string
  content: string
  category: string
  author: string
  timestamp: Date
  replies: number
  likes: number
  views: number
  isSticky?: boolean
  tags: string[]
  lastActivity: Date
}

interface ForumCategory {
  id: string
  name: string
  description: string
  icon: any
  postCount: number
  color: string
}

const categories: ForumCategory[] = [
  {
    id: "general",
    name: "General Support",
    description: "Share your experiences and find peer support",
    icon: Heart,
    postCount: 245,
    color: "text-primary",
  },
  {
    id: "academic",
    name: "Academic Stress",
    description: "Discuss study pressure, exams, and academic challenges",
    icon: BookOpen,
    postCount: 189,
    color: "text-secondary",
  },
  {
    id: "anxiety",
    name: "Anxiety & Worry",
    description: "Support for anxiety, panic, and worry-related concerns",
    icon: Brain,
    postCount: 156,
    color: "text-primary",
  },
  {
    id: "relationships",
    name: "Relationships & Family",
    description: "Navigate family dynamics, friendships, and social connections",
    icon: Users,
    postCount: 98,
    color: "text-secondary",
  },
  {
    id: "jk-specific",
    name: "J&K Student Life",
    description: "Discussions specific to students in Jammu & Kashmir",
    icon: Home,
    postCount: 67,
    color: "text-primary",
  },
  {
    id: "success",
    name: "Success Stories",
    description: "Share your progress and celebrate victories",
    icon: Heart,
    postCount: 134,
    color: "text-green-600",
  },
]

const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "Feeling overwhelmed with final exams approaching",
    content:
      "I'm a final year student and feeling really anxious about upcoming exams. The pressure from family and my own expectations is getting too much. Anyone else going through this?",
    category: "academic",
    author: "Anonymous Butterfly",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    replies: 12,
    likes: 8,
    views: 45,
    tags: ["exams", "anxiety", "final year"],
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "2",
    title: "How I overcame social anxiety in college",
    content:
      "Wanted to share my journey of dealing with social anxiety. It took time but I found some strategies that really helped...",
    category: "success",
    author: "Anonymous Phoenix",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    replies: 23,
    likes: 34,
    views: 128,
    isSticky: true,
    tags: ["social anxiety", "success story", "college"],
    lastActivity: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "3",
    title: "Dealing with family pressure about career choices",
    content:
      "My family wants me to pursue engineering but I'm more interested in psychology. The constant arguments are affecting my mental health. How do I handle this?",
    category: "relationships",
    author: "Anonymous Seeker",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
    replies: 18,
    likes: 15,
    views: 67,
    tags: ["family pressure", "career", "conflict"],
    lastActivity: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "4",
    title: "Resources for students in Kashmir valley",
    content:
      "Collecting a list of mental health resources specifically available for students in Kashmir. Please add if you know any...",
    category: "jk-specific",
    author: "Anonymous Helper",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    replies: 9,
    likes: 21,
    views: 89,
    tags: ["Kashmir", "resources", "help"],
    lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
]

export default function ForumsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState("")
  const [newPostContent, setNewPostContent] = useState("")
  const [newPostCategory, setNewPostCategory] = useState("")

  const filteredPosts = samplePosts.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handleCreatePost = () => {
    if (newPostTitle && newPostContent && newPostCategory) {
      // Here you would typically make an API call to create the post
      alert("Post created successfully! (This is a demo)")
      setShowNewPost(false)
      setNewPostTitle("")
      setNewPostContent("")
      setNewPostCategory("")
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
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

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {!selectedCategory ? (
          <>
            {/* Page Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Anonymous Support Forums</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with fellow students in a safe, anonymous environment. Share experiences, find support, and help
                others on their mental health journey.
              </p>
            </div>

            {/* Safety Notice */}
            <Card className="border-2 border-blue-200 bg-blue-50/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Shield className="w-5 h-5" />
                  Community Guidelines & Safety
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <h4 className="font-medium mb-2">Safe Space Principles:</h4>
                    <ul className="space-y-1">
                      <li>• Complete anonymity protected</li>
                      <li>• No personal information sharing</li>
                      <li>• Respectful and supportive communication</li>
                      <li>• Cultural sensitivity required</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Moderation & Support:</h4>
                    <ul className="space-y-1">
                      <li>• 24/7 content moderation</li>
                      <li>• Crisis intervention available</li>
                      <li>• Report inappropriate content</li>
                      <li>• Professional oversight</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="border-2 hover:border-primary/20 transition-colors cursor-pointer"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                        <category.icon className={`w-5 h-5 ${category.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {category.postCount} posts
                        </Badge>
                      </div>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {samplePosts.slice(0, 3).map((post) => (
                  <Card key={post.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {post.isSticky && (
                              <Badge variant="secondary" className="text-xs">
                                Pinned
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {categories.find((c) => c.id === post.category)?.name}
                            </Badge>
                          </div>
                          <h3 className="font-semibold mb-2">{post.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.content}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>by {post.author}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimeAgo(post.timestamp)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {post.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-3 h-3" />
                              {post.likes}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Category View */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={() => setSelectedCategory(null)} className="p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold">{categories.find((c) => c.id === selectedCategory)?.name}</h1>
                  <p className="text-muted-foreground">
                    {categories.find((c) => c.id === selectedCategory)?.description}
                  </p>
                </div>
              </div>
              <Dialog open={showNewPost} onOpenChange={setShowNewPost}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create Anonymous Post</DialogTitle>
                    <DialogDescription>
                      Share your thoughts or ask for support. Your identity will remain completely anonymous.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={newPostCategory} onValueChange={setNewPostCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Title</label>
                      <Input
                        placeholder="What would you like to discuss?"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Content</label>
                      <Textarea
                        placeholder="Share your thoughts, experiences, or questions..."
                        rows={6}
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                      />
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-yellow-800">
                          <p className="font-medium mb-1">Remember:</p>
                          <ul className="space-y-1 text-xs">
                            <li>• Don't share personal identifying information</li>
                            <li>• Be respectful and supportive to others</li>
                            <li>• If you're in crisis, please contact emergency services</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreatePost}
                        disabled={!newPostTitle || !newPostContent || !newPostCategory}
                      >
                        Post Anonymously
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts in this category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="hover:bg-muted/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          {post.isSticky && (
                            <Badge variant="secondary" className="text-xs">
                              Pinned
                            </Badge>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold mb-3">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{post.content}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6 text-sm text-muted-foreground">
                            <span>by {post.author}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTimeAgo(post.timestamp)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {post.views} views
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {post.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.replies}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                              <Flag className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery
                    ? "Try adjusting your search terms."
                    : "Be the first to start a discussion in this category."}
                </p>
                <Button onClick={() => setShowNewPost(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Post
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Crisis Support */}
        <Card className="border-2 border-red-200 bg-red-50/50 mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="w-5 h-5" />
              Need Immediate Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700 mb-4">
              If you're experiencing thoughts of self-harm or suicide, please reach out for immediate professional help:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-red-800">Crisis Helplines:</p>
                <p className="text-sm text-red-700">National: 1800-599-0019</p>
                <p className="text-sm text-red-700">J&K: 0194-2440033</p>
              </div>
              <div>
                <p className="font-medium text-red-800">Emergency:</p>
                <p className="text-sm text-red-700">Call: 112</p>
                <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Crisis Chat Support
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
