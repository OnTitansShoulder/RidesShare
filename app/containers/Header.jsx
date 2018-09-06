import React from 'react'
import { connect } from 'react-redux'

import Header from '../components/Header'

function mapStateToProps(state) {
  return {
    number: state.number
  }
}

function mapDispatchToProps(dispatch) {
  return {
    number: 1
  }
}

let HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)

export default HeaderContainer
