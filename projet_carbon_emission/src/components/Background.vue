<template>

    <div id="base"></div>


</template>
  
  <script>

  export default {
    name: "background-page",

  }
  </script>
  
  <style scoped>

  #base{
    position: fixed;
    background: linear-gradient(rgb(65, 80, 110),rgb(151, 94, 104));
    min-width: 100vw;
    min-height: 100vh;
    position: fixed;
    overflow: hidden;
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
  