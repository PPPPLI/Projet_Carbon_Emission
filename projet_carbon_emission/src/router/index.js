import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import LoginPage from "@/components/LoginPage.vue";


const routes = [

    {
        path:"/",
        name:"home",
        component: MainPage,
        meta:{requiresAuth:true},
    },

    {
        path:"/login",
        name:"Login",
        component:LoginPage
    }
];

const router = createRouter({

    history: createWebHistory(),
    routes
});


function isAuthenticated(){

    if(localStorage.getItem("user") != null){

        let date = JSON.parse(localStorage.getItem("createdDate"),Date)

        let currentTime =  (Date.now() + 3600000)

        if(date < currentTime){

            return true
        }

        localStorage.clear();
        return false;

    }

    return false;
}


router.beforeEach((to,from,next)=>{

    if(to.meta.requiresAuth && !isAuthenticated()){

        next({name:"Login"});
    }else{

        next();
    }
})

export default router;