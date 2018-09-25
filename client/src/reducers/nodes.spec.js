/* global expect */
import  nodesReducer, { sortNodes } from './nodes';
import * as actions from '../actions/nodes';

let defaultState = [];
let newState = [{contents: "Test node"}];
let sampleNodes = [
  {id: 4, chapter_id: 2, node_type: "paragraph", content: "Fourth"},
  {id: 3, chapter_id: 2, node_type: "paragraph", content: "Third"},
  {id: 7, chapter_id: 1, node_type: "paragraph", content: "Second"},
  {id: 6, chapter_id: 1, node_type: "paragraph", content: "First"}
];

describe("nodes Reducer", ()=>{
  test("nodesSort orders by chapter id and then node id", ()=>{
    expect(sortNodes(sampleNodes)).toMatchSnapshot();
  });
  
  test("LOAD_NODES overwrites nodes array",()=>{
    expect(
      nodesReducer(defaultState,actions.loadNodes(newState))
    ).toEqual(newState);
  });
});