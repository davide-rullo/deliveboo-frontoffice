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



    },
}
</script>

<template>
    <div class="bg_my_orange  ">
        <div class="p-5 jumbotron shadow jumbo_img ">
            <div class="container  add-pb">


                <div class="row ">
                    <div class="col-lg-8">
                        <h1 class="display-4 fw-bolder ">
                            Unleash the flavor with DeliveBoo: where taste meets convenience!
                        </h1>
                        <p class="col-md-8  fs-4 text-black text-muted">
                            Order, savor, repeat. Booster the Rooster 🐓 will guide your culinary journey one bite at a
                            time. 🍔
                            #DeliveBooMagic"
                        </p>
                    </div>
                    <div class="col-lg-2 add-space">




                    </div>

                </div>
            </div>
        </div>
    </div>


    <!-- END JUMBO -->

    <div class="content">
        <svg id="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 280" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stop-color="rgba(255, 173, 173, 1)" offset="0%"></stop>
                    <stop stop-color="rgba(255, 173, 173, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)"
                d="M0,112L60,121.3C120,131,240,149,360,144.7C480,140,600,112,720,116.7C840,121,960,159,1080,144.7C1200,131,1320,65,1440,74.7C1560,84,1680,168,1800,191.3C1920,215,2040,177,2160,154C2280,131,2400,121,2520,121.3C2640,121,2760,131,2880,140C3000,149,3120,159,3240,158.7C3360,159,3480,149,3600,154C3720,159,3840,177,3960,182C4080,187,4200,177,4320,168C4440,159,4560,149,4680,144.7C4800,140,4920,140,5040,144.7C5160,149,5280,159,5400,163.3C5520,168,5640,168,5760,182C5880,196,6000,224,6120,238C6240,252,6360,252,6480,228.7C6600,205,6720,159,6840,154C6960,149,7080,187,7200,205.3C7320,224,7440,224,7560,196C7680,168,7800,112,7920,79.3C8040,47,8160,37,8280,65.3C8400,93,8520,159,8580,191.3L8640,224L8640,280L8580,280C8520,280,8400,280,8280,280C8160,280,8040,280,7920,280C7800,280,7680,280,7560,280C7440,280,7320,280,7200,280C7080,280,6960,280,6840,280C6720,280,6600,280,6480,280C6360,280,6240,280,6120,280C6000,280,5880,280,5760,280C5640,280,5520,280,5400,280C5280,280,5160,280,5040,280C4920,280,4800,280,4680,280C4560,280,4440,280,4320,280C4200,280,4080,280,3960,280C3840,280,3720,280,3600,280C3480,280,3360,280,3240,280C3120,280,3000,280,2880,280C2760,280,2640,280,2520,280C2400,280,2280,280,2160,280C2040,280,1920,280,1800,280C1680,280,1560,280,1440,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z">
            </path>
        </svg>
        <div class="bg_my_light-pink shadow word-carousel">

            <div class="container waves-inside">

                <div class="row">
                    <div class="col-12 col-md-4 text-center">
                        <img class="img-fluid position-relative z-2" width="200px" src="../assets/img/mockup-definitivo.png"
                            alt="">
                    </div>
                    <div class="col-12 col-md-8 text-center d-flex flex-column justify-content-center pb-4">

                        <div class="row row-cols-1 row-cols-xl-2  p-3 justify-content-center">
                            <div class="col ">
                                <h2 class="display-4 ">Today I need</h2>
                            </div>
                            <div class="col">
                                <WordRotation class="bg_my_dark-pink rounded-pill word-rot d-flex justify-content-center">
                                </WordRotation>
                            </div>
                        </div>
                        <div class="">
                            <h3 class="text-muted">"Unleash the convenience power with Deliveboo and Booster the Rooster!
                                Order your favorite dishes with just a tap on your smartphone and let the magic of flavor
                                come straight to your doorstep. Let's turbocharge the food experience together, delivered
                                with a touch of Booster's joy!"</h3>
                        </div>
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
        <svg id="wave" style="transform:rotate(180deg); transition: 0.3s" viewBox="0 0 1440 280" version="1.1"
            xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
                    <stop stop-color="rgba(255, 173, 173, 1)" offset="0%"></stop>
                    <stop stop-color="rgba(255, 173, 173, 1)" offset="100%"></stop>
                </linearGradient>
            </defs>
            <path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)"
                d="M0,112L60,121.3C120,131,240,149,360,144.7C480,140,600,112,720,116.7C840,121,960,159,1080,144.7C1200,131,1320,65,1440,74.7C1560,84,1680,168,1800,191.3C1920,215,2040,177,2160,154C2280,131,2400,121,2520,121.3C2640,121,2760,131,2880,140C3000,149,3120,159,3240,158.7C3360,159,3480,149,3600,154C3720,159,3840,177,3960,182C4080,187,4200,177,4320,168C4440,159,4560,149,4680,144.7C4800,140,4920,140,5040,144.7C5160,149,5280,159,5400,163.3C5520,168,5640,168,5760,182C5880,196,6000,224,6120,238C6240,252,6360,252,6480,228.7C6600,205,6720,159,6840,154C6960,149,7080,187,7200,205.3C7320,224,7440,224,7560,196C7680,168,7800,112,7920,79.3C8040,47,8160,37,8280,65.3C8400,93,8520,159,8580,191.3L8640,224L8640,280L8580,280C8520,280,8400,280,8280,280C8160,280,8040,280,7920,280C7800,280,7680,280,7560,280C7440,280,7320,280,7200,280C7080,280,6960,280,6840,280C6720,280,6600,280,6480,280C6360,280,6240,280,6120,280C6000,280,5880,280,5760,280C5640,280,5520,280,5400,280C5280,280,5160,280,5040,280C4920,280,4800,280,4680,280C4560,280,4440,280,4320,280C4200,280,4080,280,3960,280C3840,280,3720,280,3600,280C3480,280,3360,280,3240,280C3120,280,3000,280,2880,280C2760,280,2640,280,2520,280C2400,280,2280,280,2160,280C2040,280,1920,280,1800,280C1680,280,1560,280,1440,280C1320,280,1200,280,1080,280C960,280,840,280,720,280C600,280,480,280,360,280C240,280,120,280,60,280L0,280Z">
            </path>
        </svg>

    </div>

    <div class="selected ">
        <h2 class="title-padding display-5 my_text_dark-pink">Discover the best restaurants near you!</h2>

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
.swiper {
    padding-bottom: 100px;
}

.selected {
    background-color: #ffadad48;
    padding-top: 9rem;
    margin-top: -14rem;
}

.jumbotron {
    padding: 3rem 3rem 10rem 3rem;
}


.jumbo_img {
    background: url('../assets/img/jumbo.png');
    background-position: top right;
    background-repeat: no-repeat;


}

.overlay {
    height: 100%;
    position: relative;
    background-color: #0000007a;

}

.content {
    margin-top: -14rem;
}

.title-padding {
    padding-top: 5rem;
    text-align: center;
}



.booster {
    padding-bottom: 8rem;
}


.waves-inside {
    margin: -1rem auto;
}

.add-pb {
    padding-bottom: 5rem;
}

.add-space {
    height: 70px;
}

@media (max-width: 992px) {
    .jumbo_img {
        background-image: none;
    }
}
</style>