import React from 'react';
import {Grid, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';
import { Pin } from '../../_components';

import GoogleMapReact from 'google-map-react';
import DateTimePicker from 'react-datetime';
import moment from 'moment';
import '../../css/datetimepicker.css';
import '../../css/geosuggest.css';
import '../../css/adjustments.css';

import { mapActions, requestActions } from '../../_actions';

class PostRidePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leavingDate: moment().format(),
      seats: 0,
      fromAddress: '',
      toAddress: '',
      fromLocation: {},
      toLocation: {},
      mapCenter: 'A'
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDateChange(date) {
    const state = this.state;
    if (typeof date == "string") return;
    if (new Date(date) < new Date(moment())) {
      date = moment();
    }
    date = date.format();
    state['leavingDate'] = date;
    this.setState(state);
  }

  handleChange(e) {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleSelect(suggestion) {
    var address = suggestion.description;
    var location = suggestion.location;
    const state = this.state;
    if (suggestion.label.indexOf("...") != -1) {
      state['fromAddress'] = address;
      state['fromLocation'] = location;
      state['mapCenter'] = 'A';
      this.props.dispatch(mapActions.newCenter(location));
    } else {
      state['toAddress'] = address;
      state['toLocation'] = location;
      state['mapCenter'] = 'B';
      this.props.dispatch(mapActions.newCenter(location));
    }
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.user;
    const rideInfo = {
      leavingDate: this.state.leavingDate,
      seats: this.state.seats,
      fromAddress: this.state.fromAddress,
      toAddress: this.state.toAddress,
      fromLocation: this.state.fromLocation,
      toLocation: this.state.toLocation
    };
    this.props.dispatch(requestActions.newRide(rideInfo, user));
  }

  render(){
    const { mapState } = this.props;
    return (
      <div> <Grid> <Row>
        <Col xs={3}>
          <form onSubmit={this.handleSubmit}>
            <h2>Post a Ride</h2> <br />
            <ControlLabel>Leaving Date and Time</ControlLabel>
            <DateTimePicker onChange={this.handleDateChange} /> <br />
            <ControlLabel>Seats Available</ControlLabel>
            <input className="adjust-input-box" type="number" name="seats" value={this.state.seats} onChange={this.handleChange} /> <br />
            <br />
            <ControlLabel>Start Address</ControlLabel>
            <Geosuggest
              placeholder="please select from suggestions"
              getSuggestLabel={(s) => s.description + " ..."}
              onSuggestSelect={this.handleSelect} /> <br />
            <ControlLabel>Destination Address</ControlLabel>
            <Geosuggest
              placeholder="please select from suggestions"
              onSuggestSelect={this.handleSelect} /> <br />
            <button className="btn btn-primary btn-block" type="submit">Post Ride</button>
          </form>
        </Col>
        <Col xs={9}>
          <div style={{ height: '90vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: '' }}
              center={mapState.center}
              zoom={mapState.zoom}
            >
            <Pin text={this.state.mapCenter} handleClick={() => {}} />
            </GoogleMapReact>
          </div>
        </Col>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return { mapState: state.mapState, user: state.authentication.user };
}

const connectedPostRidePage = connect(mapStateToProps)(PostRidePage);
export { connectedPostRidePage as PostRidePage };
