/* global expect */
import { put } from 'redux-saga/effects';

import redirectToPathIf from '../../../../store/sagas/utils/redirect_path';

describe("redirectToPathIf", () => {
  test("returns path action", ()=> {
    let sample = {type: "ROUTE_ACTION", payload: {test: "value"}};
    let encoded_sample = encodeURIComponent(JSON.stringify(sample));
    let generator = redirectToPathIf(encoded_sample);
    expect(generator.next().value).toEqual(put(sample));
  });
});