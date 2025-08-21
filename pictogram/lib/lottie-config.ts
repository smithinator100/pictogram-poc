import { createAssetPath } from './path-utils'

export interface LottieAsset {
  id: string;
  w: number;
  h: number;
  u: string;
  p: string;
  e: number;
}

export interface LottieAnimationData {
  assets: LottieAsset[];
  [key: string]: any;
}

// Pictogram image path
export const pictogram = '/images/pictogram-shield-green.svg'

// Extra image path
export const extra = '/lottie/images/img_1.png'

// Extra background color
export const extraBgColor = '#E45656'

// Lottie renderer settings
export const lottieRendererSettings = {
  preserveAspectRatio: 'none',
  imagePreserveAspectRatio: 'xMidYMid slice',
  progressiveLoad: false,
  hideOnTransparent: true,
}

// Lottie component props
export const lottieProps = {
  loop: true,
  autoplay: true,
  style: { width: '100%', height: '100%' },
  rendererSettings: lottieRendererSettings,
}

// Helper function to convert hex color to normalized RGB array
function hexToNormalizedRgb(hex: string): [number, number, number, number] {
  const hexValue = hex.replace('#', '')
  const r = parseInt(hexValue.substr(0, 2), 16) / 255
  const g = parseInt(hexValue.substr(2, 2), 16) / 255
  const b = parseInt(hexValue.substr(4, 2), 16) / 255
  return [r, g, b, 1]
}

// Function to modify SVG fill color
async function modifySvgColor(svgPath: string, newColor: string): Promise<string> {
  try {
    const response = await fetch(svgPath)
    const svgContent = await response.text()
    
    // Replace the fill attribute with the new color
    const modifiedSvg = svgContent.replace(/fill="[^"]*"/g, `fill="${newColor}"`)
    
    // Create a data URL using encodeURIComponent for better compatibility
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(modifiedSvg)}`
    return dataUrl
  } catch (error) {
    console.error('Error modifying SVG color:', error)
    return svgPath // Fallback to original path
  }
}

// Function to load and transform pictogram animation with dynamic pictogram and extra selection
export async function loadPictogramAnimation(
  pictogramFilename: string = 'pictogram-shield-green.svg',
  extraFilename?: string,
  extraBgColorHex?: string,
  extraIconColorHex?: string
): Promise<LottieAnimationData> {
  try {
    const response = await fetch(createAssetPath('/lottie/pictogram-2.json'))
    const data = await response.json()
    
    // Convert hex color to normalized RGB if color is provided
    const normalizedColor = extraBgColorHex ? hexToNormalizedRgb(extraBgColorHex) : null
    
    // Process extra icon color modification if needed
    let processedExtraPath = extraFilename
    let processedExtraU = createAssetPath('/images/')
    
    if (extraFilename && extraIconColorHex) {
      try {
        const modifiedSvgDataUrl = await modifySvgColor(createAssetPath(`/images/${extraFilename}`), extraIconColorHex)
        processedExtraPath = modifiedSvgDataUrl
        processedExtraU = '' // Empty u for data URLs
      } catch (error) {
        console.error('Failed to modify extra icon color:', error)
        // Fallback to original path
      }
    }

    // Update the animation data to use correct image paths and replace specific images
    const updatedAnimation: LottieAnimationData = {
      ...data,
      assets: data.assets?.map((asset: LottieAsset) => {
        if (asset.p === 'img_3.png') {
          return {
            ...asset,
            u: createAssetPath('/images/'), // Update path for SVG
            p: pictogramFilename // Replace with selected pictogram SVG file
          }
        }
        if (asset.p === 'img_1.png' && extraFilename) {
          return {
            ...asset,
            u: processedExtraU, // Use processed path (empty for data URLs)
            p: processedExtraPath || extraFilename // Use modified or original filename
          }
        }
        return {
          ...asset,
          u: createAssetPath('/lottie/images/'), // Update the path to the images
        }
      }) || [],
      layers: data.layers?.map((layer: any) => {
        // Find and update the extra-bg layer
        if (layer.nm === 'extra-bg' && layer.shapes) {
          return {
            ...layer,
            shapes: layer.shapes.map((shape: any) => {
              if (shape.it) {
                return {
                  ...shape,
                  it: shape.it.map((item: any) => {
                    // Find the fill item and update its color or opacity
                    if (item.ty === 'fl' && item.c && item.c.k) {
                      if (normalizedColor) {
                        // Apply the selected color
                        return {
                          ...item,
                          c: {
                            ...item.c,
                            k: normalizedColor
                          },
                          o: {
                            ...item.o,
                            k: 100 // Ensure full opacity when color is applied
                          }
                        }
                      } else {
                        // Make transparent for "None" option
                        return {
                          ...item,
                          o: {
                            ...item.o,
                            k: 0 // Set opacity to 0 for transparent
                          }
                        }
                      }
                    }
                    return item
                  })
                }
              }
              return shape
            })
          }
        }
        return layer
      }) || []
    }
    
    return updatedAnimation
  } catch (error) {
    console.error('Error loading pictogram-2.json:', error)
    throw error
  }
}
