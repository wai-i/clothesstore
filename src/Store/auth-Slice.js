import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: -1,
    email: "",
    name: "",
    isLogin: false,
    token: ""
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        login(state,actions){
            state.id = actions.payload.id;
            state.email = actions.payload.email;
            state.name = actions.payload.name;
            state.isLogin = true;
            state.token = actions.payload.token;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        logout(state){
            state.id = "";
            state.name = "";
            state.isLogin = false;
            localStorage.setItem("auth",JSON.stringify(state));
        },
        loadLogin(state){
            if(JSON.parse(localStorage.getItem("auth")) !== null){  
                state.id = JSON.parse(localStorage.getItem("auth")).id;
                state.email = JSON.parse(localStorage.getItem("auth")).email;
                state.name = JSON.parse(localStorage.getItem("auth")).name;
                state.isLogin = JSON.parse(localStorage.getItem("auth")).isLogin;
                state.token = JSON.parse(localStorage.getItem("auth")).token;
            }
        }
    }

})

export const authAction = authSlice.actions;
export default authSlice;