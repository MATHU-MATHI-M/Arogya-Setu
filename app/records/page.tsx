"use client"

import type React from "react"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Search,
  Filter,
  Eye,
  Calendar,
  User,
  Phone,
  MapPin,
  Activity,
  FileText,
  Clock,
  ChevronRight,
  Download,
  Edit,
  Plus,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PatientRecord {
  id: string
  name: string
  age: number
  gender: string
  phone: string
  location: string
  lastVisit: string
  lastDiagnosis: string
  status: "active" | "follow-up" | "referred" | "recovered"
  consultations: Consultation[]
}

interface Consultation {
  id: string
  date: string
  chiefComplaint: string
  diagnosis: string
  treatment: string[]
  vitals: {
    temperature: string
    bloodPressure: string
    heartRate: string
    spO2: string
  }
  followUp: boolean
  notes: string
}

function PatientRecordsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedPatient, setSelectedPatient] = useState<PatientRecord | null>(null)

  // Mock patient data
  const patientRecords: PatientRecord[] = [
    {
      id: "P001",
      name: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      phone: "+91 98765 43210",
      location: "Rampur Village, Uttar Pradesh",
      lastVisit: "2024-01-15",
      lastDiagnosis: "Hypertension",
      status: "follow-up",
      consultations: [
        {
          id: "C001",
          date: "2024-01-15",
          chiefComplaint: "Headache and dizziness",
          diagnosis: "Hypertension (Stage 2)",
          treatment: ["Amlodipine 5mg once daily", "Lifestyle modifications"],
          vitals: {
            temperature: "98.6°F",
            bloodPressure: "160/95 mmHg",
            heartRate: "78 bpm",
            spO2: "98%",
          },
          followUp: true,
          notes: "Patient advised to monitor BP daily. Follow-up in 2 weeks.",
        },
        {
          id: "C002",
          date: "2024-01-01",
          chiefComplaint: "Chest discomfort",
          diagnosis: "Essential Hypertension",
          treatment: ["Lisinopril 10mg once daily"],
          vitals: {
            temperature: "98.4°F",
            bloodPressure: "155/90 mmHg",
            heartRate: "82 bpm",
            spO2: "97%",
          },
          followUp: true,
          notes: "Initial diagnosis. Patient education provided.",
        },
      ],
    },
    {
      id: "P002",
      name: "Priya Sharma",
      age: 32,
      gender: "Female",
      phone: "+91 87654 32109",
      location: "Keshavpur, Bihar",
      lastVisit: "2024-01-14",
      lastDiagnosis: "Diabetes Type 2",
      status: "active",
      consultations: [
        {
          id: "C003",
          date: "2024-01-14",
          chiefComplaint: "Frequent urination and thirst",
          diagnosis: "Diabetes Mellitus Type 2",
          treatment: ["Metformin 500mg twice daily", "Dietary counseling"],
          vitals: {
            temperature: "98.2°F",
            bloodPressure: "130/80 mmHg",
            heartRate: "72 bpm",
            spO2: "99%",
          },
          followUp: true,
          notes: "HbA1c: 8.2%. Patient started on metformin. Dietary counseling provided.",
        },
      ],
    },
    {
      id: "P003",
      name: "Mohammed Ali",
      age: 28,
      gender: "Male",
      phone: "+91 76543 21098",
      location: "Sultanpur, Rajasthan",
      lastVisit: "2024-01-13",
      lastDiagnosis: "Respiratory Infection",
      status: "recovered",
      consultations: [
        {
          id: "C004",
          date: "2024-01-13",
          chiefComplaint: "Cough and fever",
          diagnosis: "Upper Respiratory Tract Infection",
          treatment: ["Azithromycin 500mg for 3 days", "Paracetamol as needed"],
          vitals: {
            temperature: "101.2°F",
            bloodPressure: "120/75 mmHg",
            heartRate: "88 bpm",
            spO2: "96%",
          },
          followUp: false,
          notes: "Viral URTI. Symptomatic treatment. Patient recovered well.",
        },
      ],
    },
    {
      id: "P004",
      name: "Sunita Devi",
      age: 55,
      gender: "Female",
      phone: "+91 65432 10987",
      location: "Bharatpur, Haryana",
      lastVisit: "2024-01-12",
      lastDiagnosis: "Gastritis",
      status: "referred",
      consultations: [
        {
          id: "C005",
          date: "2024-01-12",
          chiefComplaint: "Abdominal pain and nausea",
          diagnosis: "Chronic Gastritis",
          treatment: ["Omeprazole 20mg once daily", "Antacid as needed"],
          vitals: {
            temperature: "98.8°F",
            bloodPressure: "140/85 mmHg",
            heartRate: "76 bpm",
            spO2: "98%",
          },
          followUp: true,
          notes: "Referred to gastroenterologist for endoscopy. Continue PPI therapy.",
        },
      ],
    },
  ]

  const filteredPatients = patientRecords.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || patient.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "follow-up":
        return "bg-blue-100 text-blue-800"
      case "referred":
        return "bg-orange-100 text-orange-800"
      case "recovered":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active Treatment"
      case "follow-up":
        return "Follow-up Required"
      case "referred":
        return "Referred"
      case "recovered":
        return "Recovered"
      default:
        return status
    }
  }

  return (
    <MedicalLayout currentPage="records">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-montserrat text-balance">Patient Records</h1>
            <p className="text-muted-foreground">Manage and view patient medical history</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add New Patient
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or patient ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Patients</SelectItem>
              <SelectItem value="active">Active Treatment</SelectItem>
              <SelectItem value="follow-up">Follow-up Required</SelectItem>
              <SelectItem value="referred">Referred</SelectItem>
              <SelectItem value="recovered">Recovered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{patientRecords.length}</p>
                  <p className="text-sm text-muted-foreground">Total Patients</p>
                </div>
                <User className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{patientRecords.filter((p) => p.status === "active").length}</p>
                  <p className="text-sm text-muted-foreground">Active Cases</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{patientRecords.filter((p) => p.status === "follow-up").length}</p>
                  <p className="text-sm text-muted-foreground">Follow-ups</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{patientRecords.filter((p) => p.status === "referred").length}</p>
                  <p className="text-sm text-muted-foreground">Referrals</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patient List */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Records</CardTitle>
            <CardDescription>
              {filteredPatients.length} of {patientRecords.length} patients
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{patient.name}</h3>
                        <Badge className={getStatusColor(patient.status)} variant="secondary">
                          {getStatusLabel(patient.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {patient.age}y, {patient.gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {patient.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {patient.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Last visit: {new Date(patient.lastVisit).toLocaleDateString()}
                        </span>
                        <span>Last diagnosis: {patient.lastDiagnosis}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPatient(patient)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Record
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            {patient.name} - Medical Record
                          </DialogTitle>
                          <DialogDescription>
                            Patient ID: {patient.id} | Complete medical history and consultations
                          </DialogDescription>
                        </DialogHeader>

                        {selectedPatient && (
                          <div className="space-y-6">
                            {/* Patient Info */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Patient Information</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                                    <p className="font-medium">{selectedPatient.name}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Patient ID</Label>
                                    <p className="font-medium">{selectedPatient.id}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Age & Gender</Label>
                                    <p className="font-medium">
                                      {selectedPatient.age} years, {selectedPatient.gender}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                                    <p className="font-medium">{selectedPatient.phone}</p>
                                  </div>
                                  <div className="md:col-span-2">
                                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                                    <p className="font-medium">{selectedPatient.location}</p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>

                            {/* Consultation History */}
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Consultation History</CardTitle>
                                <CardDescription>
                                  {selectedPatient.consultations.length} consultations on record
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-6">
                                  {selectedPatient.consultations.map((consultation, index) => (
                                    <div key={consultation.id} className="border-l-2 border-primary/20 pl-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold">
                                          {new Date(consultation.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </h4>
                                        {consultation.followUp && (
                                          <Badge variant="outline" className="text-blue-600">
                                            Follow-up Required
                                          </Badge>
                                        )}
                                      </div>

                                      <div className="space-y-3">
                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">
                                            Chief Complaint
                                          </Label>
                                          <p className="text-sm">{consultation.chiefComplaint}</p>
                                        </div>

                                        <div>
                                          <Label className="text-sm font-medium text-muted-foreground">Diagnosis</Label>
                                          <p className="text-sm font-medium">{consultation.diagnosis}</p>
                                        </div>

                                        <div className="grid gap-4 md:grid-cols-2">
                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">
                                              Vital Signs
                                            </Label>
                                            <div className="text-sm space-y-1">
                                              <p>Temperature: {consultation.vitals.temperature}</p>
                                              <p>Blood Pressure: {consultation.vitals.bloodPressure}</p>
                                              <p>Heart Rate: {consultation.vitals.heartRate}</p>
                                              <p>SpO2: {consultation.vitals.spO2}</p>
                                            </div>
                                          </div>

                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">
                                              Treatment
                                            </Label>
                                            <ul className="text-sm space-y-1">
                                              {consultation.treatment.map((treatment, idx) => (
                                                <li key={idx} className="flex items-start gap-1">
                                                  <span className="text-primary">•</span>
                                                  {treatment}
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>

                                        {consultation.notes && (
                                          <div>
                                            <Label className="text-sm font-medium text-muted-foreground">Notes</Label>
                                            <p className="text-sm">{consultation.notes}</p>
                                          </div>
                                        )}
                                      </div>

                                      {index < selectedPatient.consultations.length - 1 && (
                                        <Separator className="mt-6" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </CardContent>
                            </Card>

                            {/* Actions */}
                            <div className="flex gap-2">
                              <Button className="flex items-center gap-2">
                                <Edit className="h-4 w-4" />
                                Edit Record
                              </Button>
                              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                <Download className="h-4 w-4" />
                                Download PDF
                              </Button>
                              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                                <Plus className="h-4 w-4" />
                                New Consultation
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            {filteredPatients.length === 0 && (
              <div className="text-center py-8">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No patients found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MedicalLayout>
  )
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

export default function PatientRecords() {
  return (
    <AuthGuard>
      <PatientRecordsPage />
    </AuthGuard>
  )
}
