'use client'

import { useRef, useState, useCallback } from 'react'
import { Group, Matrix4 } from 'three'
import { useHitTest } from '@react-three/xr'
import { useFurnitureStore } from '@/store/furnitureStore'
import { FurnitureGhost } from '@/features/furniture/components/FurnitureGhost'

export function HitTestPlacement() {
  const ghostRef = useRef<Group>(null)
  const hitPositionRef = useRef<[number, number, number]>([0, 0, 0])
  const [hasHit, setHasHit] = useState(false)
  const { placementMode, activeCatalogId, placeItem } = useFurnitureStore()

  useHitTest((hitMatrix: Matrix4) => {
    if (!ghostRef.current) return

    hitMatrix.decompose(
      ghostRef.current.position,
      ghostRef.current.quaternion,
      ghostRef.current.scale
    )
    // scale은 hitMatrix에서 오는 값이 아닌 1로 고정
    ghostRef.current.scale.set(1, 1, 1)

    hitPositionRef.current = [
      ghostRef.current.position.x,
      ghostRef.current.position.y,
      ghostRef.current.position.z,
    ]

    if (!hasHit) setHasHit(true)
  })

  const handleTap = useCallback(() => {
    if (placementMode === 'placing' && activeCatalogId && hasHit) {
      placeItem(activeCatalogId, [...hitPositionRef.current])
    }
  }, [placementMode, activeCatalogId, hasHit, placeItem])

  const isPlacing = placementMode === 'placing' && activeCatalogId

  return (
    <>
      {/* 고스트: hit test 위치를 추적하는 그룹 */}
      {isPlacing && (
        <group ref={ghostRef} visible={hasHit}>
          <FurnitureGhost catalogId={activeCatalogId} position={[0, 0, 0]} />
        </group>
      )}

      {/* 탭 감지용 투명 plane — 항상 존재 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onClick={handleTap}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </>
  )
}
