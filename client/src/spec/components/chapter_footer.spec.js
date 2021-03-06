/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme, { expectXInY } from '../../test_helper'
import ChapterFooter from '../../components/chapter_footer'

describe('<ChapterFooter /> on last chapter', () => {
  let w = shallow(<ChapterFooter />)
  it('creates a container #chapter-footer-link', () => expectXInY('#chapter-footer-link', w))
  it('according to snapshot', () => expect(w).toMatchSnapshot())
})

describe('<ChapterFooter /> on last chapter', () => {
  let w = shallow(<ChapterFooter next_chapter={{ id: 5, title: 'Something Witty' }} />)
  it('creates a Link', () => expectXInY('Connect(Link)', w))
  it('according to snapshot', () => expect(w).toMatchSnapshot())
})
