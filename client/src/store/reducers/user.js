import * as constants from '../../constants/user';
const default_state = {};

export default function userReducer(state = default_state,action){
  switch (action.type) {
    case(constants.SET_USER):
      return {...action.payload};
    case(constants.CLEAR_USER):
      return {};
    default:
      return state;
  }
}