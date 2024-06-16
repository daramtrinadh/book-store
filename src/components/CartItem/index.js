const CartItem=(prop)=>{
    const {cartItemDetail}=prop
    const { image, price, title } = cartItemDetail;
    const inr = price.slice(1) * 83.55;
  const inrFinal = Math.ceil(inr * 100) / 100;
    return(
        <li className="cart-item-detail">
            <img src={image} alt={title}/>
            <p>{title}</p>
            <p>{inrFinal.slice(1)}</p>
        </li>

    )
}
export default CartItem