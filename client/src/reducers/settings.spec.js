/* global expect */
import  settingsReducer from './settings';
import * as actions from '../actions/routes';

let defaultState = {};

describe("Chapter & Home Routes", ()=>{
  test("Assign default chapter of one on HOME_ROUTE", ()=>{
    expect(
      settingsReducer(defaultState,actions.routeHome())
    ).toMatchSnapshot();
  });
  
  test("assign payload chapter on CHAPTER_ROUTE",()=>{
    expect(
      settingsReducer(defaultState,actions.routeChapter(5))
    ).toMatchSnapshot();
  });
});