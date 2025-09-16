"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Volume2, VolumeX } from "lucide-react"
import { i18n, languages, type Language } from "@/lib/i18n"

export function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState<Language>("en")
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    setCurrentLang(i18n.getCurrentLanguage())

    const unsubscribe = i18n.subscribe((lang) => {
      setCurrentLang(lang)
    })

    return unsubscribe
  }, [])

  const handleLanguageChange = (lang: Language) => {
    i18n.setLanguage(lang)
    // Announce language change
    const langName = languages.find((l) => l.code === lang)?.nativeName || lang
    i18n.speak(`${i18n.t("welcome")} - ${langName}`)
  }

  const handleVoiceNarration = () => {
    if (isSpeaking) {
      i18n.stopSpeaking()
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)

      // Get page content for narration
      const pageContent =
        document.querySelector("main")?.textContent ||
        document.querySelector('[role="main"]')?.textContent ||
        document.body.textContent ||
        ""

      // Clean and limit content
      const cleanContent = pageContent.replace(/\s+/g, " ").trim().substring(0, 500) // Limit to first 500 characters

      if (cleanContent) {
        i18n.speak(cleanContent)

        // Reset speaking state when done
        setTimeout(
          () => {
            setIsSpeaking(false)
          },
          (cleanContent.length / 10) * 1000,
        ) // Rough estimate of speaking time
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={currentLang} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="icon"
        onClick={handleVoiceNarration}
        title={i18n.t("voiceNarration")}
        className={isSpeaking ? "bg-primary text-primary-foreground" : ""}
      >
        {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}
