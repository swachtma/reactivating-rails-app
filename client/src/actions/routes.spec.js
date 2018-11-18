/* global expect */
import * as actions from './routes';

describe("Routes actionCreators", ()=>{
  test("routeHome()", ()=>{
    expect(actions.routeHome()).toMatchSnapshot();
  });
  
  test("routeChapter(chapter_id)", ()=>{
    expect(actions.routeChapter(5)).toMatchSnapshot();
  });
});