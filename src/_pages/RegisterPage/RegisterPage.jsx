import React from 'react'
import { Link } from 'react-router-dom';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { connect } from 'react-redux';

import { userActions } from '../../_actions';
import { PhoneBox, EmailBox, TextOnlyBox, PasswordBox } from '../../_components';

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
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  validateUN() {
    let un = this.state.username
    if (un == '') return null
    else if (un.indexOf('@ufl.edu') == -1) return 'error'
    return 'success'
  }
  handleUpdate(name, value) {
    const state = this.state;
    state[name] = value;
    this.setState(state);
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
            <EmailBox email='' handleUpdate={this.handleUpdate} disabled={false} />
            <Row><Col xs={6}>
              <TextOnlyBox text='' name='firstname' handleUpdate={this.handleUpdate} />
            </Col><Col xs={6}>
              <TextOnlyBox text='' name='lastname' handleUpdate={this.handleUpdate} />
            </Col></Row>
            <PhoneBox phone='' handleUpdate={this.handleUpdate} /><br />
            <PasswordBox handleUpdate={this.handleUpdate} /><br />
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
