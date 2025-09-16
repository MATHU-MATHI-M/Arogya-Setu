"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, FileText, Video, Download, ExternalLink, Clock, Star, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "protocols", label: "Treatment Protocols" },
    { value: "diagnostics", label: "Diagnostic Guidelines" },
    { value: "medications", label: "Medication Guide" },
    { value: "emergency", label: "Emergency Procedures" },
    { value: "pediatric", label: "Pediatric Care" },
    { value: "chronic", label: "Chronic Conditions" },
  ]

  const knowledgeItems = [
    {
      id: 1,
      title: "Hypertension Management Protocol",
      description: "Comprehensive guidelines for diagnosing and managing high blood pressure in rural settings",
      category: "protocols",
      type: "document",
      lastUpdated: "2 days ago",
      rating: 4.8,
      downloads: 245,
      icon: FileText,
    },
    {
      id: 2,
      title: "Diabetes Screening Guidelines",
      description: "Step-by-step approach to diabetes screening and early intervention strategies",
      category: "diagnostics",
      type: "document",
      lastUpdated: "1 week ago",
      rating: 4.9,
      downloads: 189,
      icon: FileText,
    },
    {
      id: 3,
      title: "Emergency Cardiac Care",
      description: "Critical procedures for cardiac emergencies when specialist care is not immediately available",
      category: "emergency",
      type: "video",
      lastUpdated: "3 days ago",
      rating: 4.7,
      downloads: 156,
      icon: Video,
    },
    {
      id: 4,
      title: "Pediatric Fever Management",
      description: "Age-appropriate fever management protocols for children under 12 years",
      category: "pediatric",
      type: "document",
      lastUpdated: "5 days ago",
      rating: 4.6,
      downloads: 203,
      icon: FileText,
    },
    {
      id: 5,
      title: "Common Drug Interactions",
      description: "Reference guide for identifying and managing common medication interactions",
      category: "medications",
      type: "reference",
      lastUpdated: "1 day ago",
      rating: 4.9,
      downloads: 312,
      icon: BookOpen,
    },
    {
      id: 6,
      title: "Respiratory Infection Protocols",
      description: "Diagnostic and treatment guidelines for common respiratory infections",
      category: "protocols",
      type: "document",
      lastUpdated: "4 days ago",
      rating: 4.5,
      downloads: 178,
      icon: FileText,
    },
  ]

  const filteredItems = knowledgeItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-purple-100 text-purple-800"
      case "reference":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <MedicalLayout currentPage="knowledge">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-montserrat text-balance">Knowledge Base</h1>
          <p className="text-muted-foreground">Access medical protocols, guidelines, and educational resources</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search protocols, guidelines, medications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-muted-foreground">Total Resources</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">23</p>
                  <p className="text-sm text-muted-foreground">New This Month</p>
                </div>
                <FileText className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Downloads</p>
                </div>
                <Download className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-sm text-muted-foreground">Avg. Rating</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Knowledge Items */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => {
            const Icon = item.icon
            return (
              <Card key={item.id} className="cursor-pointer transition-all hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <Badge className={getTypeColor(item.type)} variant="secondary">
                        {item.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-muted-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.lastUpdated}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {item.downloads}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MedicalLayout>
  )
}

export default function KnowledgeBase() {
  return (
    <AuthGuard>
      <KnowledgeBasePage />
    </AuthGuard>
  )
}
