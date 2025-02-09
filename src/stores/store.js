import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const userSession = ref(null)
  const notes = ref(null)

  /**
   * Permite gestionar el inicio de sesión de cada usuario
   */
  function login(user, password, route) {
    if (user && password) {
      userSession.value = user
      route.push("tasks") // Redirección, no confundir con push() de arrays
    }else {
      alert("ERROR: No pueden haber datos vacíos")
    }
  }

  return {userSession, notes, login}
})
