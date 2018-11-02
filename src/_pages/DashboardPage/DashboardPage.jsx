import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';
import { history } from '../../_helpers';
import { PrivateRoute } from '../../_components';
import '../../css/adjustments.css';

import { RidesPage } from './Rides';
import { SettingsPage } from './Settings';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    history.listen((location, action) => {
      // clear alert on location change
      this.props.dispatch(alertActions.clear());
    });
  }
  render() {
    const { profileUrl, match } = this.props;
    return (
      <div> <Grid> <Row>
        <Col xs={2}>
          <div className="text-center"><a href={`${match.url}/settings`}>
            <img style={{width: '100px'}} src="/src/assets/Headshot.jpg" />
          </a></div><br />
          <a href={`${match.url}`} className="btn btn-primary btn-block">Ride Requests</a> <br />
          <a href={`${match.url}/settings`} className="btn btn-primary btn-block">Account Settings</a> <br />
          <a href={`${match.url}/password`} className="btn btn-primary btn-block">Reset Password</a> <br />
        </Col>
        <PrivateRoute exact path={`${match.path}`} component={RidesPage}></PrivateRoute>
        <PrivateRoute path={`${match.path}/settings`} component={SettingsPage}></PrivateRoute>
        <PrivateRoute path={`${match.path}/password`} component={RidesPage}></PrivateRoute>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profileUrl: state.authentication.user,
  };
}

const connectedDashboard = connect(mapStateToProps)(DashboardPage);
export { connectedDashboard as DashboardPage };
