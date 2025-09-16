"use client"

import { useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { MedicalLayout } from "@/components/medical-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Database, Globe, Smartphone, RefreshCw, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function SettingsPage() {
  const [notifications, setNotifications] = useState({
    emergencyAlerts: true,
    systemUpdates: true,
    patientReminders: false,
    dataSync: true,
  })

  const [offlineSettings, setOfflineSettings] = useState({
    autoSync: true,
    syncFrequency: "15min",
    offlineStorage: "2GB",
  })

  const [lastSync, setLastSync] = useState("2 minutes ago")
  const [syncInProgress, setSyncInProgress] = useState(false)

  const handleSync = () => {
    setSyncInProgress(true)
    setTimeout(() => {
      setSyncInProgress(false)
      setLastSync("Just now")
    }, 3000)
  }

  return (
    <MedicalLayout currentPage="settings">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold font-montserrat text-balance">Settings</h1>
          <p className="text-muted-foreground">Manage your account, preferences, and system configuration</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Profile Settings
              </CardTitle>
              <CardDescription>Update your personal information and credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue="Dr. Priya Sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="priya.sharma" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="priya.sharma@healthcenter.gov" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="doctor">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">Doctor</SelectItem>
                    <SelectItem value="nurse">Nurse</SelectItem>
                    <SelectItem value="technician">Medical Technician</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Update Profile</Button>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>Configure your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Emergency Alerts</Label>
                  <p className="text-sm text-muted-foreground">Critical patient alerts and system emergencies</p>
                </div>
                <Switch
                  checked={notifications.emergencyAlerts}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, emergencyAlerts: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>System Updates</Label>
                  <p className="text-sm text-muted-foreground">Knowledge base and protocol updates</p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, systemUpdates: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Patient Reminders</Label>
                  <p className="text-sm text-muted-foreground">Follow-up and appointment reminders</p>
                </div>
                <Switch
                  checked={notifications.patientReminders}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, patientReminders: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sync Notifications</Label>
                  <p className="text-sm text-muted-foreground">Offline sync status updates</p>
                </div>
                <Switch
                  checked={notifications.dataSync}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, dataSync: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language & Localization */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Language & Region
              </CardTitle>
              <CardDescription>Set your preferred language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="hi">🇮🇳 Hindi | हिंदी</SelectItem>
                    <SelectItem value="ta">🇮🇳 Tamil | தமிழ்</SelectItem>
                    <SelectItem value="te">🇮🇳 Telugu | తెలుగు</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Secondary Language</Label>
                <Select defaultValue="hi">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="hi">🇮🇳 Hindi | हिंदी</SelectItem>
                    <SelectItem value="ta">🇮🇳 Tamil | தமிழ்</SelectItem>
                    <SelectItem value="te">🇮🇳 Telugu | తెలుగు</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select defaultValue="ist">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                    <SelectItem value="utc">Coordinated Universal Time (UTC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Offline & Sync Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Offline & Sync
              </CardTitle>
              <CardDescription>Manage offline functionality and data synchronization</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Sync</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync when online</p>
                </div>
                <Switch
                  checked={offlineSettings.autoSync}
                  onCheckedChange={(checked) => setOfflineSettings((prev) => ({ ...prev, autoSync: checked }))}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Sync Frequency</Label>
                <Select
                  value={offlineSettings.syncFrequency}
                  onValueChange={(value) => setOfflineSettings((prev) => ({ ...prev, syncFrequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5min">Every 5 minutes</SelectItem>
                    <SelectItem value="15min">Every 15 minutes</SelectItem>
                    <SelectItem value="30min">Every 30 minutes</SelectItem>
                    <SelectItem value="1hour">Every hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Offline Storage Limit</Label>
                <Select
                  value={offlineSettings.offlineStorage}
                  onValueChange={(value) => setOfflineSettings((prev) => ({ ...prev, offlineStorage: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1GB">1 GB</SelectItem>
                    <SelectItem value="2GB">2 GB</SelectItem>
                    <SelectItem value="5GB">5 GB</SelectItem>
                    <SelectItem value="10GB">10 GB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Last Sync</span>
                  <Badge variant="outline">{lastSync}</Badge>
                </div>
                <Button
                  onClick={handleSync}
                  disabled={syncInProgress}
                  className="w-full bg-transparent"
                  variant="outline"
                >
                  {syncInProgress ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Sync Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security and privacy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Enable Two-Factor Authentication
              </Button>
              <Separator />
              <div className="space-y-2">
                <Label>Session Timeout</Label>
                <Select defaultValue="30min">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes</SelectItem>
                    <SelectItem value="30min">30 minutes</SelectItem>
                    <SelectItem value="1hour">1 hour</SelectItem>
                    <SelectItem value="4hours">4 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Device Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Device Settings
              </CardTitle>
              <CardDescription>Configure device-specific preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Touch Feedback</Label>
                  <p className="text-sm text-muted-foreground">Haptic feedback for touch interactions</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Voice Input</Label>
                  <p className="text-sm text-muted-foreground">Enable voice-to-text for symptom entry</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Screen Brightness</Label>
                <Select defaultValue="auto">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Settings */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Save Changes</h3>
                <p className="text-sm text-muted-foreground">Your settings will be applied immediately</p>
              </div>
              <Button>
                <Check className="h-4 w-4 mr-2" />
                Save All Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MedicalLayout>
  )
}

export default function Settings() {
  return (
    <AuthGuard>
      <SettingsPage />
    </AuthGuard>
  )
}
