export interface CatalogEntry {
  readonly id: string
  readonly name: string
  readonly nameKo: string
  readonly modelPath: string
  readonly thumbnailColor: string
  readonly defaultScale: number
  readonly category: 'chair' | 'sofa' | 'table' | 'lamp' | 'shelf'
}

export interface PlacedItem {
  readonly id: string
  readonly catalogId: string
  readonly position: readonly [number, number, number]
  readonly rotation: number
  readonly scale: number
}

export type PlacementMode = 'idle' | 'placing'
