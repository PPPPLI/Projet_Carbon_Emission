import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/components/MainPage.vue";
import LoginPage from "@/components/LoginPage.vue";
import GuidePage from "@/components/GuidePage.vue";
import CloudPage from "@/components/CloudPage.vue";
import TravelPage from "@/components/TravelPage.vue";


const routes = [

    {
        path:"/",
        name:"home",
        component: MainPage,
        meta:{requiresAuth:true},
        redirect:"/guide",
        children:[
            {
                path:"guide",
                component: GuidePage
            },
            {
                path:"cloud",
                component: CloudPage
            },
            {
                path:"flight",
                component: TravelPage
            },
            {
                path:"travel",
                component: CloudPage
            }
        ]
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

        let date = JSON.parse(localStorage.getItem("createdDate"))

        let currentTime =  (Date.now() - 3600000)


        if(date >= currentTime){

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