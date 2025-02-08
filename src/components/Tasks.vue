<script setup>
    import { useStore } from '../stores/store'
    import { storeToRefs } from 'pinia' 
    import TaskItem from './TaskItem.vue'
    import { RouterLink } from 'vue-router'

    const store = useStore()
    const {userSession} = storeToRefs(store)
    const {tasks} = storeToRefs(store)
</script>

<template>

    <div class="bg-gray-800">
        <div class="flex items-center justify-end">
            <p class="text-white p-2 text-center m-2">Usuario Actual: {{userSession}}</p>
            <!-- <RouterLink to="/addtasks" class="m-2 me-24 bg-yellow-500 text-white p-2 px-4 rounded-md cursor-pointer hover:bg-green-700">Agregar Tarea</RouterLink> -->
        </div>

        <div class="flex justify-center text-white">
            <table class="m-2 border-2 border-gray-700">
                <tr>
                    <th class="w-[10%] bg-gray-700 text-white text-center px-6 font-semibold py-2 border">ID</th>
                    <th class="bg-gray-700 text-white text-center px-6 font-semibold border">Título</th>
                    <th class="bg-gray-700 text-white text-center px-6 font-semibold border">Completada</th>
                </tr>

                <!-- Por cada registro de la variable del Pinia Store "tasks", se llamará a un componente hijo pasando como props los datos de la tarea-->
                <template v-if="tasks">
                    <tr v-for="task in tasks.data">
                        <TaskItem :id="task.id" :title="task.title" :completed="task.completed"/>
                    </tr>
                </template>
            </table>
        </div>
    </div>  
</template>

<style scoped>

</style>
