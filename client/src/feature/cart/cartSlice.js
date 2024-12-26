import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item._id === action.payload.carDetails._id)
            if (!existingItem) {
                state.items.push(action.payload.carDetails)
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.map(item => ({
                ...item,
                productId: item.productId.filter(product => product._id !== action.payload.carId)
            })).filter(item => item.productId.length > 0)
        },
        updateCart: (state, action) => {
            state.items = action.payload
        }
    }
})

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions
export default cartSlice.reducer