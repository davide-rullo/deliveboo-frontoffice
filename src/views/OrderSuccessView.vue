<script>
export default {

    name: 'OrderSuccessView'
}
</script>
        
<template>
    <div class="bg_my_back space"></div>
    <div class="bg_my_back wrap">

        <div class="container d-flex flex-column  align-items-center nfcont">
            <div class="not-found d-flex flex-column justify-content-center text-center">
                <h2 class=" ">Super!!! Your order is on the way</h2>
                <p class="">Make yourself comfortable and in no time</p>
                <p class="">Your Booster the Rooster will reach
                    you!</p>


            </div>
        </div>
        <div class="button-redirect d-flex justify-content-center">
            <button class="btn btn-outline-dark my-3 " type="button">
                <router-link :to="{ name: 'home' }">Go back to Home</router-link>
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.nfcont {
    height: 80vh;
}

.wrap {
    background: url('../assets/img/order-success.png');
    background-size: contain;
    background-color: rgba(255, 173, 173, 0.2823529412);
    background-repeat: no-repeat;
    background-position: center;
}

.space {
    height: 2rem;
}
</style>