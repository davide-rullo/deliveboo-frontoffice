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
                            <router-link class="nav-link" active-class="active" to="/searching">Restaurants
                                Search</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" active-class="active" to="/about">About us</router-link>
                        </li>

                    </ul>
                </div>

                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul class="navbar-nav me-0 mt-2 mt-lg-0">
                        <li class="nav-item">
                            <!-- Aggiungi un'icona cliccabile per la pagina del carrello con effetto hover -->
                            <router-link to="/cart" class="ms-2 text-decoration-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#eb585b"
                                    class="bi bi-cart2" viewBox="0 0 16 16">
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                </svg>
                            </router-link>
                        </li>
                        <li class="nav-item ms-md-4 pt-2 pt-md-0"> <!-- Aggiunto margin-right per aggiungere spazio -->
                            <a class="btn bg_my_dark-pink rounded-pill" href="http://127.0.0.1:8000/login" target="_blank">
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
