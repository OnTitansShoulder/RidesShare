import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PrivateRoute } from '../../_components';
import '../../css/adjustments.css';

import { RidesPage } from './Rides';
import { SettingsPage } from './Settings';
import { PasswordPage } from './Password';
const defaultImg = "/src/assets/Headshot_min.jpg";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { profileImg, match } = this.props;
    return (
      <div> <Grid> <Row>
        <Col xs={2}>
          <div className="text-center"><a href={`${match.url}/settings`}>
            <img style={{width: '100px'}} src={profileImg && profileImg || defaultImg} />
          </a></div><br />
          <a href={`${match.url}`} className="btn btn-primary btn-block">Ride Requests</a> <br />
          <a href={`${match.url}/settings`} className="btn btn-primary btn-block">Account Settings</a> <br />
          <a href={`${match.url}/password`} className="btn btn-primary btn-block">Reset Password</a> <br />
        </Col>
        <PrivateRoute exact path={`${match.path}`} component={RidesPage}></PrivateRoute>
        <PrivateRoute path={`${match.path}/settings`} component={SettingsPage}></PrivateRoute>
        <PrivateRoute path={`${match.path}/password`} component={PasswordPage}></PrivateRoute>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileImg: state.authentication.user.profileImg,
  };
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage);
export { connectedDashboard as DashboardPage };
