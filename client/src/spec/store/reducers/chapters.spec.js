/* global expect */
import  chaptersReducer, { sortChapters } from '../../../store/reducers/chapters';
import * as actions from '../../../actions/chapters';

let defaultState = [];
let newState = [{title: "Test chapter"}];
let sampleChapters = [
  {id: 7, title: "Second"},
  {id: 8, title: "Third"},
  {id: 6, title: "First"}
];

describe("chapters Reducer", ()=>{
  test("sortChapters orders by id", ()=>{
    expect(sortChapters(sampleChapters)).toMatchSnapshot();
  });
  
  test("LOAD_CHAPTERS overwrites chapters array",()=>{
    expect(chaptersReducer(defaultState,actions.loadChapters(newState))).toEqual(newState);
  });
});