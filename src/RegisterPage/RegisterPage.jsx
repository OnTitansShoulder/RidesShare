import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';

import { userActions } from '../_actions';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    e.preventDefault();

    const { dispatch } = this.props;
    const user = this.state;
    if (user.firstname && user.lastname && user.username && user.password && user.phone) {
      dispatch(userActions.register(user));
    }
  }

  render(){
    const { registering } = this.props;
    const _this = this.state;
    return (
      <div> <Grid> <Row>
        <Col xs={10} xsOffset={1} sm={4} smOffset={4}> <div>
          <form onSubmit={this.handleSubmit}>
            <h2>Register {registering &&
              <img className="pull-right" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            }</h2> <br />
            <FormGroup controlId="Email" validationState={this.validateUN()}>
              <FormControl type="email" placeholder="UF Email Address" value={_this.username} name="username" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Names" validationState={this.validateText()}>
              <Row>
                <Col xs={6}>
                  <FormControl type="text" placeholder="First Name" value={_this.firstname} name="firstname" onChange={this.handleChange} />
                  <FormControl.Feedback />
                </Col>
                <Col xs={6}>
                  <FormControl type="text" placeholder="Last Name" value={_this.lastname} name="lastname" onChange={this.handleChange} />
                  <FormControl.Feedback />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup controlId="Phone" validationState={this.validatePhone()}>
              <FormControl type="text" placeholder="Phone Number" value={_this.phone} name="phone" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="Password" validationState={this.validatePW()}>
              <FormControl type="password" placeholder="Choose a Password" value={_this.password} name="password" onChange={this.handleChange} />
              <FormControl.Feedback />
            </FormGroup>
            <Row>
              <Col xs={6}>
                <button className="btn btn-primary btn-block" type="submit">Register</button>
              </Col>
              <Col xs={6}>
                <Link className="btn btn-link pull-right" to="/login">Sign In</Link>
              </Col>
            </Row>
          </form>
        </div> </Col>
      </Row> </Grid> </div>
    )
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
