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
import { Separator } from "@/components/ui/separator"
import { HandMetal } from "lucide-react"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"
import { loadPictogramAnimation, lottieProps, type LottieAnimationData } from "@/lib/lottie-config"

interface Pictogram {
  name: string
  filename: string
}

interface Extra {
  name: string
  filename: string
}

interface ColorOption {
  name: string
  value: string
  hex: string
}

const colorOptions: ColorOption[] = [
  { name: "Alert Yellow", value: "alert-yellow", hex: "#FFD000" },
  { name: "Yellow", value: "yellow", hex: "#FFCC33" },
  { name: "Alert Red", value: "alert-red", hex: "#EE1025" },
  { name: "Alert Green", value: "alert-green", hex: "#21C000" },
  { name: "Blue", value: "blue", hex: "#557FF3" },
  { name: "Red", value: "red", hex: "#DE5833" },
  { name: "Purple", value: "purple", hex: "#876ECB" },
  { name: "Grey", value: "grey", hex: "#999999" },
  { name: "None", value: "none", hex: "transparent" },
]

export default function HomePage() {
  const [pictogramAnimation, setPictogramAnimation] = useState<LottieAnimationData | null>(null)
  const [availablePictograms, setAvailablePictograms] = useState<Pictogram[]>([])
  const [selectedPictogram, setSelectedPictogram] = useState('')
  const [isLoadingPictograms, setIsLoadingPictograms] = useState(true)
  const [availableExtras, setAvailableExtras] = useState<Extra[]>([])
  const [selectedExtra, setSelectedExtra] = useState('')
  const [isLoadingExtras, setIsLoadingExtras] = useState(true)
  const [selectedColor, setSelectedColor] = useState('blue') // Default to blue

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

  // Fetch available extras from API
  useEffect(() => {
    async function fetchExtras() {
      try {
        const response = await fetch('/api/extras')
        if (!response.ok) throw new Error('Failed to fetch extras')
        
        const extras: Extra[] = await response.json()
        setAvailableExtras(extras)
        
        // Set default selection to first extra if available
        if (extras.length > 0 && !selectedExtra) {
          setSelectedExtra(extras[0].filename)
        }
      } catch (error) {
        console.error('Error fetching extras:', error)
      } finally {
        setIsLoadingExtras(false)
      }
    }

    fetchExtras()
  }, [selectedExtra])

  // Load animation when pictogram, extra, or color selection changes
  useEffect(() => {
    if (!selectedPictogram) return

    const selectedColorOption = colorOptions.find(option => option.value === selectedColor)
    const colorHex = selectedColorOption?.hex === 'transparent' ? undefined : selectedColorOption?.hex
    
    // Set extra icon color to dark brown when yellow or alert yellow background is selected
    const extraIconColor = (selectedColor === 'yellow' || selectedColor === 'alert-yellow') ? '#92540C' : undefined

    loadPictogramAnimation(selectedPictogram, selectedExtra || undefined, colorHex, extraIconColor)
      .then(setPictogramAnimation)
      .catch(error => {
        console.error('Failed to load pictogram animation:', error)
      })
  }, [selectedPictogram, selectedExtra, selectedColor])

  const handlePictogramSelect = (filename: string) => {
    setSelectedPictogram(filename)
  }

  const handleExtraSelect = (filename: string) => {
    setSelectedExtra(filename)
  }

  const handleColorSelect = (value: string) => {
    setSelectedColor(value)
  }
  return (
    <SidebarProvider 
      defaultOpen={true}
      style={{
        "--sidebar-width": "28rem", // Increased from default 20rem to 24rem (384px)
      } as React.CSSProperties}
    >
      <Sidebar 
        side="left" 
        variant="sidebar" 
        collapsible="offcanvas" 
        style={{ "--sidebar": "white" } as React.CSSProperties}
      >
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-4 h-full">
            <HandMetal className="h-6 w-6 -ml-1 shrink-0" />
            <h1 className="text-lg font-semibold">Pictogram</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-4">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
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
                            alt={pictogram.name.replace(/pictogram[-\s]*/gi, '').trim()}
                            className="w-5 h-5 object-contain"
                          />
                          <span>{pictogram.name.replace(/pictogram[-\s]*/gi, '').trim()}</span>
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

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Extra</Label>
              </div>
              {isLoadingExtras ? (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">Loading extras...</p>
                </div>
              ) : availableExtras.length > 0 ? (
                <Select value={selectedExtra} onValueChange={handleExtraSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an extra" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableExtras.map((extra) => (
                      <SelectItem key={extra.filename} value={extra.filename}>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 bg-black rounded flex items-center justify-center">
                            <img
                              src={`/images/${extra.filename}`}
                              alt={extra.name.replace(/extra[-\s]*/gi, '').trim()}
                              className="w-4 h-4 object-contain"
                            />
                          </div>
                          <span>{extra.name.replace(/extra[-\s]*/gi, '').trim()}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">No extras found</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Select value={selectedColor} onValueChange={handleColorSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {colorOptions.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-5 h-5 rounded border border-gray-300"
                          style={{ 
                            backgroundColor: color.hex === 'transparent' ? 'white' : color.hex,
                            backgroundImage: color.hex === 'transparent' 
                              ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                              : undefined,
                            backgroundSize: color.hex === 'transparent' ? '8px 8px' : undefined,
                            backgroundPosition: color.hex === 'transparent' ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined
                          }}
                        />
                        <span>{color.name}</span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {color.hex === 'transparent' ? '0% opacity' : color.hex}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="bg-gray-50">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        
        <main className="flex flex-1 flex-col items-center justify-center px-6 pt-6 pb-32">
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
