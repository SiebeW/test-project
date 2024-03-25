<script setup>
import { PokemonStore } from '@/stores/PokemonStore.ts';
import { ref } from 'vue';

let searchInput = ref('')
function search() {
    PokemonStore.filterPokemon(searchInput.value)
} 
</script>

<template>
    <div class="search-bar-container">
        <svg class="search-icon" width="15px" height="15px"><g id="Layer_1-2">
            <circle class="cls-1" cx="5.26" cy="5.26" r="4.51" />
            <line class="cls-1" x1="12.38" y1="12.87" x2="8.23" y2="8.72" />
        </g></svg>
        <input class="search-bar" type="text" v-model="searchInput" v-on:input="search" placeholder="Search for a pokemon" />
        <p>{{ searchInput }}</p>
    </div>
</template>


<style scoped>
.search-bar-container {
    position: relative;
    width: calc(100%);
    min-width: 300px;
    max-width: 500px;
    margin: 0 auto;
}
.search-icon {
    position: absolute;
    user-select: none;
    padding: 0.75em 1em;
}
.search-bar {
    padding: 0.6em 2em 0.65em 3em;
    border-width: 0px;
    background-color: #f2f2f2;
    width: calc(100% - 5em);
    border-radius: 0.75em;
    font-size: 1em;
    color: rgba(0,0,0,0.9);
}
.cls-1 {
    fill: none;
    stroke: #8b8b90;
    stroke-linecap: round;
    stroke-miterlimit: 10;
    stroke-width: 1.5px;
}
</style>