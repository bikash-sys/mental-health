"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Send, Bot, User, Globe, Heart, Shield, Clock, Lightbulb, Phone } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  language?: string
}

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "hi", name: "हिंदी", flag: "🇮🇳" },
  { code: "ur", name: "اردو", flag: "🇵🇰" },
]

const quickResponses = {
  en: [
    "I'm feeling anxious about exams",
    "I can't sleep well lately",
    "I feel overwhelmed with studies",
    "I'm having trouble concentrating",
    "I feel isolated from friends",
  ],
  hi: [
    "मुझे परीक्षा की चिंता हो रही है",
    "मुझे रात में नींद नहीं आती",
    "मैं पढ़ाई से परेशान हूं",
    "मुझे ध्यान लगाने में समस्या है",
    "मैं दोस्तों से अलग महसूस करता हूं",
  ],
  ur: [
    "مجھے امتحان کی فکر ہو رہی ہے",
    "مجھے رات کو نیند نہیں آتی",
    "میں پڑھائی سے پریشان ہوں",
    "مجھے توجہ مرکوز کرنے میں مشکل ہے",
    "میں دوستوں سے الگ محسوس کرتا ہوں",
  ],
}

const aiResponses = {
  en: {
    greeting:
      "Hello! I'm your AI mental health companion. I'm here to listen and support you 24/7. How are you feeling today?",
    anxiety:
      "I understand you're feeling anxious about exams. This is very common among students, especially in J&K where academic pressure can be intense. Let's work through some breathing exercises together. Take a deep breath in for 4 counts, hold for 4, then exhale for 6. Remember, you're not alone in this.",
    sleep:
      "Sleep difficulties are often connected to stress and anxiety. Given the unique challenges students face in our region, this is quite common. Try establishing a bedtime routine: no screens 1 hour before bed, some light reading, or meditation. Would you like me to guide you through a relaxation technique?",
    overwhelmed:
      "Feeling overwhelmed with studies is something many students experience. In J&K, we understand the additional pressures you might face. Let's break down your tasks into smaller, manageable pieces. What's the most urgent thing you need to focus on right now?",
    concentration:
      "Difficulty concentrating can stem from stress, anxiety, or even trauma responses, which we know can affect students in our region. Try the Pomodoro technique: 25 minutes of focused study, then a 5-minute break. Also, ensure you're getting enough nutrition and water.",
    isolation:
      "Feeling isolated is particularly challenging, and I understand this might be amplified by the unique social dynamics in J&K. Remember that reaching out, like you're doing now, is a brave first step. Consider joining study groups or online communities with fellow students.",
  },
  hi: {
    greeting:
      "नमस्ते! मैं आपका AI मानसिक स्वास्थ्य साथी हूं। मैं 24/7 आपकी बात सुनने और सहायता करने के लिए यहां हूं। आज आप कैसा महसूस कर रहे हैं?",
    anxiety:
      "मैं समझ सकता हूं कि आप परीक्षा को लेकर चिंतित हैं। यह छात्रों में बहुत आम है, खासकर J&K में जहां शैक्षणिक दबाव तीव्र हो सकता है। आइए कुछ सांस की तकनीकों का अभ्यास करते हैं।",
    sleep:
      "नींद की समस्याएं अक्सर तनाव और चिंता से जुड़ी होती हैं। हमारे क्षेत्र के छात्रों के लिए यह काफी सामान्य है। सोने से पहले की दिनचर्या बनाने की कोशिश करें।",
    overwhelmed: "पढ़ाई से अभिभूत महसूस करना कई छात्रों का अनुभव है। J&K में हम समझते हैं कि आप पर अतिरिक्त दबाव हो सकते हैं।",
    concentration: "ध्यान केंद्रित करने में कठिनाई तनाव, चिंता या आघात की प्रतिक्रिया से हो सकती है। पोमोडोरो तकनीक आज़माएं।",
    isolation: "अकेलापन महसूस करना विशेष रूप से चुनौतीपूर्ण है। याद रखें कि मदद मांगना, जैसा कि आप कर रहे हैं, एक साहसिक कदम है।",
  },
  ur: {
    greeting:
      "السلام علیکم! میں آپ کا AI ذہنی صحت کا ساتھی ہوں۔ میں 24/7 آپ کی بات سننے اور مدد کرنے کے لیے یہاں ہوں۔ آج آپ کیسا محسوس کر رہے ہیں؟",
    anxiety:
      "میں سمجھ سکتا ہوں کہ آپ امتحان کو لے کر پریشان ہیں۔ یہ طلباء میں بہت عام ہے، خاص طور پر J&K میں جہاں تعلیمی دباؤ شدید ہو سکتا ہے۔",
    sleep: "نیند کی مسائل اکثر تناؤ اور پریشانی سے جڑے ہوتے ہیں۔ ہمارے علاقے کے طلباء کے لیے یہ کافی عام ہے۔",
    overwhelmed:
      "پڑھائی سے مغلوب محسوس کرنا کئی طلباء کا تجربہ ہے۔ J&K میں ہم سمجھتے ہیں کہ آپ پر اضافی دباؤ ہو سکتے ہیں۔",
    concentration: "توجہ مرکوز کرنے میں دشواری تناؤ، پریشانی یا صدمے کی واکنش سے ہو سکتی ہے۔",
    isolation:
      "تنہائی محسوس کرنا خاص طور پر مشکل ہے۔ یاد رکھیں کہ مدد مانگنا، جیسا کہ آپ کر رہے ہیں، ایک بہادری کا قدم ہے۔",
  },
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initial greeting message
    const greeting: Message = {
      id: "1",
      content: aiResponses[selectedLanguage as keyof typeof aiResponses].greeting,
      sender: "ai",
      timestamp: new Date(),
      language: selectedLanguage,
    }
    setMessages([greeting])
  }, [selectedLanguage])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    const responses = aiResponses[selectedLanguage as keyof typeof aiResponses]

    if (
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("anxiety") ||
      lowerMessage.includes("exam") ||
      lowerMessage.includes("चिंता") ||
      lowerMessage.includes("فکر")
    ) {
      return responses.anxiety
    } else if (
      lowerMessage.includes("sleep") ||
      lowerMessage.includes("insomnia") ||
      lowerMessage.includes("नींद") ||
      lowerMessage.includes("نیند")
    ) {
      return responses.sleep
    } else if (
      lowerMessage.includes("overwhelmed") ||
      lowerMessage.includes("stress") ||
      lowerMessage.includes("अभिभूत") ||
      lowerMessage.includes("مغلوب")
    ) {
      return responses.overwhelmed
    } else if (
      lowerMessage.includes("concentration") ||
      lowerMessage.includes("focus") ||
      lowerMessage.includes("ध्यान") ||
      lowerMessage.includes("توجہ")
    ) {
      return responses.concentration
    } else if (
      lowerMessage.includes("isolated") ||
      lowerMessage.includes("lonely") ||
      lowerMessage.includes("अकेला") ||
      lowerMessage.includes("تنہا")
    ) {
      return responses.isolation
    } else {
      return selectedLanguage === "en"
        ? "I hear you, and I want you to know that your feelings are valid. Many students in J&K face similar challenges. Can you tell me more about what's troubling you? I'm here to listen and support you."
        : selectedLanguage === "hi"
          ? "मैं आपकी बात सुन रहा हूं, और मैं चाहता हूं कि आप जानें कि आपकी भावनाएं वैध हैं। J&K के कई छात्र समान चुनौतियों का सामना करते हैं। क्या आप मुझे बता सकते हैं कि आपको क्या परेशान कर रहा है?"
          : "میں آپ کی بات سن رہا ہوں، اور میں چاہتا ہوں کہ آپ جانیں کہ آپ کے جذبات درست ہیں۔ J&K کے کئی طلباء اسی طرح کے مسائل کا سامنا کرتے ہیں۔ کیا آپ مجھے بتا سکتے ہیں کہ آپ کو کیا پریشان کر رہا ہے؟"
    }
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
        language: selectedLanguage,
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickResponse = (response: string) => {
    sendMessage(response)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputMessage)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                24/7 Available
              </Badge>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32">
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
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        {/* Chat Header */}
        <div className="p-6 border-b bg-card/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">AI Mental Health Companion</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Online • Culturally Sensitive Support for J&K Students
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-card border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-secondary" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="bg-card border rounded-lg px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Responses */}
        {messages.length <= 1 && (
          <div className="p-4 border-t bg-muted/30">
            <div className="max-w-3xl mx-auto">
              <p className="text-sm text-muted-foreground mb-3">Quick responses:</p>
              <div className="flex flex-wrap gap-2">
                {quickResponses[selectedLanguage as keyof typeof quickResponses].map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickResponse(response)}
                    className="text-xs"
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t bg-card/50">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  selectedLanguage === "en"
                    ? "Type your message here..."
                    : selectedLanguage === "hi"
                      ? "यहाँ अपना संदेश लिखें..."
                      : "یہاں اپنا پیغام لکھیں..."
                }
                className="flex-1"
                disabled={isTyping}
              />
              <Button onClick={() => sendMessage(inputMessage)} disabled={!inputMessage.trim() || isTyping} size="icon">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Safety Features */}
            <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  End-to-end encrypted
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  Culturally sensitive
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Multilingual support
                </span>
              </div>
              <Button variant="ghost" size="sm" className="text-xs h-auto p-1">
                <Phone className="w-3 h-3 mr-1" />
                Crisis Helpline
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Resources Sidebar */}
      <div className="hidden lg:block fixed right-4 top-1/2 transform -translate-y-1/2 w-64">
        <Card className="border-2 border-orange-200 bg-orange-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-orange-600" />
              Emergency Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-xs">
              <p className="font-medium text-orange-800 mb-1">Crisis Helplines:</p>
              <p>National: 1800-599-0019</p>
              <p>J&K: 0194-2440033</p>
            </div>
            <div className="text-xs">
              <p className="font-medium text-orange-800 mb-1">If you're in immediate danger:</p>
              <p>Call emergency services: 112</p>
            </div>
            <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
              Find Local Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
