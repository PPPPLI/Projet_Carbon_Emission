import { createStore } from "vuex";

const userStore = createStore({

    state(){

        return{
            user:null
        }
    },

    mutations:{

        updateUser(state,newState){

            state.user = newState
        }
    },

    actions:{

        updateUser({commit}){

            commit("updateUser")
        }
    }
})

export default userStore;