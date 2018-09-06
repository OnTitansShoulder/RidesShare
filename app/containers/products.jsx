import React from 'react'
import { connect } from 'react-redux'

import { addToCart } from '../actions'
import Products from '../components/products.jsx'
                      /*store.state*/
function mapStateToProps(state) {
  return {
    products: state.products
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick(id) {
      dispatch(addToCart(id))
    }
  }
}

let ProductsContainer = connect(mapStateToProps, mapDispatchToProps)(Products)

export default ProductsContainer
