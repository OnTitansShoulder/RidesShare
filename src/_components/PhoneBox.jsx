import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';

class PhoneBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.phone,
      valid: false
    };
    this.validatePhone = this.validatePhone.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  componentDidMount() {
    const phone = this.props.phone;
    if (phone) this.validatePhone(phone);
  }
  isValid() { return (this.state.valid && 'success' || 'error'); }
  validatePhone(value) {
    var digits = [].filter.call(value, c => {
      if (/[\d]/.test(c)) return c;
    });
    if (digits.length > 3) {
      digits.splice(0, 0, '(');
      digits.splice(4, 0, ')');
      digits.splice(5, 0, ' ');
    }
    if (digits.length > 9) {
      digits.splice(9, 0, '-');
    }
    var phone = digits.join("");
    var valid = false;
    if (digits.length >= 14) {
      digits.length = 14;
      phone = phone.substring(0, 14);
      valid = true;
      this.props.handleUpdate('phone', phone);
    } else {
      this.props.handleUpdate('phone', '');
    }
    this.setState({ phone, valid });
  }
  handleChange(e) { this.validatePhone(e.target.value); }
  render() {
    return (
      <FormGroup controlId="phone" validationState={this.isValid()}>
      <FormControl type="text" value={this.state.phone} onChange={this.handleChange} placeholder="Phone Number"/>
      <FormControl.Feedback />
      </FormGroup>
    );
  }
}

PhoneBox.propTypes = {
  phone: PropTypes.string,
  handleUpdate: PropTypes.func
};
PhoneBox.defaultProps = {
  phone: '',
  handleUpdate: function(z) {}
};

export { PhoneBox };
