"use client"

interface ConsultationData {
  patientInfo: {
    name: string
    age: string
    gender: string
    location: string
    chiefComplaint: string
  }
  symptoms: string[]
  vitals: {
    temperature?: string
    bloodPressure?: string
    heartRate?: string
    spO2?: string
    bloodSugar?: string
  }
  medicalHistory: {
    comorbidities: string[]
    allergies: string
    pastHistory: string
  }
}

interface DiagnosisResult {
  primary: {
    condition: string
    confidence: number
    description: string
    icd10?: string
  }
  differential: Array<{
    condition: string
    confidence: number
    icd10?: string
  }>
  treatment: Array<{
    drug: string
    dosage: string
    frequency: string
    duration: string
    interactions: boolean
    warnings?: string[]
  }>
  referral: {
    urgent: boolean
    specialist?: string
    reason?: string
  }
  patientSummary: string
  followUp: string[]
}

export class GeminiAIService {
  private apiKey: string
  private baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

  constructor() {
    this.apiKey = "AIzaSyBcYcWvGi3zBpN4pfvz-h6hwIn5lu8arRU"
  }

  async generateResponse(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "I apologize, but I couldn't generate a response."
    } catch (error) {
      console.error("Gemini AI Error:", error)
      return "I'm experiencing technical difficulties. Please try again or consult with a healthcare professional."
    }
  }

  async chatWithSymptoms(message: string, conversationHistory: string[] = []): Promise<string> {
    const context = `You are an AI medical assistant helping healthcare workers in rural areas. 
    You should ask relevant follow-up questions about symptoms, duration, severity, and associated factors.
    Be professional, empathetic, and thorough. Always remind that this is for assistance only and not a replacement for professional medical judgment.
    
    Conversation history: ${conversationHistory.join("\n")}
    
    Patient/Healthcare worker says: ${message}
    
    Respond with appropriate medical questions or acknowledgments:`

    return await this.generateResponse(context)
  }

  async generateDiagnosis(consultationData: ConsultationData): Promise<DiagnosisResult> {
    const prompt = `As an AI medical diagnostic assistant, analyze the following patient data and provide a structured diagnosis:

Patient Information:
- Name: ${consultationData.patientInfo.name}
- Age: ${consultationData.patientInfo.age}
- Gender: ${consultationData.patientInfo.gender}
- Chief Complaint: ${consultationData.patientInfo.chiefComplaint}

Symptoms: ${consultationData.symptoms.join(", ")}

Vital Signs:
- Temperature: ${consultationData.vitals.temperature || "Not recorded"}°F
- Blood Pressure: ${consultationData.vitals.bloodPressure || "Not recorded"}
- Heart Rate: ${consultationData.vitals.heartRate || "Not recorded"} bpm
- SpO2: ${consultationData.vitals.spO2 || "Not recorded"}%
- Blood Sugar: ${consultationData.vitals.bloodSugar || "Not recorded"} mg/dL

Medical History:
- Comorbidities: ${consultationData.medicalHistory.comorbidities.join(", ") || "None reported"}
- Allergies: ${consultationData.medicalHistory.allergies || "None reported"}
- Past History: ${consultationData.medicalHistory.pastHistory || "None reported"}

Please provide a JSON response with the following structure:
{
  "primary": {
    "condition": "Primary diagnosis name",
    "confidence": 85,
    "description": "Brief explanation of the condition",
    "icd10": "ICD-10 code if applicable"
  },
  "differential": [
    {"condition": "Alternative diagnosis", "confidence": 65, "icd10": "code"},
    {"condition": "Another possibility", "confidence": 45, "icd10": "code"}
  ],
  "treatment": [
    {
      "drug": "Medication name",
      "dosage": "Amount",
      "frequency": "How often",
      "duration": "How long",
      "interactions": false,
      "warnings": ["Important warnings if any"]
    }
  ],
  "referral": {
    "urgent": false,
    "specialist": "Type of specialist if needed",
    "reason": "Why referral is needed"
  },
  "patientSummary": "Simple explanation for the patient",
  "followUp": ["Follow-up instructions"]
}

Important: This is for healthcare worker assistance in rural areas. Consider common conditions in rural India, available medications, and practical treatment options.`

    try {
      const response = await this.generateResponse(prompt)

      // Try to parse JSON from the response
      const jsonMatch = response.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const parsedResult = JSON.parse(jsonMatch[0])
        return parsedResult
      }

      // Fallback if JSON parsing fails
      return this.createFallbackDiagnosis(consultationData)
    } catch (error) {
      console.error("Diagnosis generation error:", error)
      return this.createFallbackDiagnosis(consultationData)
    }
  }

  private createFallbackDiagnosis(consultationData: ConsultationData): DiagnosisResult {
    // Create a basic diagnosis based on common patterns
    const symptoms = consultationData.symptoms.join(" ").toLowerCase()
    const vitals = consultationData.vitals

    let primaryCondition = "General Malaise"
    let confidence = 60
    let description = "Based on the symptoms presented, further evaluation is recommended."

    // Simple pattern matching for common conditions
    if (symptoms.includes("fever") && symptoms.includes("cough")) {
      primaryCondition = "Upper Respiratory Tract Infection"
      confidence = 75
      description = "Viral or bacterial infection of the upper respiratory system"
    } else if (symptoms.includes("headache") && symptoms.includes("fever")) {
      primaryCondition = "Viral Syndrome"
      confidence = 70
      description = "Common viral illness with systemic symptoms"
    } else if (vitals.bloodPressure && Number.parseInt(vitals.bloodPressure.split("/")[0]) > 140) {
      primaryCondition = "Hypertension"
      confidence = 85
      description = "Elevated blood pressure requiring management"
    }

    return {
      primary: {
        condition: primaryCondition,
        confidence,
        description,
      },
      differential: [
        { condition: "Viral Infection", confidence: 60 },
        { condition: "Stress-related Symptoms", confidence: 40 },
      ],
      treatment: [
        {
          drug: "Paracetamol",
          dosage: "500mg",
          frequency: "Every 6 hours",
          duration: "3-5 days",
          interactions: false,
        },
      ],
      referral: {
        urgent: false,
        specialist: "General Physician",
        reason: "For comprehensive evaluation if symptoms persist",
      },
      patientSummary:
        "You have symptoms that suggest a common illness. Take the prescribed medication and rest. See a doctor if symptoms worsen.",
      followUp: [
        "Return if symptoms worsen",
        "Complete the prescribed medication course",
        "Maintain adequate hydration and rest",
      ],
    }
  }

  async saveConsultation(consultationData: ConsultationData, diagnosis: DiagnosisResult): Promise<boolean> {
    try {
      // In a real implementation, this would save to a database
      const consultationRecord = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        patient: consultationData.patientInfo,
        symptoms: consultationData.symptoms,
        vitals: consultationData.vitals,
        medicalHistory: consultationData.medicalHistory,
        diagnosis,
        status: "completed",
      }

      // Save to localStorage for demo purposes
      const existingRecords = JSON.parse(localStorage.getItem("arogya_consultations") || "[]")
      existingRecords.push(consultationRecord)
      localStorage.setItem("arogya_consultations", JSON.stringify(existingRecords))

      return true
    } catch (error) {
      console.error("Error saving consultation:", error)
      return false
    }
  }
}

export const geminiAI = new GeminiAIService()
