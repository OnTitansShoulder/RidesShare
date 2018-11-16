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

import { requestActions } from '../../_actions';

class PostRidePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leavingDate: moment().format(),
      fromAddress: '',
      toAddress: '',
      fromLocation: '',
      toLocation: '',
      activeLocation: this.props.mapState.center,
      zoom: this.props.mapState.zoom
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
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
  handleCenterChange(e) {
    e.preventDefault();
    const state = this.state;
    state['activeLocation'] = state[e.target.name];
    state['zoom'] = 14;
    this.setState(state);
  }
  handleMapChange({center, zoom}) {
    this.setState({
      ...this.state,
      activeLocation: center,
      zoom
    });
  }
  handleSelect(suggestion) {
    var address = suggestion.description;
    var location = suggestion.location;
    const state = this.state;
    if (suggestion.label.indexOf("...") != -1) {
      state['fromAddress'] = address;
      state['fromLocation'] = location;
    } else {
      state['toAddress'] = address;
      state['toLocation'] = location;
    }
    state['activeLocation'] = location;
    state['zoom'] = 14;
    this.setState(state);
  }
  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.user;
    const rideInfo = {
      leavingDate: this.state.leavingDate,
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
            <br />
            <button className={this.state.fromAddress && "btn btn-primary" || "btn btn-primary disabled"}
              name="fromLocation"
              onClick={this.handleCenterChange}>From</button>
            <Geosuggest
              placeholder="please select from suggestions"
              getSuggestLabel={(s) => s.description + " ..."}
              onSuggestSelect={this.handleSelect} /> <br />
            <button className={this.state.toAddress && "btn btn-primary" || "btn btn-primary disabled"}
              name="toLocation"
              onClick={this.handleCenterChange}>To</button>
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
              onChange={this.handleMapChange}
              center={this.state.activeLocation}
              zoom={this.state.zoom}
            >
            {this.state.fromLocation && (
              <Pin text='A' key={0} rideInfo={null}
              lat={this.state.fromLocation.lat} lng={this.state.fromLocation.lng}/>
            )}
            {this.state.toLocation && (
              <Pin text='B' key={1} rideInfo={null}
              lat={this.state.toLocation.lat} lng={this.state.toLocation.lng}/>
            )}
            </GoogleMapReact>
          </div>
        </Col>
      </Row> </Grid> </div>
    );
  }
}

function mapStateToProps(state) {
  return { mapState: state.mapState,
    user: state.authentication.user };
}

const connectedPostRidePage = connect(mapStateToProps)(PostRidePage);
export { connectedPostRidePage as PostRidePage };
