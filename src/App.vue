<template>
  <div id="app">
    <ThreeScene />
  </div>
</template>

<script>
import ThreeScene from "./components/ThreeScene.vue";

export default {
  name: "App",
  components: {
    ThreeScene,
  },
};
</script>

<style lang="stylus">
@font-face {
  font-family: Butler;
  src: url('Butler-Bold.woff');
}

body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(#5b5b5b, #333333);
  font-family: Butler;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

* {
  margin: 0;
  padding: 0;
}
</style>
