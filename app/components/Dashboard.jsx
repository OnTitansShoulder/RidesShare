import React, { Component } from 'react'
import {Grid, Row, Col} from 'react-bootstrap'

import Header from '../containers/Header'

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { number: 1 };
  }

  render(){
    return (
      <div>
        <Header />
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
    )
  }
}
