import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Sparkles,
  Code2,
  Palette,
  Zap,
  MessageSquare,
  Plug,
  Users,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react"

const features = [
  {
    icon: Code2,
    title: "AI-Driven Development",
    description: "Convert natural language into production-ready code with advanced AI models",
    href: "/ai-development",
  },
  {
    icon: Palette,
    title: "Visual Editor",
    description: "Figma-inspired drag-and-drop interface with real-time collaboration",
    href: "/visual-editor",
  },
  {
    icon: Zap,
    title: "Intelligent Automation",
    description: "Automate complex workflows and tasks with AI-powered agents",
    href: "/automation",
  },
  {
    icon: MessageSquare,
    title: "Chat Agent",
    description: "Conversational AI for debugging, refinement, and assistance",
    href: "/chat-agent",
  },
  {
    icon: Plug,
    title: "Seamless Integrations",
    description: "Connect with 100+ tools and services for enhanced productivity",
    href: "/integrations",
  },
  {
    icon: Users,
    title: "Real-time Collaboration",
    description: "Work together with your team in real-time with version control",
    href: "/collaboration",
  },
]

const stats = [
  { label: "Projects Created", value: "10,000+", icon: TrendingUp },
  { label: "Active Users", value: "5,000+", icon: Users },
  { label: "Integrations", value: "100+", icon: Plug },
  { label: "Uptime", value: "99.9%", icon: Shield },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    content:
      "Bravo has revolutionized how we build and deploy applications. The AI-driven development saves us weeks of work.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Startup Founder",
    company: "InnovateLab",
    content:
      "As a non-technical founder, Bravo empowers me to create sophisticated apps without writing a single line of code.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Lead Developer",
    company: "DevStudio",
    content:
      "The collaboration features and AI assistance have made our team 3x more productive. Absolutely game-changing.",
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Build. Automate.{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Collaborate.
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Bravo Platform empowers users of all skill levels to rapidly build sophisticated applications and automate
              complex workflows with cutting-edge AI technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything you need to build amazing applications
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From AI-powered code generation to real-time collaboration, Bravo provides all the tools you need in one
              unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by developers and creators worldwide
            </h2>
            <p className="text-xl text-gray-600">See what our users are saying about Bravo Platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to transform your development workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers and creators who are building the future with Bravo Platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Start Building Today
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
