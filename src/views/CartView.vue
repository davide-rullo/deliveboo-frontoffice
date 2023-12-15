<script>
import { state } from '../state.js';
export default {
    name: 'CartView',
    data() {
        return {
            state,
            /* cartItems: [],
            cartPrice: null */
        }

    },
    methods: {

    },

    mounted() {
        /* this.cartItems = JSON.parse(state.savedItems);
        this.cartPrice = JSON.parse(state.savedPrice);
        console.log(state.savedItems);
        console.log(this.cartItems);
        console.log(this.cartPrice); */

        this.state.selected_items = JSON.parse(localStorage.getItem('selected_items'));

        this.state.totalPrice = parseInt(JSON.parse(localStorage.getItem('totalPrice')));

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

                <div class="row row-cols-1 row-cols-sm-4 align-items-center justify-content-around py-2 item_card bg_custom mt-3"
                    v-for="
        item in this.state.selected_items">
                    <div class="col d-flex align-items-center justify-content-center">

                        <img style="max-height: 100;" v-if="item.cover_image != null"
                            :src="state.base_url + 'storage/' + item.cover_image" class=" " alt="">
                        <img style="max-height: 100;" v-else :src="state.base_url + `storage/covers/panino.jpg`" class=""
                            alt="">

                    </div>
                    <div class="col d-flex align-items-center justify-content-center">
                        <h4>{{ item.name }}</h4>
                    </div>
                    <div class="col d-flex align-items-center justify-content-center">
                        <div class="btn-group" role="group">
                            <button class="btn btn-outline-secondary">-</button>
                            <button class="btn btn-outline-secondary">{{ item.quantity }}</button>
                            <button class="btn btn-outline-secondary">+</button>
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
                    <div class="col">
                    </div>
                    <div class="col">
                    </div>
                    <div class="col  d-flex align-items-center justify-content-center">
                        <h4>Total:</h4>
                    </div>
                    <div class="col  d-flex align-items-center justify-content-center">
                        <h4>{{ state.totalPrice }} €</h4>
                    </div>
                </div>
            </div>
            <div class="row row-cols-1 row-cols-sm-4 pt-4 pb-4 justify-content-around">
                <div class="col">
                </div>
                <div class="col">
                </div>
                <div class="col">
                </div>
                <div class="col  d-flex align-items-center justify-content-center">
                    <button class="btn text-bg-success">
                        Go to checkout
                    </button>
                </div>
            </div>

        </div>
    </div>
</template>
<style></style>