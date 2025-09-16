"use client"

import type React from "react"
import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Search } from "lucide-react"

export default function PatientRecords() {
  const patientRecords = [
    {
      id: "P001",
      name: "Arvind",
      age: 29,
      gender: "Male",
      phone: "9876543210",
      location: "Chennai",
      lastVisit: "2024-02-12",
      lastDiagnosis: "Hypertension",
      status: "active",
    },
    {
      id: "P002",
      name: "Dinu Anand",
      age: 35,
      gender: "Male",
      phone: "9123456789",
      location: "Coimbatore",
      lastVisit: "2024-01-25",
      lastDiagnosis: "Diabetes Type II",
      status: "follow-up",
    },
    {
      id: "P003",
      name: "Sherin",
      age: 26,
      gender: "Female",
      phone: "9012345678",
      location: "Madurai",
      lastVisit: "2024-03-05",
      lastDiagnosis: "Asthma",
      status: "active",
    },
    {
      id: "P004",
      name: "Sheela",
      age: 40,
      gender: "Female",
      phone: "9345678901",
      location: "Salem",
      lastVisit: "2024-02-18",
      lastDiagnosis: "Thyroid Disorder",
      status: "recovered",
    },
    {
      id: "P005",
      name: "Deepika",
      age: 32,
      gender: "Female",
      phone: "9456789012",
      location: "Trichy",
      lastVisit: "2024-03-01",
      lastDiagnosis: "Migraine",
      status: "active",
    },
    {
      id: "P006",
      name: "Varshini",
      age: 28,
      gender: "Female",
      phone: "9567890123",
      location: "Erode",
      lastVisit: "2024-01-15",
      lastDiagnosis: "Vitamin D Deficiency",
      status: "follow-up",
    },
    {
      id: "P007",
      name: "Karthick",
      age: 37,
      gender: "Male",
      phone: "9678901234",
      location: "Tirunelveli",
      lastVisit: "2024-02-20",
      lastDiagnosis: "Back Pain",
      status: "referred",
    },
    {
      id: "P008",
      name: "Joshwa",
      age: 45,
      gender: "Male",
      phone: "9789012345",
      location: "Thanjavur",
      lastVisit: "2024-02-28",
      lastDiagnosis: "High Cholesterol",
      status: "active",
    },
    {
      id: "P009",
      name: "Mathu Mathi",
      age: 31,
      gender: "Female",
      phone: "9890123456",
      location: "Namakkal",
      lastVisit: "2024-03-08",
      lastDiagnosis: "Skin Allergy",
      status: "active",
    },
    {
      id: "P010",
      name: "Akhil",
      age: 34,
      gender: "Male",
      phone: "9901234567",
      location: "Kanyakumari",
      lastVisit: "2024-01-30",
      lastDiagnosis: "Gastric Ulcer",
      status: "recovered",
    },
  ]

  function getStatusBadge(status: string) {
    switch (status) {
      case "follow-up":
        return <Badge className="bg-blue-100 text-blue-700">Follow-up Required</Badge>
      case "active":
        return <Badge className="bg-green-100 text-green-700">Active Treatment</Badge>
      case "recovered":
        return <Badge className="bg-purple-100 text-purple-700">Recovered</Badge>
      case "referred":
        return <Badge className="bg-orange-100 text-orange-700">Referred</Badge>
      default:
        return null
    }
  }

  // Summary counts
  const totalPatients = patientRecords.length
  const activeCases = patientRecords.filter(p => p.status === "active").length
  const followUps = patientRecords.filter(p => p.status === "follow-up").length
  const referrals = patientRecords.filter(p => p.status === "referred").length

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const filtered = patientRecords.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "all" || p.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <AuthGuard>
      <MedicalLayout currentPage="records">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-montserrat text-balance">Patient Records</h1>
              <p className="text-muted-foreground">Manage and view patient medical history</p>
            </div>
            <Button
              className="flex items-center gap-2 bg-green-700 hover:bg-green-800"
              onClick={() => {}}
            >
              + Add New Patient
            </Button>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or patient ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              className="border rounded px-3 py-2 text-sm"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All Patients</option>
              <option value="active">Active</option>
              <option value="follow-up">Follow-up</option>
              <option value="referred">Referred</option>
              <option value="recovered">Recovered</option>
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <Card className="p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">{totalPatients}</div>
              <div className="text-muted-foreground text-sm mt-1">Total Patients</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">{activeCases}</div>
              <div className="text-muted-foreground text-sm mt-1">Active Cases</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">{followUps}</div>
              <div className="text-muted-foreground text-sm mt-1">Follow-ups</div>
            </Card>
            <Card className="p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">{referrals}</div>
              <div className="text-muted-foreground text-sm mt-1">Referrals</div>
            </Card>
          </div>

          {/* Patient Records */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Patient Records</h2>
            <div className="text-muted-foreground text-sm mb-4">
              {filtered.length} of {totalPatients} patients
            </div>
            <div className="space-y-4">
              {filtered.map(p => (
                <Card
                  key={p.id}
                  className="flex flex-col md:flex-row items-center md:items-start justify-between p-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>
                        {p.name
                          .split(" ")
                          .map(n => n[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-lg flex items-center gap-2">
                        {p.name} {getStatusBadge(p.status)}
                      </div>
                      <div className="text-sm text-muted-foreground flex flex-wrap gap-2 items-center">
                        <span>
                          {p.age}y, {p.gender}
                        </span>
                        <span>• {p.phone}</span>
                        <span>• {p.location}</span>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        <span>Last visit: {p.lastVisit.replace(/-/g, "/")}</span>
                        <span className="ml-4">Last diagnosis: {p.lastDiagnosis}</span>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4 md:mt-0" variant="outline">
                    <User className="h-4 w-4 mr-2" /> View Record
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </MedicalLayout>
    </AuthGuard>
  )
}
