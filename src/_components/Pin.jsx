import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
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
    this.state = {
      showModal: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleShow() {
    this.setState({
      ...this.state, showModal: true
    }); }
  handleClose() { this.setState({...this.state, showModal: false}); }

  render() {
    const style = this.props.$hover ? PinStyleHover : PinStyle;
    const rideInfo = this.props.rideInfo;
    return (
      <div>
        <div style={style} onClick={this.handleShow} >
          {this.props.text}
        </div>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton><Modal.Title>Ride Details</Modal.Title></Modal.Header>
          <Modal.Body>
            <h4>Leaving Date & Time</h4>
            <p>{rideInfo && rideInfo.leavingDate}</p>
            <h4>From Address:</h4>
            <p>{rideInfo && rideInfo.fromAddress}</p>
            <h4>To Address:</h4>
            <p>{rideInfo && rideInfo.toAddress}</p>
            <h4>Driver Info</h4>
            <p>Email: {rideInfo && rideInfo.username} </p>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
};

Pin.propTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string,
  rideInfo: PropTypes.object
};

export { Pin };
