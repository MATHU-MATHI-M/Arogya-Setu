"use client"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/components/auth-guard"
import { i18n } from "@/lib/i18n"
import { VoiceAssistant } from "@/components/voice-assistant"
import {
  UserPlus,
  FileText,
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Stethoscope,
  Heart,
  Brain,
} from "lucide-react"

import { useEffect, useState } from "react"

function Dashboard() {
  const { user } = useAuth()
  const [name, setName] = useState("")

  useEffect(() => {
    if (user?.name) {
      setName(user.name)
    } else if (typeof window !== "undefined") {
      // Get user from localStorage
      const userStr = localStorage.getItem("arogya_user")
      if (userStr) {
        try {
          const userObj = JSON.parse(userStr)
          setName(userObj.name || "Healthcare Worker")
        } catch {
          setName("Healthcare Worker")
        }
      } else {
        setName("Healthcare Worker")
      }
    }
  }, [user])

  const quickActions = [
    {
      title: i18n.t("startNewConsultation"),
      description: i18n.t("beginAIAssisted"),
      icon: UserPlus,
      href: "/consultation",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: i18n.t("viewPatientRecords"),
      description: i18n.t("accessPatientHistory"),
      icon: FileText,
      href: "/records",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      title: i18n.t("syncData"),
      description: i18n.t("updateOfflineDatabase"),
      icon: Activity,
      href: "/sync",
      color: "bg-accent text-accent-foreground",
    },
  ]

  const metrics = [
    { label: i18n.t("patientsToday"), value: "12", icon: Users, trend: "+2" },
    { label: i18n.t("consultations"), value: "8", icon: Stethoscope, trend: "+1" },
    { label: i18n.t("referrals"), value: "3", icon: TrendingUp, trend: "0" },
    { label: i18n.t("successRate"), value: "94%", icon: CheckCircle, trend: "+2%" },
  ]

  const commonDiagnoses = [
    { condition: i18n.t("hypertension"), count: 4, percentage: 33 },
    { condition: i18n.t("diabetesType2"), count: 3, percentage: 25 },
    { condition: i18n.t("respiratoryInfection"), count: 2, percentage: 17 },
    { condition: i18n.t("gastritis"), count: 2, percentage: 17 },
    { condition: i18n.t("migraine"), count: 1, percentage: 8 },
  ]

  const alerts = [
    {
      type: "warning",
      message: i18n.t("networkRestored"),
      time: "2 minutes ago",
      icon: CheckCircle,
    },
    {
      type: "info",
      message: i18n.t("knowledgeBaseUpdated"),
      time: "1 hour ago",
      icon: Brain,
    },
    {
      type: "urgent",
      message: i18n.t("urgentReferral"),
      time: "3 hours ago",
      icon: AlertTriangle,
    },
  ]

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.clear()
      window.location.href = "/login"
    }
  }

  return (
    <MedicalLayout currentPage="home">
      <div className="space-y-6">
        {/* Voice Assistant for dashboard narration */}
        <div className="flex justify-end">
          <VoiceAssistant className="mb-2" />
        </div>
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold font-montserrat text-balance">
              {i18n.t("welcomeBack")}, {name}!
            </h1>
            <button onClick={handleLogout} className="text-sm text-red-600 border px-3 py-1 rounded hover:bg-red-50">{i18n.t("logout")}</button>
          </div>
          <p className="text-muted-foreground">{i18n.t("healthCenterOverview")}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Card key={index} className="cursor-pointer transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-2`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" asChild>
                    <a href={action.href}>{i18n.t("getStarted")}</a>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Metrics */}
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{metric.label}</CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {metric.trend} from yesterday
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Common Diagnoses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                {i18n.t("commonDiagnosesThisWeek")}
              </CardTitle>
              <CardDescription>{i18n.t("mostFrequentConditions")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {commonDiagnoses.map((diagnosis, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{diagnosis.condition}</span>
                    <Badge variant="secondary">{diagnosis.count} {i18n.t("cases")}</Badge>
                  </div>
                  <Progress value={diagnosis.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts & Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                {i18n.t("recentAlerts")}
              </CardTitle>
              <CardDescription>{i18n.t("systemNotifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => {
                const Icon = alert.icon
                const alertColors = {
                  warning: "text-orange-500",
                  info: "text-blue-500",
                  urgent: "text-red-500",
                }

                return (
                  <div key={index} className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <Icon className={`h-5 w-5 mt-0.5 ${alertColors[alert.type as keyof typeof alertColors]}`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </MedicalLayout>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  )
}
