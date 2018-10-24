import React from 'react';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';

const K_SIZE = 40;
const PinStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};
const PinStyleHover = {
  ...PinStyle,
  border: '5px solid #3f51b5',
  color: '#f44336'
};

class Pin extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const style = this.props.$hover ? PinStyleHover : PinStyle;
    return (
      <div style={style}>
        {this.props.text}
      </div>
    )
  }
};

Pin.propTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string
};

export { Pin };
