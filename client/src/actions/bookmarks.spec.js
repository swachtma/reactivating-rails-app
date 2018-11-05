/* global expect */
import * as actions from './bookmarks';

describe("Bookmarks actionCreators", ()=>{
  describe("setBookmarkLocations(chapter_id)", ()=>{
    test("matches snapshot", () =>{
      expect(actions.setBookmarkLocations(1)).toMatchSnapshot();
    });
  });
  
  describe("setBookmarkOffered(true)",()=>{
    test("matches snapshot", () =>{
      expect(actions.setBookmarkOffered(true)).toMatchSnapshot();
    });
  });
});