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

<style scoped>
</style>