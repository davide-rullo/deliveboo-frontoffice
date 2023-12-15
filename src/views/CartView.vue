<script>
import { state } from '../state.js';
export default {
    name: 'CartView',
    data() {
        return {
            state,
            cartItems: [],
            cartPrice: null
        }

    },
    methods: {

    },

    mounted() {
        this.cartItems = JSON.parse(state.savedItems);
        this.cartPrice = JSON.parse(state.savedPrice);
        console.log(state.savedItems);
        console.log(this.cartItems);
        console.log(this.cartPrice);
    }
}
</script>
<template>
    <h1 class="text-center">Your Cart</h1>
    <div class="container mt-5">
        <div v-if="this.cartItems.length === 0">
            <p class="text-center">Your Cart is empty</p>
        </div>
        <div v-else>
            <h2 class="text-center">Riepilogo ordine</h2>
            <div class="d-flex align-items-center justify-content-around border border-3 rounded-5 border-black ms-5 py-2 item_card bg_custom mt-3"
                v-for="
        item in this.cartItems">
                <div class="col-3">
                    <img :src=item.cover_image alt="">
                </div>
                <div class="col-3">
                    <h4>{{ item.name }}</h4>
                </div>
                <div class="col-3">
                    <button>-</button>
                    <button>{{ item.quantity }}</button>
                    <button>+</button>
                </div>
                <div class="col-3">
                    <span>{{ item.itemsTotalPrice }}</span>
                </div>
            </div>
            <div class="row d-flex ms-5">
                <div class="col-2">{{ state.savedPrice }}</div>
                <div class="col-2">
                    <button class="btn btn-dark">
                        Go to checkout
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style></style>