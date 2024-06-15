import React, { useContext } from 'react';
import CartContext from '../../context/CartContext';
import './index.css';
import { IoMdCart } from "react-icons/io";

const NewBookItem = (props) => {
  const { BookDetail } = props;
  const { image, price, subtitle, title } = BookDetail;
  const inr = price.slice(1) * 83.55;
  const inrFinal = Math.ceil(inr * 100) / 100;
  
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(BookDetail);
  };

  return (
    <li className="book-item">
      <img src={image} alt={title} className='book-image' />
      <h1 className='book-title'>{title}</h1>
      <p className='book-subtitle'>{subtitle}</p>
      <p className='book-price'>Price: ₹{inrFinal}</p>
      <button className='cart-button' onClick={handleAddToCart}>
        <IoMdCart className='cart' />ADD TO CART
      </button>
    </li>
  );
};

export default NewBookItem;
