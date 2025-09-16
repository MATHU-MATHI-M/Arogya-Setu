"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Bot, User, Mic, Volume2, Minimize2, Maximize2, X } from "lucide-react"
import { geminiAI } from "@/lib/gemini-ai"
import { voiceService } from "@/lib/voice-service"
import { i18n } from "@/lib/i18n"

interface ChatMessage {
  id: string
  type: "user" | "bot"
  message: string
  timestamp: Date
  isVoice?: boolean
}

interface MedicalChatbotProps {
  isMinimized?: boolean
  onToggleMinimize?: () => void
  onClose?: () => void
}

export function MedicalChatbot({ isMinimized = false, onToggleMinimize, onClose }: MedicalChatbotProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      type: "bot",
      message:
        "Hello! I'm your AI medical assistant. I can help answer general health questions, explain medical terms, and provide health information. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async (messageText?: string) => {
    const text = messageText || currentMessage.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: text,
      timestamp: new Date(),
      isVoice: !!messageText, // If messageText is provided, it came from voice
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    try {
      // Create a medical assistant prompt
      const medicalPrompt = `You are a helpful medical AI assistant for healthcare workers in rural areas. 
      Provide accurate, helpful medical information while always emphasizing that this is for educational purposes only and not a substitute for professional medical advice.
      
      User question: ${text}
      
      Please provide a helpful, accurate response that:
      1. Answers the medical question clearly
      2. Uses simple, understandable language
      3. Includes relevant medical context
      4. Always reminds that professional medical consultation is important for serious concerns
      5. Keeps the response concise but informative (under 200 words)`

      const response = await geminiAI.generateResponse(medicalPrompt)

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])

      // If voice is enabled, read the response aloud in the selected language
      if (voiceService.getSettings().enabled) {
        const lang = i18n.getCurrentLanguage()
        await voiceService.speak(response, { language: voiceService.getLanguageCode(lang) })
      }
    } catch (error) {
      console.error("Chatbot error:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        message:
          "I apologize, but I'm having trouble processing your request right now. Please try again or consult with a healthcare professional for medical concerns.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const startVoiceInput = async () => {
    try {
      setIsListening(true)
      const transcript = await voiceService.startListening()
      if (transcript) {
        await sendMessage(transcript)
      }
    } catch (error) {
      console.error("Voice input error:", error)
    } finally {
      setIsListening(false)
    }
  }

  const speakMessage = async (message: string) => {
    const lang = i18n.getCurrentLanguage()
    await voiceService.speak(message, { language: voiceService.getLanguageCode(lang) })
  }

  const quickQuestions = [
    "What are the symptoms of fever?",
    "How to check blood pressure?",
    "What is diabetes?",
    "First aid for cuts and wounds",
    "When to refer to a specialist?",
    "Common medications and dosages",
  ]

  if (isMinimized) {
    return (
      <Card className="fixed bottom-4 right-4 w-80 shadow-lg border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm">Medical Assistant</CardTitle>
                <CardDescription className="text-xs">AI-powered health support</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onToggleMinimize}>
                <Maximize2 className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground">Click to expand and start chatting</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-4 right-4 w-96 h-[600px] shadow-lg border-primary/20 flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-sm">Medical Assistant</CardTitle>
              <CardDescription className="text-xs">AI-powered health support</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onToggleMinimize}>
              <Minimize2 className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto" style={{ maxHeight: 350 }} ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.type === "bot" && (
                  <Avatar className="h-6 w-6 mt-1">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                      <Bot className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p style={{ whiteSpace: 'pre-line' }}>{message.message}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                    {message.type === "bot" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 opacity-70 hover:opacity-100"
                        onClick={() => speakMessage(message.message)}
                      >
                        <Volume2 className="h-2 w-2" />
                      </Button>
                    )}
                  </div>
                  {message.isVoice && (
                    <Badge variant="secondary" className="text-xs mt-1">
                      Voice
                    </Badge>
                  )}
                </div>
                {message.type === "user" && (
                  <Avatar className="h-6 w-6 mt-1">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                      <User className="h-3 w-3" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 justify-start">
                <Avatar className="h-6 w-6 mt-1">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    <Bot className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted text-muted-foreground p-2 rounded-lg">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 bg-current rounded-full animate-bounce" />
                    <div
                      className="w-1 h-1 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="w-1 h-1 bg-current rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
            <div className="grid gap-1">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 justify-start bg-transparent"
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Ask a medical question..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && !isTyping && sendMessage()}
              className="text-sm"
              disabled={isTyping || isListening}
            />
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 bg-transparent"
              onClick={startVoiceInput}
              disabled={isTyping || isListening}
            >
              <Mic className={`h-4 w-4 ${isListening ? "animate-pulse text-red-500" : ""}`} />
            </Button>
            <Button
              size="icon"
              onClick={() => sendMessage()}
              disabled={!currentMessage.trim() || isTyping}
              className="h-9 w-9"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {isListening && <p className="text-xs text-muted-foreground mt-1 animate-pulse">Listening...</p>}
        </div>
      </CardContent>
    </Card>
  )
}
