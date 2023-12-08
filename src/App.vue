<script>
import AppHeader from './components/AppHeader.vue';


export default {
  components: {
    AppHeader
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

  </body>
</template>

<style scoped></style>
