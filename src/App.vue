<script setup>
  import { RouterView } from 'vue-router'
  import Tasks from './components/Tasks.vue'

  const tokenSession = localStorage.getItem("tokenSession")
</script>

<template>
  <div v-if="tokenSession">
    <Tasks/>
  </div>
  <div v-else>
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
