/* global expect */
import retrieveUserBookmark from './retrieve_bookmark';
import axios from 'axios';
import { put } from 'redux-saga/effects';

import { setBookmarkLocations, setBookmarkOffered } from '../../actions/bookmarks';

describe("retrieveUserBookmark", () => {
  var saga;
  beforeEach(()=>{
    saga = retrieveUserBookmark();
    saga.next();
  });
  
  test("terminates if unatuhenticated", ()=> {
    let result = saga.next(null);
    expect(result.done).toEqual(true);
    expect(result.value).toEqual(false);
  });
  
  test("updates bookmarks if client secure client available and offers prompt", ()=> {
    expect(saga.next(axios.create())["value"]["CALL"]["args"]).toEqual(["/api/bookmarks"]);
    
    // expects client to return bookmark data and put setBookmarkLocations(furthest_read)
    let results = saga.next({data: {last_read: 1, furthest_read: 2}});
    expect(results.value).toEqual(put(setBookmarkLocations(2)));
    
    //put setBookmarkLocations(last_read)
    results = saga.next();
    expect(results.value).toEqual(put(setBookmarkLocations(1)));
    
    // put setBookmarkOffered(false)
    results = saga.next();
    expect(results.value).toEqual(put(setBookmarkOffered(false)));
    
    expect(saga.next().done).toEqual(true);
  });
});