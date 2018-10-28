import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import '../css/adjustments.css';
import { requestActions } from '../_actions';

const btnStyle = { padding: '6px 6px 6px 6px'};

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  handleAccept() {
    const ride = this.props.rideInfo;
    this.props.dispatch(requestActions.updateRide(ride._id, { status: 'ACCEPTED'}));
  }
  handleReject() {
    const ride = this.props.rideInfo;
    this.props.dispatch(requestActions.updateRide(ride._id, { status: 'REJECTED'}));
  }
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
          {this.props.isDriver && ride.status == 'PENDING' &&
            <Button bsStyle='success' style={btnStyle} onClick={this.handleAccept}>
            <Glyphicon glyph='ok'/></Button>
          }
          {ride.status != 'REJECTED' &&
            <Button bsStyle='danger' style={btnStyle} onClick={this.handleReject}>
            <Glyphicon glyph='remove'/></Button>
          }
        </ButtonGroup></ButtonToolbar></td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  isDriver: PropTypes.bool,
  rideInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

const connectedTableRow = connect(mapStateToProps)(TableRow)
export { connectedTableRow as TableRow };
