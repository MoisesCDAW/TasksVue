<script setup>
    import { useStore } from '../stores/store'
    import { storeToRefs } from 'pinia' 
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'

    const store = useStore()
    const {notes} = storeToRefs(store)
    const fullNoteModal = ref(false)
    const note = ref(null)
    const notesAPI = "https://notesapi.moisescap.com/api/home"
    let lastNoteID = 0 // To keep track of which was the last marked note card.


    /**
     * Sort the notes so that the first one is the most recent.
     */
    function sortLatest(){
        notes.value.data[0].sort((a, b)=>b.id - a.id)
        
        document.querySelector("#notes").querySelectorAll("a").forEach((element)=>{
            element.classList.add("border-gray-800")
        })
        lastNoteID = 0
        fullNoteModal.value = false
    }


    /**
     * Sort the notes so that the first one is the oldest.
     */
    function sortOlder(){
        notes.value.data[0].sort((a, b)=>a.id - b.id)

        document.querySelector("#notes").querySelectorAll("a").forEach((element)=>{
            element.classList.add("border-gray-800")
        })
        lastNoteID = 0
        fullNoteModal.value = false
    }


    /**
     * Permite obtener todas las tareas de la API a través de axios y asigna los datos obtenidos 
     * a la variable reactiva "tasks"
     */
    async function getNotes(){
        try {
            const data = await axios.get(notesAPI) 
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


    // === INIT ===
    getNotes()

</script>

<template>

    <div class="bg-gray-800 min-h-screen">

        <!-- Close sesion button and user name -->
        <header class="flex items-center justify-end p-2 px-16 text-gray-200 pt-6">
            <RouterLink to="/login" class="text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase">Iniciar Sesión</RouterLink>      
        </header>

        <!-- Welcomen Title -->
        <div class="ps-10 sm:ps-24 lg:ps-64">
            <h1 class="font-[IBM Plex] italic text-white text-4xl sm:text-4xl lg:text-6xl w-[80vw] sm:w-[45vw] mt-5 sm:mt-0">DESCUBRE TODO SOBRE LAS PRÁCTICAS ERASMUS EN FRANCIA.</h1>
        </div>


        <!-- Header Action buttons -->
        <div class="flex justify-center w-screen">
            
            <div class="w-[60vw] flex justify-start ps-48">
                <div class="flex gap-2 items-center my-10" id="top">

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
            </div>
        </div>

        <!-- Body: Navegation bar and notes -->
        <section class="flex flex-col sm:flex-row justify-center gap-6 pb-10">

            <span class="block sm:hidden text-sm text-gray-500 ms-10">Desliza para ver las demás notas</span>

            <!-- Navigation bar and dates for each note -->
            <div class="flex justify-end w-[90vw] sm:w-[20vw] border-b-2 sm:border-e-2 sm:border-b-0 pe-4 mx-5 sm:mx-0">

                <!-- Notes of the navegation bar -->
                <div class="flex overflow-x-scroll sm:flex-col sm:overflow-x-visible gap-4 " id="notes">
                    <template v-if="notes"> <!-- if notes is not empty -->
                        <a 
                        href="#top"
                        v-for="note in notes.data[0]"
                        @click="printNote(note.id, this)"
                        :id="`note-${note.id}`"
                        class="min-w-[85vw] sm:min-w-[25vw] flex flex-col items-end cursor-pointer transition duration-300 border border-gray-800 hover:border hover:border-white rounded-md p-2 pe-4">
                            <p class="text-gray-500 text-sm">Nota</p>
                            <p class="text-sm text-gray-200 text-right">{{note.title}}</p>
                            <p class="text-gray-500 text-sm">{{formatDate(note.created_at)}}</p>
                        </a>
                    </template>
                </div>
            </div>

            <!-- Notes -->
            <div class=" w-[90vw] sm:w-[45vw] mx-5 sm:mx-0">

                <template v-if="fullNoteModal">
                    <!-- First Note -->
                    <div class="text-gray-200 p-6 border border-gray-600 rounded-md">

                        <!-- Title and action buttons -->
                        <div class="flex gap-2 justify-between">
                            <div class="flex flex-col">
                                <span class="text-sm text-gray-500">Haz click sobre el título para volver a la tarjeta de la nota</span>
                                <a :href="`#note-${note.id}`" class="text-2xl font-semibold mb-6">{{note.title}}</a>
                            </div>
                        </div>

                        <!-- Note body -->
                        <textarea disabled class="w-full min-h-[100vh] bg-gray-800 scrollbar-hidden">{{note.note}}</textarea>

                        <a 
                        :id="note.galery"
                        :href="note.path==null ? '#' : note.path"
                        class="text-sm cursor-pointer border border-gray-600 rounded-md w-[200px] h-[36px] flex gap-2 items-center justify-center hover:border-white transition duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24" fill="#fff" width="18px">
                                <path d="M16.155,5.61c-1.771,0-2.633,.863-2.633,2.638s.861,2.639,2.633,2.639,2.634-.863,2.634-2.639-.861-2.638-2.634-2.638Zm0,4.277c-1.059,0-1.633-.261-1.633-1.639s.574-1.638,1.633-1.638,1.634,.261,1.634,1.638-.574,1.639-1.634,1.639Z"/>
                                <path d="M21.769,2.92c-.052-.162-.182-.287-.346-.331-.178-.048-4.41-1.178-9.423-1.178S2.756,2.541,2.578,2.589c-.165,.044-.295,.17-.347,.333-.05,.16-1.231,3.973-1.231,9.078,0,5.148,1.181,8.921,1.231,9.079,.052,.162,.182,.287,.346,.331,.178,.048,4.41,1.179,9.423,1.179s9.244-1.13,9.423-1.179c.164-.044,.295-.17,.346-.332,.051-.16,1.231-3.973,1.231-9.078,0-5.149-1.182-8.922-1.231-9.08ZM3.107,20.513c-.123-.439-.375-1.407-.607-2.748,2.549-3.664,5.875-5.461,6.623-5.834,.806,.228,4.485,1.415,8.193,5.042,1.333,1.304,2.413,2.663,3.15,3.64-1.403,.318-4.758,.976-8.466,.976-4.173,0-7.884-.83-8.893-1.076Zm17.975-.741c-.749-.98-1.794-2.268-3.067-3.514-4.391-4.293-8.652-5.304-8.831-5.345-.104-.023-.215-.013-.314,.03-.158,.07-3.645,1.65-6.582,5.423-.166-1.27-.289-2.753-.289-4.366,0-4.198,.846-7.569,1.108-8.514,1.011-.246,4.724-1.075,8.892-1.075s7.884,.83,8.893,1.075c.263,.937,1.107,4.275,1.107,8.514,0,3.438-.567,6.322-.917,7.772Z"/>
                            </svg>
                            Explorar Galería
                        </a>
                    </div>
                </template>
            </div>
        </section>
    </div>  
</template>

