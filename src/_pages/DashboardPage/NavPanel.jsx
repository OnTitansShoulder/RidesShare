import React from 'react';
import {Grid, Row, Col, Table, Panel} from 'react-bootstrap';
import { connect } from 'react-redux';

import { requestActions } from '../../_actions';
import '../../css/adjustments.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
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
          </div><br />
          <button className="btn btn-primary btn-block">Account Settings</button> <br />
          <button className="btn btn-primary btn-block">Reset Password</button> <br />
          <button className="btn btn-primary btn-block">Sign Out</button> <br />
        </Col>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user
  };
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage);
export { connectedDashboard as DashboardPage };
