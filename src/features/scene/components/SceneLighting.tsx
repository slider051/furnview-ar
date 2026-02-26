'use client'

import { LIGHTING } from '@/config/constants'

export function SceneLighting() {
  return (
    <>
      <ambientLight intensity={LIGHTING.AMBIENT_INTENSITY} />
      <directionalLight
        position={LIGHTING.DIRECTIONAL_POSITION as unknown as [number, number, number]}
        intensity={LIGHTING.DIRECTIONAL_INTENSITY}
        castShadow={false}
      />
    </>
  )
}
