"use client"

export interface VoiceSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  language: string
}

export class VoiceService {
  private synthesis: SpeechSynthesis | null = null
  private recognition: any = null
  private isListening = false
  private settings: VoiceSettings = {
    enabled: true,
    rate: 0.8,
    pitch: 1,
    volume: 0.8,
    language: "en-US",
  }

  constructor() {
    if (typeof window !== "undefined") {
      this.synthesis = window.speechSynthesis

      if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        this.recognition = new SpeechRecognition()
        this.recognition.continuous = false
        this.recognition.interimResults = false
        this.recognition.lang = this.settings.language
      }

      // Load saved settings
      const savedSettings = localStorage.getItem("arogya_voice_settings")
      if (savedSettings) {
        this.settings = { ...this.settings, ...JSON.parse(savedSettings) }
      }
    }
  }

  // Text-to-Speech functionality
  speak(text: string, options?: Partial<VoiceSettings>): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.synthesis || !this.settings.enabled) {
        resolve()
        return
      }

      // Stop any ongoing speech
      this.synthesis.cancel()

      // Always use the current language from i18n
      let lang = this.settings.language
      try {
        // Dynamically get i18n if available
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const i18n = require("@/lib/i18n").i18n
        if (i18n && typeof i18n.getCurrentLanguage === "function") {
          const code = i18n.getCurrentLanguage()
          lang = this.getLanguageCode(code)
        }
      } catch {}

      const utterance = new SpeechSynthesisUtterance(text)
      const finalSettings = { ...this.settings, ...options, language: lang }

      utterance.rate = finalSettings.rate
      utterance.pitch = finalSettings.pitch
      utterance.volume = finalSettings.volume
      utterance.lang = finalSettings.language

      utterance.onend = () => resolve()
      utterance.onerror = (error) => reject(error)

      this.synthesis.speak(utterance)
    })
  }

  // Speech-to-Text functionality
  startListening(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition || this.isListening) {
        reject(new Error("Speech recognition not available or already listening"))
        return
      }

      // Always use the current language from i18n
      let lang = this.settings.language
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const i18n = require("@/lib/i18n").i18n
        if (i18n && typeof i18n.getCurrentLanguage === "function") {
          const code = i18n.getCurrentLanguage()
          lang = this.getLanguageCode(code)
        }
      } catch {}

      this.isListening = true
      this.recognition.lang = lang

      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        this.isListening = false
        resolve(transcript)
      }

      this.recognition.onerror = (error: any) => {
        this.isListening = false
        reject(error)
      }

      this.recognition.onend = () => {
        this.isListening = false
      }

      this.recognition.start()
    })
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop()
      this.isListening = false
    }
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel()
    }
  }

  // Settings management
  updateSettings(newSettings: Partial<VoiceSettings>) {
    this.settings = { ...this.settings, ...newSettings }
    localStorage.setItem("arogya_voice_settings", JSON.stringify(this.settings))
  }

  getSettings(): VoiceSettings {
    return { ...this.settings }
  }

  // Language mapping for different regions
  getLanguageCode(languageCode: string): string {
    const langMap: Record<string, string> = {
      en: "en-US",
      hi: "hi-IN",
      bn: "bn-IN",
      te: "te-IN",
      kn: "kn-IN",
      ml: "ml-IN",
      ta: "ta-IN",
    }
    return langMap[languageCode] || "en-US"
  }

  // Check if voice features are supported
  isSupported(): boolean {
    return !!(this.synthesis && this.recognition)
  }

  isListeningActive(): boolean {
    return this.isListening
  }

  // Read page content aloud
  async readPageContent(selector = "main"): Promise<void> {
    const element = document.querySelector(selector)
    if (!element) return

    const text = element.textContent || ""
    const cleanText = text.replace(/\s+/g, " ").trim().substring(0, 1000) // Limit to 1000 chars

    if (cleanText) {
      await this.speak(cleanText)
    }
  }

  // Read specific medical terms with pronunciation help
  async readMedicalTerm(term: string, definition?: string): Promise<void> {
    let textToRead = term
    if (definition) {
      textToRead += `. ${definition}`
    }
    await this.speak(textToRead, { rate: 0.6 }) // Slower for medical terms
  }
}

export const voiceService = new VoiceService()
