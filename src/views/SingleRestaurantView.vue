<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
/* import { this } from '../this.js'; */

export default {
    name: 'SingleRestaurantView',
    components: {
        Loader
    },
    data() {
        return {
            /* this, */
            restaurant: {},
            base_url: 'http://127.0.0.1:8000/',
            restaurant_api: 'api/restaurants/',
            loading: true,
        }
    },
    mounted() {
        const url = this.base_url + this.restaurant_api + this.$route.params.slug;
        axios.get(url)
            .then(resp => {
                console.log(resp);
                if (resp.data.success) {
                    console.log(resp.data.result);
                    this.restaurant = resp.data.result;
                    this.loading = false;
                } else {
                    console.log('Non trovata');
                    this.$router.push({ name: 'NotFound' })
                    this.loading = false;
                }

            })
            .catch(err => {
                console.log(err.message);
            })

    }
}
</script>

<template>
    <div class="bg_my_light-pink">
        <!-- <h1 class="p-5 mb-4 jumbo shadow rounded-bottom-5"> Restaurant: <span class="fw-bold">{{ restaurant.name }}</span>
        </h1> -->
        <div class="container">
            <button class="btn btn-outline-dark my-3" type="button">
                <router-link class="nav-link" to="/searching">
                    Back to restaurants
                </router-link>
            </button>


            <div v-if="!loading">
                <div class="card mb-3 shadow bg_my_dark-pink border-0">

                    <div class="row g-0 p-4">
                        <div class="col-lg-5 text-center py-2">


                            <img v-if="restaurant.logo != null" :src="this.base_url + 'storage/' + restaurant.logo"
                                class="img-fluid" alt="">
                            <img v-else :src="'https://picsum.photos/200/200?random=' + restaurant.id" class="img-fluid"
                                alt="">


                        </div>
                        <div class="col-lg-7">
                            <div class="card-body">
                                <h5 class="card-title display-6 my-4"><span class="text-white">Restaurant:
                                    </span>{{ restaurant.name }}
                                </h5>

                                <p class="card-text fs-5 py-2"><span class="text-white">Address:
                                    </span>{{ restaurant.address }}</p>
                                <p class="card-text fs-5 py-2"><span class="text-white">Phone:
                                    </span>{{ restaurant.phone }}</p>


                                <div class="row row-cols-7">
                                    <div class="d-flex col align-items-baseline" v-if="restaurant.types.length !== 0">
                                        <span class="text-white card-text fs-5 py-2">Type: </span>
                                        <ul class="d-flex align-items-center list-untyled gap-2 ps-2 flex-wrap g-3">


                                            <li class="badge text-black bg_my_dark-pink"
                                                v-for="tipology in restaurant.types">
                                                <i class="fas fa-tag fa-xs fa-fw"></i>
                                                {{ tipology.name }}
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
                <h4 class="text-center mt-5 display-4 my_text_dark-pink">Our Menu</h4>
                <div class="row row-cols-1 row-cols-lg-2 pb-5 g-3">

                    <div class="col" v-for="plate in restaurant.plates">


                        <div class="animated_card card h-100 mb-3 shadow">
                            <div class="row g-0">
                                <div class="col-md-4 p-2 align-self-center">
                                    <img v-if="plate.cover_image != null"
                                        :src="this.base_url + 'storage/' + plate.cover_image" class="img-fluid card-img "
                                        alt="">
                                    <img v-else :src="'https://picsum.photos/150/100?random=' + plate.id" class=" card-img"
                                        alt="">

                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <div class="d-flex justify-content-between">
                                            <h5 class="card-title">
                                                {{ plate.name }}


                                            </h5>
                                            <h5 class="card-text my_text_dark-pink">{{ plate.price }} €</h5>
                                        </div>

                                        <p class="card-text mb-1">{{ plate.description }}</p>
                                        <p class="card-text mb-1"><small class="text-body-secondary">{{
                                            plate.ingredients
                                        }}</small>
                                        </p>

                                        <p v-if="(plate.is_available === 1)" class="card-text">Available: ✅</p>
                                        <p v-else>Available: ❌</p>

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>




            <div class="d-flex gap-2 align-items-center" v-else>
                <Loader></Loader>
            </div>

        </div>

    </div>
</template>



<style></style>