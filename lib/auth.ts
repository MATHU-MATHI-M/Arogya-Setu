"use client"

export interface User {
  id: string
  name: string
  email: string
  role: string
  healthCenter: string
}

export const authService = {
  // Store user data in localStorage
  setUser: (user: User) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("arogya_user", JSON.stringify(user))
      localStorage.setItem("arogya_authenticated", "true")
    }
  },

  // Get current user
  getUser: (): User | null => {
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem("arogya_user")
      return userData ? JSON.parse(userData) : null
    }
    return null
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("arogya_authenticated") === "true"
    }
    return false
  },

  // Logout user
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("arogya_user")
      localStorage.removeItem("arogya_authenticated")
    }
  },

  // Mock login function
  login: async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data - in real app this would come from backend
    const mockUsers = [
      {
        id: "1",
        email: "doctor@example.com",
        password: "password123",
        name: "Dr. Priya Sharma",
        role: "Primary Care Physician",
        healthCenter: "Rural Health Center, Rajasthan",
      },
      {
        id: "2",
        email: "nurse@example.com",
        password: "password123",
        name: "Nurse Rajesh Kumar",
        role: "Community Health Officer",
        healthCenter: "Primary Health Center, Bihar",
      },
    ]

    const user = mockUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      const { password: _, ...userWithoutPassword } = user
      return { success: true, user: userWithoutPassword }
    }

    return { success: false, error: "Invalid email or password" }
  },

  // Mock signup function
  signup: async (
    name: string,
    email: string,
    password: string,
    role: string,
    healthCenter: string,
  ): Promise<{ success: boolean; error?: string }> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation
    if (email.includes("test@")) {
      return { success: false, error: "Email already exists" }
    }

    // In real app, this would create user in backend
    return { success: true }
  },
}
