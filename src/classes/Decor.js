import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three"

class Decor {

    constructor() {
        this.bind()
    }

    init(scene) {
        this.scene = scene
        this.mesh
        this.loader = new GLTFLoader()
        this.texLoader = new THREE.TextureLoader()

        this.loader.load("assets/decor.gltf", (glb) => {
            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    let map = child.material.map
                    child.material = new THREE.MeshBasicMaterial({
                        map: map,
                    })
                }
            })
            this.scene.add(glb.scene)
        })
    }

    update() {
    }

    bind() {
        this.update = this.update.bind(this)
    }

}

const _instance = new Decor(

)

export default _instance