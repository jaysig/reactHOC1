import { SAVE_COMMENT, CHANGE_AUTH, FETCH_USERS } from './types';
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
        // - Save the JWT token
        // - redirect to the route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - show and error to the user
      });
  }
}
