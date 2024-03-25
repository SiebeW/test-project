<script setup>
import { PokemonStore } from '@/stores/PokemonStore';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const pkmn = ref(null);
const selectedImage = ref(0)
const selectionLimits = ref({
    min: 0,
    max: 0
})

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
        pkmn.value = PokemonStore.pokemon[route.params.id - 1];
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
    selectionLimits.value.max = imageArray.length;
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
        pkmn.value = PokemonStore.pokemon[id - 1]
    }
)
</script>

<template>
    Pokemon ID: {{ route.params.id }} <br>
    Selected Image ID: {{ selectedImage }} <br>

    <div v-if="pkmn" class="pkmn-detail-container">
        <h1 class="text-white">
            {{ pkmn.name.charAt(0).toUpperCase() + pkmn.name.slice(1) }}
        </h1>
        <!-- To be subdivided into components -->
        <div class="portrait-carousel flex row">
            <svg @click="incrementSelectedImage('left')" :class="selectedImage === selectionLimits.min ? 'arrow-disabled' : ''" class="arrow-left arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.31 13.01" width="15px" height="20px"><g id="Layer_3"><polyline class="cls-1" points=".85 .75 6.56 6.45 .75 12.26"/></g></svg>
            <div v-for="(img, index) in newImageArray(pkmn.sprites)" :key="pkmn.name + img.id" :id="index" :class="index === selectedImage ? 'selected' : index > selectedImage.value ? 'next-image' : 'prev-image'">
                <img v-if="img.value" :src="img.value" :alt="pkmn.name + ' ' + img.id + ' sprite'">
            </div>
            <svg @click="incrementSelectedImage('right')" :class="selectedImage === selectionLimits.max ? 'arrow-disabled' : ''" class="arrow-right arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.31 13.01" width="15px" height="20px"><g id="Layer_3"><polyline class="cls-1" points=".85 .75 6.56 6.45 .75 12.26"/></g></svg>
        </div>
        <div>
            <p>info</p>
            <div class="info-container"></div>
        </div>
    </div>
</template>

<style scoped>
.pkmn-detail-container {
    margin: 2em;
}
.info-container {
    background-color: white;
    border-radius: 0.75em;
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
    opacity: 0.1;
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