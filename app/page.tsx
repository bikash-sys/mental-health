import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  MessageCircle,
  Users,
  Shield,
  BarChart3,
  BookOpen,
  Globe,
  Heart,
  CheckCircle,
  TrendingUp,
  Users2,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">PsyConnect</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="#research" className="text-muted-foreground hover:text-foreground transition-colors">
                Research
              </Link>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
                <Button size="sm">Get Started</Button>
              </div>
            </nav>
            <div className="flex items-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Menu
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            SIH 2025 • Team CodeGenesis
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            AI-Powered Digital Mental Health Platform for Higher Education Students
          </h1>
          <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
            Bridging critical gaps in student mental health support with culturally sensitive AI, 24/7 assistance, and
            comprehensive resources tailored for Indian students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/assessment">Start Self-Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/chatbot">Talk to AI Counselor</Link>
            </Button>
          </div>

          {/* Language Support */}
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <Globe className="w-4 h-4" />
            <span>Available in English, Hindi, and Urdu</span>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">20-30%</div>
              <div className="text-muted-foreground">Reduction in Mental Health Issues</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">3</div>
              <div className="text-muted-foreground">Languages Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Mental Health Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform addresses the unique mental health challenges faced by students in Jammu & Kashmir and across
              India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI Self-Assessments</CardTitle>
                <CardDescription>
                  PHQ-9 and GAD-7 questionnaires with personalized feedback for early detection of depression, anxiety,
                  and stress.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>24/7 AI Chatbot</CardTitle>
                <CardDescription>
                  Empathetic, multilingual support with cultural sensitivity for J&K region's unique context including
                  PTSD and academic pressure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Virtual Counseling</CardTitle>
                <CardDescription>
                  Secure sessions with qualified mental health professionals via video or chat with easy scheduling.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Multi-Language Library</CardTitle>
                <CardDescription>
                  Curated resources in English, Hindi, and Urdu including articles, videos, and exercises on stress
                  management and mindfulness.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Anonymous Forums</CardTitle>
                <CardDescription>
                  Safe community spaces for peer support with moderation to ensure student safety and confidentiality.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/20 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Admin Analytics</CardTitle>
                <CardDescription>
                  University-level dashboard with anonymized insights to help institutions proactively address mental
                  health trends.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Addressing Critical Mental Health Gaps</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center mt-1">
                    <TrendingUp className="w-3 h-3 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">High Stress Levels</h3>
                    <p className="text-muted-foreground">
                      65% of Indian higher education students experience medium-high stress
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center mt-1">
                    <Heart className="w-3 h-3 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">J&K Specific Challenges</h3>
                    <p className="text-muted-foreground">
                      Depression (41%), Anxiety (28%), PTSD (19%) among youth in the region
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-destructive/10 rounded-full flex items-center justify-center mt-1">
                    <Users2 className="w-3 h-3 text-destructive" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Limited Access</h3>
                    <p className="text-muted-foreground">Insufficient mental health resources and stigma barriers</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Impact Goals</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Early Detection</h3>
                    <p className="text-muted-foreground">
                      AI-powered screening to identify mental health concerns before they escalate
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center mt-1">
                    <Clock className="w-3 h-3 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">24/7 Availability</h3>
                    <p className="text-muted-foreground">Round-the-clock support when students need it most</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <Globe className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Cultural Sensitivity</h3>
                    <p className="text-muted-foreground">
                      Tailored support for diverse Indian cultural contexts and languages
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Mental Health Journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are taking control of their mental well-being with PsyConnect's AI-powered
            support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/assessment">Begin Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" asChild>
              <Link href="/chatbot">Talk to AI Counselor</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">PsyConnect</span>
              </div>
              <p className="text-muted-foreground">
                AI-powered mental health support for higher education students across India.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Self-Assessment
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    AI Chatbot
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Virtual Counseling
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Languages</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>English</li>
                <li>हिंदी (Hindi)</li>
                <li>اردو (Urdu)</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 PsyConnect - Team CodeGenesis. Built for SIH 2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
