<script setup>
    import { useStore } from '../stores/store'
    import { storeToRefs } from 'pinia' 
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'

    const store = useStore()
    const {userSession} = storeToRefs(store)
    const {tokenSession} = storeToRefs(store)
    const {notes} = storeToRefs(store)
    const fullNoteModal = ref(false)
    const note = ref(null)
    const notesAPI = "https://notesapi.moisescap.com/api/notes"
    let lastNoteID = 0 // To keep track of which was the last marked note card.


    function sortLatest(){
        notes.value.data[0].sort((a, b)=>b.id - a.id)
        
        // document.querySelector("#notes").querySelectorAll("a").forEach((element)=>{
        //     element.classList.add("border-gray-800")
        // })
        document.querySelector(`#note-${lastNoteID}`).classList.remove("border-gray-800")
    }

    function sortOlder(){
        notes.value.data[0].sort((a, b)=>a.id - b.id)

        // document.querySelector("#notes").querySelectorAll("a").forEach((element)=>{
        //     element.classList.add("border-gray-800")
        // })
        document.querySelector(`#note-${lastNoteID}`).classList.remove("border-gray-800")
    }


    /**
     * Permite obtener todas las tareas de la API a través de axios y asigna los datos obtenidos 
     * a la variable reactiva "tasks"
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
     * Formats the creation note date to display in the DD/MM/YYYY HH:MM:SS format.
     * @param date 
     */
    function formatDate(noteDate) {
        return new Date(noteDate).toLocaleString()
    }


    /**
     * Shows the details of the note passed as a parameter.
     * @param noteID
     */
    function printNote(noteID){

        // Allows marking the current note's card and unmarking the previous one.
        document.querySelector(`#note-${noteID}`).classList.toggle("border-gray-800")
        if (lastNoteID!=0) {
            document.querySelector(`#note-${lastNoteID}`).classList.toggle("border-gray-800")
        }
        lastNoteID = noteID

        // Searches for which note should display the detailed view.
        notes.value.data[0].forEach((aux)=>{
            if (aux.id === noteID) {   
                fullNoteModal.value = true
                return note.value = aux
            }
        })
    }


    /**
     * Makes the request to delete a note with the ID passed as a parameter.
     * @param noteID 
     */
    async function deleteNote(noteID) {

        // Unmarks the card of the task that is going to be deleted.
        document.querySelector(`#note-${noteID}`).classList.toggle("border-gray-800");
        lastNoteID = 0

        //Hides the task details view.
        fullNoteModal.value = false
        
        await axios.delete(notesAPI+`/${noteID}`,{
            headers: {
                'Authorization': `Bearer ${tokenSession.value.data.token}`
            }
        })

        getNotes()
    }

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


        <!-- Header Action buttons -->
        <div class="flex justify-center w-screen mt-6">
            
            <div class="w-[60vw] flex justify-between ps-48">
                <div class="flex gap-2 items-center">

                    <!-- Order latest -->
                    <div>
                        <button 
                        @click="sortLatest"
                        class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" style="rotate: 180deg;" fill="#fff"><g id="_01_align_center" data-name="01 align center"><path d="M16.659,17.788,13.026,21.42,13,0,11,0l.026,21.407-3.62-3.62L5.992,19.2l3.919,3.919a3,3,0,0,0,4.243,0L18.073,19.2Z"/></g></svg>
                        </button>
                    </div>

                
                    <!-- Order older -->
                    <div>
                        <button 
                        @click="sortOlder"
                        class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" fill="#fff"><g id="_01_align_center" data-name="01 align center"><path d="M16.659,17.788,13.026,21.42,13,0,11,0l.026,21.407-3.62-3.62L5.992,19.2l3.919,3.919a3,3,0,0,0,4.243,0L18.073,19.2Z"/></g></svg>
                        </button>
                    </div>
                </div>

                <!-- Add Note Button -->
                <div class="flex my-8 gap-4" id="top">
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

                    <!-- Download all button -->
                    <a 
                    class="text-white text-xs uppercase p-2 px-4 cursor-pointer border border-gray-600 rounded-md flex gap-2 items-center justify-center hover:border-white transition duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="16px" height="16px" fill="#fff"><path d="M9.878,18.122a3,3,0,0,0,4.244,0l3.211-3.211A1,1,0,0,0,15.919,13.5l-2.926,2.927L13,1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1l-.009,15.408L8.081,13.5a1,1,0,0,0-1.414,1.415Z"/><path d="M23,16h0a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V17a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v4a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V17A1,1,0,0,0,23,16Z"/></svg>
                        Descargar todo
                    </a>
                </div>
            </div>
        </div>

        <!-- Body: Navegation bar and notes -->
        <section class="flex justify-center gap-6 pb-10">

            <!-- Navigation bar and dates for each note -->
            <div class="flex justify-end w-[20vw] border-e-2 pe-4">

                <!-- Notes of the navegation bar -->
                <div class="flex flex-col gap-4" id="notes">
                    <template v-if="notes"> <!-- if notes is not empty -->
                        <a 
                        href="#top"
                        v-for="note in notes.data[0]"
                        @click="printNote(note.id, this)"
                        :id="`note-${note.id}`"
                        class="min-w-[25vw] flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                            <p class="text-gray-500 text-sm">Nota</p>
                            <p class="text-sm text-gray-200 text-right">{{note.title}}</p>
                            <p class="text-gray-500 text-sm">{{formatDate(note.created_at)}}</p>
                        </a>
                    </template>
                </div>
            </div>

            <!-- Notes -->
            <div class="w-[45vw]">

                <template v-if="fullNoteModal">
                    <!-- First Note -->
                    <div class="text-gray-200 p-6 border border-gray-600 rounded-md">

                        <!-- Title and action buttons -->
                        <div class="flex gap-2 justify-between">
                            <div class="flex flex-col">
                                <span class="text-sm text-gray-500">Haz click sobre el título para volver a la tarjeta de la nota</span>
                                <a :href="`#note-${note.id}`" class="text-2xl font-semibold mb-6">{{note.title}}</a>
                            </div>

                            <div class="flex gap-2">

                                <!-- Download button -->
                                <a 
                                class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="18px" height="18px" fill="#fff"><path d="M9.878,18.122a3,3,0,0,0,4.244,0l3.211-3.211A1,1,0,0,0,15.919,13.5l-2.926,2.927L13,1a1,1,0,0,0-1-1h0a1,1,0,0,0-1,1l-.009,15.408L8.081,13.5a1,1,0,0,0-1.414,1.415Z"/><path d="M23,16h0a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H3a1,1,0,0,1-1-1V17a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v4a3,3,0,0,0,3,3H21a3,3,0,0,0,3-3V17A1,1,0,0,0,23,16Z"/></svg>
                                </a>

                                <!-- Edit button -->
                                <RouterLink :to="`/edittasks/${note.id}`"
                                class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15px" height="15px" fill="#ddd">
                                        <path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/>
                                    </svg>
                                </RouterLink>

                                <!-- Delete button -->
                                <a 
                                @click="deleteNote(note.id)"
                                class="cursor-pointer border border-gray-600 rounded-md w-[36px] h-[36px] flex items-center justify-center hover:border-white transition duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" width="18px" height="19px" fill="#ddd">
                                        <path d="m15.854,10.854l-3.146,3.146,3.146,3.146c.195.195.195.512,0,.707-.098.098-.226.146-.354.146s-.256-.049-.354-.146l-3.146-3.146-3.146,3.146c-.098.098-.226.146-.354.146s-.256-.049-.354-.146c-.195-.195-.195-.512,0-.707l3.146-3.146-3.146-3.146c-.195-.195-.195-.512,0-.707s.512-.195.707,0l3.146,3.146,3.146-3.146c.195-.195.512-.195.707,0s.195.512,0,.707Zm7.146-6.354c0,.276-.224.5-.5.5h-1.5c0,.015,0,.03-.002.046l-1.37,14.867c-.215,2.33-2.142,4.087-4.481,4.087h-6.272c-2.337,0-4.263-1.754-4.48-4.08l-1.392-14.873c-.001-.016-.002-.031-.002-.047h-1.5c-.276,0-.5-.224-.5-.5s.224-.5.5-.5h5.028c.25-2.247,2.16-4,4.472-4h2c2.312,0,4.223,1.753,4.472,4h5.028c.276,0,.5.224.5.5Zm-15.464-.5h8.928c-.243-1.694-1.704-3-3.464-3h-2c-1.76,0-3.221,1.306-3.464,3Zm12.462,1H4.002l1.387,14.826c.168,1.81,1.667,3.174,3.484,3.174h6.272c1.82,0,3.318-1.366,3.485-3.179l1.366-14.821Z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <!-- Note body -->
                        <textarea disabled class="w-full min-h-[100vh] bg-gray-800 scrollbar-hidden">{{note.note}}</textarea>
                    </div>
                </template>
            </div>
        </section>
    </div>  
</template>

<style scoped>

</style>
