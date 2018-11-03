/* global expect */
import { call, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';

import { hydrateUser } from './hydrate_user';
import { routeHome } from '../actions/routes';
import { setUser } from '../actions/user';
import { clearAlerts } from '../actions/alerts';

describe("hydrateUser", () => {
  let action = { type: 'AUTH_ROUTE', payload: { token: "shortTermToken" }};
  let sample_user = {data: {username: "SomeDude"}};
  let saga = hydrateUser(action);

  test("begins by redirecting HOME",() => {
    expect(saga.next().value).toEqual(put(routeHome()));
  });
  
  test("saga then trades temp token for long-term",() => {
    expect(saga.next().value).toEqual(call(axios.get, "/api/hydrate_user?token=" + action.payload.token));
  });
  
  test("saga then sets user state and alerts user", ()=> {
    let results = saga.next(sample_user).value["ALL"];
    expect(results[0]).toEqual(put(setUser(sample_user.data)));
    expect(results[1]["PUT"].action.type).toEqual("ADD_ALERT");
  });
  
  test("saga then delays and clears alerts after timer", ()=> {
    expect(saga.next().value["CALL"]["fn"]).toEqual(delay);
    expect(saga.next().value).toEqual(put(clearAlerts()));
  });
});