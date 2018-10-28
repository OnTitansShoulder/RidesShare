import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import moment from 'moment';
import '../css/adjustments.css';

const btnStyle = { padding: '6px 6px 6px 6px'};

class TableRow extends React.Component {
  constructor(props) {
    super(props);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
  }
  handleAccept() {

  }
  handleReject() {

  }
  render() {
    const ride = this.props.rideInfo;
    return (
      <tr>
        <td>{moment(ride.leavingDate).format('YYYY-MM-DD hh:mm A')}</td>
        <td>{ride.fromAddress}</td>
        <td>{ride.toAddress}</td>
        <td>{ride.driverName}</td>
        <td><ButtonToolbar><ButtonGroup>
          {this.props.ridereq && <Button bsStyle='success' style={btnStyle} onClick={this.handleAccept}>
            <Glyphicon glyph='ok'/></Button>
          }
          <Button bsStyle='danger' style={btnStyle} onClick={this.handleReject}><Glyphicon glyph='remove'/></Button>
        </ButtonGroup></ButtonToolbar></td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  ridereq: PropTypes.bool,
  rideInfo: PropTypes.object
};

export { TableRow };
