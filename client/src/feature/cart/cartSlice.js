import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload.carDetails)
            // console.log(action.payload.carDetails)
        }
    }
})

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer