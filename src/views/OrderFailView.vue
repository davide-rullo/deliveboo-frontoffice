<script>
export default {

    name: 'OrderFailView'
}
</script>
        
<template>
    <div class="bg_my_back space"></div>
    <div class="bg_my_back wrap">

        <div class="container d-flex flex-column  align-items-center nfcont">
            <div class="not-found d-flex flex-column">
                <h2 class="text-center">Ops! Something is gone wrong</h2>
                <p class="">Please double check your details and retry the payment.</p>


            </div>
        </div>
        <div class="button-redirect d-flex justify-content-center">
            <button class="btn btn-outline-dark my-3 " type="button">
                <router-link :to="{ name: 'Cart' }">Go to Your Cart</router-link>
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>

.space{
    height: 2rem;
}
.nfcont {
    height: 80vh;
}

.wrap {
    background: url('../assets/img/notfoundimgnobg.png');
    background-size: contain;
    background-color: rgba(255, 173, 173, 0.2823529412);
    background-repeat: no-repeat;
    background-position: center;
}
</style>