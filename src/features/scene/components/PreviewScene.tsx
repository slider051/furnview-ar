'use client'

import { useCallback, useRef } from 'react'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Raycaster, Plane, Vector2, Vector3 } from 'three'
import { SceneLighting } from './SceneLighting'
import { SCENE } from '@/config/constants'
import { PlacedFurniture } from '@/features/furniture/components/PlacedFurniture'
import { FurnitureGhost } from '@/features/furniture/components/FurnitureGhost'
import { useFurnitureStore } from '@/store/furnitureStore'

const floorPlane = new Plane(new Vector3(0, 1, 0), 0)
const intersectionPoint = new Vector3()

function FloorClickHandler() {
  const { camera } = useThree()
  const { placementMode, activeCatalogId, placeItem, selectItem } = useFurnitureStore()
  const pointerDownTime = useRef(0)

  const handlePointerDown = useCallback(() => {
    pointerDownTime.current = Date.now()
  }, [])

  const handleClick = useCallback((e: ThreeEvent<MouseEvent>) => {
    // 300ms 이상 드래그한 경우 클릭으로 취급하지 않음 (카메라 회전과 구분)
    const elapsed = Date.now() - pointerDownTime.current
    if (elapsed > 300) return

    if (placementMode === 'placing' && activeCatalogId) {
      const raycaster = new Raycaster()
      const ndc = new Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      )
      raycaster.setFromCamera(ndc, camera)

      if (raycaster.ray.intersectPlane(floorPlane, intersectionPoint)) {
        placeItem(activeCatalogId, [intersectionPoint.x, 0, intersectionPoint.z])
      }
    } else {
      selectItem(null)
    }
  }, [placementMode, activeCatalogId, camera, placeItem, selectItem])

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.001, 0]}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
    >
      <planeGeometry args={[SCENE.GRID_SIZE, SCENE.GRID_SIZE]} />
      <meshBasicMaterial transparent opacity={0} />
    </mesh>
  )
}

function GhostPreview() {
  const { placementMode, activeCatalogId } = useFurnitureStore()

  if (placementMode !== 'placing' || !activeCatalogId) return null

  return (
    <FurnitureGhost
      catalogId={activeCatalogId}
      position={[0, 0, 0]}
    />
  )
}

export function PreviewScene() {
  const { placedItems } = useFurnitureStore()

  return (
    <>
      <color attach="background" args={['#16213e']} />
      <fog attach="fog" args={['#16213e', 15, 40]} />

      <SceneLighting />
      <Environment preset="apartment" background={false} />

      <OrbitControls
        makeDefault
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={2}
        maxDistance={30}
        target={[0, 0, 0]}
      />

      {/* 바닥 면 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[SCENE.GRID_SIZE, SCENE.GRID_SIZE]} />
        <meshStandardMaterial color="#1e2a4a" roughness={0.8} metalness={0.1} />
      </mesh>

      <gridHelper
        args={[SCENE.GRID_SIZE, SCENE.GRID_DIVISIONS, '#334477', '#283050']}
        position={[0, 0.001, 0]}
      />

      <ContactShadows
        position={[0, 0.005, 0]}
        opacity={0.5}
        scale={20}
        blur={2}
        far={4}
      />

      <FloorClickHandler />
      <GhostPreview />
      {placedItems.map((item) => (
        <PlacedFurniture key={item.id} item={item} />
      ))}
    </>
  )
}
