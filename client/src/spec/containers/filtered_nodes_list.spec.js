/* global expect */
import React, { Component } from 'react';
import { shallow } from 'enzyme';

import config from '../../test_helper';
import { nodesProvider } from '../../containers/filtered_nodes_list';

let defaultProps = {
  active_chapter_id: 1,
  nodes: [
    {id: 1, chapter_id: 1, node_type: "header", content: "Node 1"},
    {id: 2, chapter_id: 1, node_type: "paragraph", content: "Node 2"},  
    {id: 3, chapter_id: 2, node_type: "header", content: "Node 3"}  
  ]
};

class MockComponent extends Component {}
const MockContainer = nodesProvider(MockComponent);

describe("nodesProvider", ()=>{
  it("renders wrapper only with nodes matching active_chapter_id", ()=>{
    let w = shallow(<MockContainer {...defaultProps}/>);
    expect(w.find("MockComponent").props().nodes.length).toBe(2);
  });
  
  it("render nothing if no nodes match filter", () => {
    let w = shallow(<MockContainer nodes={[]} active_chapter_id={1} />);
    expect(w).toMatchSnapshot();
  });
});