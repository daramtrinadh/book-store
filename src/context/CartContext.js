import React from 'react'

const CartContext = React.createContext({
    addToCart:()=>{},
    cartItems:[],
    
})
export default CartContext