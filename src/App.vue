<script setup>
import MainMenu from "@/views/MainMenu.vue";
import { RouterView } from "vue-router";
import { PokemonStore } from "@/stores/PokemonStore.ts";

PokemonStore.fetchPokemon();
</script>

<template>
  <div class="flex row">
    <MainMenu />
    <main>
      <RouterView />
    </main>
  </div>
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
.justify-content-end {
  justify-content: end;
}
</style>