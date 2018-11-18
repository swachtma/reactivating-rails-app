/* global expect */
import * as actions from './bookmarks';

describe("Bookmarks actionCreators", ()=>{
  describe("setBookmarkLocations(chapter_id)", ()=>{
    test("matches snapshot", () =>{
      expect(actions.setBookmarkLocations(1)).toMatchSnapshot();
    });
  });
  
  describe("setBookmarkOffered()",()=>{
    test("matches snapshot", () =>{
      expect(actions.setBookmarkOffered()).toMatchSnapshot();
    });
  });
});