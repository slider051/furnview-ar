'use client'

import { getCatalogEntry } from '../data/catalog'
import { FurnitureModel } from './FurnitureModel'
import { AR } from '@/config/constants'

interface FurnitureGhostProps {
  readonly catalogId: string
  readonly position: readonly [number, number, number]
}

export function FurnitureGhost({ catalogId, position }: FurnitureGhostProps) {
  const entry = getCatalogEntry(catalogId)
  if (!entry) return null

  return (
    <group position={[position[0], position[1], position[2]]}>
      <FurnitureModel path={entry.modelPath} catalogId={catalogId} opacity={AR.GHOST_OPACITY} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <circleGeometry args={[0.3, 32]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
    </group>
  )
}
