<script setup>
    import { storeToRefs } from 'pinia' 
    import { useStore } from '../stores/store'
    import { useRouter } from 'vue-router'

    const store = useStore()
    const {login} = store
    const name = null
    const password = null
    const route = useRouter() // Objecto que permite gestionar redirecciones
    const {tasks} = storeToRefs(store)
    const tasksAPI = "https://jsonplaceholder.typicode.com/todos"

    /**
     * Permite obtener todas las tareas de la API a través de axios y asigna los datos obtenidos 
     * a la variable reactiva "tasks"
     */
    async function getTasks(API){
        try {
            const data = await axios.get(API)
            tasks.value = data
        }catch(error){
            console.log(`ERROR. No se pudo obtener la información: ${error}`)
        }   
    }


    // ==== INIT ====
    getTasks(tasksAPI)
</script>

<template>
    <div class="w-screen h-[50vh] flex justify-center items-center">
        <div class="flex flex-col w-[20%] h-[30vh] bg-gray-700 rounded-lg p-4 gap-5 shadow-lg shadow-gray-600">
            <label class="flex flex-col text-white gap-2">
                Nombre
                <input class="h-[40px] rounded-md px-4 text-black" v-model="name" type="text" placeholder="Ingresa tu nombre de usuario">
            </label>
            <label class="flex flex-col text-white gap-2">
                Contraseña
                <input class="h-[40px] rounded-md px-4 text-black" v-model="password" type="password" placeholder="Ingresa tu contraseña">
            </label>

            <button @click="login(name, password, route)" class="bg-white w-[100px] p-2 rounded-md m-auto hover:bg-gray-300">ENVIAR</button>
        </div>
    </div>
</template>

<style scoped>

</style>
