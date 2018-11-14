import React from 'react';
import {Col, Table, Panel, Label, Modal, Button, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestActions } from '../../_actions';
import { ControlledPanels, OverlayTooltip } from '../../_components';
import { HistoryRow } from './';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import '../../css/adjustments.css';

class HistoryPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const dispatch = this.props.dispatch;
    const user = this.props.user;
    dispatch(requestActions.findMyHistory(user.username));
  }
  render() {
    const { user, myHistory } = this.props;
    const asDriver = myHistory.asDriver;
    const asRider = myHistory.asRider;
    return (
      <Col xs={10}>
        <p className="adjusted-title">Completed Rides</p>
        <ControlledPanels>
          <Panel id='driverPanel' eventKey="1">
            <Panel.Heading style={{color: '#337ab7'}}>
              <Panel.Title toggle={true}>Me As the Driver <Label bsStyle="info">{asDriver.length}</Label></Panel.Title>
            </Panel.Heading>
            <Panel.Collapse><Panel.Body>
              {<Table striped bordered condensed hover>
                <thead><tr>
                  <th>Departure Time</th><th>From</th><th>To</th>
                  <th>Rider</th><th>Rate Rider</th>
                </tr></thead>
                <tbody>{asDriver.map((ride, i) =>
                  (<HistoryRow key={i} rideInfo={ride} isDriver={true}/>))
                }</tbody>
              </Table>}
            </Panel.Body></Panel.Collapse>
          </Panel>
          <Panel id='riderPanel' eventKey="2">
            <Panel.Heading style={{color: '#337ab7'}}>
              <Panel.Title toggle={true}>Me As the Rider <Label bsStyle="info">{asRider.length}</Label></Panel.Title>
            </Panel.Heading>
            <Panel.Collapse><Panel.Body>
              {<Table striped bordered condensed hover>
                <thead><tr>
                  <th>Departure Time</th><th>From</th><th>To</th>
                  <th>Driver</th><th>Rate Driver</th>
                </tr></thead>
                <tbody>{asRider.map((ride, i) =>
                  (<HistoryRow key={i} rideInfo={ride} isDriver={false}/>))
                }</tbody>
              </Table>}
            </Panel.Body></Panel.Collapse>
          </Panel>
        </ControlledPanels>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
    myHistory: state.rideRequests.myHistory
  };
}

const connectedHistoryPage = connect(mapStateToProps)(HistoryPage);
export { connectedHistoryPage as HistoryPage };
