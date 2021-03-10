import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import Papers from "./Papers"
import Portal from "./Portal"
import Particles from "./Particles"
import Decor from "./Decor"

import RAF from '../utils/raf'
import config from '../utils/config'
import MyGui from '../utils/MyGui'

class ThreeScene {
    constructor() {
        this.bind()

        this.camera
        this.scene
        this.renderer
        this.controls
    }

    init() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.debug.checkShaderErrors = true
        document.body.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()

        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(34, 14, 41)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enabled = config.controls
        this.controls.maxDistance = 1500
        this.controls.minDistance = 0

        if (config.myGui)
            MyGui.start()

        let light = new THREE.AmbientLight()
        let pointLight = new THREE.PointLight()
        pointLight.position.set(10, 10, 10)
        this.scene.add(light)
        this.scene.add(pointLight)

        const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshNormalMaterial())
        // this.scene.add(cube)

        Papers.init(this.scene, this.camera)
        Portal.init(this.scene)
        Particles.init(this.scene)
        Decor.init(this.scene)

        window.addEventListener("resize", this.resizeCanvas)
        RAF.subscribe('threeSceneUpdate', this.update)
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        Portal.update()
        Papers.update()
        Particles.update()
        // console.log(this.camera.position)
    }


    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }

    bind() {
        this.resizeCanvas = this.resizeCanvas.bind(this)
        this.update = this.update.bind(this)
        this.init = this.init.bind(this)
    }
}

const _instance = new ThreeScene()
export default _instance