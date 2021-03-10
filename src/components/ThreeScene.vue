<template>
  <div class="threeScene">
    <div
      class="loader"
      ref="loader"
      :class="{ started: started }"
      @click="onClick()"
    >
      <div class="text">
        <h1>IBC n°1</h1>
        <h2>Magic Portal</h2>
      </div>
      <div class="progressBar">
        <div class="fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="start" :class="{ ready: ready }">
        <p>Click anywhere to enter</p>
      </div>
    </div>
    <div class="container" ref="container"></div>
  </div>
</template>

<script>
import ThreeScene from "@/classes/ThreeScene";
import Loader from "../classes/Loader";

export default {
  name: "ThreeScene",
  data() {
    return {
      progress: 0,
      started: false,
      ready: false,
    };
  },
  mounted() {
    ThreeScene.init(this.$refs.container);
    Loader.addProgressCB(this.onProgress);
    Loader.addloadCB(this.onLoad);
  },
  methods: {
    onProgress(value) {
      this.progress = value;
    },
    onLoad() {
      this.ready = true;
    },
    onClick() {
      console.log("hey");
      if (this.ready) {
        this.started = true;
        ThreeScene.start();
        var audio = new Audio("assets/ambianceBGMusic.mp3");
        audio.play();
        audio.loop = true;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.container {
  width: 100vw;
  height: 100vh;
}

.loader {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  transition: all 0.5s;

  &.started {
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
  }

  .text {
    h1 {
      font-size: 4em;
    }
  }

  .progressBar {
    width: 100%;
    height: 200px;

    .fill {
      height: 100%;
      background: black;
      transition: all 0.5s;
    }

    margin-top: 30px;
  }

  .start {
    margin-top: 20px;
    opacity: 0;

    &.ready {
      opacity: 1;
    }

    p {
      animation: blink 0.5s alternate infinite;
    }
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
