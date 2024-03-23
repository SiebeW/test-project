<template>
    <div>
        <ul>
            <li v-for="pkmn in PokemonStore.pokemon" :key="pkmn.name">
                {{ pkmn.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { Vue } from 'vue-class-component';
import { PokemonStore } from '../stores/PokemonStore.ts';

PokemonStore.fetchPokemon();
</script>

<style scoped></style>