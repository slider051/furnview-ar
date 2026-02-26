'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useState } from 'react'
import { XR, useXR } from '@react-three/xr'
import { PreviewScene } from './PreviewScene'
import { ARScene } from './ARScene'
import { CatalogPanel } from '@/features/ui/components/CatalogPanel'
import { ToolBar } from '@/features/ui/components/ToolBar'
import { ARStartButton } from '@/features/ui/components/ARButton'
import { ARNotSupported } from '@/features/ui/components/ARNotSupported'
import { checkARSupport } from '@/lib/xr-helpers'
import { SCENE } from '@/config/constants'

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color="#666" wireframe />
    </mesh>
  )
}

function SceneContent() {
  const { isPresenting } = useXR()

  if (isPresenting) {
    return <ARScene />
  }

  return <PreviewScene />
}

export function SceneCanvas() {
  const [arSupported, setArSupported] = useState<boolean | null>(null)

  useEffect(() => {
    checkARSupport().then(setArSupported)
  }, [])

  return (
    <>
      {/* 레이어 1: 3D Canvas — 전체 화면 */}
      <div
        id="canvas-layer"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      >
        <Canvas
          camera={{
            fov: SCENE.CAMERA_FOV,
            near: SCENE.CAMERA_NEAR,
            far: SCENE.CAMERA_FAR,
            position: SCENE.CAMERA_POSITION as unknown as [number, number, number],
          }}
          dpr={SCENE.DPR as unknown as [number, number]}
          style={{ width: '100%', height: '100%' }}
          className="touch-none"
        >
          <XR referenceSpace="local-floor">
            <Suspense fallback={<LoadingFallback />}>
              <SceneContent />
            </Suspense>
          </XR>
        </Canvas>
      </div>

      {/* 레이어 2: UI 오버레이 — Canvas와 완전 분리 */}
      <div
        id="ui-layer"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 10, pointerEvents: 'none' }}
      >
        {/* 타이틀 — 좌상단 */}
        <h1 style={{ position: 'absolute', top: 16, left: 16 }} className="text-white text-lg font-bold drop-shadow-lg">
          FurnView AR
        </h1>

        {/* AR 지원 안내 — 상단 중앙 */}
        {arSupported === false && (
          <div style={{ position: 'absolute', top: 56, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}>
            <ARNotSupported />
          </div>
        )}

        {/* AR 시작 버튼 */}
        {arSupported && (
          <div style={{ position: 'absolute', top: 56, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'auto' }}>
            <ARStartButton />
          </div>
        )}

        {/* 도구 버튼 — 우상단 */}
        <div style={{ position: 'absolute', top: 16, right: 16, pointerEvents: 'auto' }}>
          <ToolBar />
        </div>

        {/* 가구 카탈로그 — 하단 고정 */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, pointerEvents: 'auto' }}>
          <CatalogPanel />
        </div>
      </div>
    </>
  )
}
