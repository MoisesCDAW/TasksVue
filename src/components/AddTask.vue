<script setup>
    import { storeToRefs } from 'pinia' 
    import { useStore } from '../stores/store'
    import { RouterLink } from 'vue-router'
    import { useRouter } from 'vue-router'

    const title = null
    const store = useStore()
    const {addtask} = store
    const {userSession} = storeToRefs(store)
    const route = useRouter() // Objecto que permite gestionar redirecciones
</script>

<template>
    <p class="border w-[300px] bg-gray-700 text-white p-2 text-center m-2">Usuario Actual: {{userSession}}</p>

    <div class="flex flex-col gap-4 p-2">
        <div class="flex flex-col w-[20%] h-[20vh] bg-gray-700 rounded-lg p-4 gap-5 shadow-lg shadow-gray-600">
            <label class="flex flex-col text-white gap-2">
                Título de la tarea
                <input class="h-[40px] rounded-md px-4 text-black" v-model="title" type="text" placeholder="Ingresa tu nombre de usuario">
            </label>

            <button @click="addtask(title, route)" class="bg-white w-[100px] p-2 rounded-md m-auto hover:bg-gray-300">AGREGAR</button>
        </div>
        
        <RouterLink to="/tasks" class="w-[100px] text-center m-2 me-24 bg-green-500 text-white p-2 px-4 rounded-md cursor-pointer hover:bg-green-700">VOLVER</RouterLink>
    </div>
</template>

<style scoped>

</style>
