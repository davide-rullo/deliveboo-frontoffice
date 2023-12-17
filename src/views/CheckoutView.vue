<script>
import axios from 'axios';
import { state } from '../state';
export default {
    name: 'CheckoutView',
    data() {
        return {
            state,
            getTokenUrl: 'http://127.0.0.1:8000/api/orders/generate',
            makePaymentUrl: 'http://127.0.0.1:8000/api/orders/payment',
            tokenPayment: "",
            order: null,
            paymentData: null,
            braintreeInstance: null,
        }
    },

    mounted() {
        this.state.selected_items = JSON.parse(localStorage.getItem('selected_items'));

        this.state.totalPrice = parseInt(JSON.parse(localStorage.getItem('totalPrice')));

        if (this.state.selected_items == null) {
            this.state.selected_items = [];
        }

        console.log(this.state.selected_items, "Carrello");


        axios.get(this.getTokenUrl)
            .then((response) => {
                //console.log(response);
                this.tokenPayment = response.data.token;
                braintree.dropin.create({
                    authorization: this.tokenPayment,
                    selector: '#dropin-container'
                }, (err, instance) => {  // Questa parentesi graffa dovrebbe essere qui
                    if (err) {
                        console.error(err);
                        return;
                    }
                    this.braintreeInstance = instance;
                    //console.log(this.braintreeInstance);
                });
            })
    },

    methods: {
        preparePaymentData() {
            this.paymentData = {
                token: this.tokenPayment,
                amount: state.totalPrice,
            }
            this.order = {
                customer_name: 'matteo',
                customer_email: 'matteo@example.com',
                customer_phone: '3333333333',
                customer_address: 'Via Fasulla 1',
                tot_price: state.totalPrice,
                restaurant_id: state.selected_items[0].restaurant_id,
                items: state.selected_items,
            }

            console.log(this.paymentData, this.order, 'dati pronti');
        },

        makePayment() {
            if (!this.braintreeInstance) {
                console.error('Braintree instance not initialized');
                return;
            }

            console.log("Stai per preparare i dati del pagamento");
            this.preparePaymentData();
            this.braintreeInstance.requestPaymentMethod((err, payload) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Aggiungi payload.nonce ai dati del pagamento
                this.paymentData.nonce = payload.nonce;

                axios.post(this.makePaymentUrl, {
                    paymentData: this.paymentData,
                    order: this.order
                })
                    .then((response) => console.log(response))
                    .catch((error) => console.log(error));
            })
        }
    }
}

</script>
<template>
    <div id="dropin-container" class=" container"></div>
    <button id="submit-button" class="button button--small button--green" @click="makePayment()">Purchase</button>
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
</style>