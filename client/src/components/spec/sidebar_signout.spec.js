/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import SideBarSignout from '../side_bar_signout';

describe("<SideBarSignout />",()=>{
  let [mockDispatch, mockHandler] = [jest.fn(), jest.fn()];
  let wrapper = shallow(
    <SideBarSignout username="TestDude"
      handleCloseClick={mockHandler} dispatchSignalSignout={mockDispatch} />
  );
  
  it("on click calls event handlers in dispatchSignalSignout & handleCloseClick",()=>{
    let link = wrapper.find("MenuItem");
    link.simulate("click");
    expect(mockHandler).toBeCalled();
    expect(mockDispatch).toBeCalled();
  });
  
  it("renders according to snapshot",()=>{
    expect(wrapper).toMatchSnapshot();
  });
});