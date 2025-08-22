import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-static'

export interface LottieAnimation {
  name: string
  filename: string
}

function formatLottieAnimationName(filename: string): string {
  // Remove file extension and convert to human-readable format
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  
  // Convert kebab-case or snake_case to Title Case
  return nameWithoutExt
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export async function GET() {
  try {
    const lottieDirectory = join(process.cwd(), 'public', 'lottie')
    const filenames = await readdir(lottieDirectory)
    
    // Filter for JSON files
    const jsonFiles = filenames.filter(filename => 
      filename.toLowerCase().endsWith('.json')
    )
    
    const lottieAnimations: LottieAnimation[] = jsonFiles.map(filename => ({
      name: formatLottieAnimationName(filename),
      filename
    }))
    
    return NextResponse.json(lottieAnimations)
  } catch (error) {
    console.error('Error reading lottie directory:', error)
    return NextResponse.json(
      { error: 'Failed to read lottie directory' },
      { status: 500 }
    )
  }
}
