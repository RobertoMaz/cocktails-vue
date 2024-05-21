import { defineStore } from "pinia"
import { ref, onMounted, reactive, computed } from "vue"
import ApiService from "@/services/ApiService"
import { useModalStore } from "./modal"

export const useBebidasStore = defineStore('bebidas', () => {

    const categorias = ref([])
    const recetas = ref([])
    const receta = ref({})
    const busqueda = reactive({
        nombre: '',
        categoria: ''
    })

    const modal = useModalStore()

    onMounted(async function() {
        const {data: {drinks}} = await ApiService.obtenerCategorias()
        categorias.value = drinks
    })

    async function obtenerRecetas() {
        const {data: {drinks}} = await ApiService.buscarRecetas(busqueda)
        recetas.value = drinks 
    }

    async function seleccionarBebida(id) {
        const {data: {drinks}} = await ApiService.buscarReceta(id)
        receta.value = drinks[0]
        modal.handleClickModal()
    }

    const noRecetas = computed(() => recetas.value.length === 0)

    return {
        categorias,
        busqueda,
        recetas,
        receta,
        noRecetas,
        seleccionarBebida,
        obtenerRecetas
    }
})