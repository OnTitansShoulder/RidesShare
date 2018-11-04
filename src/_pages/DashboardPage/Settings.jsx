import React from 'react';
import {Grid, Row, Col, Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      showModal: false,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }
  handleShow() { this.setState({ showModal: true }); }
  handleClose() { this.setState({ showModal: false }); }
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
        <form onSubmit={this.handleSubmit}>
          <div className="text-center"><a onClick={this.handleShow}>
            <img style={{width: '100px'}} src="/src/assets/Headshot.jpg" />
          </a></div><br />
          <FormGroup controlId="Email">
            <FormControl type="email" placeholder="UF Email Address" value={_this.username} name="username" onChange={this.handleChange} />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup controlId="Names" >
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
          <FormGroup controlId="Phone">
            <FormControl type="text" placeholder="Phone Number" value={_this.phone} name="phone" onChange={this.handleChange} />
            <FormControl.Feedback />
          </FormGroup>
        </form>
      </Row></Col></Col>
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton><Modal.Title>Change Profile Photo</Modal.Title></Modal.Header>
        <Modal.Body>
          <p>Drop or select new profile photo below.</p>
          <Button bsStyle='primary' onClick={this.handleClose}>Confirm</Button>
          <Button className='pull-right' bsStyle='default' onClick={this.handleClose}>Cancel</Button>
        </Modal.Body>
      </Modal></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.authentication.user,
  };
}

const connectedSettingsPage = connect(mapStateToProps)(SettingsPage);
export { connectedSettingsPage as SettingsPage };
