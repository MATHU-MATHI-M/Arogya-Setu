"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { i18n } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
    const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Always allow login and navigate to dashboard
    const user = {
      email: formData.email.trim(),
      password: formData.password.trim(),
      name: formData.email.split("@")[0],
    }
    localStorage.setItem("arogya_user", JSON.stringify(user))
    localStorage.setItem("arogya_authenticated", "true")
    router.push("/dashboard")
    setIsLoading(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-current">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" />
                <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold font-montserrat text-primary">Arogya-Setu</h1>
            <p className="text-muted-foreground">Health Bridge Platform</p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-semibold">{i18n.t("welcomeBackTitle")}</CardTitle>
            <CardDescription>{i18n.t("signInAccess")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{i18n.t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={i18n.t("email")}
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{i18n.t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={i18n.t("password")}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    {i18n.t("signingIn")}
                  </div>
                ) : (
                  i18n.t("login")
                )}
              </Button>
            </form>

            <div className="text-center space-y-2">
              <Button variant="link" className="text-sm text-muted-foreground">
           {i18n.t("forgotPassword")}
              </Button>
              <p className="text-sm text-muted-foreground">
                {i18n.t("dontHaveAccount")} {" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  {i18n.t("signup")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Card className="bg-muted/50 border-0">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Secure Healthcare Platform</p>
                <p className="text-xs text-muted-foreground">
                  Your data is protected with enterprise-grade security. This platform complies with healthcare data
                  protection standards.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials removed */}
      </div>
    </div>
  )
}
