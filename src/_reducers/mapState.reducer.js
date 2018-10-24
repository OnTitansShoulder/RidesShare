import React from 'react';
import { mapConstants, requestConstants } from '../_constants';

const initState = {
  center: {
    lat: 29.643677,
    lng: -82.354975
  },
  zoom: 11,
  searchResults: []
};

export function mapState(state = initState, action) {
  switch (action.type) {
    case mapConstants.CENTER_UPDATED:
      return {
        ...state,
        center: action.center,
        zoom: 14
      };
    case requestConstants.SEARCH_RIDES_SUCCESS:
      return {
        ...state,
        searchResults: action.rides
      }
    default:
      return state
  }
}
