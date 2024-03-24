<script setup>
import { PokemonStore } from '@/stores/PokemonStore.ts';
import { TypeColors } from '@/stores/TypeColors.ts';
</script>

<template>
    <div>
        <ul class="pkmn-list-container">
            <li v-for="pkmn in PokemonStore.pokemon" :key="pkmn.name" class="flex row pkmn-container align-items-center">
                <img v-bind:src="pkmn.sprites.other['official-artwork'].front_default">
                <div class="pkmn-name">
                    <p class="text-bold">{{ pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1) }}</p>
                    <p class="pkmn-id">Nr. {{ pkmn.id < 10 ? '00' + pkmn.id : pkmn.id < 100 ? '0' + pkmn.id : pkmn.id }}</p>
                </div>
                <div class="pkmn-types flex row ml-auto align-self-start">
                    <div v-for="type in pkmn.types" :key="type.slot"
                        class="pkmn-type"
                        :class="[type.type.name]"
                        :style="'background-color: ' + [TypeColors[type.type.name]]">
                            {{ type.type.name }}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>


<style scoped>
p { margin: 0;}

.pkmn-list-container {
    display: grid;
    padding: 0;
    gap: 0.5em;
}

.pkmn-container {
    padding: 0.75em;
    background-color: rgb(233, 233, 233);
    background: #fff;
    border-radius: 0.5em;
    margin: 0;
    position: relative;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.10), 0 1px 4px rgba(0, 0, 0, 0.10);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
    gap: 1em;
    width: calc(100% - 1.5em);
    min-width: 300px;
    max-width: 500px;
    margin: 0 auto;
}

.pkmn-container:hover {
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.18), 0 5px 24px rgba(0, 0, 0, 0.16);
}

.pkmn-container img {
    width: 50px;
    height: 50px;
}

.pkmn-id {
    color: rgba(0, 0, 0, 0.25)
}
.pkmn-types{
    font-size: 0.9em;
    gap: 0.5em;
}
.pkmn-type {
    padding: 0.25em 1em 0.35em;
    border-radius: 1em;
    margin-top: 0.25em;
    color: white;
}

</style>