'use client'

import { FURNITURE_CATALOG } from '@/features/furniture/data/catalog'
import { useFurnitureStore } from '@/store/furnitureStore'
import { useUIStore } from '@/store/uiStore'
import { FurnitureCard } from './FurnitureCard'

export function CatalogPanel() {
  const { activeCatalogId, placementMode, startPlacement, cancelPlacement } = useFurnitureStore()
  const { catalogOpen, toggleCatalog } = useUIStore()

  const handleSelect = (catalogId: string) => {
    if (placementMode === 'placing' && activeCatalogId === catalogId) {
      cancelPlacement()
    } else {
      startPlacement(catalogId)
    }
  }

  return (
    <div>
      <button
        onClick={toggleCatalog}
        className="mx-auto block mb-1 px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-t-lg text-white text-sm hover:bg-white/25 transition-colors"
      >
        {catalogOpen ? '\u25BC 닫기' : '\u25B2 가구 선택'}
      </button>

      {catalogOpen && (
        <div className="bg-black/70 backdrop-blur-md border-t border-white/10 p-3">
          {placementMode === 'placing' && (
            <p className="text-blue-300 text-xs mb-2 text-center">
              바닥을 클릭하여 가구를 배치하세요
            </p>
          )}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {FURNITURE_CATALOG.map((entry) => (
              <FurnitureCard
                key={entry.id}
                entry={entry}
                isActive={activeCatalogId === entry.id}
                onSelect={handleSelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
