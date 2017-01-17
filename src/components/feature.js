import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Feature extends Component {

  render() {
    return (
      <div className="">
        This is a feature
      </div>
    )
  }
}
function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}
export default connect(mapStateToProps, actions)(Feature)
