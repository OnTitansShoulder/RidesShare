import React from 'react';
import { connect } from 'react-redux';

class HomePage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>RidesShare</h1> <br />
        <h3>A platform for safe and affordable transportation, less CO2 for earth, only for students!</h3>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {};
}

const connectedHome = connect(mapStateToProps)(HomePage);
export { connectedHome as HomePage };
