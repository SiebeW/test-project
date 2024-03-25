import { reactive } from 'vue';
import Pokedex from 'pokedex-promise-v2';
import { addPokemonToDb, getPokemonFromDb, lastDataUpdateTime } from './indexedDb';

interface PokemonStoreInterface {
    pokemon: Pokedex.Pokemon[];
    sorting: string,
    filteredPokemon: Pokedex.Pokemon[],
    sortPokemon: () => void,
    fetchPokemon: () => Promise<void>,
    filterPokemon: (query: string) => void;
}

const P = new Pokedex();
const pokemonFetchOptions = {
    limit: 151,
    offset: 0
}

const cacheTime = 1000 * 60 * 60 * 24 * 7; // 1 week

export const PokemonStore = reactive<PokemonStoreInterface>({
    pokemon: [],
    sorting: 'numericalAsc',
    filteredPokemon: [],
    async fetchPokemon() {
        try {
            const localPokemon = await getPokemonFromDb();
            const isStaleData = new Date().getTime() - cacheTime > (await lastDataUpdateTime());
            if(localPokemon.length === pokemonFetchOptions.limit && !isStaleData) {
                console.info("Accessing Pokemon from PC");
                this.pokemon = localPokemon;
                this.filteredPokemon = this.pokemon;
                return;
            }
            console.info("Retrieving fresh pokemon data");
            const apiListResponse = await P.getPokemonsList(pokemonFetchOptions);
            const allPokemonResponse = await P.getPokemonByName(apiListResponse.results.map((result) => result.name));
            this.pokemon = allPokemonResponse;
            this.filteredPokemon = this.pokemon;
            addPokemonToDb(this.pokemon);
        } catch (err) {
            console.error(err);
        }
    },
    sortPokemon() {
        // numericalAsc
        // numericalDesc
        // alphabeticalAsc
        // alphabeticalDesc
    },
    filterPokemon(query: string) {
        this.filteredPokemon = this.pokemon.filter((pkmn: Pokedex.Pokemon) => {
            return pkmn.name.includes(query)
        })
    }
})