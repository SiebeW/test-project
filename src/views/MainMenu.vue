<script setup>
import PokemonSearch from "@/components/PokemonSearch.vue";
import PokemonList from "@/components/PokemonList.vue";
import { PokemonStore } from "@/stores/PokemonStore";
</script>

<template>
  <nav class="flex column">
    <div class="p-1">
      <div class="filter-sort flex row justify-content-end">
        <svg id="filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.24 12.66"><g id="Layer_5"><polyline class="cls-1" points="2.62 .75 10.49 .75 10.49 3.15 7.22 6.42 7.22 10.58 4.22 11.91 4.22 6.54 .75 3.07 .75 .75"/></g></svg>
        <svg @click="PokemonStore.sortPokemon()" id="sort-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.64 12.38"><g id="Layer_4"><polyline class="cls-1" points=".75 3.3 3.3 .75 5.73 3.18"/><line class="cls-1" x1="3.3" y1="11.63" x2="3.3" y2=".75"/><polyline class="cls-1" points="11.89 9.08 9.34 11.63 6.91 9.2"/><line class="cls-1" x1="9.34" y1=".75" x2="9.34" y2="11.63"/></g></svg>
      </div>
      <h1>Pokédex</h1>
      <PokemonSearch></PokemonSearch>
    </div>
    <PokemonList class="overflow-scroll"></PokemonList>
  </nav>
</template>

<style scoped>
.overflow-scroll {
  overflow: scroll;
}
h1 {
  margin-top: 0;
}
nav {
  margin: 0;
  width: 100vw;
  max-width: 500px;
  height: 100vh;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.10), 0 1px 4px rgba(0, 0, 0, 0.10);
  background-color: white;
}
.filter-sort {
  gap: 0.5em;
}
.filter-sort svg:hover {
  opacity: 1;
}
.filter-sort svg {
  max-width: 20px;
  cursor: pointer;
  opacity: 0.5;
}
.filter-icon, .filter-icon:hover {
  cursor: not-allowed;
  opacity: 0.12;
}
.cls-1 {
  fill: none;
  stroke: #000000;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.5px;
}
</style>