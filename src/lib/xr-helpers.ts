export async function checkARSupport(): Promise<boolean> {
  if (typeof navigator === 'undefined') return false
  if (!navigator.xr) return false

  try {
    return await navigator.xr.isSessionSupported('immersive-ar')
  } catch (error) {
    console.error('WebXR AR support check failed:', error)
    return false
  }
}
