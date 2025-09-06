"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  ArrowLeft,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Download,
  Calendar,
  Filter,
  Eye,
  Shield,
  Brain,
  Heart,
  MessageSquare,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

// Sample data for analytics
const wellbeingTrends = [
  { month: "Jan", depression: 42, anxiety: 38, stress: 65, improvement: 15 },
  { month: "Feb", depression: 40, anxiety: 36, stress: 62, improvement: 18 },
  { month: "Mar", depression: 38, anxiety: 34, stress: 58, improvement: 22 },
  { month: "Apr", depression: 35, anxiety: 31, stress: 55, improvement: 25 },
  { month: "May", depression: 33, anxiety: 29, stress: 52, improvement: 28 },
  { month: "Jun", depression: 30, anxiety: 26, stress: 48, improvement: 32 },
]

const platformUsage = [
  { feature: "Self-Assessment", users: 2847, sessions: 4521 },
  { feature: "AI Chatbot", users: 3156, sessions: 8934 },
  { feature: "Virtual Counseling", users: 1234, sessions: 1876 },
  { feature: "Resource Library", users: 2567, sessions: 5432 },
  { feature: "Forums", users: 1890, sessions: 3456 },
]

const impactMetrics = [
  { metric: "Burnout Reduction", before: 68, after: 45, improvement: 34 },
  { metric: "Stigma Reduction", before: 72, after: 52, improvement: 28 },
  { metric: "Early Detection", before: 23, after: 67, improvement: 191 },
  { metric: "Social Isolation", before: 58, after: 38, improvement: 34 },
  { metric: "Dropout Risk", before: 15, after: 9, improvement: 40 },
]

const demographicData = [
  { name: "Undergraduate", value: 65, color: "#0891b2" },
  { name: "Postgraduate", value: 25, color: "#15803d" },
  { name: "PhD", value: 10, color: "#be123c" },
]

const languageUsage = [
  { language: "English", percentage: 58 },
  { language: "Hindi", percentage: 32 },
  { language: "Urdu", percentage: 10 },
]

const alertsData = [
  {
    id: 1,
    type: "high-risk",
    message: "Increased depression scores in Computer Science department",
    timestamp: "2 hours ago",
    severity: "high",
  },
  {
    id: 2,
    type: "trend",
    message: "Anxiety levels rising during exam period",
    timestamp: "5 hours ago",
    severity: "medium",
  },
  {
    id: 3,
    type: "positive",
    message: "Forum engagement up 23% this week",
    timestamp: "1 day ago",
    severity: "low",
  },
]

export default function AdminDashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months")
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  return (
    <div className="min-h-screen bg-background">
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
                <Shield className="w-3 h-3" />
                Admin Access
              </Badge>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-32">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                  <SelectItem value="med">Medicine</SelectItem>
                  <SelectItem value="arts">Arts & Humanities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Analytics Dashboard</h1>
              <p className="text-muted-foreground">University-level insights for proactive mental health support</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High-Risk Students</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600 flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" />
                  -8.2%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Counseling Sessions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,876</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +23.1%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platform Engagement</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.3%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  +5.7%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="trends">Mental Health Trends</TabsTrigger>
            <TabsTrigger value="impact">Impact Analysis</TabsTrigger>
            <TabsTrigger value="usage">Platform Usage</TabsTrigger>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="alerts">Alerts & Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mental Health Trends Over Time</CardTitle>
                  <CardDescription>Percentage of students reporting symptoms (anonymized data)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={wellbeingTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="depression" stroke="#be123c" strokeWidth={2} />
                      <Line type="monotone" dataKey="anxiety" stroke="#ea580c" strokeWidth={2} />
                      <Line type="monotone" dataKey="stress" stroke="#dc2626" strokeWidth={2} />
                      <Line type="monotone" dataKey="improvement" stroke="#15803d" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Mental Health Status</CardTitle>
                  <CardDescription>Latest assessment results breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Low Risk", value: 58, fill: "#15803d" },
                          { name: "Moderate Risk", value: 32, fill: "#ea580c" },
                          { name: "High Risk", value: 10, fill: "#be123c" },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: "Low Risk", value: 58, fill: "#15803d" },
                          { name: "Moderate Risk", value: 32, fill: "#ea580c" },
                          { name: "High Risk", value: 10, fill: "#be123c" },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>PsyConnect Impact Analysis</CardTitle>
                <CardDescription>
                  Comparison of mental health metrics before and after platform implementation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={impactMetrics} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="metric" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="before" fill="#be123c" name="Before PsyConnect" />
                    <Bar dataKey="after" fill="#15803d" name="After PsyConnect" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {impactMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{metric.metric}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Before:</span>
                        <span className="font-medium">{metric.before}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>After:</span>
                        <span className="font-medium">{metric.after}%</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>Improvement:</span>
                        <span className="text-green-600">+{metric.improvement}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Usage Statistics</CardTitle>
                  <CardDescription>Active users and sessions by platform feature</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={platformUsage}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="feature" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="users" fill="#0891b2" name="Active Users" />
                      <Bar dataKey="sessions" fill="#15803d" name="Total Sessions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Language Preferences</CardTitle>
                  <CardDescription>Distribution of language usage across the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {languageUsage.map((lang, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{lang.language}</span>
                          <span className="font-medium">{lang.percentage}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${lang.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Demographics</CardTitle>
                  <CardDescription>Distribution by academic level</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={demographicData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {demographicData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regional Distribution</CardTitle>
                  <CardDescription>Students by region within J&K</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { region: "Srinagar", count: 1847, percentage: 38 },
                      { region: "Jammu", count: 1456, percentage: 30 },
                      { region: "Leh-Ladakh", count: 789, percentage: 16 },
                      { region: "Other Districts", count: 755, percentage: 16 },
                    ].map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{region.region}</span>
                          <span className="font-medium">
                            {region.count} ({region.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${region.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Alerts</CardTitle>
                  <CardDescription>Proactive notifications requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alertsData.map((alert) => (
                      <div
                        key={alert.id}
                        className={`p-4 rounded-lg border-l-4 ${
                          alert.severity === "high"
                            ? "border-red-500 bg-red-50"
                            : alert.severity === "medium"
                              ? "border-orange-500 bg-orange-50"
                              : "border-green-500 bg-green-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-sm">{alert.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                          </div>
                          <Badge
                            variant={
                              alert.severity === "high"
                                ? "destructive"
                                : alert.severity === "medium"
                                  ? "secondary"
                                  : "default"
                            }
                            className="ml-2"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommended Actions</CardTitle>
                  <CardDescription>AI-suggested interventions based on data trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800">Increase Counselor Availability</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            High demand detected during exam periods. Consider adding evening slots.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-start gap-3">
                        <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">Expand Peer Support Programs</h4>
                          <p className="text-sm text-green-700 mt-1">
                            Forum engagement is high. Consider training peer moderators.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-orange-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-orange-800">Targeted Resource Development</h4>
                          <p className="text-sm text-orange-700 mt-1">
                            Create more content in Urdu to serve underrepresented students.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Export and Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            <p>Data updated every 15 minutes • All data is anonymized and GDPR compliant</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button>
              <CheckCircle className="w-4 h-4 mr-2" />
              Generate Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
