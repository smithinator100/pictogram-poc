const fs = require('fs/promises')
const path = require('path')

function formatName(filename, prefix) {
  // Remove file extension and convert to human-readable format
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '')
  
  // Convert kebab-case or snake_case to Title Case
  return nameWithoutExt
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

async function generatePictogramsData() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images')
    const filenames = await fs.readdir(imagesDirectory)
    
    // Filter for image files that start with 'pictogram'
    const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp']
    const imageFiles = filenames.filter(filename => 
      filename.toLowerCase().startsWith('pictogram') &&
      imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
    )
    
    const pictograms = imageFiles.map(filename => ({
      name: formatName(filename, 'pictogram'),
      filename
    }))
    
    // Write to public/data/pictograms.json
    const outputPath = path.join(process.cwd(), 'public', 'data', 'pictograms.json')
    await fs.writeFile(outputPath, JSON.stringify(pictograms, null, 2))
    console.log(`Generated pictograms.json with ${pictograms.length} items`)
    
    return pictograms
  } catch (error) {
    console.error('Error generating pictograms data:', error)
    throw error
  }
}

async function generateExtrasData() {
  try {
    const imagesDirectory = path.join(process.cwd(), 'public', 'images')
    const filenames = await fs.readdir(imagesDirectory)
    
    // Filter for image files that start with 'extra'
    const imageExtensions = ['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp']
    const imageFiles = filenames.filter(filename => 
      filename.toLowerCase().startsWith('extra') &&
      imageExtensions.some(ext => filename.toLowerCase().endsWith(ext))
    )
    
    const extras = imageFiles.map(filename => ({
      name: formatName(filename, 'extra'),
      filename
    }))
    
    // Write to public/data/extras.json
    const outputPath = path.join(process.cwd(), 'public', 'data', 'extras.json')
    await fs.writeFile(outputPath, JSON.stringify(extras, null, 2))
    console.log(`Generated extras.json with ${extras.length} items`)
    
    return extras
  } catch (error) {
    console.error('Error generating extras data:', error)
    throw error
  }
}

async function generateLottieAnimationsData() {
  try {
    const lottieDirectory = path.join(process.cwd(), 'public', 'lottie')
    const filenames = await fs.readdir(lottieDirectory)
    
    // Filter for JSON files
    const jsonFiles = filenames.filter(filename => 
      filename.toLowerCase().endsWith('.json')
    )
    
    const lottieAnimations = jsonFiles.map(filename => ({
      name: formatName(filename, 'lottie'),
      filename
    }))
    
    // Write to public/data/lottie-animations.json
    const outputPath = path.join(process.cwd(), 'public', 'data', 'lottie-animations.json')
    await fs.writeFile(outputPath, JSON.stringify(lottieAnimations, null, 2))
    console.log(`Generated lottie-animations.json with ${lottieAnimations.length} items`)
    
    return lottieAnimations
  } catch (error) {
    console.error('Error generating lottie animations data:', error)
    throw error
  }
}

async function generateAllData() {
  try {
    // Ensure data directory exists
    const dataDir = path.join(process.cwd(), 'public', 'data')
    await fs.mkdir(dataDir, { recursive: true })
    
    console.log('Generating static data files...')
    
    await Promise.all([
      generatePictogramsData(),
      generateExtrasData(),
      generateLottieAnimationsData()
    ])
    
    console.log('All data files generated successfully!')
  } catch (error) {
    console.error('Error generating data files:', error)
    process.exit(1)
  }
}

// Run the generation
generateAllData()
