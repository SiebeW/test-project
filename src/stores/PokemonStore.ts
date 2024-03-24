import { reactive } from 'vue';
import Pokedex from 'pokedex-promise-v2';
import { addPokemonToDb, getPokemonFromDb, lastDataUpdateTime } from './indexedDb';

interface PokemonStoreInterface {
    pokemon: Pokedex.Pokemon[];
    fetchPokemon: () => Promise<void>;
}

const P = new Pokedex();
const pokemonFetchOptions = {
    limit: 151,
    offset: 0
}

const cacheTime = 1000 * 60 * 60 * 24 * 7; // 1 week

export const PokemonStore = reactive<PokemonStoreInterface>({
    pokemon: [],
    async fetchPokemon() {
        try {
            const localPokemon = await getPokemonFromDb();
            const isStaleData = new Date().getTime() - cacheTime > (await lastDataUpdateTime());
            if(localPokemon.length === 151 && !isStaleData) {
                console.log("Using Cached Data");
                this.pokemon = localPokemon;
                return;
            }
            console.log("Fetching Fresh Data");
            const apiListResponse = await P.getPokemonsList(pokemonFetchOptions);
            const allPokemonResponse = await P.getPokemonByName(apiListResponse.results.map((result) => result.name));
            this.pokemon = allPokemonResponse;
            addPokemonToDb(this.pokemon);
        } catch (err) {
            console.error(err);
        }
    }
})