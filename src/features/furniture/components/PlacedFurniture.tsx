'use client'

import { useRef, useState, useCallback } from 'react'
import { ThreeEvent, useThree } from '@react-three/fiber'
import { Group, Raycaster, Plane, Vector2, Vector3 } from 'three'
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import { PlacedItem } from '../types/furniture.types'
import { getCatalogEntry } from '../data/catalog'
import { FurnitureModel } from './FurnitureModel'
import { useFurnitureStore } from '@/store/furnitureStore'

interface PlacedFurnitureProps {
  readonly item: PlacedItem
}

const floorPlane = new Plane(new Vector3(0, 1, 0), 0)
const intersectionPoint = new Vector3()

export function PlacedFurniture({ item }: PlacedFurnitureProps) {
  const groupRef = useRef<Group>(null)
  const [isDragging, setIsDragging] = useState(false)
  const { camera, controls } = useThree()
  const { selectedItemId, selectItem, updatePosition } = useFurnitureStore()

  const isSelected = selectedItemId === item.id
  const entry = getCatalogEntry(item.catalogId)

  const handlePointerDown = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    selectItem(item.id)
    setIsDragging(true)

    // OrbitControls 비활성화
    if (controls) {
      (controls as unknown as OrbitControlsImpl).enabled = false
    }
  }, [item.id, selectItem, controls])

  const handlePointerMove = useCallback((e: ThreeEvent<PointerEvent>) => {
    if (!isDragging) return
    e.stopPropagation()

    const raycaster = new Raycaster()
    const ndc = new Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    )
    raycaster.setFromCamera(ndc, camera)

    if (raycaster.ray.intersectPlane(floorPlane, intersectionPoint)) {
      updatePosition(item.id, [intersectionPoint.x, 0, intersectionPoint.z])
    }
  }, [isDragging, camera, item.id, updatePosition])

  const handlePointerUp = useCallback((e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation()
    setIsDragging(false)

    // OrbitControls 재활성화
    if (controls) {
      (controls as unknown as OrbitControlsImpl).enabled = true
    }
  }, [controls])

  if (!entry) return null

  return (
    <group
      ref={groupRef}
      position={[item.position[0], item.position[1], item.position[2]]}
      rotation={[0, item.rotation, 0]}
      scale={item.scale}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <FurnitureModel path={entry.modelPath} catalogId={item.catalogId} />
      {isSelected && <SelectionIndicator />}
    </group>
  )
}

function SelectionIndicator() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <ringGeometry args={[0.4, 0.5, 32]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
    </mesh>
  )
}
