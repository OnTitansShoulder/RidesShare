import React from 'react';
import {Col, Table, Panel, Label, Modal, Button, Glyphicon} from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestActions } from '../../_actions';
import { ControlledPanels, OverlayTooltip } from '../../_components';
import { RideReqRow, RideRow } from './';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import '../../css/adjustments.css';

class RidesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    const dispatch = this.props.dispatch;
    const user = this.props.user;
    dispatch(requestActions.dashboard_refresh(user));
  }
  handleShow() { this.setState({ ...this.state, showModal: true }); }
  handleClose() { this.setState({showModal: false}); }
  render() {
    const { user, myRides, myRideReqs, myShared } = this.props;
    return (
      <Col xs={10}>
        <p className="adjusted-title">Ride Requests</p>
        <ControlledPanels>
          <Panel id='sharedRidesPanel' eventKey="3">
            <Panel.Heading style={{color: '#337ab7'}}>
              <OverlayTooltip tooltip="This is where to make your rides searchable or delete a ride">
              <Panel.Title toggle={true}>My Shared Rides <Label bsStyle="info">{myShared.length}</Label>
              <FAI className="pull-right" icon="info-circle" onClick={this.handleShow} />
              </Panel.Title></OverlayTooltip>
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
              <Panel.Title toggle={true}>Me As the Driver <Label bsStyle="info">{myRides.length}</Label>
              </Panel.Title></OverlayTooltip>
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
              <Panel.Title toggle={true}>Me As the Rider <Label bsStyle="info">{myRideReqs.length}</Label>
              </Panel.Title></OverlayTooltip>
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
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton><Modal.Title><FAI icon="info-circle" /> Button Functions</Modal.Title></Modal.Header>
          <Modal.Body>
            <p><Button bsStyle='success'>
            <Glyphicon glyph='eye-open'/></Button> Mark your ride as open. This ride will continue to be searchable by requestors.</p>
            <p><Button bsStyle='danger'>
            <Glyphicon glyph='eye-close'/></Button> Mark your ride as full. You will not receive new ride requests for this ride.</p>
            <p><Button bsStyle='warning'>
            <Glyphicon glyph='trash'/></Button> Delete this ride from the system. You can still see your ride requests in the history.</p>
            <p><Button bsStyle='success'>
            <Glyphicon glyph='ok'/></Button> Mark this ride request as accepted.</p>
            <p><Button bsStyle='danger'>
            <Glyphicon glyph='remove'/></Button> Reject this ride. Be 100% sure because it is not reversible and the rider will be notified for this decision.</p>
            <p><Button bsStyle='warning'>
            <Glyphicon glyph='level-up'/></Button> Archive this ride. You can view past ride requests in the history section.</p>
          </Modal.Body>
        </Modal>
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
