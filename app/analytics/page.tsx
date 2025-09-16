"use client"

import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, Activity, Clock, Heart, Brain, Stethoscope, AlertTriangle } from "lucide-react"

function AnalyticsPage() {
  const weeklyStats = [
    { day: "Mon", patients: 15, consultations: 12 },
    { day: "Tue", patients: 18, consultations: 14 },
    { day: "Wed", patients: 12, consultations: 10 },
    { day: "Thu", patients: 20, consultations: 16 },
    { day: "Fri", patients: 16, consultations: 13 },
    { day: "Sat", patients: 8, consultations: 6 },
    { day: "Sun", patients: 5, consultations: 4 },
  ]

  const topConditions = [
    { condition: "Hypertension", cases: 45, percentage: 28, trend: "+5%" },
    { condition: "Diabetes Type 2", cases: 38, percentage: 24, trend: "+2%" },
    { condition: "Respiratory Infections", cases: 32, percentage: 20, trend: "-3%" },
    { condition: "Gastritis", cases: 25, percentage: 16, trend: "+1%" },
    { condition: "Migraine", cases: 18, percentage: 12, trend: "0%" },
  ]

  const performanceMetrics = [
    { label: "Diagnostic Accuracy", value: "94.2%", change: "+2.1%", icon: Brain, color: "text-green-600" },
    { label: "Avg. Consultation Time", value: "12 min", change: "-1 min", icon: Clock, color: "text-blue-600" },
    { label: "Patient Satisfaction", value: "4.8/5", change: "+0.2", icon: Heart, color: "text-pink-600" },
    { label: "Referral Rate", value: "15%", change: "-2%", icon: TrendingUp, color: "text-orange-600" },
  ]

  return (
    <MedicalLayout currentPage="analytics">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-montserrat text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Healthcare center performance insights and trends</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p
                    className={`text-xs flex items-center gap-1 ${metric.change.startsWith("+") ? "text-green-600" : metric.change.startsWith("-") ? "text-red-600" : "text-gray-600"}`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {metric.change} from last month
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Weekly Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Patient visits and consultations this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyStats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{stat.day}</span>
                      <div className="flex gap-4">
                        <span className="text-primary">{stat.patients} patients</span>
                        <span className="text-secondary">{stat.consultations} consultations</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Progress value={(stat.patients / 20) * 100} className="h-2 flex-1" />
                      <Progress value={(stat.consultations / 16) * 100} className="h-2 flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Conditions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-primary" />
                Most Common Conditions
              </CardTitle>
              <CardDescription>Top diagnosed conditions this month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {topConditions.map((condition, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{condition.condition}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{condition.cases} cases</Badge>
                      <span
                        className={`text-xs ${condition.trend.startsWith("+") ? "text-green-600" : condition.trend.startsWith("-") ? "text-red-600" : "text-gray-600"}`}
                      >
                        {condition.trend}
                      </span>
                    </div>
                  </div>
                  <Progress value={condition.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Additional Insights */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Patient Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Age 0-18</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Age 19-40</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <Progress value={35} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Age 41-65</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Age 65+</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-green-600" />
                System Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">AI Response Time</span>
                <Badge variant="outline" className="text-green-600">
                  2.3s avg
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Database Sync</span>
                <Badge variant="outline" className="text-blue-600">
                  98% uptime
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Offline Mode</span>
                <Badge variant="outline" className="text-orange-600">
                  12% usage
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Error Rate</span>
                <Badge variant="outline" className="text-red-600">
                  0.2%
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Quality Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Follow-up Rate</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Treatment Adherence</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Referral Success</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MedicalLayout>
  )
}

export default function Analytics() {
  return (
    <AuthGuard>
      <AnalyticsPage />
    </AuthGuard>
  )
}
