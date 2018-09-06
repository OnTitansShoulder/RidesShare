import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers/index.js'

let store = createStore(reducer)

import App from './components/App'
import Dashboard from './components/Dashboard'
import FindRide from './components/FindRide'
import PostRide from './components/PostRide'
import Register from './components/Register'
import Signin from './components/Signin'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/findride' component={FindRide} />
        <Route exact path='/postride' component={PostRide} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/signin' component={Signin} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('app'));
