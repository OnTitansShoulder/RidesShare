import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';

class TextOnlyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      valid: false
    };
    this.validateText = this.validateText.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.isValid = this.isValid.bind(this);
  }
  componentDidMount() {
    const text = this.props.text;
    if (text) this.validateText(text);
  }
  isValid() { return (this.state.valid && 'success' || 'error'); }
  validateText(value) {
    var chars = [].filter.call(value, c => {
      if (/[\w]/.test(c)) return c;
    });
    var valid = false;
    if (chars.length > 0) {
      valid = true;
      value = chars[0].toUpperCase() + chars.join("").substring(1).toLowerCase();
      this.props.handleUpdate(this.props.name, value);
    } else {
      this.props.handleUpdate(this.props.name, '');
    }
    this.setState({ text: value, valid });
  }
  handleChange(e) { this.validateText(e.target.value); }
  render() {
    return (
      <FormGroup controlId={this.props.name} validationState={this.isValid()}>
      <FormControl type="text" value={this.state.text} onChange={this.handleChange} placeholder={this.props.name}/>
      <FormControl.Feedback />
      </FormGroup>
    );
  }
}

TextOnlyBox.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  handleUpdate: PropTypes.func
};
TextOnlyBox.defaultProps = {
  name: '',
  text: '',
  handleUpdate: function(z) {}
};

export { TextOnlyBox };
