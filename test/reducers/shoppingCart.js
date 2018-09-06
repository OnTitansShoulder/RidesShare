import { expect } from 'chai'
import shoppingCart from '../../app/reducers/shoppingCart'

describe('shoppingCart reducer', () => {
  it('can add a new product', () => {
    expect(
      shoppingCart([], {type: 'ADD_TO_CART', payload: {id:5}})
    ).to.eql([5])
  })

  it('can remove a product', () => {
    expect(
      shoppingCart([5,10], {type: 'REMOVE_FROM_CART', payload: {id:10}})
    ).to.eql([5])
  })
})
