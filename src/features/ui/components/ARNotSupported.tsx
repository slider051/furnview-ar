'use client'

import { useState } from 'react'

export function ARNotSupported() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div>
      <div className="flex items-center gap-2 bg-yellow-900/70 backdrop-blur-sm border border-yellow-500/30 rounded-full px-3 py-1.5">
        <p className="text-yellow-200 text-[11px] whitespace-nowrap">
          3D 미리보기 모드 (AR: Android Chrome 필요)
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="text-yellow-300 hover:text-white text-xs font-bold ml-1 shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
