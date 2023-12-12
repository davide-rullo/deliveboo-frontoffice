<script>
import axios from 'axios';
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

        }
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
            axios
                .get(this.base_url + 'api/types/' + slug)
                .then(response => {
                    console.log(response);
                    this.restaurants = response.data.result.restaurants;
                    console.log(this.restaurants);
                })
                .catch(err => {
                    console.error(err);
                });
        },
        fetchAll() {
            axios
                .get(this.base_url + this.apiRestaurants)
                .then((response) => {
                    console.log(response);
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
    <!-- <div class="p-5 mb-4 jumbotron shadow">
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
    </div> -->
    <div class="bg_my_light-pink">
        <div class="container py-5">
            <div class="d-flex justify-content-center gap-3 mb-5">

                <div class="d-flex">
                    <button class="btn btn-primary" @click="getRestaurants(this.base_url + this.apiRestaurants)">
                        See All Type
                    </button>

                </div>

                <div class="d-flex" v-for="tipology in types">
                    <button class="btn btn-primary" @click="fetchType(tipology.slug)">
                        {{ tipology.name }}
                    </button>

                </div>


            </div>

            <div v-if="!loading">

                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div class="restaurant_card col text-center" v-for="restaurant in restaurants">

                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                            <div class="card h-100 bg_my_light-pink shadow border-0">
                                <div class="card-img-top" v-if="restaurant.logo">
                                    <img class="img-fluid rounded" :src="base_url + `storage/` + restaurant.logo" alt="">
                                </div>
                                <div class="card-img-top" v-else>
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/delivery.jpeg`" alt="">
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title">{{ restaurant.name }}</h4>
                                </div>
                            </div>
                        </router-link>

                    </div>
                </div>

                <div class="py-4">
                    <nav aria-label="Page navigation">
                        <ul class="pagination my-4">
                            <li class="page-item" v-for="link in this.links" :class="link.active ? 'active' : ''">
                                <!-- use v-for and v-bind on html to paginate the results -->
                                <a class="page-link text-danger border-0" role="button" aria-label="Previous"
                                    v-html="link.label" @click="getRestaurants(link.url)">
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>

.restaurant_card:hover {
    transform: scale(1.05); /* Effetto di zoom-in al passaggio del mouse */
    transition: transform 0.3s ease; /* Animazione smooth del cambiamento */
}

</style>



