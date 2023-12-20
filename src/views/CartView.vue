<script>
import { state } from '../state.js';
import axios from 'axios';
export default {
    name: 'CartView',
    data() {
        return {
            state,
            /* cartItems: [],
            cartPrice: null */
            loading: false,
            customer_name: '',
            customer_email: '',
            customer_phone: '',
            customer_address: '',
            customer_message: '',
        }

    },
    methods: {
        removeFromCart(item) {
            const index = state.selected_items.findIndex(cartItem => cartItem.id === item.id);

            if (index !== -1) {
                const removedItem = state.selected_items[index];

                // Verifica se la quantità è maggiore di 1 prima di decrementarla
                if (removedItem.quantity > 1) {
                    removedItem.quantity -= 1;
                    removedItem.itemsTotalPrice = item.price * removedItem.quantity;
                    state.totalPrice -= item.price;
                } else {
                    // Se la quantità è 1, rimuovi completamente l'articolo
                    state.selected_items.splice(index, 1);
                    state.totalPrice -= item.price;
                }

                state.saveItems();
                state.saveTotalPrice();
            }
        },
        calculateTotalPrice() {
            let totalPrice = 0;
            for (const item of this.state.selected_items) {
                totalPrice += item.itemsTotalPrice;
            }
            return totalPrice.toFixed(2); // Formatta il totale con due decimali
        },
        clearCart() {
            state.selected_items = [];
            state.saveItems();
            state.totalPrice = 0;
            state.saveTotalPrice();
            console.log(localStorage.getItem('selected_items'), 'LocalStorage Post svuotamento carrello');
            this.alert = false;
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



        /* sendForm() {

            const payload = {
                customer_name: this.customer_name,
                customer_email: this.customer_email,
                customer_phone: this.customer_phone,
                customer_address: this.customer_address,
                customer_message: this.customer_message,
            };
            console.log(payload);

            axios
                .post(this.state.base_url + 'api/emails', payload)
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.error(error.message);
                })
        } */
    },

    mounted() {
        /* this.cartItems = JSON.parse(state.savedItems);
        this.cartPrice = JSON.parse(state.savedPrice);
        console.log(state.savedItems);
        console.log(this.cartItems);
        console.log(this.cartPrice); */

        this.state.selected_items = JSON.parse(localStorage.getItem('selected_items'));

        this.state.totalPrice = parseInt(JSON.parse(localStorage.getItem('totalPrice')));

        console.log(state.totalPrice);
        /* this.cartPrice = JSON.parse(state.savedPrice); */

        if (this.state.selected_items == null) {
            this.state.selected_items = [];
        }

        console.log(this.state.selected_items, 'cart items');
        /* this.state.selected_items = localStorage.getItem('selected_items'); */
    }
}
</script>
<template>
    <div class="bg_my_back" style="min-height: 45vh;">
        <h1 class="text-center pt-5">Your Cart</h1>
        <div class="container mt-5">
            <div v-if="this.state.selected_items == []">
                <p class="text-center">Your Cart is empty</p>
            </div>
            <div class="container" v-else>

                <div class="row row-cols-1">
                    <div class="col">
                        <div class="row row-cols-1 row-cols-sm-4 align-items-center justify-content-around py-2 item_card bg_custom mt-3"
                            v-for="item in this.state.selected_items">

                            <div class="col d-flex align-items-center justify-content-center">

                                <img style="max-width: 150px" height="auto" v-if="item.cover_image != null"
                                    :src="state.base_url + 'storage/' + item.cover_image" class=" img-fluid " alt="">
                                <img style="max-width: 150px" height="auto" v-else
                                    :src="state.base_url + `storage/covers/panino.jpg`" class="" alt="">

                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <h4>{{ item.name }}</h4>
                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <div class="btn-group" role="group">
                                    <button class="btn btn-outline-secondary" @click="removeFromCart(item)">-</button>
                                    <button class="btn btn-outline-secondary">{{ item.quantity }}</button>
                                    <button class="btn btn-outline-secondary" @click="addToCart(item)">+</button>
                                </div>
                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <span>
                                    <h4>{{ item.itemsTotalPrice.toFixed(2) }} €</h4>
                                </span>
                            </div>
                        </div>
                        <div
                            class="row row-cols-1 row-cols-sm-4  align-items-center justify-content-around border-top   py-2 item_card bg_custom mt-3">

                            <div class="col d-flex align-items-center justify-content-start">

                               

                            </div>
                            <div class="col">

                            </div>
                            <div class="col  d-flex align-items-center justify-content-center">
                                <h4>Total:</h4>
                            </div>
                            <!-- <div class="col  d-flex align-items-center justify-content-center">
                                <h4>{{ state.totalPrice }} €</h4>
                            </div> -->

                            <div class="col  d-flex align-items-center justify-content-center">
                                <h4>{{ calculateTotalPrice() }} €</h4>
                            </div>

                        </div>
                    </div>
                    <div class="col">
                    </div>
                </div>





                <div class="row row-cols-1 row-cols-sm-4 align-items-center justify-content-around py-2 item_card bg_custom mt-3">

                <div class="col"></div>
                <div class="col"></div>
                <div class="col d-flex align-items-center justify-content-center">  <button @click="clearCart()" type="button" class="btn btn-secondary">
                                                    Clear Cart
                                                </button>
                                            </div>

                    <div class="col d-flex align-items-center justify-content-center ">
                        <button class="btn btn-outline-dark my-3 " type="button">
                            <router-link :to="{ name: 'Checkout' }">Go to Checkout</router-link>
                        </button>

                    </div>
                </div>

            </div>


        </div>
    </div>
</template>
<style></style>