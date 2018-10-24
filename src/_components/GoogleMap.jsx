import React from 'react';
import GoogleMapReact from 'google-map-react';
import {geolocated} from 'react-geolocated';
import { connect } from 'react-redux';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { mapState } = this.props;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={mapState.center}
        defaultZoom={mapState.zoom}
      >
      { mapState.pins }
      </GoogleMapReact>
    )
  }
}

function mapStateToProps(state) {
  return { mapState: state.mapState };
}

const MergedMap = geolocated({
  positionOptions: { enableHighAccuracy: false },
  userDecisionTimeout: 5000
})(GoogleMap);

const connectedGoogleMap = connect(mapStateToProps)(MergedMap);
export { connectedGoogleMap as GoogleMap };
