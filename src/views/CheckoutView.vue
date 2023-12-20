<script>
import axios from 'axios';
import { state } from '../state';
import Loader from '../components/Loader.vue';
export default {
    name: 'CheckoutView',
    components: {
        Loader,
    },
    data() {
        return {
            state,
            getTokenUrl: 'http://127.0.0.1:8000/api/orders/generate',
            makePaymentUrl: 'http://127.0.0.1:8000/api/orders/payment',
            tokenPayment: "",
            order: null,
            paymentData: null,
            braintreeInstance: null,
            customer_name: '',
            customer_email: '',
            customer_phone: '',
            customer_address: '',
            customer_message: '',
            loading: false,
            nonce: null,

        }
    },

    computed: {
        isFormValid() {
            return (
                this.customer_name !== '' &&
                this.customer_email !== '' &&
                this.customer_phone !== '' &&
                this.customer_address !== '' &&
                this.customer_message !== ''
            );
        },
    },

    mounted() {
        this.state.selected_items = JSON.parse(localStorage.getItem('selected_items'));

        this.state.totalPrice = parseInt(JSON.parse(localStorage.getItem('totalPrice')));

        console.log(this.calculateTotalPrice());

        if (this.state.selected_items == null) {
            this.state.selected_items = [];
        }

        console.log(this.state.selected_items, "Carrello");


        axios.get(this.getTokenUrl)
            .then((response) => {
                this.tokenPayment = response.data.token;
                braintree.dropin.create({
                    authorization: this.tokenPayment,
                    selector: '#dropin-container'
                }, (err, instance) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.braintreeInstance = instance;
                });
            })
    },

    methods: {
        startLoading() {
            this.loading = true;
        },
        calculateTotalPrice() {
            let totalPrice = 0;
            for (const item of this.state.selected_items) {
                totalPrice += item.itemsTotalPrice;
            }
            return totalPrice.toFixed(2); // Formatta il totale con due decimali
        },
        prepareNonce() {
            this.braintreeInstance.requestPaymentMethod((err, payload) => {
                document.getElementById('nonce').value = payload.nonce;
                this.nonce = payload.nonce;
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("Nonce pronta");
                console.log(this.nonce);
            })
        },

        preparePaymentData() {
            this.paymentData = {
                amount: this.calculateTotalPrice(),
                nonce: this.nonce,
            }
            this.order = {
                customer_name: this.customer_name,
                customer_email: this.customer_email,
                customer_phone: this.customer_phone,
                customer_address: this.customer_address,
                customer_message: this.customer_message,
                tot_price: this.calculateTotalPrice(),
                restaurant_id: state.selected_items[0].restaurant_id,
                items: state.selected_items,
            }

            console.log(this.paymentData.amount, this.order, 'dati pronti');
        },

        makePayment() {
            /* Controllo se l'istanza di Braintree è pronta */
            if (!this.braintreeInstance) {
                console.error('Braintree instance not initialized');
                return;
            }
            /* Preparo i dettagli della mail */
            const emailDetails = {
                customer_name: this.customer_name,
                customer_email: this.customer_email,
                customer_phone: this.customer_phone,
                customer_address: this.customer_address,
                customer_message: this.customer_message
            };
            console.log(emailDetails);

            console.log("Stai per preparare i dati del pagamento");

            /* Preparo i dati per il pagamanto */

            this.preparePaymentData();

            console.log(this.paymentData);

            /* Metodo che braintree utilizza per richiedere il pagamento */
            this.braintreeInstance.requestPaymentMethod((err, payload) => {
                console.log(payload.nonce);
                if (err) {
                    console.error(err);
                    return;
                }
                /* Chiamata post per effettuare il pagamento */
                console.log(this.paymentData, "Siamo a prima della chiamata");
                axios.post(this.makePaymentUrl, {
                    paymentData: this.paymentData,
                })

                    // Se va a buon fine , effettuo la chiamata agli ordini 
                    .then((response) => {
                        console.log(this.order);
                        axios.post('http://127.0.0.1:8000/api/orders/new', {
                            orderDetail: this.order
                        }).then((response) =>
                        // Se va a buon fine , effettuo la chiamata alla mail 
                        {
                            console.log(emailDetails, " Dettagli Mail");
                            axios
                                .post(this.state.base_url + 'api/emails', emailDetails)
                                .then(response => {
                                    console.log(response);
                                    this.$router.push('/order-success');
                                    state.clearCart();
                                })
                                .catch(error => {
                                    console.error(error.message);
                                    this.$router.push('/order-fail');
                                })
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        this.$router.push('/order-fail');
                    });
            })
        },
    }
}

</script>
<template>
    <div v-if="!loading" class="bg_my_back">
        <div class="container">
            <div class="button-redirect d-flex justify-content-center">
                <button class="btn btn-outline-dark my-3 " type="button">
                    <router-link :to="{ name: 'Cart' }">Back to Your Cart</router-link>
                </button>
            </div>
            <form id="payment-form" class=" pb-5" @submit.prevent>
                <div id="dropin-container"></div>
                <input type="submit" @click="prepareNonce()" value="Send" />
                <input type="hidden" id="nonce" name="payment_method_nonce" />
            </form>
            <!-- Form -->
            <form action="" class=" mt-5" v-if="this.nonce !== null">
                <!-- name -->
                <div class="pb-3">
                    <label for="customer_name" class="form-label">Name</label>
                    <input type="text" class="form-control" name="customer_name" id="customer_name"
                        aria-describedby="nameHelper" placeholder="Your Name" v-model="customer_name" />
                    <!-- <small id="nameHelper" class="form-text text-muted">Type your name</small> -->
                </div>
                <!-- email -->
                <div class="mb-3">
                    <label for="customer_email" class="form-label">Email</label>
                    <input type="email" class="form-control" name="customer_email" id="customer_email"
                        aria-describedby="emailHelper" placeholder="Your email" v-model="customer_email" />
                    <!-- <small id="emailHelper" class="form-text text-muted">Type your email</small> -->
                </div>
                <!-- phone -->
                <div class="mb-3">
                    <label for="customer_phone" class="form-label">Phone</label>
                    <input type="text" class="form-control" name="customer_phone" id="customer_phone"
                        aria-describedby="phoneHelper" placeholder="Your phone" v-model="customer_phone" />
                    <!-- <small id="phoneHelper" class="form-text text-muted">Type your phone number</small> -->
                </div>
                <!-- address -->
                <div class="mb-3">
                    <label for="customer_address" class="form-label">Address</label>
                    <input type="text" class="form-control" name="customer_address" id="customer_address"
                        aria-describedby="addressHelper" placeholder="Your address" v-model="customer_address" />
                    <!-- <small id="addressHelper" class="form-text text-muted">Type your address</small> -->
                </div>
                <div class="pb-3">
                    <label for="customer_message" class="form-label">Message</label>

                    <textarea name="customer_message" id="customer_message" rows="3" class="form-control"
                        placeholder="Your message" v-model="customer_message"></textarea>
                    <!-- <small id="messageHelper" class="form-text text-muted">Type your message</small> -->
                </div>
            </form>

            <button v-if="isFormValid" id="submit-button" class="button button--small button--green mb-5"
                @click="this.makePayment(); this.startLoading();">Purchase</button>



        </div>
    </div>

    <div v-else class="bg_my_back">
        <div class="vh-100 d-flex gap-2 align-items-center justify-content-center container">

            <Loader></Loader>
        </div>
    </div>
</template>


<style lang="scss">
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}

.loader {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    position: relative;
    animation: rotate 1s linear infinite
}

.loader::before,
.loader::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #FFF;
    animation: prixClipFix 2s linear infinite;
}

.loader::after {
    border-color: #FF3D00;
    animation: prixClipFix 2s linear infinite, rotate 0.5s linear infinite reverse;
    inset: 6px;
}

@keyframes rotate {
    0% {
        transform: rotate(0deg)
    }

    100% {
        transform: rotate(360deg)
    }
}

@keyframes prixClipFix {
    0% {
        clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0)
    }

    25% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0)
    }

    50% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%)
    }

    75% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%)
    }

    100% {
        clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0)
    }
}
</style>