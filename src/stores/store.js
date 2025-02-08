import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useStore = defineStore('main', () => {
  const userSession = ref(null)
  const tasks = ref(null)

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


  /**
   * Permite gestionar la cración de nuevas tareas
   */
  function addtask(newTitle, route){
    if (newTitle){
      let id = tasks.value.data[tasks.value.data.length-1].id // Recupera el último ID de la lista de tareas
      tasks.value.data.push({id: id+1, title: newTitle, completed: false})
      route.push("tasks") // Redirección
    }else {
      alert("ERROR: No pueden haber datos vacíos")
    }
  }

  return {userSession, tasks, login, addtask }
})
