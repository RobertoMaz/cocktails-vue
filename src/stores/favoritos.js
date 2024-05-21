import { defineStore } from "pinia"
import { useBebidasStore } from "./bebidas"
import { useModalStore } from "./modal"
import { computed, onMounted, ref, watch } from "vue"
import { useNotificacionStore } from "./notificaciones"

export const userFavoritosStore = defineStore('favoritos', () => {

    const favoritos = ref([])

    const bebidas = useBebidasStore()
    const modal = useModalStore()
    const notificaciones = useNotificacionStore()

    onMounted(() => {
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    watch(favoritos, () => {
        guardarLocalStorage()
    }, {
        deep: true
    })


    function existeFavorito() {
        const localStorageFavoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []
        return localStorageFavoritos.some( favorito => favorito.idDrink === bebidas.receta.idDrink)
    }

    function guardarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    function eliminarFavorito() {
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink !== bebidas.receta.idDrink)

        notificaciones.mostrar = true
        notificaciones.texto = 'Se elimino de favoritos'   
    }

    function agregarFavoritos() {
        favoritos.value.push(bebidas.receta)

        notificaciones.mostrar = true
        notificaciones.texto = 'Se agrego a favoritos'  
    }

    function handleClickFavorito() {
        if(existeFavorito()){
            eliminarFavorito()
        } else {
            agregarFavoritos()
        }
        modal.modal = false
    }

    const noFavoritos = computed(() => favoritos.value.length === 0)

    return {
        favoritos,
        noFavoritos,
        handleClickFavorito,
        existeFavorito
    }
})  