import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import ShoppingCart from '../../app/components/shoppingCart.jsx'

describe('<ShoppingCart />', () => {
  let sample = [{id: 1, name: 'apple', cost: 10000, description: 'crazy fast MAC'}]

  it('will render <Product />', () => {
    let wrapper = shallow(<ShoppingCart products={sample} />)
    expect(
      wrapper.find('Product')
    ).to.have.length(1)
  })
})
