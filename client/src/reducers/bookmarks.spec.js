/* global expect */
import  bookmarksReducer, { buildLocations } from './bookmarks';
import * as actions from '../actions/bookmarks';

let defaultState = { prompt_shown: false, last_read: {chapter: 1}, furthest_read: {chapter: 1} };

describe("bookmarks Reducer", ()=>{
  describe("buildLocations",()=>{
    test("updates furthest_read only on progress",()=>{
      let bookmarks = buildLocations(defaultState,{chapter: 2});
      expect(bookmarks.furthest_read.chapter).toEqual(2);
      
      bookmarks = buildLocations(bookmarks,{chapter: 1});
      expect(bookmarks.furthest_read.chapter).toEqual(2);
    });
    
    test("always updates last_read",()=>{
      let bookmarks = buildLocations(defaultState,{chapter: 2});
      expect(bookmarks.last_read.chapter).toEqual(2);
      
      bookmarks = buildLocations(bookmarks,{chapter: 1});
      expect(bookmarks.last_read.chapter).toEqual(1);
    });
  });
  
  describe("bookmarksReducer",()=>{
    test("sets prompt_shown true on setBookmarkOffered(true) action",()=>{
      let state = bookmarksReducer(defaultState,actions.setBookmarkOffered(true));
      expect(state.prompt_shown).toEqual(true);
    });
    
    test("sets both bookmarks on setBookmarkLocations",()=>{
      let state = bookmarksReducer(defaultState,actions.setBookmarkLocations(2));
      expect(state.last_read.chapter).toEqual(2);
      expect(state.furthest_read.chapter).toEqual(2);
    });
  });
});