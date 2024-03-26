<script setup>
import MainMenu from "@/views/MainMenu.vue";
import { RouterView } from "vue-router";
import { PokemonStore } from "@/stores/PokemonStore.ts";
import { TypeColorsLighter } from "@/stores/TypeColors";

PokemonStore.fetchPokemon();

function getTypeColor() {
  if (PokemonStore.selectedPokemon.types) { return TypeColorsLighter[PokemonStore.selectedPokemon.types[0].type.name] }
}
</script>

<template>
  <div
    class="spinner-container flex justify-content-center justify-items-center align-items-center align-content-center"
    v-if="PokemonStore.pokemon.length === 0">
    <svg class="spinner" version="1.1" id="Layer_2_00000125588937344236749390000004514562173039608716_"
      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 13.1 13.6" style="enable-background:new 0 0 13.1 13.6;" xml:space="preserve">
      <path class="pb0" d="M6.6,12.4c3.1,0,5.6-2.5,5.6-5.6H1C1,9.9,3.5,12.4,6.6,12.4z" />
      <path class="pb0" d="M6.6,1.2C3.5,1.2,1,3.7,1,6.8h11.1C12.1,3.7,9.6,1.2,6.6,1.2z" />
      <circle class="pb1" cx="6.6" cy="6.8" r="1.8" />
    </svg>

  </div>
  <div class="flex row" :style="'background-color: ' + getTypeColor()">
    <MainMenu />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
.pb0 {
  fill: none;
  stroke: #8B8B90;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-miterlimit: 10;
}

.pb1 {
  fill: #FFFFFF;
  stroke: #8B8B90;
  stroke-miterlimit: 10;
}

.spinner-container {
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.75);
}

.spinner {
  animation: rotation 1s linear infinite;
}

h1,
h2,
h3,
h4 {
  user-select: none;
}

.pkmn-type {
  padding: 0.25em 1em 0.35em;
  border-radius: 1em;
  color: white;
  font-size: 0.9em;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  margin: 0;
}

.flex {
  display: flex;
}

.row {
  flex-direction: row;
}

.column {
  flex-direction: column;
}

.text-white {
  color: white;
}

.p-1 {
  padding: 1em;
}

.text-bold {
  font-weight: bold;
}

.ml-auto {
  justify-self: flex-end;
  margin-left: auto;
}

.align-items-center {
  align-items: center;
}

.align-self-start {
  align-self: flex-start;
}

.justify-content-end {
  justify-content: end;
}
</style>