/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme, { expectXInY } from '../../test_helper'
import RouterSwitch from '../../components/router_switch'

let routes
describe('<RouterSwitch /> renders', () => {
  routes = ['HOME_ROUTE', 'CHAPTER_ROUTE']
  routes.forEach(r => {
    it('ReaderPane', () => expectXInY('ReaderPane', shallow(<RouterSwitch location={{ type: r }} />)))
  })

  routes = ['ERROR_ROUTE', 'SOME_ROUTE_WE_DID_NOT_EXPECT']
  routes.forEach(r => {
    it('ErrorPane', () => expectXInY('ErrorPane', shallow(<RouterSwitch location={{ type: r }} />)))
  })
})
