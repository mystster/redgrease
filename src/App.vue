<template>
  <h2>Gantt chart</h2>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <Gantt></Gantt>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Gantt from './components/Gantt.vue'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Gantt
  }
})
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
