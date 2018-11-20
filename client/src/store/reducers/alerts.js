import * as constants from '../../constants/alerts'
const default_state = []

export const normalizeAlert = (payload) => {
  payload.scope = constants.scopes.includes(payload.scope) ? payload.scope : constants.scopes[0]
  payload.level = constants.lvls.includes(payload.level) ? payload.level : constants.lvls[0]
  return payload
}

export default function alertsReducer (state = default_state, action) {
  switch (action.type) {
    case (constants.ADD_ALERT):
      return [...state, normalizeAlert(action.payload)]
    case (constants.CLEAR_ALERTS):
      return []
    default:
      return state
  }
}
