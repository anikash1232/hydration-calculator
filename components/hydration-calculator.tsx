"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, MapPin, Activity, User } from "lucide-react"

interface FormData {
  height: string
  weight: string
  activityLevel: string
  location: string
}

interface HydrationResult {
  waterIntake: number
  localTemp: number
  coordinates: { lat: number; lng: number }
}

export function HydrationCalculator() {
  const [formData, setFormData] = useState<FormData>({
    height: "",
    weight: "",
    activityLevel: "",
    location: "",
  })
  const [result, setResult] = useState<HydrationResult | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const calculateHydration = async () => {
    setIsCalculating(true)

    // Simulate API call and calculation
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock geocoding - in production, use a geocoding API
    const mockCoordinates = {
      lat: 35.994 + (Math.random() - 0.5) * 0.1,
      lng: -78.8986 + (Math.random() - 0.5) * 0.1,
    }

    // Mock temperature calculation based on location
    const baseTemp = 28 // Base Durham temperature in Celsius
    const tempDeviation = Math.random() * 3 // 0-3°C deviation
    const localTemp = baseTemp + tempDeviation

    // Calculate base water intake (simplified formula)
    const weightKg = Number.parseFloat(formData.weight) * 0.453592 // Convert lbs to kg
    const heightCm = Number.parseFloat(formData.height) * 2.54 // Convert inches to cm

    // Base water intake: 30-35ml per kg of body weight
    const baseWater = weightKg * 0.033 // 33ml per kg as baseline

    // Activity level multiplier
    const activityMultipliers: Record<string, number> = {
      sedentary: 1.0,
      light: 1.2,
      moderate: 1.4,
      active: 1.6,
      "very-active": 1.8,
    }
    const activityMultiplier = activityMultipliers[formData.activityLevel] || 1.0

    // Temperature adjustment (increase by 5% for every degree above 25°C)
    const tempAdjustment = localTemp > 25 ? 1 + (localTemp - 25) * 0.05 : 1

    // Final calculation
    const totalWater = baseWater * activityMultiplier * tempAdjustment

    setResult({
      waterIntake: Math.round(totalWater * 10) / 10,
      localTemp: Math.round(localTemp * 10) / 10,
      coordinates: mockCoordinates,
    })
    setIsCalculating(false)
  }

  const isFormValid = formData.height && formData.weight && formData.activityLevel && formData.location

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Input Form */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <User className="h-5 w-5 text-primary" />
            Your Information
          </CardTitle>
          <CardDescription>Enter your details to get personalized hydration recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="height" className="text-card-foreground">
              Height (inches)
            </Label>
            <Input
              id="height"
              type="number"
              placeholder="e.g., 68"
              value={formData.height}
              onChange={(e) => handleInputChange("height", e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight" className="text-card-foreground">
              Weight (lbs)
            </Label>
            <Input
              id="weight"
              type="number"
              placeholder="e.g., 150"
              value={formData.weight}
              onChange={(e) => handleInputChange("weight", e.target.value)}
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity" className="text-card-foreground">
              Activity Level
            </Label>
            <Select value={formData.activityLevel} onValueChange={(value) => handleInputChange("activityLevel", value)}>
              <SelectTrigger id="activity" className="bg-background">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (intense daily)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-card-foreground">
              Location in Durham
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                type="text"
                placeholder="e.g., Downtown Durham"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                className="bg-background pl-10"
              />
            </div>
          </div>

          <Button onClick={calculateHydration} disabled={!isFormValid || isCalculating} className="w-full">
            {isCalculating ? (
              <>Calculating...</>
            ) : (
              <>
                <Droplets className="mr-2 h-4 w-4" />
                Calculate Hydration
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Results Display */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Activity className="h-5 w-5 text-accent" />
            Your Recommendation
          </CardTitle>
          <CardDescription>Personalized hydration based on local conditions</CardDescription>
        </CardHeader>
        <CardContent>
          {result ? (
            <div className="space-y-6">
              {/* Main Result */}
              <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center">
                <div className="mb-2 text-sm font-medium text-muted-foreground">Daily Water Intake</div>
                <div className="mb-1 font-sans text-5xl font-bold text-primary">{result.waterIntake}</div>
                <div className="text-lg text-muted-foreground">liters per day</div>
              </div>

              {/* Additional Info */}
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm font-medium text-card-foreground">Local Temperature</span>
                  <span className="font-mono text-sm font-semibold text-accent">{result.localTemp}°C</span>
                </div>
                <div className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                  <span className="text-sm font-medium text-card-foreground">Coordinates</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {result.coordinates.lat.toFixed(4)}, {result.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                <h3 className="mb-2 text-sm font-semibold text-card-foreground">Hydration Tips</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Drink water consistently throughout the day</li>
                  <li>• Increase intake during physical activity</li>
                  <li>• Monitor urine color for hydration status</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
              <div className="mb-4 rounded-full bg-muted/50 p-6">
                <Droplets className="h-12 w-12 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Fill out the form to calculate your personalized hydration needs
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
