<script setup>
import { PokemonStore } from '@/stores/PokemonStore.ts';
</script>

<template>
    <div>
        <ul>
            <li v-for="pkmn in PokemonStore.pokemon" :key="pkmn.name">
                {{ pkmn.name }}
            </li>
        </ul>
    </div>
</template>


<style scoped></style>