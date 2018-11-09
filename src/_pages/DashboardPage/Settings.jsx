import React from 'react';
import {Grid, Row, Col, Modal, Button, FormGroup, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';

import { PhoneBox, EmailBox, TextOnlyBox, ImageEditor } from '../../_components';
import { userActions } from '../../_actions';
const defaultImage = "/src/assets/Headshot_min.jpg";

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      showModal: false,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      profileImg: user.profileImg
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  handleShow() { this.setState({ showModal: true }); }
  handleClose() { this.setState({ showModal: false }); }
  handleUpdate(field, value) {
    const state = this.state;
    state[field] = value;
    this.setState(state);
    this.handleClose();
  }
  handleSubmit(e) {
    e.preventDefault();
    const userInfo = this.state;
    const { user, dispatch } = this.props;
    const updates = {
      id: user._id,
      username: userInfo.username,
      firstname: userInfo.firstname,
      lastname: userInfo.lastname,
      phone: userInfo.phone,
      profileImg: userInfo.profileImg
    };
    if (userInfo.firstname && userInfo.lastname && userInfo.username && userInfo.phone) {
      dispatch(userActions.updateUser(updates));
    }
  }
  handleClear() {
    const emptyInfo = {
      username: '', firstname: '', lastname: '', phone: '', showModal: false
    };
    this.setState(emptyInfo);
  }
  render() {
    const { profileUrl, match } = this.props;
    const _this = this.state;
    return (
      <div><Col xs={10}>
        <Col xs={10} xsOffset={1} sm={4} smOffset={4}><Row>
        <p className="adjusted-title">Account Settings</p>
        <form onSubmit={this.handleSubmit}>
          <div className="text-center"><a onClick={this.handleShow}>
            <img style={{width: '100px'}} src={_this.profileImg && _this.profileImg || defaultImage} />
          </a></div><br />
          <EmailBox email={_this.username} handleUpdate={this.handleUpdate} disabled={true} />
          <Row><Col xs={6}>
            <TextOnlyBox text={_this.firstname} name={"firstname"} handleUpdate={this.handleUpdate} />
          </Col><Col xs={6}>
            <TextOnlyBox text={_this.lastname} name={"lastname"} handleUpdate={this.handleUpdate} />
          </Col></Row>
          <PhoneBox phone={_this.phone} handleUpdate={this.handleUpdate} /><br />
          <div style={{display: 'grid', margin: '15px 0 0 0'}}>
            <Button bsStyle='primary' onClick={this.handleSubmit} style={{ margin: 'auto' }}>Update</Button>
          </div>
        </form>
      </Row></Col></Col>
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton><Modal.Title>Change Profile Photo</Modal.Title></Modal.Header>
        <Modal.Body>
          <ImageEditor width="400px" height="150px" handleUpdate={this.handleUpdate} />
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
