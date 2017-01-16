import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component {

  handleFormSubmit({ email, password}) {
    console.log(email, password);
    this.props.signinUser({ email, password });
  }

  renderField( { input, label, type, className, req, meta: { touched, error } } ) {
    return (
      <div className={ className }>
        <label className="label">{ label }<span className={ req }>*</span></label>
        <div>
          <input
            className="input" { ...input }

            type={ type }
          />
          { touched && error && <span>{ error }</span> }
        </div>
      </div>
    );
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

         </div>


         {/* <div className="agreed-to-terms update">
           <span className="checkbox-wrap">
            <label className="checkbox-label" htmlFor="agreedToTerms">
             <Field name="agreedToTerms" id="agreedToTerms" component="input" type="checkbox" /> By checking this tiny box, I agree to the Foot Cardigan <a href="/terms-and-conditions"> Terms of Use</a> and <a href="/privacy"> Privacy Policy</a>.</label>
           </span>
         </div> */}

          <div className="input-wrap">
            <button
              className="btn btn-primary"
              type="submit" disabled={ invalid || submitting }
            >
            Submit</button>
          </div>

        </form>
        {/* <div className="options">
          <p>Or register using</p>
          <div className="input-wrap">
            <button
              id="googleButton" data-social-login="loginWithGoogle"
              type="submit" className="btn btn-fc-blue btn-medium" onClick={ this.props.googleLogin }
            >Google</button>
            <button
              id="facebookButton" data-social-login="loginWithFacebook"
              type="submit" className="btn btn-fc-blue btn-medium" onClick={ this.props.facebookLogin }
            >Facebook</button>
          </div>
        </div> */}

        {/* <div className="footer">
          <p>Already have a account?</p>
          <btn className="btn" onClick={ this.switchForm.bind(this) }>Log in</btn>
        </div> */}
      </div>
    );
  }

}

SignIn.propTypes = {
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

  // Error Values work

  return errors;
};


let ReduxSignIn =
 reduxForm({
   form: 'LoginNewForm',
   fields: [ 'email', 'password' ],
   validate,
 })(SignIn);

// function mapStateToProps(state) {
//   return {
//     store: state.store,
//   };
// }

// connect: first argument is state(mapStateToProps), 2nd is actions (mapDispatchToProps)
ReduxSignIn = connect(
  // state => ({
  //  // initialValues: state.account.data  pull initial values from account reducer
  //   store: state.store,
  // }),
  null, actions
  // { logIn: loginFunction, register: registerFunction }
)(ReduxSignIn);

export default ReduxSignIn;
