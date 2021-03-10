import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from "three"

import portalVert from '../shaders/portal.vert'
import portalFrag from '../shaders/portal.frag'


class Portal {

    constructor() {
        this.bind()
    }

    init(scene) {
        this.scene = scene
        this.mesh
        this.loader = new GLTFLoader()
        this.portalShader = new THREE.ShaderMaterial({
            vertexShader: portalVert,
            fragmentShader: portalFrag,
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
                uT: {
                    type: 'f', value: 0,
                }
            }
        })

        this.loader.load("assets/portal.glb", (glb) => {
            console.log(glb)

            glb.scene.traverse(child => {
                if (child instanceof THREE.Mesh) {
                    this.mesh = child
                    this.mesh.material = this.portalShader
                }
            })

            this.mesh.rotateX(Math.PI / 2)
            let s = 3
            this.mesh.scale.set(s, s, s)
            this.scene.add(glb.scene)
        })




    }

    update() {
        this.portalShader.uniforms.uT.value++
    }

    bind() {
        this.update = this.update.bind(this)

    }

}

const _instance = new Portal(

)

export default _instance