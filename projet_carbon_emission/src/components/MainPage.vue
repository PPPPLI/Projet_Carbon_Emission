<template>
    <background></background>
    <header-page></header-page>

</template>
  
  <script>
import Background from './Background.vue';
import HeaderPage from './HeaderPage.vue';
import axios from 'axios';

  export default {
    name: "mainPage",
    components:{
        HeaderPage, Background
    },

    mounted(){

        const apiKey = 'DHE6JBGJY919504GZTX3TERCJ8'
        const url = 'https://api.climatiq.io/compute/v1/metadata'

        axios.get(url, {

            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

  }
  </script>
  
  <style scoped>



  </style>
  