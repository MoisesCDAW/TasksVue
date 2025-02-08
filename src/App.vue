<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { useStore } from './stores/store'
  import { storeToRefs } from 'pinia'
  import Login from './components/Login.vue'

  const store = useStore()
  const {userSession} = storeToRefs(store)
</script>

<template>
  <div v-if="userSession">
    <RouterView />
  </div>
  <div v-else>
    <Login/>
  </div>
</template>

<style scoped>
</style>
