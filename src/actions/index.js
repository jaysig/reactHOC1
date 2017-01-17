import { SAVE_COMMENT, CHANGE_AUTH, FETCH_USERS,
  AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types';
import { browserHistory } from 'react-router';
import axios from 'axios';

const API_URL = "http://localhost:3090"; //Where the server is

export function saveComment(comment) {
  return {
    type: SAVE_COMMENT,
    payload: comment
  };
}

export function authenticate(isLoggedIn) {
  return {
    type: CHANGE_AUTH,
    payload: isLoggedIn
  }
}

export function fetchUsers() {
  const request = axios.get('http://jsonplaceholder.typicode.com/users')
  return {
    type: FETCH_USERS,
    payload: request
  }
}

export function signinUser({ email, password }) {
  // Thunk gives us access to our dispatcher
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${API_URL}/signin`, { email, password })
      .then( response => {
        // If request is good...
        // - Update State to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('token', response.data.token); //setItems saves something
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - show and error to the user
        dispatch(authError('That email was already registered'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then( response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token); //setItems saves something
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - show and error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  };
}

export function fetchMessage() {
  return function(dispatch) {
    // Video 116
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then( response => {
      dispatch({
      type: FETCH_MESSAGE,
      payload: response.data.message
      });
    })
  }
}
