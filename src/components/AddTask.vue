<script setup>
    import { storeToRefs } from 'pinia' 
    import { useStore } from '../stores/store'
    import { RouterLink } from 'vue-router'
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'

    const title = ref(null)
    const note = ref(null)
    const store = useStore()
    const {userSession} = storeToRefs(store)
    const {tokenSession} = storeToRefs(store)
    const {notes} = storeToRefs(store)
    const route = useRouter() // Objecto que permite gestionar redirecciones
    const notesAPI = "https://notesapi.moisescap.com/api/notes"

    /**
     * * Allows fetching all notes from the API via axios and assigns the retrieved data to the reactive variable "notes".
     */
    async function getNotes(){
        try {
            const data = await axios.get(notesAPI, {
                headers: {
                    'Authorization': `Bearer ${tokenSession.value.data.token}` 
                }
            }) 
            notes.value = data
        }catch(error){
            console.log(`ERROR. No se pudo obtener la información: ${error}`)
        }   
    }


    /**
     * Makes the request to create a note with the data collected from the inputs, 
     * updates the "Notes" store, and redirects to the main section.
     * @param newTitle 
     * @param newNote 
     */
    async function createNote(newTitle, newNote) {
        if (newTitle && newNote){

            await axios.post(notesAPI,                
                {
                    title: newTitle,
                    note: newNote
                },
                {
                    headers: {
                        'Authorization': `Bearer ${tokenSession.value.data.token}`
                    }
                }
            )

            getNotes()
            route.push("tasks") // Redirección
        }else {
            alert("ERROR: No pueden haber datos vacíos")
        }
    }

</script>

<template>
    

    <div class="w-screen h-screen flex flex-col bg-gray-800 text-white text-sm">
        <!-- Close sesion button and user name -->
        <header class="flex items-center justify-between p-2 px-16 text-gray-200">
            <p class="p-2 text-center m-2 text-base">~ {{userSession}}</p>    
            <RouterLink to="/tasks" class="text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase">VOLVER</RouterLink>
        </header>

        <div class="w-screen flex justify-center">
            <div class="flex flex-col w-[60vw] h-[80vh] p-4 gap-5 border border-gray-600 rounded-md">
                <div class="flex flex-col gap-4">
                    <label class="flex flex-col gap-2">
                        Título
                        <input required class="bg-gray-800 h-[40px] w-[55%] rounded-md px-4 border border-gray-600 placeholder:text-gray-500"  v-model="title" type="text" placeholder="Ingresa el título de la nota">
                    </label>

                    <label class="flex flex-col gap-2">
                        Nota
                        <textarea required class="bg-gray-800 h-[45vh] rounded-md p-2 border border-gray-600 placeholder:text-gray-500 scrollbar-minimalista" v-model="note" placeholder="Registra tu día y no pierdas ningún detalle"></textarea>
                    </label>
                </div>
                
                <button @click="createNote(title, note)" class="w-[100px] text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase">AGREGAR</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
