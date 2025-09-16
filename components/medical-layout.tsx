"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Home,
  UserPlus,
  FileText,
  BookOpen,
  BarChart3,
  Settings,
  Menu,
  X,
  Wifi,
  WifiOff,
  User,
  LogOut,
} from "lucide-react"
import { useAuth } from "@/components/auth-guard"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSelector } from "@/components/language-selector"
import { FloatingChatbot } from "@/components/floating-chatbot"

interface MedicalLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

const navigationItems = [
  { id: "home", label: "Home", icon: Home, href: "/" },
  { id: "consultation", label: "New Consultation", icon: UserPlus, href: "/consultation" },
  { id: "records", label: "Patient Records", icon: FileText, href: "/records" },
  { id: "knowledge", label: "Knowledge Base", icon: BookOpen, href: "/knowledge" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics" },
  { id: "settings", label: "Settings", icon: Settings, href: "/settings" },
]

export function MedicalLayout({ children, currentPage = "home" }: MedicalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo and Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                  <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold font-montserrat text-primary">Arogya-Setu</h1>
                <p className="text-xs text-muted-foreground">Health Bridge</p>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Online/Offline Status */}
            <div className="flex items-center gap-2">
              {isOnline ? (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <Wifi className="h-4 w-4" />
                  <span className="hidden sm:inline">Online</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-sm text-orange-600">
                  <WifiOff className="h-4 w-4" />
                  <span className="hidden sm:inline">Offline</span>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSelector />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-muted-foreground">{user?.role}</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-40 w-64 transform bg-sidebar border-r transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
          top-16
        `}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className="justify-start gap-3 h-12 text-left"
                  asChild
                >
                  <a href={item.href}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </a>
                </Button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="container mx-auto p-6">{children}</div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  )
}
