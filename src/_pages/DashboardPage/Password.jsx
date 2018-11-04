import React from 'react';
import {Row, Col, Button, FormGroup, FormControl} from 'react-bootstrap';
import { connect } from 'react-redux';

class PasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const user = this.state;
    if (user.firstname && user.lastname && user.username && user.phone) {
      dispatch(userActions.register(user));
    }
  }
  render() {
    const { profileUrl, match } = this.props;
    const _this = this.state;
    return (
      <div><Col xs={10}>
        <Col xs={10} xsOffset={1} sm={4} smOffset={4}><Row>
        <form onSubmit={this.handleSubmit}><br />
          <FormGroup controlId="newPassword">
            <FormControl type="password" placeholder="New Password" value={_this.password} name="password" onChange={this.handleChange} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="newPasswordConfirm">
            <FormControl type="password" placeholder="Confirm New Password" value={_this.confirm} name="confirm" onChange={this.handleChange} />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </Row></Col></Col></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  };
}

const connectedPasswordPage = connect(mapStateToProps)(PasswordPage);
export { connectedPasswordPage as PasswordPage };
