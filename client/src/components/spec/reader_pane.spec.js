/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config, { expectXInY } from '../../test_helper';
import ReaderPane from '../reader_pane';

let nodes = ["#reader-pane","Connect(BookmarkModal)","Connect(NodesList)","Connect(ChapterFooter)"];

describe("<ReaderPane />",()=>{
  let w = shallow(<ReaderPane />);
  nodes.forEach((node) => { 
    it("renders " + node,() => {expectXInY(node,w)});
  });
  
  it("renders according to snapshot", () => expect(w).toMatchSnapshot());
});
