<script setup>
    import { useBebidasStore } from '@/stores/bebidas'
    import Receta from '@/components/Receta.vue'

    const bebidas = useBebidasStore()
</script>

<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>
    <p v-if="bebidas.noRecetas" class="my-10 text-center text-2xl">No hay resultados, utiliza el formulario para buscar recetas</p>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10">
        <Receta 
            v-for="receta in bebidas.recetas"
            :receta="receta"
            :key="receta.idDrink"
        />
    </div>
</template>