import React from 'react';
import {Grid, Row, Col, Table, Panel} from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestActions } from '../../_actions';
import { Pin, TableRow } from '../../_components';
import '../../css/adjustments.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const dispatch = this.props.dispatch;
    const user = this.props.user;
    dispatch(requestActions.findMyRides(user));
    dispatch(requestActions.findMyRideReqs(user));
  }
  render() {
    const { user, myRides, myRideReqs } = this.props;
    const testRide = {
      _id: "5bcfe266bcaea77e579f6cea",
      leavingDate: "2018-10-24T02:20:50.000Z",
      seats: 0,
      fromAddress: "2777 Southwest Archer Road, Gainesville, FL, USA",
      toAddress: "1756 Northwest 71st Avenue, Plantation, FL, USA",
      fullname: "Zhongkai Liu",
      username: "zkliu@ufl.edu"
    };
    return (
      <div> <Grid> <Row>
        <Col xs={2}>
          <div className="text-center">
            <img style={{width: '100px'}} src="/src/assets/Headshot.jpg" />
          </div>
          <br />
          <button className="btn btn-primary btn-block">Account Settings</button> <br />
          <button className="btn btn-primary btn-block">Reset Password</button> <br />
          <button className="btn btn-primary btn-block">Sign Out</button> <br />
          <Pin text='1' rideInfo={testRide} />
        </Col>
        <Col xs={10}>
        <Panel>
          <Panel.Heading>Me as the Driver</Panel.Heading>
          <Panel.Body>
            {myRides.length > 0 && <Table striped bordered condensed hover>
              <thead><tr>
                <th>Departure Time</th>
                <th>From</th>
                <th>To</th>
                <th>Rider</th>
                <th>Status</th>
                <th>Actions</th>
              </tr></thead>
              <tbody>
                {myRides.map((ride, i) => (
                  <TableRow key={i} rideInfo={ride} isDriver={true}/>
                ))}
              </tbody>
            </Table>}
          </Panel.Body>
        </Panel>
        <Panel>
          <Panel.Heading>Me As the Rider</Panel.Heading>
          <Panel.Body>
            {myRideReqs.length > 0 && <Table striped bordered condensed hover>
              <thead><tr>
                <th>Departure Time</th>
                <th>From</th>
                <th>To</th>
                <th>Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr></thead>
              <tbody>
                {myRideReqs.map((ride, i) => (
                  <TableRow key={i} rideInfo={ride} isDriver={false}/>
                ))}
              </tbody>
            </Table>}
          </Panel.Body>
        </Panel>
        </Col>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
    myRides: state.rideRequests.myRides,
    myRideReqs: state.rideRequests.myRideReqs
  };
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage);
export { connectedDashboard as DashboardPage };
