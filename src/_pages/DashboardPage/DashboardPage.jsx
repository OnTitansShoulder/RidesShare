import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

import { userActions } from '../../_actions';

class DashboardPage extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={3}>
              <div>
                <img src="/app/assets/temp.png" />
              </div>
              <br />
              <button className="btn btn-primary btn-block">Account Settings</button> <br />
              <button className="btn btn-primary btn-block">Reset Password</button> <br />
              <button className="btn btn-primary btn-block">Sign Out</button> <br />
            </Col>
            <Col xs={3} xsOffset={1}>
              <button className="btn btn-primary btn-block">Post A Ride</button> <br />
            </Col>
            <Col xs={3} xsOffset={1}>
              <button className="btn btn-primary btn-block">Request A Ride</button> <br />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user
  };
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage);
export { connectedDashboard as DashboardPage };
