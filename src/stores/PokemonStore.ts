import { reactive } from 'vue';
import Pokedex from 'pokedex-promise-v2';

interface PokemonStoreInterface {
    pokemon: Pokedex.NamedAPIResource[];
    fetchPokemon: () => Promise<void>
}

const P = new Pokedex();
const original151 = {
    limit: 151,
    offset: 0
}

export const PokemonStore = reactive<PokemonStoreInterface>({
    pokemon: [],
    async fetchPokemon() {
        try {
            const response = await P.getPokemonsList(original151);
            this.pokemon = response.results;
        } catch (err) {
            console.error(err);
        }
    }
})