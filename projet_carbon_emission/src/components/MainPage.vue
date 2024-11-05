<template>
    <background></background>
    <header-page></header-page>

</template>
  
  <script>
import Background from './Background.vue';
import HeaderPage from './HeaderPage.vue';


  export default {
    name: "mainPage",
    components:{
        HeaderPage, Background
    }

  }
  </script>
  
  <style scoped>

  </style>
  