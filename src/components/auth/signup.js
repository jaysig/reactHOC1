import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {

  handleFormSubmit({ email, password}) {
    console.log(email, password);
    this.props.signupUser({ email, password });
  }

  renderField( { input, label, type, className, req, meta: { touched, error } } ) {
    return (
      <div className="form-group">
        <label className="label">{ label }<span className={ req }>*</span></label>
        <div>
          <input
            className="form-control" { ...input }

            type={ type }
          />
          { touched && error && <span className="error">{ error }</span> }
        </div>
      </div>
    );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const {
     pristine,
     reset,
     submitting,
     handleSubmit,
     valid,
    //  register,
     invalid,
     } = this.props;

    return (
      <div id="createAccountFormHldr">

       <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) } className="text">
         <h1 id="ca-title">Register now. Rejoice in 7.82 sec.</h1>

         <div className="form-group">

           {/* <Field
             name="first_name" type="text" id="first_name" component={ this.renderField } req="req"
             label="First Name" className="input-wrap" placeholder="Your First Name"
           />

           <Field
             name="last_name" type="text" id="last_name" component={ this.renderField } req="req"
             label="Last Name" className="input-wrap" placeholder="Your Last Name"
           /> */}

           <Field
             name="email" type="text" component={ this.renderField } req="req"
             label="Email" className="form-control" placeholder="Email"
           />

           <Field
             name="password" type="password" component={ this.renderField } req="req"
             label="Password" className="form-control" placeholder="Your Password" />

           <Field
             name="passwordConfirm" type="password" component={ this.renderField } req="req"
             label="Confirm Password" className="form-control" placeholder="Your Password" />

         </div>

          <div className="input-wrap">
            { this.renderAlert() }
            <button
              className="btn btn-primary"
              type="submit" disabled={ invalid || submitting }
            >
            Submit</button>
          </div>

        </form>
      </div>
    );
  }
}

SignUp.propTypes = {
  fields: React.PropTypes.array,
  // logIn: React.PropTypes.function,
  // register: React.PropTypes.function,
  values: React.PropTypes.object,
};

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'But what even is your email?';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email. Be bop boop';
  }

  if(!values.password) {
    errors.password = 'You need a password';
  }
  if(!values.passwordConfirm) {
    errors.passwordConfirm = 'You need to confirm your password';
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Your passwords do not match';
  }

  // Error Values work

  return errors;
};


let ReduxSignUp =
 reduxForm({
   form: 'SignUpForm',
   fields: [ 'email', 'password', 'passwordConfirm' ],
   validate,
 })(SignUp);

// connect: first argument is state(mapStateToProps), 2nd is actions (mapDispatchToProps)
ReduxSignUp = connect(
  state => ({
   // initialValues: state.account.data  pull initial values from account reducer
    store: state.store,
    errorMessage: state.auth.error,
  }),
  actions
  // { logIn: loginFunction, register: registerFunction }
)(ReduxSignUp);

export default ReduxSignUp;
