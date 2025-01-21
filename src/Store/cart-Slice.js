import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addItem(state,actions){
            let index = state.findIndex(x => x.id===actions.payload.id);
            if(index < 0){
                state.push(actions.payload);
            }else{
                state[index].qty ++;
            }
            localStorage.setItem("cart",JSON.stringify(state));
        },
        increaseItem(state,actions){
            state[actions.payload].qty++;
            localStorage.setItem("cart",JSON.stringify(state));
        },
        decreaseItem(state,actions){
            state[actions.payload].qty--;
            if ( state[actions.payload].qty === 0){
                let temp = state.filter(x => x.qty > 0);
                state.length = 0;
                temp.map(x => state.push(x));
            }
            localStorage.setItem("cart",JSON.stringify(state));
        },
        deleteAllItem(state){
            state.length = 0;
            localStorage.setItem("cart",JSON.stringify([]));
        },
        refreshAllItem(state){
            state.length = 0;
            if(JSON.parse(localStorage.getItem("cart")) !== null){  
                JSON.parse(localStorage.getItem("cart")).map((x) => state.push({id: x.id, name: x.name, img: x.img, price: x.price, qty: x.qty}));
            }
        }        
    }


});

export const cartAction = cartSlice.actions;
export default cartSlice;