'use client'

import { SceneLighting } from './SceneLighting'
import { HitTestPlacement } from '@/features/placement/components/HitTestPlacement'
import { PlacedFurniture } from '@/features/furniture/components/PlacedFurniture'
import { useFurnitureStore } from '@/store/furnitureStore'

export function ARScene() {
  const { placedItems } = useFurnitureStore()

  return (
    <>
      <SceneLighting />
      <HitTestPlacement />
      {placedItems.map((item) => (
        <PlacedFurniture key={item.id} item={item} />
      ))}
    </>
  )
}
