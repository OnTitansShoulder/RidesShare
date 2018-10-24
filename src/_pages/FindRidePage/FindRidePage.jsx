import React from 'react';
import {Grid, Row, Col, FormControl, ControlLabel} from 'react-bootstrap';
import { connect } from 'react-redux';
import Geosuggest from 'react-geosuggest';

import GoogleMapReact from 'google-map-react';
import DateTimePicker from 'react-datetime';
import moment from 'moment';
import '../../css/datetimepicker.css';
import '../../css/geosuggest.css';
import '../../css/adjustments.css';
import { Pin } from '../../_components'

import { mapActions, requestActions } from '../../_actions';

class FindRidePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      leavingDate: moment().format(),
      altDays: 0,
      fromAddress: '',
      toAddress: '',
      fromLocation: {},
      toLocation: {},
      radius: 0.025,
      activeLocation: this.props.mapState.center
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCenterChange = this.handleCenterChange.bind(this);
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

  handleSelect(suggestion) {
    var address = suggestion.description;
    var location = suggestion.location;
    const state = this.state;
    if (suggestion.label.indexOf("...") != -1) {
      state['fromAddress'] = address;
      state['fromLocation'] = location;
      this.props.dispatch(mapActions.newCenter(location));
    } else {
      state['toAddress'] = address;
      state['toLocation'] = location;
      this.props.dispatch(mapActions.newCenter(location));
    }
    state['activeLocation'] = location;
    this.setState(state);
  }

  handleChange(e) {
    const state = this.state;
    var name = e.target.name;
    if (name == 'altDays' || name == 'radius') {
      state[name] = Number(e.target.value);
    } else {
      state[name] = e.target.value;
    }
    this.setState(state);
  }

  handleCenterChange(e) {
    e.preventDefault();
    const state = this.state;
    state['activeLocation'] = state[e.target.name];
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = this.props.user;
    const criteria = {
      leavingDate: this.state.leavingDate,
      altDays: this.state.altDays,
      fromLocation: this.state.fromLocation,
      toLocation: this.state.toLocation,
      radius: this.state.radius
    };
    this.props.dispatch(requestActions.searchRides(criteria, user));
  }

  render(){
    const { mapState } = this.props;
    return (
      <div> <Grid> <Row> <Col xs={3}>
        <form onSubmit={this.handleSubmit}>
          <h2>Find a Ride</h2> <br />
          <ControlLabel>Leaving Date and Time</ControlLabel>
          <DateTimePicker onChange={this.handleDateChange} />
          <ControlLabel>Flexible Dates</ControlLabel>
          <FormControl componentClass="select" name="altDays" onChange={this.handleChange}>
            <option value="0">None</option>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
          </FormControl> <br />
          <ControlLabel>Start Address</ControlLabel>
          <Geosuggest
            placeholder="please select from suggestions"
            getSuggestLabel={(s) => s.description + " ..."}
            onSuggestSelect={this.handleSelect} />
          <ControlLabel>Destination Address</ControlLabel>
          <Geosuggest
            placeholder="please select from suggestions"
            onSuggestSelect={this.handleSelect} />
          <div>
            <button className="btn btn-primary" name="fromLocation"
              onClick={this.handleCenterChange}>Start Point</button>
            <button className="btn btn-primary pull-right" name="toLocation"
              onClick={this.handleCenterChange}>Destination Point</button>
          </div>
          <br />
          <ControlLabel>Search Radius</ControlLabel>
          <FormControl componentClass="select" name="radius" onChange={this.handleChange}>
            <option value="0.025">Small</option>
            <option value="0.05">Medium</option>
            <option value="0.1">Large</option>
          </FormControl> <br />
          <button className="btn btn-primary btn-block" type="submit">Search</button>
        </form>
      </Col>
      <Col xs={9}>
        <div style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            center={this.state.activeLocation}
            zoom={mapState.zoom}
          >
          {mapState.searchResults.map((ride,i) => (
            <Pin text={(i+1).toString()}
              key={2*i} rideInfo={ride}
              lat={ride.fromLocation.lat}
              lng={ride.fromLocation.lng} />
          ))}
          {mapState.searchResults.map((ride,i) => (
            <Pin text={(i+1).toString()}
              key={2*i+1} rideInfo={ride}
              lat={ride.toLocation.lat}
              lng={ride.toLocation.lng} />
          ))}
          </GoogleMapReact>
        </div>
      </Col> </Row> </Grid> </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    mapState: state.mapState,
    user: state.authentication.user
  };
}

const connectedFindRidePage = connect(mapStateToProps)(FindRidePage);
export { connectedFindRidePage as FindRidePage };
