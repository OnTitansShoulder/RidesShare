import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonGroup, Button, ButtonToolbar,
  Modal, Tooltip, ListGroup, ListGroupItem } from 'react-bootstrap';
import StarRatings from 'react-star-ratings';
import moment from 'moment';
import { connect } from 'react-redux';
import '../../css/adjustments.css';
import '../../css/special-overwrite.css';
import { OverlayTooltip } from '../../_components';
import { requestActions } from '../../_actions';
import { FontAwesomeIcon as FAI } from '@fortawesome/react-fontawesome';

const btnStyle = { margin: 'auto'};

class HistoryRow extends React.Component {
  constructor(props) {
    super(props);
    const {rideInfo, isDriver} = this.props;
    var ratings = rideInfo.riderComment;
    if (isDriver)
      ratings = rideInfo.driverComment;
    this.state = {
      star: ratings.star,
      comment: ratings.comment,
      showModal: false
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleShow() { this.setState({ ...this.state, showModal: true }); }
  handleClose() { this.setState({showModal: false}); }
  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }
  changeRating(newRating) { this.setState({star: newRating}); }
  handleSubmit() {
    const {rideInfo, isDriver, dispatch} = this.props;
    const comment = {
      comment: this.state.comment,
      star: this.state.star
    };
    var updates = {};
    if (isDriver) updates = { driverComment: comment };
    else updates = { riderComment: comment };
    const reqInfo = {
      id: rideInfo._id,
      updates
    };
    dispatch(requestActions.rateRide(reqInfo));
    handleClose();
  }
  render() {
    const ride = this.props.rideInfo;
    const isDriver = this.props.isDriver;
    return (
      <tr>
        <td>{moment(ride.leavingDate).format('YYYY-MM-DD hh:mm A')}</td>
        <td>{ride.fromAddress}</td>
        <td>{ride.toAddress}</td>
        <td>{isDriver && ride.riderName || ride.driverName}</td>
        <td><ButtonToolbar><ButtonGroup>
          {<OverlayTooltip tooltip="rate him/her">
            <Button bsStyle='warning' style={btnStyle} onClick={this.handleShow}>
            <Glyphicon glyph='comment'/></Button></OverlayTooltip>
          }
        </ButtonGroup></ButtonToolbar></td>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>Rate {isDriver && ride.riderName || ride.driverName}
          </Modal.Title></Modal.Header>
          <Modal.Body>
            <div className='indent-parag'>
              <ListGroup>
                {isDriver && ride.riderComment.star >= 0 &&
                <ListGroupItem header={`Feedback from ${ride.riderName}`}>
                  <StarRatings rating={ride.riderComment.star}
                  starRatedColor='rgb(255, 200, 0)' starDimension='25px' />
                  <p>{`"${ride.riderComment.comment}"`}</p>
                </ListGroupItem>}
                {(!isDriver) && ride.driverComment.star >= 0 &&
                <ListGroupItem header={`Feedback from ${ride.driverName}`}>
                  <StarRatings rating={ride.driverComment.star}
                  starRatedColor='rgb(255, 200, 0)' starDimension='25px' />
                  <p>{`"${ride.driverComment.comment}"`}</p>
                </ListGroupItem>}
                <ListGroupItem header="Your Rating">
                  <StarRatings rating={this.state.star} starRatedColor='rgb(255, 200, 0)'
                    changeRating={this.changeRating} />
                  <textarea rows={6} cols={44} name='comment'
                    placeholder='Write what you wish the other one to see.'
                    value={this.state.comment}
                    onChange={this.handleChange}></textarea>
                  <div style={{display: 'grid', margin: '15px 0 0 0'}}>
                    <button className='btn btn-primary' onClick={this.handleSubmit}
                      style={{margin: 'auto'}}>Update Your Rating</button>
                  </div>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Modal.Body>
        </Modal>
      </tr>
    );
  }
}

HistoryRow.propTypes = {
  isDriver: PropTypes.bool,
  rideInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {};
}

const connectedHistoryRow = connect(mapStateToProps)(HistoryRow)
export { connectedHistoryRow as HistoryRow };
