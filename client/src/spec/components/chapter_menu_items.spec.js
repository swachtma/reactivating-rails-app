/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme from '../../test_helper'
import ChapterMenuItems from '../../components/chapter_menu_items'

const test_props = {
  chapters: [
    { id: 1, title: 'Test Chapter 1' },
    { id: 2, title: 'Test Chapter 2' }
  ],
  active_chapter: { id: 2, title: 'Test Chapter 1' },
  dispatchRouteChapter: jest.fn(),
  handleSidebarVisibility: jest.fn()
}

let w = shallow(<ChapterMenuItems {...test_props} />)

describe('<ChapterMenuItems />', () => {
  it('renders according to snapshot', () => expect(w).toMatchSnapshot())

  it('calls handleSidebarVisibility on focus', () => {
    w.simulate('focus')
    expect(test_props.handleSidebarVisibility).toBeCalled()
  })

  it('call handleSidebarVisibility on focus', () => {
    w.simulate('change')
    expect(test_props.dispatchRouteChapter).toBeCalled()
  })

  it('disables link to active chapter', () => {
    expect(w.prop('options')[1].active).toBe(true)
  })

  it('prints each chapter as a link', () => {
    expect(w.prop('options').length).toBe(2)
  })
})
