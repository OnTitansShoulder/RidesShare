import React, { Component } from 'react'
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

import Header from '../containers/Header'

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: ''
    }
  }

  validateUN() {
    let un = this.state.username
    if (un == '') return null
    else if (un.indexOf('@ufl.edu') == -1) return 'error'
    return 'success'
  }

  validatePW() {
    let pw = this.state.password
    if (pw == '') return null
    else if (pw.length < 8) return 'error'
    return 'success'
  }

  validatePhone() {
    let pattern = /^[0-9]+$/
    let phone = this.state.phone
    if (phone == '') return null
    else if (phone.length != 10 || !phone.match(pattern)) return 'error'
    return 'success'
  }

  validateText() {
    if (this.state.firstname == '' || this.state.lastname == '') return null
    return 'success'
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
                <h2>Register</h2> <br />
                <FormGroup controlId="Email" validationState={this.validateUN()}>
                  <FormControl type="email" placeholder="UF Email Address" value={this.state.username} name="username" onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="Names" validationState={this.validateText()}>
                  <Row>
                    <Col xs={6}>
                      <FormControl type="text" placeholder="First Name" value={this.state.firstname} name="firstname" onChange={this.handleChange} />
                      <FormControl.Feedback />
                    </Col>
                    <Col xs={6}>
                      <FormControl type="text" placeholder="Last Name" value={this.state.lastname} name="lastname" onChange={this.handleChange} />
                      <FormControl.Feedback />
                    </Col>
                  </Row>
                </FormGroup>
                <FormGroup controlId="Phone" validationState={this.validatePhone()}>
                  <FormControl type="text" placeholder="Phone Number" value={this.state.phone} name="phone" onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <FormGroup controlId="Password" validationState={this.validatePW()}>
                  <FormControl type="password" placeholder="Choose a Password" value={this.state.password} name="password" onChange={this.handleChange} />
                  <FormControl.Feedback />
                </FormGroup>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
