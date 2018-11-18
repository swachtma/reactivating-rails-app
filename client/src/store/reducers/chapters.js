import * as constants from '../../constants/chapters';

let default_state = [];

export const sortChapters = (chapters) => 
  chapters.sort((a,b) => a.id - b.id);

export default function chaptersReducer(state = default_state,action){
  switch (action.type) {
    case(constants.LOAD_CHAPTERS):
      return [...sortChapters(action.payload)];
    default:
      return state;
  }
}