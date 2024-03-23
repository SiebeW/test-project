<template>
    <div>
        <ul>
            <li v-for="pkmn in pokemon" :key="pkmn.name">
                {{ pkmn.name }}
            </li>
        </ul>
    </div>
</template>

<script>
import Pokedex from 'pokedex-promise-v2';
const P = new Pokedex();
const original151 = {
    limit: 151,
    offset: 0
}

export default {
    data() {
        return {
            pokemon: [],
        };
    },
    async created() {
        try {
            const response = await P.getPokemonsList(original151);
            this.pokemon = response.results;
        } catch (error) {
            console.error(error);
        }
    },
};
</script>

<style scoped></style>