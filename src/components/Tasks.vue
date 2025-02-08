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

        <!-- Close sesion button and user name -->
        <header class="flex items-center justify-between p-2 px-16 text-gray-200">
            <p class="p-2 text-center m-2">~ {{userSession}}</p>
            <RouterLink to="/" class="text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase">Cerrar Sesión</RouterLink>      
        </header>

        <!-- Welcomen Title -->
        <div class="ps-64">
            <h1 class="font-[IBM Plex] italic text-white text-6xl w-[45vw]">REGISTRA TU DÍA Y NO PIERDAS NINGÚN DETALLE.</h1>
        </div>

        <!-- Add Note Button -->
        <div class="flex justify-end my-8 w-[82vw]">
            <RouterLink to="/addtasks" 
                class="flex gap-2 text-white text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase"
                >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve" fill="#ddd" width="12px">
                    <g>
                        <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
                    </g>
                </svg>
                Agregar Nota
            </RouterLink>
        </div>

        <!-- Body: Navegation bar and notes -->
        <section class="flex justify-center gap-6 pb-10">

            <!-- Navigation bar and dates for each note -->
            <div class="flex justify-end w-[20vw] border-e-2 pe-4">

                <!-- Notes of the navegation bar -->
                <div class="flex flex-col gap-4">
                    <a class="flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                        <p class="text-sm text-gray-200">Título de la nota</p>
                        <p class="text-gray-500 text-sm">Febrero, 08</p>
                        <p class="text-gray-500 italic text-sm">2025</p>
                    </a>

                    <a class="flex flex-col items-end cursor-pointer transition duration-300 hover:border hover:border-white border border-gray-600 rounded-md p-2 pe-4">
                        <p class="text-sm cursor-pointer text-gray-200 text-right">Otro título de alguna otra nota</p>
                        <p class="text-gray-500 text-sm">Febrero, 07</p>
                        <p class="text-gray-500 italic text-sm">2025</p>
                    </a>
                    
                    <a class="flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                        <p class="text-sm cursor-pointer text-gray-200">Nota</p>
                        <p class="text-gray-500 text-sm">Enero, 08</p>
                        <p class="text-gray-500 italic text-sm">2025</p>
                    </a>
                </div>
            </div>

            <!-- Notes -->
            <div class="w-[45vw]">

                <!-- First Note -->
                <div class="text-gray-200 p-6 border border-gray-600 rounded-md">

                    <!-- Title and action buttons -->
                    <div class="flex gap-2 justify-between">
                        <h1 class="text-2xl font-semibold mb-6">Título de la nota</h1>

                        <div class="flex gap-2">
                            <a class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15px" height="15px" fill="#ddd">
                                <path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/>
                            </svg>
                            </a>
                            <a class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18px" height="19px" fill="#ddd">
                                    <path d="m15.854,10.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm7.146-6.354c0,.276-.224.5-.5.5h-1.5c0,.015,0,.03-.002.046l-1.37,14.867c-.215,2.33-2.142,4.087-4.481,4.087h-6.272c-2.337,0-4.263-1.754-4.48-4.08l-1.392-14.873c-.001-.016-.002-.031-.002-.047h-1.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h5.028c.25-2.247,2.16-4,4.472-4h2c2.312,0,4.223,1.753,4.472,4h5.028c.276,0,.5.224.5.5Zm-15.464-.5h8.928c-.243-1.694-1.704-3-3.464-3h-2c-1.76,0-3.221,1.306-3.464,3Zm12.462,1H4.002l1.387,14.826c.168,1.81,1.667,3.174,3.484,3.174h6.272c1.82,0,3.318-1.366,3.485-3.179l1.366-14.821Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>

                    <!-- Note body -->
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
