<template>
    <background></background>
    
    <div id="noticeDiv" v-if="isShow">
        <span id="notice">Log in to continue and enjoy full access to our features !&nbsp;</span> 
    </div>
    <div v-if="btnShow">
        
        <div id="formEle">
            <button class="loginBtn"  @click="loginWithGoogle"  :disabled="isActivated">Google</button>
            <button class="loginBtn"  @click="signIn"  :disabled="isActivated">Microsoft</button>
        </div>
        <div id="ball"></div>
    </div>


    

</template>
  
<script>
import { auth, provider } from '../lib/firebase.js';
import { signInWithPopup} from 'firebase/auth';
import Background from './Background.vue';
import {signInAndGetUser} from '@/lib/microsoftGraph';
import axios from 'axios'

  export default {
    name: "login-page",
    components:{
        Background
    },
    methods:{

        async loginWithGoogle() {
            try {
                const result = await signInWithPopup(auth, provider);
                const user = result.user;
                console.log("user: ", user);
            } catch (error) {
                console.error("Error message: ", error);
            }
        },

        async signIn() {

            try {
                this.isActivated = !this.isActivated
                const { account, accessToken } = await signInAndGetUser();
                //this.updateUser(account.name)
                console.log(account)

                const response = await axios.get('https://graph.microsoft.com/v1.0/me/messages', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });


                this.email = response.data.value;
                console.log(this.email)
                
                //this.$emit("userShare",this.user)
            } catch (error) {
                console.error('Sign-in failed:', error);
            }

            this.isActivated = !this.isActivated;
        },


    },

    data(){

        return {
            
            isShow: false,
            btnShow: false,
            isActivated:false,
            email:[]
        
        }
    },

    mounted(){

        setTimeout(() => {
            
            this.isShow = true
        }, 2500);

        setTimeout(()=>{

            this.btnShow = true
        },6700)
    }

  }
</script>
  
<style scoped>

#noticeDiv{

    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    transform: translate(24.5vw,35vh);
    width: 50vw;
    z-index: 2;
}

#notice{

    display: inline-block;
    max-width: fit-content;
    animation: typing 10s ease, blink-caret 0.75s step-end infinite;
    background: linear-gradient(90deg, #F2E8CF, #8C92AC);
    color: transparent;
    font-size: 20px;
    overflow: hidden;
    border-right: 3px solid #8C92AC;
    white-space: nowrap;
    font-size: 20px;
    font-weight: bold;
    background-clip: text;
    user-select: none;

}

@keyframes typing {
  from { 
        width: 0; 
        opacity: 1;
    }
  to { 
    
        width: 100%; 
        opacity: 1;
    }
}

@keyframes blink-caret {
  50% { border-color: transparent; }
}

#formEle{
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    transform: translate(24.5vw,44vh);
    width: 50vw;
    z-index: 2;
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


#ball{
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: red;
    top: 50%;
    left: 10%;
    z-index: 1;
    animation: ballFloat 7s ease infinite;
    opacity: 0;
    animation-delay: 2s;

}

@keyframes ballFloat {

    0%{

        background-color: red;
        transform: translateX(23vw);
        opacity: 0.4;

    }

    25%{

        background-color: rgb(78, 137, 179);
        transform: translateX(39vw);
        opacity: 0;
    }

    50%{


        background-color: rgb(76, 171, 144);
        transform: translateX(54vw);
        opacity: 0.6;
    }

    75%{


        background-color: rgb(43, 91, 125);
        transform: translateX(39vw);
        opacity: 0;

    }

    100%{

        background-color: red;
        transform: translateX(23vw);
        opacity: 0.4;
    }
    
}


.loginBtn{
    position: relative;
    box-sizing: border-box;
    padding: 20px;
    min-width: 100px;
    max-width: fit-content;
    max-height: 80px;
    font-size: x-large;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.07);
    color: rgb(213, 213, 213);
    transition: background-color 1s ease;
    z-index: 2;
    border: none;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 5px rgba(215, 215, 215, 0.2), 0 0 10px rgba(212, 212, 212, 0.3), 0 0 15px rgba(222, 222, 222, 0.5);
    text-align: center;

    &:hover{
        background-color: rgba(255, 255, 255, 0.3);
        color: rgb(235, 235, 235);

    }

    
  }


  </style>
  