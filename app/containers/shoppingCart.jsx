import React from 'react'
import { connect } from 'react-redux'

import { removeFromCart } from '../actions'
import ShoppingCart from '../components/shoppingCart.jsx'

function getProductsInCart(products, shoppingCart) {
  return products.filter(product => shoppingCart.includes(product.id))
}
                      /*store.state*/
function mapStateToProps(state) {
  return {
    products: getProductsInCart(state.products, state.shoppingCart)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick(id) {
      dispatch(removeFromCart(id))
    }
  }
}

let ShoppingCartContainer = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart)

export default ShoppingCartContainer
