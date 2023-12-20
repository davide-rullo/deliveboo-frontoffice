<script>
import axios from 'axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/scss';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';



export default {
    name: 'Carosello',

    components: {
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            selected: null,
            base_url: 'http://127.0.0.1:8000/',
            restaurant_selected: 'api/selected',
        }
    },
    setup() {
        return {
            modules: [EffectCoverflow, Pagination],

        };
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
    <swiper :effect="'coverflow'" :grabCursor="true" :centeredSlides="true" :slidesPerView="'auto'" :coverflowEffect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    }" :pagination="true" :modules="modules" class="mySwiper" :initialSlide="2">
        <swiper-slide v-for="restaurant in selected ">
            <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                <div class="card h-100 bg-transparent shadow border-0 rounded-top-0 rounded-bottom-5">
                    <div class="card-img-top rounded-top-0 rounded-bottom-5" v-if="restaurant.logo">
                        <img class="img-fluid rounded-bottom-5" :src="base_url + `storage/` + restaurant.logo" alt="">
                    </div>
                    <div class="card-img-top rounded-top-0" v-else>

                        <img class="img-fluid rounded-top-0 rounded-bottom-5" :src="base_url + `storage/img/delivery.jpeg`"
                            alt="">
                    </div>

                    <div class="card-body">
                        <h4 class="card-title">{{ restaurant.name }}</h4>

                    </div>
                </div>
            </router-link>
        </swiper-slide>

    </swiper>
</template>


<style lang="scss">
.swiper {
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
}
</style>