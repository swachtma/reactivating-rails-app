/* global expect, jest */
import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import NavigationMenus from '../navigation_menus';

let w = shallow(<NavigationMenus />);

describe("<NavigationMenus />",()=>{
  it("renders according to snapshot", () => expect(w).toMatchSnapshot());
});
