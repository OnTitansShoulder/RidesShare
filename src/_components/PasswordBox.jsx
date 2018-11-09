import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup, OverlayTrigger, Popover } from 'react-bootstrap';

const popOverContent = (<div><p>
    Your new password should contain at least two types of characters from the following:
  </p><ul>
  <li>At least 8 characters in length</li>
  <li>Upper-case letters</li><li>Lower-case letters</li>
  <li>Numbers</li><li>Special character like $&+=?@#.^*%!-</li>
  </ul></div>
);

const popover = (<Popover id="popover-positioned-bottom" title="">
  {popOverContent}</Popover>);

class PasswordBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirm: '',
      valid: null,
      confirmed: null
    };
    this.validatePW = this.validatePW.bind(this);
    this.validateConfirm = this.validateConfirm.bind(this);
  }
  validatePW(e) {
    const value = e.target.value;
    const state = this.state;
    var counter = 0;
    if (/[A-Z]+/.test(value)) counter += 1;
    if (/[a-z]+/.test(value)) counter += 1;
    if (/[0-9]+/.test(value)) counter += 1;
    if (/[$&+=?@#.^*%!-]+/.test(value)) counter += 1; // $&+,:;=?@#|'<>.^*()%!-
    if (counter >= 2 && value.length >= 8) {
      state['valid'] = 'success';
    } else {
      state['valid'] = 'error';
    }
    state['password'] = value;
    this.setState(state);
  }
  validateConfirm(e) {
    const value = e.target.value;
    const state = this.state;
    if (state.password == value) {
      state['confirmed'] = 'success';
      this.props.handleUpdate('password', value);
    } else {
      state['confirmed'] = 'error';
      this.props.handleUpdate('password', '');
    }
    state['confirm'] = value;
    this.setState(state);
  }
  render() {
    return (
      <div>
      <FormGroup controlId="password" validationState={this.state.valid}>
        <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
        <FormControl type="password" value={this.state.password} onChange={this.validatePW} placeholder="new password"/>
        </OverlayTrigger><FormControl.Feedback />
      </FormGroup>
      <FormGroup controlId="password_confirm" validationState={this.state.confirmed}>
        <FormControl type="password" placeholder="Confirm New Password"
          value={this.state.confirm} onChange={this.validateConfirm} />
        <FormControl.Feedback />
      </FormGroup>
      </div>
    );
  }
}

PasswordBox.propTypes = {
  password: PropTypes.string,
  handleUpdate: PropTypes.func
};
PasswordBox.defaultProps = {
  password: '',
  handleUpdate: function(z) {}
};

export { PasswordBox };
