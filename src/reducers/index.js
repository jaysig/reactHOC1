import { combineReducers } from 'redux';
import commentsReducer from './comments';
import authenticationReducer from './authentication';
import usersReducer from './users';
import authReducer from './auth_reducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  comments: commentsReducer,
  authenticated: authenticationReducer, //from earlier part of project
  auth: authReducer,
  users: usersReducer,
  form,
});

export default rootReducer;
