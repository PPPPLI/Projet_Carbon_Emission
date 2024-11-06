<template>

    <div id="headerDiv">

        <div id="activityDiv">
            <div id="title">ÉcoCalcul</div>
            <div class="act">Cloud Computing</div>
            <div class="act">Flight Activity</div>
            <div class="act">Custom Activities</div>
            <div id="guide"></div>
        </div>


    </div>

</template>
  
  <script>

  export default {
    name: "hearder-page",
    data(){

        return {

            user: ""
        }
    },

    mounted(){

        this.user = localStorage.getItem("user")
    }

  }
  </script>
  
  <style scoped>

  #guide{

    margin-top: 10px;
    width: 30px;
    height: 20px;
    background: linear-gradient(90deg, #9de7d3, #8C92AC);

    
    mask-image: url("../assets/guide.png");
    mask-size: 90% 90%;
    mask-repeat: no-repeat;

    -webkit-mask-image: url("../assets/guide.png");
    -webkit-mask-size:  90% 90%;
    -webkit-mask-repeat: no-repeat;

    cursor: pointer;
    transition: all 1s;
    margin-left: 15px;

  }

  #guide:hover{

    transform-origin: center;
    transform: rotate(90deg);
  }

  #title{

    font-family: cursive;
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(90deg, #9de7d3, #8C92AC);
    background-clip: text;
    color: transparent;
    user-select: none;
    background-size: 300%;
    animation: gradientAnimation 5s ease infinite;
  }

  @keyframes gradientAnimation {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
  }

  #headerDiv{
    padding-top: 10px;
    position: sticky;
    width: 100vw;
    height: 25vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 10;
  }

  #activityDiv{
    width: 70%;
    min-width: 1000px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: transparent;
    font-size: x-large;
    background: linear-gradient(90deg, #579f9f, #8C92AC);
    font-weight: 700;
    background-clip: text;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .act{
    margin-top: 7px;
    padding: 5px;
    cursor: pointer;
    transition: all 1s;
    
  }

  .act:hover{
    background: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: rgb(213, 213, 213);
    box-shadow: 0 0 5px rgba(215, 215, 215, 0.2), 0 0 10px rgba(212, 212, 212, 0.3), 0 0 15px rgba(222, 222, 222, 0.5);
    
  }

  </style>
  