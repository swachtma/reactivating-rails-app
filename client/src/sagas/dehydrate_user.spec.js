/* global expect */
import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { dehydrateUser } from './dehydrate_user';
import { clearAlerts } from '../actions/alerts';

describe("dehydrateUser", () => {
  let saga = dehydrateUser();

  test("saga by clearing old alerts and notifying of logout", ()=> {
    let results = saga.next().value["ALL"];
    expect(results[0]).toEqual(put(clearAlerts()));
    expect(results[1]["PUT"].action.type).toEqual("ADD_ALERT");
  });
  
  test("saga then delays and clears alerts after timer", ()=> {
    expect(saga.next().value["CALL"]["fn"]).toEqual(delay);
    expect(saga.next().value).toEqual(put(clearAlerts()));
  });
});