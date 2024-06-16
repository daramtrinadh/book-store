const CartItem=(prop)=>{
    const {cartItemDetail}=prop
    const { image, price, title } = cartItemDetail;
    return(
        <li className="cart-item-detail">
            <img src={image} alt={title}/>
            <p>{title}</p>
            <p>{price}</p>
        </li>

    )
}
export default CartItem