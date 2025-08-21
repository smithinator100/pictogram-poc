// Utility function to get the correct base path for different environments
export function getBasePath(): string {
  // In production on GitHub Pages, use the repository name as base path
  if (typeof window !== 'undefined' && window.location.hostname === 'smithinator100.github.io') {
    return '/pictogram-poc'
  }
  // In development or other environments, no base path needed
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
  return createPath(`/api/${endpoint.replace(/^\//, '')}`)
}

// Helper function for static assets
export function createAssetPath(assetPath: string): string {
  return createPath(assetPath)
}
