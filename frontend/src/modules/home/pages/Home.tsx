import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, Target, Brain, Rocket } from "lucide-react"

export default function Home() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-400" />,
      title: "AI-Powered Analysis",
      description:
        "Our neural networks deeply analyze your resume against job requirements.",
    },
    {
      icon: <Target className="h-8 w-8 text-indigo-400" />,
      title: "Precision Matching",
      description: "Get accurate compatibility scores with detailed insights.",
    },
    {
      icon: <Zap className="h-8 w-8 text-indigo-400" />,
      title: "Instant Feedback",
      description: "Receive actionable suggestions in seconds, not days.",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-6 bg-indigo-700/10 text-indigo-300 border border-indigo-400/30 hover:bg-indigo-600/20 backdrop-blur-sm">
            <Zap className="h-4 w-4 mr-2" />
            Powered by GPT-4 Technology
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
              Job Search
            </span>
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Our AI analyzes your resume against job descriptions and gives you
            personalized recommendations to stand out from hundreds of
            applicants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-pink-300 hover:from-indigo-600 hover:to-pink-400 text-white font-semibold shadow-md"
              >
                Start Free Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-pink-300 hover:from-indigo-600 hover:to-pink-400 text-white font-semibold shadow-md"
              >
                Existing User? Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-semibold text-white mb-4">
              Why MatchWiseAI Stands Out
            </h3>
            <p className="text-lg text-white/80">
              Cutting-edge technology that gives you the competitive edge.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:shadow-xl hover:shadow-indigo-500/20"
              >
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-full flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/70 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-500/20 to-pink-500/20 p-10 rounded-3xl border border-white/10 shadow-lg">
            <blockquote className="text-xl italic text-white/90 mb-4">
              "MatchWiseAI helped me tailor my resume perfectly. I got 3x more
              interviews and landed my dream job at Google!"
            </blockquote>
            <div className="text-indigo-300 font-medium">
              — Sarah K., Frontend Developer
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-md border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center mb-4">
            <Rocket className="h-6 w-6 text-indigo-400 mr-2" />
            <span className="text-xl font-semibold text-white">
              MatchWiseAI
            </span>
          </div>
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} MatchWiseAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
