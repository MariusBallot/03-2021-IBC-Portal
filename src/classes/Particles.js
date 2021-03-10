import * as THREE from "three"

class Particles {

    constructor() {
        this.bind()
    }
    init(scene) {
        this.scene = scene

        this.particles = new THREE.Geometry()
        this.directions = []
        this.goals = []
        this.speed = 0.03


        for (let i = 0; i < 200; i++) {

            let x = (Math.random() - 0.5) * 5
            let y = (Math.random() - 0.5) * 5
            let z = Math.random() * 10

            let dir = new THREE.Vector3()
            let point = new THREE.Vector3(x, y, z)
            let goal = new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 0)

            dir.subVectors(goal, point).normalize().multiplyScalar(this.speed)
            this.directions.push(dir)
            this.goals.push(goal)
            this.particles.vertices.push(point)

        }

        this.particleMaterial = new THREE.PointsMaterial(
            {
                color: 0xffffff,
                size: 0.2,
                map: new THREE.TextureLoader().load("assets/particle.png"),
                blending: THREE.AdditiveBlending,
                transparent: true,
            });

        this.particleSystem = new THREE.Points(this.particles, this.particleMaterial);
        this.scene.add(this.particleSystem)

    }
    update() {
        for (let p = 0; p < this.particleSystem.geometry.vertices.length; p++) {
            this.particleSystem.geometry.vertices[p].add(this.directions[p])
            if (this.particleSystem.geometry.vertices[p].z <= 0) {
                let x = (Math.random() - 0.5) * 5
                let y = (Math.random() - 0.5) * 5
                let z = Math.random() * 5 + 5
                this.particleSystem.geometry.vertices[p].set(x, y, z)
                this.directions[p].subVectors(this.goals[p], this.particleSystem.geometry.vertices[p]).normalize().multiplyScalar(this.speed)

            }
        }

        this.particleSystem.geometry.verticesNeedUpdate = true;
    }
    bind() {
        this.update = this.update.bind(this)
    }
}

const _instance = new Particles()
export default _instance