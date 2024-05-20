<script setup>
    import { useBebidasStore } from '@/stores/bebidas'

    const storeBebidas = useBebidasStore()

    defineProps({
        receta: {
            type: Object
        }
    })
</script>
<template>
    <div class="border shadow-lg">
        <div class="overflow-hidden">
            <img 
                class="hover:scale-110 transition-transform hover:rotate-1"
                :src="receta.strDrinkThumb"
                :alt="`Imagen de ${receta.strDrink}`"
            />
        </div>
        <div class="p-5">
            <h2 class="text-xl truncate font-extrabold">{{ receta.strDrink }}</h2>
            <button
                class="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-2 font-bold text-white text-lg"
                @click="storeBebidas.seleccionarBebida(receta.idDrink)"
            >
                Ver Receta
            </button>
        </div>
    </div>
</template>
