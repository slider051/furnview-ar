'use client'

import { CatalogEntry } from '@/features/furniture/types/furniture.types'

interface FurnitureCardProps {
  readonly entry: CatalogEntry
  readonly isActive: boolean
  readonly onSelect: (id: string) => void
}

export function FurnitureCard({ entry, isActive, onSelect }: FurnitureCardProps) {
  return (
    <button
      onClick={() => onSelect(entry.id)}
      className={`
        flex flex-col items-center gap-1 p-2 rounded-lg transition-all min-w-[72px]
        ${isActive
          ? 'bg-white/20 ring-2 ring-blue-400'
          : 'bg-white/10 hover:bg-white/15'}
      `}
    >
      <div
        className="w-12 h-12 rounded-md flex items-center justify-center text-white text-xl"
        style={{ backgroundColor: entry.thumbnailColor }}
      >
        {getCategoryIcon(entry.category)}
      </div>
      <span className="text-[10px] text-white/80 text-center leading-tight">
        {entry.nameKo}
      </span>
    </button>
  )
}

function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    chair: '\u{1FA91}',
    sofa: '\u{1F6CB}',
    table: '\u{1F4CB}',
    lamp: '\u{1F4A1}',
    shelf: '\u{1F4DA}',
  }
  return icons[category] ?? '\u{1F4E6}'
}
