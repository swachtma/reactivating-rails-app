/* global expect */
import axiosCreateClient from './axios_client';

describe("axiosCreateClient, authrequired == true", () => {
  var saga;
  beforeEach(()=>{
    saga = axiosCreateClient();
    saga.next();
  });
  
  test("provides client if token is available", ()=> {
    let results = saga.next("token");
    expect(typeof results.value).toEqual("function");
  });
  
  test("returns null if no token and auth required", ()=> {
    let results = saga.next(undefined);
    expect(results.value).toEqual(null);
  });
});

describe("axiosCreateClient, authrequired == false", () => {
  test("return unauthenticated client", ()=> {
    let saga = axiosCreateClient(false);
    saga.next();
    let results = saga.next(undefined);
    expect(typeof results.value).toEqual("function");
  });
});