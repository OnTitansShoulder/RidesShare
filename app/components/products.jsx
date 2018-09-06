import React from 'react'
import Product from './product.jsx'

let Products = ({products, handleClick}) => (
  <section>
    <h2>Our products</h2>
    <section>
      {products.map(product =>
        <Product key={product.id} {...product} handleClick={handleClick} btnText='Add to Cart' />)}
    </section>
  </section>
)

export default Products
