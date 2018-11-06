/* global expect */
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import { hydrateUser } from './hydrate_user';
import { routeHome } from '../actions/routes';
import { setUser } from '../actions/user';
import retrieveUserBookmark from './utils/retrieve_bookmark';

describe("hydrateUser", () => {
  let path = encodeURIComponent(JSON.stringify(routeHome()));
  let action = { type: 'AUTH_ROUTE', payload: { token: "shortTermToken", bounce_path: path }};
  let sample_user = {data: {username: "SomeDude"}};
  let saga = hydrateUser(action);

  test("begins by redirecting if path provided",() => {
    expect(saga.next(path).value).toEqual(put(routeHome()));
  });
  
  test("saga then trades temp token for long-term",() => {
    expect(saga.next().value).toEqual(call(axios.get, "/api/hydrate_user?token=" + action.payload.token));
  });
  
  test("saga then sets user state and alerts user", ()=> {
    let results = saga.next(sample_user);
    expect(results.value).toEqual(put(setUser(sample_user.data)));
  });
  
  test("saga then yields to retrieveUserBookmark", ()=> {
    expect(saga.next()["value"]["CALL"]["fn"]).toEqual(retrieveUserBookmark);
  });
});