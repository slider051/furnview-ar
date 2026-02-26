import dynamic from 'next/dynamic'

const SceneCanvas = dynamic(
  () => import('@/features/scene/components/SceneCanvas').then(mod => ({ default: mod.SceneCanvas })),
  { ssr: false, loading: () => <LoadingScreen /> }
)

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-[#0a0a0a] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">FurnView AR</h1>
        <p className="text-gray-400">3D 씬 로딩 중...</p>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="w-full h-screen">
      <SceneCanvas />
    </main>
  )
}
