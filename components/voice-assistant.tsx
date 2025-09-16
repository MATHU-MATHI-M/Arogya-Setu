"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, MicOff, Volume2, VolumeX, Settings, Play, RotateCcw } from "lucide-react"
import { voiceService, type VoiceSettings } from "@/lib/voice-service"
import { i18n } from "@/lib/i18n"

interface VoiceAssistantProps {
  onVoiceInput?: (text: string) => void
  className?: string
}

export function VoiceAssistant({ onVoiceInput, className }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [settings, setSettings] = useState<VoiceSettings>(voiceService.getSettings())
  const [showSettings, setShowSettings] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [transcript, setTranscript] = useState("")

  useEffect(() => {
    setIsSupported(voiceService.isSupported())

    // Update language when i18n language changes
    const unsubscribe = i18n.subscribe((lang) => {
      const languageCode = voiceService.getLanguageCode(lang)
      voiceService.updateSettings({ language: languageCode })
      setSettings(voiceService.getSettings())
    })

    return unsubscribe
  }, [])

  const startListening = async () => {
    if (!isSupported) return

    try {
      setIsListening(true)
      const result = await voiceService.startListening()
      setTranscript(result)

      if (onVoiceInput) {
        onVoiceInput(result)
      }
    } catch (error) {
      console.error("Voice recognition error:", error)
    } finally {
      setIsListening(false)
    }
  }

  const stopListening = () => {
    voiceService.stopListening()
    setIsListening(false)
  }

  const toggleSpeaking = async () => {
    if (isSpeaking) {
      voiceService.stopSpeaking()
      setIsSpeaking(false)
    } else {
      setIsSpeaking(true)
      try {
        await voiceService.readPageContent()
      } catch (error) {
        console.error("Speech error:", error)
      } finally {
        setIsSpeaking(false)
      }
    }
  }

  const updateSetting = (key: keyof VoiceSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    voiceService.updateSettings(newSettings)
  }

  const testVoice = async () => {
    const testText = i18n.t("welcome") + " " + i18n.t("voiceNarration")
    await voiceService.speak(testText)
  }

  if (!isSupported) {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">Voice features are not supported in this browser</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {/* Voice Input Button */}
        <Button
          variant={isListening ? "default" : "outline"}
          size="icon"
          onClick={isListening ? stopListening : startListening}
          disabled={!settings.enabled}
          className={isListening ? "animate-pulse" : ""}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>

        {/* Voice Output Button */}
        <Button
          variant={isSpeaking ? "default" : "outline"}
          size="icon"
          onClick={toggleSpeaking}
          disabled={!settings.enabled}
        >
          {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>

        {/* Settings Button */}
        <Button variant="outline" size="icon" onClick={() => setShowSettings(!showSettings)}>
          <Settings className="h-4 w-4" />
        </Button>

        {/* Status Badge */}
        {isListening && (
          <Badge variant="secondary" className="animate-pulse">
            Listening...
          </Badge>
        )}
        {isSpeaking && <Badge variant="secondary">Speaking...</Badge>}
      </div>

      {/* Transcript Display */}
      {transcript && (
        <div className="mt-2 p-2 bg-muted rounded text-sm">
          <strong>Heard:</strong> {transcript}
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Voice Settings</CardTitle>
            <CardDescription>Configure voice input and output preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Enable/Disable */}
            <div className="flex items-center justify-between">
              <Label htmlFor="voice-enabled">Enable Voice Features</Label>
              <Switch
                id="voice-enabled"
                checked={settings.enabled}
                onCheckedChange={(checked) => updateSetting("enabled", checked)}
              />
            </div>

            {/* Speech Rate */}
            <div className="space-y-2">
              <Label>Speech Rate: {settings.rate.toFixed(1)}x</Label>
              <Slider
                value={[settings.rate]}
                onValueChange={([value]) => updateSetting("rate", value)}
                min={0.5}
                max={2}
                step={0.1}
                disabled={!settings.enabled}
              />
            </div>

            {/* Speech Pitch */}
            <div className="space-y-2">
              <Label>Speech Pitch: {settings.pitch.toFixed(1)}</Label>
              <Slider
                value={[settings.pitch]}
                onValueChange={([value]) => updateSetting("pitch", value)}
                min={0.5}
                max={2}
                step={0.1}
                disabled={!settings.enabled}
              />
            </div>

            {/* Volume */}
            <div className="space-y-2">
              <Label>Volume: {Math.round(settings.volume * 100)}%</Label>
              <Slider
                value={[settings.volume]}
                onValueChange={([value]) => updateSetting("volume", value)}
                min={0}
                max={1}
                step={0.1}
                disabled={!settings.enabled}
              />
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label>Voice Language</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => updateSetting("language", value)}
                disabled={!settings.enabled}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="hi-IN">Hindi (India)</SelectItem>
                  <SelectItem value="bn-IN">Bengali (India)</SelectItem>
                  <SelectItem value="te-IN">Telugu (India)</SelectItem>
                  <SelectItem value="kn-IN">Kannada (India)</SelectItem>
                  <SelectItem value="ml-IN">Malayalam (India)</SelectItem>
                  <SelectItem value="ta-IN">Tamil (India)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* ...removed Test Voice and Reset buttons... */}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
