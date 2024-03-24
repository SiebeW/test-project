<script setup>
import PokemonSearch from "@/components/PokemonSearch.vue";
import PokemonList from "@/components/PokemonList.vue";
</script>

<template>
  <nav>
    <PokemonSearch></PokemonSearch>
    <PokemonList></PokemonList>
  </nav>
</template>

<style scoped>
nav {
  margin: 1.5em;
  width: calc(100% - 3em);
}
</style>