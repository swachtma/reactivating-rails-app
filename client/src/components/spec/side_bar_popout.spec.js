/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import SideBarPopout from '../side_bar_popout';

const test_props = {
  chapters: [
    {id: 1, title: "Test Chapter 1"},
    {id: 2, title: "Test Chapter 2"}
  ],
  active_chapter: {id: 2, title: "Test Chapter 1"},
  dispatchRouteChapter: jest.fn()
};

//helper method for the many prescence checks we want to prefrom
const expectXInY = (e,w) => expect(w.find(e).exists()).toBe(true);

describe("<SideBarPopout /> rendering",()=>{
  let w = shallow(<SideBarPopout {...test_props} />);
  it("renders a link for each chapter", () =>{
    test_props.chapters.forEach(c => expectXInY('MenuItem[name="chapter'+c.id+'"]',w));
  });
  
  it("renders Connect(SideBarSignout)", () => expectXInY("Connect(SideBarSignout)",w));
  it("renders a close link for the menu", () => expectXInY("MenuItem[name='Close Menu']",w));
  it("renders according to snapshot",() => expect(w).toMatchSnapshot());
});

describe("SideBarPopout.toggleVisibility", ()=>{
  let w = shallow(<SideBarPopout {...test_props} />);
  it("reverses visibilty if specific value not given", () => {
    w.instance().toggleVisibility();
    expect(w.state("visible")).toBe(true);
    w.instance().toggleVisibility();
    expect(w.state("visible")).toBe(false);
  });
  
  it("assigns visibility specified", () =>{
    w.instance().toggleVisibility(true);
    expect(w.state("visible")).toBe(true);
    w.instance().toggleVisibility(false);
    expect(w.state("visible")).toBe(false);
  });
});
  
describe("<SideBarPopout /> visible state",()=>{
  let w = shallow(<SideBarPopout {...test_props} />);
  it("defaults to hidden", () => expectXInY("Sidebar[visible=false]",w));
  
  describe("will",()=>{
    beforeEach(() => {
      w.setState({visible: true});
      w.update();
    });
    
    it("change to visibility = false, and dispatch chapter route on chapter link",()=>{
      w.find("MenuItem[name='chapter1']").simulate("click");
      expectXInY("Sidebar[visible=false]",w);
      expect(test_props.dispatchRouteChapter).toBeCalled();
    });
    
    ["MenuItem[name='Close Menu']","SidebarPusher"].forEach(t =>{
      it("change to visibility = false on click of " + t,()=>{
        t = w.find(t);
        t.simulate("click");
        expectXInY("Sidebar[visible=false]",w);
      });
    });
    
    it("not change on click of MenuItem[link=false]", () => {
      w.find("MenuItem[link=false]").simulate("click");
      expectXInY("Sidebar[visible=true]",w);
    });
  });
});