/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme from '../../test_helper'
import NavigationMenus from '../../components/navigation_menus'

let w = shallow(<NavigationMenus />)

describe('<NavigationMenus />', () => {
  it('renders according to snapshot', () => expect(w).toMatchSnapshot())
})
