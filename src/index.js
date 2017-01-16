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

import reducers from './reducers';
import Async from './middlewares/async.js';


// const createStoreWithMiddleware = applyMiddleware(Async)(createStore);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <Route path="resources" component={requireAuth(Resources)} />
        <Route path="signin" component={SignIn} />
        <Route path="signup" component={SignUp} />
        <Route path="signout" component={Signout} />
        <Route path="users" component={requireAuth(UserList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
