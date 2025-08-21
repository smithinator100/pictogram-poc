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

// Lottie renderer settings
export const lottieRendererSettings = {
  preserveAspectRatio: 'xMidYMid slice',
  imagePreserveAspectRatio: 'xMidYMid slice',
  progressiveLoad: false,
  hideOnTransparent: true,
}

// Lottie component props
export const lottieProps = {
  loop: true,
  autoplay: true,
  style: { width: '100%', height: 'auto' },
  rendererSettings: lottieRendererSettings,
}

// Function to load and transform pictogram animation with dynamic pictogram selection
export async function loadPictogramAnimation(pictogramFilename: string = 'pictogram-shield-green.svg'): Promise<LottieAnimationData> {
  try {
    const response = await fetch('/lottie/pictogram-2.json')
    const data = await response.json()
    
    // Update the animation data to use correct image paths and replace img_3.png with selected SVG
    const updatedAnimation: LottieAnimationData = {
      ...data,
      assets: data.assets?.map((asset: LottieAsset) => {
        if (asset.p === 'img_3.png') {
          return {
            ...asset,
            u: '/images/', // Update path for SVG
            p: pictogramFilename // Replace with selected SVG file
          }
        }
        return {
          ...asset,
          u: '/lottie/images/', // Update the path to the images
        }
      }) || []
    }
    
    return updatedAnimation
  } catch (error) {
    console.error('Error loading pictogram-2.json:', error)
    throw error
  }
}
