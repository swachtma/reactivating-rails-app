import * as constants from '../constants/nodes';

let default_state = [];

export const sortNodes = (nodes) => {
  return nodes.sort((a,b) =>{
    if(a.chapter_id === b.chapter_id){
      return a.id - b.id;
    } else {
      return a.chapter_id - b.chapter_id;
    }
  });
};

const nodesReducer = function(state = default_state,action){
  switch (action.type) {
    case(constants.LOAD_NODES):
      return [...sortNodes(action.payload)];
    default:
      return state;
  }
};

export default nodesReducer;