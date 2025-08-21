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
import { Settings } from "lucide-react"
import Lottie from "lottie-react"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [pictogramAnimation, setPictogramAnimation] = useState(null)

  useEffect(() => {
    // Load pictogram-2.json dynamically
    fetch('/lottie/pictogram-2.json')
      .then(response => response.json())
      .then(data => {
        // Update the animation data to use correct image paths
        const updatedAnimation = {
          ...data,
          assets: data.assets?.map((asset: any) => ({
            ...asset,
            u: '/lottie/images/', // Update the path to the images
          })) || []
        }
        setPictogramAnimation(updatedAnimation)
      })
      .catch(error => {
        console.error('Error loading pictogram-2.json:', error)
      })
  }, [])
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar side="left" variant="sidebar" collapsible="offcanvas">
        <SidebarHeader className="h-16 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-4 h-full">
            <Settings className="h-6 w-6 -ml-1 shrink-0" />
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
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
                  loop={true}
                  autoplay={true}
                  style={{ width: '100%', height: 'auto' }}
                  rendererSettings={{
                    preserveAspectRatio: 'xMidYMid slice',
                    imagePreserveAspectRatio: 'xMidYMid slice',
                    progressiveLoad: false,
                    hideOnTransparent: true,
                  }}
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
