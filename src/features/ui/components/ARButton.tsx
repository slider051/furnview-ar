'use client'

import { ARButton as XRARButton } from '@react-three/xr'

export function ARStartButton() {
  return (
    <XRARButton
      sessionInit={{
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay', 'dom-overlay-for-handheld-ar', 'local-floor'],
        domOverlay: typeof document !== 'undefined'
          ? { root: document.getElementById('ui-layer') ?? document.body }
          : undefined,
      }}
    >
      {(status: string) => {
        if (status === 'unsupported') return null
        if (status === 'entered') return 'AR 종료'
        return 'AR 시작'
      }}
    </XRARButton>
  )
}
