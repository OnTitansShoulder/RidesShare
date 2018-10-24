import { mapConstants } from '../_constants';

export const mapActions = {
  newCenter
};

function newCenter(newCoord) {
  const center = {
    lat: newCoord.lat,
    lng: newCoord.lng
  };
  return dispatch => {
    dispatch({
      type: mapConstants.CENTER_UPDATED,
      center
    });
  };
}
