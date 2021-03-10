import * as THREE from "three"

import paperVert from '../shaders/paper.vert'
import paperFrag from '../shaders/paper.frag'

class Papers {
    constructor() {
    }

    init(scene, camera) {
        this.paperConfig = []

        this.scene = scene
        this.group = new THREE.Group()
        this.texLoader = new THREE.TextureLoader()

        this.matcap = this.texLoader.load("assets/matcap.jpg")

        this.paperShader = new THREE.ShaderMaterial({
            vertexShader: paperVert,
            fragmentShader: paperFrag,
            side: THREE.DoubleSide,
            uniforms: {
                uT: {
                    type: "f",
                    value: 0
                },
                uMatCap: {
                    type: "t",
                    value: this.matcap
                },
                uCamVec: {
                    type: "vec3",
                    value: camera.position
                }
            }
        })
        for (let i = 0; i < 500; i++) {

            let config = {
                speed: (Math.random() * 0.5 + 0.501) * 0.01
            }
            this.paperConfig.push(config)

            let holder = new THREE.Group()
            let mesh = new THREE.Mesh(new THREE.PlaneGeometry(Math.random() + 2, 1, 10, 1), this.paperShader)
            let s = (Math.random() * 0.5 + 0.501) * 0.4
            mesh.scale.set(s, s, s)
            mesh.position.set(0, Math.random() + 3, Math.random())
            mesh.rotation.x = -Math.PI / 2
            holder.add(mesh)
            holder.rotateZ(Math.random() * 20)
            this.group.add(holder)
        }

        this.scene.add(this.group)
    }

    update() {
        this.paperShader.uniforms.uT.value++
        this.group.children.forEach((holder, i) => {
            holder.rotateZ(this.paperConfig[i].speed)
        });
    }
}

const _instance = new Papers()
export default _instance