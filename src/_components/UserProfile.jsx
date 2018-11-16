import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button, Row, Col} from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';
import { userActions } from '../_actions';
import '../css/adjustments.css';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleShow() {
    this.setState({ ...this.state, showModal: true });
  }
  handleClose() { this.setState({showModal: false}); }
  render() {
    const {userProfile, user, name} = this.props;
    return (<div>
      <a onClick={this.handleShow}>{name}</a>
      <Modal show={this.state.showModal} onHide={this.handleClose}>
        <Modal.Header closeButton><Modal.Title>
          <FAI icon="id-card" /> {name}</Modal.Title></Modal.Header>
        <Modal.Body><div className="modal-box">
          <Row><Col xs={4}>
          {userProfile && <div>
            <img src={userProfile.profileImg} />
          </div>}</Col>
          <Col xs={8}>
            <h4>Overall Ratings</h4>
            As a driver: <StarRatings rating={userProfile.driverRating} starSpacing='3px'
              starRatedColor='rgb(255, 200, 0)' starDimension='25px' /><br />
            As a rider: <StarRatings rating={userProfile.riderRating} starSpacing='3px'
              starRatedColor='rgb(255, 200, 0)' starDimension='25px' />
          </Col>
          </Row>
        </div></Modal.Body>
      </Modal>
    </div>);
  }
}

UserProfile.propTypes = {
  user: PropTypes.string,
  name: PropTypes.string,
  userProfile: PropTypes.object
};
//
// function mapStateToProps(state) {
//   return {
//     userProfiles: state.users.userProfiles
//   };
// }
//
// const connectedUserProfile = connect(mapStateToProps)(UserProfile);
// export { connectedUserProfile as UserProfile };
export { UserProfile };
