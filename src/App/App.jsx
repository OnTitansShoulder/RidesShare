import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { NavBar } from '../NavBar'
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage, LoginPage, RegisterPage, DashboardPage, FindRidePage, PostRidePage } from '../_pages';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faQuestionCircle as faQC, faInfoCircle as faIC } from '@fortawesome/free-solid-svg-icons';
library.add(faCar, faQC, faIC);

function LOADING({source}) {
  return (<img src="/src/assets/loading_spin.gif" />);
} //{`../assets/${source}.gif`}
const cntnerStyle = {
  position: "fixed",
  height: "100%",
  width: "100%",
  zIndex: "3"
};
const absStyle = {
  position: "absolute",
  top: "50%",
  left: "0",
  right: "0",
  textAlign: "center"
};

class App extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    history.listen((location, action) => {
        // clear alert on location change
        dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        { (alert.load_circle) && <div style={cntnerStyle}>
          <div style={absStyle}><LOADING source={alert.circle_type} /></div>
        </div>}
        <NavBar />
        <div className="container">
          <div>
            {alert.message &&
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/riding" component={FindRidePage} />
                <PrivateRoute path="/sharing" component={PostRidePage} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
