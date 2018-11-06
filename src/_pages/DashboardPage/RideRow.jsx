import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonGroup, Button, ButtonToolbar,
  Modal } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../css/adjustments.css';
import '../../css/special-overwrite.css';
import { requestActions } from '../../_actions';
import { OverlayTooltip } from '../../_components';

const btnStyle = { padding: '6px 6px 6px 6px'};

class RideRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleStatusChange() {
    const ride = this.props.rideInfo;
    this.props.dispatch(requestActions.updateRide(ride._id, { searchable: !ride.searchable}));
  }
  handleDelete() {
    handleClose();
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
        <td>{ride.searchable && 'OPEN' || 'FULL'}</td>
        <td><ButtonToolbar><ButtonGroup>
          {ride.searchable && <OverlayTooltip tooltip="Mark Unsearchable">
            <Button bsStyle='danger' style={btnStyle} onClick={this.handleStatusChange}>
            <Glyphicon glyph='eye-close'/></Button></OverlayTooltip> || <OverlayTooltip
            tooltip="Mark Searchable">
            <Button bsStyle='success' style={btnStyle} onClick={this.handleStatusChange}>
            <Glyphicon glyph='eye-open'/></Button></OverlayTooltip>
          }
          {<OverlayTooltip tooltip="Delete Ride">
            <Button bsStyle='warning' style={btnStyle} onClick={this.handleDelete}>
            <Glyphicon glyph='trash'/></Button></OverlayTooltip>
          }
        </ButtonGroup></ButtonToolbar></td>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton><Modal.Title>Are you sure?</Modal.Title></Modal.Header>
          <Modal.Body>
            <p>Once you reject a request, there is no way to accept it again.</p>
            <p><bold>Both the driver and the rider will be notified for this action. Proceed?</bold></p><br />
            <Button bsStyle='danger' onClick={this.handleReject}>Confirm</Button>
            <Button className='pull-right' bsStyle='default' onClick={this.handleClose}>Cancel</Button>
          </Modal.Body>
        </Modal>
      </tr>
    );
  }
}

RideRow.propTypes = {
  isDriver: PropTypes.bool,
  rideInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

const connectedRideRow = connect(mapStateToProps)(RideRow)
export { connectedRideRow as RideRow };
