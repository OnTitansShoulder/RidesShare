import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';

class EmailBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      valid: null
    };
    this.validateEmail = this.validateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const email = this.props.email;
    if (email) this.validateEmail(email);
  }
  validateEmail(value) {
    var pattern = /^[\w\d]+(.[\w\d]+)?@ufl.edu$/
    var valid = 'error';
    if (value.match(pattern)) {
      valid = 'success';
      let chars = [].map.call(value, c => {
        if (/[A-Z]/.test(c)) return c.toLowerCase();
        return c;
      });
      value = chars.join("");
      this.props.handleUpdate('username', value);
    } else {
      this.props.handleUpdate('username', '');
    }
    this.setState({ email: value, valid });
  }
  handleChange(e) { this.validateEmail(e.target.value); }
  render() {
    return (
      <FormGroup controlId="email" validationState={this.state.valid}>
      {this.props.disabled && <FormControl type="text" value={this.state.email}
        disabled="true" /> || <FormControl type="text" value={this.state.email}
        onChange={this.handleChange} placeholder="ufl.edu email address"/>
      }<FormControl.Feedback />
      </FormGroup>
    );
  }
}

EmailBox.propTypes = {
  email: PropTypes.string,
  disabled: PropTypes.bool,
  handleUpdate: PropTypes.func
};
EmailBox.defaultProps = {
  email: '',
  disabled: false,
  handleUpdate: function(z) {}
};

export { EmailBox };
