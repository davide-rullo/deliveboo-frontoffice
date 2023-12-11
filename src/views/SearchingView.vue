<script>
import axios from 'axios';
export default {
    name: 'SearchingView',
    data() {
        return {
            APIurl: "http://127.0.0.1:8000/api/restaurants",
            restaurants: [],

        }
    }
}
</script>

<template>
    <div class="p-5 mb-4 jumbotron shadow">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">
                Our Cocktails
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
                    <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                    <path
                        d="M432 240c53 0 96-43 96-96s-43-96-96-96c-35.5 0-66.6 19.3-83.2 48H296.2C316 40.1 369.3 0 432 0c79.5 0 144 64.5 144 144s-64.5 144-144 144c-27.7 0-53.5-7.8-75.5-21.3l35.4-35.4c12.2 5.6 25.8 8.7 40.1 8.7zM1.8 142.8C5.5 133.8 14.3 128 24 128H392c9.7 0 18.5 5.8 22.2 14.8s1.7 19.3-5.2 26.2l-177 177V464h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H208 120c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V345.9L7 169c-6.9-6.9-8.9-17.2-5.2-26.2z" />
                </svg>
            </h1>
            <p class="col-md-8 fs-4">
                "Embark on a Journey of Taste and Innovation Discover the Perfect
                Cocktail for Every Occasion"
            </p>
            <router-link to="/about" class="btn btn-primary btn-lg" type="button">About Us</router-link>
        </div>
    </div>
    <div class="container py-5">
        <div class="d-flex justify-content-center gap-3 mb-5">
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
        </div>
    </div>
</template>



<style lang="scss" scoped></style>