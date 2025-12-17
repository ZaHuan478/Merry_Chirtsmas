import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { createParticleSystem } from '../utils/particleSystem'
import { createPhotos } from '../utils/photos'
import { createDecorations } from '../utils/decorations'
import { updateParticleGroup } from '../utils/particleSystem'
import { CONFIG } from '../utils/config'

const useThreeScene = (containerRef) => {
  const [isReady, setIsReady] = useState(false)
  const sceneRef = useRef(null)
  const cameraRef = useRef(null)
  const rendererRef = useRef(null)
  const groupsRef = useRef({ gold: null, red: null, gift: null })
  const photoMeshesRef = useRef([])
  const decorationsRef = useRef({ title: null, star: null, love: null })
  const stateRef = useRef({ current: 'TREE', handX: 0.5, selectedIndex: 0 })
  const animationIdRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000000, 0.002)
    sceneRef.current = scene

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 100
    cameraRef.current = camera

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Create particle systems
    groupsRef.current.gold = createParticleSystem(scene, 'gold', CONFIG.goldCount, 2.0)
    groupsRef.current.red = createParticleSystem(scene, 'red', CONFIG.redCount, 3.5)
    groupsRef.current.gift = createParticleSystem(scene, 'gift', CONFIG.giftCount, 3.0)

    // Create photos and decorations
    photoMeshesRef.current = createPhotos(scene)
    decorationsRef.current = createDecorations(scene)

    console.log('Three.js scene initialized, setting isReady to true')
    setIsReady(true)

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      const time = Date.now() * 0.001
      const speed = 0.08
      const handRotY = (stateRef.current.handX - 0.5) * 4.0

      updateParticleGroup(groupsRef.current.gold, 'gold', stateRef.current.current, speed, handRotY, time)
      updateParticleGroup(groupsRef.current.red, 'red', stateRef.current.current, speed, handRotY, time)
      updateParticleGroup(groupsRef.current.gift, 'gift', stateRef.current.current, speed, handRotY, time)

      // Update scene based on state
      const { title, star, love } = decorationsRef.current

      if (stateRef.current.current === 'TREE') {
        title.visible = true
        star.visible = true
        love.visible = false
        title.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
        star.rotation.z -= 0.02
        star.material.opacity = 0.7 + 0.3 * Math.sin(time * 5)
        photoMeshesRef.current.forEach(m => {
          m.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1)
          m.visible = false
        })

      } else if (stateRef.current.current === 'HEART') {
        title.visible = false
        star.visible = false
        love.visible = true
        photoMeshesRef.current.forEach(m => { m.visible = false })
        const s = 1 + Math.abs(Math.sin(time * 3)) * 0.1
        love.scale.set(s, s, 1)

      } else if (stateRef.current.current === 'EXPLODE') {
        title.visible = false
        star.visible = false
        love.visible = false
        const baseAngle = groupsRef.current.gold.rotation.y
        const angleStep = (Math.PI * 2) / 5
        let bestIdx = 0
        let maxZ = -999

        photoMeshesRef.current.forEach((mesh, i) => {
          mesh.visible = true
          const angle = baseAngle + i * angleStep
          const x = Math.sin(angle) * CONFIG.photoOrbitRadius
          const z = Math.cos(angle) * CONFIG.photoOrbitRadius
          const y = Math.sin(time + i) * 3
          mesh.position.lerp(new THREE.Vector3(x, y, z), 0.1)
          mesh.lookAt(camera.position)
          
          if (z > maxZ) {
            maxZ = z
            bestIdx = i
          }
          
          if (z > 5) {
            const ds = 1.0 + (z / CONFIG.photoOrbitRadius) * 0.8
            mesh.scale.lerp(new THREE.Vector3(ds, ds, ds), 0.1)
          } else {
            mesh.scale.lerp(new THREE.Vector3(0.6, 0.6, 0.6), 0.1)
          }
        })
        stateRef.current.selectedIndex = bestIdx

      } else if (stateRef.current.current === 'PHOTO') {
        love.visible = false
        photoMeshesRef.current.forEach((mesh, i) => {
          if (i === stateRef.current.selectedIndex) {
            mesh.position.lerp(new THREE.Vector3(0, 0, 60), 0.1)
            mesh.scale.lerp(new THREE.Vector3(5, 5, 5), 0.1)
            mesh.lookAt(camera.position)
            mesh.rotation.z = 0
          } else {
            mesh.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1)
          }
        })
      }

      renderer.render(scene, camera)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [containerRef])

  return { state: stateRef, isReady }
}

export default useThreeScene
