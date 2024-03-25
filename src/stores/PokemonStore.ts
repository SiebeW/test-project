import { reactive, ref } from 'vue';
import Pokedex from 'pokedex-promise-v2';
import { addPokemonToDb, getPokemonFromDb, lastDataUpdateTime, getSpeciesFromDbById, addSpeciesToDb, StoredPokemonSpecies } from './indexedDb';

interface PokemonStoreInterface {
    pokemon: (Pokedex.Pokemon)[];
    sorting: string,
    filteredPokemon: Pokedex.Pokemon[],
    selectedPokemon?: Pokedex.Pokemon,
    selectedSpecies?: StoredPokemonSpecies,
    sortPokemon: () => void,
    fetchPokemon: () => Promise<void>,
    filterPokemon: (query: string) => void,
    selectPokemon: (pkmn: Pokedex.Pokemon) => void;
}

enum sortBy {
    numericalAsc,
    numericalDesc,
    alphabeticalAsc,
    alphabeticalDesc
}

const P = new Pokedex();
const sortedPokemon = ref<Pokedex.Pokemon[]>([]);
const pokemonFetchOptions = {
    limit: 151,
    offset: 0
}
const cacheTime = 1000 * 60 * 60 * 24 * 7; // 1 week
const sortByNum = ref(0);

export const PokemonStore = reactive<PokemonStoreInterface>({
    pokemon: [],
    sorting: 'numericalAsc',
    filteredPokemon: [],
    selectedPokemon: {} as Pokedex.Pokemon,
    selectedSpecies: {} as StoredPokemonSpecies,
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
        sortByNum.value < 3 ? sortByNum.value++ :  sortByNum.value = 0
        let sortArray = [];
        switch (sortByNum.value) {
            case sortBy.numericalAsc:
                sortArray = this.pokemon.sort(function(a,b) {
                    if(a.id < b.id) {
                        return -1;
                    }
                    if (a.id > b.id) {
                        return 1
                    }
                    return 0
                })
                break;
            case sortBy.numericalDesc:
                sortArray = this.pokemon.sort(function(a,b) {
                    if(a.id < b.id) {
                        return 1;
                    }
                    if (a.id > b.id) {
                        return -1
                    }
                    return 0
                })
                break;
            case sortBy.alphabeticalAsc:
                sortArray = this.pokemon.sort(function(a,b) {
                    if(a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1
                    }
                    return 0
                })
                break;
            case sortBy.alphabeticalDesc:
                sortArray = this.pokemon.sort(function(a,b) {
                    if(a.name < b.name) {
                        return 1;
                    }
                    if (a.name > b.name) {
                        return -1
                    }
                    return 0
                })
                break;
            default:
                sortArray = this.pokemon;
        }
        sortedPokemon.value = sortArray;
    },
    async selectPokemon(pkmn: Pokedex.Pokemon) {
        const localSpecies = await getSpeciesFromDbById(pkmn.id);
        if(!localSpecies || new Date().getTime() - cacheTime > localSpecies.lastModified) {
            console.info("Fetching fresh species data");
            const apiSpeciesData = await P.getPokemonSpeciesByName(pkmn.name);
            this.selectedSpecies = await addSpeciesToDb(apiSpeciesData);
        } else {
            this.selectedSpecies = localSpecies;
        }
        this.selectedPokemon = pkmn;
    },
    filterPokemon(query: string) {
        let filterArray = []
        if (sortedPokemon.value) {
            filterArray = sortedPokemon.value;
        } else {
            filterArray = this.pokemon
        }
        this.filteredPokemon = this.pokemon.filter((pkmn: Pokedex.Pokemon) => {
            return pkmn.name.includes(query)
        })
    }
})