<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld title="Pokedex"/>
    <PokemonList></PokemonList>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import PokemonList from '@/components/PokemonList.vue'; // @ is an alias to /src

@Options({
  components: {
    HelloWorld,
    PokemonList
  },
})
export default class HomeView extends Vue {}
</script>
