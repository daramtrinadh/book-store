import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';

const Cart = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <div>
            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p>No items in cart.</p>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>{item.title} - ₹{item.price}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
