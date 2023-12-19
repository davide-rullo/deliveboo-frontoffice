<script>
export default {

    name: 'NotFoundView'
}
</script>
        
<template>
    <div class="bg_my_back space"></div>
    <div class="bg_my_back wrap">
        <div class="container d-flex flex-column  align-items-center nfcont">
            <div class="not-found d-flex flex-column">
                <h2 class="text-center">Ooops! 404, Page not found</h2>
                <p class="">The page you are looking for might have been removed or is temporarily unavailable.</p>


            </div>
        </div>

        <div class="button-redirect d-flex justify-content-center pb-4">
            <button class="btn btn-outline-dark my-3 " type="button">
                <router-link :to="{ name: 'searching' }">Go back to the Restaurants Page</router-link></button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
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

.space{
    height: 2rem;
}
</style>