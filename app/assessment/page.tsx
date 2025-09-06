"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Brain,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Heart,
  TrendingUp,
  Target,
  Lightbulb,
  Users,
} from "lucide-react"
import Link from "next/link"

// PHQ-9 Questions for Depression Screening
const phq9Questions = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed, or the opposite being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead, or of hurting yourself",
]

// GAD-7 Questions for Anxiety Screening
const gad7Questions = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

const responseOptions = [
  { value: "0", label: "Not at all", score: 0 },
  { value: "1", label: "Several days", score: 1 },
  { value: "2", label: "More than half the days", score: 2 },
  { value: "3", label: "Nearly every day", score: 3 },
]

export default function AssessmentPage() {
  const [currentStep, setCurrentStep] = useState(0) // 0: intro, 1: PHQ-9, 2: GAD-7, 3: results
  const [phq9Responses, setPhq9Responses] = useState<Record<number, number>>({})
  const [gad7Responses, setGad7Responses] = useState<Record<number, number>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const calculatePHQ9Score = () => {
    return Object.values(phq9Responses).reduce((sum, score) => sum + score, 0)
  }

  const calculateGAD7Score = () => {
    return Object.values(gad7Responses).reduce((sum, score) => sum + score, 0)
  }

  const getPHQ9Interpretation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", severity: "low" }
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", severity: "mild" }
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", severity: "moderate" }
    if (score <= 19) return { level: "Moderately Severe", color: "text-red-600", severity: "high" }
    return { level: "Severe", color: "text-red-800", severity: "severe" }
  }

  const getGAD7Interpretation = (score: number) => {
    if (score <= 4) return { level: "Minimal", color: "text-green-600", severity: "low" }
    if (score <= 9) return { level: "Mild", color: "text-yellow-600", severity: "mild" }
    if (score <= 14) return { level: "Moderate", color: "text-orange-600", severity: "moderate" }
    return { level: "Severe", color: "text-red-600", severity: "severe" }
  }

  const handlePHQ9Response = (questionIndex: number, score: number) => {
    setPhq9Responses((prev) => ({ ...prev, [questionIndex]: score }))
  }

  const handleGAD7Response = (questionIndex: number, score: number) => {
    setGad7Responses((prev) => ({ ...prev, [questionIndex]: score }))
  }

  const nextQuestion = () => {
    if (currentStep === 1 && currentQuestionIndex < phq9Questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else if (currentStep === 1) {
      setCurrentStep(2)
      setCurrentQuestionIndex(0)
    } else if (currentStep === 2 && currentQuestionIndex < gad7Questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
    } else if (currentStep === 2) {
      setCurrentStep(3)
    }
  }

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
    } else if (currentStep === 2) {
      setCurrentStep(1)
      setCurrentQuestionIndex(phq9Questions.length - 1)
    } else if (currentStep === 1) {
      setCurrentStep(0)
    }
  }

  const canProceed = () => {
    if (currentStep === 1) {
      return phq9Responses[currentQuestionIndex] !== undefined
    } else if (currentStep === 2) {
      return gad7Responses[currentQuestionIndex] !== undefined
    }
    return true
  }

  const getDetailedAnalytics = () => {
    const phq9Score = calculatePHQ9Score()
    const gad7Score = calculateGAD7Score()

    // Analyze specific problem areas based on responses
    const problemAreas = []
    const solutions = []

    // PHQ-9 Analysis
    if (phq9Responses[0] >= 2) problemAreas.push("Loss of interest in activities")
    if (phq9Responses[1] >= 2) problemAreas.push("Persistent sadness or hopelessness")
    if (phq9Responses[2] >= 2) problemAreas.push("Sleep disturbances")
    if (phq9Responses[3] >= 2) problemAreas.push("Low energy and fatigue")
    if (phq9Responses[4] >= 2) problemAreas.push("Appetite changes")
    if (phq9Responses[5] >= 2) problemAreas.push("Low self-esteem and guilt")
    if (phq9Responses[6] >= 2) problemAreas.push("Concentration difficulties")
    if (phq9Responses[7] >= 2) problemAreas.push("Psychomotor changes")
    if (phq9Responses[8] >= 1) problemAreas.push("Suicidal thoughts")

    // GAD-7 Analysis
    if (gad7Responses[0] >= 2) problemAreas.push("Persistent nervousness and anxiety")
    if (gad7Responses[1] >= 2) problemAreas.push("Uncontrollable worry")
    if (gad7Responses[2] >= 2) problemAreas.push("Excessive worry about various issues")
    if (gad7Responses[3] >= 2) problemAreas.push("Difficulty relaxing")
    if (gad7Responses[4] >= 2) problemAreas.push("Restlessness and agitation")
    if (gad7Responses[5] >= 2) problemAreas.push("Irritability")
    if (gad7Responses[6] >= 2) problemAreas.push("Fear and anticipatory anxiety")

    // Generate personalized solutions
    if (problemAreas.includes("Sleep disturbances")) {
      solutions.push({
        problem: "Sleep Issues",
        solution:
          "Establish a consistent sleep schedule, avoid screens 1 hour before bed, practice relaxation techniques",
        resources: ["Sleep Hygiene Guide", "Bedtime Meditation Audio"],
      })
    }

    if (problemAreas.includes("Concentration difficulties")) {
      solutions.push({
        problem: "Focus & Concentration",
        solution: "Break tasks into smaller chunks, use the Pomodoro technique, minimize distractions during study",
        resources: ["Study Techniques Guide", "Mindfulness for Focus"],
      })
    }

    if (problemAreas.includes("Persistent nervousness and anxiety") || problemAreas.includes("Uncontrollable worry")) {
      solutions.push({
        problem: "Anxiety & Worry",
        solution: "Practice deep breathing exercises, challenge negative thoughts, engage in regular physical activity",
        resources: ["Anxiety Management Toolkit", "Breathing Exercises Video"],
      })
    }

    if (problemAreas.includes("Low energy and fatigue")) {
      solutions.push({
        problem: "Low Energy",
        solution: "Maintain regular exercise routine, ensure proper nutrition, consider vitamin D supplementation",
        resources: ["Energy Boosting Tips", "Nutrition for Mental Health"],
      })
    }

    if (problemAreas.includes("Low self-esteem and guilt")) {
      solutions.push({
        problem: "Self-Esteem",
        solution: "Practice self-compassion, keep a gratitude journal, challenge self-critical thoughts",
        resources: ["Self-Compassion Exercises", "Building Confidence Guide"],
      })
    }

    // Academic-specific solutions for J&K students
    if (phq9Score > 9 || gad7Score > 9) {
      solutions.push({
        problem: "Academic Stress",
        solution: "Connect with academic advisors, join study groups, practice time management techniques",
        resources: ["Academic Support Resources", "Stress Management for Students"],
      })
    }

    return { problemAreas, solutions, riskLevel: getRiskLevel(phq9Score, gad7Score) }
  }

  const getRiskLevel = (phq9Score: number, gad7Score: number) => {
    if (phq9Score >= 15 || gad7Score >= 15) return "high"
    if (phq9Score >= 10 || gad7Score >= 10) return "moderate"
    if (phq9Score >= 5 || gad7Score >= 5) return "mild"
    return "low"
  }

  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Mental Health Self-Assessment</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take our confidential screening to better understand your mental well-being. This assessment uses
              clinically validated tools (PHQ-9 and GAD-7) to provide personalized insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>PHQ-9 Depression Screening</CardTitle>
                <CardDescription>
                  A 9-question tool to assess symptoms of depression over the past two weeks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>GAD-7 Anxiety Screening</CardTitle>
                <CardDescription>
                  A 7-question tool to identify symptoms of generalized anxiety disorder.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Your Privacy is Protected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-muted-foreground">
                <li>• All responses are completely confidential and encrypted</li>
                <li>• Results are personalized and culturally sensitive</li>
                <li>• No personal information is stored without your consent</li>
                <li>• Available in English, Hindi, and Urdu</li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button size="lg" onClick={() => setCurrentStep(1)} className="text-lg px-8">
              Begin Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">Takes approximately 5-7 minutes to complete</p>
          </div>
        </div>
      </div>
    )
  }

  if (currentStep === 3) {
    const phq9Score = calculatePHQ9Score()
    const gad7Score = calculateGAD7Score()
    const depressionResult = getPHQ9Interpretation(phq9Score)
    const anxietyResult = getGAD7Interpretation(gad7Score)
    const analytics = getDetailedAnalytics()

    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Detailed Mental Health Analytics</h1>
            <p className="text-xl text-muted-foreground">
              Based on your responses, here's a comprehensive analysis of your mental well-being with personalized
              solutions.
            </p>
          </div>

          <div className="mb-8">
            <Card
              className={`border-2 ${
                analytics.riskLevel === "high"
                  ? "border-red-200 bg-red-50"
                  : analytics.riskLevel === "moderate"
                    ? "border-orange-200 bg-orange-50"
                    : analytics.riskLevel === "mild"
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-green-200 bg-green-50"
              }`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Overall Risk Assessment: {analytics.riskLevel.charAt(0).toUpperCase() + analytics.riskLevel.slice(1)}{" "}
                  Risk
                </CardTitle>
                <CardDescription>
                  {analytics.riskLevel === "high" &&
                    "Your responses indicate significant mental health concerns that require immediate attention."}
                  {analytics.riskLevel === "moderate" &&
                    "You're experiencing notable mental health symptoms that would benefit from professional support."}
                  {analytics.riskLevel === "mild" &&
                    "You're showing some signs of mental health concerns that can be managed with proper self-care."}
                  {analytics.riskLevel === "low" &&
                    "Your mental health appears to be in good condition. Continue your current wellness practices."}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Existing score cards */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Depression Screening (PHQ-9)
                  <Badge variant="outline">{phq9Score}/27</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className={`text-2xl font-bold ${depressionResult.color} mb-2`}>{depressionResult.level}</div>
                  <Progress value={(phq9Score / 27) * 100} className="h-2" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {depressionResult.severity === "low" &&
                    "Your responses suggest minimal depression symptoms. Continue maintaining good mental health practices."}
                  {depressionResult.severity === "mild" &&
                    "You may be experiencing mild depression symptoms. Consider speaking with a counselor for support."}
                  {depressionResult.severity === "moderate" &&
                    "Your responses indicate moderate depression symptoms. We recommend professional consultation."}
                  {depressionResult.severity === "high" &&
                    "You may be experiencing significant depression symptoms. Please consider seeking professional help."}
                  {depressionResult.severity === "severe" &&
                    "Your responses suggest severe depression symptoms. We strongly recommend immediate professional support."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Anxiety Screening (GAD-7)
                  <Badge variant="outline">{gad7Score}/21</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className={`text-2xl font-bold ${anxietyResult.color} mb-2`}>{anxietyResult.level}</div>
                  <Progress value={(gad7Score / 21) * 100} className="h-2" />
                </div>
                <p className="text-muted-foreground text-sm">
                  {anxietyResult.severity === "low" &&
                    "Your responses suggest minimal anxiety symptoms. Keep up your current coping strategies."}
                  {anxietyResult.severity === "mild" &&
                    "You may be experiencing mild anxiety symptoms. Consider stress management techniques or counseling."}
                  {anxietyResult.severity === "moderate" &&
                    "Your responses indicate moderate anxiety symptoms. Professional support may be beneficial."}
                  {anxietyResult.severity === "severe" &&
                    "You may be experiencing significant anxiety symptoms. We recommend seeking professional help."}
                </p>
              </CardContent>
            </Card>
          </div>

          {analytics.problemAreas.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Identified Problem Areas
                </CardTitle>
                <CardDescription>
                  Based on your responses, these are the specific areas that may need attention:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analytics.problemAreas.map((problem, index) => (
                    <Badge key={index} variant="secondary" className="p-2 text-center justify-center">
                      {problem}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {analytics.solutions.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Personalized Solutions & Action Plan
                </CardTitle>
                <CardDescription>Tailored recommendations based on your specific challenges:</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analytics.solutions.map((item, index) => (
                    <div key={index} className="border-l-4 border-primary pl-4">
                      <h3 className="font-semibold text-lg mb-2">{item.problem}</h3>
                      <p className="text-muted-foreground mb-3">{item.solution}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.resources.map((resource, resourceIndex) => (
                          <Badge key={resourceIndex} variant="outline" className="text-xs">
                            📚 {resource}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Immediate Action Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">🎯 Priority Actions (Next 24-48 hours):</h3>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    {analytics.riskLevel === "high" && (
                      <>
                        <li>
                          • <strong>Urgent:</strong> Contact our crisis support hotline or emergency services
                        </li>
                        <li>• Schedule an immediate virtual counseling session</li>
                      </>
                    )}
                    <li>• Talk to our 24/7 AI counselor for immediate support and coping strategies</li>
                    <li>• Join our anonymous support forums to connect with peers facing similar challenges</li>
                    <li>• Download our mobile app for daily mood tracking and guided exercises</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">📅 This Week:</h3>
                  <ul className="space-y-2 text-muted-foreground ml-4">
                    <li>• Explore our curated resource library for specific techniques</li>
                    <li>• Practice daily mindfulness exercises (start with 5 minutes)</li>
                    <li>• Establish a consistent sleep and meal schedule</li>
                    {analytics.riskLevel !== "low" && (
                      <li>• Schedule a virtual counseling session with our qualified professionals</li>
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">🌍 Cultural & Regional Support:</h3>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      <strong>For J&K Students:</strong> We understand the unique challenges you face, including
                      academic pressure, regional stressors, and cultural expectations. Our platform provides culturally
                      sensitive support with counselors who understand your context. Resources are available in English,
                      Hindi, and Urdu to ensure you feel comfortable and understood.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chatbot">
              <Button size="lg" className="text-lg px-8 w-full sm:w-auto">
                Talk to AI Counselor
              </Button>
            </Link>
            <Link href="/counseling">
              <Button size="lg" variant="outline" className="text-lg px-8 w-full sm:w-auto bg-transparent">
                Schedule Professional Session
              </Button>
            </Link>
            <Link href="/resources">
              <Button size="lg" variant="secondary" className="text-lg px-8 w-full sm:w-auto">
                Explore Resources
              </Button>
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Remember: This assessment is for informational purposes only and does not replace professional medical
              advice. If you're experiencing thoughts of self-harm, please contact emergency services immediately.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestions = currentStep === 1 ? phq9Questions : gad7Questions
  const currentResponses = currentStep === 1 ? phq9Responses : gad7Responses
  const assessmentType = currentStep === 1 ? "Depression" : "Anxiety"
  const questionNumber = currentQuestionIndex + 1
  const totalQuestions = currentQuestions.length

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span>Back to Home</span>
            </Link>
            <Badge variant="outline">{assessmentType} Screening</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(((questionNumber - 1) / totalQuestions) * 100)}% Complete
            </span>
          </div>
          <Progress value={((questionNumber - 1) / totalQuestions) * 100} className="h-2" />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Over the last 2 weeks, how often have you been bothered by:</CardTitle>
            <CardDescription className="text-lg font-medium text-foreground">
              {currentQuestions[currentQuestionIndex]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentResponses[currentQuestionIndex]?.toString() || ""}
              onValueChange={(value) => {
                const score = Number.parseInt(value)
                if (currentStep === 1) {
                  handlePHQ9Response(currentQuestionIndex, score)
                } else {
                  handleGAD7Response(currentQuestionIndex, score)
                }
              }}
            >
              {responseOptions.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-2 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={prevQuestion} disabled={currentStep === 1 && currentQuestionIndex === 0}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button onClick={nextQuestion} disabled={!canProceed()}>
            {currentStep === 2 && currentQuestionIndex === gad7Questions.length - 1 ? "View Results" : "Next"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
