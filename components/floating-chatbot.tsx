"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import { MedicalChatbot } from "./medical-chatbot"

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  const toggleChatbot = () => {
    if (isOpen) {
      setIsOpen(false)
      setIsMinimized(false)
    } else {
      setIsOpen(true)
      setIsMinimized(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const closeChatbot = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <Button
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
          onClick={toggleChatbot}
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chatbot */}
      {isOpen && <MedicalChatbot isMinimized={isMinimized} onToggleMinimize={toggleMinimize} onClose={closeChatbot} />}
    </>
  )
}
