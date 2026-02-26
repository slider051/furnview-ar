'use client'

import { useFurnitureStore } from '@/store/furnitureStore'
import { FURNITURE } from '@/config/constants'

const ICONS = {
  rotateLeft: '\u21BA',
  rotateRight: '\u21BB',
  trash: '\uD83D\uDDD1',
} as const

export function ToolBar() {
  const { selectedItemId, removeItem, updateRotation, updateScale, clearAll, placedItems } =
    useFurnitureStore()

  const hasSelection = selectedItemId !== null
  const hasItems = placedItems.length > 0

  return (
    <div className="flex flex-col gap-3">
      {hasSelection && (
        <>
          <ToolButton
            icon={ICONS.rotateLeft}
            title="왼쪽 회전"
            onClick={() => updateRotation(selectedItemId, FURNITURE.ROTATION_STEP)}
          />
          <ToolButton
            icon={ICONS.rotateRight}
            title="오른쪽 회전"
            onClick={() => updateRotation(selectedItemId, -FURNITURE.ROTATION_STEP)}
          />
          <ToolButton
            icon="+"
            title="크기 키우기"
            onClick={() => updateScale(selectedItemId, FURNITURE.SCALE_STEP)}
          />
          <ToolButton
            icon="-"
            title="크기 줄이기"
            onClick={() => updateScale(selectedItemId, -FURNITURE.SCALE_STEP)}
          />
          {/* 삭제 버튼 — 간격 벌려서 오조작 방지 */}
          <div className="mt-4">
            <ToolButton
              icon={ICONS.trash}
              title="삭제"
              onClick={() => removeItem(selectedItemId)}
              variant="danger"
            />
          </div>
        </>
      )}
      {hasItems && !hasSelection && (
        <ToolButton
          icon={ICONS.trash}
          title="전체 삭제"
          onClick={clearAll}
          variant="danger"
        />
      )}
    </div>
  )
}

interface ToolButtonProps {
  readonly icon: string
  readonly title: string
  readonly onClick: () => void
  readonly variant?: 'default' | 'danger'
}

function ToolButton({ icon, title, onClick, variant = 'default' }: ToolButtonProps) {
  const bgClass = variant === 'danger'
    ? 'bg-red-500/60 hover:bg-red-500/80'
    : 'bg-white/15 hover:bg-white/25'

  return (
    <button
      onClick={onClick}
      title={title}
      className={`
        w-12 h-12 rounded-xl backdrop-blur-md text-white text-xl
        flex items-center justify-center transition-colors ${bgClass}
      `}
    >
      <span role="img" aria-label={title}>{icon}</span>
    </button>
  )
}
