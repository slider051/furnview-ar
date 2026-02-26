import { create } from 'zustand'

interface UIState {
  readonly catalogOpen: boolean
  readonly arSupported: boolean | null
  readonly isInAR: boolean
  readonly error: string | null
}

interface UIActions {
  toggleCatalog: () => void
  setCatalogOpen: (open: boolean) => void
  setARSupported: (supported: boolean) => void
  setIsInAR: (inAR: boolean) => void
  setError: (error: string | null) => void
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  catalogOpen: false,
  arSupported: null,
  isInAR: false,
  error: null,

  toggleCatalog: () =>
    set((state) => ({ catalogOpen: !state.catalogOpen })),

  setCatalogOpen: (open) =>
    set({ catalogOpen: open }),

  setARSupported: (supported) =>
    set({ arSupported: supported }),

  setIsInAR: (inAR) =>
    set({ isInAR: inAR }),

  setError: (error) =>
    set({ error }),
}))
