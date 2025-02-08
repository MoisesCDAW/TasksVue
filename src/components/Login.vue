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
    <div class="w-screen h-screen flex justify-center items-center bg-gray-800 text-white text-sm">
        <div class="flex flex-col w-[25vw] h-[80vh] p-4 gap-5 border border-gray-600 rounded-md">
            <div>
                <h1 class="text-3xl font-[IBM Plex] italic mb-1">Iniciar Sesión</h1>
                <p class="text-gray-500">Ingresa tu nombre y contraseña para ingresar</p>
            </div>

            <div class="w-full flex flex-col gap-4">
                <label class="flex flex-col gap-2">
                    Nombre
                    <input class="bg-gray-800 h-[40px] rounded-md px-4 border border-gray-600 placeholder:text-gray-500" 
                    v-model="name" type="text" placeholder="Ingresa tu nombre de usuario">
                </label>
                <label class="flex flex-col gap-2">
                    Contraseña
                    <input class="bg-gray-800 h-[40px] rounded-md px-4 border border-gray-600 placeholder:text-gray-500" 
                    v-model="password" type="password" placeholder="Ingresa tu contraseña">
                </label>
            </div>

            <div class="w-full flex justify-center">
                <button 
                    @click="login(name, password, route)" 
                    class="w-[100px] flex justify-center gap-2 text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase"
                    >ENVIAR
                </button>
            </div>

            <div>
                <p class="text-gray-500 text-xs text-center">MoisesCAP, 2025</p>
            </div>
        </div>


    </div>
</template>

<style scoped>

</style>
