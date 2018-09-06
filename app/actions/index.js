import ACTIONS from '../constants'

function addToCart(id) {
  return {
    type: ACTIONS.ADD_TO_CART,
    payload: {
      id: id
    }
  }
}

function removeFromCart(id) {
  return {
    type: ACTIONS.REMOVE_FROM_CART,
    payload: {
      id: id
    }
  }
}

export {addToCart, removeFromCart}
