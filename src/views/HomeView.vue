<script>
import WordRotation from '../components/WordRotation.vue';

export default {
    name: 'HomeView',
    components: { WordRotation }
}
</script>

<template>
    <div class="p-5 jumbotron shadow">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">
                Unleash the flavor with DeliveBoo: where taste meets convenience!

            </h1>
            <p class="col-md-8 fs-4 text-black">
                Order, savor, repeat. Booster the Rooster 🐓 will guide your culinary journey one bite at a time. 🍔
                #DeliveBooMagic"
            </p>
            <!-- <router-link to="/about" class="btn btn-primary btn-lg" type="button">About Us</router-link> -->
        </div>
    </div>
    <div class="bg_my_light-pink shadow">

        <div class="container py-5">

            <div class="d-flex justify-content-center  align-items-center">
                <div class="col-3 text-end mx-4">
                    <h2>Today I need</h2>
                </div>
                <div class="col-3">
                    <WordRotation></WordRotation>
                </div>
            </div>
            <!-- <div class="d-flex justify-content-center gap-3 mb-5">
                <button class="btn btn-primary" @click="fetchAlcoholic">
                    Alcoholic Drinks
                </button>
                <button class="btn btn-primary" @click="fetchNonAlcoholic">
                    Analcoholic Drinks
                </button>
                <button class="btn btn-primary" @click="fetchAll">All Drinks</button>
            </div>
    
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                <div class="col text-center" v-for="cocktail in cocktails">
                    <CocktailCard :cocktail="cocktail"></CocktailCard>
                </div>
            </div> -->
        </div>
    </div>
</template>



<style lang="scss" scoped></style>