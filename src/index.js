import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router';

import requireAuth from './components/require_authentication';
import App from './components/app';
import Resources from './components/resources';
import UserList from './components/user_list.js';
import reducers from './reducers';
import Async from './middlewares/async.js';


const createStoreWithMiddleware = applyMiddleware(Async)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <Route path="resources" component={requireAuth(Resources)} />
        <Route path="users" component={requireAuth(UserList)} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
