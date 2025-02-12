<script setup>
  import { RouterView } from 'vue-router'
  import Login from './components/Login.vue'

  const tokenSession = localStorage.getItem("tokenSession")
</script>

<template>
  <div v-if="tokenSession">
    <RouterView />
  </div>
  <div v-else>
    <Login/>
  </div>
</template>

<style scoped>
</style>
