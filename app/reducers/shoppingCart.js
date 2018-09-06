import ACTIONS from '../constants'

let initialState = []

/* return value has to be not changing original, instead, make copy
    can be achieved from using built-in js functions */
export default function shoppingCart(state=initialState, action) {
  switch (action.type) {
    case ACTIONS.ADD_TO_CART:
      return [...state, action.payload.id]
    case ACTIONS.REMOVE_FROM_CART:
      return state.filter(id => id !== action.payload.id)
    default:
      return state
  }
}
