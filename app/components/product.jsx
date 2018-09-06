import React from 'react'

/* the classical syntax */
export default class Product extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('Product is mounted')
  }

  render() {
    let {id, name, cost, description, handleClick, btnText} = this.props
    return (
      <div>
        {name}: ${cost} <span style={{color: 'blue'}}>{description}</span> &nbsp;
        <button onClick={() => handleClick(id)}>{btnText}</button>
      </div>
    )
  }
}

/* the ES7 syntax
let Product = ({id, name, cost, description, handleClick}) => (
  <div>
    {name}: ${cost} <span style={{color: 'blue'}}>{description}</span> &nbsp;
    <button onClick={() => handleClick(id)}>Add to cart</button>
  </div>
)

export default Product
*/
