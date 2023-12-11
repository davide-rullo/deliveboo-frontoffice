<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';


export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {

    };
  },
};

</script>

<template>
  <body>

    <AppHeader></AppHeader>


    <main>
      <router-view></router-view>
    </main>
    <AppFooter></AppFooter>
  </body>
</template>

<style scoped></style>
