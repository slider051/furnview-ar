import { CatalogEntry } from '../types/furniture.types'

export const FURNITURE_CATALOG: readonly CatalogEntry[] = [
  {
    id: 'chair-simple',
    name: 'Simple Chair',
    nameKo: '심플 의자',
    modelPath: '/models/chair-simple.glb',
    thumbnailColor: '#8B6914',
    defaultScale: 1.0,
    category: 'chair',
  },
  {
    id: 'sofa-modern',
    name: 'Modern Sofa',
    nameKo: '모던 소파',
    modelPath: '/models/sofa-modern.glb',
    thumbnailColor: '#4A90D9',
    defaultScale: 1.0,
    category: 'sofa',
  },
  {
    id: 'table-dining',
    name: 'Dining Table',
    nameKo: '다이닝 테이블',
    modelPath: '/models/table-dining.glb',
    thumbnailColor: '#6B4226',
    defaultScale: 1.0,
    category: 'table',
  },
  {
    id: 'lamp-floor',
    name: 'Floor Lamp',
    nameKo: '플로어 램프',
    modelPath: '/models/lamp-floor.glb',
    thumbnailColor: '#FFD700',
    defaultScale: 1.0,
    category: 'lamp',
  },
  {
    id: 'bookshelf-small',
    name: 'Small Bookshelf',
    nameKo: '소형 책장',
    modelPath: '/models/bookshelf-small.glb',
    thumbnailColor: '#8B4513',
    defaultScale: 1.0,
    category: 'shelf',
  },
] as const

export function getCatalogEntry(catalogId: string): CatalogEntry | undefined {
  return FURNITURE_CATALOG.find(entry => entry.id === catalogId)
}
