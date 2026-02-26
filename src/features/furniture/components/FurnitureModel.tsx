'use client'

import { useGLTF } from '@react-three/drei'
import { useMemo, useState, useEffect } from 'react'
import { Mesh, Material } from 'three'
import { getCatalogEntry } from '../data/catalog'

interface FurnitureModelProps {
  readonly path: string
  readonly opacity?: number
  readonly catalogId?: string
}

export function FurnitureModel({ path, opacity, catalogId }: FurnitureModelProps) {
  const [modelExists, setModelExists] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(path, { method: 'HEAD' })
      .then((res) => setModelExists(res.ok))
      .catch(() => setModelExists(false))
  }, [path])

  if (modelExists === null) return null
  if (!modelExists) return <PlaceholderModel catalogId={catalogId} opacity={opacity} />

  return <GLBModel path={path} opacity={opacity} />
}

function GLBModel({ path, opacity }: { path: string; opacity?: number }) {
  const { scene } = useGLTF(path)

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true)
    if (opacity !== undefined && opacity < 1) {
      clone.traverse((child) => {
        if (child instanceof Mesh && child.material) {
          const clonedMat = (child.material as Material).clone() as Material & { transparent: boolean; opacity: number }
          clonedMat.transparent = true
          clonedMat.opacity = opacity
          child.material = clonedMat
        }
      })
    }
    return clone
  }, [scene, opacity])

  return <primitive object={clonedScene} />
}

function PlaceholderModel({ catalogId, opacity }: { catalogId?: string; opacity?: number }) {
  const entry = catalogId ? getCatalogEntry(catalogId) : undefined
  const color = entry?.thumbnailColor ?? '#888888'
  const transparentProps = opacity !== undefined && opacity < 1
    ? { transparent: true, opacity }
    : {}

  const category = entry?.category ?? 'chair'

  switch (category) {
    case 'chair':
      return (
        <group>
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.4, 0.05, 0.4]} />
            <meshStandardMaterial color={color} {...transparentProps} />
          </mesh>
          <mesh position={[0, 0.5, -0.17]}>
            <boxGeometry args={[0.4, 0.5, 0.05]} />
            <meshStandardMaterial color={color} {...transparentProps} />
          </mesh>
          {[[-0.15, 0, -0.15], [0.15, 0, -0.15], [-0.15, 0, 0.15], [0.15, 0, 0.15]].map(([x, _, z], i) => (
            <mesh key={i} position={[x, 0.125, z]}>
              <boxGeometry args={[0.04, 0.25, 0.04]} />
              <meshStandardMaterial color={color} {...transparentProps} />
            </mesh>
          ))}
        </group>
      )

    case 'sofa':
      return (
        <group>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1.2, 0.3, 0.5]} />
            <meshStandardMaterial color={color} {...transparentProps} />
          </mesh>
          <mesh position={[0, 0.5, -0.2]}>
            <boxGeometry args={[1.2, 0.3, 0.1]} />
            <meshStandardMaterial color={color} {...transparentProps} />
          </mesh>
          {[[-0.55, 0.35, 0], [0.55, 0.35, 0]].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.1, 0.3, 0.5]} />
              <meshStandardMaterial color={color} {...transparentProps} />
            </mesh>
          ))}
        </group>
      )

    case 'table':
      return (
        <group>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.0, 0.05, 0.6]} />
            <meshStandardMaterial color={color} {...transparentProps} />
          </mesh>
          {[[-0.4, 0, -0.2], [0.4, 0, -0.2], [-0.4, 0, 0.2], [0.4, 0, 0.2]].map(([x, _, z], i) => (
            <mesh key={i} position={[x, 0.2, z]}>
              <boxGeometry args={[0.05, 0.4, 0.05]} />
              <meshStandardMaterial color={color} {...transparentProps} />
            </mesh>
          ))}
        </group>
      )

    case 'lamp':
      return (
        <group>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
            <meshStandardMaterial color="#333" {...transparentProps} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
            <meshStandardMaterial color="#666" {...transparentProps} />
          </mesh>
          <mesh position={[0, 1.15, 0]}>
            <coneGeometry args={[0.15, 0.2, 16]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} {...transparentProps} />
          </mesh>
        </group>
      )

    case 'shelf':
      return (
        <group>
          {[0, 0.3, 0.6, 0.9].map((y, i) => (
            <mesh key={i} position={[0, y, 0]}>
              <boxGeometry args={[0.6, 0.03, 0.25]} />
              <meshStandardMaterial color={color} {...transparentProps} />
            </mesh>
          ))}
          {[[-0.28, 0.45, 0], [0.28, 0.45, 0]].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.03, 0.9, 0.25]} />
              <meshStandardMaterial color={color} {...transparentProps} />
            </mesh>
          ))}
        </group>
      )

    default:
      return (
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color={color} {...transparentProps} />
        </mesh>
      )
  }
}
