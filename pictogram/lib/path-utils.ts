// Utility function to get the correct base path for different environments
export function getBasePath(): string {
  // Only apply base path in browser environment on GitHub Pages
  if (typeof window !== 'undefined' && window.location.hostname === 'smithinator100.github.io') {
    return '/pictogram-poc'
  }
  // For all other cases (development, server-side, other hosts), no base path
  return ''
}

// Helper function to create absolute URLs with correct base path
export function createPath(path: string): string {
  const basePath = getBasePath()
  // Ensure path starts with / and remove any double slashes
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${basePath}${normalizedPath}`.replace(/\/+/g, '/')
}

// Helper function for API calls
export function createApiPath(endpoint: string): string {
  const path = createPath(`/api/${endpoint.replace(/^\//, '')}`)
  // Ensure trailing slash for Next.js trailingSlash: true configuration
  return path.endsWith('/') ? path : `${path}/`
}

// Helper function for static assets
export function createAssetPath(assetPath: string): string {
  return createPath(assetPath)
}
