import * as THREE from "three"

class Loader {
    constructor() {
        this.bind()

        this.manager = new THREE.LoadingManager()
        this.manager.onProgress = this.onProgress
        this.manager.onLoad = this.onLoad
        this.manager.onError = (item, error) => {
            console.log(item, error);
        }

        this.progressCB = []
        this.loadCB = []
    }
    addProgressCB(fct) {
        this.progressCB.push(fct)
    }
    addloadCB(fct) {
        this.loadCB.push(fct)
    }

    onProgress(item, loaded, total) {
        this.progress = (loaded / total * 100)
        this.progressCB.forEach(fct => {
            fct(loaded / total * 100)
        });

    }

    onLoad() {
        this.loadCB.forEach(fct => {
            fct()
        });
    }

    bind() {
        this.onProgress = this.onProgress.bind(this)
        this.onLoad = this.onLoad.bind(this)
        this.addProgressCB = this.addProgressCB.bind(this)
        this.addloadCB = this.addloadCB.bind(this)
    }
}

const _instance = new Loader()
export default _instance