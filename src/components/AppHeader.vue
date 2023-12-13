<script>
export default {
    name: "AppHeader",
};
</script>

<template>
    <header>

        <nav class="navbar navbar-expand-md shadow bg_my_orange">
            <div class="container">

                <div class="d-none d-md-block">
                    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 d-flex gap-2" href="#">
                        <img height="40" src="../assets/img/provalogo.png" alt="">
                        <h2 class="my_logo_title">DeliveBoo</h2>
                    </a>
                </div>



                <button class="navbar-toggler d-md-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span><img height="40" src="../assets/img/provalogo.png" alt=""></span>
                </button>


                <div class="collapse navbar-collapse" id="collapsibleNavId">
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/" aria-current="page">Home
                                <span class="visually-hidden">(current)</span></router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/searching">Advanced
                                Search</router-link>
                        </li>

                    </ul>
                </div>

                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul class="navbar-nav me-0 mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="btn bg_my_dark-pink rounded-pill" href="http://127.0.0.1:8000/login">
                                Login
                            </a>
                        </li>

                    </ul>
                </div>


            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped></style>

