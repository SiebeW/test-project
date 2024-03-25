<script setup>
import MainMenu from "@/views/MainMenu.vue";
import { RouterView } from "vue-router";
import { PokemonStore } from "@/stores/PokemonStore.ts";
import { TypeColorsLighter } from "@/stores/TypeColors";

PokemonStore.fetchPokemon();

function getTypeColor() {
  if (PokemonStore.selectedPokemon.types)
  {return TypeColorsLighter[PokemonStore.selectedPokemon.types[0].type.name]}
}
</script>

<template >
  <div class="flex row" :style="'background-color: ' + getTypeColor()">
    <MainMenu />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
h1, h2, h3, h4 {
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