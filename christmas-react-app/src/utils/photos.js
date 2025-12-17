import * as THREE from 'three'
import { PHOTO_FILES } from './config'

const loader = new THREE.TextureLoader()
const photoTextures = []
PHOTO_FILES.forEach((file, i) => {
  photoTextures[i] = loader.load(file)
})

export const createPhotos = (scene) => {
  const photoMeshes = []
  const geo = new THREE.PlaneGeometry(8, 8)
  const borderGeo = new THREE.PlaneGeometry(9, 9)
  const borderMat = new THREE.MeshBasicMaterial({ color: 0xFFD700 })

  for (let i = 0; i < 5; i++) {
    const mat = new THREE.MeshBasicMaterial({ 
      map: photoTextures[i], 
      side: THREE.DoubleSide 
    })
    const mesh = new THREE.Mesh(geo, mat)
    const border = new THREE.Mesh(borderGeo, borderMat)
    border.position.z = -0.1
    mesh.add(border)
    mesh.visible = false
    mesh.scale.set(0, 0, 0)
    scene.add(mesh)
    photoMeshes.push(mesh)
  }

  return photoMeshes
}
