
import { createSlice } from "@reduxjs/toolkit";

const cartSlice= createSlice({
    name:"mycart",
    initialState:{
        cart:[]
    },
    reducers:{
        addtoCart:(state, actions)=>{
            const cartData= state.cart.filter(key=>key.id==actions.payload.id);
            if (cartData.length>=1)
            {
                alert("Product Aleready Added!!!");
            }
            else 
            {
                state.cart.push(actions.payload);
            }
        }
    }
})

export const {addtoCart} = cartSlice.actions;
export default cartSlice.reducer;