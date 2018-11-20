/* global expect, jest */
import React from 'react'
import { shallow } from 'enzyme'

import configEnzyme, { expectXInY } from '../../test_helper'
import NodesList from '../../components/nodes_list'

let test_props = {
  nodes: [
    {
      id: 1892,
      chapter_id: 15,
      node_type: 'code_block',
      content: "``` javascript(path)\nimport React, { Component } from 'react';"
    },
    {
      id: 1893,
      chapter_id: 15,
      node_type: 'paragraph',
      content: 'Here is some text'
    }
  ]
}

describe('<NodesList />', () => {
  let nodes = ['#nodes-list', 'CodeExample', 'ReactDOMFragment']
  let w = shallow(<NodesList {...test_props} />)
  nodes.forEach(node => {
    it('renders ' + node, () => expectXInY(node, w))
  })

  it('renders according to snapshot', () => expect(w).toMatchSnapshot())
})
