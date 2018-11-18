/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config, { expectXInY } from '../../test_helper';
import BookmarkModal from '../bookmark_modal';

let test_props = {
  dispatchRoutechapter: jest.fn(),
  dispatchSetBookmarkOffered: jest.fn(),
  displayState: true,
};

let diverse_chapters = {
  last_read_id: 5,
  furthest_read_id: 11,
  active_chapter_id: 1
};

let matching_chapters = {
  last_read_id: 11,
  furthest_read_id: 11,
  active_chapter_id: 1
};

let nodes = ["Modal","ModalContent"]

describe("<BookmarkModal /> rendering all buttons",()=>{
  let w = shallow(<BookmarkModal {...test_props} {...diverse_chapters} />);
  nodes.forEach((n)=>{ it("a " + n, ()=>expectXInY(n,w)); });
  it("according to snapshot", () => expect(w).toMatchSnapshot());
  
  it("prints three buttons",()=> expect(w.find("Button").length).toBe(3) );
  
  let buttons = ["Button[color='red']","Button[color='yellow']","Button[color='green']"];
  buttons.forEach((b) => {
    it("and fires handlers onclick",()=>{
      w.find(b).simulate("click","e",{value: 5});
      expect(test_props.dispatchRoutechapter).toBeCalled();
      expect(test_props.dispatchSetBookmarkOffered).toBeCalled();
      test_props.dispatchRoutechapter.mockReset();
      test_props.dispatchSetBookmarkOffered.mockReset();
    });
  });
});

describe("<BookmarkModal /> printing only furthest read",()=>{
  let w = shallow(<BookmarkModal {...test_props} {...matching_chapters} />);
  it("prints three buttons",()=> expect(w.find("Button").length).toBe(2) );
});