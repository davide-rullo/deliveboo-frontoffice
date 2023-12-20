<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

export default {
    name: 'SearchingView',
    data() {
        return {
            base_url: 'http://127.0.0.1:8000/',
            apiRestaurants: 'api/restaurants',
            restaurants: [],
            links: [],
            currentPage: 1,
            lastPage: null,
            loading: true,
            types: null,
            selected_types: [],
            modules: [Navigation],

        };
    },
    components: {
        Loader,
        Swiper,
        SwiperSlide,
    },
    methods: {
        getTypes(url) {
            axios
                .get(url)
                .then((response) => {
                    console.log(response);
                    this.types = response.data.types;
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        getRestaurants(url) {
            axios
                .get(url)
                .then((response) => {
                    console.log(response);
                    // Resetta l'array delle tipologie selezionate
                    this.selected_types = [];
                    this.restaurants = response.data.restaurants.data;
                    this.links = response.data.restaurants.links;
                    console.log(this.links);
                    this.lastPage = response.data.restaurants.last_page;
                    this.loading = false;
                })
                .catch((err) => {
                    console.error(err);
                });
        },

        fetchType(slug) {
            const isSelected = this.selected_types.includes(slug);

            if (isSelected) {
                let index = this.selected_types.indexOf(slug);
                this.selected_types.splice(index, 1);
            } else {
                this.selected_types.push(slug);
            }

            axios
                .post('http://127.0.0.1:8000/api/types/selected_types', {
                    selected_types: this.selected_types,
                })
                .then((response) => {
                    console.log(response);
                    this.restaurants = response.data.restaurants;
                    console.log(this.restaurants);
                    console.log(response.data.selected_types);
                })
                .catch((err) => {
                    console.error(err);
                });
        },

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
};
</script>

<template>
    <div class="bg_my_back">
        <div class="container">

            <div v-if="!loading">

                <!-- Swiper per schermi larghi (xl) -->
                <swiper :rewind="true" :navigation="true" :modules="modules"
                    class="mySwiper p-0 d-none d-sm-none d-md-none d-lg-none d-xl-block" :slides-per-view="7">
                    <!-- Bottone "See All Type" -->
                    <swiper-slide class="d-flex justify-content-center align-items-center">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9 mb-3">
                            <div class="col">
                                <div class="types card bg-transparent border-0"
                                    @click="getRestaurants(base_url + apiRestaurants)">
                                    <img class="img-fluid rounded" src="../assets/img/provalogo.png" alt="See All Type" />
                                    <h5>All</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <!-- Altri tipi -->
                    <swiper-slide class="d-flex justify-content-center align-items-center" v-for="tipology in types"
                        :key="tipology.id">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9">
                            <div class="col">
                                <div class="types card bg-transparent border-0" @click="fetchType(tipology.slug)"
                                    :class="{ 'active-type': selected_types.includes(tipology.slug) }">
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/` + tipology.cover_image"
                                        :alt="tipology.name" />
                                    <h5>{{ tipology.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>


                <!-- Swiper per schermi larghi (lg) -->
                <swiper :rewind="true" :navigation="true" :modules="modules"
                    class="mySwiper p-0 d-none d-sm-none d-md-none d-lg-block d-xl-none" :slides-per-view="6">
                    <!-- Bottone "See All Type" -->
                    <swiper-slide class="d-flex justify-content-center align-items-center">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9 mb-3">
                            <div class="col">
                                <div class="types card bg-transparent border-0"
                                    @click="getRestaurants(base_url + apiRestaurants)">
                                    <img class="img-fluid rounded" src="../assets/img/provalogo.png" alt="See All Type" />
                                    <h5>All</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <!-- Altri tipi -->
                    <swiper-slide class="d-flex justify-content-center align-items-center" v-for="tipology in types"
                        :key="tipology.id">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9">
                            <div class="col">
                                <div class="types card bg-transparent border-0" @click="fetchType(tipology.slug)"
                                    :class="{ 'active-type': selected_types.includes(tipology.slug) }">
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/` + tipology.cover_image"
                                        :alt="tipology.name" />
                                    <h5>{{ tipology.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Swiper per schermi medi (md) -->
                <swiper :rewind="true" :navigation="true" :modules="modules"
                    class="mySwiper p-0 d-none d-sm-none d-md-block d-lg-none d-xl-none" :slides-per-view="4">
                    <!-- Bottone "See All Type" -->
                    <swiper-slide class="d-flex justify-content-center align-items-center">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9 mb-3">
                            <div class="col">
                                <div class="types card bg-transparent border-0"
                                    @click="getRestaurants(base_url + apiRestaurants)">
                                    <img class="img-fluid rounded" src="../assets/img/provalogo.png" alt="See All Type" />
                                    <h5>All</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <!-- Altri tipi -->
                    <swiper-slide class="d-flex justify-content-center align-items-center" v-for="tipology in types"
                        :key="tipology.id">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9">
                            <div class="col">
                                <div class="types card bg-transparent border-0" @click="fetchType(tipology.slug)"
                                    :class="{ 'active-type': selected_types.includes(tipology.slug) }">
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/` + tipology.cover_image"
                                        :alt="tipology.name" />
                                    <h5>{{ tipology.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Swiper per schermi piccoli (sm) -->
                <swiper :rewind="true" :navigation="true" :modules="modules"
                    class="mySwiper p-0 d-sm-block d-md-none d-lg-none d-xl-none" :slides-per-view="2">
                    <!-- Bottone "See All Type" -->
                    <swiper-slide class="d-flex justify-content-center align-items-center">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9 mb-3">
                            <div class="col">
                                <div class="types card bg-transparent border-0"
                                    @click="getRestaurants(base_url + apiRestaurants)">
                                    <img class="img-fluid rounded" src="../assets/img/provalogo.png" alt="See All Type" />
                                    <h5>All</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>

                    <!-- Altri tipi -->
                    <swiper-slide class="d-flex justify-content-center align-items-center" v-for="tipology in types"
                        :key="tipology.id">
                        <div class="row row-cols-2 row-cols-md-6 row-cols-lg-9">
                            <div class="col">
                                <div class="types card bg-transparent border-0" @click="fetchType(tipology.slug)"
                                    :class="{ 'active-type': selected_types.includes(tipology.slug) }">
                                    <img class="img-fluid rounded" :src="base_url + `storage/img/` + tipology.cover_image"
                                        :alt="tipology.name" />
                                    <h5>{{ tipology.name }}</h5>
                                </div>
                            </div>
                        </div>
                    </swiper-slide>
                </swiper>

                <!-- Griglia di cards per i ristoranti -->
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                    <div class="animated_card col text-center" v-for="restaurant in restaurants" :key="restaurant.id">
                        <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                            <div class="card h-100 bg-transparent border-0 restaurant_card">
                                <div class="card-img-top" v-if="restaurant.logo">
                                    <img class="img-fluid rounded-5" :src="base_url + `storage/` + restaurant.logo"
                                        alt="" />
                                </div>
                                <div class="card-img-top" v-else>
                                    <img class="img-fluid rounded-5" :src="base_url + `storage/img/delivery.jpeg`" alt="" />
                                </div>
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
                        <ul class="pagination justify-content-center my-4">
                            <li class="page-item" v-for="link in links" :class="link.active ? 'active' : ''"
                                :key="link.label">
                                <a class="page-link text-danger border-0" role="button" aria-label="Page {{ link.label }}"
                                    v-html="link.label" @click="getRestaurants(link.url)"></a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="vh-100 d-flex gap-2 align-items-center justify-content-center" v-else>
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

.types {
    /* Alcune proprietà di base */
    width: 6rem;
    text-align: center;
    transition: transform 0.4s ease, filter 0.4s ease, opacity 0.4s ease, box-shadow 0.4s ease;

    /* Stili di default */
    background: transparent;
    filter: brightness(1);
    opacity: 1;
    box-shadow: none;
    cursor: pointer;

    &:hover {
        transform: rotate(10deg) scale(1.3);
        filter: brightness(1.2);
        opacity: 0.9;
        background: linear-gradient(to bottom right, #ff7e5f, #feb47b);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
}

.types.active-type {
    transform: rotate(10deg) scale(1.3);
    filter: brightness(1.2);
    opacity: 0.9;
    background: linear-gradient(to bottom right, #eb585b, #ffadad);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}

.pagination {
    .page-item {
        &.active {
            .page-link {
                background-color: #ffadad; // Colore di sfondo quando attivo
                border-color: #eb585b; // Colore del bordo quando attivo
                color: #fff; // Colore del testo quando attivo
            }
        }

        &:hover {
            .page-link {
                background-color: #ffd6a5; // Colore di sfondo al passaggio del mouse
                border-color: #ffadad; // Colore del bordo al passaggio del mouse
                color: #fff; // Colore del testo al passaggio del mouse
            }
        }
    }

    .page-link {
        background-color: transparent; // Colore di sfondo predefinito
        border-color: #eb585b; // Colore del bordo predefinito
        color: #eb585b; // Colore del testo predefinito

        &:focus {
            box-shadow: none; // Rimuovi la ombra al focus
        }
    }
}
</style>