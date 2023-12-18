<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';
import Cart from './CartView.vue';
import { state } from '../state.js';
/* import { this } from '../this.js'; */

export default {
    name: 'SingleRestaurantView',
    components: {
        Loader,
        state,
        Cart
    },
    data() {
        return {
            /* this, */
            restaurant: {},
            plates: {},
            base_url: 'http://127.0.0.1:8000/',
            restaurant_api: 'api/restaurants/',
            loading: true,
            alert: false,

        }
    },
    methods: {

        removeFromCart(item) {
            const index = state.selected_items.findIndex(cartItem => cartItem.id === item.id);

            if (index !== -1) {
                const removedItem = state.selected_items.splice(index, 1)[0];
                state.totalPrice -= removedItem.itemsTotalPrice;
                state.saveItems();
                state.saveTotalPrice();
            }
        },



        getPlateQuantity(plate) {
            const selectedPlate = state.selected_items.find(item => item.id === plate.id);
            return selectedPlate ? selectedPlate.quantity : 0;
        },


        addToCart(item) {

            if (state.selected_items != [] && state.selected_items[0] !== undefined) {
                /*  console.log(state.selected_items[0], 'carr undefined'); */
                console.log(state.selected_items[0]);
                if (state.selected_items[0].restaurant_id !== item.restaurant_id) {
                    console.log(state.selected_items[0].restaurant_id, 'id_restaurant');
                    this.alert = true;
                    /* console.log(this.alert, 'addToCart'); */
                    return;
                }
            }


            const existItem = state.selected_items.find(
                (selectedPlate) => selectedPlate.id === item.id);
            console.log(existItem);

            if (existItem) {
                existItem.quantity += 1;
                existItem.itemsTotalPrice = item.price * existItem.quantity;
                state.totalPrice = item.price * existItem.quantity;
            } else {
                state.selected_items.push(item);
                item['quantity'] = 1;
                item['itemsTotalPrice'] = item.price * item.quantity;

                state.totalPrice += item.price;
            }

            state.saveItems();
            state.saveTotalPrice();

            console.log(state.selected_items, 'carrello');








            /* state.selected_items.push(item);
            localStorage.setItem('selected_items', JSON.stringify(state.selected_items));
            console.log(state.selected_items, "selected_items all'aggiunta di un oggetto dal localStorage");
            console.log(localStorage.getItem('selected_items'), "localStorage all aggiunta di un oggetto"); */

        },


        clearCart() {
            state.selected_items = [];
            state.saveItems();
            state.totalPrice = 0;
            state.saveTotalPrice();

            this.alert = false;
        },

        modalClose() {
            this.alert = false;
        },


        removeFromCart(item) {
            const index = state.selected_items.findIndex(cartItem => cartItem.id === item.id);

            if (index !== -1) {
                const removedItem = state.selected_items.splice(index, 1)[0];
                state.totalPrice -= removedItem.itemsTotalPrice;
                state.saveItems();
                state.saveTotalPrice();
            }
        },




    },



    mounted() {

        const url = this.base_url + this.restaurant_api + this.$route.params.slug;
        axios.get(url)
            .then(resp => {
                //console.log(resp);
                if (resp.data.success) {
                    console.log(resp.data.result);
                    console.log(this.$route.params.slug);

                    this.restaurant = resp.data.result.restaurant;
                    this.plates = resp.data.result.plates;
                    this.loading = false;
                } else {
                    console.log(resp.data.result + "non trovata");
                    console.log('Non trovata');
                    this.$router.push({ name: 'NotFound' })
                    this.loading = false;
                }

            })
            .catch(err => {
                console.log(err.message);
                this.$router.push({ name: 'NotFound' })
                this.loading = false;
            })

        console.log(state.selected_items, 'questo');
        console.log(this.alert, 'mounted');
        console.log(state.savedItems, 'carrello salvato');

        /* console.log(localStorage.getItem('selected_items'), 'localStorage al momento del caricamento della pagina');
        state.selected_items = JSON.parse(localStorage.getItem('selected_items')) || [];
        console.log(state.selected_items, "selected_items al momento del caricamento della pagina"); */

        //Per ripulire localStorage e selected_items in fase di test
        /* localStorage.removeItem('selected_items');
        state.selected_items = [];
        console.log(state.selected_items);
        console.log(localStorage.getItem('selected_items')); */

        //this.clearCart();




    }
};
</script>

