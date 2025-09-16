"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  User,
  MessageSquare,
  Activity,
  FileText,
  ChevronRight,
  ChevronLeft,
  Send,
  AlertTriangle,
  CheckCircle,
  Brain,
  Heart,
  Thermometer,
  Eye,
  Pill,
  Loader2,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { geminiAI, type DiagnosisResult } from "@/lib/gemini-ai"
// import { VoiceAssistant } from "@/components/voice-assistant"

interface PatientData {
  name: string
  age: string
  gender: string
  location: string
  patientId: string
  chiefComplaint: string
}

interface VitalsData {
  temperature: string
  bloodPressureSystolic: string
  bloodPressureDiastolic: string
  heartRate: string
  spO2: string
  bloodSugar: string
  comorbidities: string[]
  allergies: string
  medicalHistory: string
}

interface ChatMessage {
  id: string
  type: "user" | "ai"
  message: string
  timestamp: Date
}

function ConsultationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    age: "",
    gender: "",
    location: "",
    patientId: "",
    chiefComplaint: "",
  })

  const [vitalsData, setVitalsData] = useState<VitalsData>({
    temperature: "",
    bloodPressureSystolic: "",
    bloodPressureDiastolic: "",
    heartRate: "",
    spO2: "",
    bloodSugar: "",
    comorbidities: [],
    allergies: "",
    medicalHistory: "",
  })

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      message:
        "Hello! I'm your AI diagnostic assistant powered by advanced medical knowledge. Please describe the patient's symptoms in detail. What brings them in today?",
      timestamp: new Date(),
    },
  ])

  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null)
  const [isGeneratingDiagnosis, setIsGeneratingDiagnosis] = useState(false)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const { toast } = useToast()

  const steps = [
    { id: 1, title: "Patient Info", icon: User },
    { id: 2, title: "Symptoms", icon: MessageSquare },
    { id: 3, title: "Vitals", icon: Activity },
    { id: 4, title: "Diagnosis", icon: FileText },
  ]

  const comorbidityOptions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Heart Disease",
    "Kidney Disease",
    "Liver Disease",
    "Thyroid Disorder",
    "Arthritis",
  ]

  const commonSymptoms = [
    "Fever",
    "Headache",
    "Cough",
    "Shortness of breath",
    "Chest pain",
    "Abdominal pain",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Fatigue",
    "Dizziness",
    "Joint pain",
    "Skin rash",
    "Sore throat",
  ]

  const handlePatientDataChange = (field: keyof PatientData, value: string) => {
    setPatientData((prev) => ({ ...prev, [field]: value }))
  }

  const handleVitalsChange = (field: keyof VitalsData, value: string | string[]) => {
    setVitalsData((prev) => ({ ...prev, [field]: value }))
  }

  const handleComorbidityChange = (condition: string, checked: boolean) => {
    setVitalsData((prev) => ({
      ...prev,
      comorbidities: checked ? [...prev.comorbidities, condition] : prev.comorbidities.filter((c) => c !== condition),
    }))
  }

  const sendMessage = async () => {
    if (!currentMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: currentMessage,
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])

    // Extract symptoms from user message
    const messageSymptoms = commonSymptoms.filter((symptom) =>
      currentMessage.toLowerCase().includes(symptom.toLowerCase()),
    )
    setSymptoms((prev) => [...new Set([...prev, ...messageSymptoms])])

    setCurrentMessage("")
    setIsTyping(true)

    try {
      // Get conversation history
      const conversationHistory = chatMessages.map((msg) => `${msg.type}: ${msg.message}`)

      // Get AI response using Gemini
      const aiResponse = await geminiAI.chatWithSymptoms(currentMessage, conversationHistory)

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message: aiResponse,
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI response error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        message:
          "I apologize, but I'm having trouble processing your message. Please try again or continue with the consultation.",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const addSymptom = (symptom: string) => {
    setCurrentMessage((prev) => (prev ? `${prev}, ${symptom}` : symptom))
    setSymptoms((prev) => [...new Set([...prev, symptom])])
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateDiagnosis = async () => {
    setIsGeneratingDiagnosis(true)

    try {
      const consultationData = {
        patientInfo: {
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          location: patientData.location,
          chiefComplaint: patientData.chiefComplaint,
        },
        symptoms,
        vitals: {
          temperature: vitalsData.temperature,
          bloodPressure:
            vitalsData.bloodPressureSystolic && vitalsData.bloodPressureDiastolic
              ? `${vitalsData.bloodPressureSystolic}/${vitalsData.bloodPressureDiastolic}`
              : undefined,
          heartRate: vitalsData.heartRate,
          spO2: vitalsData.spO2,
          bloodSugar: vitalsData.bloodSugar,
        },
        medicalHistory: {
          comorbidities: vitalsData.comorbidities,
          allergies: vitalsData.allergies,
          pastHistory: vitalsData.medicalHistory,
        },
      }

      const aiDiagnosis = await geminiAI.generateDiagnosis(consultationData)
      setDiagnosis(aiDiagnosis)

      toast({
        title: "Diagnosis Generated",
        description: "AI analysis complete. Review the results below.",
      })
    } catch (error) {
      console.error("Diagnosis generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate diagnosis. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingDiagnosis(false)
    }
  }

  const completeConsultation = async () => {
    if (!diagnosis) return

    try {
      const consultationData = {
        patientInfo: {
          name: patientData.name,
          age: patientData.age,
          gender: patientData.gender,
          location: patientData.location,
          chiefComplaint: patientData.chiefComplaint,
        },
        symptoms,
        vitals: {
          temperature: vitalsData.temperature,
          bloodPressure:
            vitalsData.bloodPressureSystolic && vitalsData.bloodPressureDiastolic
              ? `${vitalsData.bloodPressureSystolic}/${vitalsData.bloodPressureDiastolic}`
              : undefined,
          heartRate: vitalsData.heartRate,
          spO2: vitalsData.spO2,
          bloodSugar: vitalsData.bloodSugar,
        },
        medicalHistory: {
          comorbidities: vitalsData.comorbidities,
          allergies: vitalsData.allergies,
          pastHistory: vitalsData.medicalHistory,
        },
      }

      const saved = await geminiAI.saveConsultation(consultationData, diagnosis)

      if (saved) {
        toast({
          title: "Consultation Saved",
          description: "Patient consultation has been successfully recorded.",
        })
      } else {
        toast({
          title: "Save Error",
          description: "Failed to save consultation. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Save consultation error:", error)
      toast({
        title: "Error",
        description: "An error occurred while saving the consultation.",
        variant: "destructive",
      })
    }
  }

  // Auto-generate diagnosis when entering step 4
  if (currentStep === 4 && !diagnosis && !isGeneratingDiagnosis) {
    generateDiagnosis()
  }

  return (
    <MedicalLayout currentPage="consultation">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-montserrat text-balance">New Consultation</h1>
          <p className="text-muted-foreground">AI-assisted patient diagnosis workflow powered by Gemini AI</p>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = currentStep === step.id
                const isCompleted = currentStep > step.id

                return (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center gap-2 ${isActive ? "text-primary" : isCompleted ? "text-green-600" : "text-muted-foreground"}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : isCompleted
                              ? "bg-green-600 text-white"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                      </div>
                      <span className="font-medium hidden sm:inline">{step.title}</span>
                    </div>
                    {index < steps.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground mx-4" />}
                  </div>
                )
              })}
            </div>
            <div className="mt-4">
              <Progress value={(currentStep / 4) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* ... existing step content code ... */}

        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Patient Demographics
              </CardTitle>
              <CardDescription>Enter basic patient information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    placeholder="Enter full name"
                    value={patientData.name}
                    onChange={(e) => handlePatientDataChange("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    placeholder="Auto-generated or manual entry"
                    value={patientData.patientId}
                    onChange={(e) => handlePatientDataChange("patientId", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    value={patientData.age}
                    onChange={(e) => handlePatientDataChange("age", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Gender *</Label>
                  <Select
                    value={patientData.gender}
                    onValueChange={(value) => handlePatientDataChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Village/Town, District"
                    value={patientData.location}
                    onChange={(e) => handlePatientDataChange("location", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="chiefComplaint">Chief Complaint *</Label>
                <Textarea
                  id="chiefComplaint"
                  placeholder="Brief description of the main problem or reason for visit"
                  value={patientData.chiefComplaint}
                  onChange={(e) => handlePatientDataChange("chiefComplaint", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="h-[600px] flex flex-col shadow-lg border border-gray-200 overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    AI Symptom Assessment
                    <Badge variant="secondary" className="ml-2">
                      Powered by Gemini AI
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Describe symptoms in natural language - AI will ask follow-up questions
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
                  {/* Messages */}
                  <div
                    className="flex-1 overflow-y-auto space-y-4 px-6 pt-4 pb-2 custom-scrollbar"
                    style={{ minHeight: 0, maxHeight: '100%' }}
                  >
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm break-words whitespace-pre-line">{message.message}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-current rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <div className="flex gap-2 px-6 pb-4 pt-2 border-t border-gray-100 bg-white/80 backdrop-blur-sm" style={{ position: 'relative' }}>
                    <Input
                      placeholder="Describe symptoms..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
                      className="flex-1"
                      disabled={isTyping}
                    />

                    <Button onClick={sendMessage} disabled={!currentMessage.trim() || isTyping}>
                      {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Symptoms */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Common Symptoms</CardTitle>
                <CardDescription>Click to add to your message</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {commonSymptoms.map((symptom) => (
                    <Button
                      key={symptom}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left bg-transparent"
                      onClick={() => addSymptom(symptom)}
                    >
                      {symptom}
                    </Button>
                  ))}
                </div>
                {symptoms.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <Label className="text-sm font-medium">Identified Symptoms:</Label>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {symptoms.map((symptom, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {symptom}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Vital Signs
                </CardTitle>
                <CardDescription>Record patient's vital measurements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Temperature (°F)
                    </Label>
                    <Input
                      placeholder="98.6"
                      value={vitalsData.temperature}
                      onChange={(e) => handleVitalsChange("temperature", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Heart Rate (bpm)
                    </Label>
                    <Input
                      placeholder="72"
                      value={vitalsData.heartRate}
                      onChange={(e) => handleVitalsChange("heartRate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Pressure (Systolic)</Label>
                    <Input
                      placeholder="120"
                      value={vitalsData.bloodPressureSystolic}
                      onChange={(e) => handleVitalsChange("bloodPressureSystolic", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Pressure (Diastolic)</Label>
                    <Input
                      placeholder="80"
                      value={vitalsData.bloodPressureDiastolic}
                      onChange={(e) => handleVitalsChange("bloodPressureDiastolic", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SpO2 (%)</Label>
                    <Input
                      placeholder="98"
                      value={vitalsData.spO2}
                      onChange={(e) => handleVitalsChange("spO2", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Blood Sugar (mg/dL)</Label>
                    <Input
                      placeholder="100"
                      value={vitalsData.bloodSugar}
                      onChange={(e) => handleVitalsChange("bloodSugar", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Medical History
                </CardTitle>
                <CardDescription>Patient's medical background</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Co-morbidities</Label>
                  <div className="grid gap-2 md:grid-cols-2">
                    {comorbidityOptions.map((condition) => (
                      <div key={condition} className="flex items-center space-x-2">
                        <Checkbox
                          id={condition}
                          checked={vitalsData.comorbidities.includes(condition)}
                          onCheckedChange={(checked) => handleComorbidityChange(condition, checked as boolean)}
                        />
                        <Label htmlFor={condition} className="text-sm">
                          {condition}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergies">Allergies</Label>
                  <Textarea
                    id="allergies"
                    placeholder="List any known allergies..."
                    value={vitalsData.allergies}
                    onChange={(e) => handleVitalsChange("allergies", e.target.value)}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalHistory">Past Medical History</Label>
                  <Textarea
                    id="medicalHistory"
                    placeholder="Previous surgeries, hospitalizations, chronic conditions..."
                    value={vitalsData.medicalHistory}
                    onChange={(e) => handleVitalsChange("medicalHistory", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            {isGeneratingDiagnosis && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-lg">Generating AI diagnosis...</p>
                  </div>
                  <p className="text-center text-muted-foreground mt-2">
                    Analyzing symptoms, vitals, and medical history using Gemini AI
                  </p>
                </CardContent>
              </Card>
            )}

            {diagnosis && (
              <>
                {/* Primary Diagnosis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-primary" />
                      AI Diagnosis Results
                      <Badge variant="secondary" className="ml-2">
                        Powered by Gemini AI
                      </Badge>
                    </CardTitle>
                    <CardDescription>Generated diagnosis based on symptoms and vitals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{diagnosis.primary.condition}</h3>
                          <Badge variant="default">{diagnosis.primary.confidence}% confidence</Badge>
                        </div>
                        <p className="text-muted-foreground">{diagnosis.primary.description}</p>
                        {diagnosis.primary.icd10 && (
                          <p className="text-xs text-muted-foreground mt-2">ICD-10: {diagnosis.primary.icd10}</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Differential Diagnoses</h4>
                        <div className="space-y-2">
                          {diagnosis.differential.map((diff, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                              <span className="text-sm">{diff.condition}</span>
                              <Badge variant="outline">{diff.confidence}%</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Treatment Protocol */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Pill className="h-5 w-5 text-primary" />
                      Treatment Protocol
                    </CardTitle>
                    <CardDescription>AI-recommended medications and dosages</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {diagnosis.treatment.map((treatment, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{treatment.drug}</h4>
                            {!treatment.interactions && (
                              <Badge variant="outline" className="text-green-600">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                No interactions
                              </Badge>
                            )}
                          </div>
                          <div className="grid gap-2 md:grid-cols-3 text-sm">
                            <div>
                              <span className="text-muted-foreground">Dosage:</span>
                              <p className="font-medium">{treatment.dosage}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Frequency:</span>
                              <p className="font-medium">{treatment.frequency}</p>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Duration:</span>
                              <p className="font-medium">{treatment.duration}</p>
                            </div>
                          </div>
                          {treatment.warnings && treatment.warnings.length > 0 && (
                            <div className="mt-2 p-2 bg-yellow-50 rounded text-sm">
                              <strong>Warnings:</strong> {treatment.warnings.join(", ")}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Referral Alert */}
                {diagnosis.referral.urgent && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Urgent Referral Required:</strong> {diagnosis.referral.specialist} -{" "}
                      {diagnosis.referral.reason}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Patient Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5 text-primary" />
                      Patient-Friendly Summary
                    </CardTitle>
                    <CardDescription>Simplified explanation for the patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm mb-4">{diagnosis.patientSummary}</p>
                      {diagnosis.followUp.length > 0 && (
                        <>
                          <h4 className="font-medium mb-2">Follow-up Instructions</h4>
                          <ul className="text-sm space-y-1 list-disc list-inside">
                            {diagnosis.followUp.map((instruction, index) => (
                              <li key={index}>{instruction}</li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                    <Button
                      className="w-full mt-4 bg-transparent"
                      variant="outline"
                      onClick={async () => {
                        const jsPDF = (await import('jspdf')).default
                        const doc = new jsPDF()
                        let y = 10
                        doc.setFontSize(16)
                        doc.text("Patient-Friendly Summary", 10, y)
                        y += 10
                        doc.setFontSize(12)
                        doc.text(diagnosis.patientSummary || "", 10, y)
                        y += 10
                        if (diagnosis.followUp.length > 0) {
                          doc.setFontSize(14)
                          doc.text("Follow-up Instructions", 10, y)
                          y += 8
                          doc.setFontSize(12)
                          diagnosis.followUp.forEach((inst) => {
                            doc.text("- " + inst, 12, y)
                            y += 7
                          })
                        }
                        doc.save("patient-summary.pdf")
                      }}
                    >
                      Print Patient Summary
                    </Button>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={nextStep}
              className="flex items-center gap-2"
              disabled={
                (currentStep === 1 && (!patientData.name || !patientData.age || !patientData.gender)) ||
                (currentStep === 2 && chatMessages.length < 3)
              }
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="flex items-center gap-2" onClick={completeConsultation} disabled={!diagnosis}>
              <CheckCircle className="h-4 w-4" />
              Complete Consultation
            </Button>
          )}
        </div>
      </div>
    </MedicalLayout>
  )
}

export default function Consultation() {
  return (
    <AuthGuard>
      <ConsultationWizard />
    </AuthGuard>
  )
}
