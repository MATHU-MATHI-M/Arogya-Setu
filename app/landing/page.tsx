"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Stethoscope,
  Brain,
  Globe,
  Shield,
  Users,
  Activity,
  ArrowRight,
  Star,
  Heart,
  Zap,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description:
        "Advanced GenAI technology assists healthcare workers with accurate medical diagnosis and treatment recommendations.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "Available in 7+ Indian languages including Hindi, Bengali, Telugu, Tamil, Kannada, Malayalam, and English.",
    },
    {
      icon: Shield,
      title: "Offline Capability",
      description: "Works seamlessly without internet connectivity, ensuring healthcare delivery in remote areas.",
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records system with history tracking and follow-up management.",
    },
    {
      icon: Activity,
      title: "Real-time Analytics",
      description: "Monitor healthcare center performance with detailed analytics and reporting tools.",
    },
    {
      icon: Stethoscope,
      title: "Clinical Decision Support",
      description: "Evidence-based treatment protocols and drug interaction warnings for safer patient care.",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Primary Health Center, Bihar",
      content:
        "Arogya-Setu has transformed how we deliver healthcare in rural areas. The AI assistance is incredibly accurate.",
      rating: 5,
    },
    {
      name: "Dr. Priya Sharma",
      role: "Community Health Officer, Rajasthan",
      content:
        "The multilingual support helps us communicate better with patients. It's a game-changer for rural healthcare.",
      rating: 5,
    },
    {
      name: "Dr. Arjun Patel",
      role: "Rural Health Clinic, Gujarat",
      content: "Even without internet, we can provide quality healthcare. The offline features are exceptional.",
      rating: 5,
    },
  ]

  const stats = [
    { number: "10,000+", label: "Healthcare Workers" },
    { number: "500+", label: "Health Centers" },
    { number: "1M+", label: "Patients Served" },
    { number: "95%", label: "Accuracy Rate" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-montserrat">Arogya-Setu</h1>
                <p className="text-xs text-muted-foreground">Health Bridge</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-sm hover:text-primary transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-sm hover:text-primary transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-sm hover:text-primary transition-colors">
                Contact
              </a>
              <Button asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4" variant="secondary">
            <Award className="h-3 w-3 mr-1" />
            Trusted by 10,000+ Healthcare Workers
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold font-montserrat mb-6 text-balance">
            AI-Powered Healthcare for
            <span className="text-primary"> Rural India</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-balance">
            Empowering healthcare workers with GenAI technology to deliver accurate diagnosis and quality care in remote
            areas, even without internet connectivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/login">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">Comprehensive Healthcare Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to deliver quality healthcare in rural and remote areas
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">Trusted by Healthcare Heroes</h2>
            <p className="text-xl text-muted-foreground">See what healthcare workers are saying about Arogya-Setu</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-card">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed">"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">Ready to Transform Rural Healthcare?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of healthcare workers already using Arogya-Setu to deliver better patient care.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <Link href="/login">
              Get Started Today
              <Zap className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Stethoscope className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-montserrat">Arogya-Setu</h3>
                  <p className="text-sm text-muted-foreground">Health Bridge</p>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Empowering rural healthcare with AI technology. Bridging the gap between advanced medical knowledge and
                remote healthcare delivery.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>support@arogya-setu.gov.in</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Ministry of Health, New Delhi, India</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Arogya-Setu. A Government of India Initiative. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
