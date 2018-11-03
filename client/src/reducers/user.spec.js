/* global expect */
import  userReducer from './user';
import * as actions from '../actions/user';

let defaultState = {};
let exampleState = {
  avatar: "https://avatars0.githubusercontent.com/u/shiba",
  github_email: "awesome@wow.com",
  id: 9000,
  token: "wow.much.secret",
  username: "doge"
};

describe("User reducer", ()=>{
  test("SET_USER populates user object",()=>{
    let fsa = actions.setUser(exampleState);
    expect(userReducer(defaultState,fsa)).toEqual(exampleState);
  });
  
  test("CLEAR_USER empties user object", () =>{
    expect(userReducer(exampleState, actions.clearUser())).toEqual(defaultState);
  });
});