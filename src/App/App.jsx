import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { NavBar } from '../NavBar'
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage, LoginPage, RegisterPage, DashboardPage, FindRidePage, PostRidePage } from '../_pages';

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
                  <PrivateRoute exact path="/dashboard" component={DashboardPage} />
                  <PrivateRoute exact path="/riding" component={FindRidePage} />
                  <PrivateRoute exact path="/sharing" component={PostRidePage} />
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
