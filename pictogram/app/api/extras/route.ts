import { NextResponse } from 'next/server'
import { readdir } from 'fs/promises'
import { join } from 'path'

export const dynamic = 'force-static'

export interface Extra {
  name: string
  filename: string
}

function formatExtraName(filename: string): string {
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
    const imagesDirectory = join(process.cwd(), 'public', 'images')
    const filenames = await readdir(imagesDirectory)
    
    // Filter for image files (svg, png, jpg, jpeg, gif, webp) that start with 'extra'
    const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp']
    const imageFiles = filenames.filter(filename => 
      filename.toLowerCase().startsWith('extra') &&
      imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
    )
    
    const extras: Extra[] = imageFiles.map(filename => ({
      name: formatExtraName(filename),
      filename
    }))
    
    return NextResponse.json(extras)
  } catch (error) {
    console.error('Error reading images directory:', error)
    return NextResponse.json(
      { error: 'Failed to read images directory' },
      { status: 500 }
    )
  }
}
