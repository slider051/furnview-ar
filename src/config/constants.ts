export const SCENE = {
  CAMERA_FOV: 60,
  CAMERA_NEAR: 0.1,
  CAMERA_FAR: 200,
  CAMERA_POSITION: [4, 3, 4] as const,
  DPR: [1, 1.5] as const,
  GRID_SIZE: 50,
  GRID_DIVISIONS: 50,
  FLOOR_COLOR: '#1a1a2e',
} as const

export const LIGHTING = {
  AMBIENT_INTENSITY: 0.6,
  DIRECTIONAL_INTENSITY: 0.8,
  DIRECTIONAL_POSITION: [5, 8, 5] as const,
} as const

export const FURNITURE = {
  DEFAULT_SCALE: 1.0,
  SCALE_STEP: 0.1,
  SCALE_MIN: 0.3,
  SCALE_MAX: 3.0,
  ROTATION_STEP: Math.PI / 12, // 15 degrees
} as const

export const AR = {
  HIT_TEST_SOURCE: 'viewer' as const,
  GHOST_OPACITY: 0.5,
} as const
