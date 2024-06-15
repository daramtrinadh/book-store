import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Home from './components/Home';
import Cart from './components/Cart'
import CartContext from './context/CartContext';

class App extends Component {
  state = {
    cartItems: []
  };

  addToCart = (item) => {
    this.setState(prevState => ({
      cartItems: [...prevState.cartItems, item]
    }));
  };

  render() {
    const { cartItems } = this.state;
    console.log(cartItems)

    return (
      <CartContext.Provider
        value={{
          cartItems,
          addToCart: this.addToCart
        }}
      >
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart}/>
        </Switch>
      </CartContext.Provider>
    );
  }
}

export default App;
