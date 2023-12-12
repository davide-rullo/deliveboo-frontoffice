<script>

import Carosello from '../components/Carosello.vue';
import WordRotation from '../components/WordRotation.vue';
import axios from 'axios';

/* // Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules'; */



export default {
    name: 'HomeView',
    components: {
        WordRotation,
        Carosello
    },
    /* setup() {
        return {
            modules: [EffectCoverflow, Pagination],

        };
    }, */
    data() {
        return {
            selected: null,
            base_url: 'http://127.0.0.1:8000/',
            restaurant_selected: 'api/selected',
        }
    },
    mounted() {
        axios
            .get(this.base_url + this.restaurant_selected)
            .then(response => {
                console.log(response);
                this.selected = response.data.selected

            })
            .catch(err => {
                console.error(err);
            })



    }
}
</script>

<template>
    <div class="bg_my_back">
        <div class="p-5 jumbotron shadow jumbo_img rounded-5">
            <div class="container-fluid py-5">
                <div class="row">
                    <div class="col-8">
                        <h1 class="display-5 fw-bold">
                            Unleash the flavor with DeliveBoo: where taste meets convenience!

                        </h1>
                        <p class="col-md-8 fs-4 text-black">
                            Order, savor, repeat. Booster the Rooster 🐓 will guide your culinary journey one bite at a
                            time. 🍔
                            #DeliveBooMagic"
                        </p>
                    </div>
                    <div class="col-2">
                        <img class="img-fluid" src="../assets/img/pollo.png" alt="">
                    </div>
                </div>
                <router-link to="/searching" class="btn bg_my_dark-pink btn-lg" type="button">See All
                    Restaurants</router-link>
            </div>
        </div>
    </div>
    <div class="bg_my_back">

        <div class="container py-5">

            <div class="d-flex justify-content-center  align-items-center">
                <div class="col-3 text-end mx-4">
                    <h2>Today I need</h2>
                </div>
                <div class="col-3  text-center px-1">
                    <WordRotation class="bg_my_dark-pink rounded-pill py-2"></WordRotation>
                </div>
            </div>

        </div>
    </div>
    <div class="selected bg_my_back">
        <h2 class="text-center pt-5">Discover the best restaurants near you!</h2>
        <div class="container d-flex align-items-center pb-5">

            <Carosello></Carosello>
            <!-- <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'"
                :coverflowEffect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }" :pagination="true" :modules="modules" class="mySwiper" :initialSlide="2">
                <swiper-slide v-for="restaurant in selected ">
                    <div class="card h-100 bg-transparent shadow border-0 rounded-top-0 rounded-bottom-5">
                        <div class="card-img-top rounded-top-0 rounded-bottom-5" v-if="restaurant.logo">
                            <img class="img-fluid rounded-bottom-5" :src="base_url + `storage/` + restaurant.logo" alt="">
                        </div>
                        <div class="card-img-top rounded-top-0" v-else>

                            <img class="img-fluid rounded-top-0 rounded-bottom-5"
                                :src="base_url + `storage/img/delivery.jpeg`" alt="">
                        </div>

                        <div class="card-body">
                            <h4 class="card-title">{{ restaurant.name }}</h4>

                        </div>
                    </div>
                </swiper-slide>

            </swiper> -->

        </div>


    </div>
</template>



<style lang="scss" scoped>
/*.selected {
    background-image: url('../../src/assets/img/banner.jpg');
    background-size: cover;
    background-repeat: no-repeat;
}*/

/* .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
}

.swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
}

.swiper-slide img {
    display: block;
    width: 100%;
} */

/* .selected {
    background-color: #ffadad48;
} */

.jumbo_img {
    background-image: url(../assets/img/jumbo.png);
    background-position: top;
    background-position: right;
    background-repeat: no-repeat;

}
</style>