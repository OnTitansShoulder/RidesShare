import React, { Component } from 'react'
import {Grid, Row, Col, FormControl, ControlLabel} from 'react-bootstrap'
import GoogleMapReact from 'google-map-react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css';
import '../css/datepicker-overwrite.css'
import '../css/adjustments.css'

import Header from '../containers/Header'

const AnyReactComponent = ({ text }) => <div>{text}</div>

export default class FindRide extends Component {
  constructor(props) {
    super(props)
    this.state = {
      center: {
        lat: 29.643677,
        lng: -82.354975
      },
      zoom: 11,
      startDate: moment(),
      seats: 0,
      baggages: 0,
      startAddr: '',
      destAddr: '',
      searchRadius: 5
    }
    this.handleDateChange = this.handleDateChange.bind(this)
  }

  handleDateChange(date) {
    const state = this.state
    if (new Date(date) < new Date(moment())) {
      date = moment()
    }
    state['startDate'] = date
    this.setState(state)
  }

  handleChange(e) {
    const state = this.state
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  render(){
    return (
      <div>
        <Header />
        <Grid>
          <Row>
            <Col xs={3}>
              <form onSubmit={this.handleSubmit}>
                <h2>Find a Ride</h2> <br />
                <ControlLabel>Date</ControlLabel>
                <DatePicker className="adjust-input-box" selected={this.state.startDate} onChange={this.handleDateChange} /> <br />
                <ControlLabel>14"Baggage-Sized Spaces Needed</ControlLabel>
                <input className="adjust-input-box" type="number" name="baggage" value={this.state.baggages} onChange={this.handleChange} /> <br />
                <br />
                <ControlLabel>Start Address</ControlLabel>
                <FormControl type="text" value={this.state.startAddr} name="startAddr" onChange={this.handleChange} /> <br />
                <ControlLabel>Destination Address</ControlLabel>
                <FormControl type="text" value={this.state.destAddr} name="destAddr" onChange={this.handleChange} /> <br />
                <ControlLabel>Seach Radius From Address</ControlLabel>
                <input type="number" value={this.state.destAddr} name="searchRadius" onChange={this.handleChange} /> <br /><br />
                <button className="btn btn-primary btn-block" type="submit">Search</button>
              </form>
            </Col>
            <Col xs={9}>
              <div style={{ height: '90vh', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: '' }}
                  defaultCenter={this.state.center}
                  defaultZoom={this.state.zoom}
                >
                  <AnyReactComponent
                    lat={29.643671}
                    lng={-82.354972}
                    text={'Kreyser Avrora'}
                  />
                </GoogleMapReact>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
