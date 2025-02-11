import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const userSession = ref(null)
  const tokenSession = ref(null)
  const notes = ref(null)

  return {userSession, tokenSession, notes}
})
