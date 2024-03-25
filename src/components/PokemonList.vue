<script setup>
import { PokemonStore } from '@/stores/PokemonStore.ts';
import { TypeColors } from '@/stores/TypeColors.ts';
</script>

<template>
    <div>
        <ul class="pkmn-list-container">
            <li v-for="pkmn in PokemonStore.filteredPokemon" :key="pkmn.name" class="">
                <RouterLink class="flex row align-items-center pkmn-container" :to="'/pokemon/' + pkmn.id">
                    <img v-bind:src="pkmn.sprites.other['official-artwork'].front_default">
                    <div class="pkmn-name">
                        <p class="text-bold">{{ pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1) }}</p>
                        <p class="pkmn-id">Nr. {{ pkmn.id < 10 ? '00' + pkmn.id : pkmn.id < 100 ? '0' + pkmn.id : pkmn.id }}</p>
                    </div>
                    <div class="pkmn-types flex row ml-auto align-self-start">
                        <div v-for="type in pkmn.types" :key="type.slot"
                            class="pkmn-type"
                            :style="'background-color: ' + [TypeColors[type.type.name]]">
                                {{ type.type.name }}
                        </div>
                        <svg class="arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.31 13.01" width="15px" height="20px"><g id="Layer_3"><polyline class="cls-1" points=".85 .75 6.56 6.45 .75 12.26"/></g></svg>
                    </div>
                </RouterLink>
            </li>
        </ul>
    </div>
</template>


<style scoped>
p { margin: 0;}

ul {
    margin: 0;
    list-style-type: none;
}

.arrow-right {
    margin-top: 3px;
    align-self: center;
    opacity: 0.8;
}

.pkmn-list-container {
    display: grid;
    padding: 0 1em;
    gap: 0.5em;
    text-decoration: none;
}

.pkmn-container {
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
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
    margin-top: 0.25em;
    gap: 0.5em;
}
.cls-1{fill:none;stroke:#8b8b90;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}
</style>