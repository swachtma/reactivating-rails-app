import * as constants from '../constants/chapters';

let default_state = [];

export const sortChapters = (chapters) => {
  return chapters.sort((a,b) =>{
    return a.id - b.id;
  });
};

const chaptersReducer = function(state = default_state,action){
  switch (action.type) {
    case(constants.LOAD_CHAPTERS):
      return [...sortChapters(action.payload)];
    default:
      return state;
  }
};

export default chaptersReducer;