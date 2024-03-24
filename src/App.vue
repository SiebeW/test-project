<script setup>
import MainMenu from "@/views/MainMenu.vue";
import { RouterView } from "vue-router";
import { PokemonStore } from "@/stores/PokemonStore.ts";

PokemonStore.fetchPokemon();
</script>

<template>
  <MainMenu />
  <main>
    <RouterView />
  </main>
</template>

<style>
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
</style>