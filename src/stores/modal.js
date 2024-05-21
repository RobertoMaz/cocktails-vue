import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { userFavoritosStore } from "./favoritos"
import { useBebidasStore } from "./bebidas"

export const useModalStore = defineStore('modal', () => {

    const modal = ref(false)

    const favoritos = userFavoritosStore()

    function handleClickModal() {
        modal.value = !modal.value
    }

    const textoBoton = computed(() => {
        return favoritos.existeFavorito() ? 'Eliminar de Favoritos' : 'Agregar a favoritos'
    })

    return {
        modal,
        textoBoton,
        handleClickModal
    }
})