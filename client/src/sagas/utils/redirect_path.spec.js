/* global expect */
import redirectToPathIf from './redirect_path';
import { put } from 'redux-saga/effects';

describe("redirectToPathIf", () => {
  test("returns path action", ()=> {
    let sample = {type: "ROUTE_ACTION", payload: {test: "value"}};
    let encoded_sample = encodeURIComponent(JSON.stringify(sample));
    let generator = redirectToPathIf(encoded_sample);
    expect(generator.next().value).toEqual(put(sample));
  });
});