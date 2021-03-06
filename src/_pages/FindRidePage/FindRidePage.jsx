import React from 'react';
import {Grid, Row, Col, FormControl, ControlLabel, Glyphicon} from 'react-bootstrap';
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
      altDays: 0, radius: 0.025, zoom: this.props.mapState.zoom,
      fromAddress: '', toAddress: '',
      fromLocation: {}, toLocation: {},
      activeLocation: this.props.mapState.center
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.swapAddrs = this.swapAddrs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMapChange = this.handleMapChange.bind(this);
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
    if (typeof suggestion == 'undefined') {
      return;
    }
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
  swapAddrs() {
    const state = this.state;
    var temp = state['fromAddress'];
    state['fromAddress'] = state['toAddress'];
    this._from.update(state['toAddress']);
    state['toAddress'] = temp;
    this._to.update(temp);
    temp = state['fromLocation'];
    state['fromLocation'] = state['toLocation'];
    state['toLocation'] = temp;
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
  handleMapChange({center, zoom}) {
    this.setState({
      ...this.state,
      activeLocation: center,
      zoom
    });
  }
  handleCenterChange(e) {
    e.preventDefault();
    const state = this.state;
    state['activeLocation'] = state[e.target.name];
    state['zoom'] = 14;
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
          <button className={this.state.fromAddress && "btn btn-primary" || "btn btn-primary disabled"}
            name="fromLocation"
            onClick={this.handleCenterChange}>From</button>
          <Geosuggest ref={el=>this._from=el}
            placeholder="please select from suggestions"
            getSuggestLabel={(s) => s.description + " ..."}
            onSuggestSelect={this.handleSelect} />
          <button className={this.state.toAddress && "btn btn-primary" || "btn btn-primary disabled"}
            name="toLocation"
            onClick={this.handleCenterChange}>To</button>
          <button className="btn btn-default pull-right" onClick={this.swapAddrs}>
            Swap Addresses <Glyphicon glyph='resize-vertical'/>
          </button>
          <Geosuggest ref={el=>this._to=el}
            placeholder="please select from suggestions"
            onSuggestSelect={this.handleSelect} />
          <br />
          <ControlLabel>Search Radius</ControlLabel>
          <FormControl componentClass="select" name="radius" onChange={this.handleChange}>
            <option value="0.025">Small (within 3 miles)</option>
            <option value="0.05">Medium (within 7 miles)</option>
            <option value="0.1">Large (within 15 miles)</option>
          </FormControl> <br />
          <button className="btn btn-primary btn-block" type="submit">Search</button>
        </form>
      </Col>
      <Col xs={9}>
        <div style={{ height: '90vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: '' }}
            onChange={this.handleMapChange}
            zoom={this.state.zoom}
            center={this.state.activeLocation}
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