<template>
    <div class="bg_my_back">
        <!-- <h1 class="p-5 mb-4 jumbo shadow rounded-bottom-5"> Restaurant: <span class="fw-bold">{{ restaurant.name }}</span>
        </h1> -->
        <div class="container">

            <button class="btn btn-outline-dark my-3" type="button">
                <router-link class="nav-link" to="/searching">
                    Back to restaurants
                </router-link>
            </button>




            <div v-if="!loading">
                <div class="card mb-3 shadow bg_my_dark-pink border-0 rounded-5">

                    <div class="row g-0 p-4">
                        <div class="col-lg-5 text-center py-2">


                            <img v-if="restaurant.logo != null" :src="this.base_url + 'storage/' + restaurant.logo"
                                class="img-fluid rounded-5" alt="">
                            <img v-else :src="base_url + `storage/img/delivery.jpeg`" class="img-fluid rounded-5" alt="">


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
                                    <div class="d-flex col align-items-baseline"
                                        v-if="restaurant.types && restaurant.types.length !== 0">
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
                <h4 class="text-center mt-5 display-4 my_text_dark-pink">Menu</h4>
                <div class="row row-cols-1 row-cols-lg-2 pb-5 g-3">

                    <div class="col" v-for="plate in plates">


                        <div class="animated_card card h-100 mb-3 shadow rounded-5">
                            <div class="row g-0">
                                <div class="col-md-4 p-2 align-self-center">
                                    <img v-if="plate.cover_image != null"
                                        :src="this.base_url + 'storage/' + plate.cover_image"
                                        class="img-fluid card-img rounded-5" alt="">
                                    <img v-else :src="base_url + `storage/covers/panino.jpg`" class="card-img rounded-5"
                                        alt="">

                                </div>
                                <div class="col-md-8">
                                    <div class="card-body py-3">
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

                                        <!-- <p v-if="(plate.is_available === 1)" class="card-text">Available: ✅</p>
                                        <p v-else>Available: ❌</p> -->

                                        <!-- <p v-if="(plate.is_available === 1)" class="card-text">Available: ✅</p>
                                        <p v-else>Available: ❌</p> -->

                                        <div class="btn-group" role="group">
                                            <button class="btn btn-outline-secondary"
                                                @click="removeFromCart(plate)">-</button>

                                            <button class="btn btn-outline-secondary">{{ getPlateQuantity(plate) }}</button>
                                            <button class="btn btn-outline-secondary" @click="addToCart(plate)">+</button>
                                        </div>
                                        <!-- <div>
                                            <button class="btn btn-dark" @click="addToCart(plate)">Add to Cart</button>
                                        </div> -->

                                        <router-link to="/cart" class="ms-2 text-decoration-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#eb585b"
                                                class="bi bi-cart2" viewBox="0 0 16 16">
                                                <path
                                                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                            </svg>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <!-- Modal Body -->
                <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
                <div class="modal" tabindex="-1" :class="{ show: alert }">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header flex-column">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                                    @click="modalClose"></button>

                                <h5 class="modal-title my_text_dark-pink fw-bold fs-3">
                                    Warning!
                                </h5>
                            </div>
                            <div class="modal-body">
                                <p class="fs-5">
                                    You can't add dish from different restaurants on the same order. Do You want to clear
                                    Your cart?
                                </p>
                            </div>
                            <button @click="clearCart(), closeErrorModal" type="button" class="btn btn-success">
                                Clear Cart
                            </button>
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



<style>
.modal.show {
    display: block;
}
</style>