<template>

    <div id="headerDiv">

        <div id="activityDiv">
            <router-link id="title" to="/guide">ÉcoCalcul</router-link>
            <router-link to="/cloud" class="act">Cloud Computing</router-link>
            <router-link to="/flight" class="act">Travel Activity</router-link>
            <router-link to="/travel" class="act">Custom Activities</router-link>
            <div id="userDiv">
                <div id="guide" @click="switchUser"></div>
                <div v-if="userShow">{{user}}</div>
                <div v-if="userShow" @click="logOutShow">Log out</div>
            </div>
        </div>
        <div id="confirmDiv" v-if="confirmShow" @click="confirmOff">

        </div>
        <div id="confirmDivBtn" v-if="confirmShow">
            <p>Are you sure for logout ?</p>
            <div>
                <div class="btn" @click="logOut">Confirm</div>
                <div class="btn" @click="confirmOff">Cancel</div>
            </div>
        </div>

    </div>

</template>
  
  <script>

  export default {
    name: "hearder-page",
    data(){

        return {

            user: "",
            userShow: false,
            confirmShow: false
        }
    },

    methods:{

        switchUser(){

            this.userShow = !this.userShow
            this.userShow? document.querySelector("#guide").style.transform = "rotate(90deg)":document.querySelector("#guide").style.transform = "rotate(0deg)"
        },

        logOutShow(){

            this.confirmShow = true

        },

        logOut(){

            localStorage.clear();
            this.$router.push("/login")
        },

        confirmOff(){

            this.confirmShow = false
        }
    },

    mounted(){

        this.user = localStorage.getItem("user")
    }

  }
  </script>
  
  <style scoped>

  #confirmDiv{

    width: 100vw;
    height: 100vh;
    background-color: black;
    opacity: 0.5;
    position: fixed;
    top: 0;
    overflow: hidden;
  }

  #confirmDivBtn{

    background: linear-gradient(90deg, #8696a7, #768e92);
    position: fixed;
    min-width: fit-content;
    min-height: fit-content;
    height: 15vh;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 5px;
    color: rgb(255, 255, 255);
    font-weight: 700;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    box-shadow: 0 0 5px rgba(215, 215, 215, 0.2), 0 0 10px rgba(212, 212, 212, 0.3), 0 0 15px rgba(222, 222, 222, 0.5);
  }

  #confirmDivBtn > div:nth-child(2){

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .btn{

    border: 1px solid rgb(203, 203, 203);
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 1s;
  }

  .btn:hover{

    background-color: aliceblue;
    color: grey;
  }


  p{

    font-size: larger;
    user-select: none;
  }

  #userDiv{

    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 250px;
    font-size: large;
    
  }

  #userDiv > div:not(:first-child){

    padding-top: 6px;
    margin-left: 6px;
    animation: slipIn 1s linear;
    overflow: hidden;
    white-space: nowrap;
  }

  @keyframes slipIn {

    0%{

        width: 0;
    }

    100%{

        width: 23%;
    }
    
  }

  #userDiv > div:nth-child(2){

    cursor: default;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100px;
}

  #userDiv > div:nth-child(3){

    margin-left: 30px;
    background: linear-gradient(90deg, rgb(254, 185, 185),rgb(248, 106, 106));
    background-clip: text;
    transition: all 2s;
    cursor: pointer;
  }

  #userDiv > div:nth-child(3):hover{

    background: linear-gradient(90deg,rgb(255, 90, 90),rgb(255, 129, 129));
    background-clip: text;

  }

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

    transform-origin: center;

  }


  #title{

    font-family: cursive;
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(90deg, #9de7d3, #8C92AC);
    background-clip: text;
    color: transparent;
    cursor: pointer;
    background-size: 300%;
    animation: gradientAnimation 4s ease infinite;
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
    width: 100%;
    min-width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    color: transparent;
    font-size: x-large;
    background: linear-gradient(90deg, #c0ffff, #b9bfda);
    font-weight: 700;
    background-clip: text;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .act{
    display: flex;
    margin-top: 7px;
    padding: 5px;
    cursor: pointer;
    transition: all 1s;
    text-decoration: none;
    color: transparent;
    background-clip: text;
    
    
  }

  .act:hover{
    background: none;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    color: rgb(213, 213, 213);
    box-shadow: 0 0 5px rgba(215, 215, 215, 0.2), 0 0 10px rgba(212, 212, 212, 0.3), 0 0 15px rgba(222, 222, 222, 0.5);
    
  }

  </style>
  