import React, { Component } from 'react'

import Products from '../containers/products'
import ShoppingCart from '../containers/shoppingCart'
import Header from '../containers/Header'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
  }

  render(){
    return (
      <div>
        <Header />
        <p>Welcome to our shop!</p>
        <Products />
        <ShoppingCart />
      </div>
    )
  }
}
