/* global expect, jest */
import { call, put } from 'redux-saga/effects';
import axiosCreateClient from './utils/axios_client';
import axios from 'axios';

import { hydrateUser } from './hydrate_user';
import { routeHome } from '../actions/routes';
import { setUser } from '../actions/user';
import retrieveUserBookmark from './utils/retrieve_bookmark';

describe("hydrateUser GREEN path", () => {
  let path = encodeURIComponent(JSON.stringify(routeHome()));
  let action = { type: 'AUTH_ROUTE', payload: { token: "shortTermToken", bounce_path: path }};
  let sample_user = {data: {username: "SomeDude"}};
  let saga = hydrateUser(action);

  test("begins by redirecting if path provided",() => {
    expect(saga.next(path).value).toEqual(put(routeHome()));
  });
  
  test("then sets up a public axios client",() =>{
    expect(saga.next().value).toEqual(call(axiosCreateClient,false));
  });
  
  test("saga then trades temp token for long-term",() => {
    let pub_client = {"get": jest.fn()};
    expect(saga.next(pub_client).value).toEqual(call([pub_client, "get"], "/api/hydrate_user?token=" + action.payload.token));
  });
  
  test("saga then sets user state and alerts user", ()=> {
    let results = saga.next(sample_user);
    expect(results.value).toEqual(put(setUser(sample_user.data)));
  });
  
  test("saga then yields to retrieveUserBookmark", ()=> {
    expect(saga.next()["value"]["CALL"]["fn"]).toEqual(retrieveUserBookmark);
  });
});

describe("hydrateUser RED path", () => {
  let saga = hydrateUser();

  test("begins by redirecting if path provided",() => {
    let error = saga.next(new Error()).value;
    expect(error["PUT"]["action"]["type"]).toEqual("ADD_ALERT");
  });
}); 