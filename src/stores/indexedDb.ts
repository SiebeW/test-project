import Pokedex from "pokedex-promise-v2";
import { toRaw } from "vue";
import { openDB } from "idb";

const db = await openDB('pokemon',1, {
    upgrade(db) {
        try{
            db.deleteObjectStore('pokemon');
            db.deleteObjectStore('species');
            db.deleteObjectStore('metadata');
        } catch (err) {
            console.log('Fresh database');
        }

        const pokemonObjectStore = db.createObjectStore('pokemon', { keyPath: 'id' });
        const speciesObjectStore = db.createObjectStore('species', { keyPath: 'id' });
        db.createObjectStore('metadata');
        pokemonObjectStore.createIndex('name', 'name', { unique: true });
        speciesObjectStore.createIndex('name', 'name', { unique: true });
    }
});

export const addPokemonToDb = async (pokemon: Pokedex.Pokemon[]): Promise<void> => {
    const transaction = db.transaction(['pokemon', 'metadata'], 'readwrite');
    const pokemonObjectStore = transaction.objectStore('pokemon');
    const metadataObjectStore = transaction.objectStore('metadata');
    pokemon.forEach((pkmn) => pokemonObjectStore.put(toRaw(pkmn))); // toRaw uses the original array and not proxy
    metadataObjectStore.put(new Date().getTime(), 0);
    await transaction.done;
}

export const getPokemonFromDb = async () => {
    const transaction = db.transaction(['pokemon'], 'readonly');
    const objectStore = transaction.objectStore('pokemon');
    const request = objectStore.getAll();
    await transaction.done;
    return request;
};

export const lastDataUpdateTime = async (): Promise<number> => {
    const transaction = db.transaction(['metadata'], 'readonly');
    const metadataObjectStore = transaction.objectStore('metadata');
    const request = metadataObjectStore.get(0);
    await transaction.done;
    return request;
}

export const getPokemonFromDbById = async (id: number) => {
    const transaction = db.transaction(['pokemon'], 'readonly');
    const objectStore = transaction.objectStore('pokemon');
    const request = objectStore.get(id);
    await transaction.done;
    return request;
};

export type StoredPokemonSpecies = Pokedex.PokemonSpecies & { lastModified: number };

export const addSpeciesToDb = async (species:Pokedex.PokemonSpecies): Promise<StoredPokemonSpecies> => {
    const transaction = db.transaction(['species'], 'readwrite');
    const objectStore = transaction.objectStore('species');
    const speciesWithDate : StoredPokemonSpecies = {...species, lastModified: new Date().getTime()};
    objectStore.put(toRaw(speciesWithDate));
    await transaction.done;
    return speciesWithDate;
}

export const getSpeciesFromDbById = async (id: number): Promise<StoredPokemonSpecies | undefined> => {
    const transaction = db.transaction(['species'], 'readonly');
    const objectStore = transaction.objectStore('species');
    const request = objectStore.get(id);
    await transaction.done;
    return request;
}

export const clearPokemonDb = async () => {
    const transaction = db.transaction(['pokemon', 'metadata'], 'readwrite');
    const pokemonObjectStore = transaction.objectStore('pokemon');
    const metadataObjectStore = transaction.objectStore('metadata');
    const speciesObjectStore = transaction.objectStore('species');
    pokemonObjectStore.clear();
    metadataObjectStore.clear();
    speciesObjectStore.clear();
    await transaction.done;
}
