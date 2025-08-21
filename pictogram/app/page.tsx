"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Image } from "lucide-react"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"
import { loadPictogramAnimation, lottieProps, type LottieAnimationData } from "@/lib/lottie-config"

interface Pictogram {
  name: string
  filename: string
}

export default function HomePage() {
  const [pictogramAnimation, setPictogramAnimation] = useState<LottieAnimationData | null>(null)
  const [availablePictograms, setAvailablePictograms] = useState<Pictogram[]>([])
  const [selectedPictogram, setSelectedPictogram] = useState('')
  const [isLoadingPictograms, setIsLoadingPictograms] = useState(true)

  // Fetch available pictograms from API
  useEffect(() => {
    async function fetchPictograms() {
      try {
        const response = await fetch('/api/pictograms')
        if (!response.ok) throw new Error('Failed to fetch pictograms')
        
        const pictograms: Pictogram[] = await response.json()
        setAvailablePictograms(pictograms)
        
        // Set default selection to pictogram-placeholder.svg if available, otherwise first pictogram
        if (pictograms.length > 0 && !selectedPictogram) {
          const defaultPictogram = pictograms.find(p => p.filename === 'pictogram-placeholder.svg')
          setSelectedPictogram(defaultPictogram ? defaultPictogram.filename : pictograms[0].filename)
        }
      } catch (error) {
        console.error('Error fetching pictograms:', error)
      } finally {
        setIsLoadingPictograms(false)
      }
    }

    fetchPictograms()
  }, [selectedPictogram])

  // Load animation when pictogram selection changes
  useEffect(() => {
    if (!selectedPictogram) return

    loadPictogramAnimation(selectedPictogram)
      .then(setPictogramAnimation)
      .catch(error => {
        console.error('Failed to load pictogram animation:', error)
      })
  }, [selectedPictogram])

  const handlePictogramSelect = (filename: string) => {
    setSelectedPictogram(filename)
  }
  return (
    <SidebarProvider 
      defaultOpen={true}
      style={{
        "--sidebar-width": "28rem", // Increased from default 20rem to 24rem (384px)
      } as React.CSSProperties}
    >
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-4 h-full">
            <Settings className="h-6 w-6 -ml-1 shrink-0" />
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <Label className="text-sm font-medium">Pictogram</Label>
              </div>
              {isLoadingPictograms ? (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">Loading pictograms...</p>
                </div>
              ) : availablePictograms.length > 0 ? (
                <Select value={selectedPictogram} onValueChange={handlePictogramSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a pictogram" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePictograms.map((pictogram) => (
                      <SelectItem key={pictogram.filename} value={pictogram.filename}>
                        <div className="flex items-center gap-3">
                          <img
                            src={`/images/${pictogram.filename}`}
                            alt={pictogram.name}
                            className="w-5 h-5 object-contain"
                          />
                          <span>{pictogram.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">No pictograms found</p>
                </div>
              )}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <h1 className="text-lg font-semibold">Pictogram</h1>
        </header>
        
        <main className="flex flex-1 flex-col items-center justify-center p-6">
          <Card className="w-full max-w-lg">
            <CardContent className="p-6">
              {pictogramAnimation ? (
                <Lottie 
                  animationData={pictogramAnimation}
                  {...lottieProps}
                />
              ) : (
                <div className="flex items-center justify-center h-64">
                  <p className="text-muted-foreground">Loading animation...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
