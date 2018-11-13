import React from 'react';
import {Row, Col} from 'react-bootstrap';
import { connect } from 'react-redux';

const imageFit = {
  maxWidth: "100%",
  maxHeight: "100%",
  padding: "30px"
};

class HomePage extends React.Component {
  render() {
    return (
      <div style={{padding: "0px 0px 50px 0px"}}>
        <div style={{display: "inline"}}>
          <p><span style={{fontSize: "30px"}}>RidesShare</span>{' '}———{' '}
          <span style={{fontSize: "18px"}}>A platform for safe and affordable transportation, less CO2 for earth, only for students!</span></p>
        </div>
        <Row>
          <Col xs={4}>
            <img style={imageFit} src="/src/assets/Ridesshare_Person.jpg" /><br />
            <h4>One page, five minutes, find a ride you need or share your ride for others!</h4>
            <h4>No more scrolling and messaging on Facebook page!</h4>
          </Col>
          <Col xs={4}>
            <img style={imageFit} src="/src/assets/Highway_Contrast.jpg" /><br />
            <h4>Less traffic and jams on the highway and get home faster and safer!</h4>
            <h4>Also less gas burned and less CO2 emission, better for our planet!</h4>
          </Col>
          <Col xs={4}>
            <img style={imageFit} src="/src/assets/Venmo_Received.jpg" /><br />
            <h4>Share the gas and toll cost with the driver, chat and make friends, kills the borningness on the long trip!</h4>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {};
}

const connectedHome = connect(mapStateToProps)(HomePage);
export { connectedHome as HomePage };
