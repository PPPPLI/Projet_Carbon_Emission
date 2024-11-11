<template>
    <background></background>
    <div id="mainDiv" v-if="isShow">
        <header-page></header-page>
        <router-view></router-view>
    </div>


</template>
  
  <script>
import Background from './Background.vue';
import HeaderPage from './HeaderPage.vue';

  export default {
    name: "mainPage",
    components:{
        HeaderPage, Background
    },

    mounted(){
        
        setTimeout(() => {
            
            this.isShow = true

        }, 2000);
    },

    data(){

        return {

            isShow: false
        }
    }

  }
  </script>
  
  <style scoped>

  #mainDiv{

    display: flex;
    flex-direction: column;
    justify-content: start;
    animation: showUp 2s ease;
  }

  @keyframes showUp {

    0%{

        opacity: 0;
    }

    100%{

        opacity: 1;
    }
    
  }



  </style>
  