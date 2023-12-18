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



        sendForm() {

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
        }
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
    <div class="bg_my_back">
        <h1 class="text-center pt-5">Your Cart</h1>
        <div class="container mt-5">
            <div v-if="this.state.selected_items == []">
                <p class="text-center">Your Cart is empty</p>
            </div>
            <div class="container" v-else>

                <div class="row row-cols-1 row-cols-md-2">
                    <div class="col">
                        <div class="row row-cols-1 row-cols-sm-4 align-items-center justify-content-around py-2 item_card bg_custom mt-3"
                            v-for="item in this.state.selected_items">

                            <div class="col d-flex align-items-center justify-content-center">

                                <img style="max-height: 100;" v-if="item.cover_image != null"
                                    :src="state.base_url + 'storage/' + item.cover_image" class=" img-fluid " alt="">
                                <img style="max-height: 100;" v-else :src="state.base_url + `storage/covers/panino.jpg`"
                                    class="" alt="">

                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <h4>{{ item.name }}</h4>
                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <div class="btn-group" role="group">
                                    <button class="btn btn-outline-secondary">-</button>
                                    <button class="btn btn-outline-secondary">{{ item.quantity }}</button>
                                    <button class="btn btn-outline-secondary" @click="addToCart(item)">+</button>
                                </div>
                            </div>
                            <div class="col d-flex align-items-center justify-content-center">
                                <span>
                                    <h4>{{ item.itemsTotalPrice }} €</h4>
                                </span>
                            </div>
                        </div>
                        <div
                            class="row row-cols-1 row-cols-sm-4  align-items-center justify-content-around border-top   py-2 item_card bg_custom mt-3">

                            <div class="col d-flex align-items-center justify-content-start">

                                <button @click="clearCart()" type="button" class="btn btn-secondary ms-3">
                                    Clear Cart
                                </button>

                            </div>
                            <div class="col  d-flex align-items-center justify-content-center">
                                <h4>Total:</h4>
                            </div>
                            <div class="col  d-flex align-items-center justify-content-center">
                                <h4>{{ state.totalPrice }} €</h4>
                            </div>
                        </div>
                    </div>
                    <div class="col">

                        <!-- Form -->
                        <form action="" @submit.prevent="sendForm()">
                            <!-- name -->
                            <div class="mb-3">
                                <label for="customer_name" class="form-label">Name</label>
                                <input type="text" class="form-control" name="customer_name" id="customer_name"
                                    aria-describedby="nameHelper" placeholder="Your Name" v-model="customer_name" />
                                <small id="nameHelper" class="form-text text-muted">Type your name</small>
                            </div>
                            <!-- email -->
                            <div class="mb-3">
                                <label for="customer_email" class="form-label">Email</label>
                                <input type="email" class="form-control" name="customer_email" id="customer_email"
                                    aria-describedby="emailHelper" placeholder="Your email" v-model="customer_email" />
                                <small id="emailHelper" class="form-text text-muted">Type your email</small>
                            </div>
                            <!-- phone -->
                            <div class="mb-3">
                                <label for="customer_phone" class="form-label">Phone</label>
                                <input type="text" class="form-control" name="customer_phone" id="customer_phone"
                                    aria-describedby="phoneHelper" placeholder="Your phone" v-model="customer_phone" />
                                <small id="phoneHelper" class="form-text text-muted">Type your phone number</small>
                            </div>
                            <!-- address -->
                            <div class="mb-3">
                                <label for="customer_address" class="form-label">Address</label>
                                <input type="text" class="form-control" name="customer_address" id="customer_address"
                                    aria-describedby="addressHelper" placeholder="Your address"
                                    v-model="customer_address" />
                                <small id="addressHelper" class="form-text text-muted">Type your address</small>
                            </div>
                            <!-- message -->
                            <div class="mb-3">
                                <label for="customer_message" class="form-label">Message</label>

                                <textarea name="customer_message" id="customer_message" rows="3" class="form-control"
                                    placeholder="Your message" v-model="customer_message"></textarea>
                                <small id="messageHelper" class="form-text text-muted">Type your message</small>
                            </div>

                            <button type="submit" class="btn btn-primary">
                                Send
                            </button>



                        </form>

                    </div>
                </div>





                <div class="row row-cols-1 row-cols-sm-4 pt-4 pb-4 justify-content-around">
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col d-flex  justify-content-end">
                        <button class="btn btn-primary">
                            Go to checkout
                        </button>

                    </div>
                </div>

            </div>


        </div>
    </div>
</template>
<style></style>