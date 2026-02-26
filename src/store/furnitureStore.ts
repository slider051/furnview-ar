import { create } from 'zustand'
import { PlacedItem, PlacementMode } from '@/features/furniture/types/furniture.types'
import { FURNITURE } from '@/config/constants'

interface FurnitureState {
  readonly placedItems: readonly PlacedItem[]
  readonly selectedItemId: string | null
  readonly placementMode: PlacementMode
  readonly activeCatalogId: string | null
}

interface FurnitureActions {
  startPlacement: (catalogId: string) => void
  cancelPlacement: () => void
  placeItem: (catalogId: string, position: readonly [number, number, number]) => void
  removeItem: (itemId: string) => void
  selectItem: (itemId: string | null) => void
  updatePosition: (itemId: string, position: readonly [number, number, number]) => void
  updateRotation: (itemId: string, delta: number) => void
  updateScale: (itemId: string, delta: number) => void
  clearAll: () => void
}

const initialState: FurnitureState = {
  placedItems: [],
  selectedItemId: null,
  placementMode: 'idle',
  activeCatalogId: null,
}

export const useFurnitureStore = create<FurnitureState & FurnitureActions>((set) => ({
  ...initialState,

  startPlacement: (catalogId) =>
    set({
      placementMode: 'placing',
      activeCatalogId: catalogId,
      selectedItemId: null,
    }),

  cancelPlacement: () =>
    set({
      placementMode: 'idle',
      activeCatalogId: null,
    }),

  placeItem: (catalogId, position) =>
    set((state) => ({
      placedItems: [
        ...state.placedItems,
        {
          id: `${catalogId}-${Date.now()}`,
          catalogId,
          position,
          rotation: 0,
          scale: FURNITURE.DEFAULT_SCALE,
        },
      ],
      placementMode: 'idle',
      activeCatalogId: null,
    })),

  removeItem: (itemId) =>
    set((state) => ({
      placedItems: state.placedItems.filter((item) => item.id !== itemId),
      selectedItemId: state.selectedItemId === itemId ? null : state.selectedItemId,
    })),

  selectItem: (itemId) =>
    set({ selectedItemId: itemId }),

  updatePosition: (itemId, position) =>
    set((state) => ({
      placedItems: state.placedItems.map((item) =>
        item.id === itemId ? { ...item, position } : item
      ),
    })),

  updateRotation: (itemId, delta) =>
    set((state) => ({
      placedItems: state.placedItems.map((item) =>
        item.id === itemId
          ? { ...item, rotation: item.rotation + delta }
          : item
      ),
    })),

  updateScale: (itemId, delta) =>
    set((state) => ({
      placedItems: state.placedItems.map((item) =>
        item.id === itemId
          ? {
              ...item,
              scale: Math.max(
                FURNITURE.SCALE_MIN,
                Math.min(FURNITURE.SCALE_MAX, item.scale + delta)
              ),
            }
          : item
      ),
    })),

  clearAll: () => set(initialState),
}))
