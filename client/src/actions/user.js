import * as constants from '../constants/user'

export const setUser = (payload) => ({
  type: constants.SET_USER, payload
})

export const signalSignout = () => ({ type: constants.SIGNAL_SIGNOUT })
export const clearUser = () => ({ type: constants.CLEAR_USER })
