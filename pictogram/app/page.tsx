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
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { HandMetal, Sparkles } from "lucide-react"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"
import { loadPictogramAnimation, lottieProps, type LottieAnimationData } from "@/lib/lottie-config"
import { createApiPath, createAssetPath } from "@/lib/path-utils"

interface Pictogram {
  name: string
  filename: string
}

interface Extra {
  name: string
  filename: string
}

interface LottieAnimation {
  name: string
  filename: string
}

interface ColorOption {
  name: string
  value: string
  hex: string
}

interface BackgroundColorOption {
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

const lightModeOptions: BackgroundColorOption[] = [
  { name: "Primary", value: "primary-light", hex: "#F2F2F2" },
  { name: "Secondary", value: "secondary-light", hex: "#F9F9F9" },
  { name: "Tertiary", value: "tertiary-light", hex: "#FFFFFF" },
  { name: "Canvas", value: "canvas-light", hex: "#FAFAFA" },
]

const darkModeOptions: BackgroundColorOption[] = [
  { name: "Primary", value: "primary-dark", hex: "#282828" },
  { name: "Secondary", value: "secondary-dark", hex: "#373737" },
  { name: "Tertiary", value: "tertiary-dark", hex: "#474747" },
  { name: "Canvas", value: "canvas-dark", hex: "#1C1C1C" },
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
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('tertiary-light') // Default to tertiary light
  const [pictogramSize, setPictogramSize] = useState([640]) // Default to 640px size
  const [showExtra, setShowExtra] = useState(true) // Default to showing extra layers
  const [showFlair, setShowFlair] = useState(true) // Default to showing flair layer
  const [showSparkles, setShowSparkles] = useState(true) // Default to showing sparkles layer
  const [availableLottieAnimations, setAvailableLottieAnimations] = useState<LottieAnimation[]>([])
  const [selectedLottieAnimation, setSelectedLottieAnimation] = useState('')
  const [isLoadingLottieAnimations, setIsLoadingLottieAnimations] = useState(true)

  // Fetch available pictograms from static data
  useEffect(() => {
    async function fetchPictograms() {
      try {
        const dataUrl = createAssetPath('/data/pictograms.json')
        const response = await fetch(dataUrl)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch pictograms: ${response.status}`)
        }
        
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

  // Fetch available extras from static data
  useEffect(() => {
    async function fetchExtras() {
      try {
        const dataUrl = createAssetPath('/data/extras.json')
        const response = await fetch(dataUrl)
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

  // Fetch available lottie animations from static data
  useEffect(() => {
    async function fetchLottieAnimations() {
      try {
        const dataUrl = createAssetPath('/data/lottie-animations.json')
        const response = await fetch(dataUrl)
        if (!response.ok) throw new Error('Failed to fetch lottie animations')
        
        const lottieAnimations: LottieAnimation[] = await response.json()
        setAvailableLottieAnimations(lottieAnimations)
        
        // Set default selection to pictogram-6.json if available, otherwise first animation
        if (lottieAnimations.length > 0 && !selectedLottieAnimation) {
          const defaultAnimation = lottieAnimations.find(anim => anim.filename === 'pictogram-6.json')
          setSelectedLottieAnimation(defaultAnimation ? defaultAnimation.filename : lottieAnimations[0].filename)
        }
      } catch (error) {
        console.error('Error fetching lottie animations:', error)
      } finally {
        setIsLoadingLottieAnimations(false)
      }
    }

    fetchLottieAnimations()
  }, [selectedLottieAnimation])

  // Load animation when pictogram, extra, color, background color, showExtra, showFlair, or showSparkles selection changes
  useEffect(() => {
    if (!selectedPictogram) return

    const selectedColorOption = colorOptions.find(option => option.value === selectedColor)
    const colorHex = selectedColorOption?.hex === 'transparent' ? undefined : selectedColorOption?.hex
    
    // Set extra icon color to dark brown when yellow or alert yellow background is selected
    const extraIconColor = (selectedColor === 'yellow' || selectedColor === 'alert-yellow') ? '#92540C' : undefined

    loadPictogramAnimation(selectedPictogram, selectedExtra || undefined, colorHex, extraIconColor, showExtra, showFlair, showSparkles, selectedLottieAnimation)
      .then(setPictogramAnimation)
      .catch(error => {
        console.error('Failed to load pictogram animation:', error)
      })
  }, [selectedPictogram, selectedExtra, selectedColor, selectedBackgroundColor, showExtra, showFlair, showSparkles, selectedLottieAnimation])

  const handlePictogramSelect = (filename: string) => {
    setSelectedPictogram(filename)
  }

  const handleExtraSelect = (filename: string) => {
    setSelectedExtra(filename)
  }

  const handleColorSelect = (value: string) => {
    setSelectedColor(value)
  }

  const handleBackgroundColorSelect = (value: string) => {
    setSelectedBackgroundColor(value)
  }

  const handleLottieAnimationSelect = (filename: string) => {
    setSelectedLottieAnimation(filename)
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
                            src={createAssetPath(`/images/${pictogram.filename}`)}
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

            <div className="space-y-3">
              <Select value={selectedBackgroundColor} onValueChange={handleBackgroundColorSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select background color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Light mode</SelectLabel>
                    {lightModeOptions.map((bgColor) => (
                      <SelectItem key={bgColor.value} value={bgColor.value}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-5 h-5 rounded border border-gray-300"
                            style={{ backgroundColor: bgColor.hex }}
                            title={bgColor.hex}
                          />
                          <span>{bgColor.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{bgColor.hex}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Dark mode</SelectLabel>
                    {darkModeOptions.map((bgColor) => (
                      <SelectItem key={bgColor.value} value={bgColor.value}>
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-5 h-5 rounded border border-gray-300"
                            style={{ backgroundColor: bgColor.hex }}
                            title={bgColor.hex}
                          />
                          <span>{bgColor.name}</span>
                          <span className="text-xs text-muted-foreground ml-auto">{bgColor.hex}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Pictogram size</Label>
                <span className="text-xs text-muted-foreground">{pictogramSize[0]}px</span>
              </div>
              <Slider
                value={pictogramSize}
                onValueChange={setPictogramSize}
                min={128}
                max={1280}
                step={32}
                className="w-full"
              />
            </div>

            <Card>
              <CardContent className="px-6 py-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-sparkles" className="text-sm font-medium">Show sparkles</Label>
                  <Switch
                    id="show-sparkles"
                    checked={showSparkles}
                    onCheckedChange={setShowSparkles}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="px-6 py-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-extra" className="text-sm font-medium">Show extra</Label>
                  <Switch
                    id="show-extra"
                    checked={showExtra}
                    onCheckedChange={setShowExtra}
                  />
                </div>
              </CardContent>
            </Card>

            <Separator className="my-8" />

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
                              src={createAssetPath(`/images/${extra.filename}`)}
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

            <Card>
              <CardContent className="px-6 py-0">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-flair" className="text-sm font-medium">Flair</Label>
                  <Switch
                    id="show-flair"
                    checked={showFlair}
                    onCheckedChange={setShowFlair}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Animation</Label>
              </div>
              {isLoadingLottieAnimations ? (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">Loading animations...</p>
                </div>
              ) : availableLottieAnimations.length > 0 ? (
                <Select value={selectedLottieAnimation} onValueChange={handleLottieAnimationSelect}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an animation" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableLottieAnimations.map((animation) => (
                      <SelectItem key={animation.filename} value={animation.filename}>
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-gray-600" />
                          </div>
                          <span>{animation.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center justify-center p-4">
                  <p className="text-sm text-muted-foreground">No animations found</p>
                </div>
              )}
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="bg-gray-50">
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        
        <main className="flex flex-1 flex-col items-center justify-center px- pt-6 pb-32">
          <Card 
            className="w-[640px] h-[480px] p-0 overflow-hidden"
            style={{
              transform: `scale(${pictogramSize[0] / 640})`,
              transformOrigin: 'center'
            }}
          >
            <CardContent 
              className="p-0 w-full h-full"
              style={{
                backgroundColor: [...lightModeOptions, ...darkModeOptions].find(bg => bg.value === selectedBackgroundColor)?.hex || '#FFFFFF'
              }}
            >
              {pictogramAnimation ? (
                <div className="w-full h-full">
                  <Lottie 
                    animationData={pictogramAnimation}
                    {...lottieProps}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
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
