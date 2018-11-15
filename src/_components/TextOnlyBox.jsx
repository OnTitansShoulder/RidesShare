import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, FormGroup } from 'react-bootstrap';

class TextOnlyBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text,
      valid: null
    };
    this.validateText = this.validateText.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    const text = this.props.text;
    if (text) this.validateText(text);
  }
  validateText(value) {
    var chars = [].filter.call(value, c => {
      if (/[\w]/.test(c)) return c;
    });
    var valid = 'error';
    if (chars.length > 1) {
      valid = 'success';
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
      <FormGroup controlId={this.props.name} validationState={this.state.valid}>
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
