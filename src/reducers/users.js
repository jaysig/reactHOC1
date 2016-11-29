import {
  FETCH_USERS
} from '../actions/types';

export default function(state = [], action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USERS:
    console.log(action);
    return [...state, ...action.payload.data ];
  }
  return state;
}
