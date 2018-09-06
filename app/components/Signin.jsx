import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import Header from '../containers/Header'

export default class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleSubmit(e) {

  }

  render(){
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={10} xsOffset={1} sm={4} smOffset={4}>
              <form onSubmit={this.handleSubmit}>
                <h2>Sign In</h2> <br />
                <FormGroup controlId="Username">
                  <FormControl type="email" placeholder="Account Email" value={this.state.username} name="username" onChange={this.handleChange} />
                </FormGroup>
                <FormGroup controlId="Password">
                  <FormControl type="password" placeholder="Account Password" value={this.state.password} name="password" onChange={this.handleChange} />
                </FormGroup> <br />
                <Row>
                  <Col xs={6}>
                    <a className="btn btn-lg btn-primary btn-block" href="/register">Register</a>
                  </Col>
                  <Col xs={6}>
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign In</button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
