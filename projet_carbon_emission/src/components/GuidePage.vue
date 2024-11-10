<template>

    <div id="base">
        
        <div id="textDiv">
            <div>Let's calculate for compliant</div>
            <div>carbon measurements</div>
        </div>

        <div id="iconDiv">
            <div class="container">
                <router-link to="/cloud"><div id="cloudImg" class="imgGroup" ></div></router-link>
            </div>
            
            <div class="pointDiv">
                <div class="pointImg"></div>
            </div>
            <div class="container">
                <router-link to="/flight"><div id="flightImg" class="imgGroup"></div></router-link>
            </div>
            <div class="pointDiv">
                <div class="pointImg"></div>
            </div>
            <div class="container"> 
                <router-link to="/travel"><div id="travelImg" class="imgGroup"></div></router-link>
            </div>
        </div>

    </div>


</template>
  
  <script>

  export default {
    name: "guide-page",

  }
  </script>
  
  <style scoped>

  #base{

    position: relative;
    left: 50%;
    transform: translateX(-50%);
    height: 70vh;
    width: 40vw;
    min-width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    z-index: 5;
  }

  #textDiv{

    position: relative;
    color: #f2f2f2;
    font-size: 2.5rem;
    line-height: 4rem;
    width: 40%;
    font-weight: bold;
    border-radius: 15px;
    left: 50%;
    padding: 10px;
    min-width: fit-content;
    transform: translateX(-50%);
    cursor: default;
    user-select: none;
    background-color: rgba(255, 255, 255, 0.1);
    animation: shining 2s linear alternate-reverse infinite;
    font-family: fantasy, sans-serif,monospace,;
  }

  @keyframes shining {
  
    0%{
        box-shadow: 0 0 1px rgba(215, 215, 215, 0.2), 0 0 10px rgba(212, 212, 212, 0.3), 0 0 30px rgba(222, 222, 222, 0.5);
    }

    100%{
        box-shadow: 0 0 5px rgba(215, 215, 215, 0.2), 0 0 50px rgba(212, 212, 212, 0.3), 0 0 100px rgba(222, 222, 222, 0.5);

    }
  }



  #iconDiv{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    overflow: hidden;
    min-height: fit-content;
  }


  #cloudImg{
    width: 70px;
    height: 72px;
    mask-image: url("../assets/cloud.png");
    mask-repeat: no-repeat;
    mask-size: cover;
  }

    #flightImg{

        width: 90px;
        height: 72px;
        mask-image: url("../assets/flight.png");
        mask-repeat: no-repeat;
        mask-size: cover;
    }

    #travelImg{
        width: 62px;
        height: 72px;
        mask-image: url("../assets/travel.png");
        mask-repeat: no-repeat;
        mask-size: cover;
    }

    .pointDiv{

        width: 50px;
    }

    .pointImg{

        width: 50px;
        height: 10px;
        mask-image: url("../assets/points.png");
        mask-repeat: no-repeat;
        mask-size: cover;
        background-color:  #eeeeee;
        animation: showUp 3s linear alternate-reverse infinite;
    }

    @keyframes showUp {

        0%{

            width: 0;
        }

        100%{

            width: 50px;
        }
        
    }

    .container {
    display: inline-block;
    }


    .imgGroup{

        cursor: pointer;
        max-height: 300px;
        transition: transform 2s ease;
        background-color: #eeeeee;
        
    }

    .container:hover .imgGroup {

        transform: rotateY(180deg);
        transform-origin: center;
    }


  </style>
  