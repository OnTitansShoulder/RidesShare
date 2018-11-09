import React from 'react';
import {Row, Col, Button, FormGroup, FormControl, OverlayTrigger, Popover} from 'react-bootstrap';
import { connect } from 'react-redux';
import { PasswordBox } from '../../_components';
import { userActions } from '../../_actions';

class PasswordPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate(name, value) {
    const state = this.state;
    state[name] = value;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { dispatch, user } = this.props;
    const password = this.state.password;
    if (password) {
      dispatch(userActions.changePassword({id: user._id, password, un: user.username}));
    }
  }
  render() {
    const _this = this.state;
    return (
      <div><Col xs={10}>
        <Col xs={10} xsOffset={1} sm={4} smOffset={4}><Row>
        <p className="adjusted-title">Change your password</p>
        <form onSubmit={this.handleSubmit}><br />
          <PasswordBox handleUpdate={this.handleUpdate} /><br />
          <div style={{display: 'grid', margin: '15px 0 0 0'}}>
            <Button bsStyle='primary' onClick={this.handleSubmit} style={{ margin: 'auto' }}>Update</Button>
          </div>
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
