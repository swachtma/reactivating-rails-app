/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import UserBadge, { ProfileIcon } from '../../components/user_badge';

describe("<UserBadge />", () =>{
  it("renders GithubIcon on !props.username", ()=>{
    let wrapper = shallow(<UserBadge />);
    expect(wrapper.find("Connect(GithubIcon)").exists()).toBe(true);
  });
  
  it("renders ProfileIcon on props.username", ()=>{
    let wrapper = shallow(<UserBadge username="TestDude" />);
    expect(wrapper.find("ProfileIcon").exists()).toBe(true);
  });
});

describe("<ProfileIcon />",()=>{
  let mockDispatch = jest.fn();
  let mockHandler = jest.fn();
  let wrapper = shallow(
    <ProfileIcon username="TestDude" avatar="someurl.png"
      dispatchSignalSignout={mockDispatch} handleSidebarVisibility={mockHandler} />
  );
  
  it("calls function passed in dispatchSignalSignout on Signout click",()=>{
    let link = wrapper.find("DropdownItem");
    link.simulate("click");
    expect(mockDispatch).toBeCalled();
  });
  
  it("calls function passed in handleSidebarVisibility on focus",()=>{
    let menubar = wrapper.find("Dropdown");
    menubar.simulate("focus");
    expect(mockHandler).toBeCalled();
  });
  
  it("renders according to snapshot",()=>{
    expect(wrapper).toMatchSnapshot();
  });
});