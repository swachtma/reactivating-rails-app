/* global expect */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from './test_helper';
import App from './App';

describe("<App />", ()=>{
  const wrapper = shallow(<App />);
  it('matches the snapshot', () => { expect(wrapper).toMatchSnapshot(); });
  
  let children = ["div#app","Connect(NavigationMenus)","Connect(RouterSwitch)","Connect(AlertList)"];
  children.forEach((c) => it("renders " + c, ()=>expect(wrapper.find(c).exists()).toBe(true)));
});