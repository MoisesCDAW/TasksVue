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

    <div class="bg-gray-800 min-h-screen">
        <header class="flex items-center justify-between p-2 px-16 text-gray-200">
            <p class="p-2 text-center m-2">~ {{userSession}}</p>
            <RouterLink to="/" class="text-sm p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white">Cerrar Sesión</RouterLink>
        </header>

        <!-- Body: Navegation bar and tasks -->
        <section class="flex justify-center gap-6 pb-10">
            <!-- Navigation bar and dates for each task -->
            <div class="flex justify-end w-[20vw] border-e-2 pe-4">

                <div class="flex flex-col gap-4">

                    <div class="flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                        <a class="text-sm text-gray-200">Título de la tarea</a>
                        <p class="text-gray-500 text-sm">Febrero, 08</p>
                        <p class="text-gray-500 italic text-sm">2025</p>
                    </div>

                    <div class="flex flex-col items-end cursor-pointer transition duration-300 hover:border hover:border-white border border-gray-600 rounded-md p-2 pe-4">
                        <a class="text-sm cursor-pointer text-gray-200 text-right">Otro título de alguna otra tarea</a>
                        <p class="text-gray-500">Febrero, 07</p>
                        <p class="text-gray-500 italic">2025</p>
                    </div>
                    
                    <div class="flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                        <a class="text-sm cursor-pointer text-gray-200">Tarea</a>
                        <p class="text-gray-500">Enero, 08</p>
                        <p class="text-gray-500 italic">2025</p>
                    </div>
                </div>
            </div>

            <!-- Tasks -->
            <div class="w-[50vw]">
                <div class="text-gray-200 p-6 border border-gray-600 rounded-md">
                    <h1 class="text-xl font-semibold mb-4">Título de la tarea</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                        <br><br>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem illum delectus voluptas tenetur 
                        nostrum aspernatur asperiores provident explicabo deleniti atque quisquam 
                        molestiae ducimus, quod distinctio a nesciunt veniam suscipit non.
                    </p>
                </div>
            </div>
        </section>


    <!--
        <div class="flex justify-center text-white">
            <table class="m-2 border-2 border-gray-700">
                <tr>
                    <th class="w-[10%] bg-gray-700 text-white text-center px-6 font-semibold py-2 border">ID</th>
                    <th class="bg-gray-700 text-white text-center px-6 font-semibold border">Título</th>
                    <th class="bg-gray-700 text-white text-center px-6 font-semibold border">Completada</th>
                </tr>

                Por cada registro de la variable del Pinia Store "tasks", se llamará a un componente hijo pasando como props los datos de la tarea
                <template v-if="tasks">
                    <tr v-for="task in tasks.data">
                        <TaskItem :id="task.id" :title="task.title" :completed="task.completed"/>
                    </tr>
                </template>
            </table>
        </div>
    -->
    </div>  
</template>

<style scoped>

</style>
