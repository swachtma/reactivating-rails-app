/* global expect, jest */
import { call, put, fork, take, cancel } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { cloneableGenerator, createMockTask  } from 'redux-saga/utils';

import axiosCreateClient from './utils/axios_client';
import redirectToPathIf from './utils/redirect_path';

import { handleSignIn, handleSignOut, manageUserTimeout, manageUserSession } from './manage_user_session.js';
import * as routes from '../constants/settings';
import { setUser, clearUser } from '../actions/user';
import { SIGNAL_SIGNOUT } from '../constants/user';
import { clearAlerts } from '../actions/alerts';
import retrieveUserBookmark from './utils/retrieve_bookmark';

let generator, clone, mock_task;
describe("manageUserSession", ()=>{
  let saga;
  it("Waits for auth route, or rehydration, and continue to wait until token found",()=>{
    saga = manageUserSession();
    expect(saga.next().value).toEqual(take([routes.AUTH_ROUTE, "persist/REHYDRATE"]));
  });
  
  it("continue to wait until token is given, then forks work an redirects",()=>{
    expect(saga.next({payload: {user: {}}}).value).toEqual(take([routes.AUTH_ROUTE, "persist/REHYDRATE"]));
    expect(saga.next({payload:  { token: "sometoken", bounce_path: "somepath"}}).value).toEqual(fork(handleSignIn,"sometoken"));
    mock_task = createMockTask();
    expect(saga.next(mock_task).value).toEqual(call(redirectToPathIf,"somepath"));
  });
  
  it("waits for sign-out, then cancels active sign-ins, and begin sign-out", () =>{
    expect(saga.next().value).toEqual(take(SIGNAL_SIGNOUT));
    expect(saga.next().value).toEqual(cancel(mock_task));
    expect(saga.next().value).toEqual(call(handleSignOut));
  });
});

describe("handleSignIn", ()=>{
  generator = cloneableGenerator(handleSignIn)("mocktoken"); 
  it("sets up a client, and callls '/api/hydrate_user'", ()=>{
    let pub_client = {"get": jest.fn()};
    expect(generator.next().value).toEqual(call(axiosCreateClient,false));
    expect(generator.next(pub_client).value).toEqual(call([pub_client, "get"], "/api/hydrate_user?token=" + "mocktoken"));
    clone = generator.clone();
  });
  
  it("forks a manageUserTimeout thread, sets the user, and fetches bookmarks", ()=>{
    let response = {data: {expires: 100}};
    expect(generator.next(response).value).toEqual(fork(manageUserTimeout,100));
    expect(generator.next().value).toEqual(put(setUser(response.data)));
    expect(generator.next().value).toEqual(call(retrieveUserBookmark));
  });
  
  describe("RED PATH", ()=>{
    it("calls signout on errors", ()=>{
      expect(clone.throw({message: "error"}).value).toEqual(call(handleSignOut,"error"));
    });
  });
});

describe("manageUserTimeout", ()=>{
  it("limits timeout to 2147000000 milliseconds", ()=>{
    generator = manageUserTimeout(2147001);
    expect(generator.next().value).toEqual(call(delay, 2147000000));
  });
  
  it("delays by countdown * 1000, then calls handleSignOut", ()=>{
    generator = manageUserTimeout(10);
    expect(generator.next().value).toEqual(call(delay, 10000));
    expect(call(handleSignOut,"Your Session has expired, please sign in again."));
  });
});

describe("handleSignOut", () =>{
  it("Delivers a custom message if provided",() => {
    generator = handleSignOut("Custom message");
    [1,2].forEach(()=>{ generator.next() });
    expect(generator.next().value["PUT"]["action"]["payload"]["message"]).toEqual("Custom message");
  });
  
  it("clears user session", ()=> {
    generator = handleSignOut();
    expect(generator.next().value).toEqual(put(clearUser()));
  });
  
  it("clears alerts, adds a new alert, delays, and clears alerts again.", ()=> {
    expect(generator.next().value).toEqual( put(clearAlerts()));
    expect(generator.next().value["PUT"]["action"]["type"]).toEqual("ADD_ALERT");
    expect(generator.next().value).toEqual( call(delay,3000) );
    expect(generator.next().value).toEqual( put(clearAlerts()) );
  });
});
