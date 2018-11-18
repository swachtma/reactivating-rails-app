/* global expect */
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import { chapterProvider } from '../../containers/chapter_provider';

let defaultProps = {
  active_chapter_id: 1,
  chapters: [
    {id: 1, title: "Chapter 1: Stuff"},
    {id: 2, title: "Chapter 2: Things"},  
    {id: 3, title: "Chapter 3: Stuff & Things"}
  ]
};

class MockComponent extends Component {}
const MockContainer = chapterProvider(MockComponent);

describe("chapterProvider", ()=>{
  it("selects active and next chapter", ()=>{
    let w = shallow(<MockContainer {...defaultProps}/>);
    expect(w.find("MockComponent").props().active_chapter.id).toBe(1);
    expect(w.find("MockComponent").props().next_chapter.id).toBe(2);
  });
  
  it("passes cleaned titles to WrappedComponent", ()=>{
    let w = shallow(<MockContainer {...defaultProps}/>);
    expect(w.find("MockComponent").props().chapters[0].title).toBe("1: Stuff");
  });
  
  it("render nothing if no nodes match filter", () => {
    let w = shallow(<MockContainer chapters={[]} active_chapter_id={1} />);
    expect(w).toMatchSnapshot();
  });
});