import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import CartItem from '../CartItem'
import Header from '../Header'
import './index.css'

const Cart = () => {
    const { cartItems } = useContext(CartContext);

    return (
        <>
        <Header/>
        <div className='cart-section'>

            <h1>Cart</h1>
            {cartItems.length === 0 ? (
                <p className="no-items">No items in cart.</p>
            ) : (
                <ul>
                    {cartItems.map((eachItem)=>(
                        <CartItem key={eachItem.isbn13} cartItemDetail={eachItem}/>
                    ))}
                </ul>
            )}
        </div>
        </>
    );
};

export default Cart;
