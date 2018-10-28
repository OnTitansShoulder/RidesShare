import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestActions } from '../_actions';

import '../css/adjustments.css';
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
      showModal: false,
      comments: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }
  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleShow() {
    this.setState({
      ...this.state, showModal: true
    }); }
  handleClose() { this.setState({...this.state, showModal: false}); }
  handleRequest() {
    this.props.dispatch(requestActions.newRideReq(
      this.props.rideInfo, this.props.user, this.state.comments
    ));
    const state = this.state;
    state['showModal'] = false;
    this.setState(state);
  }

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
            <div className="indent-parag">
              <h4>Leaving Date & Time</h4>
              <p>{rideInfo && moment(rideInfo.leavingDate).format('YYYY-MM-DD hh:mm A')}</p>
              <h4>From Address:</h4>
              <p>{rideInfo && rideInfo.fromAddress}</p>
              <h4>To Address:</h4>
              <p>{rideInfo && rideInfo.toAddress}</p>
              <h4>Driver Info</h4>
              <p>Name: {rideInfo && rideInfo.fullname} </p>
              <h4>Comments</h4>
              <textarea rows={6} cols={65} name='comments'
                placeholder='Write what you need to let the driver know here,
                such as how many luggages you will bring and whether you want to share the gas.'
                onChange={this.handleChange}></textarea>
              {rideInfo && (<div style={{display: 'grid', margin: '15px 0 0 0'}}>
                <button className="btn btn-primary" onClick={this.handleRequest}
                  style={{margin: 'auto'}}>Request for this ride</button>
              </div>)}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    user: state.authentication.user
  };
}

Pin.propTypes = {
  $hover: PropTypes.bool,
  text: PropTypes.string,
  rideInfo: PropTypes.object
};

const connectedPin = connect(mapStateToProps)(Pin);
export { connectedPin as Pin };
