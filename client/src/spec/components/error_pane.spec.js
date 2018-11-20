/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme from '../../test_helper'
import ErrorPane from '../../components/error_pane'

let w = shallow(<ErrorPane />)

describe('<ErrorPane /> renders', () => {
  it('according to snapshot', () => expect(w).toMatchSnapshot())
})
