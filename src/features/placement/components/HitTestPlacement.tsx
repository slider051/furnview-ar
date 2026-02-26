'use client'

import { useRef } from 'react'
import { Mesh, Matrix4 } from 'three'
import { useHitTest } from '@react-three/xr'
import { useFurnitureStore } from '@/store/furnitureStore'
import { FurnitureGhost } from '@/features/furniture/components/FurnitureGhost'

export function HitTestPlacement() {
  const meshRef = useRef<Mesh>(null)
  const hitPositionRef = useRef<[number, number, number]>([0, 0, 0])
  const hasHitRef = useRef(false)
  const { placementMode, activeCatalogId, placeItem } = useFurnitureStore()

  useHitTest((hitMatrix: Matrix4) => {
    if (!meshRef.current) return
    hitMatrix.decompose(
      meshRef.current.position,
      meshRef.current.quaternion,
      meshRef.current.scale
    )
    hitPositionRef.current = [
      meshRef.current.position.x,
      meshRef.current.position.y,
      meshRef.current.position.z,
    ]
    hasHitRef.current = true
  })

  const handleTap = () => {
    if (placementMode === 'placing' && activeCatalogId && hasHitRef.current) {
      placeItem(activeCatalogId, hitPositionRef.current)
    }
  }

  if (placementMode !== 'placing' || !activeCatalogId) return null

  return (
    <group>
      <mesh ref={meshRef} onClick={handleTap}>
        <FurnitureGhost catalogId={activeCatalogId} position={[0, 0, 0]} />
      </mesh>
      <mesh onClick={handleTap} visible={false}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  )
}
