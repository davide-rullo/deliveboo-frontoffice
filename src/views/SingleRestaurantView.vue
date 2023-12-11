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
                /* if (resp.data.success) {
                    console.log(resp.data.result);
                    this.restaurant = resp.data.result;
                    this.loading = false;
                } else {
                    console.log('Non trovata');
                    this.$router.push({ name: 'NotFound' })
                    this.loading = false;
                } */

            })
            .catch(err => {
                console.log(err.message);
            })

    }
}
</script>

<template>
    <div>
        <h1 class="p-5 mb-4 jumbo shadow rounded-bottom-5"> Restaurant: <span class="fw-bold">{{ restaurant.name }}</span>
        </h1>
        <div class="container">


            <div class="card mb-3 shadow-lg bg-dark text-white" v-if="!loading">

                <div class="row g-0 p-4">
                    <div class="col-lg-5 text-center py-2">


                        <img v-if="restaurant.logo != null" :src="this.base_url + '/storage/' + restaurant.logo"
                            class="img-fluid" alt="">
                        <img v-else :src="'https://picsum.photos/200/200?random=' + restaurant.id" class="img-fluid" alt="">


                    </div>
                    <div class="col-lg-7">
                        <div class="card-body">
                            <h5 class="card-title fs-4 my-4"><span class="text-white-50">Name:
                                </span>{{ restaurant.name }}
                            </h5>

                            <p class="card-text fs-5 py-4"><span class="text-white-50">Address:
                                </span>{{ restaurant.address }}</p>

                            <p class="card-text fs-5 py-4 text-white-50">Type: <span class="badge bg-secondary p-2">
                                    {{ restaurant.type ? restaurant.type.name : 'None' }}
                                </span></p>

                            <div class="d-flex" v-if="restaurant.type.length !== 0">
                                <span class="text-white-50">Type: </span>
                                <ul class="d-flex list-untyled gap-1 ps-2">


                                    <li class="badge bg-secondary" v-for="tipology in restaurant.types">
                                        <i class="fas fa-tag fa-xs fa-fw"></i>
                                        {{ tipology.name }}
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-footer d-flex justify-content-end bg-secondary bg-gradient align-items-center gap-4">








                </div>

            </div>

            <div class="d-flex gap-2 align-items-center" v-else>
                <Loader></Loader>
            </div>

        </div>

    </div>
</template>



<style></style>