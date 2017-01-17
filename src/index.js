import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import requireAuth from './components/require_authentication';
import App from './components/app';
import Resources from './components/resources';
import SignIn from './components/auth/signin.js';
import UserList from './components/user_list.js';
import Signout from './components/auth/signout.js';
import SignUp from './components/auth/signup.js';
import Feature from './components/feature.js';
import Welcome from './components/welcome.js'
import reducers from './reducers';
import Async from './middlewares/async.js';
import { AUTH_USER } from './actions/types';


// const createStoreWithMiddleware = applyMiddleware(Async)(createStore);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="resources" component={requireAuth(Resources)} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={Signout} />
        <Route path="users" component={requireAuth(UserList)} />
        <Route path="feature" component={requireAuth(Feature)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
