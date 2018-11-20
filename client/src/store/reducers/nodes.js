import * as constants from '../../constants/nodes'

let default_state = []

export const sortNodes = (nodes) =>
  nodes.sort((a, b) => a.chapter_id === b.chapter_id ? a.id - b.id : a.chapter_id - b.chapter_id)
  // 2 step sort, compares by node id unless chapters IDs not matched, then sort by chapter ID

export default function nodesReducer (state = default_state, action) {
  switch (action.type) {
    case (constants.LOAD_NODES):
      return [...sortNodes(action.payload)]
    default:
      return state
  }
}
