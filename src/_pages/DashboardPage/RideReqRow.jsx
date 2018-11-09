import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonGroup, Button, ButtonToolbar,
  Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../css/adjustments.css';
import '../../css/special-overwrite.css';
import { requestActions } from '../../_actions';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';

const btnStyle = { padding: '6px 6px 6px 6px'};
function OverlayTooltip({children, tooltip}) {
  return (
    <OverlayTrigger
      overlay={<Tooltip id={tooltip}>{tooltip}</Tooltip>}
      placement="top" delayShow={300} delayHide={150}
    >{children}</OverlayTrigger>
  );
}

class RideReqRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleAccept() {
    const ride = this.props.rideInfo;
    this.props.dispatch(requestActions.updateRideReq(ride._id, { status: 'ACCEPTED'}));
  }
  handleReject() {
    const ride = this.props.rideInfo;
    this.handleClose();
    this.props.dispatch(requestActions.updateRideReq(ride._id, { status: 'REJECTED'}));
  }
  handleShow() { this.setState({ ...this.state, showModal: true }); }
  handleClose() { this.setState({showModal: false}); }
  render() {
    const ride = this.props.rideInfo;
    return (
      <tr>
        <td>{moment(ride.leavingDate).format('YYYY-MM-DD hh:mm A')}</td>
        <td>{ride.fromAddress}</td>
        <td>{ride.toAddress}</td>
        <td>{ride.driverName}</td>
        <td>{ride.status}</td>
        <td><ButtonToolbar><ButtonGroup>
          {this.props.isDriver && (ride.status == 'PENDING' && <OverlayTooltip tooltip="accept">
            <Button bsStyle='success' style={btnStyle} onClick={this.handleAccept}>
            <Glyphicon glyph='ok'/></Button></OverlayTooltip>)
          }
          {ride.status != 'REJECTED' && <OverlayTooltip tooltip="reject">
            <Button bsStyle='danger' style={btnStyle} onClick={this.handleShow}>
            <Glyphicon glyph='remove'/></Button></OverlayTooltip>
          }
          {ride.status != 'PENDING' && <OverlayTooltip tooltip="archive">
            <Button bsStyle='warning' style={btnStyle} onClick={this.handleShow}>
            <Glyphicon glyph='level-up'/></Button></OverlayTooltip>
          }
        </ButtonGroup></ButtonToolbar></td>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton><Modal.Title><FAI icon="question-circle" /> Are you sure?</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Once you proceed, there is no way to reverse this action.</p>
            <p><strong>Both the driver and the rider will be notified for this action. Proceed?</strong></p><br />
            <Button bsStyle='danger' onClick={this.handleReject}>Confirm</Button>
            <Button className='pull-right' bsStyle='default' onClick={this.handleClose}>Cancel</Button>
          </Modal.Body>
        </Modal>
      </tr>
    );
  }
}

RideReqRow.propTypes = {
  isDriver: PropTypes.bool,
  rideInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

const connectedRideReqRow = connect(mapStateToProps)(RideReqRow)
export { connectedRideReqRow as RideReqRow };
