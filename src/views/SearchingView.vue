<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
    name: 'SearchingView',
    data() {
        return {
            base_url: 'http://127.0.0.1:8000/',
            apiRestaurants: "api/restaurants",
            restaurants: [],
            links: [],
            currentPage: 1,
            lastPage: null,
            loading: true,
            types: null,
            selected_types: [],

        }
    },
    components: {
        Loader
    },
    methods: {

        getTypes(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response);

                    this.types = response.data.types;
                })
                .catch(err => {
                    console.error(err);
                })
        },

        getRestaurants(url) {
            axios
                .get(url)
                .then(response => {
                    console.log(response);

                    this.restaurants = response.data.restaurants.data;
                    this.links = response.data.restaurants.links;
                    console.log(this.links);
                    this.lastPage = response.data.restaurants.last_page;
                    //console.log(this.lastPage);
                    this.loading = false;
                })
                .catch(err => {
                    console.error(err);
                })
        },
        fetchType(slug) {
            if (this.selected_types.includes(slug)) {
                let index = this.selected_types.indexOf(slug);
                this.selected_types.splice(index, 1);
            }
            else
                this.selected_types.push(slug);

            axios
                .post(this.base_url + "api/types/selected_types", {
                    selected_types: this.selected_types
                })
                .then(response => {
                    console.log(response);
                    this.restaurants = response.data.restaurants;
                    console.log(this.restaurants);
                    console.log(response.data.selected_types);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        /* fetchType(slug) {
            axios
                .post("http://127.0.0.1:8000/api/types/selected_types", {
                    selected_types: this.selected_types
                })
                .then(response => {
                    console.log(response);
                    this.restaurants = response.data.restaurants;
                    console.log(this.restaurants);
                    console.log(response.data.selected_types);
                })
                .catch(err => {
                    console.error(err);
                });
        }, */
        fetchAll() {
            axios
                .get(this.base_url + this.apiRestaurants)
                .then((response) => {
                    console.log(response.data);
                    this.restaurants = response.data.restaurants;
                    console.log(this.restaurants);
                })
                .catch((err) => {
                    console.error(err);
                });
        },
    },
    mounted() {

        this.getTypes(this.base_url + 'api/types');

        this.getRestaurants(this.base_url + this.apiRestaurants);

    },
}
</script>

<template>
    <!-- Intestazione della pagina -->
    <!--
    <div class="p-5 mb-4 jumbotron shadow">
        <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">
                Our Cocktails
                
            </h1>
            <p class="col-md-8 fs-4">
                "Embark on a Journey of Taste and Innovation Discover the Perfect
                Cocktail for Every Occasion"
            </p>
            <router-link to="/about" class="btn btn-primary btn-lg" type="button">About Us</router-link>
        </div>

    </div>
    -->

    <!-- Contenuto principale della pagina -->
    <div class="bg_my_back">

        <div class="container py-5">


            <!-- Sezione dei ristoranti -->
            <div v-if="!loading">

                <!-- Sezione delle tipologie di ristoranti -->
                <div class="d-flex justify-content-center gap-4 mb-5">

                    <!-- Bottone "See All Type" -->
                    <div class="d-flex">
                        <div class="types card bg-transparent border-0"
                            @click="getRestaurants(this.base_url + this.apiRestaurants)"
                            style="width: 5rem; text-align: center;">
                            <!-- Immagine all'interno della card -->
                            <img class="img-fluid rounded" src="../assets/img/provalogo.png" alt="See All Type">
                            <h5>All</h5>
                        </div>
                    </div>

                    <!-- Tipologie di ristoranti -->
                    <div class="d-flex" v-for="tipology in types">
                        <div class="types card bg-transparent border-0" @click="fetchType(tipology.slug)"
                            style="width: 6rem; text-align: center;">
                            <!-- Immagine all'interno della card -->
                            <img class="img-fluid rounded" :src="base_url + `storage/img/` + tipology.cover_image"
                                :alt="tipology.name">
                            <h5>{{ tipology.name }}</h5>
                        </div>
                    </div>

                </div>

                <!-- Griglia di cards per i ristoranti -->
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div class="animated_card col text-center" v-for="restaurant in restaurants">

                        <!-- Link alla pagina del ristorante -->
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">

                            <!-- Card del ristorante -->
                            <div class="card h-100 bg-transparent border-0">
                                <!-- Immagine del ristorante -->

                                <div class="card-img-top" v-if="restaurant.logo">
                                    <img class="img-fluid rounded" :src="base_url + `storage/` + restaurant.logo" alt="">
                                </div>
                                <div class="card-img-top" v-else>
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/delivery.jpeg`" alt="">
                                </div>
                                <!-- Nome del ristorante -->
                                <div class="card-body">
                                    <h4 class="card-title">{{ restaurant.name }}</h4>
                                </div>
                            </div>
                        </router-link>

                    </div>
                </div>

                <!-- Paginazione -->
                <div class="py-4">
                    <nav aria-label="Page navigation">
                        <ul class="pagination my-4">
                            <!-- Pulsanti di navigazione -->
                            <li class="page-item" v-for="link in this.links" :class="link.active ? 'active' : ''">
                                <!-- Utilizzo di v-for e v-bind per la paginazione dei risultati -->
                                <a class="page-link text-danger border-0" role="button" aria-label="Previous"
                                    v-html="link.label" @click="getRestaurants(link.url)">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="py-4" v-else>
                <Loader></Loader>
            </div>




        </div>
    </div>
</template>

<style lang="scss" scoped>
.restaurant_card:hover {
    transform: scale(1.05);
    /* Effetto di zoom-in al passaggio del mouse */
    transition: transform 0.3s ease;
    /* Animazione smooth del cambiamento */
}

.types:hover {
    transform: rotate(10deg) scale(1.3);
    /* Effetto di rotazione e zoom-in al passaggio del mouse */
    transition: transform 0.4s ease;
    /* Animazione smooth del cambiamento */
    filter: brightness(1.2);
    /* Aumento della luminosità */
    opacity: 0.9;
    /* Riduzione della trasparenza */
    background: linear-gradient(to bottom right, #ff7e5f, #feb47b);
    /* Aggiunta di un gradiente di sfondo */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    /* Aggiunta di ombra */
    cursor: pointer;
}
</style>



