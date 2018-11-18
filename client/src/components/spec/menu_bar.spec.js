/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config, { expectXInY } from '../../test_helper';
import MenuBar from '../menu_bar';


let nodes = ["#menu-bar","#side-menu-button","#side-menu-icon","Connect(UserBadge)","ChapterMenuItems"]
let mock_handler = jest.fn();
let w = shallow(<MenuBar handleSidebarVisibility={mock_handler} />);

describe("<MenuBar /> renders",()=>{
  nodes.forEach((n)=>{ it("a " + n, ()=>expectXInY(n,w)); });
  it("according to snapshot", () => expect(w).toMatchSnapshot());
});

describe("<MenuBar /> events", ()=>{
  it("calls handleSidebarVisibility onclick of #menu-bar", () =>{
    w.find("#menu-bar").simulate("click");
    expect(mock_handler).toBeCalled();
  });
});
