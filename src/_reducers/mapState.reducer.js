import React from 'react';
import { mapConstants } from '../_constants';

const initState = {
  center: {
    lat: 29.643677,
    lng: -82.354975
  },
  zoom: 11,
  pins: []
};

export function mapState(state = initState, action) {
  switch (action.type) {
    case mapConstants.CENTER_UPDATED:
      return {
        ...state,
        center: action.center,
        zoom: 14
      };
    default:
      return state
  }
}
