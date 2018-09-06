import React from 'react'
import sinon from 'sinon'
import { expect } from 'chai'
import { shallow, mount } from 'enzyme'
import Product from '../../app/components/product.jsx'

describe('<Product />', () => {
  it('should contain one button tag', () => {
    let wrapper = shallow(<Product />)
    expect(
      wrapper.find('button')
    ).to.have.length(1)
  })

  it('responds to click events', () => {
    let handleClick = sinon.spy()
    let wrapper = shallow(<Product handleClick={handleClick} />)
    wrapper.find('button').simulate('click')
    expect(handleClick.calledOnce).to.eql(true)
  })

  it('should render a product description', () => {
    let description = 'test description'
    let wrapper = shallow(<Product description={description} />)
    expect(
      wrapper.find('span').text()
    ).to.eql(description)
  })

  it('should call componentDidMount once only', () => {
    sinon.spy(Product.prototype, 'componentDidMount')
    let wrapper = mount(<Product />)
    expect(
      Product.prototype.componentDidMount
    ).to.have.property('callCount', 1)
    Product.prototype.componentDidMount.restore()
  })
})
