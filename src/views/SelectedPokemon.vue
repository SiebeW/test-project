<script setup>
import { PokemonStore } from '@/stores/PokemonStore';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { TypeColors } from '@/stores/TypeColors';

const route = useRoute()
const selectedImage = ref(0)
const selectionLimits = ref({
    min: 0,
    max: 0
})
const lang = 'en'

function incrementSelectedImage(dir) {
    console.log(
        'dir: ' + dir,
        'sel: ' + selectedImage.value
    )
    if (dir === 'right') {
        if (selectedImage.value != selectionLimits.value.max) {
            selectedImage.value++
        }
    } else {
        if (selectedImage.value != selectionLimits.value.min) {
            selectedImage.value--
        }
    }
} 

function checkPokemonLoadState() {
    if(PokemonStore.pokemon == null || PokemonStore.pokemon.length === 0) {
        window.setTimeout(checkPokemonLoadState,50);
    } else {
        PokemonStore.selectPokemon(PokemonStore.pokemon[route.params.id - 1])
    }
}

if (route.params.id) {
    checkPokemonLoadState()
}

function mapArray (object) {
    const mappedArray = Object.keys(object).map((k) => {
        if (object[k]) {
            if (typeof object[k] === "string") {
                return {
                    "id": k,
                    "value": object[k]
                }
            } else if (typeof object[k] === "object") {
                return mapArray(object[k])
            }
        } 
    })
    return mappedArray.flat().filter(n => n);
}

function newImageArray(object) {
    let imageArray = mapArray(object)
    selectionLimits.value.max = imageArray.length - 1;
    if (selectedImage.value > selectionLimits.value.max) {
        selectedImage.value = 0 
    }
    const officialArtwork = imageArray.find((img) => {
        return img.value.includes('official-artwork')
    });
    const officialArtworkIndex = imageArray.indexOf(officialArtwork);
    imageArray.splice(officialArtworkIndex,1);
    imageArray.unshift(officialArtwork);
    return imageArray;
}

watch(
    () => route.params.id,
    async id => {
        PokemonStore.selectPokemon(PokemonStore.pokemon[id - 1])
    }
)

function pokemonDescription() {
    let description = '';
    if (PokemonStore.selectedSpecies.flavor_text_entries) {   
        description = PokemonStore.selectedSpecies.flavor_text_entries.find((entry) => {
            return entry.language.name === lang;
        }).flavor_text;
    }
    return description
}

function pokemonCategory() {
    let category = '';
    if (PokemonStore.selectedSpecies.flavor_text_entries) {
        category = PokemonStore.selectedSpecies.genera.find((genera) => {
            return genera.language.name === lang;
        }).genus
    }
    return category
}
</script>

<template>
    <div v-if="PokemonStore.selectedPokemon.name" class="pkmn-detail-container">
        <h1 class="text-white">
            {{ PokemonStore.selectedPokemon.name.charAt(0).toUpperCase() + PokemonStore.selectedPokemon.name.slice(1) }}
        </h1>
        <!-- Should be subdivided into components, time allowing -->
        <!-- portrait component -->
        <section class="portrait-carousel flex row">
            <svg @click="incrementSelectedImage('left')" :class="selectedImage === selectionLimits.min ? 'arrow-disabled' : ''" class="arrow-left arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.31 13.01" width="15px" height="20px"><g id="Layer_3"><polyline class="cls-1" points=".85 .75 6.56 6.45 .75 12.26"/></g></svg>
            <div v-for="(img, index) in newImageArray(PokemonStore.selectedPokemon.sprites)" :key="PokemonStore.selectedPokemon.name + img.id" :id="index" :class="index === selectedImage ? 'selected' : index > selectedImage.value ? 'next-image' : 'prev-image'">
                <img v-if="img.value" :src="img.value" :alt="PokemonStore.selectedPokemon.name + ' ' + img.id + ' sprite'">
            </div>
            <svg @click="incrementSelectedImage('right')" :class="selectedImage === selectionLimits.max ? 'arrow-disabled' : ''" class="arrow-right arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.31 13.01" width="15px" height="20px"><g id="Layer_3"><polyline class="cls-1" points=".85 .75 6.56 6.45 .75 12.26"/></g></svg>
        </section>
        <!-- info component -->
        <section class="info-section">
            <h3 class="section-title text-white">INFO</h3>
            <table class="info-container">
                <tr>
                    <td colspan="3">
                        <p class="description">

                            {{ pokemonDescription() }}
                        </p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Type</p>
                    </td>
                    <td>
                        <div class="pkmn-types flex row align-self-start">
                            <div v-for="type in PokemonStore.selectedPokemon.types" :key="type.slot"
                            class="pkmn-type"
                            :class="[type.type.name]"
                            :style="'background-color: ' + [TypeColors[type.type.name]]">
                                {{ type.type.name }}
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Number</p>
                    </td>
                    <td>
                        {{ route.params.id < 10 ? '00' + route.params.id : route.params.id < 100 ? '0' + route.params.id : route.params.id }} 
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Gewicht</p>
                    </td>
                    <td>
                        {{ Math.round(PokemonStore.selectedPokemon.weight * 10)/10/10 + ' kg' }}
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Height</p>
                    </td>
                    <td>
                        {{ PokemonStore.selectedPokemon.height / 10 + 'm' }}
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Category</p>
                    </td>
                    <td>
                        {{ pokemonCategory() }}
                    </td>
                </tr>
                <tr>
                    <td>
                        <p class="info-label">Sex</p>
                    </td>
                    <td>
                        {{ PokemonStore.selectedSpecies.gender_rate == -1 ? 'N/A' : '♂ ♀' }}
                    </td>
                </tr>
                <tr>
                    <td class="flex align-items-start">
                        <p class="info-label">Ability</p>
                    </td>
                    <td>
                        <table>
                            <tr v-for="ability in PokemonStore.selectedPokemon.abilities" :key="ability.name + PokemonStore.selectedPokemon.name">
                                <td>
                                    {{ ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1) }}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </section>
    </div>
</template>

<style scoped>
.info-section {
    max-width: 400px;
}
.description {
    margin-bottom: 1em;
}
.pkmn-types {
    gap: 0.5em
}
.info-label {
    margin: 0.25em 0;
    color: rgba(0,0,0,0.25);
}
.pkmn-detail-container {
    margin: 2em;
}
.info-container {
    background-color: white;
    border-radius: 0.75em;
    padding: 1em;
}
.arrow {
    margin-top: 3px;
    align-self: center;
    opacity: 0.6;
    fill:none;stroke:black;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;
}
.arrow:hover {
    opacity: 0.9;
}

.arrow-disabled, .arrow-disabled:hover {
    opacity: 0.15;
}
.section-title {
    font-weight: 800;
    font-size: 16px;
}

.arrow-left {
    transform: scaleX(-1)
}

.portrait-carousel {
    max-width: 350px;
    width: 350px;
    max-width: 350px;
    height: 300px;
    max-height: 300px;
    position: relative;
    overflow: hidden;
}
.portrait-carousel div {
    margin: 1.5em;
    display: flex;
    align-items: center;
    justify-content: end;
    width: 100%;
}
.portrait-carousel div img {
    user-select: none;
    width: 100%;
}
.selected-image, .prev-image, .next-image {
    position: absolute;
    left: 0;
    transition: left 0.15s;
}
.prev-image {
    left: -100vw;
}
.next-image {
    left: 100vw;
}
</style>