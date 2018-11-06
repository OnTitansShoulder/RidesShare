import React from 'react';
import {Col, Table, Panel} from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestActions } from '../../_actions';
import { ControlledPanels, OverlayTooltip } from '../../_components';
import { RideReqRow, RideRow } from './';
import '../../css/adjustments.css';

class RidesPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const dispatch = this.props.dispatch;
    const user = this.props.user;
    dispatch(requestActions.findMyRides(user));
    dispatch(requestActions.findMyRideReqs(user));
    dispatch(requestActions.findMySharedRides(user));
  }
  render() {
    const { user, myRides, myRideReqs, myShared } = this.props;
    return (
      <Col xs={10}>
        <ControlledPanels>
          <Panel id='sharedRidesPanel' eventKey="3">
            <Panel.Heading style={{color: '#337ab7'}}>
              <OverlayTooltip tooltip="This is where to make your rides searchable or delete a ride">
              <Panel.Title toggle={true}>My Shared Rides</Panel.Title></OverlayTooltip>
            </Panel.Heading>
            <Panel.Collapse><Panel.Body>
              {myShared.length > 0 && <Table striped bordered condensed hover>
                <thead><tr>
                  <th>Departure Time</th><th>From</th><th>To</th>
                  <th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  {myShared.map((ride, i) => (
                    <RideRow key={i} rideInfo={ride} isDriver={true}/>
                  ))}
                </tbody>
              </Table>}
            </Panel.Body></Panel.Collapse>
          </Panel>
          <Panel id='driverPanel' eventKey="1">
            <Panel.Heading style={{color: '#337ab7'}}>
              <OverlayTooltip tooltip="This is where to accept or reject a rider's request">
              <Panel.Title toggle={true}>Me As the Driver</Panel.Title></OverlayTooltip>
            </Panel.Heading>
            <Panel.Collapse><Panel.Body>
              {myRides.length > 0 && <Table striped bordered condensed hover>
                <thead><tr>
                  <th>Departure Time</th><th>From</th><th>To</th>
                  <th>Rider</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  {myRides.map((ride, i) => (
                    <RideReqRow key={i} rideInfo={ride} isDriver={true}/>
                  ))}
                </tbody>
              </Table>}
            </Panel.Body></Panel.Collapse>
          </Panel>
          <Panel id='riderPanel' eventKey="2">
            <Panel.Heading style={{color: '#337ab7'}}>
              <OverlayTooltip tooltip="This is where to view your ride request status">
              <Panel.Title toggle={true}>Me As the Rider</Panel.Title></OverlayTooltip>
            </Panel.Heading>
            <Panel.Collapse><Panel.Body>
              {myRideReqs.length > 0 && <Table striped bordered condensed hover>
                <thead><tr>
                  <th>Departure Time</th><th>From</th><th>To</th>
                  <th>Driver</th><th>Status</th><th>Actions</th>
                </tr></thead>
                <tbody>
                  {myRideReqs.map((ride, i) => (
                    <RideReqRow key={i} rideInfo={ride} isDriver={false}/>
                  ))}
                </tbody>
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
    myRides: state.rideRequests.myRides,
    myRideReqs: state.rideRequests.myRideReqs,
    myShared: state.rideRequests.mySharedRides
  };
}

const connectedRidesPage = connect(mapStateToProps)(RidesPage);
export { connectedRidesPage as RidesPage };
