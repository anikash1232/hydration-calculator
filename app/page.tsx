import { HydrationCalculator } from "@/components/hydration-calculator"
import { Droplets } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <div className="rounded-full bg-primary/10 p-3">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
              <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">HydraSense</h1>
            </div>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground leading-relaxed">
              Personalized hydration recommendations based on your body metrics, activity level, and local temperature
              variations in Durham
            </p>
          </div>

          {/* Calculator Component */}
          <HydrationCalculator />

          {/* Info Section */}
          <div className="mt-12 rounded-xl bg-card/50 p-6 backdrop-blur-sm border border-border">
            <h2 className="mb-3 font-sans text-lg font-semibold text-card-foreground">How it works</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              HydraSense analyzes micro-climate heat differences across Durham to provide accurate hydration
              recommendations. By combining localized temperature patterns with your personal health data, we help you
              stay hydrated and reduce heatstroke risk in your specific area.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
