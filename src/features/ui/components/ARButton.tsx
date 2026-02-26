'use client'

import { ARButton as XRARButton } from '@react-three/xr'

export function ARStartButton() {
  return (
    <XRARButton
      sessionInit={{
        optionalFeatures: ['hit-test', 'dom-overlay', 'dom-overlay-for-handheld-ar'],
        domOverlay: typeof document !== 'undefined' ? { root: document.body } : undefined,
      }}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full shadow-lg transition-colors text-sm"
    />
  )
}
