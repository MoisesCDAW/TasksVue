<script setup>
    import { storeToRefs } from 'pinia' 
    import { useStore } from '../stores/store'
    import { useRouter } from 'vue-router'
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'

    const store = useStore()
    const {notes} = storeToRefs(store)
    const {userSession} = storeToRefs(store)
    const {tokenSession} = storeToRefs(store)
    const email = ref(null)
    const password = ref(null)
    const route = useRouter() // Objecto que permite gestionar redirecciones
    const notesAPI = "https://notesapi.moisescap.com/api/notes"

    /**
     * Permite gestionar el inicio de sesión de cada usuario
     */
    async function login(email, password) {
        if (email && password) {

            userSession.value = email

            try {
                tokenSession.value = await axios.post("https://notesapi.moisescap.com/api/login", {
                    email: email,
                    password: password
                })

                localStorage.setItem("tokenSession", tokenSession.value.data.token)
                localStorage.setItem("userSession", userSession.value)
            
                getNotes()
                route.push("tasks") // Redirección, no confundir con push() de arrays
            } catch (error) {
                alert("Las credenciales no coinciden con ningún dato")
            }
        }else {
            alert("ERROR: No pueden haber datos vacíos")
        }
    }


    /**
     * * Allows fetching all tasks from the API via axios and assigns the retrieved data to the reactive variable "tasks".
     */
    async function getNotes() {
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

</script>

<template>
    <div class="w-screen h-screen flex justify-center items-center bg-gray-800 text-white text-sm">
        <div class="flex flex-col lg:w-[25vw] sm:h-[90vh] lg:h-[80vh] p-4 gap-5 border border-gray-600 rounded-md">
            <div>
                <h1 class="text-3xl font-[IBM Plex] italic mb-1">Iniciar Sesión</h1>
                <p class="text-gray-500">Ingresa tu nombre y contraseña para ingresar</p>
            </div>

            <form @submit.prevent="onSubmit">   
                <div class="w-full flex flex-col gap-4">
                    <label class="flex flex-col gap-2">
                        Email
                        <input class="bg-gray-800 h-[40px] rounded-md px-4 border border-gray-600 placeholder:text-gray-500" 
                        v-model="email" type="text" placeholder="Ingresa tu email">
                    </label>
                    <label class="flex flex-col gap-2">
                        Contraseña
                        <input class="bg-gray-800 h-[40px] rounded-md px-4 border border-gray-600 placeholder:text-gray-500" 
                        v-model="password" type="password" placeholder="Ingresa tu contraseña">
                    </label>
                </div>

                <div class="w-full flex justify-center mt-10">
                    <button 
                        @click="login(email, password)"
                        class="w-[100px] flex justify-center gap-2 text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase"
                        >ENVIAR
                    </button>
                </div>
            </form>

            <div>
                <p class="text-gray-500 text-xs text-center hidden lg:block">MoisesCAP, 2025</p>
            </div>

            <div>
                <RouterLink to="/" 
                class="absolute left-6 top-6 w-[50px] flex justify-center gap-2 text-xs p-2 px-4 rounded cursor-pointer border border-gray-600 transition duration-300 hover:shadow-xl hover:border-white uppercase"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16px" height="16px" style="rotate: 90deg;" fill="#fff"><g id="_01_align_center" data-name="01 align center"><path d="M16.659,17.788,13.026,21.42,13,0,11,0l.026,21.407-3.62-3.62L5.992,19.2l3.919,3.919a3,3,0,0,0,4.243,0L18.073,19.2Z"/></g></svg>
                </RouterLink>
            </div>
        </div>


    </div>
</template>

<style scoped>

</style>
