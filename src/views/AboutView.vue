<script>
export default {
    name: 'AboutView'
}
</script>
<template>
       <div class="about">
        <div class="story bg_my_orange">
            <div class="container pt-4 pb-4 d-flex gap-5">
                <div class="row row-cols-1 row-cols-md-2 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-fluid rounded-5 p-2"
                            src="../assets/img/about-img.jpg"
                            alt="">
                    </div>
                    <div class="col  d-flex justify-content-center flex-column">

                        <h2>Our Story</h2>
                        <p>Welcome to Deliveboo, your go-to spot for food magic in NYC! Born in the heart of the Big Apple, we're on a mission to make ordering food as delightful as savoring it. Our journey is all about connecting you with the flavors you love from your favorite local spots. Join us, and let's turn every meal into a moment to remember.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="booster bg_my_light-pink">
            <div class="container pt-4 pb-4 d-flex gap-5">
                <div class="row row-cols-1 row-cols-md-2 mb-5">
                    <div class="col order-2 order-md-1 d-flex justify-content-center flex-column">

                        <h2>Meet Booster, Our Culinary Companion</h2>
                        <p>Meet Booster, the official mascot of Deliveboo. With his vibrant plumage and cheerful spirit, Booster is here to boost your dining experience to new heights. Look out for him as you explore our platform – he's your guide to the next delicious discovery!
                        </p>

                    </div>
                    <div class="col order-1 order-md-2 d-flex align-items-center">
                        <img class="img-fluid p-5"
                            src="../assets/img/logo.png" alt="">
                    </div>
                </div>
            </div>
        </div>

        <div class="commitment">
            <div class="container pt-4 pb-4 d-flex gap-5">
                <div class="row row-cols-1 row-cols-md-2 mb-5">
                    <div class="col d-flex align-items-center">
                        <img class="img-fluid rounded-5 p-2 "
                            src="../assets/img/about-mockup.png"
                            alt="">
                    </div>
                    <div class="col d-flex justify-content-center flex-column">

                        <h2>Our Commitment to You</h2>
                        <p>
                            At Deliveboo, we're not just a food delivery service – we're your culinary companions on a gastronomic adventure. From our user-friendly platform to prompt delivery and a curated selection of top-notch restaurants, we're committed to making your experience seamless and enjoyable. Join the Deliveboo family, where great food is just a click away. Thanks for choosing us to be part of your dining journey!
                        </p>
                    </div>
                </div>
            </div>
            </div>
        </div>

</template>


<style lang="scss">
.commitment{
    background-color: rgba(255, 173, 173, 0.2823529412);
}

p{
    font-size: 1.3rem;

}
</style>